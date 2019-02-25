import React from "react";
import { Route, Link } from 'react-router-dom';
import Home from '../Home';

function Survey(props) {
  if(!localStorage.getItem('email')){
    props.history.push('/home')
  }
  return (
    <div>
      <nav>
        <Link to={`/home`}>Home</Link>   
        <Route path="/home" render={props => <Home {...props}  />} />
      </nav>
      <p> Survey Page </p>
    </div>
  );
}

export default Survey;


