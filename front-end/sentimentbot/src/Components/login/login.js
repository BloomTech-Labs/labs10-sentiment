import React from "react";

class Login extends React.Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

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
      <div className="login-container">
            {
              !isAuthenticated() && (
                  <button
                    onClick={this.login.bind(this)}
                  className="login-button">
                    Log In
                  </button>
                )
            }
            {
              isAuthenticated() && (
                  <button
                    onClick={this.logout.bind(this)}
                  className="login-button">
                    Log Out
                  </button>
                )
            }


      </div>
    );
  }
}

export default Login;
