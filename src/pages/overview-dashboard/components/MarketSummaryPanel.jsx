import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MarketSummaryPanel = ({ 
  mlPredictions, 
  performanceMetrics, 
  lastUpdated,
  className = '' 
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');

  const timeframes = [
    { label: '1W', value: '1W' },
    { label: '1M', value: '1M' },
    { label: '3M', value: '3M' },
    { label: '6M', value: '6M' }
  ];

  const getStatusColor = (rmse) => {
    if (rmse < 3) return 'text-success';
    if (rmse < 5) return 'text-warning';
    return 'text-error';
  };

  const getStatusIcon = (rmse) => {
    if (rmse < 3) return 'CheckCircle';
    if (rmse < 5) return 'AlertCircle';
    return 'XCircle';
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">Market Intelligence Summary</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Weighted ensemble ML predictions with real-time market data
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {timeframes?.map((timeframe) => (
            <Button
              key={timeframe?.value}
              variant={selectedTimeframe === timeframe?.value ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedTimeframe(timeframe?.value)}
              className="text-xs"
            >
              {timeframe?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* ML Model Performance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon 
              name={getStatusIcon(performanceMetrics?.rmse)} 
              size={16} 
              className={getStatusColor(performanceMetrics?.rmse)}
            />
            <span className="text-sm font-medium text-card-foreground">Model Accuracy</span>
          </div>
          <div className="text-xl font-semibold text-card-foreground">
            {performanceMetrics?.rmse?.toFixed(2)}% RMSE
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Target: &lt;5% for policy decisions
          </p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={16} className="text-primary" />
            <span className="text-sm font-medium text-card-foreground">Confidence Interval</span>
          </div>
          <div className="text-xl font-semibold text-card-foreground">
            {performanceMetrics?.confidence}%
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            95% statistical confidence
          </p>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Clock" size={16} className="text-secondary" />
            <span className="text-sm font-medium text-card-foreground">Last Updated</span>
          </div>
          <div className="text-xl font-semibold text-card-foreground">
            {new Date(lastUpdated)?.toLocaleTimeString('en-IN', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Auto-refresh every 15 minutes
          </p>
        </div>
      </div>
      {/* Key Predictions */}
      <div className="space-y-4">
        <h3 className="font-medium text-card-foreground">Key Market Predictions</h3>
        
        {mlPredictions?.map((prediction, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name={prediction?.icon} size={18} className="text-primary" />
              <div>
                <p className="text-sm font-medium text-card-foreground">{prediction?.metric}</p>
                <p className="text-xs text-muted-foreground">{prediction?.description}</p>
              </div>
            </div>
            
            <div className="text-right">
              <div className={`text-sm font-semibold ${
                prediction?.changeType === 'positive' ? 'text-success' : 
                prediction?.changeType === 'negative'? 'text-error' : 'text-muted-foreground'
              }`}>
                {prediction?.predictedChange > 0 ? '+' : ''}{prediction?.predictedChange}%
              </div>
              <p className="text-xs text-muted-foreground">next {selectedTimeframe}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Model Ensemble Info */}
      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Brain" size={18} className="text-primary mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-card-foreground">Ensemble Model Architecture</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Combining GRU + LSTM + XGBoost algorithms with 10+ years of trade data for enhanced prediction accuracy
            </p>
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-xs text-primary font-medium">GRU: 35% weight</span>
              <span className="text-xs text-primary font-medium">LSTM: 40% weight</span>
              <span className="text-xs text-primary font-medium">XGBoost: 25% weight</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketSummaryPanel;