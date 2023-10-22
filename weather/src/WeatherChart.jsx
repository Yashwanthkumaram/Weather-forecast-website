import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const WeatherChart = ({ chartData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    chartRef.current.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: chartData.labels,
        datasets: [
          {
            label: 'Temperature (°C)',
            data: chartData.temperature,
            fill: false,
            borderColor: 'rgba(75,192,192,1)',
          },
          {
            label: 'Humidity (%)',
            data: chartData.humidity,
            fill: false,
            borderColor: 'rgba(255,99,132,1)',
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Days',
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Value',
            },
          },
        },
      },
    });
  }, [chartData]);

  return <canvas ref={chartRef} />;
};

export default WeatherChart;
