import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FarmersTab = ({ simulationData }) => {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedFarmSize, setSelectedFarmSize] = useState('all');

  // Mock data for farmers impact analysis
  const incomeProjectionData = [
    { month: 'Jan 2024', baseline: 45000, withTariff: 52000, confidence: 0.92 },
    { month: 'Feb 2024', baseline: 47000, withTariff: 54500, confidence: 0.89 },
    { month: 'Mar 2024', baseline: 48000, withTariff: 56000, confidence: 0.91 },
    { month: 'Apr 2024', baseline: 46000, withTariff: 53500, confidence: 0.88 },
    { month: 'May 2024', baseline: 49000, withTariff: 57200, confidence: 0.90 },
    { month: 'Jun 2024', baseline: 51000, withTariff: 59800, confidence: 0.93 }
  ];

  const cropProfitabilityData = [
    { crop: 'Oil Palm', currentProfit: 28000, projectedProfit: 34500, change: 23.2 },
    { crop: 'Coconut', currentProfit: 22000, projectedProfit: 24800, change: 12.7 },
    { crop: 'Sunflower', currentProfit: 18000, projectedProfit: 21600, change: 20.0 },
    { crop: 'Groundnut', currentProfit: 25000, projectedProfit: 28750, change: 15.0 },
    { crop: 'Mustard', currentProfit: 20000, projectedProfit: 22400, change: 12.0 }
  ];

  const employmentImpactData = [
    { category: 'Direct Employment', current: 125000, projected: 142000, change: 13.6 },
    { category: 'Indirect Employment', current: 89000, projected: 98500, change: 10.7 },
    { category: 'Seasonal Workers', current: 67000, projected: 75200, change: 12.2 },
    { category: 'Processing Units', current: 45000, projected: 51800, change: 15.1 }
  ];

  const farmSizeDistribution = [
    { size: 'Small (< 2 ha)', farmers: 45, impact: 18.5, color: '#1E3A8A' },
    { size: 'Medium (2-10 ha)', farmers: 35, impact: 22.3, color: '#059669' },
    { size: 'Large (> 10 ha)', farmers: 20, impact: 28.7, color: '#F59E0B' }
  ];

  const kpiCards = [
    {
      title: 'Average Income Increase',
      value: '₹16,800',
      change: '+23.2%',
      trend: 'up',
      icon: 'TrendingUp',
      description: 'Monthly farmer income projection'
    },
    {
      title: 'Employment Generation',
      value: '42,500',
      change: '+12.8%',
      trend: 'up',
      icon: 'Users',
      description: 'New jobs in agricultural sector'
    },
    {
      title: 'Crop Profitability',
      value: '₹28,750',
      change: '+18.5%',
      trend: 'up',
      icon: 'Leaf',
      description: 'Average profit per hectare'
    },
    {
      title: 'Farm Productivity',
      value: '3.2 MT/ha',
      change: '+15.6%',
      trend: 'up',
      icon: 'BarChart3',
      description: 'Oil palm yield improvement'
    }
  ];

  const regions = [
    { value: 'all', label: 'All Regions' },
    { value: 'andhra-pradesh', label: 'Andhra Pradesh' },
    { value: 'telangana', label: 'Telangana' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'kerala', label: 'Kerala' },
    { value: 'tamil-nadu', label: 'Tamil Nadu' }
  ];

  const farmSizes = [
    { value: 'all', label: 'All Farm Sizes' },
    { value: 'small', label: 'Small Farms (< 2 ha)' },
    { value: 'medium', label: 'Medium Farms (2-10 ha)' },
    { value: 'large', label: 'Large Farms (> 10 ha)' }
  ];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-border">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground mb-2">
              Select Region
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
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground mb-2">
              Farm Size Category
            </label>
            <select
              value={selectedFarmSize}
              onChange={(e) => setSelectedFarmSize(e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {farmSizes?.map(size => (
                <option key={size?.value} value={size?.value}>
                  {size?.label}
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
              <div className={`p-2 rounded-lg bg-primary/10`}>
                <Icon name={kpi?.icon} size={20} className="text-primary" />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                kpi?.trend === 'up' ? 'text-success' : 'text-error'
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
        {/* Income Projection Chart */}
        <div className="bg-white p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Monthly Income Projection</h3>
            <Button variant="outline" size="sm" iconName="Download">
              Export
            </Button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={incomeProjectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6B7280"
                  fontSize={12}
                  tickFormatter={(value) => `₹${(value / 1000)?.toFixed(0)}K`}
                />
                <Tooltip 
                  formatter={(value, name) => [`₹${value?.toLocaleString()}`, name === 'baseline' ? 'Current Income' : 'Projected Income']}
                  labelStyle={{ color: '#1F2937' }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="baseline" 
                  stroke="#6B7280" 
                  strokeWidth={2}
                  name="Current Income"
                  strokeDasharray="5 5"
                />
                <Line 
                  type="monotone" 
                  dataKey="withTariff" 
                  stroke="#1E3A8A" 
                  strokeWidth={3}
                  name="Projected Income"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Crop Profitability Analysis */}
        <div className="bg-white p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Crop Profitability Analysis</h3>
            <Button variant="outline" size="sm" iconName="Info">
              Details
            </Button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cropProfitabilityData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  type="number"
                  stroke="#6B7280"
                  fontSize={12}
                  tickFormatter={(value) => `₹${(value / 1000)?.toFixed(0)}K`}
                />
                <YAxis 
                  type="category"
                  dataKey="crop" 
                  stroke="#6B7280"
                  fontSize={12}
                  width={80}
                />
                <Tooltip 
                  formatter={(value, name) => [`₹${value?.toLocaleString()}`, name === 'currentProfit' ? 'Current Profit' : 'Projected Profit']}
                  labelStyle={{ color: '#1F2937' }}
                />
                <Legend />
                <Bar 
                  dataKey="currentProfit" 
                  fill="#E5E7EB" 
                  name="Current Profit"
                  radius={[0, 4, 4, 0]}
                />
                <Bar 
                  dataKey="projectedProfit" 
                  fill="#1E3A8A" 
                  name="Projected Profit"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Employment Impact */}
        <div className="bg-white p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Employment Impact Analysis</h3>
            <Button variant="outline" size="sm" iconName="Users">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {employmentImpactData?.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{item?.category}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item?.current?.toLocaleString()} → {item?.projected?.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-success">+{item?.change}%</span>
                  <Icon name="TrendingUp" size={16} className="text-success" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Farm Size Distribution */}
        <div className="bg-white p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Impact by Farm Size</h3>
            <Button variant="outline" size="sm" iconName="PieChart">
              Analyze
            </Button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={farmSizeDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="farmers"
                >
                  {farmSizeDistribution?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name, props) => [
                    `${value}% of farmers`,
                    `Impact: +${props?.payload?.impact}%`
                  ]}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value, entry) => (
                    <span style={{ color: entry?.color }}>
                      {value} ({entry?.payload?.farmers}%)
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Regional Impact Summary */}
      <div className="bg-white p-6 rounded-lg border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Regional Impact Summary</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" iconName="Map">
              View Map
            </Button>
            <Button variant="outline" size="sm" iconName="Download">
              Export Report
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-success/10 rounded-lg border border-success/20">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="MapPin" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">High Impact Regions</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              Andhra Pradesh, Telangana showing 25%+ income increase
            </p>
            <div className="text-lg font-bold text-success">2 States</div>
          </div>
          <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="MapPin" size={16} className="text-warning" />
              <span className="text-sm font-medium text-warning">Moderate Impact</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              Karnataka, Kerala with 15-25% improvement
            </p>
            <div className="text-lg font-bold text-warning">2 States</div>
          </div>
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="MapPin" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Emerging Regions</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">
              Tamil Nadu showing growth potential
            </p>
            <div className="text-lg font-bold text-primary">1 State</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmersTab;