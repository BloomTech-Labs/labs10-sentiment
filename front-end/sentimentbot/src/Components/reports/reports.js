import React from "react";
import PieChart from "./chart";
import NavBar from '../NavBar/NavBar';
// import FooterBanner from "../PNG/MOODfooterBANNER6.png";
import Footer from '../Footer/footer';
import './report.css'

function Reports(props) {

  if(!localStorage.getItem('jwt')){
    props.history.push('/home')
  }
  return (
    <div className="background-color">
     <NavBar />
     <div className="main-reports-container">
     
      <h2> View Reports </h2>
      <button className="main-reports-container-button" onClick={() => props.history.push('/generatereport')}>Here</button>
      <div className="pie-container">
      <PieChart history={props.history} />
      </div>
      </div>
      <Footer />
    </div>
  );
}

export default Reports;
