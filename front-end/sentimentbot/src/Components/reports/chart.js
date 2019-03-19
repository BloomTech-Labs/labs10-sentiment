import React from "react";
import { connect } from "react-redux";
import { fetchSingleSurvey, getSingleTeamMembers, getSurvey, getSingleTeam, getFeelings } from "../../actions/index";
import { Pie } from "react-chartjs-2";
import { Emoji } from "emoji-mart";
// MVP use pie chart to show average feelings over the last 7 days.

class PieChart extends React.Component {
  constructor() {
    super();
    this.state = {
      response1: "",
      response2: "",
      response3: "",
      response4: "",
      count1: null,
      count2: null,
      count3: null,
      count4: null,
      complete: false,
      loading: true
      // date: null
    };
  }

  // componentWillMount() {
  //   this.setState({ complete: false });
  //   this.count = 0;
  //   this.response1 = "";
  //   this.response2 = "";
  //   this.response3 = "";
  //   this.response4 = "";
  //   this.complete = false;

  //   if (this.props.survey.length > 0 && this.props.singleSurvey.length !== 0) {
  //     const responses = this.props.singleSurvey.data.map(
  //       response => (this.count += 1)
  //     );
  //     console.log(responses, "responses");

  //     // for (let i = 0; i < this.count; i++) {
  //     //   let data = this.props.singleSurvey.data;
  //     //   let testText = data[i].feeling_text;
  //     //   let breakTest = testText.split(" ");
  //     //   this.result = [];
  //     //   for (let i = 0; i < breakTest.length; i++) {
  //     //     if (breakTest[i].indexOf(":") === -1) {
  //     //       let textP = breakTest[i] + " ";
  //     //       this.result.push(textP);
  //     //     } else if (breakTest[i].indexOf(":") > -1) {
  //     //       let textE = <Emoji emoji={breakTest[i]} size={16} />;
  //     //       this.result.push(textE);
  //     //     }
  //     //   }
  //     // }

  //     if (this.count < 4) {
  //       for (let i = 0; i < this.count; i++) {
  //         let data = this.props.singleSurvey.data;

  //         for (let i = 0; i < this.count; i++) {
  //           let testText = data[i].feeling_text;
  //           let breakTest = testText.split(" ");
  //           this.result = [];
  //           for (let i = 0; i < breakTest.length; i++) {
  //             if (breakTest[i].indexOf(":") === -1) {
  //               let textP = breakTest[i] + " ";
  //               this.result.push(textP);
  //             } else if (breakTest[i].indexOf(":") > -1) {
  //               let textE = <Emoji emoji={breakTest[i]} size={16} />;
  //               this.result.push(textE);
  //             }
  //           }
  //         }
  //         let temp = data[i].feeling_text;
  //         if (this.response1 === "") {
  //           this.response1 = temp;
  //           if (this.count === 1) {
  //             this.complete = true;
  //           }
  //         } else if (this.response1 === temp && this.response2 === "") {
  //           this.response2 = temp;
  //           if (this.count === 2) {
  //             this.complete = true;
  //           }
  //         } else if (
  //           this.response1 === temp &&
  //           this.response3 === "" &&
  //           this.response2 === temp
  //         ) {
  //           this.response3 = temp;
  //           if (this.count === 3) {
  //             this.complete = true;
  //           }
  //         } else if (
  //           this.response1 === temp &&
  //           this.response4 === "" &&
  //           this.response2 === temp &&
  //           this.response3 === temp
  //         ) {
  //           this.response4 = temp;
  //           this.complete = true;
  //         } else {
  //           this.complete = true
  //         }
  //       }
  //     }

  //     for (let i = 0; i < this.count; i++) {
  //       let data = this.props.singleSurvey.data;

  //       let temp = data[i].feeling_text;
  //       if (this.response1 === "") {
  //         this.response1 = temp;
  //       } else if (this.response1 !== temp && this.response2 === "") {
  //         this.response2 = temp;
  //       } else if (
  //         this.response1 !== temp &&
  //         this.response3 === "" &&
  //         this.response2 !== temp
  //       ) {
  //         this.response3 = temp;
  //       } else if (
  //         this.response1 !== temp &&
  //         this.response4 === "" &&
  //         this.response2 !== temp &&
  //         this.response3 !== temp
  //       ) {
  //         this.response4 = temp;
  //         this.complete = true;
  //       }
  //     }

  //     //     this.responsesEmojis = []

