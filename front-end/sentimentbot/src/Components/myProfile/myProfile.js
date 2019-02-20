import React from "react";
import { connect } from "react-redux";
import {
  getSingleTeamMembers,
  addTeamMembers,
  getTeamMembers,
  addTeam,
  getTeams,
  editTeamMembers,
  getSingleTeam
} from "../../actions/index";
import axios from "axios";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      view: "",
      name: "",
      team_code: 0
    };
  }
  componentDidMount() {
    this.props.getSingleTeamMembers(localStorage.getItem("email"));
    this.props.getTeamMembers();

    // const code = this.props.match.params.code;
    // console.log(code);
    // if (code) {
    //   this.fetchAuth(code);
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
    // if (code !== prev.match.params.code) {
    //   this.fetchAuth(code);
    // }
  }

  // fetchAuth = code => {
  //   axios
  //     .post(
  //       `https://slack.com/api/oauth.access`,
  //       `client_id=555765331446.554661112789&client_secret=65618f3ce7feca293e1abae74cae7afc&code=${code}&redirect_uri=https://sentimentbot.netlify.com/home&single_channel=false`
  //     )
  //     .then(response => {
  //       // this.setState(() => ({ movie: response.data }));
  //       console.log("response", response);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // };

  createTeam = event => {
    event.preventDefault();
    // const single = this.props.singleTeamMembers[0];
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
    let teamID = teams.map(item=>{if(item.team_code === code){
      return item.id;
    }})

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
    const view = this.state.view;
    console.log(view);
    if (view === "") {
      return (
        <div>
          <a href="https://slack.com/oauth/authorize?scope=commands,bot&client_id=553324377632.554405336645">
            <img
              alt="Add to Slack"
              height="40"
              width="139"
              src="https://platform.slack-edge.com/img/add_to_slack.png"
              srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
            />
          </a>
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
        <a href="https://slack.com/oauth/authorize?scope=commands,bot&client_id=553324377632.554405336645">
            <img
              alt="Add to Slack"
              height="40"
              width="139"
              src="https://platform.slack-edge.com/img/add_to_slack.png"
              srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
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
          <a href="https://slack.com/oauth/authorize?scope=commands,bot&client_id=553324377632.554405336645">
            <img
              alt="Add to Slack"
              height="40"
              width="139"
              src="https://platform.slack-edge.com/img/add_to_slack.png"
              srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
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
    isFetching: state.teamMembersReducer.isFetching,
    error: state.teamMembersReducer.error,
    teamMembers: state.teamMembersReducer.teamMembers
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
    getSingleTeam
  }
)(Profile);
