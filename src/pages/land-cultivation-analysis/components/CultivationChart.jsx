// src/pages/land-cultivation-analysis/components/CultivationChart.jsx

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceArea
} from "recharts";

const CultivationChart = ({ stateName, data, selectedYear }) => {
  if (!data || data.length === 0) return <p>No monthly data available.</p>;

  const formatTooltip = (value, name) => [`${value.toLocaleString()} Ha`, name];

  const formatYAxis = (value) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value;
  };

  // Season month background shading
  const kharifStart = data.findIndex(item => item.month === "June");
  const kharifEnd = data.findIndex(item => item.month === "September");
  const rabiStart = data.findIndex(item => item.month === "November");
  const rabiEnd = data.findIndex(item => item.month === "February");

  return (
    <div className="bg-white rounded-lg border border-border p-6">
      <h3 className="text-center text-lg font-semibold text-foreground mb-6">
        {stateName}: Seasonal Monthly Cultivation Trend ({selectedYear})
      </h3>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />

            {/* Seasonal Highlights */}
            {kharifStart !== -1 && kharifEnd !== -1 && (
              <ReferenceArea x1={data[kharifStart].month} x2={data[kharifEnd].month} fill="#E1F5FE" opacity={0.3} />
            )}
            {rabiStart !== -1 && rabiEnd !== -1 && (
              <ReferenceArea x1={data[rabiStart].month} x2={data[rabiEnd].month} fill="#FFF3E0" opacity={0.3} />
            )}

            <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />

            <YAxis
              tickFormatter={formatYAxis}
              stroke="#6B7280"
              fontSize={12}
              label={{ value: "Area (Ha)", angle: -90, position: "insideLeft", fill: "#6B7280" }}
            />

            <Tooltip
              formatter={formatTooltip}
              labelStyle={{ color: "#1F2937" }}
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #E5E7EB",
                borderRadius: "8px"
              }}
            />

            <Legend />

            <Bar dataKey="cultivableLand" name="Cultivable Land (Target)" fill="#1D4ED8" barSize={22} />
            <Bar dataKey="actualCultivated" name="Actual Cultivated" fill="#93C5FD" barSize={22} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="text-xs text-muted-foreground mt-2 text-center">
       The data presented is generated using a hybrid methodology, combining the officially reported figures for Target (Cultivable Land) and Achieved (Actual Cultivated) area between 2021 and 2023 with synthetic data projections for historical (2018–2020) and future (2024–2026) periods. The synthetic projections were developed by analyzing the seasonal patterns, regional characteristics, and historical performance of each individual state, ensuring that the extrapolated trends reflect state-specific growth ambitions and operational constraints.
      </div>
    </div>
  );
};

export default CultivationChart;