import React, { useState } from 'react';
import Button from '../../../components/ui/Button';

import Icon from '../../../components/AppIcon';

const ScenarioNotes = ({ 
  scenario1, 
  scenario2, 
  onNotesUpdate,
  className = "" 
}) => {
  const [editingNotes, setEditingNotes] = useState(null);
  const [noteText, setNoteText] = useState('');

  const handleEditNotes = (scenarioId, currentNotes) => {
    setEditingNotes(scenarioId);
    setNoteText(currentNotes || '');
  };

  const handleSaveNotes = () => {
    if (onNotesUpdate) {
      onNotesUpdate(editingNotes, noteText);
    }
    setEditingNotes(null);
    setNoteText('');
  };

  const handleCancelEdit = () => {
    setEditingNotes(null);
    setNoteText('');
  };

  const ScenarioCard = ({ scenario, title }) => (
    <div className="bg-white rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="FileText" size={18} className="text-primary" />
          <h4 className="font-medium text-foreground">{title}</h4>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleEditNotes(scenario?.id, scenario?.notes)}
          iconName="Edit2"
          iconPosition="left"
        >
          Edit
        </Button>
      </div>

      {/* Scenario Details */}
      <div className="space-y-3 mb-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Tariff Change:</span>
            <span className={`ml-2 font-medium ${scenario?.tariffChange > 0 ? 'text-error' : 'text-success'}`}>
              {scenario?.tariffChange > 0 ? '+' : ''}{scenario?.tariffChange}%
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Time Horizon:</span>
            <span className="ml-2 font-medium text-foreground">{scenario?.timeHorizon} months</span>
          </div>
          <div>
            <span className="text-muted-foreground">Created:</span>
            <span className="ml-2 font-medium text-foreground">{scenario?.createdAt}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Confidence:</span>
            <span className="ml-2 font-medium text-primary">{scenario?.confidence}%</span>
          </div>
        </div>
      </div>

      {/* Assumptions */}
      <div className="mb-4">
        <h5 className="text-sm font-medium text-foreground mb-2">Key Assumptions:</h5>
        <ul className="text-sm text-muted-foreground space-y-1">
          {scenario?.assumptions?.map((assumption, index) => (
            <li key={index} className="flex items-start space-x-2">
              <Icon name="Dot" size={12} className="mt-1 flex-shrink-0" />
              <span>{assumption}</span>
            </li>
          )) || [
            <li key="default" className="flex items-start space-x-2">
              <Icon name="Dot" size={12} className="mt-1 flex-shrink-0" />
              <span>Standard economic model assumptions applied</span>
            </li>
          ]}
        </ul>
      </div>

      {/* Notes Section */}
      <div>
        <h5 className="text-sm font-medium text-foreground mb-2">Analysis Notes:</h5>
        {editingNotes === scenario?.id ? (
          <div className="space-y-3">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e?.target?.value)}
              placeholder="Add your analysis notes, observations, or recommendations..."
              className="w-full h-24 px-3 py-2 border border-border rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <div className="flex space-x-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleSaveNotes}
                iconName="Check"
                iconPosition="left"
              >
                Save
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancelEdit}
                iconName="X"
                iconPosition="left"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-sm text-muted-foreground bg-muted/50 rounded-md p-3 min-h-[60px]">
            {scenario?.notes || "No analysis notes added yet. Click Edit to add your observations."}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center space-x-2">
        <Icon name="StickyNote" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Scenario Context & Notes</h3>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {scenario1 && (
          <ScenarioCard 
            scenario={scenario1} 
            title={`${scenario1?.name} - Context`} 
          />
        )}
        {scenario2 && (
          <ScenarioCard 
            scenario={scenario2} 
            title={`${scenario2?.name} - Context`} 
          />
        )}
      </div>
      {/* Comparison Summary */}
      {scenario1 && scenario2 && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Lightbulb" size={18} className="text-primary" />
            <h4 className="font-medium text-foreground">Comparison Insights</h4>
          </div>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              • <strong>Tariff Difference:</strong> {Math.abs(scenario2?.tariffChange - scenario1?.tariffChange)?.toFixed(1)}% 
              difference in policy adjustment magnitude
            </p>
            <p>
              • <strong>Time Horizon:</strong> Both scenarios analyzed over 
              {scenario1?.timeHorizon === scenario2?.timeHorizon 
                ? ` ${scenario1?.timeHorizon} months (consistent timeframe)`
                : ` different periods (${scenario1?.timeHorizon} vs ${scenario2?.timeHorizon} months)`
              }
            </p>
            <p>
              • <strong>Confidence Levels:</strong> Model predictions range from {Math.min(scenario1?.confidence, scenario2?.confidence)}% 
              to {Math.max(scenario1?.confidence, scenario2?.confidence)}% confidence
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScenarioNotes;