import React from 'react';
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap';
import Michelle from "../PNG/MichelleBot.png"


class MichelleModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        modal: false,
      };
  
      this.toggle = this.toggle.bind(this);
    }
  
    toggle() {
      this.setState(prevState => ({
        modal: !prevState.modal
      }));
    }

render() {
    return (
        <div>
        <Button color="secondary" onClick={this.toggle}>Meet Me!</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Michelle</ModalHeader>
          <ModalBody>
            <div className="michelles-modalwords">
              <p>Hi! My name is Michelle!</p>
              <p>I am a student at Lambda School!</p> 
              <p>This is our labs project, originally called
                Sentimentbot, but we renamed it MOOD.</p>
              <p>I have been on this coding journey for about a year now. It has been crazy, fun, stressful, and amazing!</p>
              <p>This is my first full scale project, I hope you enjoy MOOD as much we did creating it!</p>
              <p>“You have brains in your head. You have feet in your shoes. You can steer yourself any direction you choose. 
                You're on your own. And you know what you know. And YOU are the one who'll decide where to go...”</p>
                <p>― Dr. Seuss - Oh, The Places You'll Go! -</p>
              <div className="michelles-bot">
                <img src={Michelle} width="300" height="300" alt="michelle" />
              </div>
              <div className="michelles-links">
                <a href="https://www.linkedin.com/in/michelle-okagbue-2b2019176"> LinkedIn</a> 
                <a href="https://github.com/Mokagbue"> GitHub</a>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Return</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default MichelleModal;