import React, { Component } from "react";
import { Route, NavLink } from "react-router-dom";
import Home from "./Home";
import Login from "./login/login";
import "./App.css";
// import Auth from './Auth/auth.js';


class App extends Component {
  
 
  render() {
    // const auth = new Auth()
    // auth.login(); 
    return (
      <div className="App">
        <div className="navBar">
          <div className="navButton">
            <NavLink exact to="/">
              Home
            </NavLink>
            <Login login={this.login} />
          </div>
        </div>
        <Route exact path="/" component={Home} />
      </div>
    );
  }
}
export default App;
