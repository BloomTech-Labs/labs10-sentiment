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
                Sentimentbot but now it is called MOOD. Here is a link to my linkedin:
              <a href="https://www.linkedin.com/in/michelle-okagbue-2b2019176"> Click</a></p>
            </div>
            <img src={Michelle} width="300" height="300" alt="michelle" />
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