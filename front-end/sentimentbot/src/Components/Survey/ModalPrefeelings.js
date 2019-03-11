import React from 'react';
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import  ModalEmoji from './ModalEmoji';

import PreFeelingsChosen from './preFeelingsChosen';
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

class ModalPrefeelings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

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
  
  // addCustom = event => {
  //   event.preventDefault();
  //   const custom = {feeling_text: this.state.custom};
  //   this.props.addPreFeeling(custom)
  //   this.props.history.push("/emojiloading")
  // }

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

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Choose your potential responses</ModalHeader>
          <ModalBody>
            <div className="survey-responsebox">
            <button className="survey-modalbutton">Add a Custom Emoji <ModalEmoji state={this.props.state} addCustom={this.props.addCustom} emojiPicker={this.props.emojiPicker} /></button>
                <PreFeelingsChosen 
                    onSelectTest1={this.props.onSelectTest1} 
                    onSelectTest2={this.props.onSelectTest2}
                    onSelectTest3={this.props.onSelectTest3}
                    onSelectTest4={this.props.onSelectTest4}
                />
                <button className="survey-buttons" onClick={this.props.onConfirmation}>Confirm</button>
            </div>
            <div className="survey-instructions">
                <p className="instruction-p">Hit CONFIRM to add your choosen possible responses to the survey!</p>
            </div>
            
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Return</Button>{' '}
          </ModalFooter>
        </Modal>
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
  )( ModalPrefeelings);

 ;
