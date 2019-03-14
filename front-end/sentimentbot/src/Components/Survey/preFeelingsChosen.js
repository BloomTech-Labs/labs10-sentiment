import React from "react";
import { connect } from "react-redux";
import PreFeelingList from "./preFeelingList";
import "../history";
import "./survey.css";
import { 
  getPreFeeling, 
  addPreFeeling, 
  editPreFeeling, 
  deletePreFeeling, 
  fetchSinglePreFeeling 
} from "../../actions/preFeelings";

class PreFeelingsChosen extends React.Component {

  
  // onSelectTest= event => {
  //   console.log(event.target.value, event.target.id, "hey!");
  //   let whatever = [];
  //   whatever.push(event.target.value);
  //   console.log(whatever);
  // }

  render() {
    return (
      <div>
        {/* <p className="instruction-p survey-instructions "> Which possible responses would you like to have available?</p> */}
        <PreFeelingList 
        // onSelectTest1={this.props.onSelectTest1} 
        state = {this.props.state}
         />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    prefeelings: state.prefeelingsReducer.prefeelings,
    isFetching: state.prefeelingsReducer.isFetching,
    error: state.prefeelingsReducer.error,
    singlePreFeelings: state.prefeelingsReducer.singlePreFeeling,
  };
}

export default connect(
  mapStateToProps,{
    getPreFeeling,
    addPreFeeling,
    editPreFeeling,
    deletePreFeeling,
    fetchSinglePreFeeling, 
  }
  )(PreFeelingsChosen);