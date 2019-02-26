import React from "react";
import NavBar from "../NavBar/NavBar";

class accountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmail: false,
      isText: false,
      email: "",
      password: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    // if (!localStorage.getItem("email")) {
    //   props.history.push("/home");
    // }
    return (
      <div>
        <NavBar />
        <h3>Settings</h3>
        <form className="account-form">
          <label>Email:</label>
          <input
            className="form-input"
            type="email"
            placeholder="johndoe@yahoo.com"
            name="email"
          />
          <br />
          <label>Phone:</label>
          <input
            className="form-input"
            type="text"
            placeholder="Phone"
            name="phone"
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

          <button className="submit-btn">Submit</button>
        </form>
      </div>
    );
  }
}

export default accountSettings;
