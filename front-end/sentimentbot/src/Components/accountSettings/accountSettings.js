import React from "react";
import NavBar from "../NavBar/NavBar";
import axios from "axios";

class accountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmail: false,
      isText: false,
      email: "",
      password: "",
      response: null,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post("https://bikbik.auth0.com/dbconnections/change_password", {
        client_id: "BnXSvU6tE4W8WGMt3gDWra24hXr8qY0e",
        email: this.state.email,
        connection: "Username-Password-Authentication"
      })
      .then(response => {
        this.setState({
          response: response.status
        })
      });
    this.setState({
      isEmail: false,
      isText: false,
      email: "",
      password: "",
    });
  };

  render() {
    // if (!localStorage.getItem("email")) {
    //   props.history.push("/home");
    // }
    return (
      <div className="container">
        <NavBar />
        {this.state.response === 200 ? (
          <div>Email will be sent shortly</div>
        ) : (
          <>
            <h3>Settings</h3>
            <form className="account-form" onSubmit={this.handleSubmit}>
              <label>Email:</label>
              <input
                className="form-input"
                type="email"
                placeholder="johndoe@yahoo.com"
                name="email"
                onChange={this.handleChange}
              />
              <br />
              <label>Phone:</label>
              <input
                className="form-input"
                type="text"
                placeholder="Phone"
                name="phone"
                onChange={this.handleChange}
              />
              <br />
              <label>
                Emails?
                <input
                  name="isEmail"
                  type="checkbox"
                  checked={this.state.isEmail}
                  onChange={this.handleInputChange}
                />
              </label>
              <label>
                Texts?
                <input
                  name="isText"
                  type="checkbox"
                  checked={this.state.isText}
                  onChange={this.handleInputChange}
                />
              </label>
              <br />

              <button className="submit-btn" onSubmit={this.handleSubmit}>
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    );
  }
}

export default accountSettings;
