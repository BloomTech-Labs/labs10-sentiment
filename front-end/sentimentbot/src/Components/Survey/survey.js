import React from "react";
import NavBar from '../NavBar/NavBar'

import MoodAwe from '../../images/Awe.jpg';
import MoodSeriously from '../../images/Seriously.jpg';
import MoodCringe from '../../images/Cringe.jpg';
import MoodDisgust from '../../images/Disgust.jpg';
import MoodDrool from '../../images/Drool.jpg';
import MoodHappy from '../../images/Happy.jpg';
import MoodLove from '../../images/Love.jpg';
import MoodMad from '../../images/Mad.jpg';
import MoodSad from '../../images/Sad.jpg';
import MoodWeep from '../../images/Weep.jpg';
import MoodWHAAT from '../../images/WHAAT.jpg';
import MoodThinking from '../../images/Thinking.jpg';

import FeelingsForm from  './FeelingsForm';
import SurveySchd from  './SurveySchd';


function Survey(props) {
  if(!localStorage.getItem('email')){
    props.history.push('/home')
  }
  return (
    <div className="surveypage-container">
      <NavBar />
      <div className="survey-schedule">
          <SurveySchd />
      </div>
      <div className="table-box">
        <div>
          <h3>M.O.O.D</h3>
        </div>
        <table className="MoodbotTable">
          <tr>
            <td><img className="moodbot-img" src={MoodAwe} alt="awe" /></td>
            <td><img className="moodbot-img" src={MoodSeriously} alt="come on" /></td>
            <td><img className="moodbot-img" src={MoodCringe} alt="cringe" /></td>
            <td><img className="moodbot-img" src={MoodDisgust} alt="disgust" /></td>         
            <td><img className="moodbot-img" src={MoodDrool} alt="drool" /></td>
            <td><img className="moodbot-img" src={MoodMad} alt="mad" /></td>            
          </tr>
          <tr>
            <td><img className="moodbot-img" src={MoodLove} alt="love" /></td>
            <td><img className="moodbot-img" src={MoodSad} alt="sad" /></td> 
            <td><img className="moodbot-img" src={MoodWeep} alt="weep" /></td>
            <td><img className="moodbot-img" src={MoodWHAAT} alt="what" /></td>
            <td><img className="moodbot-img" src={MoodHappy} alt="happy" /></td>
            <td><img className="moodbot-img" src={MoodThinking} alt="thinking" /></td>
          </tr> 
        </table>
      </div>
      <div className="survey-maker">
       <FeelingsForm />
      </div>
    </div>
  );
}

export default Survey;


