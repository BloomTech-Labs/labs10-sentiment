import React from 'react';
import { NavLink } from 'react-router-dom'
import './NavBar.css'

const NavBar = () => {
    return (
        <>
        <div className="navBar">
            <div className="navButton">
              <NavLink exact to="/home">
                Home
              </NavLink>
              
              <NavLink to="/profile">
                Profile
              </NavLink>
             
              <NavLink to="/survey">
                Survey
              </NavLink>
             
              <NavLink to="/reports">
                Reports
              </NavLink>
             
              <NavLink to="/billing">
                Billing
              </NavLink>
             
              <NavLink to="/accountset">
                Account Settings
              </NavLink>
            </div>
          </div>
        </>
    )
}

export default NavBar;