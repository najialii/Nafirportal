import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const Chart = ({ chartType, data, width = "100%", height = 200, barSize='22' }) => {
  return (
    <ResponsiveContainer width={width} height={height}>
      {chartType === "line" ? (
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis hide />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#008000" />
        </LineChart>
      ) : (
        <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="name"
              tick={{ fontSize: 12, fill: "#ffff" }} 
              axisLine={{ stroke: "#fff" }} 
              tickLine={false} 
          />
          <YAxis 
                        // tick={{ fontSize: 12, fill: "#fff" }} 
                        // axisLine={{ stroke: "#fff" }} 
                        tickFormatter={(value) => `${value}`} 
           />
          <Tooltip />
          <Bar dataKey="value" fill="#dddddd" barSize={20} radius={[10, 10, 0, 0]} />
        </BarChart>
      )}
    </ResponsiveContainer>
  );
};

export default Chart;
