import React from "react";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import { editTeamMembers } from "../../actions/index";
import { connect } from "react-redux";
import "./accountSettings.css";

import { Col, FormGroup, Label, Input } from "reactstrap";

class accountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmail: false,
      isText: false,
      email: "",
      password: "",
      response: null
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
        });
      });
    this.setState({
      isEmail: false,
      isText: false,
      email: "",
      password: ""
    });
  };

  // Switches type & team_id of person leaving team to null
  handleLeaveTeam = event => {
    event.preventDefault();
    console.log("clicked");
    const firstName = this.props.singleTeamMembers[0].firstName;
    const lastName = this.props.singleTeamMembers[0].lastName;
    const email = this.props.singleTeamMembers[0].email;
    const phone = this.props.singleTeamMembers[0].phone;
    const type = null;
    const team_id = null;
    const id = this.props.singleTeamMembers[0].id;
    const combine = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      type: type,
      team_id: team_id
    };
    this.props.editTeamMembers(id, combine);
    this.props.history.push("/loading");
    let currentMember = this.props.singleTeamMembers[0];
    currentMember.type = null;
    currentMember.team_id = null;
    // this.props.history.push('/profile')
  };

  render() {
    // if (!localStorage.getItem("email")) {
    //   props.history.push("/home");
    // }
    return (
      <>
        <NavBar />
        <div className="container">
          {this.state.response === 200 ? (
            <div>Email will be sent shortly</div>
          ) : (
            <div className="settings-page">
              <h3 className="settings-header">Settings</h3>

              <form className="account-form" onSubmit={this.handleSubmit}>
                <FormGroup row>
                  <Label for="emailField" sm={2}>
                    Email
                  </Label>
                  <Col sm={6}>
                    <Input
                      type="email"
                      name="email"
                      id="emailField"
                      placeholder="Enter email here"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Label for="phoneNumber" sm={2}>
                    Phone
                  </Label>
                  <Col sm={6}>
                    <Input
                      type="text"
                      name="phone"
                      id="phoneNumber"
                      placeholder="555-555-5555"
                    />
                  </Col>
                </FormGroup>
                <br />
                <FormGroup check inline>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="isEmail"
                      checked={this.state.isEmail}
                      onchange={this.handleInputChange}
                    />
                    Email
                  </Label>
                </FormGroup>
                <FormGroup check inline>
                  <Label check>
                    <Input
                      type="checkbox"
                      name="isText"
                      checked={this.state.isText}
                      onchange={this.handleInputChange}
                    />
                    Text
                  </Label>
                </FormGroup>
                <br />

                <button
                  className="btn-style"
                  onSubmit={this.handleSubmit}
                  color="primary"
                >
                  Submit
                </button>
              </form>
              <button className="btn-style" onClick={this.handleLeaveTeam}>
                Leave Team
              </button>
            </div>
          )}
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return { singleTeamMembers: state.teamMembersReducer.singleTeamMembers };
}

export default connect(
  mapStateToProps,
  { editTeamMembers }
)(accountSettings);
