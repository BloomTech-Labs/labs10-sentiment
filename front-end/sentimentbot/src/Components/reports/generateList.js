import React from "react";
import { connect } from 'react-redux'
import { fetchSingleSurvey } from "../../actions";
import '../history';
import WHAAT from '../PNG/nobackgroundWhaat.png'

function GenerateList(props) {

  let count = props.survey.length;

  function generateReport(i) {
    props.fetchSingleSurvey(i)
  }

  //   for (let i=0; i<count; i++) {
  //       <div>
  //           <p>Option{i}</p>
  //           <button onClick={() => generateReport(i)}>Generate</button>
  //       </div>
  //   }
  // }

  // let listOfSurveys = props.survey.map(i => 
  //     <div>
  //     <p>Option{i}</p>
  //     <button onClick={() => generateReport(i)}>Generate</button>
  //     </div>
  // )

  function displayDivs() {
    let divs = [];
    if(count === 0) {
      return <p>You don't have any surveys that have been responsed to yet!</p>
    } else {
    for (let i = 0; i < count; i++) {
      if(props.survey[i].survey_time_stamp === null){
        divs.push(<div key={i} className="report-button-combo"><p>Survey Title: {props.survey[i].title}</p><button onClick={() => generateReport(props.survey[i].survey_time_stamp)}>Generate</button></div>)
        divs.shift()
      } else {
      divs.push(<div key={i} className="report-button-combo"><p>Survey Title: {props.survey[i].title}</p><button onClick={() => generateReport(props.survey[i].survey_time_stamp)}>Generate</button></div>)
      }
    }
    return divs
  }
}

  return (
    <div className="reports-container">
      <div className="bot-container">
        <img src={WHAAT} alt="whaaat" />
        <p>Which report would you like M.O.O.D to bring up for you.</p>
      </div>
      <div className="combo-container">
        {displayDivs()}

      </div>
      {/* <Button onClick={() => props.history.push('/reports')} color="secondary" size="lg" block>See New Report</Button> */}
      <button onClick={() => props.history.push('/reports')} className="combo-container-button">See New Report</button>
    </div>
  )

}

function mapStateToProps(state) {
  return {
    singleSurvey: state.surveyReducer.singleSurvey,
    survey: state.surveyReducer.survey,
    surveyIsFetching: state.surveyReducer.surveyIsFetching
  };
}

export default connect(
  mapStateToProps,
  { fetchSingleSurvey }
)(GenerateList);
