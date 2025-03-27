"use client";

import React from 'react';
import {
  AreaChart as RechartsAreaChart,
  Area as RechartsArea,
  BarChart as RechartsBarChart,
  Bar as RechartsBar,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  CartesianGrid as RechartsCartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer as RechartsResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie as RechartsPie,
  Cell as RechartsCell,
  Legend as RechartsLegend,
  Line as RechartsLine,
  ComposedChart as RechartsComposedChart,
  LineChart as RechartsLineChart
} from 'recharts';

// Re-export components
export const AreaChart = RechartsAreaChart;
export const Area = RechartsArea;
export const BarChart = RechartsBarChart;
export const Bar = RechartsBar;
export const XAxis = RechartsXAxis;
export const YAxis = RechartsYAxis;
export const CartesianGrid = RechartsCartesianGrid;
export const Tooltip = RechartsTooltip;
export const ResponsiveContainer = RechartsResponsiveContainer;
export const PieChart = RechartsPieChart;
export const Pie = RechartsPie;
export const Cell = RechartsCell;
export const Legend = RechartsLegend;
export const Line = RechartsLine;
export const ComposedChart = RechartsComposedChart;
export const LineChart = RechartsLineChart;

// Create a simple chart component for demonstration
export const SimpleAreaChart = ({ data, dataKey, height = 300 }) => {
  return (
    <div style={{ width: '100%', height }}>
      <RechartsResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <RechartsCartesianGrid strokeDasharray="3 3" />
          <RechartsXAxis dataKey="name" />
          <RechartsYAxis />
          <RechartsTooltip />
          <RechartsArea type="monotone" dataKey={dataKey} stroke="#8884d8" fill="#8884d8" />
        </RechartsAreaChart>
      </RechartsResponsiveContainer>
    </div>
  );
};

export const SimpleBarChart = ({ data, dataKey, height = 300 }) => {
  return (
    <div style={{ width: '100%', height }}>
      <RechartsResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <RechartsCartesianGrid strokeDasharray="3 3" />
          <RechartsXAxis dataKey="name" />
          <RechartsYAxis />
          <RechartsTooltip />
          <RechartsBar dataKey={dataKey} fill="#82ca9d" />
        </RechartsBarChart>
      </RechartsResponsiveContainer>
    </div>
  );
};

export const SimplePieChart = ({ data, dataKey, nameKey, height = 300 }) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
  
  return (
    <div style={{ width: '100%', height }}>
      <RechartsResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <RechartsPie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey={dataKey}
            nameKey={nameKey}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <RechartsCell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </RechartsPie>
          <RechartsLegend />
        </RechartsPieChart>
      </RechartsResponsiveContainer>
    </div>
  );
};

export const SimpleLineChart = ({ data, dataKey, height = 300 }) => {
  return (
    <div style={{ width: '100%', height }}>
      <RechartsResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <RechartsCartesianGrid strokeDasharray="3 3" />
          <RechartsXAxis dataKey="name" />
          <RechartsYAxis />
          <RechartsTooltip />
          <RechartsLine type="monotone" dataKey={dataKey} stroke="#8884d8" />
        </RechartsLineChart>
      </RechartsResponsiveContainer>
    </div>
  );
};