import React, { Component } from 'react';
import {Route, NavLink} from 'react-router-dom';
import Home from './Home';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="navBar">
          <div className="navButton">
            <NavLink exact to="/">Home</NavLink>
          </div>
        </div>
        <Route exact path="/" component={Home} />
      </div>
    );
  }
}
export default App;
