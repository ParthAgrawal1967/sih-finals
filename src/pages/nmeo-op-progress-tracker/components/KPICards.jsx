import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICards = ({ kpiData }) => {
  const formatValue = (value, type) => {
    switch (type) {
      case 'percentage':
        return `${value}%`;
      case 'area':
        return `${value} Lakh Ha`;
      case 'production':
        return `${value} MT`;
      case 'farmers':
        return `${value?.toLocaleString('en-IN')}`;
      case 'currency':
        return `₹${value?.toLocaleString('en-IN')} Cr`;
      default:
        return value;
    }
  };

  const getChangeIcon = (change) => {
    if (change > 0) return { icon: 'TrendingUp', color: 'text-success' };
    if (change < 0) return { icon: 'TrendingDown', color: 'text-error' };
    return { icon: 'Minus', color: 'text-muted-foreground' };
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpiData?.map((kpi, index) => {
        const changeInfo = getChangeIcon(kpi?.change);
        
        return (
          <div key={index} className="bg-white rounded-lg border border-border p-6 hover:shadow-elevation-1 transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${kpi?.bgColor}`}>
                <Icon name={kpi?.icon} size={24} className={kpi?.iconColor} />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${changeInfo?.color}`}>
                <Icon name={changeInfo?.icon} size={16} />
                <span className="font-medium">
                  {Math.abs(kpi?.change)}%
                </span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                {kpi?.title}
              </h3>
              <div className="text-2xl font-bold text-foreground">
                {formatValue(kpi?.value, kpi?.type)}
              </div>
              <p className="text-sm text-muted-foreground">
                {kpi?.description}
              </p>
            </div>
            {kpi?.target && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Target:</span>
                  <span className="font-medium text-foreground">
                    {formatValue(kpi?.target, kpi?.type)}
                  </span>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        kpi?.progress >= 80 ? 'bg-success' :
                        kpi?.progress >= 50 ? 'bg-warning' : 'bg-error'
                      }`}
                      style={{ width: `${Math.min(kpi?.progress, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>{kpi?.progress}%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default KPICards;