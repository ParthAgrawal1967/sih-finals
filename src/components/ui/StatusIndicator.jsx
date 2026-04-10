import { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const StatusIndicator = ({ 
  apiStatus = 'connected', 
  simulationStatus = 'idle',
  className = '' 
}) => {
  const [connectionQuality, setConnectionQuality] = useState('excellent');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    // Simulate connection quality monitoring
    const interval = setInterval(() => {
      const qualities = ['excellent', 'good', 'fair', 'poor'];
      const randomQuality = qualities?.[Math.floor(Math.random() * qualities?.length)];
      setConnectionQuality(randomQuality);
      setLastUpdate(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusConfig = () => {
    if (simulationStatus === 'processing') {
      return {
        icon: 'Loader2',
        color: 'text-primary',
        bgColor: 'bg-primary/10',
        label: 'Processing ML Model',
        animate: 'animate-spin'
      };
    }

    if (simulationStatus === 'error') {
      return {
        icon: 'AlertTriangle',
        color: 'text-error',
        bgColor: 'bg-error/10',
        label: 'Simulation Error',
        animate: ''
      };
    }

    switch (apiStatus) {
      case 'connected':
        return {
          icon: 'Wifi',
          color: connectionQuality === 'excellent' ? 'text-success' : 
                 connectionQuality === 'good' ? 'text-primary' :
                 connectionQuality === 'fair' ? 'text-warning' : 'text-error',
          bgColor: connectionQuality === 'excellent' ? 'bg-success/10' : 
                   connectionQuality === 'good' ? 'bg-primary/10' :
                   connectionQuality === 'fair' ? 'bg-warning/10' : 'bg-error/10',
          label: `API Connected (${connectionQuality})`,
          animate: ''
        };
      case 'connecting':
        return {
          icon: 'Loader2',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          label: 'Connecting to API',
          animate: 'animate-spin'
        };
      case 'disconnected':
        return {
          icon: 'WifiOff',
          color: 'text-error',
          bgColor: 'bg-error/10',
          label: 'API Disconnected',
          animate: ''
        };
      default:
        return {
          icon: 'Circle',
          color: 'text-muted-foreground',
          bgColor: 'bg-muted',
          label: 'Status Unknown',
          animate: ''
        };
    }
  };

  const status = getStatusConfig();
  const timeAgo = Math.floor((new Date() - lastUpdate) / 1000);

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Status Indicator */}
      <div className={`flex items-center space-x-2 px-2 py-1 rounded-md ${status?.bgColor}`}>
        <Icon 
          name={status?.icon} 
          size={14} 
          className={`${status?.color} ${status?.animate}`}
        />
        <span className={`text-xs font-medium ${status?.color} hidden sm:inline`}>
          {status?.label}
        </span>
      </div>
      {/* Last Update Time */}
      {apiStatus === 'connected' && (
        <span className="text-xs text-muted-foreground hidden md:inline">
          {timeAgo < 60 ? 'Just now' : 
           timeAgo < 3600 ? `${Math.floor(timeAgo / 60)}m ago` :
           `${Math.floor(timeAgo / 3600)}h ago`}
        </span>
      )}
      {/* Data Quality Indicator */}
      {apiStatus === 'connected' && simulationStatus === 'idle' && (
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4]?.map((bar) => (
            <div
              key={bar}
              className={`w-1 h-3 rounded-full ${
                bar <= (connectionQuality === 'excellent' ? 4 :
                       connectionQuality === 'good' ? 3 :
                       connectionQuality === 'fair' ? 2 : 1)
                  ? status?.color?.replace('text-', 'bg-')
                  : 'bg-muted'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusIndicator;