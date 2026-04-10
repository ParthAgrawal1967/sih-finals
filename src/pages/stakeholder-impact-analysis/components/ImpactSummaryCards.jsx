import React from 'react';
import Icon from '../../../components/AppIcon';

const ImpactSummaryCards = ({ simulationData }) => {
  // Mock data for impact summary
  const impactMetrics = [
    {
      stakeholder: 'Farmers',
      icon: 'Leaf',
      primaryMetric: {
        label: 'Income Increase',
        value: '₹16,800',
        change: '+23.2%',
        trend: 'up'
      },
      secondaryMetrics: [
        { label: 'Employment', value: '+42,500 jobs', positive: true },
        { label: 'Productivity', value: '+15.6%', positive: true },
        { label: 'Crop Profitability', value: '+18.5%', positive: true }
      ],
      riskLevel: 'low',
      confidence: 92
    },
    {
      stakeholder: 'Consumers',
      icon: 'ShoppingCart',
      primaryMetric: {
        label: 'Price Reduction',
        value: '₹12.50/L',
        change: '-13.4%',
        trend: 'down'
      },
      secondaryMetrics: [
        { label: 'Household Savings', value: '₹2,640/year', positive: true },
        { label: 'Price Volatility', value: '-22.8%', positive: true },
        { label: 'Purchasing Power', value: '+5.8%', positive: true }
      ],
      riskLevel: 'low',
      confidence: 89
    },
    {
      stakeholder: 'Government',
      icon: 'Building2',
      primaryMetric: {
        label: 'Revenue Increase',
        value: '₹1,250 Cr',
        change: '+18.5%',
        trend: 'up'
      },
      secondaryMetrics: [
        { label: 'Trade Balance', value: '+₹640 Cr', positive: true },
        { label: 'NMEO-OP Progress', value: '+8.3%', positive: true },
        { label: 'Policy Effectiveness', value: '87.2%', positive: true }
      ],
      riskLevel: 'medium',
      confidence: 85
    }
  ];

  const getRiskColor = (level) => {
    switch (level) {
      case 'low': return 'text-success bg-success/10 border-success/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'high': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-success';
    if (confidence >= 80) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {impactMetrics?.map((metric, index) => (
        <div key={index} className="bg-white p-6 rounded-lg border border-border">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon name={metric?.icon} size={24} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">{metric?.stakeholder}</h3>
                <p className="text-sm text-muted-foreground">Impact Analysis</p>
              </div>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getRiskColor(metric?.riskLevel)}`}>
              {metric?.riskLevel?.charAt(0)?.toUpperCase() + metric?.riskLevel?.slice(1)} Risk
            </div>
          </div>

          {/* Primary Metric */}
          <div className="mb-4 p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">{metric?.primaryMetric?.label}</span>
              <div className={`flex items-center space-x-1 text-sm ${
                metric?.primaryMetric?.trend === 'up' ? 'text-success' : 'text-success'
              }`}>
                <Icon name={metric?.primaryMetric?.trend === 'up' ? 'ArrowUp' : 'ArrowDown'} size={16} />
                <span className="font-medium">{metric?.primaryMetric?.change}</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground">{metric?.primaryMetric?.value}</div>
          </div>

          {/* Secondary Metrics */}
          <div className="space-y-3 mb-4">
            {metric?.secondaryMetrics?.map((secondary, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{secondary?.label}</span>
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-medium ${
                    secondary?.positive ? 'text-success' : 'text-error'
                  }`}>
                    {secondary?.value}
                  </span>
                  <Icon 
                    name={secondary?.positive ? 'TrendingUp' : 'TrendingDown'} 
                    size={14} 
                    className={secondary?.positive ? 'text-success' : 'text-error'}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Confidence Score */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Confidence Score</span>
              <span className={`text-sm font-bold ${getConfidenceColor(metric?.confidence)}`}>
                {metric?.confidence}%
              </span>
            </div>
            <div className="w-full bg-border rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  metric?.confidence >= 90 ? 'bg-success' :
                  metric?.confidence >= 80 ? 'bg-warning' : 'bg-error'
                }`}
                style={{ width: `${metric?.confidence}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Low</span>
              <span>High Confidence</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImpactSummaryCards;