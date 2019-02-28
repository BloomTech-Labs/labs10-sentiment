import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ""
    };
  }

  componentDidMount() {
    // change this line to grab the id passed on the URL
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

  handleSubmit(event) {
    event.preventDefault();
    const code = this.props.match.params.code;
    console.log(code);
    // this.setState({
    //   ...this.state,
    //   code: code
    // });
  }

  render() {
    console.log(this.state.code);
    return (
      <div className="home-container">
        <h1 className="welcomeText">Welcome to Mood</h1>
        <p>Assembling and analyzing feedback into easily digestable data providing industry professionals the next evolution to interpersonal interraction.</p>
        <a
          href="https://slack.com/oauth/authorize?scope=incoming-webhook,commands,bot&client_id=553324377632.554405336645&redirect_uri=https://sentimentbot.netlify.com/"
          // onClick={this.handleSubmit}
        >
          <img
            alt="'Add to Slack'"
            height="40"
            width="139"
            src="https://platform.slack-edge.com/img/add_to_slack.png"
            srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
          />
        </a>
        <br/>
        <Link to="/authorization">Enter</Link>
      </div>
    );
  }
}
export default Home;
