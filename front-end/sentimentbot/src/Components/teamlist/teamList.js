import React from "react";
import { connect } from "react-redux";
import {
  getTeamsMembers,
  editTeamMembers,
  getSingleTeamMembers,
  getSurvey,
  getSingleTeam,
  getFeelings,
  fetchSingleSurvey
} from "../../actions/index";
import "./teamlist.css";
import NavBar from "../NavBar/NavBar";
import Eh from "../PNG/nobackgroundEh.png";
import loadinggif from "../callback/loading.svg";
// import FooterPage from '../Footer/footer-test';

class TeamList extends React.Component {
  state = {
    loading: true
  };

  componentWillMount() {
    this.props.getSingleTeam(localStorage.getItem('team_id'));
  }

  componentDidMount() {
    //new code
    this.props.getSingleTeamMembers(localStorage.getItem("email"));
    this.props.getSurvey(localStorage.getItem("id"));
    this.props.getTeamsMembers(localStorage.getItem("team_id"));
    this.props.getSingleTeam(localStorage.getItem("team_id"));
    this.props.getFeelings(localStorage.getItem("id"));
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

  componentDidUpdate(prevProps) {
    if (this.props.survey.length !== prevProps.survey.length) {
      this.props.fetchSingleSurvey(this.props.survey[0].survey_time_stamp);
    }
    //   //new code
    //   if (
    //     this.props.singleTeamMembers.length !== prevProps.singleTeamMembers.length
    //   ) {
    //     this.props.getSingleTeam(localStorage.getItem('team_id'));
    //     this.props.getFeelings(localStorage.getItem('id'));
    //     // if (this.props.survey.length > 0) {
    //     // // this.props.fetchSingleSurvey(this.props.survey[0].survey_time_stamp);
    //     // this.setState({
    //     //   loading: false
    //     // })
    //     // } else {
    //     this.setState({
    //       loading: false
    //     })
    //   // }
    //   }
  }

  handleClick(data) {
    this.props.editTeamMembers(data.id, data);
    console.log(data.id);
  }

  render() {
    if (this.state.loading === true || this.props.singleTeams.length < 1) {
      return <img className="loadinggif" src={loadinggif} alt="loading" />
    } else if (this.props.singleTeams.length > 0) {
      return (
        // <div id="page-container" className="background-color">
        <div className="teampage-container">
          <NavBar />
          <div className="teamcontent-container">
            <h1 style= {{fontSize: '4rem' }}>{this.props.singleTeams[0].name}</h1>
            {/* <a
              href={`https://slack.com/oauth/authorize?scope=commands,bot&client_id=553324377632.554405336645&redirect_uri=${uri}&state=${localStorage.getItem(
                "id"
              )}`}
            /> */}
            <p style={{marginBottom:'5%', marginTop: '3%', fontSize:'1.2rem'}}>Team Join Code: {this.props.singleTeams[0].team_code}</p>
            <div className="eh-moodbot">
              <h3 style= {{marginBottom:'2%', fontFamily:'Roboto Slab', fontWeight: "unset", fontSize:'1.3rem'}}>Team Members</h3>
              <div className="eh-moodbot2">
                <img
                  src={Eh}
                  alt="Eh MoodBot"
                  width="160"
                  height="190"
                />
              </div>
            </div>
            <div className="teamlist-container team-scrollbar">
              {this.props.teamMembers.map(user => {
                if (user.type === "manager") {
                  return (
                    <div>
                      <p>
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                  );
                } else {
                  return (
                    <div>
                      <p>
                        {user.firstName} {user.lastName}
                      </p>
                      <button
                        className="teamlist-button"
                        onClick={() =>
                          this.handleClick({
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                            phone: user.phone,
                            type: null,
                            team_id: null
                          })
                        }
                      >
                        Remove
                    </button>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          {/* <FooterPage /> */}
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  return {
    teamMembers: state.teamsReducer.teamMembers,
    teams: state.teamsReducer.teams,
    singleTeams: state.teamsReducer.singleTeams,
    singleTeamMembers: state.teamMembersReducer.singleTeamMembers,
    teamsIsFetching: state.teamsReducer.teamsIsFetching,
    survey: state.surveyReducer.survey
  };
}

export default connect(
  mapStateToProps,
  {
    getTeamsMembers,
    editTeamMembers,
    getSingleTeamMembers,
    getSurvey,
    getSingleTeam,
    getFeelings,
    fetchSingleSurvey
  }
)(TeamList);
