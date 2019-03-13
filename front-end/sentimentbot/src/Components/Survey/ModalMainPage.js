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
import { addPreFeeling, getFeelings, getPreFeeling } from "../../actions";
// import loadinggif from '../callback/loading.svg'
import StepZilla from 'react-stepzilla';

import FooterPage from '../Footer/footer-test';


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
        textArray: [':joy:',':sunglasses:',':scream:',':pensive:'],
        strArr: ["happy", ":joy:"],
        option4: null,
        preFeelingIdsArray: [34, 9, 5, 38],
        custom: ['', ""],
        loading: true,
        added: false
      }
    }

    componentDidMount() {
      this.props.getSingleTeamMembers(localStorage.getItem("email"));
      this.props.getSurvey(localStorage.getItem('id'));
      this.props.getSingleTeam(localStorage.getItem('team_id'));
      this.props.getFeelings(localStorage.getItem('id'));
      this.props.getPreFeeling();
        if (this.props.survey.length > 0) {
        this.props.fetchSingleSurvey(this.props.survey[0].survey_time_stamp);
        this.setState({
          loading: false
        })
        } else {
        this.setState({
          loading: false,
        })
      }
    }
  
    componentDidUpdate(prevProps, prevState) {
      // if(this.props.prefeelings.length !== prevProps.prefeelings.length) {
      // }
      if(this.props.isFetching === false && this.state.added === true)  {
        this.props.getPreFeeling();
        this.setState({
          added: false,
          custom: ''
        })
      }
    }

    titleChangeHandler= event => {
      this.setState({
      [event.target.name]: event.target.value
      })
    }

  onChangeHandler = event => {
    // this.setState({
    //   [event.target.name]: [event.target.value, this.state.custom[1]],
    // })
    let string = event.target.value
    let strArr = string.split(" ")
    if (strArr.length > 2) {
      strArr.splice(1, strArr.length-2,)
    }
    this.setState({
      strArr: [strArr[0], this.state.strArr[1]]
    })

    // this.setState({
    //   [event.target.name]: [event.target.value, this.state.custom[1]]
    // });
  };

  emojiPicker = (emoji, event) =>  {
    event.preventDefault();
    // let string = this.state.custom.join(" ")
    // let strArr = string.split(" ")
    if (this.state.strArr.length > 2) {
      this.state.strArr.splice(1, this.state.strArr.length-2,)
      this.setState({
        strArr: [this.state.strArr[0], emoji.colons]
      })
    }
    this.setState({
      strArr: [this.state.strArr[0], emoji.colons]
    })
    // console.log(string)
    // console.log(strArr)
  }

  addCustom = event => {
    event.preventDefault();
    // let string = this.state.custom.join(" ")
    // let strArr = string.split(" ")
    // if (strArr.length > 2) {
    //   strArr.splice(1, strArr.length-2,)
    // }
    // this.setState({
    //   custom: [, this.state.custom[1]],
    //   strArr: strArr
    // })
    const custom = {feeling_text: this.state.strArr.join(" ")};
    this.props.addPreFeeling(custom)
    this.props.getPreFeeling();
    this.setState({
      added: true,
      custom: ["",""],
      strArr: ['','']
    })
    alert('Your custom emoji was added!')
    // this.props.history.push("/emojiloading")
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
    // console.log(event.currentTarget.getAttribute('value'), event.target.id, "hey!");
    if(this.state.preFeelingIdsArray.length > 3) {
      this.state.preFeelingIdsArray.shift();
      this.state.textArray.shift();
      this.setState({
        ...this.state,
        textArray: [...this.state.textArray,event.currentTarget.getAttribute('name')],
        preFeelingIdsArray: [...this.state.preFeelingIdsArray, parseInt(event.currentTarget.getAttribute('value'))],
      });
    }
    this.setState({
      ...this.state,
      textArray: [...this.state.textArray,event.currentTarget.getAttribute('name')],
      preFeelingIdsArray: [...this.state.preFeelingIdsArray, parseInt(event.currentTarget.getAttribute('value'))],
    });
  }

  onSelectTest2 = event => {
    console.log(event.target.value, event.target.id, event.target.key, "hey!");
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
      this.props.getSurvey(localStorage.getItem('id'));
      alert('Survey has been submitted')
      this.setState({
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
        custom: "",
      })
      // this.props.history.push("/surveysubmitloading")
    };

    render() {
      
      const steps = [
        {name: 'Step 1: Title & Description', component: <ModalTitles state={this.state} titleChangeHandler={this.titleChangeHandler}/>},
        {name: "Step 2: Select your response options", component: <ModalPrefeelings state={this.state} onConfirmation={this.onConfirmation} onSelectTest1={this.onSelectTest1} onSelectTest2={this.onSelectTest2} onSelectTest3={this.onSelectTest3} onSelectTest4={this.onSelectTest4} emojiPicker={this.emojiPicker} addCustom={this.addCustom} onChangeHandler={this.onChangeHandler} />},
        {name: "Step 3: Schedule when to send it out", component: <ModalSchedule state={this.state} onChangeDropDown ={this.onChangeDropDown} createSurvey={this.createSurvey} />}
      ]

        return (
            <div className="modalpage-container background-color">
                <NavBar />
                  <div className="modalsurvey-container">
                  {/* <div className="modalsurvey-container">
                      <div className="modalsurvey-title">
                          <h1 className="modal-header">Survey Maker</h1>
                      </div>
                      <div className="modalsurvey-carousel">
                          <MoodBotCarousel />
                      </div>
                      <div className="modalsurvey-buttonbox">
                          <button className="survey-modalbutton 1">Title <ModalTitles state={this.state} onChangeHandler={this.onChangeHandler} /></button>
                          <button className="survey-modalbutton 2">Responses <ModalPrefeelings state={this.state} onConfirmation={this.onConfirmation} onSelectTest1={this.onSelectTest1} onSelectTest2={this.onSelectTest2} onSelectTest3={this.onSelectTest3} onSelectTest4={this.onSelectTest4} emojiPicker={this.emojiPicker} addCustom={this.addCustom} /></button>
                          <button className="survey-modalbutton">Schedule <ModalSchedule state={this.state} onChangeDropDown ={this.onChangeDropDown} /></button>
                          <button className="surveysubmit-button" onClick={this.createSurvey}>Submit</button>

                          
                      </div>
                      
                  </div> */}
                  <h1 className="survey-header">Create Surveys
                  </h1>
                  <StepZilla steps={steps} />
                </div>
                <FooterPage />
                {/* <div className="modalfooter">
                  <p className="modalcopyright-words">© Copyright M.O.O.D All Rights Reserved.</p>
                  <div className="modalfooterimg-box">
                    <img  className="modalfooter-img" alt="footer" src={FooterBanner} />
                  </div>
                </div> */}
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
      isFetching: state.prefeelingsReducer.isFetching,
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
      addPreFeeling,
      getFeelings,
      getPreFeeling
    }
  )(ModalSurvey);
