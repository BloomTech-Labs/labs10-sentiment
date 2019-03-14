import React from 'react'
import { connect } from "react-redux";
// import { getFeelings } from "../../actions";
import GenerateSurveyList from './generateSurveyList';


class GenerateSurveys extends React.Component {

  render() {
      return (
        <>
          <GenerateSurveyList history = {this.props.history} />
        </>
      );
    }
  }
  
  function mapStateToProps(state) {
    return {
      feelings: state.feelingsReducer.feelings
    };
  }
  
  export default connect(
    mapStateToProps,
    {  }
  )(GenerateSurveys);