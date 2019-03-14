import React from 'react'
import { connect } from "react-redux";
import { fetchSingleSurvey } from "../../actions/index";
import GenerateList from './generateList'
import './report.css'

class GenerateReport extends React.Component {




  render() {

    return (
      <>
        <div>
          <GenerateList history={this.props.history} />
          {/* <Select options={surveyList} /> */}
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    singleSurvey: state.surveyReducer.singleSurvey,
    survey: state.surveyReducer.survey
  };
}

export default connect(
  mapStateToProps,
  { fetchSingleSurvey }
)(GenerateReport);
