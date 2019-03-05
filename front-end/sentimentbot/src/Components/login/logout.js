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

            <div
            onClick={this.logout.bind(this)}
            className="logout-button">
              Log Out
            </div>
      </div>
    );
  }
}

export default Logout;
