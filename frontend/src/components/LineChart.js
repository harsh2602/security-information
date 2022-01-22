// eslint-disable-next-line no-unused-vars
import Chart from 'chart.js/auto';
import React, { memo, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = memo(({ startDate, endDate }) => {
  const GRAPH_DATA_ENDPOINT = `http://localhost:3000/aggregate?from=${startDate}&to=${endDate}`;

  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (startDate && endDate) {
      fetch(GRAPH_DATA_ENDPOINT)
        .then((res) => res.json())
        .then((data) => {
          setLabels(Object.keys(data));
          setData(Object.values(data));
        });
    }
  }, [startDate, endDate, GRAPH_DATA_ENDPOINT]);

  const lineData = {
    labels: labels,
    datasets: [
      {
        label: 'Aggregate Information Graph',
        data,
      },
    ],
  };

  return <Line data={lineData} />;
});

export default LineChart;
