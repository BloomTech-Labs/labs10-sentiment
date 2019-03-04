import React from "react";

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
            
                  <button
                    onClick={this.login.bind(this)}
                  className="login-button">
                    Log In
                  </button>



      </div>
    );
  }
}

export default Login;
