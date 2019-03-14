import React from 'react';
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// import { connect } from "react-redux";

class SurveyTitles extends React.Component {
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


  render() {
    return (
      <div className="survey-title">
        {/* <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Survey Title and Description</ModalHeader>
          <ModalBody> */}
          <p>Step 1/4: Enter a Title and a Question.</p>
                <div className="survey-inputbox">
                  <label className="survey-inputlabel title-label">Title</label>
                  <input
                    type="text"
                    value={this.props.state.title}
                    name="title"
                    placeholder="Title of survey"
                    onChange={this.props.titleChangeHandler}
                  /> 
                </div>
                <div className="survey-inputbox">
                  <label className="survey-inputlabel">Question</label>
                  <input
                    type="text"
                    value={this.props.state.description}
                    name="description"
                    placeholder="Survey question"
                    onChange={this.props.titleChangeHandler}
                  />
                </div>
          {/* </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Return</Button>{' '}
          </ModalFooter>
        </Modal> */}
      </div>
    );
  }
}
export default SurveyTitles;
