import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import { connect } from "react-redux";

class ModalTitles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      title: "",
      description: "",
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }
  onChangeHandler = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div>
        <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Survey Title and Description</ModalHeader>
          <ModalBody>
                <div className="survey-inputbox">
                  <label className="survey-inputlabel">Title</label>
                  <input
                    type="text"
                    value={this.props.state.title}
                    name="title"
                    placeholder="Title of survey"
                    onChange={this.props.onChangeHandler}
                  /> 
                </div>
                <div className="survey-inputbox">
                  <label className="survey-inputlabel">Question</label>
                  <input
                    type="text"
                    value={this.props.state.description}
                    name="description"
                    placeholder="Survey question"
                    onChange={this.props.onChangeHandler}
                  />
                </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Return</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default ModalTitles;
