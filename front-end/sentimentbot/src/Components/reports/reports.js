import React from "react";
import PieChart from "./chart";
import NavBar from '../NavBar/NavBar';
import './report.css'
import FooterPage from '../Footer/footer-test';

function Reports(props) {

  if(!localStorage.getItem('jwt')){
    props.history.push('/home')
  }
  return (
    <div className="reportspage-container">
     <NavBar />
     <div className="main-reports-container">
        <h2> Reports </h2>
        <button className="main-reports-container-button" onClick={() => props.history.push('/generatereport')}>Here</button>
        <div className="pie-container">
          <PieChart history={props.history} />
        </div>
      </div>
      <FooterPage />
    </div>
  );
}

export default Reports;
