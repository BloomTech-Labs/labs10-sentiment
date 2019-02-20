import React from "react";
import { Link } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ""
    };
  }

  componentDidUpdate(previousProps) {
    const code = this.props.match.params.code;
    console.log(code);
  }

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
      <div className="homeContent">
        <h1 className="welcomeText">Welcome to Mood</h1>
        <p>Hello World</p>
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
        <Link to="/authorization">Enter</Link>
      </div>
    );
  }
}
export default Home;
