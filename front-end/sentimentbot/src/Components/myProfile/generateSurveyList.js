import React from "react";
import { connect } from "react-redux";
import { getSurvey, changeSurveyActivity } from "../../actions";
import { Emoji } from "emoji-mart";
import "../history";
import "./myProfile.css";

function GenerateSurveyList(props) {
  let count = props.survey.length;

  function displayDivs() {
    let divs = [];
    for (let i = 0; i < count; i++) {
      
      let id = props.survey[i].id;
      let title = props.survey[i].title;
      // let date = new Date(`${props.survey[i].created_at}`);
      // let description = props.survey[i].description;
     
      // let Active = props.active.map(item=>{
      //   if(id === item.survey_id){
      //     return item.active;
      //   }
      // });

      // if(Active === 1){
      divs.push(
        <div className="survey-container-div" key={i}>
          <span>Active</span>
          <p>
            #{id} {title}
          </p>
          <button onClick={()=>{this.props.changeSurveyActivity(id)}} className="survey-container-button">Deactivate</button>
        </div>
      );
      // }else{
      //   divs.push(
      //     <div className="survey-container-div" key={i}>
      //       <span>In Active</span>
      //       <p>
      //         #{id} {title}
      //       </p>
      //     </div>
      //   );
      // }
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
