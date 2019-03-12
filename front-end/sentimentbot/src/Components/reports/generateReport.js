import React from 'react'
import { connect } from "react-redux";
import { fetchSingleSurvey } from "../../actions/index";
import NavBar from '../NavBar/NavBar';
import GenerateList from './generateList'
import FooterPage from '../Footer/footer-test';
import './report.css'

class GenerateReport extends React.Component {



  
  render() {

      return (
        <>
        <NavBar/>
        <div className="generateReport">
          <GenerateList history = {this.props.history} />
          {/* <Select options={surveyList} /> */}
        </div> 
        <FooterPage />
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
  