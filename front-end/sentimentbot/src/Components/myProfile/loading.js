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
  getFeelings
} from "../../actions/index";
import "./myProfile.css";
class Loading extends React.Component {
  state = {
    complete1: false,
    complete2: false
  };

  componentDidMount() {
    if (
      this.props.tmIsFetching === false &&
      this.props.teamsIsFetching === false
    ) {
      this.setState({
        complete1: true,
        complete2: true
      });
      this.props.getSingleTeamMembers(localStorage.getItem("email"));
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tmIsFetching === true || prevProps.teamsIsFetching === true) {
      this.setState({
        complete1: true,
        complete2: true
      });
      this.props.getSingleTeam(this.props.singleTeamMembers[0].team_id);
      this.props.getFeelings(this.props.singleTeamMembers[0].id);
    }
  }

  render() {
    if (this.state.complete2 === true && this.state.complete1 === true) {
      return (
        <>
          <div className="fake-nav" />
          <div className="container">
            <p>
              Thanks for waiting! Click here to go back to your profile page.
            </p>
            <button
              className="btn-feel-2"
              onClick={() => this.props.history.push("/profile")}
            >
              Click
            </button>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="fake-nav" />
          <div className="container">
            <p>Loading...</p>
          </div>
        </>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    tmIsFetching: state.teamMembersReducer.tmIsFetching,
    teamsIsFetching: state.teamsReducer.teamsIsFetching,
    singleTeamMembers: state.teamMembersReducer.singleTeamMembers
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
)(Loading);
