import React from 'react'
import { connect } from "react-redux";
import { getFeelings } from "../../actions";
import GenerateList from './generateList';


class GenerateTeams extends React.Component {

  render() {
      return (
        <>
          <GenerateList history = {this.props.history} />
            {/* <Select options={surveyList} /> */}
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
    { getFeelings }
  )(GenerateTeams);