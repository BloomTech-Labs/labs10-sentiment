import React from "react";
import { connect } from 'react-redux'
import { fetchSingleSurvey } from "../../actions";
import '../history';
import WHAAT from '../../images/WHAAT.jpg';


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
    for(let i=0; i<count; i++) {
        divs.push(<div key={i} className="report-button-combo"><p>Survey Title: {props.survey[i].title}</p><button onClick={() => generateReport(props.survey[i].survey_time_stamp)}>Generate</button></div>)
    }
    return divs
}

return (
    <div className="reports-container">
        <div className="bot-container">
        <img src={WHAAT} />
        <p>Choose which report do you want M.O.O.D to bring up for you?</p>
        </div>
        <div className="combo-container">
        {displayDivs()}
        <button onClick={() => props.history.push('/reports')} className="combo-container-button">See New Report</button>
        </div>
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
