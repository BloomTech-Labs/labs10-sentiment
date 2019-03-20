import React from "react";
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from "reactstrap";
import Tyrone from "../PNG/TyroneBot.png";

class TyroneModal extends React.Component {
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
          <ModalHeader toggle={this.toggle}>Tyrone</ModalHeader>
          <ModalBody>
            <div className="tyrone-container">
              <p>Hello, I'm Tyrone</p>
              <p>
                I'm a dad who loves to code, and started this journey about 9
                months ago.
              </p>
              <p>
                Some of my interests are Software Development, Basketball,
                Football and BBQ.
              </p>
              <p>
                Thanks for checking out our M.O.O.D application and I hope you
                enjoy it!
              </p>
              <p>
                If you'd like to connect, or learn more about me follow the
                links below!
              </p>
              <div className="tyrones-bot">
                <img src={Tyrone} width="300" height="300" alt="tyrone" />
              </div>
              <div className="tyrone-link-container">
                <a
                  className="fab fa-twitter-square fa-3x"
                  href="https://twitter.com/this_GuyTyrone"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="screen-reader-text">Link to my twitter</span>
                </a>
                <a
                  className="fab fa-github-square fa-3x"
                  href="https://github.com/Tyrone-Cartwright"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="screen-reader-text">Link to my Github</span>
                </a>
                <a
                  className="fab fa-linkedin fa-3x"
                  href="https://www.linkedin.com/in/tyrone-cartwright-2370b444/"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <span className="screen-reader-text">
                    Link to my Linkedin
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
export default TyroneModal;
