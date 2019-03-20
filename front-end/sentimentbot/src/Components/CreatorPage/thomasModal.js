import React from "react";
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from "reactstrap";
import Thomas from "../PNG/ThomasBot.png";
import { Emoji } from 'emoji-mart';
class ThomasModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
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
        <Button color="secondary" onClick={this.toggle}>
          Meet Me!
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Thomas</ModalHeader>
          <ModalBody>

            <div className="thomas-container">
              <p>Hello my name is Thomas! <Emoji emoji=":smile:" size={16} /></p>
              <p>My intrests are Software Development, Web Developement, Mechanical Design, Passive Building Design, Motocross, and Traveling.</p>
              <p>Please take mood bot out for a spin, Enjoy!</p>
              <img src={Thomas} width="300" height="300" alt="thomas" />
              <div className="thomas-link-container">
                <a
                  className="fab fa-twitter-square fa-3x"
                  href="https://twitter.com/ThomasClaydon1"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="screen-reader-text">Link to my twitter</span>
                </a>
                <a
                  className="fab fa-github-square fa-3x"
                  href="https://github.com/gittc100"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="screen-reader-text">Link to my github</span>
                </a>
                <a
                  className="fab fa-linkedin fa-3x"
                  href="https://www.linkedin.com/in/thomas-claydon-2a9725112/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="screen-reader-text">
                    Link to my linkedin
                  </span>
                </a>
              </div>
            </div>

          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>
              Return
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default ThomasModal;
