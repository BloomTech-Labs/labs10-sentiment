import React from 'react';
import { connect } from 'react-redux';


import { 
  getPreFeeling, 
  addPreFeeling, 
  editPreFeeling, 
  deletePreFeeling, 
  fetchSinglePreFeeling 
} from "../../actions/preFeelings";

function PreFeelingList(props) {
  let responses = props.prefeelings.length;

  console.log(props.prefeelings[0]);

  // function pickedResponse(i) {
  //   const id = props.singlePreFeelings[0].id;
    // props.addPreFeeling(id); // POST?

  // }

  function preFeelingChoices() {
    let responseChoices = [];
    // {this.props.prefeelings.map(prefeeling =>
    for (let i = 0; i < responses; i++) {
      responseChoices.push(
    
          <option key={props.prefeelings[i].id} value={props.prefeelings[i].id}>{props.prefeelings[i].feeling_text}</option>
    
      );
    }
    return responseChoices;
  }

  return (
    <div>
      <select onChange={props.onSelectTest1}>{preFeelingChoices()}</select>
      <select onChange={props.onSelectTest2}>{preFeelingChoices()}</select>
      <select onChange={props.onSelectTest3}>{preFeelingChoices()}</select>
      <select onChange={props.onSelectTest4}>{preFeelingChoices()}</select>
    </div>
  )};


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
  )(PreFeelingList);
