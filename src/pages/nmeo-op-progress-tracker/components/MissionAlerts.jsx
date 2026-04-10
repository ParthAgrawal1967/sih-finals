import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MissionAlerts = ({ alertsData }) => {
  const [filter, setFilter] = useState('all');
  const [dismissedAlerts, setDismissedAlerts] = useState(new Set());

  const filteredAlerts = alertsData?.filter(alert => {
    if (dismissedAlerts?.has(alert?.id)) return false;
    if (filter === 'all') return true;
    return alert?.priority === filter;
  });

  const dismissAlert = (alertId) => {
    setDismissedAlerts(prev => new Set([...prev, alertId]));
  };

  const getAlertConfig = (priority) => {
    switch (priority) {
      case 'critical':
        return {
          bgColor: 'bg-error/10',
          borderColor: 'border-error/20',
          textColor: 'text-error',
          icon: 'AlertTriangle',
          iconColor: 'text-error'
        };
      case 'high':
        return {
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          textColor: 'text-warning',
          icon: 'AlertCircle',
          iconColor: 'text-warning'
        };
      case 'medium':
        return {
          bgColor: 'bg-primary/10',
          borderColor: 'border-primary/20',
          textColor: 'text-primary',
          icon: 'Info',
          iconColor: 'text-primary'
        };
      default:
        return {
          bgColor: 'bg-muted/50',
          borderColor: 'border-border',
          textColor: 'text-muted-foreground',
          icon: 'Bell',
          iconColor: 'text-muted-foreground'
        };
    }
  };

  const getPriorityCount = (priority) => {
    return alertsData?.filter(alert => 
      !dismissedAlerts?.has(alert?.id) && 
      (priority === 'all' || alert?.priority === priority)
    )?.length;
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Mission Alerts & Interventions</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">Filter:</span>
          <div className="flex space-x-1">
            {[
              { key: 'all', label: 'All', count: getPriorityCount('all') },
              { key: 'critical', label: 'Critical', count: getPriorityCount('critical') },
              { key: 'high', label: 'High', count: getPriorityCount('high') },
              { key: 'medium', label: 'Medium', count: getPriorityCount('medium') }
            ]?.map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setFilter(key)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 ${
                  filter === key
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {label} ({count})
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {filteredAlerts?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
            <h4 className="text-lg font-medium text-foreground mb-2">No Active Alerts</h4>
            <p className="text-muted-foreground">All mission parameters are within acceptable ranges</p>
          </div>
        ) : (
          filteredAlerts?.map((alert) => {
            const config = getAlertConfig(alert?.priority);
            
            return (
              <div
                key={alert?.id}
                className={`border rounded-lg p-4 ${config?.bgColor} ${config?.borderColor}`}
              >
                <div className="flex items-start space-x-3">
                  <Icon 
                    name={config?.icon} 
                    size={20} 
                    className={`${config?.iconColor} flex-shrink-0 mt-0.5`}
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className={`font-medium text-sm ${config?.textColor}`}>
                            {alert?.title}
                          </h4>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium uppercase tracking-wide ${config?.bgColor} ${config?.textColor}`}>
                            {alert?.priority}
                          </span>
                        </div>
                        <p className={`text-sm ${config?.textColor} opacity-90 mb-2`}>
                          {alert?.description}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                          <div className="flex items-center space-x-1">
                            <Icon name="MapPin" size={12} />
                            <span>{alert?.region}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon name="Calendar" size={12} />
                            <span>{alert?.date}</span>
                          </div>
                          {alert?.impact && (
                            <div className="flex items-center space-x-1">
                              <Icon name="TrendingDown" size={12} />
                              <span>Impact: {alert?.impact}</span>
                            </div>
                          )}
                        </div>

                        {alert?.recommendations && alert?.recommendations?.length > 0 && (
                          <div className="mb-3">
                            <h5 className={`text-xs font-medium ${config?.textColor} mb-1`}>
                              Recommended Actions:
                            </h5>
                            <ul className="space-y-1">
                              {alert?.recommendations?.map((rec, index) => (
                                <li key={index} className={`text-xs ${config?.textColor} opacity-80 flex items-start space-x-1`}>
                                  <span className="text-xs">•</span>
                                  <span>{rec}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        {alert?.actionRequired && (
                          <Button
                            variant="outline"
                            size="xs"
                            className={`text-xs border-current ${config?.textColor} hover:bg-current hover:text-white`}
                          >
                            Take Action
                          </Button>
                        )}
                        
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => dismissAlert(alert?.id)}
                          iconName="X"
                          className={`${config?.textColor} hover:bg-current hover:text-white`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      {filteredAlerts?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Showing {filteredAlerts?.length} of {alertsData?.length - dismissedAlerts?.size} active alerts
            </span>
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
            >
              Export Alert Report
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MissionAlerts;