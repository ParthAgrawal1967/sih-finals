import React, { useState } from 'react';
import { Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ConsumersTab = ({ simulationData }) => {
  const [selectedIncomeSegment, setSelectedIncomeSegment] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');

  // Mock data for consumer impact analysis
  const priceVolatilityData = [
    { month: 'Jan 2024', cpoPrice: 85, consumerPrice: 120, volatility: 0.12 },
    { month: 'Feb 2024', cpoPrice: 88, consumerPrice: 125, volatility: 0.15 },
    { month: 'Mar 2024', cpoPrice: 82, consumerPrice: 118, volatility: 0.18 },
    { month: 'Apr 2024', cpoPrice: 90, consumerPrice: 128, volatility: 0.22 },
    { month: 'May 2024', cpoPrice: 87, consumerPrice: 122, volatility: 0.16 },
    { month: 'Jun 2024', cpoPrice: 85, consumerPrice: 119, volatility: 0.14 }
  ];

  const purchasingPowerData = [
    { segment: 'Low Income', currentPower: 100, projectedPower: 108, impact: 8.0 },
    { segment: 'Lower Middle', currentPower: 100, projectedPower: 106, impact: 6.0 },
    { segment: 'Middle Class', currentPower: 100, projectedPower: 104, impact: 4.0 },
    { segment: 'Upper Middle', currentPower: 100, projectedPower: 102, impact: 2.0 },
    { segment: 'High Income', currentPower: 100, projectedPower: 101, impact: 1.0 }
  ];

  const householdBudgetData = [
    { category: 'Cooking Oil', current: 8.5, projected: 7.2, savings: 1.3 },
    { category: 'Food Processing', current: 12.3, projected: 10.8, savings: 1.5 },
    { category: 'Packaged Foods', current: 15.7, projected: 14.1, savings: 1.6 },
    { category: 'Restaurant/Dining', current: 22.4, projected: 20.9, savings: 1.5 },
    { category: 'Snacks & Bakery', current: 9.8, projected: 8.7, savings: 1.1 }
  ];

  const regionalPriceImpact = [
    { region: 'North India', priceReduction: 12.5, households: 45000000, savings: 2400 },
    { region: 'South India', priceReduction: 15.2, households: 38000000, savings: 2850 },
    { region: 'West India', priceReduction: 11.8, households: 42000000, savings: 2200 },
    { region: 'East India', priceReduction: 13.7, households: 35000000, savings: 2600 },
    { region: 'Central India', priceReduction: 14.1, households: 28000000, savings: 2750 }
  ];

  const kpiCards = [
    {
      title: 'Average Price Reduction',
      value: '₹12.50/L',
      change: '-13.4%',
      trend: 'down',
      icon: 'TrendingDown',
      description: 'Cooking oil price decrease',
      positive: true
    },
    {
      title: 'Household Savings',
      value: '₹2,640',
      change: '+18.2%',
      trend: 'up',
      icon: 'PiggyBank',
      description: 'Annual savings per household',
      positive: true
    },
    {
      title: 'Price Volatility',
      value: '14.2%',
      change: '-22.8%',
      trend: 'down',
      icon: 'Activity',
      description: 'Market price stability improvement',
      positive: true
    },
    {
      title: 'Purchasing Power',
      value: '+5.8%',
      change: '+5.8%',
      trend: 'up',
      icon: 'ShoppingCart',
      description: 'Effective purchasing power increase',
      positive: true
    }
  ];

  const incomeSegments = [
    { value: 'all', label: 'All Income Groups' },
    { value: 'low', label: 'Low Income (< ₹25,000)' },
    { value: 'lower-middle', label: 'Lower Middle (₹25K-50K)' },
    { value: 'middle', label: 'Middle Class (₹50K-1L)' },
    { value: 'upper-middle', label: 'Upper Middle (₹1L-2L)' },
    { value: 'high', label: 'High Income (> ₹2L)' }
  ];

  const regions = [
    { value: 'all', label: 'All Regions' },
    { value: 'north', label: 'North India' },
    { value: 'south', label: 'South India' },
    { value: 'west', label: 'West India' },
    { value: 'east', label: 'East India' },
    { value: 'central', label: 'Central India' }
  ];

  // Heatmap data for price volatility
  const heatmapData = [
    { month: 'Jan', week1: 0.12, week2: 0.15, week3: 0.18, week4: 0.14 },
    { month: 'Feb', week1: 0.16, week2: 0.22, week3: 0.19, week4: 0.17 },
    { month: 'Mar', week1: 0.14, week2: 0.18, week3: 0.21, week4: 0.16 },
    { month: 'Apr', week1: 0.13, week2: 0.16, week3: 0.19, week4: 0.15 },
    { month: 'May', week1: 0.11, week2: 0.14, week3: 0.17, week4: 0.13 },
    { month: 'Jun', week1: 0.10, week2: 0.13, week3: 0.15, week4: 0.12 }
  ];

  const getVolatilityColor = (value) => {
    if (value >= 0.20) return '#DC2626'; // High volatility - red
    if (value >= 0.15) return '#F59E0B'; // Medium volatility - amber
    if (value >= 0.10) return '#10B981'; // Low volatility - green
    return '#059669'; // Very low volatility - dark green
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-border">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground mb-2">
              Income Segment
            </label>
            <select
              value={selectedIncomeSegment}
              onChange={(e) => setSelectedIncomeSegment(e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {incomeSegments?.map(segment => (
                <option key={segment?.value} value={segment?.value}>
                  {segment?.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground mb-2">
              Geographic Region
            </label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {regions?.map(region => (
                <option key={region?.value} value={region?.value}>
                  {region?.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards?.map((kpi, index) => (
          <div key={index} className="bg-white p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${kpi?.positive ? 'bg-success/10' : 'bg-error/10'}`}>
                <Icon name={kpi?.icon} size={20} className={kpi?.positive ? 'text-success' : 'text-error'} />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                kpi?.positive ? 'text-success' : 'text-error'
              }`}>
                <Icon name={kpi?.trend === 'up' ? 'ArrowUp' : 'ArrowDown'} size={16} />
                <span className="font-medium">{kpi?.change}</span>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-1">{kpi?.value}</h3>
              <p className="text-sm font-medium text-foreground mb-1">{kpi?.title}</p>
              <p className="text-xs text-muted-foreground">{kpi?.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Price Volatility Trend */}
        <div className="bg-white p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Price Volatility Trend</h3>
            <Button variant="outline" size="sm" iconName="TrendingDown">
              Analyze
            </Button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={priceVolatilityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6B7280"
                  fontSize={12}
                  tickFormatter={(value) => `₹${value}`}
                />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'volatility' ? `${(value * 100)?.toFixed(1)}%` : `₹${value}`,
                    name === 'cpoPrice' ? 'CPO Price' : 
                    name === 'consumerPrice' ? 'Consumer Price' : 'Volatility'
                  ]}
                  labelStyle={{ color: '#1F2937' }}
                />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="consumerPrice" 
                  stackId="1"
                  stroke="#1E3A8A" 
                  fill="#1E3A8A"
                  fillOpacity={0.6}
                  name="Consumer Price"
                />
                <Area 
                  type="monotone" 
                  dataKey="cpoPrice" 
                  stackId="2"
                  stroke="#059669" 
                  fill="#059669"
                  fillOpacity={0.6}
                  name="CPO Price"
                />
                <Line 
                  type="monotone" 
                  dataKey="volatility" 
                  stroke="#DC2626" 
                  strokeWidth={2}
                  name="Volatility"
                  yAxisId="right"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Purchasing Power Impact */}
        <div className="bg-white p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Purchasing Power by Income Segment</h3>
            <Button variant="outline" size="sm" iconName="Users">
              Segments
            </Button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={purchasingPowerData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="segment" 
                  stroke="#6B7280"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  stroke="#6B7280"
                  fontSize={12}
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value}%`,
                    name === 'currentPower' ? 'Current Power' : 'Projected Power'
                  ]}
                  labelStyle={{ color: '#1F2937' }}
                />
                <Legend />
                <Bar 
                  dataKey="currentPower" 
                  fill="#E5E7EB" 
                  name="Current Power"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="projectedPower" 
                  fill="#059669" 
                  name="Projected Power"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Household Budget Impact */}
        <div className="bg-white p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Household Budget Impact</h3>
            <Button variant="outline" size="sm" iconName="PieChart">
              Breakdown
            </Button>
          </div>
          <div className="space-y-4">
            {householdBudgetData?.map((item, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground">{item?.category}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {item?.current}% → {item?.projected}%
                    </span>
                    <span className="text-sm font-medium text-success">
                      -₹{(item?.savings * 1000)?.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div 
                    className="bg-success h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(item?.savings / item?.current) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {((item?.savings / item?.current) * 100)?.toFixed(1)}% reduction in spending
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Price Volatility Heatmap */}
        <div className="bg-white p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Weekly Price Volatility Heatmap</h3>
            <Button variant="outline" size="sm" iconName="Calendar">
              View Calendar
            </Button>
          </div>
          <div className="space-y-2">
            <div className="grid grid-cols-5 gap-2 text-xs font-medium text-muted-foreground">
              <div>Month</div>
              <div>Week 1</div>
              <div>Week 2</div>
              <div>Week 3</div>
              <div>Week 4</div>
            </div>
            {heatmapData?.map((row, index) => (
              <div key={index} className="grid grid-cols-5 gap-2">
                <div className="text-sm font-medium text-foreground py-2">
                  {row?.month}
                </div>
                {[row?.week1, row?.week2, row?.week3, row?.week4]?.map((value, weekIndex) => (
                  <div
                    key={weekIndex}
                    className="h-8 rounded flex items-center justify-center text-xs font-medium text-white"
                    style={{ backgroundColor: getVolatilityColor(value) }}
                  >
                    {(value * 100)?.toFixed(0)}%
                  </div>
                ))}
              </div>
            ))}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <span className="text-xs text-muted-foreground">Volatility Scale:</span>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: '#059669' }}></div>
                  <span className="text-xs">Low</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: '#10B981' }}></div>
                  <span className="text-xs">Medium</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: '#F59E0B' }}></div>
                  <span className="text-xs">High</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: '#DC2626' }}></div>
                  <span className="text-xs">Critical</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Regional Impact Summary */}
      <div className="bg-white p-6 rounded-lg border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Regional Price Impact Analysis</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" iconName="Map">
              View Map
            </Button>
            <Button variant="outline" size="sm" iconName="Download">
              Export Data
            </Button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-foreground">Region</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Price Reduction</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Households Affected</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Annual Savings</th>
                <th className="text-left py-3 px-4 font-medium text-foreground">Impact Level</th>
              </tr>
            </thead>
            <tbody>
              {regionalPriceImpact?.map((region, index) => (
                <tr key={index} className="border-b border-border hover:bg-muted/50">
                  <td className="py-3 px-4 font-medium text-foreground">{region?.region}</td>
                  <td className="py-3 px-4">
                    <span className="text-success font-medium">-{region?.priceReduction}%</span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">
                    {(region?.households / 1000000)?.toFixed(1)}M
                  </td>
                  <td className="py-3 px-4 font-medium text-foreground">
                    ₹{region?.savings?.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      region?.priceReduction >= 15 ? 'bg-success/10 text-success' :
                      region?.priceReduction >= 12 ? 'bg-warning/10 text-warning': 'bg-primary/10 text-primary'
                    }`}>
                      {region?.priceReduction >= 15 ? 'High' :
                       region?.priceReduction >= 12 ? 'Medium' : 'Moderate'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ConsumersTab;