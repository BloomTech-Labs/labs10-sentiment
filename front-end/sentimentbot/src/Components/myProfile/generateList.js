import React from "react";
import { connect } from "react-redux";
import { getSingleTeam, joinTeam } from "../../actions";
import "../history";

function GenerateList(props) {
  let count = props.teams.length;

  console.log(props.teams[0].team_code);

  function generateReport(i) {
    const id = props.singleTeamMembers[0].id;
    const team_code = { team_code: i };
    props.joinTeam(id, team_code);
  }

  //   for (let i=0; i<count; i++) {
  //       <div>
  //           <p>Option{i}</p>
  //           <button onClick={() => generateReport(i)}>Generate</button>
  //       </div>
  //   }
  // }

  // let listOfSurveys = props.survey.map(i =>
  //     <div>
  //     <p>Option{i}</p>
  //     <button onClick={() => generateReport(i)}>Generate</button>
  //     </div>
  // )

  function displayDivs() {
    let divs = [];
    for (let i = 0; i < count; i++) {
      divs.push(
        <div key={i}>
          <p>{props.teams[i].name} Join this team?</p>
          <button onClick={() => generateReport(props.teams[i].team_code)}>
            Here!
          </button>
        </div>
      );
    }
    return divs;
  }

  return <div>{displayDivs()}</div>;
}

function mapStateToProps(state) {
  return {
    singleTeams: state.teamsReducer.singleTeams,
    teams: state.teamsReducer.teams,
    isFetching: state.teamsReducer.isFetching,
    teamMembers: state.teamsReducer.teamMembers,
    singleTeamMembers: state.teamMembersReducer.singleTeamMembers
  };
}

export default connect(
  mapStateToProps,
  { getSingleTeam, joinTeam }
)(GenerateList);
