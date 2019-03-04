import React, { Component } from "react";
import { connect } from "react-redux";
import PreFeelingList from './FeelingsForm';

import MoodAwe from "../../images/Awe.jpg";
import MoodSeriously from "../../images/Seriously.jpg";
import MoodCringe from "../../images/Cringe.jpg";
import MoodDisgust from "../../images/Disgust.jpg";
import MoodDrool from "../../images/Drool.jpg";
import MoodHappy from "../../images/Happy.jpg";
import MoodLove from "../../images/Love.jpg";
import MoodMad from "../../images/Mad.jpg";
import MoodSad from "../../images/Sad.jpg";
import MoodWeep from "../../images/Weep.jpg";
import MoodWHAAT from "../../images/WHAAT.jpg";
import MoodThinking from "../../images/Thinking.jpg";

import { addTeam } from "../../actions/teams";
import { getTeams } from "../../actions/teams";
import { getSingleTeam } from "../../actions/teams";

import { addTeamMembers } from "../../actions/team_members";
import { getTeamMembers } from "../../actions/team_members";
import { editTeamMembers } from "../../actions/team_members";
import { getSingleTeamMembers } from "../../actions/team_members";

import { addSurvey } from "../../actions/survey";
import { getSurvey } from "../../actions/survey";
import { editSurvey } from "../../actions/survey";
import { deleteSurvey } from "../../actions/survey";
import { fetchSingleSurvey } from "../../actions/survey";

import { getPreFeeling } from "../../actions/preFeelings";
import { addPreFeeling } from "../../actions/preFeelings";
import { editPreFeeling } from "../../actions/preFeelings";
import { deletePreFeeling } from "../../actions/preFeelings";
import { fetchSinglePreFeeling } from "../../actions/preFeelings";


