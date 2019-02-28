import React from "react";
import { Link } from "react-router-dom";
import Login from './login/login'
import Auth from "./Auth/auth";

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
      <div className="home-container">
      <Login auth={auth}/>
        <h1 className="welcomeText">Mood</h1>
        <p>Hello World</p>
      </div>
    );
  }
}
export default Home;
