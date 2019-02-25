import React from "react";
import { Route, Link } from 'react-router-dom';
import Home from '../Home';

function accountSettings(props) {
  return (
    <div>
      <nav>
        <Link to={`/home`}>Home</Link>   
        <Route path="/home" render={props => <Home {...props}  />} />
      </nav>
      <form className="account-form">
        <h3> Account Settings </h3>
        {/* <input
          type=""
          placeholder=""
          name=""
          value={}
          onChange={}
        />
        <button className="submit-btn" onClick={}>
          Submit
        </button> */}
      </form>
    </div>
  );
}

export default accountSettings;
