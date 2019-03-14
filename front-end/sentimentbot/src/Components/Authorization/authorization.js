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
  getPreFeeling,
  getManagers
} from "../../actions/index";
import "./authorization.css";
import Happy from "../PNG/nobackgroundHappy.png";
import loadinggif from '../callback/loading.svg'

class Authorization extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: localStorage.getItem("email"),
    phone: "",
    type: null,
    team_id: null,
    view: "",
    loading: true,
    initial: false
  };

  componentDidMount() {
    this.props.getSingleTeamMembers(localStorage.getItem("email"));
    this.props.getTeamMembers();
    this.props.getTeams();
    this.props.getPreFeeling();
    this.props.getManagers(localStorage.getItem('id'));
    this.setState({
      initial: true
    })
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.singleTeamMembers.length !== prevProps.singleTeamMembers.length
    ) {
      this.props.getSingleTeam(this.props.singleTeamMembers[0].team_id);
      this.props.getFeelings(this.props.singleTeamMembers[0].id);
      this.props.getSurvey(this.props.singleTeamMembers[0].id);
      localStorage.setItem('id', this.props.singleTeamMembers[0].id)
      localStorage.setItem('type', this.props.singleTeamMembers[0].type)
      localStorage.setItem('team_id', this.props.singleTeamMembers[0].team_id)
      this.setState({
        loading: false
      })
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
    this.props.getTeamMembers();
    setTimeout(() => {
      this.props.history.push('profile')
    }, 2000);
  };

  render() {

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

    if (!localStorage.getItem("jwt")) {
      this.props.history.push("/home");
    }

    if (this.state.view === "" && this.state.loading === true && this.state.initial === true) {
      return (
        <div className="auth-container">
          <div className="fake-nav" />
          {this.props.tmIsFetching === false ? (
            <div className="authcontainer-form">
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
            <div className="auth-container">
              <p>Welcome Back!</p>
              {/* <button className="btn-feel-2" onClick={() => history.replace("/profile")}>
                Continue To Profile
              </button> */}
            </div>
          )}
        </div>
      );
    } else if(this.state.loading === true) {
      return <img className="loadinggif" src={loadinggif} alt="loading" />
    } else if(this.state.loading === false && this.state.initial === true) {
      this.props.history.replace("/profile")
      window.location.reload();
    }

//  else {
//       return (
//         <>
//         <div className="fake-nav" />
//         <div className="auth-container">
          
//           <p>
//             Thanks for registering! Please allow us a moment to finish
//             registering you
//           </p>
//           <button className="btn-feel-2" onClick={() => this.props.history.push("/loading")}>
//             Thank you
//           </button>
//         </div>
//         </>
//       );
//     }
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
    feelings: state.feelingsReducer.feelings,
    managers: state.managersReducer.managers
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
    getPreFeeling,
    getManagers,
  }
)(Authorization);
