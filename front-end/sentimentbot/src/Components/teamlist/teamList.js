import React from 'react';
import { connect } from 'react-redux';
import { getTeamsMembers, editTeamMembers } from '../../actions/index';
import './teamlist.css';
import NavBar from '../NavBar/NavBar';
import Eh from '../PNG/nobackgroundEh.png';

class TeamList extends React.Component {

  componentWillMount() {
    this.props.getTeamsMembers(this.props.singleTeamMembers[0].team_id)
  }

  handleClick(data) {
    this.props.editTeamMembers(data.id, data);
    console.log(data.id)

  }

  render() {
    const uri = "https://sentimentbot.netlify.com/authorization";
    return (
      <>
        <NavBar />
        <div className="mainTeam-container">
          <h1>{this.props.singleTeams[0].name}</h1>
          <a
            href={`https://slack.com/oauth/authorize?scope=commands,bot&client_id=553324377632.554405336645&redirect_uri=${uri}&state=${this.props.singleTeamMembers[0].id}`}
          >
          </a>
          <p>Team Join Code: {this.props.singleTeams[0].team_code}</p>
          <div className="eh-moodbot">
            <h3>Team Members</h3>
            <div className="eh-moodbot2">
              <img
                src={Eh}
                alt="Eh MoodBot"
                width="150"
                height="150"
              />
            </div>
          </div>
          <div className="teamlist-container team-scrollbar">
            {this.props.teamMembers.map(user => {
              return (
                <div>
                  <p>{user.firstName} {user.lastName}</p>
                  <button className="teamlist-button" onClick={() => this.handleClick({ id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone, type: null, team_id: null })}>Remove</button>
                </div>
              )
            })}
          </div>
        </div>
      </>
    )
  }
}

function mapStateToProps(state) {
  return {
    teamMembers: state.teamsReducer.teamMembers,
    teams: state.teamsReducer.teams,
    singleTeams: state.teamsReducer.singleTeams,
    singleTeamMembers: state.teamMembersReducer.singleTeamMembers
  };
}

export default connect(
  mapStateToProps,
  { getTeamsMembers, editTeamMembers }
)(TeamList);