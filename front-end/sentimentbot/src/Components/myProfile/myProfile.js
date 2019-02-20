import React from "react";
import { connect } from "react-redux";
import { getSingleTeamMembers, addTeamMembers, getTeamMembers } from "../../actions/index";

class Profile extends React.Component {
  componentDidMount() {
    this.props.getSingleTeamMembers(localStorage.getItem("email"));
    this.props.getTeamMembers();
  }

  render() {
    return (
      <div>
        <button>Join a Team</button>
        <button>Create a Team</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      singleTeamMembers: state.teamMembersReducer.singleTeamMembers,
      isFetching: state.teamMembersReducer.isFetching,
      error: state.teamMembersReducer.error,
      teamMembers: state.teamMembersReducer.teamMembers,
  
    };
  }
  
  export default connect(
    mapStateToProps,
    { getSingleTeamMembers, addTeamMembers, getTeamMembers }
  )(Profile);


