import React from "react";
import { connect } from "react-redux";
import NavBar from '../NavBar/NavBar';
import MoodBotCarousel from './Carousel/carousel';
import "./Modal.css";
import ModalTitles from './ModalTitles';
import  ModalPrefeelings from './ModalPrefeelings';
import ModalSchedule from './ModalSchedule';

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

import FooterBanner from "../PNG/MOODfooterBANNER6.png";

class ModalSurvey extends React.Component {
    constructor() {
      super();
      this.state = {
        title: "",
        description: "",
        manager_id: 0,
        dailyWeeklyMonthly: "daily",
        hour: 1,
        min: 1,
        amPm: "AM",
        timeZone: "EST",
        option1: null,
        option2: null,
        option3: null,
        option4: null,
        preFeelingIdsArray: [],
        custom: ""
      }
    }

    componentDidMount() {
    this.setState({
      option1: this.props.prefeelings[0].id,
      option2: this.props.prefeelings[0].id,
      option3: this.props.prefeelings[0].id,
      option4: this.props.prefeelings[0].id,
      
    })
  }

  onChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  emojiPicker = (emoji, event) =>  {
    event.preventDefault();
    this.setState({
      custom: emoji.colons
    })
  }

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
    alert('Choices have been saved!')
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
      this.props.addSurvey(combine)
      this.props.history.push("/surveysubmitloading")
    };

    render() {
        return (
            <div className="modalpage-container">
                <NavBar />
                <div className="modalsurvey-container">
                    <div className="modalsurvey-title">
                        <h1 className="modal-header">Survey Maker</h1>
                    </div>
                    <div className="modalsurvey-carousel">
                        <MoodBotCarousel />
                    </div>
                    <div className="modalsurvey-buttonbox">
                        <button className="survey-modalbutton">Title <ModalTitles state={this.state} onChangeHandler={this.onChangeHandler} /></button>
                        <button className="survey-modalbutton">Responses <ModalPrefeelings state={this.state} onConfirmation={this.onConfirmation} onSelectTest1={this.onSelectTest1} onSelectTest2={this.onSelectTest2} onSelectTest3={this.onSelectTest3} onSelectTest4={this.onSelectTest4} emojiPicker={this.emojiPicker} addCustom={this.addCustom} /></button>
                        <button className="survey-modalbutton">Schedule <ModalSchedule state={this.state} onChangeDropDown ={this.onChangeDropDown} /></button>
                        <button className="surveysubmit-button" onSubmit={this.createSurvey}>Submit</button>
                    </div>
                </div>
                <div className="modalfooter">
                  <p className="modalcopyright-words">© Copyright M.O.O.D All Rights Reserved.</p>
                  <div className="modalfooterimg-box">
                    <img  className="modalfooter-img" alt="footer" src={FooterBanner} />
                  </div>
                </div>
            </div>

        )
    }
};

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
  )(ModalSurvey);
