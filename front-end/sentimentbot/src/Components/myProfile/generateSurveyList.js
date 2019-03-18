import React from "react";
import { connect } from "react-redux";
import { getSurvey, changeSurveyActivity } from "../../actions";
import "../history";
import "./myProfile.css";



function GenerateSurveyList(props) {
  let count = props.survey.length;

  function callBoth(id){
    props.changeSurveyActivity(id);
    setTimeout(()=>{
      // props.getSurvey(localStorage.getItem("id"));
      window.location.reload();
    }, 1000);
  }

  function displayDivs() {
    let divs = [];
    for (let i = 0; i < count; i++) {
      let id = props.survey[i].id;
      let title = props.survey[i].title;
      // let date = new Date(`${props.survey[i].created_at}`);
      // let description = props.survey[i].description;

      // let Active = props.active.map(item=>{
      //   // return item.survey_id;
      //   if(id === item.survey_id){
      //     return item.active;
      //   }
      // });

      let value;
      for (let x = 0; x < props.active.length; x++) {
        if (id === props.active[x].survey_id) {
          value = props.active[x].active;
        }
      }
      console.log("value", value);
    

      if (value) {
        divs.push(
          <div className="survey-container-div" key={i}>
            <span>Active</span>
            <p>
              #{id} {title} 
            </p>
            <button
              onClick={() => {
                callBoth(id);
              }}
              className="survey-container-button"
            >
              Deactivate
            </button>
          </div>
        );
      } else {
        divs.push(
          <div className="survey-container-div" key={i}>
            <span>Inactive</span>
            <p>
              #{id} {title}
            </p>
          </div>
        );
      }
    }
    return divs;
  }
  // {props.feelings[i].feeling_text}
  return <div>{displayDivs()}</div>;
}

function mapStateToProps(state) {
  return {
    survey: state.surveyReducer.survey,
    active: state.surveyReducer.active
  };
}

export default connect(
  mapStateToProps,
  { getSurvey, changeSurveyActivity }
)(GenerateSurveyList);
