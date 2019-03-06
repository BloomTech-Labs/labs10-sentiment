import React from "react";
import { connect } from 'react-redux'
import { getFeelings } from "../../actions";
import { Emoji } from 'emoji-mart'
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
        let testText = props.feelings[i].feeling_text
        let breakTest = testText.split(" ");
        let result = [];
        for (let i = 0; i < breakTest.length; i++) {
          if (breakTest[i].indexOf(":") === -1) {
            let textP = breakTest[i] + " ";
            result.push(textP);
          } else if (breakTest[i].indexOf(":") > -1) {
            let textE = <Emoji emoji={breakTest[i]} size={24} />;
            result.push(textE);
          }
        }

        divs.push(<div key={i}><p>Feeling: {result} Date: {date.toDateString()}.</p></div>)
    }
    return divs
}
// {props.feelings[i].feeling_text}
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