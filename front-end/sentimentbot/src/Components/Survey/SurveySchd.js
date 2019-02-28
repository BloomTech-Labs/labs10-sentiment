import React, { Fragment } from 'react';


function SurveySchd(props) {
    function handleSubmit(event) {
        event.preventDefault();
    }

  return (
    <Fragment>
        <form>
            <h2>Schedule a Survey</h2>
            <div className="schedule">
                <label>Daily</label>
                <input 
                    type="text" 
                    // value={props.feelings.feeling_text} 
                    placholder="Daily"
                    name="Daily" 
                    onChange={props.handleChange} 
                />
            </div>
            <div className="schedule">
                <label>Weekly</label>
                <input 
                    type="text" 
                    // value={props.feelings.feeling_text} 
                    placholder="Weeky"
                    name="Weekly" 
                    onChange={props.handleChange} 
                />
            </div>
            <div className="schedule">
                <label>Monthly</label>
                <input 
                    type="text" 
                    // value={props.feelings.feeling_text} 
                    placholder="Monthly"
                    name="Monthly" 
                    onChange={props.handleChange} 
                />
            </div>
            <button className="material-button-raised" onClick={handleSubmit}>Submit</button>
        </form>
    </Fragment>
  );
}


export default SurveySchd;