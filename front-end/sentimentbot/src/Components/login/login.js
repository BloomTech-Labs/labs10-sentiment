import React from "react";

// function Login(props) {
class Login extends React.Component {
  login() {
    this.props.auth.login()
  }
    
render() {
  return (
    // <form>
    <div>
      {/* login() {
      this.props.auth.login()
    } */}
      {/* <div>
        <label>Username</label>
        <input
          name="username"
          // value={this.state.username}
          // onChange={this.handleInputChange}
          type="text"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          name="password"
          // value={this.state.password}
          // onChange={this.handleInputChange}
          type="password"
        />
      </div> */}
      <div>
        <button type="submit" onClick={this.login.bind(this)}>login</button>
      </div>
      </div>
    // </form>
    )};
}


export default Login;
