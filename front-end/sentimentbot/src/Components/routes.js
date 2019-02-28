import React from "react";
import { Route, Router } from "react-router-dom";
import App from "./App";
import Login from "./login/login";
import Home from './Home'
import Callback from "./callback/callback";
import Auth from "./Auth/auth";
import history from "./history";
import Authorization from "./Authorization/authorization";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import rootReducer from "../reducers/index";
import Profile from "./myProfile/myProfile";
import Billing from './billing/billing';
import Survey from './Survey/survey';
import Reports from './reports/reports';
import AccountSettings from './accountSettings/accountSettings';
import GenerateReport from './reports/generateReport'

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

const reduxDevHook =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, logger),
    reduxDevHook
  )
);

export const makeMainRoutes = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <div>
          <Route exact path="/" render={props => <Home auth={auth} {...props} />} />
          <Route
            path="/home"
            render={props => <Home auth={auth} {...props} />}
          />
          <Route
            path="/callback"
            render={props => {
              handleAuthentication(props);
              return <Callback {...props} />;
            }}
          />
          <Route
            path="/authorization"
            render={props => <Authorization {...props} />}
          />
          <Route path="/profile" render={props => <Profile {...props} />} />
          <Route path="/billing" render={props => <Billing {...props} />} />
          <Route path="/survey" render={props => <Survey {...props} />} />
          <Route path="/reports" render={props => <Reports {...props} />} />
          <Route path="/accountset" render={props => <AccountSettings {...props} />} />
          <Route path="/generatereport" render={props => <GenerateReport {...props} />} />
        </div>
      </Router>
    </Provider>
  );
};
