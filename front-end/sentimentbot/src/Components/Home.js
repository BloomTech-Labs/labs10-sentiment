import React from "react";
import Login from './login/login'
import Auth from "./Auth/auth";
import "./home.css";
import Happy from "./PNG/nobackgroundHappy.png";
import Footer from "./Footer/footer";
import { Card, CardText, CardBody,
  CardTitle, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem  } from 'reactstrap';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ""
    };

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false
    };
  }


  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  componentDidMount() {
    // change this line to grab the id passed on the URL
    const code = this.props.match.params.code;
    console.log(code);
    if (code) {
      this.fetchAuth(code);
    }
  }

  componentDidUpdate(prev) {
    const code = this.props.match.params.code;
    console.log(code);
    if (code !== prev.match.params.code) {
      this.fetchAuth(code);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const code = this.props.match.params.code;
    console.log(code);
    // this.setState({
    //   ...this.state,
    //   code: code
    // });
  }

  render() {
    const auth = new Auth();
    return (
      <>
      <div className="home-container">
      <div className="landingIntro">
        <div className="home-container-text">
          <h1>
            Hello, I'm am your Miniature Organization Observation Drone, or M.O.O.D,
            Let me help you enjoy working with your team.
          </h1>
          <Login auth={auth} />
        </div>
        <div className="home-container-img">
          <img
            className="happy-auth"
            src={Happy}
            alt="Happy MoodBot"
            width="200"
            height="200"
          />
        </div>
        </div>

        <Card className="card">
       
        <CardBody className="cardBody">
          <CardTitle className="cardTitle">Slack Integration</CardTitle>
          <CardText className="cardText">Connect slack with your profile to setup surveys and view responses.</CardText>
        </CardBody>

        <CardBody className="cardBody">
        <CardTitle className="cardTitle">Custom Emoji's </CardTitle>
        <CardText className="cardText">Bring flair and improved user interaction using our curated collection of moodbots or uploading your own.</CardText>
      </CardBody>

      <CardBody className="cardBody">
      <CardTitle className="cardTitle">Sharp Charts</CardTitle>
      <CardText className="cardText">Meaningful graphs to dial it back and see the bigger picture.</CardText>
    </CardBody>
      </Card>
<div className="faq"> FAQ <br></br> <br></br>
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle className="faqButton" caret>
          What is Mood?
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem className="dropDown" header>Mood is a Slack bot which helps your team facilitating progress reporting through a Slack channel.</DropdownItem>
          
        </DropdownMenu>
      </ButtonDropdown>
<br></br>
      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle className="faqButton" caret>
          How do I install Mood?
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem className="dropDown" header>Just click the Add to Slack button on the profile page once you have signed up!</DropdownItem>
          
        </DropdownMenu>
      </ButtonDropdown>
      <br></br>

      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle className="faqButton" caret>
         Is there a survey limit? 
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem className="dropDown" header>You are able to create as many surveys as needed.</DropdownItem>
          
        </DropdownMenu>
      </ButtonDropdown> <br></br>

      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle className="faqButton" caret>
          How much does Mood cost?
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem className="dropDown" header>We offer competitive pricing tiers to meet the needs of individual clients.</DropdownItem>
          
        </DropdownMenu>
      </ButtonDropdown> <br></br>
      </div> <br></br> <br></br>

      <div className="quotes"><div className="quoteTitle">What are people saying about Mood? </div><br></br>
      <div>Innovative ~Austin </div> <br></br>
      <div>Warm and cute ~Michelle</div> <br></br>
      <div>Replaced standupply for our organization ~Anonymous</div> <br></br>
      <div>The hype train has truly left the station ~Tyrone</div> <br></br>
      <div> Woah No...Woah NO NO NO NO NO NO NO NO...*wheezing* ~Joseph</div>
      </div>
      </div>
      <Footer />
      </>
    );
  }
}
export default Home;
