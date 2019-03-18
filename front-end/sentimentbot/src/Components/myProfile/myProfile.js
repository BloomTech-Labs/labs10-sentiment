import React from "react";
import { connect } from "react-redux";
// import "../App.css";
import "./myProfile.css";
// import FooterPage from "../Footer/footer-test";
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
  getFeelings,
  getManagers,
  getSurveyActivity
} from "../../actions/index";
import NavBar from "../NavBar/NavBar";
import GenerateTeams from "./generateTeams";
import GenerateSurveys from "./generateSurveys";
import Happy from "../PNG/nobackgroundHappy.png";
import loadinggif from "../callback/loading.svg";
class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      view: "",
      name: "",
      team_code: 0,
      team_id: 0,
      jointeam: "",
      createTeam: "",
      loading: true,
      added: false
    };
  }

  componentDidMount() {
    //new code
    this.props.getSingleTeamMembers(localStorage.getItem("email"));
    this.props.getSurvey(localStorage.getItem("id"));
    this.props.getTeams();
    this.props.getManagers(localStorage.getItem("id"));
    this.props.getSingleTeam(localStorage.getItem("team_id"));
    this.props.getFeelings(localStorage.getItem("id"));
    this.props.getSurveyActivity();
    if (this.props.survey.length > 0) {
      this.props.fetchSingleSurvey(this.props.survey[0].survey_time_stamp);
      this.setState({
        loading: false
      });
    } else {
      this.setState({
        loading: false
      });
    }
    //old code
    // this.props.getSurvey(this.props.singleTeamMembers[0].id);
    // this.props.getPreFeeling();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.survey.length !== prevProps.survey.length) {
      this.props.fetchSingleSurvey(this.props.survey[0].survey_time_stamp);
    }

    if (this.state.added === true) {
      this.props.getSingleTeamMembers(localStorage.getItem("email"));
      this.setState({
        added: false
      });
    }

    if (this.props.teams.length !== prevProps.teams.length) {
      this.props.getSingleTeamMembers(localStorage.getItem("email"));
    }

    if (
      this.props.singleTeamMembers.length > 0 &&
      localStorage.getItem("team_id") === null
    ) {
      if (
        this.props.singleTeamMembers[0].team_id !==
        localStorage.getItem("team_id")
      ) {
        this.props.getSingleTeamMembers(localStorage.getItem("email"));
      }
    }

    // if (localStorage.getItem('team_id') === null) {
    //   localStorage.setItem('team_id', this.props.singleTeamMembers[0].team_id)
    //   this.props.getSingleTeam(localStorage.getItem('team_id'))
    // }

    // if(this.props.singleTeamMembers.team_id !== null) {
    //   localStorage.setItem('team_id', this.props.singleTeamMembers[0].team_id)
    // }
    //   //new code
    //   if (
    //     this.props.singleTeamMembers.length !== prevProps.singleTeamMembers.length
    //   ) {
    //     this.props.getSingleTeam(localStorage.getItem('team_id'));
    //     this.props.getFeelings(localStorage.getItem('id'));
    //     if (this.props.survey.length > 0) {
    //     this.props.fetchSingleSurvey(this.props.survey[0].survey_time_stamp);
    //     this.setState({
    //       loading: false
    //     })
    //     } else {
    //     this.setState({
    //       loading: false
    //     })
    //   }
  }

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

  //old code
  // if (
  //   this.props.surveyIsFetching === false &&
  //   this.props.survey.length > 0 &&
  //   this.state.loading === true
  // ) {
  //   this.props.fetchSingleSurvey(this.props.survey[0].survey_time_stamp);
  //   this.props.getSingleTeam(this.props.singleTeamMembers[0].team_id);
  //   this.props.getSingleTeamMembers(localStorage.getItem("email"));
  //   this.setState({
  //     loading: false
  //   });
  // }
  // }

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
      createTeam: "",
      added: true
      // view: 'create'
    });
    let currentMember = this.props.singleTeamMembers[0];
    currentMember.type = "manager";
    // this.props.getSingleTeamMembers(localStorage.getItem("email"));
    localStorage.setItem("joined", true);
    alert("Our Mood Bots are on it");
    // localStorage.setItem('type', 'manager')
    // this.props.getTeams();
    // this.props.history.push(<Callback />);
    setTimeout(() => {
      // window.location.reload();
      this.props.history.push("/loading");
    }, 500);
  };

  goToSurveyMaker = event => {
    event.preventDefault();
    this.props.history.push("/survey");
  }

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
      team_code: 0,
      added: true
    });
    let currentMember = this.props.singleTeamMembers[0];
    this.props.getSingleTeamMembers(localStorage.getItem("email"));

    currentMember.type = member.type;
    currentMember.team_id = futureTeamId;
    // localStorage.setItem('team_id', futureTeamId)
    // localStorage.setItem('type', 'team_member')
    localStorage.setItem("joined", true);
    alert("Our Mood Bots are on it");

    // window.location.reload();
    this.props.history.push("/loading");
    // setTimeout(() => {
    //   window.location.reload();
    // }, 2200);
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
    if (!localStorage.getItem("email")) {
      this.props.history.push("/home");
    }
    const view = this.state.view;

    const uri = "https://botsentiment.herokuapp.com/api/slackauth";
    // const uri = "http://localhost:3000/authorization";
    console.log(view);
    if (this.state.loading === true) {
      return <img className="loadinggif" src={loadinggif} alt="loading" />;
    } else if (
      this.props.singleTeams.length > 0 &&
      localStorage.getItem("team_id") != null
    ) {
      return (
        <div className="profilepage-container background-color">
          <NavBar />
          <div className="profilecontent-container">
            <div className="name-container">
              {" "}
              <h1 className="welcome-container" style={{fontFamily: 'Roboto Slab, serif', fontSize: '4rem', marginTop: '4%' }}>
                Welcome, {this.props.singleTeamMembers[0].firstName}!
                </h1>
              <div className="sub-container-1">
                <div className="sub-container-2">
                  {this.props.managers.length === 0 ? (
                    <h2>Join your team on Slack!</h2>
                  ) : (
                    <p className="optional-text">
                      You've already implemented Mood on Slack. You can update
                      your workspace by clicking the button below.
                    </p>
                  )}
                  {this.props.singleTeamMembers[0].type === "manager" ? (
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
                  ) : (
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
                  )}
                  {this.props.managers.length === 1 ? (
                  this.props.singleTeamMembers[0].type === "manager" ? (
                  <h2 className="optional-text-2">Once you're connected to a slack work space, connect your mood bot to a channel with the slash command: <span className="span">/connect_channel_to_survey</span></h2>
                  ) : (
                    <h2 className="optional-text-2">Hint once connected to a slack workspace, you can use the slash command: <span className="span">/send-me-buttons</span> to receive existing surveys!</h2>
                  )
                  ): (null)
                  }
                  <h3 className="team-wordbox">Team: {this.props.singleTeams[0].name}</h3>
                </div>
                <div className="secondcolumn">
                  <img
                    className="happy"
                    src={Happy}
                    alt="Happy MoodBot"
                    width="58"
                    height="58"
                  />
                  <div>
                    {localStorage.getItem('type') === 'manager' ? (<div id="gotosurveymaker" onClick={this.goToSurveyMaker}>Create Survey</div> ) : (null)}
                  </div>
                </div>
              </div>   
            </div>
            <div className="reactions">
              {this.props.singleTeamMembers[0].type === "manager" ? (
                <p>Your Surveys:</p>
              ) : (
                <p>Your Reactions:</p>
              )}
              <div className="reactions-scroll">
                {this.props.singleTeamMembers[0].type === "manager" ? (
                  this.props.survey.length > 0 ? (
                    <p>
                      <GenerateSurveys />
                    </p>
                  ) : (
                    <p>Oops! You haven't created any surveys yet!</p>
                  )
                ) : this.props.feelings.length > 0 ? (
                  <p>
                    <GenerateTeams />
                  </p>
                ) : (
                  <p>Oops! You haven't responded to any surveys yet!</p>
                )}
              </div>
            </div>
            {/* <div className="btn-div">
              <button className="btn-feel">Responed to Latest Survey</button>
            </div> */}
          </div>
          {/* <FooterPage /> */}
        </div>
      );
    }
    if (view === "") {
      return (
        <div className="profilepage-container background-color">
          <NavBar />
          <div className="profilecontent-container">
            <div className="sub-container-3">
              {" "}
              <h1 className="welcome-container">Welcome to Mood!</h1>
              <img
                className="happy"
                src={Happy}
                alt="Happy MoodBot"
                width="200"
                height="200"
              />
            </div>
            <div className="sub-container-4">
              <h2>You're not on a Team!</h2>
              <p className="p-con-4">
                If you wish to join an existing team as a team member, place the
                team code provided by you're project manager inside the team
                code input and click the "Join A Team" button.
              </p>
              <p className="p-con-4">
                If you wish to create a team as a team manager, place you're
                team name inside the team name input and click the "Create A
                Team" button.
              </p>
              <div className="sub-container-5">
                <div className="input-div">
                  <h3>Join a Team!</h3>
                  <p>Submit the Team Code Below</p>
                  <input
                    onChange={this.handleChange}
                    name="team_code"
                    id="number"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="Enter Team Code Here"
                  />
                  <button className="btn-feel" onClick={this.addCodeToMember}>
                    Join A Team
                  </button>{" "}
                </div>
                <div className="input-div">
                  <h3>Create a Team!</h3>
                  <p>Submit the Team Name Below</p>
                  <input
                    onChange={this.handleChange}
                    name="createTeam"
                    placeholder="Your Team Name"
                  />{" "}
                  <button className="btn-feel" onClick={this.createTeam}>
                    Create a Team
                  </button>{" "}
                </div>
              </div>
            </div>
          </div>
          {/* <FooterPage /> */}
        </div>
      );
    } else if (view === "create") {
      return (
        <div className="page-container background-color">
          <div className="profilecontent-container">
            {/* <p>Loading...</p> */}
            <NavBar />
            {/* <a
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
          </a> */}
            <div className="container-pandb">
              {localStorage.getItem("team_id") !== null ? (
                <p className="p-tag">
                  Congratulations on creating your team! Our bots will update
                  you access in just a moment. Once the page refreshes, feel
                  free to explore the site.
                </p>
              ) : (
                <p>Feel free to explore the site.</p>
              )}
              <br />
              {/* <button
              className="btn-feel-2 "
              onClick={() => this.props.history.push("/loading")}
            >
              Here!
            </button> */}
            </div>
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
          {/* <FooterPage /> */}
        </div>
      );
    }
    // } else if (view === "join") {
    //   return (
    //     <div className="background-color">
    //     <div className="container">
    //       <p>Loading...</p>
    //       {/* <NavBar />
    //       <a
    //         href={`https://slack.com/oauth/authorize?scope=commands&client_id=553324377632.554405336645&redirect_uri=${uri}&state=${
    //           this.props.singleTeamMembers[0].id
    //         }`}
    //       >
    //         <img
    //           alt="Add to Slack"
    //           height="40"
    //           width="139"
    //           src="https://platform.slack-edge.com/img/add_to_slack.png"
    //           srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
    //         />
    //       </a>
    //       <p>Congratulations on joining your team. Click the button above to join your team on Slack. Or, click below to see your profile.</p>
    //       <button onClick={() => this.setState({
    //         view: ""
    //       })}>Here</button> */}
    //       {/* <form onSubmit={this.submitHandler} autoComplete="nope">
    //         <input
    //           autoComplete="off"
    //           type="text"
    //           onChange={this.handleChange}
    //           name="team_code"
    //           placeholder="Add Team Code"
    //           value={this.state.team_code}
    //         />
    //         <button
    //           onClick={() => {
    //             this.addCodeToMember();
    //           }}
    //         >
    //           Submit Team Code
    //         </button>
    //       </form> */}
    //       {/* <Footer /> */}
    //     </div>
    //     </div>
    //   );
    // }
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
    teams: state.teamsReducer.teams,
    managers: state.managersReducer.managers,
    managersIsFetching: state.managersReducer.managersIsFetching,
    active: state.surveyReducer.active
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
    getFeelings,
    getManagers,
    getSurveyActivity
  }
)(Profile);

