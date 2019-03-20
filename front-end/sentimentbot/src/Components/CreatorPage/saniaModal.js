import React from 'react';
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap';
import Sania from "../PNG/SaniaBot.png"


class SaniaModal extends React.Component {
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
          <ModalHeader toggle={this.toggle}>Sania</ModalHeader>
          <ModalBody>
            <div className="saniamodal-box">
              <div className="saniamodal-words">
                <p>Hello, I'm Sania!</p>
                <p> A 2019 Full Stack Web Development graduate and Project Manager at Lambda School.</p>
                <p> I had the great job of being Project Manager for the Sentimentbot MOOD project. </p>
                <p>My Linkedin profile can be found here: <a href="https://www.linkedin.com/in/sania-parekh-6aa012183/"> LinkedIn</a></p> 
              </div>
              <div className="saniabot">
                <img src={Sania} width="300" height="300" alt="sania" />
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
export default SaniaModal;