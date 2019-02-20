import React from "react";
import { connect } from "react-redux";
import {
  getSingleTeamMembers,
  addTeamMembers,
  getTeamMembers
} from "../../actions/index";
import axios from "axios";

class Profile extends React.Component {
  componentDidMount() {
    this.props.getSingleTeamMembers(localStorage.getItem("email"));
    this.props.getTeamMembers();
    const code = this.props.match.params.code;
    console.log(code);
    if (code) {
      this.fetchAuth(code);
    }
  }

  componentDidUpdate(prev) {
    const code = this.props.match.params.code;
    console.log(code);
    if (code !== prev.match.params.code) {
      this.fetchAuth(code);
    }
  }

  fetchAuth = code => {
    axios
      .post(
        `https://slack.com/api/oauth.access`,
        `client_id=555765331446.554661112789&client_secret=65618f3ce7feca293e1abae74cae7afc&code=${code}&redirect_uri=https://sentimentbot.netlify.com/&single_channel=false`
      )
      .then(response => {
        // this.setState(() => ({ movie: response.data }));
        console.log("response", response);
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <div>
        <a href="https://slack.com/oauth/authorize?scope=commands,bot&client_id=553324377632.554405336645">
          <img
            alt="Add to Slack"
            height="40"
            width="139"
            src="https://platform.slack-edge.com/img/add_to_slack.png"
            srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
          />
        </a>
        <div>
          <button>Join a Team</button>
          <button>Create a Team</button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    singleTeamMembers: state.teamMembersReducer.singleTeamMembers,
    isFetching: state.teamMembersReducer.isFetching,
    error: state.teamMembersReducer.error,
    teamMembers: state.teamMembersReducer.teamMembers
  };
}

export default connect(
  mapStateToProps,
  { getSingleTeamMembers, addTeamMembers, getTeamMembers }
)(Profile);
