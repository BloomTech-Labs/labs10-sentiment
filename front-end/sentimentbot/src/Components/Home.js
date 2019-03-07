import React from "react";
import Login from './login/login'
import Auth from "./Auth/auth";
import "./home.css";
import Happy from "./PNG/nobackgroundHappy.png";
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
    const auth = new Auth();
    return (
      <>
      <div className="home-container">
        <div className="home-container-text">
          <h1>
            Hello, I'm am your Miniature Organization Observation Drone, or M.O.O.D,
            Let me help you enjoy working with your team.
          </h1>
          <Login auth={auth} />
        </div>
        <div className="home-container-img">
          <img
            className="happy-auth"
            src={Happy}
            alt="Happy MoodBot"
            width="200"
            height="200"
          />
        </div>
      </div>
      
      </>
    );
  }
}
export default Home;
