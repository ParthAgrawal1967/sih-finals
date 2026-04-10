import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const KPICard = ({ 
  title, 
  value, 
  unit, 
  change, 
  changeType, 
  icon, 
  description, 
  actionLabel, 
  onAction,
  trend = [],
  confidence,
  className = '' 
}) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-muted-foreground';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-6 hover:shadow-elevation-2 transition-shadow duration-200 ${className}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name={icon} size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-card-foreground text-sm">{title}</h3>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
        </div>
        
        {confidence && (
          <div className="flex items-center space-x-1 text-xs text-muted-foreground">
            <Icon name="Target" size={12} />
            <span>{confidence}% confidence</span>
          </div>
        )}
      </div>
      {/* Value Display */}
      <div className="mb-4">
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-semibold text-card-foreground">{value}</span>
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
        
        {change !== undefined && (
          <div className={`flex items-center space-x-1 mt-2 ${getChangeColor()}`}>
            <Icon name={getChangeIcon()} size={14} />
            <span className="text-sm font-medium">
              {Math.abs(change)}% {changeType === 'positive' ? 'increase' : changeType === 'negative' ? 'decrease' : 'change'}
            </span>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        )}
      </div>
      {/* Mini Trend Chart */}
      {trend?.length > 0 && (
        <div className="mb-4">
          <div className="flex items-end space-x-1 h-8">
            {trend?.map((point, index) => (
              <div
                key={index}
                className="bg-primary/20 rounded-sm flex-1"
                style={{ height: `${(point / Math.max(...trend)) * 100}%` }}
              />
            ))}
          </div>
        </div>
      )}
      {/* Action Button */}
      {actionLabel && onAction && (
        <Button
          variant="outline"
          size="sm"
          onClick={onAction}
          iconName="ArrowRight"
          iconPosition="right"
          className="w-full"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default KPICard;