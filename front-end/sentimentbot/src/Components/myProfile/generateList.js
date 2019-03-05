import React from "react";
import { connect } from 'react-redux'
import { getFeelings } from "../../actions";
import '../history';


function GenerateList(props) {

  let count = props.feelings.length;


//   function generateReport(i) {
//       const id = props.singleTeamMembers[0].id;
//       const team_code = { team_code: i}
//       props.joinTeam(id, team_code)
//   }

//   for (let i=0; i<count; i++) {
//       <div>
//           <p>Option{i}</p>
//           <button onClick={() => generateReport(i)}>Generate</button>
//       </div>
//   }
// }

// let listOfSurveys = props.survey.map(i => 
//     <div>
//     <p>Option{i}</p>
//     <button onClick={() => generateReport(i)}>Generate</button>
//     </div>
// )

function displayDivs() {
    let divs = [];
    for(let i=0; i<count; i++) {
        let date = new Date(`${props.feelings[i].created_at}`)
        divs.push(<div key={i}><p>You reacted with {props.feelings[i].feeling_text} on {date.toDateString()}.</p></div>)
    }
    return divs
}

return (
    <div>
        {displayDivs()}
    </div>
)

}

function mapStateToProps(state) {
    return {
        feelings: state.feelingsReducer.feelings
    };
  }
  
  export default connect(
    mapStateToProps,
    { getFeelings }
  )(GenerateList);