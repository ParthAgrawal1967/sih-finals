import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ImportDependencyTracker = ({ 
  currentDependency, 
  targetDependency, 
  progressData,
  className = '' 
}) => {
  const progressPercentage = ((57 - currentDependency) / (57 - targetDependency)) * 100;
  const remainingReduction = currentDependency - targetDependency;

  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-card-foreground">NMEO-OP Import Dependency Tracker</h2>
          <p className="text-sm text-muted-foreground mt-1">
            National Mission on Edible Oils - Oil Palm Progress
          </p>
        </div>
        
        <div className="flex items-center space-x-2 bg-secondary/10 px-3 py-1 rounded-full">
          <Icon name="Target" size={14} className="text-secondary" />
          <span className="text-xs font-medium text-secondary">Mission Target: {targetDependency}%</span>
        </div>
      </div>
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-error mb-1">{currentDependency}%</div>
          <p className="text-xs text-muted-foreground">Current Dependency</p>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-secondary mb-1">{targetDependency}%</div>
          <p className="text-xs text-muted-foreground">Target by 2030</p>
        </div>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-warning mb-1">{remainingReduction?.toFixed(1)}%</div>
          <p className="text-xs text-muted-foreground">Reduction Needed</p>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-card-foreground">Progress to Target</span>
          <span className="text-sm text-muted-foreground">{progressPercentage?.toFixed(1)}% Complete</span>
        </div>
        
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-secondary to-success h-3 rounded-full transition-all duration-500"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>57% (Baseline)</span>
          <span>45% (Target)</span>
        </div>
      </div>
      {/* Key Milestones */}
      <div className="space-y-3 mb-6">
        <h3 className="font-medium text-card-foreground">Key Milestones</h3>
        
        {progressData?.milestones?.map((milestone, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
            <div className={`w-3 h-3 rounded-full ${
              milestone?.completed ? 'bg-success' : milestone?.inProgress ?'bg-warning' : 'bg-muted'
            }`} />
            
            <div className="flex-1">
              <p className="text-sm font-medium text-card-foreground">{milestone?.title}</p>
              <p className="text-xs text-muted-foreground">{milestone?.description}</p>
            </div>
            
            <div className="text-right">
              <div className="text-sm font-semibold text-card-foreground">{milestone?.target}%</div>
              <p className="text-xs text-muted-foreground">{milestone?.timeline}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Impact Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-card-foreground">Domestic Production</span>
          </div>
          <div className="text-xl font-semibold text-success">+{progressData?.domesticIncrease}%</div>
          <p className="text-xs text-muted-foreground mt-1">Since mission launch</p>
        </div>
        
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Users" size={16} className="text-primary" />
            <span className="text-sm font-medium text-card-foreground">Farmer Participation</span>
          </div>
          <div className="text-xl font-semibold text-primary">{progressData?.farmerCount?.toLocaleString('en-IN')}</div>
          <p className="text-xs text-muted-foreground mt-1">Active participants</p>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          iconName="BarChart3"
          iconPosition="left"
          className="flex-1"
        >
          View Detailed Progress
        </Button>
        
        <Button
          variant="outline"
          iconName="Download"
          iconPosition="left"
          className="flex-1"
        >
          Export NMEO-OP Report
        </Button>
      </div>
      {/* Government Compliance Badge */}
      <div className="mt-4 p-3 bg-muted/50 border border-border rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-primary" />
          <span className="text-xs font-medium text-card-foreground">MEITY Compliant</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">Official Government Data</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">Policy Aligned</span>
        </div>
      </div>
    </div>
  );
};

export default ImportDependencyTracker;