// https://bikbik.auth0.com/login?state=g6Fo2SA3bW56SjVmbko1X3dYSWo4UUl5bjRRU08xRlVLTTdCb6N0aWTZIFF2anJoSFJheG5aV3N1N3NyR21TRzE2ZkQ4bUI4ZnR0o2NpZNkgQm5YU3ZVNnRFNFc4V0dNdDNnRFdyYTI0aFhyOHFZMGU&client=BnXSvU6tE4W8WGMt3gDWra24hXr8qY0e&protocol=oauth2&response_type=token%20id_token&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fcallback&scope=openid%20profile%20email&nonce=ns7LGAhEZ5rqXoXMSra~MoODQHn~pEOc&auth0Client=eyJuYW1lIjoiYXV0aDAuanMiLCJ2ZXJzaW9uIjoiOS4xMC4wIn0%3D

// http://localhost:3000/callback#access_token=5YgbYYAujg1LoygaBq-z9NQIzZFTlvi-&expires_in=7200&token_type=Bearer&state=JC0g6LRhgFkT8aaIJT-F11s7HCC.G5dd&id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1qVkJPRGhHTURjM1JUWTBRVGt4TkRrM1JURXpRek5HUVVRd01ERXhOVGhFUmpBMU1FRkJPUSJ9.eyJnaXZlbl9uYW1lIjoiVGhvbWFzIiwiZmFtaWx5X25hbWUiOiJDbGF5ZG9uIiwibmlja25hbWUiOiJ0b21jbGF5ZG9uMTAyIiwibmFtZSI6IlRob21hcyBDbGF5ZG9uIiwicGljdHVyZSI6Imh0dHBzOi8vbGg0Lmdvb2dsZXVzZXJjb250ZW50LmNvbS8tbUJ4Wm9jZXRSMkkvQUFBQUFBQUFBQUkvQUFBQUFBQUFBQUEvQUNldm9RUEpfbmZqUXQwTXFXNnF4UTBDQzVXbjJyQi1ldy9tby9waG90by5qcGciLCJnZW5kZXIiOiJtYWxlIiwibG9jYWxlIjoiZW4iLCJ1cGRhdGVkX2F0IjoiMjAxOS0wMi0yMVQwNDoxMjo1My4zMDFaIiwiZW1haWwiOiJ0b21jbGF5ZG9uMTAyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL2Jpa2Jpay5hdXRoMC5jb20vIiwic3ViIjoiZ29vZ2xlLW9hdXRoMnwxMDc5NDU2NDA3OTk2MDk3NzIyODIiLCJhdWQiOiJCblhTdlU2dEU0VzhXR010M2dEV3JhMjRoWHI4cVkwZSIsImlhdCI6MTU1MDcyMjM3MywiZXhwIjoxNTUwODA4NzczLCJhdF9oYXNoIjoiaEhfSzg2Z0xGWjZlZkhHbF9YSktPUSIsIm5vbmNlIjoiWkhkdEkyS1gyVFFUa2owcWFUWUtoSkVxekZpZnMtdEMifQ.AGLlaFrG9ZoyIHHBNub3ZkpSDJR7WgVp6XrpXo9L2I-x0bYz_ic2G71mvAGKBzXFCsWhU47MZ6Qf4BLtwsHZS_C13huljVJDJoEzYklM5mQxUIfCaOTPGsIx_3zninyU-nZ9HqIqRl4fyHKehQjZReXKI0mp_08oi3k-4cyfNhi2aztYoVksswojYSnFEBklwwRQaInDKX8R4oHCstY71JUSkX91jpjPagW5-sQ_iM_N5eRE1tT9J5i0exOCu64Bsa6LjGmBMenpV_6dFG_bzUjAgwh611rS5r6not1WsmqJPhXQ8_suUjT99g30vk1iXBqgN64UIQbqOrMkGPOT9A
