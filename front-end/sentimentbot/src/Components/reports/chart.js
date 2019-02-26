import React from "react";
import { connect } from 'react-redux';
import { getSingleSurveys, getSurveyFeelings } from '../../actions/index';
import { Pie } from "react-chartjs-2";

const data = {
  labels: ["Red", "Green", "Yellow"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
    }
  ]
};

// MVP use pie chart to show average feelings over the last 7 days.

class PieChart extends React.Component {
  render() {
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

export default PieChart;
