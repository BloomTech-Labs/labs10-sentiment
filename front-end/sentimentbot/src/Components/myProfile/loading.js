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
import loadinggif from '../callback/loading.svg'

class Loading extends React.Component {


  componentDidMount() {
    this.props.getSingleTeamMembers(localStorage.getItem('email'))
   
      setTimeout(() =>{
        this.props.history.push('/profile')
      }, 1500)
 
  }


  render() {
    if (localStorage.getItem('joined') || localStorage.getItem('abandoned')) {
      localStorage.removeItem('joined')
      localStorage.removeItem('abandoned')
      this.props.getSingleTeamMembers(localStorage.getItem('email'))
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
//     if (this.state.complete2 === true && this.state.complete1 === true) {
//       return (
//         <>
//           <div className="fake-nav" />
//           <div className="container">
//             <p>
//               Thanks for waiting! Click here to go back to your profile page.
//             </p>
//             <button
//               className="btn-feel-2"
//               onClick={() => this.props.history.push("/profile")}
//             >
//               Click
//             </button>
//           </div>
//         </>
//       );
//     } else {

      return (
         <> 
          <div className="fake-nav" />
          <div className="container">
            <img src={loadinggif} alt="loading" className="loadinggif" />
          </div>
        </>
      );
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
