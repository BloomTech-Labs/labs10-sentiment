import React from "react";
import PieChart from "./chart";
import NavBar from '../NavBar/NavBar';

function Survey(props) {

  if(!localStorage.getItem('email')){
    props.history.push('/home')
  }
  return (
    <div>
     <NavBar />
      <p> Reports </p>
      <PieChart />
    </div>
  );
}

export default Survey;
