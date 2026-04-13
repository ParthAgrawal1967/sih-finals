import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import ExportToolbar from '../../components/ui/ExportToolbar';
import AlertBanner from '../../components/ui/AlertBanner';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { useAuditLog } from "../../hooks/useAuditLog";
import { useLocation } from "react-router-dom";

// Import scenario comparison components
import ScenarioSelector from './components/ScenarioSelector';
import ComparisonChart from './components/ComparisonChart';
import ComparisonMetricsTable from './components/ComparisonMetricsTable';
import FilterControls from './components/FilterControls';
import ScenarioNotes from './components/ScenarioNotes';

const ScenarioComparison = () => {
  const location = useLocation();
  useAuditLog("Scenario Comparison", location?.state || {});
  const navigate = useNavigate();
  const [selectedScenario1, setSelectedScenario1] = useState('');
  const [selectedScenario2, setSelectedScenario2] = useState('');
  const [filters, setFilters] = useState({
    timeRange: 'all',
    stakeholder: 'all',
    confidenceThreshold: '0',
    indicators: ['import_volume', 'farmer_income', 'consumer_prices'],
    showConfidenceIntervals: false,
    normalizeValues: false,
    highlightSignificant: true,
    includeRiskAssessment: true
  });
  const [showFilters, setShowFilters] = useState(false);

  // Mock scenarios data
  const mockScenarios = [
    {
      id: 'scenario_1',
      name: 'Conservative Increase',
      tariffChange: 5,
      timeHorizon: 6,
      createdAt: '25/10/2024 14:30',
      confidence: 87,
      importVolumeChange: -12.5,
      farmerIncomeChange: 8.3,
      consumerPriceChange: 3.2,
      gdpImpact: 0.08,
      riskLevel: 0.25,
      notes: `Conservative tariff increase designed to support domestic farmers while minimizing consumer impact.\n\nKey considerations:\n- Gradual implementation over 6 months\n- Focus on price stability\n- Minimal supply chain disruption expected`,
      assumptions: [
        "Stable INR/USD exchange rate (±2%)",
        "Normal monsoon conditions for domestic production",
        "No major geopolitical disruptions in palm oil markets",
        "Consumer demand elasticity remains constant"
      ]
    },
    {
      id: 'scenario_2',
      name: 'Aggressive Protection',
      tariffChange: 25,
      timeHorizon: 12,
      createdAt: '25/10/2024 15:45',
      confidence: 78,
      importVolumeChange: -45.8,
      farmerIncomeChange: 28.7,
      consumerPriceChange: 15.6,
      gdpImpact: -0.12,
      riskLevel: 0.75,
      notes: `Aggressive tariff policy aimed at maximizing domestic production incentives.\n\nRisk factors:\n- High consumer price volatility\n- Potential supply shortages\n- Industry adaptation challenges`,
      assumptions: [
        "Domestic production can scale up by 40% within 12 months",
        "Alternative oil sources remain available",
        "Consumer acceptance of higher prices",
        "No retaliatory trade measures from exporting countries"
      ]
    },
    {
      id: 'scenario_3',
      name: 'Moderate Adjustment',
      tariffChange: 15,
      timeHorizon: 9,
      createdAt: '24/10/2024 16:20',
      confidence: 92,
      importVolumeChange: -28.3,
      farmerIncomeChange: 18.5,
      consumerPriceChange: 8.4,
      gdpImpact: 0.03,
      riskLevel: 0.45,
      notes: `Balanced approach targeting optimal trade-off between farmer support and consumer welfare.\n\nExpected outcomes:\n- Sustainable domestic growth\n- Manageable price increases\n- Improved self-reliance metrics`,
      assumptions: [
        "Phased implementation reduces market shock",
        "Government support programs for farmers",
        "Strategic petroleum reserves buffer price volatility",
        "International cooperation maintains trade relationships"
      ]
    },
    {
      id: 'scenario_4',
      name: 'Tariff Reduction',
      tariffChange: -10,
      timeHorizon: 6,
      createdAt: '24/10/2024 11:15',
      confidence: 85,
      importVolumeChange: 22.7,
      farmerIncomeChange: -15.2,
      consumerPriceChange: -6.8,
      gdpImpact: 0.15,
      riskLevel: 0.35,
      notes: `Consumer-focused policy reducing import barriers to lower domestic prices.\n\nTrade-offs:\n- Reduced farmer protection\n- Increased import dependency\n- Short-term economic benefits`,
      assumptions: [
        "Global palm oil prices remain stable",
        "Domestic farmers adapt through efficiency gains",
        "Consumer savings boost other economic sectors",
        "Import infrastructure can handle increased volumes"
      ]
    }
  ];

  // Generate mock chart data
  const generateChartData = (scenario) => {
    const baseValue = scenario?.tariffChange > 0 ? -Math.abs(scenario?.importVolumeChange) : Math.abs(scenario?.importVolumeChange);
    return Array.from({ length: scenario?.timeHorizon }, (_, i) => ({
      month: i + 1,
      value: baseValue * (1 - Math.exp(-i / 3)) + (Math.random() - 0.5) * 2
    }));
  };

  const generateFarmerIncomeData = (scenario) => {
    const baseValue = scenario?.farmerIncomeChange;
    return Array.from({ length: scenario?.timeHorizon }, (_, i) => ({
      month: i + 1,
      value: baseValue * (i + 1) / scenario?.timeHorizon + (Math.random() - 0.5) * 1.5
    }));
  };

  const generateConsumerPriceData = (scenario) => {
    const baseValue = scenario?.consumerPriceChange;
    return Array.from({ length: scenario?.timeHorizon }, (_, i) => ({
      month: i + 1,
      value: baseValue * Math.log(i + 2) / Math.log(scenario?.timeHorizon + 1) + (Math.random() - 0.5) * 1
    }));
  };

  const scenario1Data = selectedScenario1 ? mockScenarios?.find(s => s?.id === selectedScenario1) : null;
  const scenario2Data = selectedScenario2 ? mockScenarios?.find(s => s?.id === selectedScenario2) : null;

  const handleResetFilters = () => {
    setFilters({
      timeRange: 'all',
      stakeholder: 'all',
      confidenceThreshold: '0',
      indicators: ['import_volume', 'farmer_income', 'consumer_prices'],
      showConfidenceIntervals: false,
      normalizeValues: false,
      highlightSignificant: true,
      includeRiskAssessment: true
    });
  };

  const handleNotesUpdate = (scenarioId, notes) => {
    // In a real app, this would update the scenario in the backend
    console.log(`Updating notes for scenario ${scenarioId}:`, notes);
  };

  const getAlertData = () => {
    if (!scenario1Data || !scenario2Data) return null;
    
    const maxRisk = Math.max(scenario1Data?.riskLevel, scenario2Data?.riskLevel);
    const maxPriceChange = Math.max(
      Math.abs(scenario1Data?.consumerPriceChange), 
      Math.abs(scenario2Data?.consumerPriceChange)
    );
    
    return {
      marketVolatility: maxRisk,
      importDependency: 0.57, // Current import dependency
      economicImpact: {
        gdpChange: Math.min(scenario1Data?.gdpImpact, scenario2Data?.gdpImpact)
      }
    };
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TabNavigation />
      <main className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Scenario Comparison</h1>
            <p className="text-muted-foreground mt-2">
              Compare multiple tariff scenarios side-by-side for comprehensive policy analysis
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              iconName="Filter"
              iconPosition="left"
            >
              {showFilters ? 'Hide' : 'Show'} Filters
            </Button>
            <ExportToolbar 
              simulationData={{ scenario1Data, scenario2Data }}
            />
          </div>
        </div>

        {/* Alert Banner */}
        <AlertBanner simulationData={getAlertData()} />

        {/* Filter Controls */}
        {showFilters && (
          <FilterControls
            filters={filters}
            onFiltersChange={setFilters}
            onResetFilters={handleResetFilters}
          />
        )}

        {/* Scenario Selectors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ScenarioSelector
            scenarios={mockScenarios}
            selectedScenario={selectedScenario1}
            onScenarioChange={setSelectedScenario1}
            title="Scenario A"
          />
          <ScenarioSelector
            scenarios={mockScenarios}
            selectedScenario={selectedScenario2}
            onScenarioChange={setSelectedScenario2}
            title="Scenario B"
          />
        </div>

        {/* Comparison Content */}
        {scenario1Data && scenario2Data ? (
          <div className="space-y-8">
            {/* Comparison Charts */}
            <div className="space-y-6">
              <ComparisonChart
                scenario1Data={generateChartData(scenario1Data)}
                scenario2Data={generateChartData(scenario2Data)}
                scenario1Name={scenario1Data?.name}
                scenario2Name={scenario2Data?.name}
                chartType="line"
                title="Import Volume Impact Comparison"
                yAxisLabel="Volume Change (%)"
              />
              
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <ComparisonChart
                  scenario1Data={generateFarmerIncomeData(scenario1Data)}
                  scenario2Data={generateFarmerIncomeData(scenario2Data)}
                  scenario1Name={scenario1Data?.name}
                  scenario2Name={scenario2Data?.name}
                  chartType="bar"
                  title="Farmer Income Impact"
                  yAxisLabel="Income Change (%)"
                />
                
                <ComparisonChart
                  scenario1Data={generateConsumerPriceData(scenario1Data)}
                  scenario2Data={generateConsumerPriceData(scenario2Data)}
                  scenario1Name={scenario1Data?.name}
                  scenario2Name={scenario2Data?.name}
                  chartType="line"
                  title="Consumer Price Impact"
                  yAxisLabel="Price Change (%)"
                />
              </div>
            </div>

            {/* Comparison Metrics Table */}
            <ComparisonMetricsTable
              scenario1={scenario1Data}
              scenario2={scenario2Data}
            />

            {/* Scenario Notes and Context */}
            <ScenarioNotes
              scenario1={scenario1Data}
              scenario2={scenario2Data}
              onNotesUpdate={handleNotesUpdate}
            />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
              <Button
                variant="outline"
                onClick={() => navigate('/tariff-simulation-builder')}
                iconName="Calculator"
                iconPosition="left"
              >
                Create New Scenario
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate('/overview-dashboard')}
                iconName="BarChart3"
                iconPosition="left"
              >
                View Market Overview
              </Button>
            </div>
          </div>
        ) : (
          /* Empty State */
          (<div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="GitCompare" size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Select Two Scenarios to Compare
              </h3>
              <p className="text-muted-foreground mb-6">
                Choose scenarios from the dropdowns above to begin your comparative analysis. 
                You can compare tariff impacts, economic outcomes, and stakeholder effects side-by-side.
              </p>
              <Button
                variant="default"
                onClick={() => navigate('/tariff-simulation-builder')}
                iconName="Plus"
                iconPosition="left"
              >
                Create New Scenario
              </Button>
            </div>
          </div>)
        )}
      </main>
    </div>
  );
};

export default ScenarioComparison;