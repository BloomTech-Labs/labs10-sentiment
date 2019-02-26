import React from "react";
import NavBar from "../NavBar/NavBar";

function accountSettings(props) {
  if (!localStorage.getItem("email")) {
    props.history.push("/home");
  }
  return (
    <div>
      <NavBar />
      <h3>Settings</h3>
      <form className="account-form">
        <label>Email:</label>
        <input type="email" placeholder="johndoe@yahoo.com" name="email" />

        <button className="submit-btn">Submit</button>
      </form>
    </div>
  );
}

export default accountSettings;