  //     //     for(let i=1; i<=4; i++) {
  //     //       let testText = this.response[i]
  //     //       let breakTest = testText.split(" ");
  //     //       let result = [];
  //     //       for (let i = 0; i < breakTest.length; i++) {
  //     //         if (breakTest[i].indexOf(":") === -1) {
  //     //           let textP = breakTest[i] + " ";
  //     //           result.push(textP);
  //     //         } else if (breakTest[i].indexOf(":") > -1) {
  //     //           let textE = <Emoji emoji={breakTest[i]} size={16} />;
  //     //           result.push(textE);
  //     //         }
  //     //       }
  //     //       this.responsesEmojis = result;
  //     //   }
  //     //   console.log(this.responsesEmojis)
  //     // }
  //   }

  //   if (
  //     this.props.survey.length > 0 &&
  //     this.props.singleSurvey.length !== 0 &&
  //     this.complete === true
  //   ) {
  //     this.emoji1 = [];
  //     this.emoji2 = [];
  //     this.emoji3 = [];
  //     this.emoji4 = [];

  //     for (let i = 0; i < this.result.length; i++) {
  //       if (this.emoji1.length === 0) {
  //         if (typeof this.result[i] === "string") {
  //           this.emoji1.push(this.result[i]);
  //           this.emoji1.push(this.result[i + 1]);
  //           i = i + 2;
  //         } else {
  //           this.emoji1 = this.result[i];
  //           i = i + 1;
  //         }
  //       } else if (
  //         this.emoji1[0] !== this.result[i] &&
  //         this.emoji2.length === 0
  //       ) {
  //         if (typeof this.result[i] === "string") {
  //           this.emoji2.push(this.result[i]);
  //           this.emoji2.push(this.result[i + 1]);
  //           i = i + 2;
  //         } else {
  //           this.emoji2 = this.result[i];
  //           i = i + 1;
  //         }
  //       } else if (
  //         this.emoji1[0] !== this.result[i] &&
  //         this.emoji2[0] !== this.result[i] &&
  //         this.emoji3.length === 0
  //       ) {
  //         if (typeof this.result[i] === "string") {
  //           this.emoji3.push(this.result[i]);
  //           this.emoji3.push(this.result[i + 1]);
  //           i = i + 2;
  //         } else {
  //           this.emoji3 = this.result[i];
  //           i = i + 1;
  //         }
  //       } else if (
  //         this.emoji1[0] !== this.result[i] &&
  //         this.emoji2[0] !== this.result[i] &&
  //         this.emoji3[0] !== this.result[i] &&
  //         this.emoji4.length === 0
  //       ) {
  //         if (typeof this.result[i] === "string") {
  //           this.emoji4.push(this.result[i]);
  //           this.emoji4.push(this.result[i + 1]);
  //           i = i + 2;
  //         } else {
  //           this.emoji4 = this.result[i];
  //           i = i + 1;
  //         }
  //       }
  //     }
  //     console.log(this.emoji1, this.emoji2);
  //   }

  //   this.responseArray = [];
  //   for (let i = 0; i < this.count; i++) {
  //     let temp = this.props.singleSurvey.data[i].feeling_text;
  //     this.responseArray.push(temp);
  //   }

  //   let counts = {};
  //   this.responseArray.forEach(function(x) {
  //     counts[x] = (counts[x] || 0) + 1;
  //   });

  //   // if(this.props.singleSurvey.response.length === 0) {
  //   //   this.date = new Date();
  //   // } else {
  //   // this.date = new Date(`${this.props.singleSurvey.response[0].created_at}`);
  //   // }

  //   this.setState({
  //     response1: this.response1,
  //     response2: this.response2,
  //     response3: this.response3,
  //     response4: this.response4,
  //     count1: counts[this.response1],
  //     count2: counts[this.response2],
  //     count3: counts[this.response3],
  //     count4: counts[this.response4],
  //     complete: this.complete,
  //     loading: false
  //     // date: this.date
  //   });
  // }

  componentDidMount() {
    this.props.getSingleTeamMembers(localStorage.getItem("email"));
    this.props.getSurvey(localStorage.getItem('id'));
    this.props.getSingleTeam(localStorage.getItem('team_id'));
    this.props.getFeelings(localStorage.getItem('id'));
    if (this.props.survey.length > 0 && this.props.singleSurvey.length === 0) {
      this.props.fetchSingleSurvey(this.props.survey[0].survey_time_stamp);
      // this.setState({
      //   loading: false
      // })
    }
    //   this.setState({
    //     loading: false
    //   })
    // }
  }

