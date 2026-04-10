import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import ExportToolbar from '../../components/ui/ExportToolbar';
import AlertBanner from '../../components/ui/AlertBanner';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useAuditLog } from "../../hooks/useAuditLog";

// Import page-specific components
import ImpactSummaryCards from './components/ImpactSummaryCards';
import StakeholderTabs from './components/StakeholderTabs';
import AlertNotifications from './components/AlertNotifications';

const StakeholderImpactAnalysis = () => {
  useAuditLog("Stakeholder Impact Analysis");
  const [simulationData, setSimulationData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiStatus, setApiStatus] = useState('connected');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Mock simulation data for stakeholder analysis
  useEffect(() => {
    const mockData = {
      tariffChange: 15, // 15% tariff increase
      timeHorizon: 12, // 12 months
      marketVolatility: 0.18,
      importDependency: 0.57,
      economicImpact: {
        gdpChange: 0.012,
        inflationImpact: -0.008,
        employmentChange: 42500
      },
      stakeholderMetrics: {
        farmers: {
          incomeIncrease: 23.2,
          employmentGeneration: 42500,
          productivityGain: 15.6,
          cropProfitability: 18.5
        },
        consumers: {
          priceReduction: 13.4,
          householdSavings: 2640,
          volatilityReduction: 22.8,
          purchasingPowerIncrease: 5.8
        },
        government: {
          revenueIncrease: 18.5,
          tradeBalanceImprovement: 45.2,
          nmeoProgress: 8.3,
          policyEffectiveness: 87.2
        }
      },
      confidence: 0.89,
      lastSimulation: new Date(Date.now() - 1800000) // 30 minutes ago
    };

    // Simulate API loading
    setTimeout(() => {
      setSimulationData(mockData);
      setIsLoading(false);
      setLastUpdated(new Date());
    }, 1500);
  }, []);

  const handleRefreshData = () => {
    setIsLoading(true);
    setApiStatus('connecting');
    
    setTimeout(() => {
      setApiStatus('connected');
      setIsLoading(false);
      setLastUpdated(new Date());
    }, 2000);
  };

  const handleExportAnalysis = () => {
    // Export functionality would be implemented here
    console.log('Exporting stakeholder impact analysis...', simulationData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Loading Stakeholder Analysis - PalmTariff-AI</title>
        </Helmet>
        <Header />
        <TabNavigation />
        
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
            <h2 className="text-xl font-semibold text-foreground">Loading Stakeholder Impact Analysis</h2>
            <p className="text-muted-foreground">Processing ML model predictions and stakeholder data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Stakeholder Impact Analysis - PalmTariff-AI</title>
        <meta name="description" content="Comprehensive analysis of tariff policy impacts on farmers, consumers, and government stakeholders with AI-powered predictions and risk assessments." />
        <meta name="keywords" content="stakeholder analysis, tariff impact, policy assessment, farmer income, consumer prices, government revenue" />
      </Helmet>
      <Header />
      <TabNavigation />
      {/* Page Header */}
      <div className="bg-white border-b border-border">
        <div className="px-6 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon name="Users" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Stakeholder Impact Analysis</h1>
                <p className="text-muted-foreground">
                  Comprehensive assessment of tariff policy effects across key stakeholder groups
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefreshData}
                disabled={isLoading}
                iconName="RefreshCw"
                iconPosition="left"
              >
                Refresh Data
              </Button>
              <ExportToolbar simulationData={simulationData} />
            </div>
          </div>
        </div>
      </div>
      {/* Alert Banner */}
      <div className="px-6 py-4">
        <AlertBanner 
          simulationData={simulationData}
          riskThresholds={{ high: 0.15, medium: 0.10 }}
        />
      </div>
      {/* Main Content */}
      <div className="px-6 pb-8 space-y-8">
        {/* Impact Summary Cards */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Impact Summary Overview</h2>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Clock" size={16} />
              <span>Last updated: {lastUpdated?.toLocaleTimeString()}</span>
            </div>
          </div>
          <ImpactSummaryCards simulationData={simulationData} />
        </div>

        {/* Stakeholder Analysis Tabs */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Detailed Stakeholder Analysis</h2>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="Filter">
                Filter Analysis
              </Button>
              <Button variant="outline" size="sm" iconName="Settings">
                Configure Views
              </Button>
            </div>
          </div>
          <StakeholderTabs simulationData={simulationData} />
        </div>

        {/* Alert Notifications */}
        <div>
          <AlertNotifications simulationData={simulationData} />
        </div>

        {/* Analysis Metadata */}
        <div className="bg-white p-6 rounded-lg border border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {simulationData?.confidence ? (simulationData?.confidence * 100)?.toFixed(1) : '89.0'}%
              </div>
              <div className="text-sm text-muted-foreground">Model Confidence</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground mb-1">
                {simulationData?.tariffChange || 15}%
              </div>
              <div className="text-sm text-muted-foreground">Tariff Adjustment</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-foreground mb-1">
                {simulationData?.timeHorizon || 12}
              </div>
              <div className="text-sm text-muted-foreground">Months Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success mb-1">3</div>
              <div className="text-sm text-muted-foreground">Stakeholder Groups</div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 pt-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Analysis generated using weighted ensemble ML model (GRU + LSTM + XGBoost)
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" iconName="Share">
              Share Analysis
            </Button>
            <Button variant="outline" size="sm" iconName="Download" onClick={handleExportAnalysis}>
              Export Report
            </Button>
            <Button variant="default" size="sm" iconName="Calculator">
              Run New Simulation
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakeholderImpactAnalysis;