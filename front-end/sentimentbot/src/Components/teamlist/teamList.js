import React from 'react';
import { connect } from 'react-redux';
import { getTeamsMembers, editTeamMembers } from '../../actions/index';
import './teamlist.css';
import NavBar from '../NavBar/NavBar'

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
            <div className="container">
            <NavBar />
            <p>{this.props.singleTeams[0].name}</p>
            <a
            href={`https://slack.com/oauth/authorize?scope=commands,bot&client_id=553324377632.554405336645&redirect_uri=${uri}&state=${this.props.singleTeamMembers[0].id}`}
          >
            <img
              alt="Add to Slack"
              height="40"
              width="139"
              src="https://platform.slack-edge.com/img/add_to_slack.png"
              srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
            />
          </a>
          <p>Team Join Code: {this.props.singleTeams[0].team_code}</p>

          <h3>Team Members</h3>
          <div className="teamlist-container">
              {this.props.teamMembers.map(user => {
                  return (
                  <div>
                      <p>{user.firstName}</p>
                      <button onClick={() => this.handleClick({id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone, type: null, team_id: null})}>Remove</button>
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