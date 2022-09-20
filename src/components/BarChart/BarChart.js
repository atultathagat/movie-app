import React from 'react';
import { Bar } from "react-chartjs-2";
import Chart from 'chart.js/auto';

const  BarChart  = ({searchStats}) => {
  return (
      <div style={{ maxWidth: "650px" }}>
        <Bar
          data={{
            labels: Object.keys(searchStats),
            datasets: [
              {
                label: "Clicked",
                  data: Object.keys(searchStats).map(searchTerm =>  searchStats[searchTerm].Clicked),
                  backgroundColor:  "yellow",
                  borderWidth: 0.5,
                },
                {
                  label: "Searched",
                    data: Object.keys(searchStats).map(searchTerm => searchStats[searchTerm].Searched),
                    backgroundColor:  "Red",
                    borderWidth: 0.5,
                  },
            ],
          }}
          height={400}
          options={{
            maintainAspectRatio: false,
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true,
                  },
                },
              ],
            },
            legend: {
              labels: {
                fontSize: 15,
              },
            },
          }}
        />
      </div>
   );
  }

export default BarChart;