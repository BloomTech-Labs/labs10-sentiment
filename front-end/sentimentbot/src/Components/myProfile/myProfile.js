import React from "react";
import { connect } from "react-redux";
import "../App.css";
import {
  getSingleTeamMembers,
  addTeamMembers,
  getTeamMembers,
  addTeam,
  getTeams,
  editTeamMembers,
  getSingleTeam,
  fetchSingleSurvey,
  getSurvey,
  joinTeam,
  getPreFeeling, 
} from "../../actions/index";
import NavBar from "../NavBar/NavBar";
import GenerateTeams from './generateTeams';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      view: "",
      name: "",
      team_code: 0,
      team_id: 0,
      loaded: false,
      jointeam: "",
      createTeam: ""
    };
  }

  componentDidMount() {
    // this.props.getSingleTeamMembers(localStorage.getItem("email"));

    // const code = this.props.match.params.code;
    // console.log(code);
    // if (code) {
    //   this.fetchAuth(code);
    // }
    this.props.getSurvey(this.props.singleTeamMembers[0].id);
    this.setState({
      loaded: true
    });
    this.props.getPreFeeling()
  }

  // this.props.teamMembers.length !== prevProps.teamMembers.length

  componentDidUpdate(prevProps) {
    // if (this.props.singleTeamMembers !== prevProps.singleTeamMembers) {
    //   this.props.getSingleTeamMembers(localStorage.getItem("email"));
    //   console.log(this.props.singleTeamMembers);
    // }
    // this.props.getSingleTeamMembers(localStorage.getItem("email"));
    // this.props.getTeamMembers();
    // const code = this.props.match.params.code;
    // console.log(code);
    // if (code !== prevProps.match.params.code) {
    //   this.fetchAuth(code);
    // }
    if (
      this.props.surveyIsFetching === false &&
      this.props.survey.length > 0 &&
      this.state.loaded === true
    ) {
      this.props.fetchSingleSurvey(this.props.survey[0].survey_time_stamp);
      this.props.getSingleTeam(this.props.singleTeamMembers[0].team_id);
      this.props.getSingleTeamMembers(localStorage.getItem("email"));
      this.setState({
        loaded: false
      });
    }
  }

  // fetchAuth = code => {
  //   const uri = "https://sentimentbot.netlify.com/profile";
  //   axios
  //     .get(
  //       `https://slack.com/api/oauth.access?code=${code}&client_id=555765331446.554661112789&client_secret=65618f3ce7feca293e1abae74cae7afc&redirect_uri=${uri}&state=2ndstate`
  //     )
  //     .then(response => {
  //       console.log("response", response);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // };

  createTeam = event => {
    event.preventDefault();
    const name = this.state.createTeam;
    const memberId = this.props.singleTeamMembers[0].id;
    const combine = { name: name, memberId: memberId };
    this.props.addTeam(combine);
    console.log(this.state.createTeam);
    this.setState({
      ...this.state,
      view: "create",
      createTeam: ""
    });
    let currentMember = this.props.singleTeamMembers[0];
    currentMember.type = "manager";
    this.props.getSingleTeamMembers(localStorage.getItem("email"));
  };

  addCodeToMember = event => {
    event.preventDefault();
    const code = parseInt(this.state.team_code);
    let teams = this.props.teams;
    let futureTeamId = null;
    // let teamID = teams.map(item => {
    //   if (item.team_code === code) {
    //     return item.id;
    //   }
    // });

    for (let i = 0; i < teams.length; i++) {
      if (teams[i].team_code === code) {
        futureTeamId = teams[i].id;
      }
    }

    console.log(futureTeamId);

    let member = this.props.singleTeamMembers[0];

    member.team_id = futureTeamId;
    member.type = "team_member";

    console.log(member);

    this.props.joinTeam(member.id, { team_code: code });
    this.setState({
      view: "join",
      team_code: 0
    });
    let currentMember = this.props.singleTeamMembers[0];

    currentMember.type = member.type;
    currentMember.team_id = futureTeamId;
    this.props.history.push("/loading");
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // submitHandler = event => {
  //   event.preventDefault();
  //   this.props.addTeamMembers(this.state);
  //   this.setState({
  //     ...this.state,
  //     name: this
  //   });
  //   history.push("/profile");
  // };

  render() {
    // if(!localStorage.getItem('email')){
    //   this.props.history.push('/home')
    // }

    const view = this.state.view;

    const uri = "https://sentimentbot.netlify.com/authorization";
    // const uri = "http://localhost:3000/authorization";
    console.log(view);

    if (this.props.singleTeamMembers[0].team_id != null) {
      return (
<div>
        <NavBar />
        <div className="main-container">
         <div className="name-container"> <h1 className="welcome-container">Welcome, {this.props.singleTeamMembers[0].firstName}!</h1>
          <p>Join your team on Slack!</p>
          <a
            href={`https://slack.com/oauth/authorize?scope=commands&client_id=553324377632.554405336645&redirect_uri=${uri}&state=${
              this.props.singleTeamMembers[0].id
            }`}
          >
            <img
              alt="Add to Slack"
              height="40"
              width="139"
              src="https://platform.slack-edge.com/img/add_to_slack.png"
              srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
            />
          </a>
          </div>
          <p>Team: {this.props.singleTeams[0].name}</p>
          <div>
            <p>List of all your reactions</p>
            {this.props.feelings.length > 0 ? (
              <p>
                <GenerateTeams />
              </p>
            ) : (
              <p>Oops! You haven't responded to any surveys yet!</p>
            )}
          </div>
        </div>
        </div>
      );
    }
    if (view === "") {
      return (
        <div>
        <NavBar />
        <div className="join-container">
          <div>
            <br />
            <br />
            <input
              onChange={this.handleChange}
              name="team_code"
              id="number"
              type="number"
              min="0"
              step="1"
              placeholder="Enter Team Code Here"
            />
            <br />
            <button onClick={this.addCodeToMember}>
              Join with this team code
            </button>{" "}
            <br />
            <br />
            <input
              onChange={this.handleChange}
              name="createTeam"
              placeholder="Your Team Name"
            />{" "}
            <br />
            <button onClick={this.createTeam}>Create a Team</button> <br />
          </div>
        </div>
        </div>
      );
    } else if (view === "create") {
      return (
        <div className="create-container">
          {/* <p>Loading...</p> */}
          <NavBar />
          <a
            href={`https://slack.com/oauth/authorize?scope=commands,bot&client_id=553324377632.554405336645&redirect_uri=${uri}&state=${
              this.props.singleTeamMembers[0].id
            }`}
          >
            <img
              alt="Add to Slack"
              height="40"
              width="139"
              src="https://platform.slack-edge.com/img/add_to_slack.png"
              srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
            />
          </a>

          <p>
            Congratulations on creating your team! Add us on slack, or click
            below to allow us to update your site access.
          </p>
          <br />
          <button onClick={() => this.props.history.push("/loading")}>
            Here!
          </button>
          {/* <form onSubmit={this.submitHandler} autoComplete="nope">
            <input
              autoComplete="off"
              type="text"
              onChange={this.handleChange}
              name="name"
              placeholder="Add Team Name"
              value={this.state.name}
            />
            <button
              onClick={() => {
                this.createTeam();
              }}
            >
              Submit Team Title
            </button>
          </form> */}
        </div>
      );
    } else if (view === "join") {
      return (
        <div className="container">
          <p>Loading...</p>
          {/* <NavBar />
          <a
            href={`https://slack.com/oauth/authorize?scope=commands&client_id=553324377632.554405336645&redirect_uri=${uri}&state=${
              this.props.singleTeamMembers[0].id
            }`}
          >
            <img
              alt="Add to Slack"
              height="40"
              width="139"
              src="https://platform.slack-edge.com/img/add_to_slack.png"
              srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
            />
          </a>
          <p>Congratulations on joining your team. Click the button above to join your team on Slack. Or, click below to see your profile.</p>
          <button onClick={() => this.setState({
            view: ""
          })}>Here</button> */}
          {/* <form onSubmit={this.submitHandler} autoComplete="nope">
            <input
              autoComplete="off"
              type="text"
              onChange={this.handleChange}
              name="team_code"
              placeholder="Add Team Code"
              value={this.state.team_code}
            />
            <button
              onClick={() => {
                this.addCodeToMember();
              }}
            >
              Submit Team Code
            </button>
          </form> */}
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    singleTeamMembers: state.teamMembersReducer.singleTeamMembers,
    error: state.teamMembersReducer.error,
    teamMembers: state.teamMembersReducer.teamMembers,
    survey: state.surveyReducer.survey,
    surveyIsFetching: state.surveyReducer.surveyIsFetching,
    singleSurvey: state.surveyReducer.singleSurvey,
    singleTeams: state.teamsReducer.singleTeams,
    feelings: state.feelingsReducer.feelings,
    teams: state.teamsReducer.teams
  };
}

export default connect(
  mapStateToProps,
  {
    getSingleTeamMembers,
    addTeamMembers,
    getTeamMembers,
    addTeam,
    getTeams,
    editTeamMembers,
    getSingleTeam,
    fetchSingleSurvey,
    getSurvey,
    joinTeam,
    getPreFeeling, 
  }
)(Profile);

// https://bikbik.auth0.com/login?state=g6Fo2SA3bW56SjVmbko1X3dYSWo4UUl5bjRRU08xRlVLTTdCb6N0aWTZIFF2anJoSFJheG5aV3N1N3NyR21TRzE2ZkQ4bUI4ZnR0o2NpZNkgQm5YU3ZVNnRFNFc4V0dNdDNnRFdyYTI0aFhyOHFZMGU&client=BnXSvU6tE4W8WGMt3gDWra24hXr8qY0e&protocol=oauth2&response_type=token%20id_token&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=openid%20profile%20email&nonce=ns7LGAhEZ5rqXoXMSra~MoODQHn~pEOc&auth0Client=eyJuYW1lIjoiYXV0aDAuanMiLCJ2ZXJzaW9uIjoiOS4xMC4wIn0%3D

// http://localhost:3000/callback#access_token=5YgbYYAujg1LoygaBq-z9NQIzZFTlvi-&expires_in=7200&token_type=Bearer&state=JC0g6LRhgFkT8aaIJT-F11s7HCC.G5dd&id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1qVkJPRGhHTURjM1JUWTBRVGt4TkRrM1JURXpRek5HUVVRd01ERXhOVGhFUmpBMU1FRkJPUSJ9.eyJnaXZlbl9uYW1lIjoiVGhvbWFzIiwiZmFtaWx5X25hbWUiOiJDbGF5ZG9uIiwibmlja25hbWUiOiJ0b21jbGF5ZG9uMTAyIiwibmFtZSI6IlRob21hcyBDbGF5ZG9uIiwicGljdHVyZSI6Imh0dHBzOi8vbGg0Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tbUJ4Wm9jZXRSMkkvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvQUNldm9RUEpfbmZqUXQwTXFXNnF4UTBDQzVXbjJyQi1ldy9tby9waG90by5qcGciLCJnZW5kZXIiOiJtYWxlIiwibG9jYWxlIjoiZW4iLCJ1cGRhdGVkX2F0IjoiMjAxOS0wMi0yMVQwNDoxMjo1My4zMDFaIiwiZW1haWwiOiJ0b21jbGF5ZG9uMTAyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2Jpa2Jpay5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDc5NDU2NDA3OTk2MDk3NzIyODIiLCJhdWQiOiJCblhTdlU2dEU0VzhXR010M2dEV3JhMjRoWHI4cVkwZSIsImlhdCI6MTU1MDcyMjM3MywiZXhwIjoxNTUwODA4NzczLCJhdF9oYXNoIjoiaEhfSzg2Z0xGWjZlZkhHbF9YSktPUSIsIm5vbmNlIjoiWkhkdEkyS1gyVFFUa2owcWFUWUtoSkVxekZpZnMtdEMifQ.AGLlaFrG9ZoyIHHBNub3ZkpSDJR7WgVp6XrpXo9L2I-x0bYz_ic2G71mvAGKBzXFCsWhU47MZ6Qf4BLtwsHZS_C13huljVJDJoEzYklM5mQxUIfCaOTPGsIx_3zninyU-nZ9HqIqRl4fyHKehQjZReXKI0mp_08oi3k-4cyfNhi2aztYoVksswojYSnFEBklwwRQaInDKX8R4oHCstY71JUSkX91jpjPagW5-sQ_iM_N5eRE1tT9J5i0exOCu64Bsa6LjGmBMenpV_6dFG_bzUjAgwh611rS5r6not1WsmqJPhXQ8_suUjT99g30vk1iXBqgN64UIQbqOrMkGPOT9A
