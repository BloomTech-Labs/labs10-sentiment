import React from 'react';
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap';
import Joseph from "../PNG/JosephBot.png"


class JosephModal extends React.Component {
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
          <ModalHeader toggle={this.toggle}>Joseph</ModalHeader>
          <ModalBody>
            <div className="joseph-container">
              <p>Hey there, I'm Joseph.</p>
              <p>A few of my interests: Software Development, Gaming, Traveling.</p>
              <p>If you'd like to connect, or learn more about me, follow my links below!</p>
              <p>Thanks for checking out Sentiment Bot (aka MOOD).</p>
              <img src={Joseph} width="300" height="300" alt="joseph" />
              <div className="joseph-link-container">
                <a className="fab fa-twitter-square fa-3x" href="https://twitter.com/_josepheastman" target="_blank"></a>
                <a className="fab fa-github-square fa-3x" href="https://github.com/josepheastman" target="_blank"></a>
                <a className="fab fa-linkedin fa-3x" href="https://www.linkedin.com/in/joseph-eastman/" target="_blank"></a>
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
export default JosephModal;