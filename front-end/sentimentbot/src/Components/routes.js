import React from 'react';
import { Route, Router } from 'react-router-dom';
import App from './App';
import Login from './login/login';
import Callback from './callback/callback';
import Auth from './Auth/auth';
import history from './history';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
      <Router history={history}>
        <div>
          <Route path="/" render={(props) => <Login auth={auth} {...props} />} />
          <Route path="/home" render={(props) => <App auth={auth} {...props} />} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>
        </div>
      </Router>
  );
}
