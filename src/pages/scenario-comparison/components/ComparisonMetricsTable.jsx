import React from 'react';
import Icon from '../../../components/AppIcon';

const ComparisonMetricsTable = ({ 
  scenario1, 
  scenario2, 
  className = "" 
}) => {
  const metrics = [
    {
      label: 'Import Volume Change',
      scenario1Value: scenario1?.importVolumeChange || 0,
      scenario2Value: scenario2?.importVolumeChange || 0,
      unit: '%',
      icon: 'TrendingDown',
      format: (value) => `${value > 0 ? '+' : ''}${value?.toFixed(1)}%`
    },
    {
      label: 'Farmer Income Impact',
      scenario1Value: scenario1?.farmerIncomeChange || 0,
      scenario2Value: scenario2?.farmerIncomeChange || 0,
      unit: '%',
      icon: 'Users',
      format: (value) => `${value > 0 ? '+' : ''}${value?.toFixed(1)}%`
    },
    {
      label: 'Consumer Price Change',
      scenario1Value: scenario1?.consumerPriceChange || 0,
      scenario2Value: scenario2?.consumerPriceChange || 0,
      unit: '%',
      icon: 'ShoppingCart',
      format: (value) => `${value > 0 ? '+' : ''}${value?.toFixed(1)}%`
    },
    {
      label: 'GDP Impact',
      scenario1Value: scenario1?.gdpImpact || 0,
      scenario2Value: scenario2?.gdpImpact || 0,
      unit: '%',
      icon: 'BarChart3',
      format: (value) => `${value > 0 ? '+' : ''}${value?.toFixed(2)}%`
    },
    {
      label: 'Prediction Confidence',
      scenario1Value: scenario1?.confidence || 0,
      scenario2Value: scenario2?.confidence || 0,
      unit: '%',
      icon: 'Target',
      format: (value) => `${value?.toFixed(1)}%`
    },
    {
      label: 'Market Risk Level',
      scenario1Value: scenario1?.riskLevel || 0,
      scenario2Value: scenario2?.riskLevel || 0,
      unit: '',
      icon: 'AlertTriangle',
      format: (value) => {
        if (value < 0.3) return 'Low';
        if (value < 0.7) return 'Medium';
        return 'High';
      }
    }
  ];

  const getDifferenceColor = (diff) => {
    if (Math.abs(diff) < 0.1) return 'text-muted-foreground';
    return diff > 0 ? 'text-success' : 'text-error';
  };

  const getDifferenceIcon = (diff) => {
    if (Math.abs(diff) < 0.1) return 'Minus';
    return diff > 0 ? 'TrendingUp' : 'TrendingDown';
  };

  return (
    <div className={`bg-white rounded-lg border border-border overflow-hidden ${className}`}>
      <div className="px-6 py-4 border-b border-border bg-muted/50">
        <div className="flex items-center space-x-2">
          <Icon name="GitCompare" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Comparison Metrics</h3>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Metric
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {scenario1?.name || 'Scenario 1'}
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {scenario2?.name || 'Scenario 2'}
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Difference
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {metrics?.map((metric, index) => {
              const difference = metric?.scenario2Value - metric?.scenario1Value;
              return (
                <tr key={index} className="hover:bg-muted/20 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <Icon name={metric?.icon} size={16} className="text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">{metric?.label}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-sm text-foreground font-medium">
                      {metric?.format(metric?.scenario1Value)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="text-sm text-foreground font-medium">
                      {metric?.format(metric?.scenario2Value)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-1">
                      <Icon 
                        name={getDifferenceIcon(difference)} 
                        size={14} 
                        className={getDifferenceColor(difference)}
                      />
                      <span className={`text-sm font-medium ${getDifferenceColor(difference)}`}>
                        {metric?.unit === '' 
                          ? Math.abs(difference) < 0.1 ? 'Same' : metric?.format(Math.abs(difference))
                          : `${Math.abs(difference)?.toFixed(1)}${metric?.unit}`
                        }
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="px-6 py-4 bg-muted/20 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Info" size={16} />
          <span>
            Confidence intervals and risk assessments based on ensemble ML model predictions
          </span>
        </div>
      </div>
    </div>
  );
};

export default ComparisonMetricsTable;