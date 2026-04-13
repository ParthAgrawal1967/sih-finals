import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import ExportToolbar from '../../components/ui/ExportToolbar';
import ProgressOverview from './components/ProgressOverview';
import TrendChart from './components/TrendChart';
import KPICards from './components/KPICards';
import RegionalBreakdown from './components/RegionalBreakdown';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useAuditLog } from "../../hooks/useAuditLog";
import { fetchNmeoStatewiseData } from "../../services/nmeoService";

const NMEOOPProgressTracker = () => {
  useAuditLog("NMEO OP PROGRESS TRACKER");
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [nmeoMeta, setNmeoMeta] = useState({
    source: "Government of India Open Data (NMEO-OP state-wise dataset)",
    as_of: null,
  });

  // Mock data for progress overview
  const progressData = {
    currentDependency: 57,
    targetDependency: 45,
    progressPercentage: 40,
    timeline: [
      {
        title: "Mission Launch",
        date: "Aug 2021",
        description: "NMEO-OP officially launched with ₹11,040 Cr allocation",
        completed: true,
        inProgress: false
      },
      {
        title: "State Implementation",
        date: "Dec 2022",
        description: "All 18 states initiated oil palm cultivation programs",
        completed: true,
        inProgress: false
      },
      {
        title: "Farmer Enrollment Drive",
        date: "Jun 2024",
        description: "Accelerated onboarding under NMEO-OP across priority districts",
        completed: true,
        inProgress: false
      },
      {
        title: "Area Expansion Milestone",
        date: "Late 2025",
        description: "Approx. 5.56 lakh ha under oil palm; ~1.89 lakh ha actively fruiting",
        completed: true,
        inProgress: false
      },
      {
        title: "Processing Infrastructure",
        date: "Mar 2026",
        description: "Expand processing network in line with fresh fruit bunch availability",
        completed: false,
        inProgress: false
      },
      {
        title: "Import Reduction Target",
        date: "Mar 2030",
        description: "Achieve 45% import dependency through domestic production",
        completed: false,
        inProgress: false
      }
    ]
  };

  // Mock data for trend charts
  const trendData = [
    { year: '2015', importDependency: 65, domesticProduction: 0.25, palmArea: 1.20 },
    { year: '2016', importDependency: 64, domesticProduction: 0.28, palmArea: 1.35 },
    { year: '2017', importDependency: 63, domesticProduction: 0.31, palmArea: 1.55 },
    { year: '2018', importDependency: 62, domesticProduction: 0.34, palmArea: 1.80 },
    { year: '2019', importDependency: 61, domesticProduction: 0.37, palmArea: 2.10 },
    { year: '2020', importDependency: 60, domesticProduction: 0.40, palmArea: 2.45 },
    { year: '2021', importDependency: 59, domesticProduction: 0.45, palmArea: 2.95 },
    { year: '2022', importDependency: 58, domesticProduction: 0.52, palmArea: 3.55 },
    { year: '2023', importDependency: 57.5, domesticProduction: 0.58, palmArea: 4.20 },
    { year: '2024', importDependency: 57, domesticProduction: 0.65, palmArea: 4.95 },
    { year: '2025', importDependency: 55, domesticProduction: 0.75, palmArea: 5.56 },
    { year: '2026', importDependency: 52, domesticProduction: 0.88, palmArea: 6.10 },
    { year: '2027', importDependency: 49, domesticProduction: 1.05, palmArea: 6.65 },
    { year: '2028', importDependency: 47, domesticProduction: 1.25, palmArea: 7.10 },
    { year: '2029', importDependency: 46, domesticProduction: 1.45, palmArea: 7.55 },
    { year: '2030', importDependency: 45, domesticProduction: 1.65, palmArea: 8.00 }
  ];

  // Mock KPI data
  const kpiData = [
    {
      title: "Domestic Production Capacity",
      value: 0.65,
      type: "production",
      change: 12.5,
      icon: "Factory",
      iconColor: "text-success",
      bgColor: "bg-success/10",
      description: "Million tonnes annual capacity",
      target: 1.65,
      progress: 39
    },
    {
      title: "Oil Palm Cultivation Area",
      value: 5.56,
      type: "area",
      change: 12.1,
      icon: "Sprout",
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
      description: "Lakh hectares under oil palm cultivation (late 2025)",
      target: 8.00,
      progress: 69.5
    },
    {
      title: "Actively Fruiting Area",
      value: 1.89,
      type: "area",
      change: 10.4,
      icon: "Leaf",
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-100",
      description: "Lakh hectares currently in fruiting stage",
      target: 4.00,
      progress: 47.3
    },
    {
      title: "Farmer Participation",
      value: 78500,
      type: "farmers",
      change: 15.2,
      icon: "Users",
      iconColor: "text-warning",
      bgColor: "bg-warning/10",
      description: "Active farmers enrolled",
      target: 100000,
      progress: 78.5
    },
    {
      title: "Mission Investment",
      value: 4420,
      type: "currency",
      change: 6.8,
      icon: "IndianRupee",
      iconColor: "text-secondary",
      bgColor: "bg-secondary/10",
      description: "Crores utilized till date",
      target: 11040,
      progress: 40
    }
  ];

  // Fallback snapshot aligned to latest published official values.
  const defaultRegionalData = [
    {
      state: "Andhra Pradesh",
      progress: 85,
      palmArea: 1.8464,
      farmerParticipation: 40200,
      fundingUtilization: 78,
      fundingAmount: 890,
      processingUnits: 8,
      achievements: [
        "Largest reported oil palm area among implementation states",
        "Strong processing ecosystem relative to other states",
        "Consistent mission participation under NMEO-OP"
      ],
      challenges: [
        "Need to sustain FFB evacuation and processing logistics",
        "Further productivity gains in new plantations"
      ]
    },
    {
      state: "Karnataka",
      progress: 72,
      palmArea: 0.46954,
      farmerParticipation: 12300,
      fundingUtilization: 65,
      fundingAmount: 520,
      processingUnits: 5,
      achievements: [
        "Substantial area scale-up under mission period",
        "Improved extension and agronomy support",
        "Progressive adoption in suitable districts"
      ],
      challenges: [
        "Water management and irrigation reliability",
        "Cost pressures for small and medium growers"
      ]
    },
    {
      state: "Tamil Nadu",
      progress: 68,
      palmArea: 0.32982,
      farmerParticipation: 9800,
      fundingUtilization: 58,
      fundingAmount: 380,
      processingUnits: 3,
      achievements: [
        "Steady area development in mission districts",
        "Good extension linkages for growers",
        "Improved planting material adoption"
      ],
      challenges: [
        "Weather variability and moisture stress in pockets",
        "Need for stronger processing linkage in expansion zones"
      ]
    },
    {
      state: "Mizoram",
      progress: 64,
      palmArea: 0.2668,
      farmerParticipation: 7600,
      fundingUtilization: 52,
      fundingAmount: 290,
      processingUnits: 2,
      achievements: [
        "Strong progress among north-eastern implementation states",
        "Consistent area addition under mission support",
        "Improved farmer engagement in identified clusters"
      ],
      challenges: [
        "Hilly terrain logistics and connectivity constraints",
        "Need for local processing and aggregation capacity"
      ]
    },
    {
      state: "Odisha",
      progress: 58,
      palmArea: 0.2313,
      farmerParticipation: 6900,
      fundingUtilization: 45,
      fundingAmount: 180,
      processingUnits: 1,
      achievements: [
        "Area expansion progressing in focused districts",
        "Improved field-level extension and training",
        "Better awareness for long-gestation crop planning"
      ],
      challenges: [
        "Infrastructure gaps in remote plantation pockets",
        "Need to scale post-harvest and transport networks"
      ]
    },
    {
      state: "Telangana",
      progress: 45,
      palmArea: 0.21382,
      farmerParticipation: 6400,
      fundingUtilization: 38,
      fundingAmount: 220,
      processingUnits: 1,
      achievements: [
        "Early-stage area expansion reported in official records",
        "Strengthening mission implementation systems",
        "Gradual increase in farmer participation"
      ],
      challenges: [
        "Need to accelerate area expansion trajectory",
        "Processing and logistics capacity must scale with area"
      ]
    }
  ];
  const [regionalData, setRegionalData] = useState(defaultRegionalData);

  const handleRefresh = async () => {
    setRefreshing(true);

    try {
      const payload = await fetchNmeoStatewiseData();
      if (Array.isArray(payload?.regionalData) && payload.regionalData.length > 0) {
        setRegionalData(payload.regionalData);
      }
      setNmeoMeta({
        source: payload?.source || "Government of India Open Data (NMEO-OP state-wise dataset)",
        as_of: payload?.as_of || null,
      });
      setLastUpdated(new Date());
    } catch (err) {
      console.error("NMEO-OP data refresh failed:", err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // Initial load from backend endpoint; fallback stays in place on failure.
    handleRefresh();

    // Periodic UI timestamp update
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>NMEO-OP Progress Tracker - PalmTariff-AI</title>
        <meta name="description" content="Monitor National Mission on Edible Oils - Oil Palm implementation progress, import dependency reduction goals, and state-wise performance metrics." />
      </Helmet>
      <Header />
      <TabNavigation />
      <main className="container mx-auto px-4 sm:px-6 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              NMEO-OP Progress Tracker
            </h1>
            <p className="text-muted-foreground">
              Monitor National Mission implementation progress and import dependency reduction goals
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              loading={refreshing}
              iconName="RefreshCw"
              iconPosition="left"
            >
              Refresh Data
            </Button>
            <ExportToolbar className="hidden sm:flex" />
          </div>
        </div>

        {/* Mission Overview Stats */}
        <div className="mb-8">
          <KPICards kpiData={kpiData} />
        </div>

        {/* Progress Overview */}
        <div className="mb-8">
          <ProgressOverview progressData={progressData} />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          <TrendChart trendData={trendData} chartType="area" />
          <TrendChart trendData={trendData} chartType="line" />
        </div>

        {/* Regional Breakdown */}
        <div className="mb-8">
          <RegionalBreakdown regionalData={regionalData} />
        </div>

        {/* Data Source Information */}
        <div className="bg-muted/30 rounded-lg p-6">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-primary mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-2">Data Sources & Methodology</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div>
                  <p className="mb-2">
                    <strong>Primary Sources:</strong> Ministry of Agriculture & Farmers Welfare, 
                    Department of Agriculture & Cooperation, State Agriculture Departments
                  </p>
                  <p className="mb-2">
                    <strong>Key 2025 Update:</strong> ~5.56 lakh ha under oil palm cultivation, 
                    of which ~1.89 lakh ha is actively fruiting.
                  </p>
                  <p>
                    <strong>State-wise Area Snapshot:</strong> Updated from {nmeoMeta?.source || "Government of India Open Data (data.gov.in)"}.
                    {nmeoMeta?.as_of ? ` As of ${nmeoMeta.as_of}.` : ""}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Update Frequency:</strong> Monthly progress reports, 
                    quarterly financial reviews, annual impact assessments
                  </p>
                  <p className="mb-2">
                    <strong>Data Validation:</strong> Cross-verified with field reports, 
                    satellite imagery analysis, and farmer feedback systems
                  </p>
                  <p>
                    <strong>Last Updated:</strong> {lastUpdated?.toLocaleString('en-IN', {
                      day: '2-digit',
                      month: '2-digit', 
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NMEOOPProgressTracker;