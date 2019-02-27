import React from "react";
import { connect } from "react-redux";
import {
  getSingleTeamMembers,
  addTeamMembers,
  getTeamMembers,
  addTeam,
  getTeams,
  editTeamMembers,
  getSingleTeam,
  fetchSingleSurvey,
  getSurvey
} from "../../actions/index";
import axios from "axios";
import NavBar from '../NavBar/NavBar'

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      view: "",
      name: "",
      team_code: 0,
      team_id: 0
    };
  }
  componentDidMount() {
    this.props.getSingleTeamMembers(localStorage.getItem("email"));
    this.props.getTeamMembers();

    const code = this.props.match.params.code;
    console.log(code);
    if (code) {
      this.fetchAuth(code);
    }
    this.props.getSurvey(this.props.singleTeamMembers[0].id)
  }

  // this.props.teamMembers.length !== prevProps.teamMembers.length

  componentDidUpdate(prevProps) {
    // if (this.props.singleTeamMembers !== prevProps.singleTeamMembers) {
    //   this.props.getSingleTeamMembers(localStorage.getItem("email"));
    //   console.log(this.props.singleTeamMembers);
    // }
    // this.props.getSingleTeamMembers(localStorage.getItem("email"));
    // this.props.getTeamMembers();
    const code = this.props.match.params.code;
    console.log(code);
    if (code !== prevProps.match.params.code) {
      this.fetchAuth(code);
    }
    if (this.props.survey.length === 0) {
      return
    } else if (this.props.isFetching === false && this.props.singleSurvey.length < 1) {
      this.props.fetchSingleSurvey(this.props.survey[0].survey_time_stamp)
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
    const single = this.props.singleTeamMembers[0];
    const team = {
      name: this.state.name
    };
    this.props.addTeam(team);
    this.editManager();
  };

  addCodeToMember = event => {
    event.preventDefault();

    const code = this.state.team_code;
    let teams = this.props.getTeams();
    let teamID = teams.map(item => {
      if (item.team_code === code) {
        return item.id;
      }
    });

    let member = this.props.singleTeamMembers[0];

    member.team_id = teamID;
    member.type = "team_member";

    console.log(member);

    this.props.editTeamMembers(member.id, member);
  };

  editManager = () => {
    let teams = this.props.getTeams();
    let newTeam = teams[teams.length - 1];

    let member = this.props.singleTeamMembers[0];

    member.team_id = newTeam.id;
    member.type = "manager";

    console.log(member);

    this.props.editTeamMembers(member.id, member);
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
    if(!localStorage.getItem('email')){
      this.props.history.push('/home')
    } 

    const view = this.state.view;
    const uri = "https://sentimentbot.netlify.com/profile";
    // const uri = "http://localhost:3000/profile";
    console.log(view);
    if (view === "") {
      return (
        <div>
<NavBar />
          <div>
            <button
              onClick={() => {
                this.setState({
                  ...this.state,
                  view: "join"
                });
              }}
            >
              Join a Team
            </button>
            <button
              onClick={() => {
                this.setState({
                  ...this.state,
                  view: "create"
                });
              }}
            >
              Create a Team
            </button>
          </div>
        </div>
      );
    } else if (view === "create") {
      return (
        <div>
                  <NavBar />
          <a
            href={`https://slack.com/oauth/authorize?scope=commands,bot&client_id=553324377632.554405336645&redirect_uri=${uri}&state=teststate`}
          >
            <img
              alt="Add to Slack"
              height="40"
              width="139"
              src="https://platform.slack-edge.com/img/add_to_slack.png"
              srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
            />
          </a>
          <form onSubmit={this.submitHandler} autoComplete="nope">
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
          </form>
        </div>
      );
    } else if (view === "join") {
      return (
        <div>
          <NavBar />
          <a href={`https://slack.com/oauth/authorize?scope=commands&client_id=553324377632.554405336645&redirect_uri=${uri}&state=teststate`}>
            <img
              alt="Add to Slack"
              height="40"
              width="139"
              src="https://platform.slack-edge.com/img/add_to_slack.png"
              srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
            />
          </a>
          <form onSubmit={this.submitHandler} autoComplete="nope">
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
          </form>
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
    isFetching: state.surveyReducer.isFetching,
    singleSurvey: state.surveyReducer.singleSurvey
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
    getSurvey
  }
)(Profile);

// https://bikbik.auth0.com/login?state=g6Fo2SA3bW56SjVmbko1X3dYSWo4UUl5bjRRU08xRlVLTTdCb6N0aWTZIFF2anJoSFJheG5aV3N1N3NyR21TRzE2ZkQ4bUI4ZnR0o2NpZNkgQm5YU3ZVNnRFNFc4V0dNdDNnRFdyYTI0aFhyOHFZMGU&client=BnXSvU6tE4W8WGMt3gDWra24hXr8qY0e&protocol=oauth2&response_type=token%20id_token&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=openid%20profile%20email&nonce=ns7LGAhEZ5rqXoXMSra~MoODQHn~pEOc&auth0Client=eyJuYW1lIjoiYXV0aDAuanMiLCJ2ZXJzaW9uIjoiOS4xMC4wIn0%3D

// http://localhost:3000/callback#access_token=5YgbYYAujg1LoygaBq-z9NQIzZFTlvi-&expires_in=7200&token_type=Bearer&state=JC0g6LRhgFkT8aaIJT-F11s7HCC.G5dd&id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1qVkJPRGhHTURjM1JUWTBRVGt4TkRrM1JURXpRek5HUVVRd01ERXhOVGhFUmpBMU1FRkJPUSJ9.eyJnaXZlbl9uYW1lIjoiVGhvbWFzIiwiZmFtaWx5X25hbWUiOiJDbGF5ZG9uIiwibmlja25hbWUiOiJ0b21jbGF5ZG9uMTAyIiwibmFtZSI6IlRob21hcyBDbGF5ZG9uIiwicGljdHVyZSI6Imh0dHBzOi8vbGg0Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tbUJ4Wm9jZXRSMkkvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvQUNldm9RUEpfbmZqUXQwTXFXNnF4UTBDQzVXbjJyQi1ldy9tby9waG90by5qcGciLCJnZW5kZXIiOiJtYWxlIiwibG9jYWxlIjoiZW4iLCJ1cGRhdGVkX2F0IjoiMjAxOS0wMi0yMVQwNDoxMjo1My4zMDFaIiwiZW1haWwiOiJ0b21jbGF5ZG9uMTAyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2Jpa2Jpay5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDc5NDU2NDA3OTk2MDk3NzIyODIiLCJhdWQiOiJCblhTdlU2dEU0VzhXR010M2dEV3JhMjRoWHI4cVkwZSIsImlhdCI6MTU1MDcyMjM3MywiZXhwIjoxNTUwODA4NzczLCJhdF9oYXNoIjoiaEhfSzg2Z0xGWjZlZkhHbF9YSktPUSIsIm5vbmNlIjoiWkhkdEkyS1gyVFFUa2owcWFUWUtoSkVxekZpZnMtdEMifQ.AGLlaFrG9ZoyIHHBNub3ZkpSDJR7WgVp6XrpXo9L2I-x0bYz_ic2G71mvAGKBzXFCsWhU47MZ6Qf4BLtwsHZS_C13huljVJDJoEzYklM5mQxUIfCaOTPGsIx_3zninyU-nZ9HqIqRl4fyHKehQjZReXKI0mp_08oi3k-4cyfNhi2aztYoVksswojYSnFEBklwwRQaInDKX8R4oHCstY71JUSkX91jpjPagW5-sQ_iM_N5eRE1tT9J5i0exOCu64Bsa6LjGmBMenpV_6dFG_bzUjAgwh611rS5r6not1WsmqJPhXQ8_suUjT99g30vk1iXBqgN64UIQbqOrMkGPOT9A