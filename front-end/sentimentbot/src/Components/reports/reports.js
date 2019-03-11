import React from "react";
import PieChart from "./chart";
import NavBar from '../NavBar/NavBar';

import './report.css'

function Reports(props) {

  if(!localStorage.getItem('jwt')){
    props.history.push('/home')
  }
  return (
    <div className="background-color">
     <NavBar />
     <div className="main-reports-container">
      <h2> Reports </h2>
      <button className="main-reports-container-button" onClick={() => props.history.push('/generatereport')}>Here</button>
      <div className="pie-container">
      <PieChart history={props.history} />
      </div>
      </div>
    </div>
  );
}

export default Reports;
