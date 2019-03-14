import React from 'react';
import { Modal, ModalFooter } from 'reactstrap';
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { connect } from "react-redux";
import { addPreFeeling } from "../../actions";
import { Emoji } from 'emoji-mart'

class ModalEmoji extends React.Component {
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

  render() {
    return (
      <div>
        <Emoji onClick={this.toggle} emoji={this.props.state.option4[1]} size={24} />
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
            <div className="emoji-picker" onClick={this.toggle}>
              <Picker
                  set="apple"
                  title="Pick your emoji…"
                  emoji="point_up"
                  i18n={{
                  categories: { recent: "Recents" }
                  }}
                  onClick={this.props.emojiPicker}
              />
            </div>
          <ModalFooter>
            {/* <Button color="primary" onClick={this.toggle}>Done</Button>{' '} */}
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
