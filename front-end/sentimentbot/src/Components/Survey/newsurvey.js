import React,{ Component } from 'react';
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

import { connect } from "react-redux";
import {getSingleTeamMembers } from "../../actions";
import {fetchSingleSurvey } from "../../actions";
import {addTeamMembers} from "../../actions";
import {getTeamMembers } from "../../actions";
import {addTeam } from "../../actions";
import {getTeams} from "../../actions";
import {editTeamMembers} from "../../actions";
import {getSingleTeam } from "../../actions";


//In your react App.js or yourComponent.js file add these lines to import
// import * as Survey from "survey-react";
// import "survey-react/survey.css";

class NewSurvey extends Component {
    constructor(){
        super();
        this.state = {
            title: "",
            description: "",
            manager_id: 0,
            dailyWeeklyMonthly: "",
            hour: 0,
           amPm: "",
           timeZone: "",
           preFeelingIdsArray: []
        };
    }
    onChangeInput = (event)=>{

    }

    onChangeHandler = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
         })
    }

 onChangeDropDown = (event)=>{console.log(event.target.value, event.target.id)
    if(event.target.id === "manager_id" || event.target.id === "hour" ) {
        let number = event.target.value;
        number = Number(number);
        console.log(number);
        this.setState({
            ...this.state, 
            [event.target.id]: number
         })
    } else {
        this.setState({
            ...this.state, 
            [event.target.id]: event.target.value
         })
    }
};

 render() {
  return (
    <div className="table-box">
        <div>
            <h3>M.O.O.D Response Chart</h3>
        </div>
        <table className="MoodbotTable">
            <tr>
            <td><p>Awe</p><img className="moodbot-img" src={MoodAwe} alt="awe" /></td>
            <td><p>Seriously</p><img className="moodbot-img" src={MoodSeriously} alt="come on" /></td>
            <td><p>Cringe</p><img className="moodbot-img" src={MoodCringe} alt="cringe" /></td>
            <td><p>Disgust</p><img className="moodbot-img" src={MoodDisgust} alt="disgust" /></td>         
            <td><p>Drool</p><img className="moodbot-img" src={MoodDrool} alt="drool" /></td>
            <td><p>Mad</p><img className="moodbot-img" src={MoodMad} alt="mad" /></td>            
            </tr>
            <tr>
            <td><p>Love</p><img className="moodbot-img" src={MoodLove} alt="love" /></td>
            <td><p>Sad</p><img className="moodbot-img" src={MoodSad} alt="sad" /></td> 
            <td><p>Weep</p><img className="moodbot-img" src={MoodWeep} alt="weep" /></td>
            <td><p>WHAAT</p><img className="moodbot-img" src={MoodWHAAT} alt="what" /></td>
            <td><p>Happy</p><img className="moodbot-img" src={MoodHappy} alt="happy" /></td>
            <td><p>Thinking</p><img className="moodbot-img" src={MoodThinking} alt="thinking" /></td>
            </tr> 
        </table>
        {/* <Survey.Survey model={model} onComplete={this.onComplete}/> */}
        <form>
            <div className="group">
                <input 
                    type="text" 
                    value={this.state.title} 
                    name="title" 
                    onChange={this.onChangeHandler} 
                />
                <label>Title</label>
            </div>
            <div className="group">
                <input 
                    type="text" 
                    value={this.state.description} 
                    name="description" 
                    onChange={this.onChangeHandler} 
                />
                <label>Decription</label>
            </div>
            
            <select id="dailyWeeklyMonthly" onChange={this.onChangeDropDown}>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
            </select>
            <select id="hour" onChange={this.onChangeDropDown}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
                <option value={11}>11</option>
                <option value={12}>12</option>
            </select>
            <select id="amPm" onChange={this.onChangeDropDown}>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
            </select>
            <select id="timeZone" onChange={this.onChangeDropDown}>
                <option value="EST">est</option>
                <option value="PST">pst</option>
            </select>
            {/* <button onClick={handleSubmit}>Submit</button> */}
            <button>Submit</button>
        </form>
    </div>
  /*
  //The alternative way. react Survey component will create survey model internally
  return (<Survey.Survey json={this.json} onComplete={this.onComplete}/>);
  */
  //You may pass model properties directly into component or set it into model
  // <Survey.Survey model={model} mode="display"/>
  //or 
  // model.mode="display"
  // <Survey.Survey model={model}/>
  // You may change model properties outside render function. 
  //If needed react Survey Component will change its behavior and change UI.
  );
}
} 

function mapStateToProps(state) {
    return {
      singleTeamMembers: state.teamMembersReducer.singleTeamMembers,
      error: state.teamMembersReducer.error,
      teamMembers: state.teamMembersReducer.teamMembers,
      survey: state.surveyReducer.survey,
      isFetching: state.surveyReducer.isFetching,
      singleSurvey: state.surveyReducer.singleSurvey
    };
  }
  
  export default connect(
    mapStateToProps,
    {
      getSingleTeamMembers,
      addTeamMembers,
      getTeamMembers,
      addTeam,
      getTeams,
      editTeamMembers,
      getSingleTeam,
      fetchSingleSurvey
    }
  )(NewSurvey);
