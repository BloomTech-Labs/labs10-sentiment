import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";
import Home from "./Home";
// import Login from "./login/login";
import "./App.css";
// import Auth from './Auth/auth.js';

class App extends Component {
  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem("isLoggedIn") === "true") {
      renewSession();
    }
  }

  render() {
    // const auth = new Auth()
    // auth.login();

    // const { isAuthenticated } = this.props.auth;
    return (
      <div className="App">
        <div className="navBar">
          <div className="navButton">
            <NavLink exact to="/">
              Home
            </NavLink>
            <button onClick={this.login.bind(this)}>Log In</button>

            <button onClick={this.logout.bind(this)}>Log Out</button>

            {/* <Login login={this.login} /> */}
          </div>
        </div>
        <Route exact path="/" component={Home} />
      </div>
    );
  }
}
export default App;
