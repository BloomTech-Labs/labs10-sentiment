import React from "react";
import "./login.css";
class Login extends React.Component {
  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  // componentDidMount() {
  //   const { renewSession } = this.props.auth;

  //   if (localStorage.getItem('isLoggedIn') === 'true') {
  //     renewSession();
  //   }
  // }

  render() {
    return (
      <div className="login-container">
        <button onClick={this.login.bind(this)} className="btn-feel-3">
          Log In
        </button>
      </div>
    );
  }
}

export default Login;
