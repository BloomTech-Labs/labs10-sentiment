import React from "react";

class Logout extends React.Component {
  logout() {
    this.props.auth.logout();
  }

  // componentDidMount() {
  //   const { renewSession } = this.props.auth;

  //   if (localStorage.getItem("isLoggedIn") === "true") {
  //     renewSession();
  //   }
  // }

  render() {

    return (
      <div className="login-container">

            <button
            onClick={this.logout.bind(this)}
            className="login-button">
              Log Out
            </button>
      </div>
    );
  }
}

export default Logout;
