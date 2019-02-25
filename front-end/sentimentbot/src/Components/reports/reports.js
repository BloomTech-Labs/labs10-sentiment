import React from "react";
import { Route, Link } from 'react-router-dom';
import Home from '../Home';

function Survey(props) {
  return (
    <div>
      <nav>
        <Link to={`/home`}>Home</Link>   
        <Route path="/home" render={props => <Home {...props}  />} />
      </nav>
      <p> Reports </p>
    </div>
  );
}

export default Survey;
