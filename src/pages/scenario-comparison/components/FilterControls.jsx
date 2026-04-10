import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterControls = ({ 
  filters, 
  onFiltersChange, 
  onResetFilters,
  className = "" 
}) => {
  const timeRangeOptions = [
    { value: 'all', label: 'All Time Periods' },
    { value: '1-3', label: '1-3 Months (Short Term)' },
    { value: '4-6', label: '4-6 Months (Medium Term)' },
    { value: '7-12', label: '7-12 Months (Long Term)' }
  ];

  const stakeholderOptions = [
    { value: 'all', label: 'All Stakeholders' },
    { value: 'farmers', label: 'Farmers Only' },
    { value: 'consumers', label: 'Consumers Only' },
    { value: 'government', label: 'Government Revenue' },
    { value: 'industry', label: 'Industry Impact' }
  ];

  const indicatorOptions = [
    { value: 'import_volume', label: 'Import Volume' },
    { value: 'farmer_income', label: 'Farmer Income' },
    { value: 'consumer_prices', label: 'Consumer Prices' },
    { value: 'gdp_impact', label: 'GDP Impact' },
    { value: 'employment', label: 'Employment Effects' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const handleIndicatorToggle = (indicator, checked) => {
    const currentIndicators = filters?.indicators || [];
    const newIndicators = checked 
      ? [...currentIndicators, indicator]
      : currentIndicators?.filter(i => i !== indicator);
    
    handleFilterChange('indicators', newIndicators);
  };

  return (
    <div className={`bg-white rounded-lg border border-border p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Analysis Filters</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onResetFilters}
          iconName="RotateCcw"
          iconPosition="left"
        >
          Reset
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Time Range Filter */}
        <div>
          <Select
            label="Time Range"
            options={timeRangeOptions}
            value={filters?.timeRange || 'all'}
            onChange={(value) => handleFilterChange('timeRange', value)}
            className="w-full"
          />
        </div>

        {/* Stakeholder Focus */}
        <div>
          <Select
            label="Stakeholder Focus"
            options={stakeholderOptions}
            value={filters?.stakeholder || 'all'}
            onChange={(value) => handleFilterChange('stakeholder', value)}
            className="w-full"
          />
        </div>

        {/* Confidence Threshold */}
        <div>
          <Select
            label="Minimum Confidence"
            options={[
              { value: '0', label: 'Any Confidence Level' },
              { value: '70', label: '70% or Higher' },
              { value: '80', label: '80% or Higher' },
              { value: '90', label: '90% or Higher' }
            ]}
            value={filters?.confidenceThreshold || '0'}
            onChange={(value) => handleFilterChange('confidenceThreshold', value)}
            className="w-full"
          />
        </div>
      </div>
      {/* Economic Indicators */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-foreground mb-3">
          Economic Indicators to Compare
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {indicatorOptions?.map((indicator) => (
            <Checkbox
              key={indicator?.value}
              label={indicator?.label}
              checked={(filters?.indicators || [])?.includes(indicator?.value)}
              onChange={(e) => handleIndicatorToggle(indicator?.value, e?.target?.checked)}
              size="sm"
            />
          ))}
        </div>
      </div>
      {/* Advanced Options */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Checkbox
            label="Show Confidence Intervals"
            description="Display prediction uncertainty bands"
            checked={filters?.showConfidenceIntervals || false}
            onChange={(e) => handleFilterChange('showConfidenceIntervals', e?.target?.checked)}
          />
          <Checkbox
            label="Normalize Values"
            description="Scale all metrics to 0-100 range"
            checked={filters?.normalizeValues || false}
            onChange={(e) => handleFilterChange('normalizeValues', e?.target?.checked)}
          />
          <Checkbox
            label="Highlight Significant Differences"
            description="Emphasize statistically significant changes"
            checked={filters?.highlightSignificant || true}
            onChange={(e) => handleFilterChange('highlightSignificant', e?.target?.checked)}
          />
          <Checkbox
            label="Include Risk Assessment"
            description="Show market disruption risk levels"
            checked={filters?.includeRiskAssessment || true}
            onChange={(e) => handleFilterChange('includeRiskAssessment', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterControls;