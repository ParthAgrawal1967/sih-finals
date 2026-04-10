import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Icon from "../../../components/AppIcon";
import "./SimulationControls.css";

const SimulationControls = ({
  tariffChange,
  setTariffChange,
  timeHorizon,
  setTimeHorizon,
  scenarioType,
  setScenarioType,
  scenarioParams,
  setScenarioParams,
  onRunSimulation,
  onCompareScenarios,
  isLoading,
}) => {

  const [sliderValue, setSliderValue] = useState(tariffChange);

  const timeHorizonOptions = [
    { value: 1, label: "1 Month" },
    { value: 2, label: "2 Months" },
    { value: 3, label: "3 Months" },
    { value: 4, label: "4 Months" },
    { value: 5, label: "5 Months" },
    { value: 6, label: "6 Months" },
    { value: 7, label: "7 Months" },
    { value: 8, label: "8 Months" },
    { value: 9, label: "9 Months" },
    { value: 10, label: "10 Months" },
    { value: 11, label: "11 Months" },
    { value: 12, label: "12 Months" }
  ];

  const scenarioOptions = [
    { value: "baseline", label: "Baseline Simulation" },
    { value: "subsidy", label: "Subsidy Simulation" },
    { value: "weather", label: "Weather Shock" },
    { value: "political", label: "Political / Policy Shock" },
    { value: "commodity", label: "Commodity International Shock" },
  ];

  const handleSliderChange = (e) => {
    const value = parseFloat(e.target.value);
    setSliderValue(value);
    setTariffChange(value);
  };

  const handleInputChange = (e) => {
    const raw = parseFloat(e.target.value);
    const value = isNaN(raw) ? 0 : raw;
    const clamped = Math.max(-50, Math.min(50, value));
    setSliderValue(clamped);
    setTariffChange(clamped);
  };

  const updateParam = (key, value) => {
    setScenarioParams({
      ...scenarioParams,
      [key]: value
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-sm">

      {/* HEADER */}
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Settings" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">
          Simulation Parameters
        </h2>
      </div>

      {/* ====== NEW: SCENARIO TYPE SELECT (Full width) ====== */}
      <div className="mb-6">
        <Select
          label="Simulation Scenario"
          value={scenarioType}
          onChange={(val) => {
            setScenarioType(val);
            setScenarioParams({});
          }}
          options={scenarioOptions}
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* LEFT SIDE — Tariff Controls */}
        <div className="space-y-4">

          {/* Tariff Label */}
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-foreground">
              Tariff Adjustment
            </label>
            <span className={`text-lg font-bold ${
              sliderValue > 0 ? "text-error" :
              sliderValue < 0 ? "text-success" :
              "text-muted-foreground"
            }`}>
              {sliderValue > 0 ? "+" : ""}{sliderValue.toFixed(1)}%
            </span>
          </div>

          {/* Slider */}
          <div className="relative">
            <input
              type="range"
              min="-50"
              max="50"
              step="0.1"
              value={sliderValue}
              onChange={handleSliderChange}
              disabled={isLoading}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>-50%</span>
              <span>0%</span>
              <span>+50%</span>
            </div>
          </div>

          {/* Manual Input */}
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              value={sliderValue}
              onChange={handleInputChange}
              min="-50"
              max="50"
              step="0.1"
              className="flex-1"
              disabled={isLoading}
            />
            <span className="text-sm text-muted-foreground">%</span>
          </div>

          {/* Indicator */}
          <div className="flex items-center space-x-2 p-3 bg-muted/50 rounded-md">
            <Icon
              name={
                sliderValue > 0 ? "TrendingUp" :
                sliderValue < 0 ? "TrendingDown" :
                "Minus"
              }
              size={16}
              className={
                sliderValue > 0 ? "text-error" :
                sliderValue < 0 ? "text-success" :
                "text-muted-foreground"
              }
            />
            <span className="text-sm text-muted-foreground">
              {sliderValue > 0
                ? "Tariff Increase"
                : sliderValue < 0
                ? "Tariff Reduction"
                : "No Change"}
            </span>
          </div>

          {/* ===== CONDITIONAL PARAMETERS ===== */}

          {scenarioType === "subsidy" && (
            <div className="space-y-2 pt-2">
              <Input
                label="Total Monthly Subsidy Budget (₹)"
                type="number"
                value={scenarioParams.total_subsidy_budget || ""}
                onChange={(e) => updateParam("total_subsidy_budget", Number(e.target.value))}
              />
              <Input
                label="Production Responsiveness α"
                type="number"
                step="0.01"
                value={scenarioParams.alpha || ""}
                onChange={(e) => updateParam("alpha", Number(e.target.value))}
              />
            </div>
          )}

          {scenarioType === "weather" && (
            <div className="pt-2">
              <Input
                label="Weather Index (0–1)"
                type="number"
                step="0.01"
                value={scenarioParams.weather_index || ""}
                onChange={(e) => updateParam("weather_index", Number(e.target.value))}
              />
            </div>
          )}

          {scenarioType === "political" && (
            <div className="pt-2">
              <Input
                label="Tariff Shock (%)"
                type="number"
                value={scenarioParams.tariff_shock || ""}
                onChange={(e) => updateParam("tariff_shock", Number(e.target.value))}
              />
            </div>
          )}

          {scenarioType === "commodity" && (
            <div className="pt-2">
              <Input
                label="Global Shock Magnitude (%)"
                type="number"
                value={scenarioParams.global_shock_pct || ""}
                onChange={(e) => updateParam("global_shock_pct", Number(e.target.value))}
              />
            </div>
          )}

        </div>

        {/* RIGHT SIDE — Time Horizon + Buttons */}
        <div className="space-y-4">
          <Select
            label="Projection Time Horizon"
            options={timeHorizonOptions}
            value={timeHorizon}
            onChange={setTimeHorizon}
            disabled={isLoading}
          />

          <div className="space-y-3 pt-4">
            <Button
              variant="default"
              size="lg"
              fullWidth
              onClick={onRunSimulation}
              loading={isLoading}
              iconName="Play"
              iconPosition="left"
              disabled={isLoading}
            >
              Run Simulation
            </Button>

            <Button
              variant="outline"
              size="lg"
              fullWidth
              onClick={onCompareScenarios}
              iconName="GitCompare"
              iconPosition="left"
              disabled={isLoading}
            >
              Compare Scenarios
            </Button>
          </div>

          {/* Presets */}
          <div className="pt-2">
            <p className="text-xs text-muted-foreground mb-2">Quick Presets:</p>
            <div className="grid grid-cols-3 gap-2">
              {[-10, 0, 10].map((preset) => (
                <Button
                  key={preset}
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSliderValue(preset);
                    setTariffChange(preset);
                  }}
                  disabled={isLoading}
                  className="text-xs"
                >
                  {preset > 0 ? "+" : ""}{preset}%
                </Button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SimulationControls;
