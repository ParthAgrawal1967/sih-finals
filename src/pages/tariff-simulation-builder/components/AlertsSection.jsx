import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertsSection = ({ simulationData, tariffChange }) => {
  const [alerts, setAlerts] = useState([]);
  const [dismissedAlerts, setDismissedAlerts] = useState(new Set());

  useEffect(() => {
    const newAlerts = [];
    
    // Market disruption risk based on tariff change
    if (Math.abs(tariffChange) > 30) {
      newAlerts?.push({
        id: 'high-tariff-risk',
        type: 'error',
        title: 'Extreme Tariff Adjustment Warning',
        message: `Tariff change of ${tariffChange > 0 ? '+' : ''}${tariffChange}% may cause severe market disruption. Supply chain impacts expected across all sectors.`,
        severity: 'critical',
        action: 'Review Policy',
        timestamp: new Date()
      });
    } else if (Math.abs(tariffChange) > 20) {
      newAlerts?.push({
        id: 'medium-tariff-risk',
        type: 'warning',
        title: 'High Tariff Impact Alert',
        message: `Significant tariff adjustment detected. Monitor consumer price volatility and farmer income impacts closely.`,
        severity: 'high',
        action: 'Monitor Closely',
        timestamp: new Date()
      });
    }

    // Import dependency alerts
    if (simulationData?.importDependency > 0.6) {
      newAlerts?.push({
        id: 'import-dependency',
        type: 'warning',
        title: 'Import Dependency Risk',
        message: 'High import dependency detected. Tariff changes may significantly impact domestic supply security.',
        severity: 'medium',
        action: 'Assess Supply Risk',
        timestamp: new Date()
      });
    }

    // Price volatility alerts
    if (simulationData?.priceVolatility > 85) {
      newAlerts?.push({
        id: 'price-volatility',
        type: 'warning',
        title: 'Price Volatility Alert',
        message: 'Consumer price volatility exceeds threshold. Consider gradual implementation strategy.',
        severity: 'medium',
        action: 'Gradual Implementation',
        timestamp: new Date()
      });
    }

    // Model confidence alerts
    if (simulationData?.confidence < 80) {
      newAlerts?.push({
        id: 'low-confidence',
        type: 'info',
        title: 'Model Confidence Notice',
        message: `Prediction confidence at ${simulationData?.confidence}%. Consider additional data validation.`,
        severity: 'low',
        action: 'Validate Data',
        timestamp: new Date()
      });
    }

    // NMEO-OP target alerts
    if (simulationData?.domesticShare < 45) {
      newAlerts?.push({
        id: 'nmeo-target',
        type: 'info',
        title: 'NMEO-OP Target Status',
        message: 'Current domestic share below NMEO-OP target. Policy adjustment may support mission objectives.',
        severity: 'low',
        action: 'Review Targets',
        timestamp: new Date()
      });
    }

    setAlerts(newAlerts?.filter(alert => !dismissedAlerts?.has(alert?.id)));
  }, [simulationData, tariffChange, dismissedAlerts]);

  const dismissAlert = (alertId) => {
    setDismissedAlerts(prev => new Set([...prev, alertId]));
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error': return 'AlertTriangle';
      case 'warning': return 'AlertCircle';
      case 'info': return 'Info';
      default: return 'Bell';
    }
  };

  const getAlertStyles = (type, severity) => {
    const baseStyles = 'border-l-4 rounded-r-lg';
    
    switch (type) {
      case 'error':
        return `${baseStyles} bg-error/5 border-l-error border border-error/20`;
      case 'warning':
        return `${baseStyles} bg-warning/5 border-l-warning border border-warning/20`;
      case 'info':
        return `${baseStyles} bg-primary/5 border-l-primary border border-primary/20`;
      default:
        return `${baseStyles} bg-muted border-l-muted-foreground border border-border`;
    }
  };

  const getSeverityBadge = (severity) => {
    const badges = {
      critical: 'bg-error text-error-foreground',
      high: 'bg-warning text-warning-foreground',
      medium: 'bg-primary text-primary-foreground',
      low: 'bg-muted text-muted-foreground'
    };
    
    return badges?.[severity] || badges?.low;
  };

  if (alerts?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Shield" size={20} className="text-success" />
          <h3 className="text-lg font-semibold text-foreground">System Status</h3>
        </div>
        
        <div className="flex items-center space-x-3 p-4 bg-success/10 border border-success/20 rounded-lg">
          <Icon name="CheckCircle" size={20} className="text-success" />
          <div>
            <p className="font-medium text-success">All Systems Normal</p>
            <p className="text-sm text-success/80">No risk alerts detected for current simulation parameters.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="AlertTriangle" size={20} className="text-warning" />
          <h3 className="text-lg font-semibold text-foreground">Risk Alerts</h3>
          <span className="bg-warning text-warning-foreground text-xs px-2 py-1 rounded-full">
            {alerts?.length}
          </span>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setDismissedAlerts(new Set())}
          iconName="RotateCcw"
          className="text-muted-foreground"
        >
          Reset
        </Button>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {alerts?.map((alert) => (
          <div
            key={alert?.id}
            className={`p-4 ${getAlertStyles(alert?.type, alert?.severity)} animate-slide-in`}
          >
            <div className="flex items-start space-x-3">
              <Icon 
                name={getAlertIcon(alert?.type)} 
                size={20} 
                className={`flex-shrink-0 mt-0.5 ${
                  alert?.type === 'error' ? 'text-error' :
                  alert?.type === 'warning'? 'text-warning' : 'text-primary'
                }`}
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-foreground">{alert?.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${getSeverityBadge(alert?.severity)}`}>
                      {alert?.severity?.toUpperCase()}
                    </span>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => dismissAlert(alert?.id)}
                    iconName="X"
                    className="text-muted-foreground hover:text-foreground"
                  />
                </div>
                
                <p className="text-sm text-muted-foreground mb-3">{alert?.message}</p>
                
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    size="xs"
                    className="text-xs"
                  >
                    {alert?.action}
                  </Button>
                  
                  <span className="text-xs text-muted-foreground">
                    {alert?.timestamp?.toLocaleTimeString('en-IN', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsSection;