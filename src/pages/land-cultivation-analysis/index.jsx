// src/pages/land-cultivation-analysis/index.jsx

import { useState, useEffect, useMemo } from 'react';
import CultivationChart from './components/CultivationChart';
import { fetchCultivationData } from './data/cultivationData';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import Select from '../../components/ui/Select.jsx';
import Button from '../../components/ui/Button';
import { useAuditLog } from "../../hooks/useAuditLog";

const LandCultivationAnalysis = () => {
  useAuditLog("Land Cultivation Analysis");
  const [allStateData, setAllStateData] = useState([]);
  const [selectedStateName, setSelectedStateName] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState('connected');
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    setLoading(true);
    setApiStatus('connecting');
    setRefreshing(true);
    try {
      const fetchedData = await fetchCultivationData();
      setAllStateData(fetchedData);

      if (fetchedData.length > 0) {
        setSelectedStateName(fetchedData[0].state);

        // Default year = last (latest)
        const defaultYear = fetchedData[0].yearlyData[fetchedData[0].yearlyData.length - 1].year;
        setSelectedYear(defaultYear);
      }

      setApiStatus('connected');
    } catch (err) {
      console.error('Failed to fetch data:', err);
      setError('Failed to load cultivation data.');
      setApiStatus('error');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const selectedStateData = allStateData.find((item) => item.state === selectedStateName);

  const availableYears = selectedStateData?.yearlyData?.map(item => item.year) || [];

  // Fetch monthly dataset based on selected year
  const monthlyChartData = selectedStateData?.yearlyData?.find(y => y.year === selectedYear)?.monthlyData || [];

  const latestYearStats = useMemo(() => {
    if (!selectedStateData || !selectedStateData.yearlyData?.length) return null;
    const latest = selectedStateData.yearlyData[selectedStateData.yearlyData.length - 1];
    return {
      year: latest.year,
      coverage: latest.actualCultivated ? ((latest.actualCultivated / latest.cultivableLand) * 100).toFixed(1) : 0,
      gap: latest.cultivableLand - latest.actualCultivated,
    };
  }, [selectedStateData]);

  const PageWrapper = ({ children }) => (
    <main className="container mx-auto px-4 sm:px-6 py-8">{children}</main>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TabNavigation />
      <PageWrapper>
        
        {/* Title Section */}
        <div className="flex flex-col lg:flex-row lg:justify-between mb-6">
          <h1 className="text-3xl font-bold">Land Cultivation Analysis</h1>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={loadData} iconName="RefreshCw">
              Refresh
            </Button>
          </div>
        </div>

        {/* Dropdown Filters */}
        <div className="bg-popover border rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* State Selector */}
            <Select
              label="Select State"
              options={allStateData.map((item) => ({ value: item.state, label: item.state }))}
              value={selectedStateName}
              onChange={(value) => { setSelectedStateName(value); setSelectedYear(""); }}
            />

            {/* YEAR Selector */}
            <Select
              label="Select Year"
              options={availableYears.map(y => ({ value: y, label: y.toString() }))}
              value={selectedYear}
              onChange={(value) => setSelectedYear(value)}
              placeholder="Select Year"
            />
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-card border rounded-lg p-6">
          {monthlyChartData.length > 0 ? (
            <CultivationChart
              stateName={selectedStateName}
              year={selectedYear}
              data={monthlyChartData}
            />
          ) : (
            <p className="text-center py-8 text-muted-foreground">
              Select a state and year to view monthly cultivation trends.
            </p>
          )}
        </div>

      </PageWrapper>
    </div>
  );
};

export default LandCultivationAnalysis;
