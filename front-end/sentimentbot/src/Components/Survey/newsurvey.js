import React, { Component } from "react";
import { connect } from "react-redux";
import PreFeelingsChosen from './preFeelingsChosen';
import NavBar from '../NavBar/NavBar';
// import CustomEmoji from './customEmoji';
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import MoodBotCarousel from './carousel';

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
import { addPreFeeling } from "../../actions";


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
      option1: null,
      option2: null,
      option3: null,
      option4: null,
      preFeelingIdsArray: [],
      custom: ""
    };
  }

  componentDidMount() {
    this.setState({
      option1: this.props.prefeelings[0].id,
      option2: this.props.prefeelings[0].id,
      option3: this.props.prefeelings[0].id,
      option4: this.props.prefeelings[0].id,
    })
  }

  emojiPicker = (emoji, event) =>  {
    event.preventDefault();
    this.setState({
      custom: emoji.colons
    })
  }
  onChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  addCustom = event => {
    event.preventDefault();
    const custom = {feeling_text: this.state.custom};
    this.props.addPreFeeling(custom)
    this.props.history.push("/emojiloading")
  }
  
  onChangeDropDown = event => {
    console.log(event.target.value, event.target.id);
    if (
      event.target.id === "manager_id" ||
      event.target.id === "hour" ||
      event.target.id === "min" 
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

  onSelectTest1 = event => {
    console.log(event.target.value, event.target.id, "hey!");
    this.setState({
      ...this.state,
      option1: parseInt(event.target.value)
    });
  }

  onSelectTest2 = event => {
    console.log(event.target.value, event.target.id, "hey!");
    this.setState({
      ...this.state,
      option2: parseInt(event.target.value)
    });
  }

  onSelectTest3 = event => {
    console.log(event.target.value, event.target.id, "hey!");
    this.setState({
      ...this.state,
      option3: parseInt(event.target.value)
    });
  }

  onSelectTest4 = event => {
    console.log(event.target.value, event.target.id, "hey!");
    this.setState({
      ...this.state,
      option4: parseInt(event.target.value)
    });
  }

  onConfirmation = event => {
    event.preventDefault();
    console.log("clicked!");
    if (this.state.preFeelingIdsArray.length > 3) {
      this.state.preFeelingIdsArray.shift()
      this.state.preFeelingIdsArray.shift()
      this.state.preFeelingIdsArray.shift()
      this.state.preFeelingIdsArray.shift()
    }
    this.setState({
      preFeelingIdsArray: [
        ...this.state.preFeelingIdsArray, 
        this.state.option1, 
        this.state.option2, 
        this.state.option3, 
        this.state.option4]
    })
  }

  createSurvey = event => {
    event.preventDefault();
    let title = this.state.title;
    let description = this.state.description; 
    let manager_id = this.props.singleTeamMembers[0].id; 
    let dailyWeeklyMonthly= this.state.dailyWeeklyMonthly;
    let hour = this.state.hour;
    let amPm = this.state.amPm;
    let timeZone = this.state.timeZone;
    let min = this.state.min;
    let preFeelingIdsArray = this.state.preFeelingIdsArray;
    const combine = {
      title: title, 
      description: description, 
      manager_id: manager_id, 
      dailyWeeklyMonthly: dailyWeeklyMonthly,
      hour: hour,
      amPm: amPm,
      timeZone: timeZone,
      min: min,
      preFeelingIdsArray: preFeelingIdsArray
    }
      this.props.addSurvey(combine)};

  render() {
    
    return (
      <div className="table-box">
        <NavBar />
        <div>
          <h3>M.O.O.D Response Chart</h3>
        </div>
       <MoodBotCarousel />
        {/* <Survey.Survey model={model} onComplete={this.onComplete}/> */}
        {/* <CustomEmoji /> */}
        <Picker
                set="apple"
                title="Pick your emoji…"
                emoji="point_up"
                style={{ position: "absolute", bottom: "20px", right: "20px" }}
                i18n={{
                search: "Search",
                categories: { search: "Search Results", recent: "Recents" }
                }}
                onClick={this.emojiPicker}
                // custom={customEmoji}
            />
        <input 
          placeholder={this.state.custom} 
          type="text" 
          name="custom"
          onChange={this.onChangeHandler}>
        </input>
        <button onClick={this.addCustom}>
          Click to Create Your Own Emoji
        </button>
        <form onSubmit={this.createSurvey}>
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
          <PreFeelingsChosen 
            onSelectTest1={this.onSelectTest1} 
            onSelectTest2={this.onSelectTest2}
            onSelectTest3={this.onSelectTest3}
            onSelectTest4={this.onSelectTest4}
            />
          <button onClick={this.onConfirmation}>Confirm</button>
    
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
          <button onSubmit={this.createSurvey}>Submit</button>
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
    singleSurvey: state.surveyReducer.singleSurvey,
    prefeelings: state.prefeelingsReducer.prefeelings,
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
    addPreFeeling
  }
)(NewSurvey);
