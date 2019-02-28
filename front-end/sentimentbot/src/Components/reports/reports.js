import React from "react";
import PieChart from "./chart";
// import Line from './linegraph';
// import Bar from './barGraph'
import NavBar from '../NavBar/NavBar';
import './report.css'

function Reports(props) {

  if(!localStorage.getItem('email')){
    props.history.push('/home')
  }
  return (
    <div className="container">
     <NavBar />
     <div className="reports-container">
     
      <p> Generate a new report: </p>
      <button onClick={() => props.history.push('/generatereport')}>Here</button>
      <PieChart history={props.history} />
      {/* <Line />
      <Bar /> */}
      </div>
    </div>
  );
}

export default Reports;
