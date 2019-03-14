import React from 'react';
import { connect } from "react-redux";
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import  ModalEmoji from './ModalEmoji';
import Emoji2 from './emoji2';
import Emoji3 from './emoji3';
import Emoji4 from './emoji4';
import loadinggif from '../callback/loading.svg';

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

class SurveyPrefeelings extends React.Component {

  componentWillUnmount() {
    this.props.addCustom()
  }

  render() {

    if (this.props.state.added === true) {
      return <img src={loadinggif} alt='loading' />
    }
    return (
      <div className="survey-prefeels">
        {/* <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Choose your potential responses</ModalHeader>
          <ModalBody> */}
          <p>Step 2/4: Create four possible responses for your survey. You can decide to simply use emojis, or you can add one word in the input field along with the emoji of your choice!</p>
            <div className="survey-responsebox">
            {/* <button className="survey-modalbutton">Add a Custom Emoji <ModalEmoji state={this.props.state} addCustom={this.props.addCustom} emojiPicker={this.props.emojiPicker} /></button> */}
                {/* <PreFeelingsChosen 
                    onSelectTest1={this.props.onSelectTest1}
                    state = {this.props.state} 
                /> */}
                <div className="input-emoji-combo">
                <input name="option1" type="text" onChange={this.props.onChangeHandler}></input><ModalEmoji state={this.props.state} addCustom={this.props.addCustom} emojiPicker={this.props.emojiPicker} /></div>
                <div className="input-emoji-combo">
                <input name="option2" type="text" onChange={this.props.onChangeHandler2}></input><Emoji2 state={this.props.state} emojiPicker={this.props.emojiPicker2} /></div>
                <div className="input-emoji-combo">
                <input name="option3" type="text" onChange={this.props.onChangeHandler3}></input><Emoji3 state={this.props.state} emojiPicker={this.props.emojiPicker3} />
                </div>
                <div className="input-emoji-combo">
                <input name="option4" type="text" onChange={this.props.onChangeHandler4}></input><Emoji4 state={this.props.state} emojiPicker={this.props.emojiPicker4} />
                </div>

            </div>
            {/* <div className="emoji-custom"> */}
            {/* <p>Not happy with the current selection? Add a new one here.</p><button className="survey-modalbutton"> <ModalEmoji state={this.props.state} addCustom={this.props.addCustom} emojiPicker={this.props.emojiPicker} onChangeHandler={this.props.onChangeHandler} /></button> */}
            {/* </div> */}
            {/* <div className="survey-instructions">
                <p className="instruction-p">Hit CONFIRM to add your choosen possible responses to the survey!</p>
            </div> */}
{/*             
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Return</Button>{' '}
          </ModalFooter>
        </Modal> */}
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
  )( SurveyPrefeelings);

 ;
