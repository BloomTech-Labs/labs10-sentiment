import React from "react";
import { connect } from "react-redux";
import { fetchSingleSurvey } from "../../actions/index";
import { Pie } from "react-chartjs-2";

// MVP use pie chart to show average feelings over the last 7 days.

class PieChart extends React.Component {
  constructor() {
    super();
    this.state = {
      response1: null,
      response2: null,
      response3: null,
      response4: null,
      count1: 0,
      count2: 0,
      count3: 0,
      count4: 0,
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
          let temp = this.props.singleSurvey.data[i].feeling_text;
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
        let temp = this.props.singleSurvey.data[i].feeling_text;
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
    }

    this.responseArray = [];
    for (let i = 0; i < this.count; i++) {
      let temp = this.props.singleSurvey.data[i].feeling_text;
      this.responseArray.push(temp);
    }

    let counts = {};
    this.responseArray.forEach(function(x) {
      counts[x] = (counts[x] || 0) + 1;
    });

    this.setState({
      response1: this.response1,
      response2: this.response2,
      response3: this.response3,
      response4: this.response4,
      count1: counts[this.response1],
      count2: counts[this.response2],
      count3: counts[this.response3],
      count4: counts[this.response4],
      complete: this.complete
    });
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.singleSurvey.response[0].id !== prevProps.singleSurvey.response[0].id) {
  //     return (
  //       <div>Loading...</div>
  //     )
  //   }
  // }

  render() {
    if (
      (this.props.survey.length === 0 &&
        this.props.surveyIsFetching === true &&
      this.props.singleSurvey.length === 0 &&
      this.state.complete === false)
    ) {
      return <p>Make surveys to display data</p>;
    } else {
      const data = {
        labels: [
          this.state.response1,
          this.state.response2,
          this.state.response3,
          this.state.response4
        ],
        datasets: [
          {
            data: [
              this.state.count1,
              this.state.count2,
              this.state.count3,
              this.state.count4
            ],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
          }
        ]
      };

      let date = new Date(`${this.props.singleSurvey.response[0].created_at}`)

      return (
        <>
          {this.state.complete === false ? (
            <div>Create Surveys to see results!</div>
          ) : (
            <div className="pie-chart">
            <div className="pie-chart-words">
              <h2>{this.props.singleSurvey.response[0].description}</h2><h3>Created on {date.toDateString()}.</h3>
              <p>{this.count} {this.count < 2 ? ('response') : ('responses')} to this survey</p>
              </div>
              <Pie
                data={data}
                width={25}
                height={25}
                options={{
                  maintainAspectRatio: true
                }}
              />
            </div>
          )}
          {/* <Select options={surveyList} /> */}
        </>
      );
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
  { fetchSingleSurvey }
)(PieChart);
