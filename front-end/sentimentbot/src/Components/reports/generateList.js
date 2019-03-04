import React from "react";
import { connect } from 'react-redux'
import { fetchSingleSurvey } from "../../actions";
import '../history';


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
        divs.push(<div key={i}><p>Survey Title: {props.survey[i].title} Report</p><button onClick={() => generateReport(props.survey[i].survey_time_stamp)}>Generate</button></div>)
    }
    return divs
}

return (
    <div>
        {displayDivs()}
        <br/>
        <br/>
        <button onClick={() => props.history.push('/reports')}>See New Report</button>
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
