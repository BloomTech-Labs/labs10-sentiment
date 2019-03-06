import React from "react";
import { connect } from "react-redux";
import {
getSingleTeamMembers,
  addTeamMembers,
  getTeamMembers,
  fetchSingleSurvey,
  getSurvey,
  getTeams,
  getSingleTeam,
  getFeelings,
  getPreFeeling
} from "../../actions/index";
import MoodThinking from "./Thinking.jpg";

class SurveySubmitLoading  extends React.Component {
    state = {
        complete1: false,
        complete2: false,
    }

    componentDidMount() {
        if (this.props.tmIsFetching === false && this.props.isFetching === false) {
            this.setState({
                complete1: true,
                complete2: true
            })
            this.props.getSurvey()
        }
      }

      componentDidUpdate(prevProps) {
          if (prevProps.tmIsFetching === true || prevProps.isFetching === true) {
              this.setState({
                  complete1: true,
                  complete2: true
              })
              this.props.getSurvey()
          }

      }

  render() {
      if (this.state.complete2 === true && this.state.complete1 === true) {
          return (
        <div className="container">
        <button onClick={() => this.props.history.push('/survey')}>Click</button>
        <p>Thanks for waiting! Your custom response has been added.</p>
      </div>
          )
      } else {
          return (
              <div className="container">
        <p>Loading...our bots are loading</p>
        <img className="moodbot-img" src={MoodThinking} alt="thinking" />
        </div>
          )
      }
  }
}

function mapStateToProps(state) {
  return {
    tmIsFetching: state.teamMembersReducer.tmIsFetching,
    isFetching: state.prefeelingsReducer.isFetching,
    singleTeamMembers: state.teamMembersReducer.singleTeamMembers
  };
}

export default connect(
  mapStateToProps,
  {
    getSingleTeamMembers,
    addTeamMembers,
    getTeamMembers,
    fetchSingleSurvey,
    getSurvey,
    getTeams,
    getSingleTeam,
    getFeelings,
    getPreFeeling,
  }
)(SurveySubmitLoading );
