import React from "react";

import "../App.css";

function Survey(props) {
  return (
    <div className="survey-container">
      <h2> Survey Page </h2>
      <div className="survey-calendar">
        <h3>Schedule A Survey</h3> 
        <div className="calendar-box">
          <p>Input Calendar Here</p>
        </div>
      </div>
      <div className="survey-feelings">
        <h3>Create A Survey</h3>
        <div className="feeling-box">
          <p>Input Feeling Chart and response form Here</p>
        </div>
      </div>
    </div>
  );
}

export default Survey;
