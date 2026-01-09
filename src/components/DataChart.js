import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);


const DataChart = ({ labels, values }) => {
  const data = {
    labels,
    datasets: [
      {
        label: 'Bar Graph',
        data: values,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderRadius: 5
      }
    ]
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return <Bar data={data} options={options} />;
};

export default DataChart;
