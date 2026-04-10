import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const AlertBanner = ({ 
  simulationData = null, 
  riskThresholds = { high: 0.8, medium: 0.5 },
  className = '' 
}) => {
  const [alerts, setAlerts] = useState([]);
  const [dismissedAlerts, setDismissedAlerts] = useState(new Set());

  useEffect(() => {
    if (!simulationData) return;

    const newAlerts = [];
    
    // Market disruption risk analysis
    if (simulationData?.marketVolatility > riskThresholds?.high) {
      newAlerts?.push({
        id: 'market-volatility-high',
        type: 'error',
        title: 'High Market Volatility Detected',
        message: `Market volatility at ${(simulationData?.marketVolatility * 100)?.toFixed(1)}% exceeds critical threshold. Immediate policy review recommended.`,
        action: 'Review Scenarios',
        persistent: true
      });
    } else if (simulationData?.marketVolatility > riskThresholds?.medium) {
      newAlerts?.push({
        id: 'market-volatility-medium',
        type: 'warning',
        title: 'Elevated Market Risk',
        message: `Market volatility at ${(simulationData?.marketVolatility * 100)?.toFixed(1)}% requires monitoring. Consider scenario adjustments.`,
        action: 'Monitor',
        persistent: false
      });
    }

    // Import dependency alerts
    if (simulationData?.importDependency > 0.7) {
      newAlerts?.push({
        id: 'import-dependency',
        type: 'warning',
        title: 'High Import Dependency',
        message: 'Import dependency exceeds 70%. Tariff changes may significantly impact domestic supply chains.',
        action: 'Analyze Impact',
        persistent: false
      });
    }

    // Economic impact thresholds
    if (simulationData?.economicImpact && simulationData?.economicImpact?.gdpChange < -0.02) {
      newAlerts?.push({
        id: 'gdp-impact',
        type: 'error',
        title: 'Significant GDP Impact',
        message: `Projected GDP decline of ${(Math.abs(simulationData?.economicImpact?.gdpChange) * 100)?.toFixed(1)}%. Policy revision strongly recommended.`,
        action: 'Revise Policy',
        persistent: true
      });
    }

    setAlerts(newAlerts?.filter(alert => !dismissedAlerts?.has(alert?.id)));
  }, [simulationData, riskThresholds, dismissedAlerts]);

  const dismissAlert = (alertId) => {
    setDismissedAlerts(prev => new Set([...prev, alertId]));
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error': return 'AlertTriangle';
      case 'warning': return 'AlertCircle';
      case 'info': return 'Info';
      default: return 'AlertCircle';
    }
  };

  const getAlertStyles = (type) => {
    switch (type) {
      case 'error':
        return 'bg-error/10 border-error/20 text-error';
      case 'warning':
        return 'bg-warning/10 border-warning/20 text-warning';
      case 'info':
        return 'bg-primary/10 border-primary/20 text-primary';
      default:
        return 'bg-muted border-border text-muted-foreground';
    }
  };

  if (alerts?.length === 0) return null;

  return (
    <div className={`space-y-2 ${className}`}>
      {alerts?.map((alert) => (
        <div
          key={alert?.id}
          className={`flex items-start space-x-3 p-4 border rounded-lg animate-slide-in ${getAlertStyles(alert?.type)}`}
        >
          <Icon 
            name={getAlertIcon(alert?.type)} 
            size={20} 
            className="flex-shrink-0 mt-0.5"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-sm">{alert?.title}</h4>
                <p className="text-sm opacity-90 mt-1">{alert?.message}</p>
              </div>
              
              <div className="flex items-center space-x-2 ml-4">
                {alert?.action && (
                  <Button
                    variant="outline"
                    size="xs"
                    className="text-xs border-current hover:bg-current hover:text-white"
                  >
                    {alert?.action}
                  </Button>
                )}
                
                {!alert?.persistent && (
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => dismissAlert(alert?.id)}
                    iconName="X"
                    className="text-current hover:bg-current hover:text-white"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertBanner;