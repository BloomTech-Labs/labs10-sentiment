import React from "react";
import NavBar from "../NavBar/NavBar";
import axios from "axios";
import {
  getSingleTeamMembers,
  addTeamMembers,
  getTeamMembers,
  addTeam,
  getTeams,
  editTeamMembers,
  getSingleTeam,
  fetchSingleSurvey,
  getSurvey,
  joinTeam,
  getPreFeeling,
  getFeelings
} from "../../actions/index";
import { connect } from "react-redux";
import "./accountSettings.css";
import loadinggif from "../callback/loading.svg";
import SideBanner from "../PNG/MOODsideBANNER.png";

import { Col, FormGroup, Input } from "reactstrap";

class accountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmail: false,
      isText: false,
      email: "",
      password: "",
      response: null,
      loading: true
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    //new code
    this.props.getSingleTeamMembers(localStorage.getItem("email"));
    this.props.getSurvey(localStorage.getItem("id"));
    this.props.getSingleTeam(localStorage.getItem("team_id"));
    this.props.getFeelings(localStorage.getItem("id"));
    this.setState({
      loading: false
    });
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
    // localStorage.setItem("team_id", null);
    // localStorage.setItem("type", null);
    localStorage.setItem("abandoned", true);
    alert("Our Mood Bots are on it");

    setTimeout(() => {
      this.props.history.push("/loading");
    }, 1000);
    // this.props.history.push("/loading");
    // let currentMember = this.props.singleTeamMembers[0];
    // currentMember.type = null;
    // currentMember.team_id = null;
    // this.props.history.push('/profile')
  };

  render() {
    if (!localStorage.getItem("jwt")) {
      this.props.history.push("/home");
    }

    if (this.state.loading === true) {
      return <img className="loadinggif" src={loadinggif} alt="loading" />;
    }
    return (
      <>
        <div className="accsetpage-container">
          <NavBar />
          <div className="settings-container">
            {this.state.response === 200 ? (
              <div>Email will be sent shortly</div>
            ) : (
              <div className="settings-page">
                <h3 className="settings-header">Settings</h3>
                <div className="accsetcontent-container">
                <p className="resetwords-box">Reset your password here:</p>
                <form id="account-form" style={{fontFamily:'Roboto'}}  onSubmit={this.handleSubmit}>
                  <FormGroup row>
                    {/* <Label for="emailField" sm={2}>
                      Email
                    </Label> */}
                    <Col sm={6}>
                      <Input
                        type="email"
                        name="email"
                        id="emailField"
                        placeholder="Enter email here"
                      />
                    </Col>
                  </FormGroup>
                </form>
                <div className="accbuttons-box">
                  <button
                      className="btn-style"
                      onSubmit={this.handleSubmit}
                      color="primary"
                    >
                      Reset Password
                  </button>
                  <button
                    className="btn-style btn-style2"
                    onClick={this.handleLeaveTeam}
                  >
                    Leave Team
                  </button>
                </div>
                </div>
              </div>
            )}
          </div>
          <div className="sidebanner-box">
            <img clasName="sidebanner" height="600"width="250" src={SideBanner} alt="side banner" />
          </div>
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
  {
    getSingleTeamMembers,
    addTeamMembers,
    getTeamMembers,
    addTeam,
    getTeams,
    editTeamMembers,
    getSingleTeam,
    fetchSingleSurvey,
    getSurvey,
    joinTeam,
    getPreFeeling,
    getFeelings
  }
)(accountSettings);
