import React from "react";
import { connect } from 'react-redux';
import { fetchSingleSurvey } from '../../actions/index';
import { Pie } from "react-chartjs-2";

// MVP use pie chart to show average feelings over the last 7 days.

class PieChart extends React.Component {

  async componentDidMount() {
    await this.props.fetchSingleSurvey(1)
  }

  

  render() {

    const data = {
      labels: ["Happy", "Great", "Sad", "Ok", "Fine"],
      datasets: [
        {
          data: [10, 50, 100],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        }
      ]
    };

    return (
      <div className="pie-chart">
        <h2>Summary of Survey Response</h2>
        <Pie
          data={data}
          width={50}
          height={50}
          options={{
            maintainAspectRatio: false
          }}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    singleSurvey: state.surveyReducer.singleSurvey
  }
}

export default connect(mapStateToProps, { fetchSingleSurvey })(PieChart);
