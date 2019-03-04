import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "../login/logout";
import "./NavBar.css";
import Auth from "../Auth/auth";
import { connect } from 'react-redux'

const auth = new Auth();

class NavBar extends React.Component {

  render() {
  return (
    <>
      {this.props.singleTeamMembers[0].type === "manager" ? (
        <>
          <Logout auth={auth} />
          <div className="navBar">
            <div className="navButton">
              <NavLink to="/profile">Profile</NavLink>

              <NavLink to="/teamlist">Team List</NavLink>

              <NavLink to="/survey">Survey</NavLink>

              <NavLink to="/reports">Reports</NavLink>

              <NavLink to="/billing">Billing</NavLink>

              <NavLink to="/accountset">Account Settings</NavLink>
            </div>
          </div>
        </>
      ) : (
        <>
          <Logout auth={auth} />
          <div className="navBar">
            <div className="navButton">
              <NavLink to="/profile">Profile</NavLink>

              <NavLink to="/accountset">Account Settings</NavLink>
            </div>
          </div>
        </>
      )}
    </>
  );
}};

function mapStateToProps(state) {
  return {
    singleTeamMembers: state.teamMembersReducer.singleTeamMembers,
  };
}

export default connect(
  mapStateToProps,
  {  }
)(NavBar);
