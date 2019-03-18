import React from 'react';
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap';
import Tyrone from "../PNG/TyroneBot.png"


class TyroneModal extends React.Component {
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
        <Button color="secondary" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Tyrone</ModalHeader>
          <ModalBody>
            <p>Talk about your self!</p>
            <img src={Tyrone} width="300" height="300" alt="tyrone" />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Return</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default TyroneModal;