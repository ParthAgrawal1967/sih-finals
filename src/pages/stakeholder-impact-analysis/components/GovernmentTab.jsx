import React, { useState } from 'react';
import { BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Area } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GovernmentTab = ({ simulationData }) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('annual');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  // Mock data for government impact analysis
  const revenueProjectionData = [
    { period: 'Q1 2024', tariffRevenue: 2850, customsDuty: 1200, totalRevenue: 4050, deficit: -850 },
    { period: 'Q2 2024', tariffRevenue: 3200, customsDuty: 1350, totalRevenue: 4550, deficit: -650 },
    { period: 'Q3 2024', tariffRevenue: 3600, customsDuty: 1500, totalRevenue: 5100, deficit: -400 },
    { period: 'Q4 2024', tariffRevenue: 3950, customsDuty: 1650, totalRevenue: 5600, deficit: -200 },
    { period: 'Q1 2025', tariffRevenue: 4200, customsDuty: 1750, totalRevenue: 5950, deficit: 50 },
    { period: 'Q2 2025', tariffRevenue: 4500, customsDuty: 1850, totalRevenue: 6350, deficit: 250 }
  ];

  const tradeBalanceData = [
    { month: 'Jan 2024', imports: 1250, exports: 890, balance: -360, cumulativeBalance: -360 },
    { month: 'Feb 2024', imports: 1180, exports: 920, balance: -260, cumulativeBalance: -620 },
    { month: 'Mar 2024', imports: 1100, exports: 950, balance: -150, cumulativeBalance: -770 },
    { month: 'Apr 2024', imports: 1050, exports: 980, balance: -70, cumulativeBalance: -840 },
    { month: 'May 2024', imports: 980, exports: 1020, balance: 40, cumulativeBalance: -800 },
    { month: 'Jun 2024', imports: 920, exports: 1080, balance: 160, cumulativeBalance: -640 }
  ];

  const nmeoProgressData = [
    { indicator: 'Oil Palm Area', target: 1000000, current: 570000, progress: 57, unit: 'hectares' },
    { indicator: 'Import Dependency', target: 45, current: 57, progress: 68, unit: '%', inverse: true },
    { indicator: 'Domestic Production', target: 2500000, current: 1425000, progress: 57, unit: 'MT' },
    { indicator: 'Processing Capacity', target: 3000000, current: 1950000, progress: 65, unit: 'MT' },
    { indicator: 'Farmer Income', target: 75000, current: 52000, progress: 69, unit: '₹/year' },
    { indicator: 'Employment Generation', target: 500000, current: 285000, progress: 57, unit: 'jobs' }
  ];

  const fiscalImpactData = [
    { category: 'Direct Tax Revenue', baseline: 2850, projected: 3420, change: 570, percentage: 20.0 },
    { category: 'Indirect Tax Revenue', baseline: 1200, projected: 1380, change: 180, percentage: 15.0 },
    { category: 'Subsidy Reduction', baseline: -800, projected: -650, change: 150, percentage: 18.8 },
    { category: 'Administrative Costs', baseline: -150, projected: -180, change: -30, percentage: -20.0 },
    { category: 'Infrastructure Investment', baseline: -500, projected: -600, change: -100, percentage: -20.0 }
  ];

  const kpiCards = [
    {
      title: 'Revenue Increase',
      value: '₹1,250 Cr',
      change: '+18.5%',
      trend: 'up',
      icon: 'TrendingUp',
      description: 'Annual tariff revenue projection'
    },
    {
      title: 'Trade Balance',
      value: '₹640 Cr',
      change: '+45.2%',
      trend: 'up',
      icon: 'Scale',
      description: 'Improvement in trade deficit'
    },
    {
      title: 'NMEO-OP Progress',
      value: '62.5%',
      change: '+8.3%',
      trend: 'up',
      icon: 'Target',
      description: 'Mission objective completion'
    },
    {
      title: 'Policy Effectiveness',
      value: '87.2%',
      change: '+12.1%',
      trend: 'up',
      icon: 'Award',
      description: 'Overall policy success rate'
    }
  ];

  const timeframes = [
    { value: 'quarterly', label: 'Quarterly Analysis' },
    { value: 'annual', label: 'Annual Projections' },
    { value: 'long-term', label: 'Long-term Impact (5Y)' }
  ];

  const metrics = [
    { value: 'revenue', label: 'Revenue Impact' },
    { value: 'trade', label: 'Trade Balance' },
    { value: 'nmeo', label: 'NMEO-OP Progress' },
    { value: 'fiscal', label: 'Fiscal Impact' }
  ];

  const policyCompliance = [
    { area: 'WTO Compliance', status: 'Compliant', score: 95, description: 'Meets international trade obligations' },
    { area: 'Domestic Policy Alignment', status: 'Aligned', score: 88, description: 'Supports national agricultural policy' },
    { area: 'Environmental Standards', status: 'Compliant', score: 92, description: 'Meets sustainability requirements' },
    { area: 'Stakeholder Consultation', status: 'Complete', score: 85, description: 'All stakeholders consulted' },
    { area: 'Impact Assessment', status: 'Approved', score: 90, description: 'Comprehensive impact analysis done' }
  ];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white p-4 rounded-lg border border-border">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground mb-2">
              Analysis Timeframe
            </label>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {timeframes?.map(timeframe => (
                <option key={timeframe?.value} value={timeframe?.value}>
                  {timeframe?.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-foreground mb-2">
              Primary Metric
            </label>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e?.target?.value)}
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              {metrics?.map(metric => (
                <option key={metric?.value} value={metric?.value}>
                  {metric?.label}
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
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon name={kpi?.icon} size={20} className="text-primary" />
              </div>
              <div className="flex items-center space-x-1 text-sm text-success">
                <Icon name="ArrowUp" size={16} />
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
        {/* Revenue Projection */}
        <div className="bg-white p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Government Revenue Projection</h3>
            <Button variant="outline" size="sm" iconName="TrendingUp">
              Forecast
            </Button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={revenueProjectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="period" 
                  stroke="#6B7280"
                  fontSize={12}
                />
                <YAxis 
                  stroke="#6B7280"
                  fontSize={12}
                  tickFormatter={(value) => `₹${(value / 100)?.toFixed(0)}K Cr`}
                />
                <Tooltip 
                  formatter={(value, name) => [
                    `₹${value} Crores`,
                    name === 'tariffRevenue' ? 'Tariff Revenue' :
                    name === 'customsDuty' ? 'Customs Duty' :
                    name === 'totalRevenue' ? 'Total Revenue' : 'Fiscal Deficit'
                  ]}
                  labelStyle={{ color: '#1F2937' }}
                />
                <Legend />
                <Bar 
                  dataKey="tariffRevenue" 
                  fill="#1E3A8A" 
                  name="Tariff Revenue"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="customsDuty" 
                  fill="#059669" 
                  name="Customs Duty"
                  radius={[4, 4, 0, 0]}
                />
                <Line 
                  type="monotone" 
                  dataKey="deficit" 
                  stroke="#DC2626" 
                  strokeWidth={3}
                  name="Fiscal Balance"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trade Balance Analysis */}
        <div className="bg-white p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Trade Balance Impact</h3>
            <Button variant="outline" size="sm" iconName="Scale">
              Balance Sheet
            </Button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={tradeBalanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="month" 
                  stroke="#6B7280"
                  fontSize={12}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  stroke="#6B7280"
                  fontSize={12}
                  tickFormatter={(value) => `$${value}M`}
                />
                <Tooltip 
                  formatter={(value, name) => [
                    `$${value}M`,
                    name === 'imports' ? 'Imports' :
                    name === 'exports' ? 'Exports' :
                    name === 'balance' ? 'Monthly Balance' : 'Cumulative Balance'
                  ]}
                  labelStyle={{ color: '#1F2937' }}
                />
                <Legend />
                <Bar 
                  dataKey="imports" 
                  fill="#DC2626" 
                  name="Imports"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="exports" 
                  fill="#059669" 
                  name="Exports"
                  radius={[4, 4, 0, 0]}
                />
                <Line 
                  type="monotone" 
                  dataKey="cumulativeBalance" 
                  stroke="#1E3A8A" 
                  strokeWidth={3}
                  name="Cumulative Balance"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* NMEO-OP Progress Tracker */}
        <div className="bg-white p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">NMEO-OP Mission Progress</h3>
            <Button variant="outline" size="sm" iconName="Target">
              Mission Details
            </Button>
          </div>
          <div className="space-y-4">
            {nmeoProgressData?.map((item, index) => (
              <div key={index} className="p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-foreground">{item?.indicator}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {item?.current?.toLocaleString()} / {item?.target?.toLocaleString()} {item?.unit}
                    </span>
                    <span className={`text-sm font-medium ${
                      item?.progress >= 70 ? 'text-success' :
                      item?.progress >= 50 ? 'text-warning' : 'text-error'
                    }`}>
                      {item?.progress}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-border rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-300 ${
                      item?.progress >= 70 ? 'bg-success' :
                      item?.progress >= 50 ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${item?.progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0</span>
                  <span>Target: {item?.target?.toLocaleString()} {item?.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fiscal Impact Analysis */}
        <div className="bg-white p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Fiscal Impact Breakdown</h3>
            <Button variant="outline" size="sm" iconName="Calculator">
              Calculate
            </Button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fiscalImpactData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  type="number"
                  stroke="#6B7280"
                  fontSize={12}
                  tickFormatter={(value) => `₹${value} Cr`}
                />
                <YAxis 
                  type="category"
                  dataKey="category" 
                  stroke="#6B7280"
                  fontSize={12}
                  width={120}
                />
                <Tooltip 
                  formatter={(value, name) => [
                    `₹${value} Crores`,
                    name === 'baseline' ? 'Baseline' : 'Projected'
                  ]}
                  labelStyle={{ color: '#1F2937' }}
                />
                <Legend />
                <Bar 
                  dataKey="baseline" 
                  fill="#E5E7EB" 
                  name="Baseline"
                  radius={[0, 4, 4, 0]}
                />
                <Bar 
                  dataKey="projected" 
                  fill="#1E3A8A" 
                  name="Projected"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Policy Compliance Dashboard */}
      <div className="bg-white p-6 rounded-lg border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Policy Compliance & Regulatory Status</h3>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" iconName="FileCheck">
              Compliance Report
            </Button>
            <Button variant="outline" size="sm" iconName="Download">
              Export Status
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {policyCompliance?.map((item, index) => (
            <div key={index} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-foreground">{item?.area}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item?.status === 'Compliant' || item?.status === 'Aligned' || item?.status === 'Complete' || item?.status === 'Approved'
                    ? 'bg-success/10 text-success' :'bg-warning/10 text-warning'
                }`}>
                  {item?.status}
                </span>
              </div>
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">Compliance Score</span>
                  <span className="text-sm font-medium text-foreground">{item?.score}%</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      item?.score >= 90 ? 'bg-success' :
                      item?.score >= 80 ? 'bg-warning' : 'bg-error'
                    }`}
                    style={{ width: `${item?.score}%` }}
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{item?.description}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Strategic Recommendations */}
      <div className="bg-white p-6 rounded-lg border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Strategic Policy Recommendations</h3>
          <Button variant="outline" size="sm" iconName="Lightbulb">
            AI Insights
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
                <div>
                  <h4 className="font-medium text-success mb-1">Immediate Actions</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Implement graduated tariff structure over 6 months</li>
                    <li>• Establish monitoring framework for price volatility</li>
                    <li>• Launch farmer support programs in high-impact regions</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
                <div>
                  <h4 className="font-medium text-warning mb-1">Risk Mitigation</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Monitor international CPO price fluctuations</li>
                    <li>• Prepare contingency measures for supply disruptions</li>
                    <li>• Establish stakeholder communication protocols</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="Target" size={20} className="text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-primary mb-1">Long-term Strategy</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Accelerate NMEO-OP implementation timeline</li>
                    <li>• Develop strategic petroleum reserves for palm oil</li>
                    <li>• Strengthen bilateral trade agreements</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="p-4 bg-muted border border-border rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="TrendingUp" size={20} className="text-muted-foreground mt-0.5" />
                <div>
                  <h4 className="font-medium text-foreground mb-1">Performance Metrics</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Track monthly import dependency ratios</li>
                    <li>• Monitor farmer income improvement indices</li>
                    <li>• Measure consumer price stability indicators</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GovernmentTab;