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
  getPreFeeling
} from "../../actions/index";
import history from "../history";
import "./authorization.css";
import Happy from "../PNG/nobackgroundHappy.png";
class Authorization extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: localStorage.getItem("email"),
    phone: "",
    type: null,
    team_id: null,
    view: ""
  };

  componentDidMount() {
    this.props.getSingleTeamMembers(localStorage.getItem("email"));
    this.props.getTeamMembers();
    this.submit = false;
    this.props.getTeams();
    this.props.getPreFeeling();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.singleTeamMembers.length !== prevProps.singleTeamMembers.length
    ) {
      this.props.getSingleTeam(this.props.singleTeamMembers[0].team_id);
      this.props.getFeelings(this.props.singleTeamMembers[0].id);
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitHandler = event => {
    event.preventDefault();
    let firstName = this.state.firstName;
    let lastName = this.state.lastName;
    let email = this.state.email;
    let phone = this.state.phone;
    let type = null;
    let team_id = null;
    let combine = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      type: type,
      team_id: team_id
    };
    this.props.addTeamMembers(combine);
    this.setState({
      firstName: "",
      lastName: "",
      email: localStorage.getItem("email"),
      phone: "",
      type: null,
      team_id: null,
      view: "done"
    });
    this.submit = true;
    this.props.getTeamMembers();
  };

  render() {
    if (!localStorage.getItem("email")) {
      this.props.history.push("/home");
    }

    if (this.props.tmIsFetching === true) {
      return (
        <div className="auth-container">
          <p>Loading...</p>
        </div>
      );
    }

    const makeInput = name => (
      <input
        autoComplete="off"
        type="text"
        onChange={this.handleChange}
        name={name}
        placeholder={name}
        value={this.state[name]}
      />
    );

    if (this.state.view === "") {
      return (
        <>
          <div className="fake-nav" />
          {this.props.singleTeamMembers.length === 0 ? (
            <div className="container-form">
              <p>Please finish registering before continuing...</p>
              <form onSubmit={this.submitHandler} autoComplete="nope">
                {makeInput("firstName")}
                {makeInput("lastName")} {makeInput("email")}
                {makeInput("phone")}
                <button className="btn-feel" >Sign Up</button>
              </form>
              <img
                  className="happy-auth"
                  src={Happy}
                  alt="Happy MoodBot"
                  width="200"
                  height="200"
                />
            </div>
          ) : (
            <div className="container">
              <p>Welcome Back!</p>
              <button className="btn-feel-2" onClick={() => history.replace("/profile")}>
                Continue To Profile
              </button>
            </div>
          )}
        </>
      );
    } else {
      return (
        <>
        <div className="fake-nav" />
        <div className="auth-container">
          
          <p>
            Thanks for registering! Please allow us a moment to finish
            registering you
          </p>
          <button className="btn-feel-2" onClick={() => this.props.history.push("/loading")}>
            Thank you
          </button>
        </div>
        </>
      );
    }
  }
}

// if empty then render signup field

function mapStateToProps(state) {
  return {
    singleTeamMembers: state.teamMembersReducer.singleTeamMembers,
    tmIsFetching: state.teamMembersReducer.tmIsFetching,
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
    getFeelings,
    getPreFeeling
  }
)(Authorization);
