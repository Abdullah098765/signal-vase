import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const SignalsPieChart = ({ goodCount, badCount, neutralCount }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    // Check if the chart already exists, and destroy it
    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    // Create a new chart
    chartRef.current.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Good Signals', 'Bad Signals', 'Neutral Signals'],
        datasets: [
          {
            data: [goodCount, badCount, neutralCount],
            backgroundColor: ['#90EE90', '#ffcccb', '#ADD8E6'], // Colors for the segments
          },
        ],
      },
    });
  }, [goodCount, badCount, neutralCount]);


  return (
    <div className="signals-pie-chart">
      <canvas ref={chartRef} />
    </div>
  );
};

export default SignalsPieChart;
