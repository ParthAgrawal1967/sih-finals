import React from "react";
import Icon from "../../../components/AppIcon";

const safeNum = (v, fallback = null) => {
  if (v === null || v === undefined) return fallback;
  if (typeof v === "number" && !Number.isNaN(v)) return v;
  if (typeof v === "string" && !Number.isNaN(Number(v))) return Number(v);
  return fallback;
};

const maybePercent = (v) => {
  const n = safeNum(v, null);
  if (n === null) return null;
  // if value is between 0 and 1, assume fraction -> convert to percent
  return n > 0 && n <= 1 ? n * 100 : n;
};

const KPICards = ({ simulationData, isLoading }) => {
  const summary = simulationData?.final_summary || {};

  const landedCost = safeNum(summary?.landed_cost_inr_per_tonne, null);
  const globalPrice = safeNum(summary?.global_price_usd_per_tonne, null);
  const govtRevenue = safeNum(summary?.government_revenue_inr, null);
  const predictedImports = safeNum(summary?.predicted_imports_tonnes, null);
  const farmerPrice = safeNum(summary?.farmer_price_inr_per_tonne, null);
  const importDepRaw = summary?.import_dependency_pct ?? summary?.import_dependency ?? null;
  const importDependency = maybePercent(importDepRaw);

  const kpiData = [
    {
      title: "CPO Landed Cost",
      value: landedCost,
      unit: "₹/T",
      icon: "TrendingUp",
      description: "Final landed cost after tariff impact",
    },
    {
      title: "Global CPO Price",
      value: globalPrice,
      unit: "$/T",
      icon: "DollarSign",
      description: "Benchmark international CPO price",
    },
    {
      title: "Government Revenue",
      value: govtRevenue !== null ? govtRevenue / 1e7 : null, // Crores
      unit: "Cr",
      icon: "PiggyBank",
      description: "Projected govt. revenue from tariff",
    },
    {
      title: "Predicted Imports",
      value: predictedImports,
      unit: "T",
      icon: "Ship",
      description: "Expected import volume",
    },
    {
      title: "Farmer Price",
      value: farmerPrice,
      unit: "₹/T",
      icon: "Home",
      description: "Expected farm-gate price",
    },
    {
      title: "Import Dependency",
      value: importDependency !== null ? Number(importDependency).toFixed(1) : null,
      unit: "%",
      icon: "Globe",
      description: "Share of imports in domestic supply",
    },
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-muted w-1/2 mb-3"></div>
            <div className="h-6 bg-muted w-3/4 mb-2"></div>
            <div className="h-3 bg-muted w-1/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpiData.map((kpi, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon name={kpi.icon} size={18} />
            </div>
          </div>

          <h3 className="text-sm text-muted-foreground">{kpi.title}</h3>

          <div className="flex items-baseline space-x-1">
            <span className="text-2xl font-bold text-foreground">
              {kpi.value !== null && kpi.value !== undefined ? (
                typeof kpi.value === "number" ? kpi.value.toLocaleString("en-IN") : kpi.value
              ) : (
                "--"
              )}
            </span>
            <span className="text-sm text-muted-foreground">{kpi.unit}</span>
          </div>

          <p className="text-xs text-muted-foreground">{kpi.description}</p>
        </div>
      ))}
    </div>
  );
};

export default KPICards;
