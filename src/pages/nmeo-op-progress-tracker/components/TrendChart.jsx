import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

const TrendChart = ({ trendData, chartType = 'line' }) => {
  const formatTooltip = (value, name) => {
    if (name === 'importDependency') return [`${value}%`, 'Import Dependency'];
    if (name === 'domesticProduction') return [`${value} MT`, 'Domestic Production'];
    if (name === 'palmArea') return [`${value} Lakh Ha`, 'Oil Palm Area'];
    return [value, name];
  };

  const formatYAxis = (value) => `${value}%`;

  if (chartType === 'area') {
    return (
      <div className="bg-white rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Import Dependency Trend</h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full" />
              <span className="text-muted-foreground">Historical</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full" />
              <span className="text-muted-foreground">Projected</span>
            </div>
          </div>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="year" 
                stroke="#6B7280"
                fontSize={12}
              />
              <YAxis 
                tickFormatter={formatYAxis}
                stroke="#6B7280"
                fontSize={12}
              />
              <Tooltip 
                formatter={formatTooltip}
                labelStyle={{ color: '#1F2937' }}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px'
                }}
              />
              <Area
                type="monotone"
                dataKey="importDependency"
                stroke="#1E3A8A"
                fill="#1E3A8A"
                fillOpacity={0.1}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Multi-Metric Progress Tracking</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full" />
            <span className="text-muted-foreground">Import Dependency</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full" />
            <span className="text-muted-foreground">Domestic Production</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full" />
            <span className="text-muted-foreground">Palm Area</span>
          </div>
        </div>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="year" 
              stroke="#6B7280"
              fontSize={12}
            />
            <YAxis 
              yAxisId="left"
              tickFormatter={formatYAxis}
              stroke="#6B7280"
              fontSize={12}
            />
            <YAxis 
              yAxisId="right"
              orientation="right"
              stroke="#6B7280"
              fontSize={12}
            />
            <Tooltip 
              formatter={formatTooltip}
              labelStyle={{ color: '#1F2937' }}
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #E5E7EB',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="importDependency"
              stroke="#DC2626"
              strokeWidth={3}
              dot={{ fill: '#DC2626', strokeWidth: 2, r: 4 }}
              name="Import Dependency (%)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="domesticProduction"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 3 }}
              name="Domestic Production (MT)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="palmArea"
              stroke="#F59E0B"
              strokeWidth={2}
              dot={{ fill: '#F59E0B', strokeWidth: 2, r: 3 }}
              name="Oil Palm Area (Lakh Ha)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TrendChart;