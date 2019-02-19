import React from "react";


class Login extends React.Component {
  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <>
      {
        !isAuthenticated() && (
            <button
              id="qsLoginBtn"
              bsStyle="primary"
              className="btn-margin"
              onClick={this.login.bind(this)}
            >
              Log In
            </button>
          )
      }
      {
        isAuthenticated() && (
            <button
              id="qsLogoutBtn"
              bsStyle="primary"
              className="btn-margin"
              onClick={this.logout.bind(this)}
            >
              Log Out
            </button>
          )
      }
      </>
    );
  }
}

export default Login;
