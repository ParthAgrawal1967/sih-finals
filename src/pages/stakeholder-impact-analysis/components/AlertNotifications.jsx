import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertNotifications = ({ simulationData }) => {
  const [dismissedAlerts, setDismissedAlerts] = useState(new Set());

  // Mock alert data based on stakeholder analysis
  const alerts = [
    {
      id: 'farmer-income-threshold',
      type: 'warning',
      stakeholder: 'Farmers',
      title: 'Income Volatility Alert',
      message: 'Projected farmer income shows 15% volatility in Q2 2024. Consider implementing income stabilization measures.',
      severity: 'medium',
      action: 'Review Support Programs',
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      persistent: false
    },
    {
      id: 'consumer-price-spike',
      type: 'error',
      stakeholder: 'Consumers',
      title: 'Price Spike Risk',
      message: 'Consumer price volatility exceeds 20% threshold in urban markets. Immediate intervention required.',
      severity: 'high',
      action: 'Activate Price Controls',
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      persistent: true
    },
    {
      id: 'trade-balance-concern',
      type: 'warning',
      stakeholder: 'Government',
      title: 'Trade Balance Impact',
      message: 'Import reduction may affect bilateral trade agreements with Malaysia and Indonesia.',
      severity: 'medium',
      action: 'Diplomatic Consultation',
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      persistent: false
    },
    {
      id: 'nmeo-progress-delay',
      type: 'info',
      stakeholder: 'Government',
      title: 'NMEO-OP Timeline Update',
      message: 'Current policy changes may accelerate NMEO-OP targets by 18 months ahead of schedule.',
      severity: 'low',
      action: 'Update Timeline',
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      persistent: false
    },
    {
      id: 'regional-disparity',
      type: 'warning',
      stakeholder: 'Farmers',
      title: 'Regional Impact Disparity',
      message: 'Southern states showing 40% higher benefits compared to northern regions. Consider regional adjustments.',
      severity: 'medium',
      action: 'Regional Analysis',
      timestamp: new Date(Date.now() - 5400000), // 1.5 hours ago
      persistent: false
    }
  ];

  const visibleAlerts = alerts?.filter(alert => !dismissedAlerts?.has(alert?.id));

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
    const baseStyles = 'border rounded-lg p-4 animate-slide-in';
    
    switch (type) {
      case 'error':
        return `${baseStyles} bg-error/10 border-error/20 text-error`;
      case 'warning':
        return `${baseStyles} bg-warning/10 border-warning/20 text-warning`;
      case 'info':
        return `${baseStyles} bg-primary/10 border-primary/20 text-primary`;
      default:
        return `${baseStyles} bg-muted border-border text-muted-foreground`;
    }
  };

  const getSeverityBadge = (severity) => {
    const badges = {
      high: 'bg-error text-error-foreground',
      medium: 'bg-warning text-warning-foreground',
      low: 'bg-primary text-primary-foreground'
    };
    
    return `px-2 py-1 rounded-full text-xs font-medium ${badges?.[severity] || badges?.low}`;
  };

  const getStakeholderIcon = (stakeholder) => {
    switch (stakeholder) {
      case 'Farmers': return 'Leaf';
      case 'Consumers': return 'ShoppingCart';
      case 'Government': return 'Building2';
      default: return 'Users';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = Math.floor((now - timestamp) / 1000);
    
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  if (visibleAlerts?.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg border border-border">
        <div className="text-center">
          <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">All Clear</h3>
          <p className="text-muted-foreground">No critical alerts for stakeholder impacts at this time.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Alert Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Icon name="Bell" size={20} className="text-foreground" />
          <h3 className="text-lg font-semibold text-foreground">Stakeholder Impact Alerts</h3>
          <span className="px-2 py-1 bg-error text-error-foreground rounded-full text-xs font-medium">
            {visibleAlerts?.filter(a => a?.type === 'error')?.length}
          </span>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" iconName="Filter">
            Filter
          </Button>
          <Button variant="outline" size="sm" iconName="Settings">
            Configure
          </Button>
        </div>
      </div>
      {/* Alert List */}
      <div className="space-y-3">
        {visibleAlerts?.map((alert) => (
          <div key={alert?.id} className={getAlertStyles(alert?.type, alert?.severity)}>
            <div className="flex items-start space-x-3">
              {/* Alert Icon */}
              <div className="flex-shrink-0 mt-1">
                <Icon name={getAlertIcon(alert?.type)} size={20} />
              </div>

              {/* Alert Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-sm">{alert?.title}</h4>
                    <span className={getSeverityBadge(alert?.severity)}>
                      {alert?.severity?.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs opacity-75">
                    <Icon name={getStakeholderIcon(alert?.stakeholder)} size={14} />
                    <span>{alert?.stakeholder}</span>
                  </div>
                </div>
                
                <p className="text-sm opacity-90 mb-3">{alert?.message}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-xs opacity-75">
                    <Icon name="Clock" size={12} />
                    <span>{formatTimeAgo(alert?.timestamp)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
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
          </div>
        ))}
      </div>
      {/* Alert Summary */}
      <div className="bg-white p-4 rounded-lg border border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-error">
              {visibleAlerts?.filter(a => a?.type === 'error')?.length}
            </div>
            <div className="text-sm text-muted-foreground">Critical Alerts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">
              {visibleAlerts?.filter(a => a?.type === 'warning')?.length}
            </div>
            <div className="text-sm text-muted-foreground">Warnings</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {visibleAlerts?.filter(a => a?.type === 'info')?.length}
            </div>
            <div className="text-sm text-muted-foreground">Information</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertNotifications;