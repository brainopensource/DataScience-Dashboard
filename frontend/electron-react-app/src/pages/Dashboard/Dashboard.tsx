import React, { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist';

const Dashboard: React.FC = () => {
  const sinPlotRef = useRef<HTMLDivElement>(null);
  const cosPlotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sinPlotRef.current && cosPlotRef.current) {
      const x = Array.from({length: 100}, (_, i) => i * 0.1);
      const sinY = x.map(val => Math.sin(val));
      const cosY = x.map(val => Math.cos(val));

      Plotly.newPlot(sinPlotRef.current, [{
        x: x,
        y: sinY,
        type: 'scatter',
        mode: 'lines',
        name: 'Sin Wave',
        line: {color: 'white'}
      }], {
        title: 'Sin Wave',
        plot_bgcolor: 'black',
        paper_bgcolor: 'black',
        font: {color: 'white'}
      });

      Plotly.newPlot(cosPlotRef.current, [{
        x: x,
        y: cosY,
        type: 'scatter',
        mode: 'lines',
        name: 'Cos Wave',
        line: {color: 'white'}
      }], {
        title: 'Cos Wave',
        plot_bgcolor: 'black',
        paper_bgcolor: 'black',
        font: {color: 'white'}
      });
    }
  }, []);

  return (
    <div className="dashboard-page">
      <h2>Dashboard</h2>
      <div className="plot-container">
        <div ref={sinPlotRef} style={{width: '100%', height: '300px'}}></div>
        <div ref={cosPlotRef} style={{width: '100%', height: '300px'}}></div>
      </div>
    </div>
  );
};

export default Dashboard; 