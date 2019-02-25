import React from "react";
import NavBar from '../NavBar/NavBar';

function accountSettings(props) {
  if(!localStorage.getItem('email')){
    props.history.push('/home')
  }
  return (
    <div>
      <NavBar />
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