class NewSurvey extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      manager_id: 0,
      dailyWeeklyMonthly: "",
      hour: 0,
      min: 0,
      amPm: "",
      timeZone: "",
      preFeelingIdsArray: [],
      prefeeling_id: 0
    };
  }
  onChangeInput = event => {};

  onChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  onChangeDropDown = event => {
    console.log(event.target.value, event.target.id);
    if (
      event.target.id === "manager_id" ||
      event.target.id === "hour" ||
      event.target.id === "min" ||
      event.target.id === "prefeeling_id"
    ) {
      let number = event.target.value;
      number = Number(number);
      console.log(number);
      this.setState({
        ...this.state,
        [event.target.id]: number
      });
    } else {
      this.setState({
        ...this.state,
        [event.target.id]: event.target.value
      });
    }
  };

  // bot-button onClick handler
  // botButtonClick(event){
  //   console.log(event.target.id)
  //   switch(.getDBId()) {
  //     case awe:
  //       this.props.awe()
  //       break;
  //     case seriously:
  //     this.props.seriously()
  //       break;
  //     case cringe:
  //     this.props.cringe()
  //       break;
  //     case disgust:
  //     this.props.disgust()
  //       break;
  //     case drool:
  //     this.props.drool()
  //       break;
  //     case mad:
  //     this.props.mad()
  //       break;
  //     case love:
  //     this.props.love()
  //       break;
  //     case sad:
  //     this.props.sad()
  //       break;
  //     case weep:
  //     this.props.weep()
  //       break;
  //     case whaat:
  //     this.props.whaat()
  //       break;
  //     case happy:
  //     this.props.happy()
  //       break;
  //     case thinking:
  //     this.props.thinking()
  //       break;
  //     default:
  //   }
  // }

  render() {
    return (
      <div className="table-box">
        <div>
          <h3>M.O.O.D Response Chart</h3>
        </div>
        <table className="MoodbotTable">
          <tr>
            <td>
              <p>Awe</p>
              <button id="awe" className="bot-buttons"><img className="moodbot-img" src={MoodAwe} alt="awe" /></button>
            </td>
            <td>
              <p>Seriously</p>
              <button id="seriously" className="bot-buttons"><img className="moodbot-img" src={MoodSeriously} alt="come on" /></button>
            </td>
            <td>
              <p>Cringe</p>
              <button id="cringe" className="bot-buttons"><img className="moodbot-img" src={MoodCringe} alt="cringe" /></button>
            </td>
            <td>
              <p>Disgust</p>
              <button id="disgust" className="bot-buttons"><img className="moodbot-img" src={MoodDisgust} alt="disgust" /></button>
            </td>
            <td>
              <p>Drool</p>
              <button id="drool" className="bot-buttons"><img className="moodbot-img" src={MoodDrool} alt="drool" /></button>
            </td>
            <td>
              <p>Mad</p>
              <button id="mad" className="bot-buttons"><img className="moodbot-img" src={MoodMad} alt="mad" /></button>
            </td>
          </tr>
          <tr>
            <td>
              <p>Love</p>
              <button id="love" className="bot-buttons"><img className="moodbot-img" src={MoodLove} alt="love" /></button>
            </td>
            <td>
              <p>Sad</p>
              <button id="sad" className="bot-buttons"><img className="moodbot-img" src={MoodSad} alt="sad" /></button>
            </td>
            <td>
              <p>Weep</p>
              <button id="weep" className="bot-buttons"><img className="moodbot-img" src={MoodWeep} alt="weep" /></button>
            </td>
            <td>
              <p>WHAAT</p>
              <button id="whaat" className="bot-buttons"><img className="moodbot-img" src={MoodWHAAT} alt="what" /></button>
            </td>
            <td>
              <p>Happy</p>
              <button id="happy" className="bot-buttons"><img className="moodbot-img" src={MoodHappy} alt="happy" /></button>
            </td>
            <td>
              <p>Thinking</p>
              <button id="thinking" className="bot-buttons"><img className="moodbot-img" src={MoodThinking} alt="thinking" /></button>
            </td>
          </tr>
        </table>
      
        {/* <Survey.Survey model={model} onComplete={this.onComplete}/> */}
        <form>
          <div className="title">
            <label>Title</label>
            <input
              type="text"
              value={this.state.title}
              name="title"
              onChange={this.onChangeHandler}
            /> 
          </div>
          <div className="description">
            <label>Decription</label>
            <input
              type="text"
              value={this.state.description}
              name="description"
              onChange={this.onChangeHandler}
            />
          </div>
          <PreFeelingList />
          <div className="dailyWeeklyMonthly">
            <label>Recurence</label>
            <select id="dailyWeeklyMonthly" onChange={this.onChangeDropDown}>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select> 
          </div>
          <div className="hour">
            <label>Hour</label>
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
          </div>
          <div className="minutes">
            <label>Minute</label>
            <select id="min" onChange={this.onChangeDropDown}>
              <option value={0}>0</option>
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
              <option value={13}>13</option>
              <option value={14}>14</option>
              <option value={15}>15</option>
              <option value={16}>16</option>
              <option value={17}>17</option>
              <option value={18}>18</option>
              <option value={19}>19</option>
              <option value={20}>20</option>
              <option value={21}>21</option>
              <option value={22}>22</option>
              <option value={23}>23</option>
              <option value={24}>24</option>
              <option value={25}>25</option>
              <option value={26}>26</option>
              <option value={27}>27</option>
              <option value={28}>28</option>
              <option value={29}>29</option>
              <option value={30}>30</option>
              <option value={31}>31</option>
              <option value={32}>32</option>
              <option value={33}>33</option>
              <option value={34}>34</option>
              <option value={35}>35</option>
              <option value={36}>36</option>
              <option value={37}>37</option>
              <option value={38}>38</option>
              <option value={39}>39</option>
              <option value={40}>40</option>
              <option value={41}>41</option>
              <option value={42}>42</option>
              <option value={43}>43</option>
              <option value={44}>44</option>
              <option value={45}>45</option>
              <option value={46}>46</option>
              <option value={47}>47</option>
              <option value={48}>48</option>
              <option value={49}>49</option>
              <option value={50}>50</option>
              <option value={51}>51</option>
              <option value={52}>52</option>
              <option value={53}>53</option>
              <option value={54}>54</option>
              <option value={55}>55</option>
              <option value={56}>56</option>
              <option value={57}>57</option>
              <option value={58}>58</option>
              <option value={59}>59</option>
            </select>
          </div>
          <div className="period">
            <label>Period</label>
            <select id="amPm" onChange={this.onChangeDropDown}>
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
          <div className="timezone">
            <label>Time Zone</label>
            <select id="timeZone" onChange={this.onChangeDropDown}>
              <option value="EST">est</option>
              <option value="PST">pst</option>
            </select>
          </div>
        
          {/* <button onClick={handleSubmit}>Submit</button> */}
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    singleTeamMembers: state.teamMembersReducer.singleTeamMembers,
    error: state.teamMembersReducer.error,
    teamMembers: state.teamMembersReducer.teamMembers,
    survey: state.surveyReducer.survey,
    surveyIsFetching: state.surveyReducer.surveyIsFetching,
    singleSurvey: state.surveyReducer.singleSurvey
  };
}

export default connect(
  mapStateToProps,
  {
    addTeam,
    getTeams,
    getSingleTeam,
    addTeamMembers,
    getTeamMembers,
    editTeamMembers,
    getSingleTeamMembers,
    addSurvey,
    getSurvey,
    editSurvey,
    deleteSurvey,
    fetchSingleSurvey,
    getPreFeeling,
    addPreFeeling,
    editPreFeeling,
    deletePreFeeling,
    fetchSinglePreFeeling,
  }
)(NewSurvey);
