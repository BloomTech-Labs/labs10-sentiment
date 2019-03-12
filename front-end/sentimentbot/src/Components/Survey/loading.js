import React from "react";
import { Emoji } from 'emoji-mart'

function Loading(props) {

    let responses = props.state.strArr.length;



  function preFeelingChoices() {
    let responseChoices = [];
    // {this.props.prefeelings.map(prefeeling =>
    for (let i = 0; i < responses; i++) {
      let testText = props.state.strArr[i]
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
          <div key={i} >{result}</div>
    
      );
    }
    return responseChoices;
  }
  return preFeelingChoices();
}
      
export default Loading;