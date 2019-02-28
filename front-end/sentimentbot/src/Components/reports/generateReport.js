import React from 'react'
import Select from 'react-select'
import { connect } from "react-redux";
import { fetchSingleSurvey } from "../../actions/index";
import NavBar from '../NavBar/NavBar';
import GenerateList from './generateList'

class GenerateReport extends React.Component {



  
  render() {

      return (
        <>
        <NavBar/>
        <GenerateList history = {this.props.history} />
        {/* <Select options={surveyList} /> */}

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
  