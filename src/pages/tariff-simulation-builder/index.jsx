import { useState } from "react";  
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import TabNavigation from "../../components/ui/TabNavigation";
import ExportToolbar from "../../components/ui/ExportToolbar";
import SimulationControls from "./components/SimulationControls";
import VisualizationCharts from "./components/VisualizationCharts";
import KPICards from "./components/KPICards";
import AlertsSection from "./components/AlertsSection";
import AIInterpretation from "./components/AIInterpretation";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import { useAuditLog } from "../../hooks/useAuditLog";

const API_BASE = import.meta.env.VITE_REACT_API_BASE_URL || "http://127.0.0.1:8000";

const TariffSimulationBuilder = () => {
  useAuditLog("Tariff Simulation Builder");
  const navigate = useNavigate();

  const [tariffChange, setTariffChange] = useState(0);
  const [timeHorizon, setTimeHorizon] = useState(6);

  const [isLoading, setIsLoading] = useState(false);
  const [simulationData, setSimulationData] = useState(null);

  const [apiStatus, setApiStatus] = useState("connected");
  const [simulationStatus, setSimulationStatus] = useState("idle");

  const [scenarioType, setScenarioType] = useState("baseline");
  const [scenarioParams, setScenarioParams] = useState({});

  const [interpretation, setInterpretation] = useState("");
  const [isInterpreting, setIsInterpreting] = useState(false);


  const runInterpretation = async (simData) => {
    if (!simData) return;

    setIsInterpreting(true);
    setInterpretation("Generating AI insights…");

    try {
      const body = {
        tariff_change_pct: tariffChange,
        summary: simData.final_summary,
        monthly_outputs: simData.monthly_outputs,
      };

      const res = await fetch(`${API_BASE}/interpret`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Interpretation failed");

      const json = await res.json();
      setInterpretation(json.overview || "No interpretation available.");
    } catch (err) {
      console.error("AI interpretation error:", err);
      setInterpretation("⚠️ Unable to generate interpretation.");
    } finally {
      setIsInterpreting(false);
    }
  };


  /* -------------------------------
     RUN SIMULATION
  ----------------------------------*/
  const handleRunSimulation = async () => {
    setIsLoading(true);
    setSimulationStatus("processing");

    try {
      const body = {
        tariff_pct: tariffChange,
        horizon_months: timeHorizon,
        farmer_margin_pct: 10,
        scenario_type: scenarioType,
        scenario_parameters: scenarioParams,
      };

      const res = await fetch(`${API_BASE}/simulate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const txt = await res.text();
        console.error("API error:", txt);
        setApiStatus("error");
        throw new Error("Simulation failed");
      }

      const json = await res.json();

      const finalSummary = json.final_summary;
      const monthlyOutputs = json.monthly_outputs || json.time_series || [];

      const sim = {
        final_summary: finalSummary,
        monthly_outputs: monthlyOutputs,
      };

      setSimulationData(sim);
      setInterpretation("");

      runInterpretation(sim);

      setSimulationStatus("idle");
      setApiStatus("connected");
    } catch (err) {
      console.error("Simulation failed:", err);
      setSimulationStatus("error");
      setApiStatus("error");
    } finally {
      setIsLoading(false);
    }
  };


  const handleCompareScenarios = () => {
    navigate("/scenario-comparison", {
      state: { currentScenario: { tariffChange, timeHorizon, data: simulationData } },
    });
  };


  /* ⭐ EXPORT DATA PACKAGE (for PDF/Excel export) */
  const exportData = {
    tariffChange,
    timeHorizon,
    scenarioType,
    scenarioParams,
    simulationData,
    interpretation,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TabNavigation />

      <main className="container mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* Page header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Tariff Simulation Builder</h1>
            <p className="text-muted-foreground">
              Configure and execute economic impact scenarios for Crude Palm Oil import duties
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {/* ⭐ Pass exportData instead of only simulationData */}
            <ExportToolbar simulationData={exportData} />
          </div>
        </div>

        {/* Simulation Controls */}
        <SimulationControls
          tariffChange={tariffChange}
          setTariffChange={setTariffChange}
          timeHorizon={timeHorizon}
          setTimeHorizon={setTimeHorizon}
          scenarioType={scenarioType}
          setScenarioType={setScenarioType}
          scenarioParams={scenarioParams}
          setScenarioParams={setScenarioParams}
          onRunSimulation={handleRunSimulation}
          onCompareScenarios={handleCompareScenarios}
          isLoading={isLoading}
        />

        <KPICards simulationData={simulationData} isLoading={isLoading} />
        <AlertsSection simulationData={simulationData} tariffChange={tariffChange} />
        <VisualizationCharts simulationData={simulationData} isLoading={isLoading} />

        <AIInterpretation interpretation={interpretation} isInterpreting={isInterpreting} />

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Zap" size={20} className="text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" iconName="TrendingUp" onClick={() => navigate("/nmeo-op-progress-tracker")}>
              NMEO-OP Tracker
            </Button>
            <Button variant="outline" iconName="BarChart3" onClick={() => navigate("/overview-dashboard")}>
              Simulator
            </Button>
            <Button
              variant="outline"
              iconName="RotateCcw"
              onClick={() => {
                setTariffChange(0);
                setSimulationData(null);
                setInterpretation("");
              }}
            >
              Reset Simulation
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TariffSimulationBuilder;
