import React from 'react';
import { NavLink } from 'react-router-dom'

const NavBar = () => {
    return (
        <>
        <div className="navBar">
            <div className="navButton">
              <NavLink exact to="/home">
                Home
              </NavLink>
              &nbsp;|&nbsp;
              <NavLink to="/profile">
                Profile
              </NavLink>
              &nbsp;|&nbsp;
              <NavLink to="/survey">
                Survey
              </NavLink>
              &nbsp;|&nbsp;
              <NavLink to="/reports">
                Reports
              </NavLink>
              &nbsp;|&nbsp;
              <NavLink to="/billing">
                Billing
              </NavLink>
              &nbsp;|&nbsp;
              <NavLink to="/accountset">
                Account Settings
              </NavLink>
            </div>
          </div>
        </>
    )
}

export default NavBar;