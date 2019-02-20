import React from "react";
import { Route, Router } from "react-router-dom";
import App from "./App";
import Login from "./login/login";
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
          <Route path="/" render={props => <Login auth={auth} {...props} />} />
          <Route
            path="/home"
            render={props => <App auth={auth} {...props} />}
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
        </div>
      </Router>
    </Provider>
  );
};
