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
  getSingleTeam
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
    this.props.getSingleTeamMembers(localStorage.getItem("email"));
    this.props.getTeamMembers();
    this.submit = false
    this.props.getTeams()
    this.props.getSingleTeam(6)
    console.log(this.props.singleTeams)
  }

  // componentDidUpdate(prevProps) {
  //   if(this.props.teamMembers.length !== prevProps.teamMembers.length) {
  //     getSingleTeamMembers(localStorage.getItem('email'))
  //   }
  // }

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
        <NavBar />
        {this.props.singleTeamMembers.length < 1 || this.submit === true ? (
          <form onSubmit={this.submitHandler} autoComplete="nope">
            {makeInput("firstName")}
            {makeInput("lastName")} {makeInput("email")}
            {makeInput("phone")}
            <button>Sign Up</button>
          </form>
        ) : (
          <button onClick={() => history.replace("/profile")}>
            Continue To Profile
          </button>
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
    singleTeams: state.teamsReducer.singleTeams
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
    getSingleTeam
  }
)(Authorization);
