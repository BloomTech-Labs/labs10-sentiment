import React from 'react';
import { connect } from 'react-redux';
import { Emoji } from 'emoji-mart'


import { 
  getPreFeeling, 
  addPreFeeling, 
  editPreFeeling, 
  deletePreFeeling, 
  fetchSinglePreFeeling 
} from "../../actions/preFeelings";

function PreFeelingList(props) {
  // let responses = props.prefeelings.length;

  // function pickedResponse(i) {
  //   const id = props.singlePreFeelings[0].id;
    // props.addPreFeeling(id); // POST?

  // }

  // function preFeelingChoices() {
  //   let responseChoices = [];
  //   // {this.props.prefeelings.map(prefeeling =>
  //   for (let i = 0; i < responses; i++) {
  //     let testText = props.prefeelings[i].feeling_text
  //       let breakTest = testText.split(" ");
  //       let result = [];
  //       for (let i = 0; i < breakTest.length; i++) {
  //         if (breakTest[i].indexOf(":") === -1) {
  //           let textP = breakTest[i] + " ";
  //           result.push(textP);
  //         } else if (breakTest[i].indexOf(":") > -1) {
  //           let textE = <Emoji emoji={breakTest[i]} size={24} />;
  //           result.push(textE);
  //         }
  //       }

  //     responseChoices.push(
  //         <div className="pre-p" onClick={props.onSelectTest1} key={props.prefeelings[i].id} value={props.prefeelings[i].id} name={props.prefeelings[i].feeling_text}>{result}</div>
    
  //     );
  //   }
  //   return responseChoices;
  // }

  function ArrayChoices() {
    // if(props.state.textArray.length = 0) {
    //   return null
    // }
    let responses = props.state.preFeelingIdsArray.length;

      let responseChoices = [];
      // {this.props.prefeelings.map(prefeeling =>
      for (let i = 0; i < responses; i++) {
        let testText = props.state.textArray[i]
          let breakTest = testText.split(" ");
          let result = [];
          for (let i = 0; i < breakTest.length; i++) {
            if (breakTest[i].indexOf(":") === -1) {
              let textP = breakTest[i] + " ";
              result.push(textP);
            } else if (breakTest[i].indexOf(":") > -1) {
              let textE = <Emoji emoji={breakTest[i]} size={24} />;
              result.push(textE);
            }
          }
  
        responseChoices.push(
            <div key={i} className='emojiholder'>{result}</div>
      
        );
      }
      return responseChoices;
    }

  


  return (
    <>
    {/* <div className="dropdown">
    <button className="dropbtn"> Customize
    <div className="dropdown-content">
      {preFeelingChoices()}
      </div>
      </button>
      </div> */}
      <div className="text-area-field">
      <p>These are the pre-set responses to your survey:</p>
      <div className="array-area-field">
      {ArrayChoices()}
      </div>
      </div>
    </>
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
