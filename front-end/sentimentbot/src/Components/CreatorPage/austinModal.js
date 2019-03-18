import React from 'react';
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap';
import Austin from "../PNG/AustinBot.png"


class AustinModal extends React.Component {
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
          <ModalHeader toggle={this.toggle}>Austin</ModalHeader>
          <ModalBody>
            <div className="austin-modal-container">
            <p>Austin has a love for food, tech, edm, movies, and gaming. Favorite cities include Hong Kong and Seattle. He put blood, sweat and tears (okay, maybe no blood) into this application. Here's hoping you love it as much as he does!</p>
            <img src={Austin} width="300" height="300" alt="austin" className="austin-bot" />
            <div className="austin-link-container">
            <a href="https://www.instagram.com/abikblake/">Instagram</a>
            <a href="https://github.com/dyiar">Github</a>
            <a href="https://www.linkedin.com/in/austblake11/">LinkedIn</a>
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
export default AustinModal;


