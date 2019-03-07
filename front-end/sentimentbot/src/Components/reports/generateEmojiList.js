import React from "react";
import { connect } from 'react-redux'
import { Emoji } from 'emoji-mart'
import '../history';


class EmojiList extends React.Component {
    constructor() {
        super();
        this.state = {
            response1: null,
            response2: null,
            response3: null,
            response4: null,
            complete: false
          };
    }

    componentDidMount() {
    this.setState({ complete: false });
    this.count = 0;
    this.response1 = "";
    this.response2 = "";
    this.response3 = "";
    this.response4 = "";
    this.complete = false;

    if (this.props.survey.length > 0 && this.props.singleSurvey.length !== 0) {
      const responses = this.props.singleSurvey.data.map(response => {
        this.count += 1;
      });

      if (this.count < 4) {
        for (let i = 0; i < this.count; i++) {
          let data = this.props.singleSurvey.data;
          let temp = data[i].feeling_text;
          if (this.response1 === "") {
            this.response1 = temp;
            if (this.count === 1) {
              this.complete = true;
            }
          } else if (this.response1 !== temp && this.response2 === "") {
            this.response2 = temp;
            if (this.count === 2) {
              this.complete = true;
            }
          } else if (
            this.response1 !== temp &&
            this.response3 === "" &&
            this.response2 !== temp
          ) {
            this.response3 = temp;
            if (this.count === 3) {
              this.complete = true;
            }
          } else if (
            this.response1 !== temp &&
            this.response4 === "" &&
            this.response2 !== temp &&
            this.response3 !== temp
          ) {
            this.response4 = temp;
            this.complete = true;
          }
        }
      }

      for (let i = 0; i < this.count; i++) {
        let data = this.props.singleSurvey.data;

        let temp = data[i].feeling_text;
        if (this.response1 === "") {
          this.response1 = temp;
        } else if (this.response1 !== temp && this.response2 === "") {
          this.response2 = temp;
        } else if (
          this.response1 !== temp &&
          this.response3 === "" &&
          this.response2 !== temp
        ) {
          this.response3 = temp;
        } else if (
          this.response1 !== temp &&
          this.response4 === "" &&
          this.response2 !== temp &&
          this.response3 !== temp
        ) {
          this.response4 = temp;
          this.complete = true;
        }
      }
      for(let i=0; i<this.count; i++) {
        let testText = this.response[i+1]
        let breakTest = testText.split(" ");
        this.result = [];
        for (let i = 0; i < breakTest.length; i++) {
          if (breakTest[i].indexOf(":") === -1) {
            let textP = breakTest[i] + " ";
            this.result.push(textP);
          } else if (breakTest[i].indexOf(":") > -1) {
            let textE = <Emoji emoji={breakTest[i]} size={16} />;
            this.result.push(textE);
          }
        }
    }
    }



    this.setState({
      response1: this.response1,
      response2: this.response2,
      response3: this.response3,
      response4: this.response4,
      complete: this.complete
    });

  }


//   let count = 4;
// {props.feelings[i].feeling_text}

render() {
    console.log(this.result)
    console.log(this.state.response1)
    if (
        (this.props.survey.length === 0 &&
          this.props.surveyIsFetching === true) ||
        this.props.singleSurvey.length === 0
      ) {
        return <p></p>;
      } else {
          this.result.map(response => {
              return <div>{response}</div>
          })
      }
}

}

function mapStateToProps(state) {
    return {
        singleSurvey: state.surveyReducer.singleSurvey,
        survey: state.surveyReducer.survey,
        surveyIsFetching: state.surveyReducer.surveyIsFetching,
        error: state.surveyReducer.error
    };
  }
  
  export default connect(
    mapStateToProps,
    { }
  )(EmojiList);