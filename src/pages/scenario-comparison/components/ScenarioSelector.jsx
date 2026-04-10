import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const ScenarioSelector = ({ 
  scenarios, 
  selectedScenario, 
  onScenarioChange, 
  title = "Select Scenario",
  className = "" 
}) => {
  const scenarioOptions = scenarios?.map(scenario => ({
    value: scenario?.id,
    label: `${scenario?.name} (${scenario?.tariffChange > 0 ? '+' : ''}${scenario?.tariffChange}%)`,
    description: `Created: ${scenario?.createdAt} | Confidence: ${scenario?.confidence}%`
  }));

  return (
    <div className={`bg-white rounded-lg border border-border p-4 ${className}`}>
      <div className="flex items-center space-x-2 mb-3">
        <Icon name="GitCompare" size={18} className="text-primary" />
        <h3 className="font-medium text-foreground">{title}</h3>
      </div>
      <Select
        options={scenarioOptions}
        value={selectedScenario}
        onChange={onScenarioChange}
        placeholder="Choose a scenario to compare"
        searchable
        className="w-full"
      />
      {selectedScenario && (
        <div className="mt-3 p-3 bg-muted rounded-md">
          {(() => {
            const scenario = scenarios?.find(s => s?.id === selectedScenario);
            return scenario ? (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tariff Change:</span>
                  <span className={`font-medium ${scenario?.tariffChange > 0 ? 'text-error' : 'text-success'}`}>
                    {scenario?.tariffChange > 0 ? '+' : ''}{scenario?.tariffChange}%
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Time Horizon:</span>
                  <span className="font-medium text-foreground">{scenario?.timeHorizon} months</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Prediction Confidence:</span>
                  <span className="font-medium text-primary">{scenario?.confidence}%</span>
                </div>
              </div>
            ) : null;
          })()}
        </div>
      )}
    </div>
  );
};

export default ScenarioSelector;