import React from "react";
import { connect } from "react-redux";
import { getSingleTeam } from "../../actions/index";
import GenerateList from "./generateList";

class GenerateTeams extends React.Component {
  render() {
    return (
      <>
        <GenerateList history={this.props.history} />
        {/* <Select options={surveyList} /> */}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    singleTeams: state.teamsReducer.singleTeams,
    teams: state.teamsReducer.teams
  };
}

export default connect(
  mapStateToProps,
  { getSingleTeam }
)(GenerateTeams);
