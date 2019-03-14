import React from "react";
import PieChart from "./chart";
import NavBar from '../NavBar/NavBar';
import './report.css'
// import FooterPage from '../Footer/footer-test';
import GenerateReport from './generateReport';

function Reports(props) {

  if (!localStorage.getItem('jwt')) {
    props.history.push('/home')
  }
  return (
    <div className="reportspage-container">
      <NavBar />
      <div className="main-reports-container">
        <div className="generateReport">
          <h2> View Reports </h2>
          <GenerateReport history={props.history} />
        </div>
        {/* <button className="main-reports-container-button" onClick={() => props.history.push('/generatereport')}>Here</button> */}
        <div className="pie-container">
          <PieChart history={props.history} />
        </div>
      </div>
      {/* <FooterPage /> */}
    </div>
  )

}

export default Reports;
