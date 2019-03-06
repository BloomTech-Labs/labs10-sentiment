import React from "react";
import PieChart from "./chart";
import NavBar from '../NavBar/NavBar';
import './report.css'

function Reports(props) {

  if(!localStorage.getItem('email')){
    props.history.push('/home')
  }
  return (
    <>
     <NavBar />
     <div className="reports-container">
     
      <h1> Generate a new report: </h1>
      <button onClick={() => props.history.push('/generatereport')}>Here</button>
      <PieChart history={props.history} />
      </div>
    </>
  );
}

export default Reports;
