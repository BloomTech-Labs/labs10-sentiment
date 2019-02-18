import React from "react";

function Login(props) {
  return (
    <form>
      <div>
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
      </div>
      <div>
        <button type="submit">login</button>
      </div>
    </form>
  );
}

export default Login;
