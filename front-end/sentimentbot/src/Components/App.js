import React, { Component } from "react";
import { Route, NavLink, Router } from "react-router-dom";
import Home from "./Home";
import "./App.css";
// import Auth from "../Components/Auth/auth";
import history from './history'
import Billing from './billing/billing';

class App extends Component {
  getProfile() {
    this.props.auth.getProfile()
  }

  render() {

    return (
      <Router history={history}>
      <div className="App">
        <div className="navBar">
          <div className="navButton">
            <NavLink exact to="/home">
              Home
            </NavLink>
          </div>
        </div>
        <Route exact path="/home" component={Home} />
        <Billing />
      </div>
      </Router>
    );
  }
}
export default App;