  componentDidUpdate(prevProps) {
    if (this.props.surveyIsFetching !== prevProps.surveyIsFetching) {
      if (this.props.survey.length !== prevProps.survey.length) {
        this.props.fetchSingleSurvey(this.props.survey[0].survey_time_stamp)
      }
      this.setState({ complete: false });
      this.count = 0;
      this.response1 = "";
      this.response2 = "";
      this.response3 = "";
      this.response4 = "";
      this.complete = false;

      if (this.props.survey.length > 0 && this.props.singleSurvey.length !== 0) {
        const responses = this.props.singleSurvey.data.map(
          response => (this.count += 1)
        );
        console.log(responses, "responses");


        // for (let i = 0; i < this.count; i++) {
        //   let data = this.props.singleSurvey.data;
        //   let testText = data[i].feeling_text;
        //   let breakTest = testText.split(" ");
        //   this.result = [];
        //   for (let i = 0; i < breakTest.length; i++) {
        //     if (breakTest[i].indexOf(":") === -1) {
        //       let textP = breakTest[i] + " ";
        //       this.result.push(textP);
        //     } else if (breakTest[i].indexOf(":") > -1) {
        //       let textE = <Emoji emoji={breakTest[i]} size={16} />;
        //       this.result.push(textE);
        //     }
        //   }
        // }

        if (this.count < 4) {
          for (let i = 0; i < this.count; i++) {
            let data = this.props.singleSurvey.data;
            this.result = [];

            for (let i = 0; i < this.count; i++) {
              let testText = data[i].feeling_text;
              let breakTest = testText.split(" ");
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
            let temp = data[i].feeling_text;
            if (this.response1 === "") {
              this.response1 = temp;
              if (this.count === 1) {
                this.complete = true;
              }
            } else if (this.response1 !== temp && this.response2 === "") {
              this.response2 = temp;
              if (this.count !== 2) {
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
            } else {
              this.complete = true
            }
          }
        }

        for (let i = 0; i < this.count; i++) {
          let data = this.props.singleSurvey.data;
          this.result = [];

          for (let i = 0; i < this.count; i++) {
            let testText = data[i].feeling_text;
            let breakTest = testText.split(" ");
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
          } else {
            this.complete = true
          }
        }

        //     this.responsesEmojis = []

        //     for(let i=1; i<=4; i++) {
        //       let testText = this.response[i]
        //       let breakTest = testText.split(" ");
        //       let result = [];
        //       for (let i = 0; i < breakTest.length; i++) {
        //         if (breakTest[i].indexOf(":") === -1) {
        //           let textP = breakTest[i] + " ";
        //           result.push(textP);
        //         } else if (breakTest[i].indexOf(":") > -1) {
        //           let textE = <Emoji emoji={breakTest[i]} size={16} />;
        //           result.push(textE);
        //         }
        //       }
        //       this.responsesEmojis = result;
        //   }
        //   console.log(this.responsesEmojis)
        // }
      }

      if (
        this.props.survey.length > 0 &&
        this.props.singleSurvey.length !== 0 &&
        this.complete === true
      ) {
        this.emoji1 = [];
        this.emoji2 = [];
        this.emoji3 = [];
        this.emoji4 = [];

        for (let i = 0; i < this.result.length; i += 2) {
          if (this.emoji1.length === 0) {
              this.emoji1.push(this.result[i]);
              this.emoji1.push(this.result[i + 1]);
              // console.log(i, 'i at 440', this.result[i], this.emoji1)
              // console.log(this.result)
          // } else if (this.emoji1[1].props.emoji === this.result[i+1].props.emoji) {
          //   this.emoji1.shift()
          //   this.emoji1.shift()
          //   this.emoji1.push(this.result[i]);
          //   this.emoji1.push(this.result[i + 1]);
          } else if (this.emoji1[1].props.emoji !== this.result[i+1].props.emoji &&
            this.emoji2.length === 0){
                this.emoji2.push(this.result[i]);
                this.emoji2.push(this.result[i + 1]);
                // console.log(i, 'i at 466', this.result[i], this.emoji2)
          } else if (
            this.emoji1[1].props.emoji !== this.result[i+1].props.emoji &&
            this.emoji2[1].props.emoji !== this.result[i+1].props.emoji &&
            this.emoji3.length === 0
          ) {
              this.emoji3.push(this.result[i]);
              this.emoji3.push(this.result[i + 1]);
          } else if (
            this.emoji1[1].props.emoji !== this.result[i+1].props.emoji &&
            this.emoji2[1].props.emoji !== this.result[i+1].props.emoji &&
            this.emoji3[1].props.emoji !== this.result[i+1].props.emoji &&
            this.emoji4.length === 0
          ) {
              this.emoji4.push(this.result[i]);
              this.emoji4.push(this.result[i + 1]);
          }
          // break
        }
        // console.log(this.emoji1, this.emoji2);
      }

      this.responseArray = [];
      for (let i = 0; i < this.count; i++) {
        let temp = this.props.singleSurvey.data[i].feeling_text;
        this.responseArray.push(temp);
      }

      let counts = {};
      this.responseArray.forEach(function (x) {
        counts[x] = (counts[x] || 0) + 1;
      });

      // if(this.props.singleSurvey.response.length === 0) {
      //   this.date = new Date();
      // } else {
      // this.date = new Date(`${this.props.singleSurvey.response[0].created_at}`);
      // }

      this.setState({
        response1: this.response1,
        response2: this.response2,
        response3: this.response3,
        response4: this.response4,
        count1: counts[this.response1],
        count2: counts[this.response2],
        count3: counts[this.response3],
        count4: counts[this.response4],
        complete: this.complete,
        loading: false
        // date: this.date
      });
    }
    // if(this.props.singleSurvey.response === undefined) {
    //   this.date = new Date();
    // } else if(this.props.singleSurvey.response !== undefined && this.props.singleSurvey.length !== 0) {
    //   this.date = new Date(`${this.props.singleSurvey.response[0].created_at}`)
    // }
  }

  render() {
    // if (localStorage.getItem('i')) {
    //   setTimeout(function () {
    //     localStorage.removeItem('i')
    //   }, 1200)
    //   return <p>Loading...</p>
    // }
    if (this.state.complete === false || this.props.loading === true || this.props.surveyIsFetching === true) {
      return (<><p>Make surveys and get responses to see reports!</p>{/*<img className="loadinggif report-gif" src={loadinggif} alt="loading" />*/}</>)
    } else if (
      this.props.surveyIsFetching === false &&
      this.props.survey.length === 0 &&
      this.props.singleSurvey.length === 0 &&
      this.state.complete === false
    ) {
      return <p>Make surveys to display data</p>;
    } else if (
      this.props.survey.length > 0 &&
      this.props.surveyIsFetching === false &&
      this.props.singleSurvey.length === 0 &&
      this.state.complete === false
    ) {
      return <p>Make surveys to display data</p>
    } else if (this.props.singleSurvey.length === 0) {
      return <p>Make surveys to display data</p>
    } else if (typeof this.props.singleSurvey.response.length === undefined) {
      return <p>Make surveys to display data</p>
    } else {
      const data = {
        labels: ["", "", "", ""],
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

      const canvas = {
        height: "400px",
        width: "350px"
      };

      return (
        <>
          {this.state.complete === false ? (
            <div>Create Surveys to see results!</div>
          ) : (
              <div className="pie-chart-main" style={canvas}>
                <div className="pie-chart-words">
                  <h2>{this.props.singleSurvey.response[0].description}</h2>
                  {date === undefined ? (
                    <p>This has no responses yet</p>
                  ) : (
                      <h3>Created on {date.toDateString()}.</h3>
                    )}
                  <p>
                    {this.count} {this.count < 2 ? "response" : "responses"} to
                    this survey
                </p>
                </div>
                <div className="responses">
                  <p className="response1">Response 1:</p>
                  {this.state.response1 === "" ? (<p></p>) : (this.state.response1[0] === ":" ? (
                    <Emoji
                      className="emoji1"
                      emoji={this.state.response1}
                      size={16}
                    />
                  ) : (
                      <p>
                        {this.emoji1[0]}
                        {this.emoji1[1]}
                      </p>
                    ))}{" "}
                  <p className="response2">Response 2:</p>
                  {this.state.response2 === "" ? (<p></p>) : (this.state.response2[0] === ":" ? (
                    <Emoji
                      className="emoji1"
                      emoji={this.state.response2}
                      size={16}
                    />
                  ) : (
                      <p>
                        {this.emoji2[0]}
                        {this.emoji2[1]}
                      </p>
                    ))}{" "}
                  <p className="response3">Response 3:</p>
                  {this.state.response3 === "" ? (<p></p>) : (this.state.response3[0] === ":" ? (
                    <Emoji
                      className="emoji1"
                      emoji={this.state.response3}
                      size={16}
                    />
                  ) : (
                      <p>
                        {this.emoji3[0]}
                        {this.emoji3[1]}
                      </p>
                    ))}{" "}
                  <p className="response4">Response 4:</p>
                  {this.state.response4 === "" ? (<p></p>) : (this.state.response4[0] === ":" ? (
                    <Emoji
                      className="emoji1"
                      emoji={this.state.response4}
                      size={16}
                    />
                  ) : (
                      <p>
                        {this.emoji4[0]}
                        {this.emoji4[1]}
                      </p>
                    ))}
                </div>
                <Pie
                  className="piepie"
                  data={data}
                  // width={10}
                  height={10}
                  options={{
                    maintainAspectRatio: false,
                    responsive: true
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
  { fetchSingleSurvey, getSingleTeamMembers, getSurvey, getSingleTeam, getFeelings }
)(PieChart);
