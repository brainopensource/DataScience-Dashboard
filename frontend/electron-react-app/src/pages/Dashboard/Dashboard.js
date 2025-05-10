import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import Plotly from 'plotly.js-dist-min';
const Dashboard = () => {
    const sinPlotRef = useRef(null);
    const cosPlotRef = useRef(null);
    useEffect(() => {
        if (sinPlotRef.current && cosPlotRef.current) {
            const x = Array.from({ length: 100 }, (_, i) => i * 0.1);
            const sinY = x.map(val => Math.sin(val));
            const cosY = x.map(val => Math.cos(val));
            Plotly.newPlot(sinPlotRef.current, [{
                    x: x,
                    y: sinY,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Sin Wave',
                    line: { color: 'white' }
                }], {
                title: 'Sin Wave',
                plot_bgcolor: 'black',
                paper_bgcolor: 'black',
                font: { color: 'white' }
            });
            Plotly.newPlot(cosPlotRef.current, [{
                    x: x,
                    y: cosY,
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Cos Wave',
                    line: { color: 'white' }
                }], {
                title: 'Cos Wave',
                plot_bgcolor: 'black',
                paper_bgcolor: 'black',
                font: { color: 'white' }
            });
        }
    }, []);
    return (_jsxs("div", { className: "dashboard-page", children: [_jsx("h2", { children: "Dashboard" }), _jsxs("div", { className: "plot-container", children: [_jsx("div", { ref: sinPlotRef, style: { width: '100%', height: '300px' } }), _jsx("div", { ref: cosPlotRef, style: { width: '100%', height: '300px' } })] })] }));
};
export default Dashboard;
