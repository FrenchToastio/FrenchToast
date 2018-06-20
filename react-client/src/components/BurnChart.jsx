import React from "react";
import C3Chart from 'react-c3js';

const chartData = {
  Down: {
    tickets: [60, 65, 58, 50, 47, 40, 35, 28, 24, 20, 15, 9, 7, 2, 0]
  },
  Up: {
    scope: [60, 65, 63, 64, 60, 63, 65, 65, 65, 65, 64, 65, 65, 65],
    completed: [0, 4, 8, 15, 19, 24, 30, 33, 39, 44, 50, 57, 62, 65]
  }
};

const BurnChart = ({ type }) => (
	<div>
		<span>Burn {type}</span>
    <C3Chart data={{ json: chartData[type] }} />
  </div>
)

export default BurnChart;


