import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { connect } from "react-redux";
import { addPreFeeling } from "../../actions";
import Loading from './loading';

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
        <Button onClick={this.toggle}>Create</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Add your own Responses</ModalHeader>
          <ModalBody>
            <p>You can combine one word and an emoji. Some example responses are:</p>
            <p>Awesome! :starstruck:</p>
            <p>Totally :unamused:</p>
            <p>Or simply click the emoji you want to add, then confirm your choice! Your option will be added to your customization list</p>
            <div className="emoji-picker">
              <Picker
                  set="apple"
                  title="Pick your emoji…"
                  emoji="point_up"
                  i18n={{
                  search: "Search",
                  categories: { search: "Search Results", recent: "Recents" }
                  }}
                  onClick={this.props.emojiPicker}
              />
              <input 
                placeholder="Get creative!" 
                type="text" 
                name="custom"
                onChange={this.props.onChangeHandler}
                className="emoji-input"
                >
              </input>
              <button className="survey-buttons" onClick={this.props.addCustom}>Confirm choice</button>
            </div>
            <div className="preview-emoji">
              <p>A preview of what your customized response will look like after confirming:</p>
            <Loading state={this.props.state} />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Done</Button>{' '}
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
