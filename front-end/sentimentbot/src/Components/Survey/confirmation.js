import React from 'react';
import PreFeelingsChosen from './preFeelingsChosen';
import './Modal.css'

class SurveyTitles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: "",
      description: "",
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
      <div className="confirmation-container">
          <p>Final step: Verfiy that this information is correct, then submit.</p>
                <div className="survey-confirmation">
                <div className="confirmation-title"><p>Title:</p>{this.props.state.title}</div>
                <div className="confirmation-description"><p>Question:</p>{this.props.state.description}</div>
                <PreFeelingsChosen state={this.props.state} />
                <div className="confirmation-frequency"><p>Frequency:</p>{this.props.state.dailyWeeklyMonthly}</div>
                <div className="confirmation-time"><p>Time:</p>{this.props.state.hour}:{this.props.state.min} {this.props.state.amPm} {this.props.state.timeZone}</div>
                <button className="create-survey" onClick={this.props.createSurvey}>Create Survey</button>
                </div>
                
      </div>
    );
  }
}
export default SurveyTitles;
