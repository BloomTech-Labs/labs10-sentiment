/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { connect } from "react-redux";
import { addPreFeeling } from "../../actions";


class ModalEmoji extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      custom: ""
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

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

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <div className="emoji-picker">
              <Picker
                  set="apple"
                  title="Pick your emoji…"
                  emoji="point_up"
                  i18n={{
                  search: "Search",
                  categories: { search: "Search Results", recent: "Recents" }
                  }}
                  onClick={this.emojiPicker}
              />
              <input 
                placeholder={this.props.state.custom} 
                type="text" 
                name="custom"
                onChange={this.props.onChangeHandler}>
              </input>
              <button className="survey-buttons" onClick={this.props.addCustom}></button>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
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

    addPreFeeling
  }
)(ModalEmoji);