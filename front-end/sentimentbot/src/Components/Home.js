import React from "react";
import Login from './login/login'
import Auth from "./Auth/auth";
import "./home.css";
import Happy from "./PNG/nobackgroundHappy.png";
import FooterBanner from "./PNG/MOODfooterBANNER6.png";
import { Card, CardText, CardBody,
  CardTitle, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem  } from 'reactstrap';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      dropdownOpen:false,
      dropdownOpen2:false,
      dropdownOpen3:false,
      dropdownOpen4:false,
      
    };

    this.toggle = this.toggle.bind(this);

    this.toggle2 = this.toggle2.bind(this);

    this.toggle3 = this.toggle3.bind(this);

    this.toggle4 = this.toggle4.bind(this);
   
  }


  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

toggle2() {
  this.setState({
    dropdownOpen2: !this.state.dropdownOpen2
  });
}

toggle3() {
  this.setState({
    dropdownOpen3: !this.state.dropdownOpen3
  });
}

toggle4() {
  this.setState({
    dropdownOpen4: !this.state.dropdownOpen4
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
            Hello, I'm am the Miniature Organization Observation Drone, or M.O.O.D.
            Let me help you enjoy working with your team.
          </h1>
          <Login auth={auth} />
        </div>
        <div className="home-container-img">
          <img
            src={Happy}
            alt="Happy MoodBot"
            width="200"
            height="200"
          />
        </div>
        </div>
<div className="restofPage">
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
          <DropdownItem className="dropDown" header>Mood is a Slack bot which helps your team facilitating progress reporting.</DropdownItem>
          
        </DropdownMenu>
      </ButtonDropdown>
<br></br>
      <ButtonDropdown isOpen={this.state.dropdownOpen2} toggle={this.toggle2}>
        <DropdownToggle className="faqButton" caret>
          How do I install Mood?
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem className="dropDown" header>Click the Add to Slack button on the profile page once you have signed up!</DropdownItem>
          
        </DropdownMenu>
      </ButtonDropdown>
      <br></br>

      <ButtonDropdown isOpen={this.state.dropdownOpen3} toggle={this.toggle3}>
        <DropdownToggle className="faqButton" caret>
         Is there a survey limit? 
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem className="dropDown" header>You are able to create as many surveys as needed.</DropdownItem>
          
        </DropdownMenu>
      </ButtonDropdown> <br></br>

      <ButtonDropdown isOpen={this.state.dropdownOpen4} toggle={this.toggle4}>
        <DropdownToggle className="faqButton" caret>
          How much does Mood cost?
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem className="dropDown" header>We offer competitive pricing tiers to meet the needs of individual clients.</DropdownItem>
          
        </DropdownMenu>
      </ButtonDropdown> <br></br>
      </div> <br></br> <br></br>

     { /* <div className="quotes"><div className="quoteTitle">What are people saying about Mood? </div><br></br>
      <div>Innovative ~Austin </div> <br></br>
      <div>Warm and cute ~Michelle</div> <br></br>
      <div>Replaced standupply for our organization ~Anonymous</div> <br></br>
      <div>The hype train has truly left the station ~Tyrone</div> <br></br>
      <div> Woah No...Woah NO NO NO NO NO NO NO NO...*wheezing* ~Joseph</div>
    </div> */ }
      </div>
      </div>
      <div className="homefooter">
          <p className="homecopyright-words">© Copyright M.O.O.D All Rights Reserved.</p>
          <div className="homefooterimg-box">
            <img  className="homefooter-img" alt="footer" src={FooterBanner} />
          </div>
        </div>
      </>
    );
  }
}
export default Home;
