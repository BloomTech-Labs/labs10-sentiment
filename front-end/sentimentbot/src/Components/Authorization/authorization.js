// Check if email matches an existing email
// If they have registered but are not a team,
// Or if the are on team then it takes them to their profile.
// CDM with axios to db GET as JSON obj

import React from "react";
import { connect } from "react-redux";
import {
  getSingleTeamMembers,
  addTeamMembers,
  getTeamMembers,
  fetchSingleSurvey,
  getSurvey,
  getTeams,
  getSingleTeam,
  getFeelings,
} from "../../actions/index";
import history from "../history";
import NavBar from "../NavBar/NavBar";

class Authorization extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: localStorage.getItem("email"),
    phone: "",
    type: null,
    team_id: null
  };

  componentDidMount() {
    this.props.getTeams()
    this.props.getSingleTeamMembers(localStorage.getItem("email"))
    this.props.getTeamMembers()
    this.submit = false
    this.props.getTeams()
  }

  componentDidUpdate(prevProps) {
    if(this.props.singleTeamMembers.length != prevProps.singleTeamMembers.length) {
      this.props.getSingleTeam(this.props.singleTeamMembers[0].team_id)
      this.props.getFeelings(this.props.singleTeamMembers[0].id)
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.addTeamMembers(this.state);
    this.setState({
      firstName: "",
      lastName: "",
      email: localStorage.getItem("email"),
      phone: "",
      type: null,
      team_id: null
    });
    this.submit = true
    // history.push('/profile')
  };

  render() {
    if (!localStorage.getItem("email")) {
      this.props.history.push("/home");
    }

    const makeInput = name => (
      <textarea
        autoComplete="off"
        type="text"
        onChange={this.handleChange}
        name={name}
        placeholder={name}
        value={this.state[name]}
      />
    );

    return (
      <>
        {this.props.singleTeamMembers.length < 1 || this.submit === true ? (
          <div className="container">
          <p>Please finish registering before continuing...</p>
          <form onSubmit={this.submitHandler} autoComplete="nope">
            {makeInput("firstName")}
            {makeInput("lastName")} {makeInput("email")}
            {makeInput("phone")}
            <button>Sign Up</button>
          </form>
          </div>
        ) : (
          <div className="container">
          <p>Welcome Back!</p>
          <button onClick={() => history.replace("/profile")}>
            Continue To Profile
          </button>
          </div>
        )}
      </>
    );
  }
}

// if empty then render signup field

function mapStateToProps(state) {
  return {
    singleTeamMembers: state.teamMembersReducer.singleTeamMembers,
    isFetching: state.teamMembersReducer.isFetching,
    error: state.teamMembersReducer.error,
    teamMembers: state.teamMembersReducer.teamMembers,
    survey: state.surveyReducer.survey,
    singleSurvey: state.surveyReducer.singleSurvey,
    teams: state.teamsReducer.teams,
    singleTeams: state.teamsReducer.singleTeams,
    feelings: state.feelingsReducer.feelings
  };
}

export default connect(
  mapStateToProps,
  {
    getSingleTeamMembers,
    addTeamMembers,
    getTeamMembers,
    fetchSingleSurvey,
    getSurvey,
    getTeams,
    getSingleTeam,
    getFeelings
  }
)(Authorization);
