import React from "react";
import { Route, Router } from "react-router-dom";
import Home from "./Home";
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
import Billing from "./billing/billing";
import ModalSurvey from "./Survey/ModalMainPage";
import Reports from "./reports/reports";
import AccountSettings from "./accountSettings/accountSettings";
import GenerateReport from "./reports/generateReport";
import TeamList from "../Components/teamlist/teamList";
import Loading from './myProfile/loading';
import EmojiLoading from './Survey/loading';
import SurveySubmitLoading from './Survey/surveysubmitloading';
import FooterPage from "./Footer/footer-test";

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

// const reduxDevHook =
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, logger),
    // reduxDevHook
  )
);

export const makeMainRoutes = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <div className="routes-div">
          <Route
            exact
            path="/"
            render={props => <Home auth={auth} {...props} />}
          />
          <Route
            path="/home"
            render={props => <Home auth={auth} {...props} />}
          />
          <Route
            path="/callback"
            render={props => {
              handleAuthentication(props);
              return <Callback {...props} auth={auth} />;
            }}
          />
          <Route
            path="/authorization"
            render={props => <Authorization {...props} />}
          />
          <Route
            path="/profile"
            render={props => <Profile {...props} auth={auth} />}
          />
          <Route
            path="/billing"
            render={props => <Billing {...props} auth={auth} />}
          />
          <Route
            path="/survey"
            render={props => <ModalSurvey {...props} auth={auth} />}
          />
          <Route
            path="/reports"
            render={props => <Reports {...props} auth={auth} />}
          />
          <Route
            path="/accountset"
            render={props => <AccountSettings {...props} auth={auth} />}
          />
          <Route
            path="/generatereport"
            render={props => <GenerateReport {...props} auth={auth} />}
          />
          <Route
            path="/teamlist"
            render={props => <TeamList {...props} auth={auth} />}
          />{" "}
          <Route
            path="/loading"
            render={props => <Loading {...props} auth={auth} />}
          />
          <Route
            path="/emojiloading"
            render={props => <EmojiLoading {...props} auth={auth} />}
          />
          <Route
            path="/surveysubmitloading"
            render={props => <SurveySubmitLoading {...props} auth={auth} />}
          />
          <FooterPage />
        </div>
      </Router>
    </Provider>
  );
};
