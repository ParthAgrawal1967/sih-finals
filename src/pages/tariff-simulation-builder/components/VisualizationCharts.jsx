import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Icon from "../../../components/AppIcon";

const num = (v, fallback = 0) => {
  if (v === null || v === undefined) return fallback;
  if (typeof v === "number" && !Number.isNaN(v)) return v;
  if (typeof v === "string" && !Number.isNaN(Number(v))) return Number(v);
  return fallback;
};

const VisualizationCharts = ({ simulationData, isLoading }) => {
  const monthly =
    simulationData?.monthly_outputs ||
    simulationData?.time_series ||
    simulationData?.monthly ||
    [];

  // month name mapping (month_index expected 1..12)
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // build chart data with numeric safety
  const chartData = monthly
    .map((m) => {
      const mi = m?.month_index ?? m?.month ?? null;
      const monthLabel =
        typeof mi === "number" ? monthNames[mi - 1] || `M${mi}` : (typeof mi === "string" ? mi : "M");

      return {
        month: monthLabel,
        imports: num(m?.predicted_imports_tonnes, null),
        landed_cost: num(m?.landed_cost_inr_per_tonne, null),
        farmer_price: num(m?.farmer_price_inr_per_tonne, null),
        dependency: num(m?.import_dependency_pct ?? m?.import_dependency, null),
      };
    })
    // filter out rows with no numeric payload (prevents Recharts path errors)
    .filter((r) => {
      // keep rows that have at least one numeric metric
      return (
        (typeof r.imports === "number" && !Number.isNaN(r.imports)) ||
        (typeof r.landed_cost === "number" && !Number.isNaN(r.landed_cost)) ||
        (typeof r.farmer_price === "number" && !Number.isNaN(r.farmer_price))
      );
    });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-6 animate-pulse">
            <div className="h-6 bg-muted w-1/3 mb-4"></div>
            <div className="h-64 bg-muted"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!chartData.length) {
    return (
      <div className="bg-card border border-border rounded-lg p-6 text-center text-muted-foreground">
        <div className="flex items-center justify-center space-x-2 mb-3">
          <Icon name="Info" size={18} />
          <h3 className="text-lg font-semibold">No chartable results yet</h3>
        </div>
        <p>Run a simulation to see time-series charts for imports, landed cost and farmer price.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* IMPORT VOLUME */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="TrendingUp" size={20} />
          <h3 className="text-lg font-semibold">Predicted Import Volume</h3>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="imports" stroke="#0066cc" strokeWidth={3} name="Imports (T)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* LANDED COST */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="DollarSign" size={20} />
          <h3 className="text-lg font-semibold">Landed Cost Per Tonne</h3>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="landed_cost" stroke="#ff6600" strokeWidth={3} name="Landed Cost (INR/T)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default VisualizationCharts;
