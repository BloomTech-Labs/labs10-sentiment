import React from "react";
import NavBar from '../NavBar/NavBar'

function Survey(props) {
  if(!localStorage.getItem('email')){
    props.history.push('/home')
  }
  return (
    <div>
      <NavBar />
      <p> Survey Page </p>
    </div>
  );
}

export default Survey;


