import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "../login/logout";
import "./NavBar.css";
import Auth from "../Auth/auth";

const auth = new Auth();

const NavBar = () => {
  return (
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
  );
};

export default NavBar;
