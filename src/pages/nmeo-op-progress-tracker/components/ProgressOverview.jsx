import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressOverview = ({ progressData }) => {
  const { currentDependency, targetDependency, progressPercentage, timeline } = progressData;

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Import Dependency Reduction Progress</h2>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Calendar" size={16} />
          <span>Target: March 2030</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Status */}
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="#E5E7EB"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="#DC2626"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(currentDependency / 100) * 314} 314`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-error">{currentDependency}%</div>
                <div className="text-xs text-muted-foreground">Current</div>
              </div>
            </div>
          </div>
          <h3 className="font-medium text-foreground">Import Dependency</h3>
          <p className="text-sm text-muted-foreground">As of October 2025</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex flex-col justify-center">
          <div className="relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Progress to Target</span>
              <span className="text-sm text-primary font-medium">{progressPercentage}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-3">
              <div 
                className="bg-primary h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Start: 65%</span>
              <span>Target: {targetDependency}%</span>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-success/10 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="TrendingDown" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">
                {65 - currentDependency}% reduction achieved
              </span>
            </div>
          </div>
        </div>

        {/* Target Status */}
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="#E5E7EB"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="60"
                cy="60"
                r="50"
                stroke="#10B981"
                strokeWidth="8"
                fill="none"
                strokeDasharray={`${(targetDependency / 100) * 314} 314`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-success">{targetDependency}%</div>
                <div className="text-xs text-muted-foreground">Target</div>
              </div>
            </div>
          </div>
          <h3 className="font-medium text-foreground">Target Dependency</h3>
          <p className="text-sm text-muted-foreground">By March 2030</p>
        </div>
      </div>
      {/* Timeline Milestones */}
      <div className="mt-8">
        <h3 className="text-lg font-medium text-foreground mb-4">Key Milestones</h3>
        <div className="space-y-3">
          {timeline?.map((milestone, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className={`w-3 h-3 rounded-full ${
                milestone?.completed ? 'bg-success' : milestone?.inProgress ?'bg-warning' : 'bg-muted'
              }`} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-medium ${
                    milestone?.completed ? 'text-success' : milestone?.inProgress ?'text-warning' : 'text-muted-foreground'
                  }`}>
                    {milestone?.title}
                  </span>
                  <span className="text-xs text-muted-foreground">{milestone?.date}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{milestone?.description}</p>
              </div>
              {milestone?.completed && (
                <Icon name="CheckCircle" size={16} className="text-success" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview;