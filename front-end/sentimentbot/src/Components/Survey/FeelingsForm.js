import React from 'react';


function FeelingsForm(props) {
    // function handleSubmit(event) {
        // event.preventDefault();
  
        let questions = 4;
        let questionsLeft = ' [' + questions + ' questions left]';
        let surveyQuestion = prompt('Please type your survey question.' + questionsLeft);
        questions -= 1;
        questionsLeft = ' [' + questions + ' questions left]';
        let feelingOne = prompt('Please type a possible response.' + questionsLeft);
        questions -= 1;
        questionsLeft = ' [' + questions + ' questions left]';
        let feelingTwo = prompt('Please type another possible response.' + questionsLeft);
        questions -= 1;
        questionsLeft = ' [' + questions + ' questions left]';
        let feelingThree = prompt('Please type another possible response.' + questionsLeft);
        questions -= 1;
        questionsLeft = ' [' + questions + ' questions left]';
        let feelingFour = prompt('Please type a final possible response.' + questionsLeft);
        alert('All done. Ready for your survey?');
        let sentence = surveyQuestion;
        sentence += feelingOne;
        sentence += feelingTwo;
        sentence += feelingThree;
        sentence += feelingFour;
        document.write(sentence);
    // }
  return (
    <div>
        <h2>Survey Form</h2>
    </div>
       
    
  );
}


export default FeelingsForm;