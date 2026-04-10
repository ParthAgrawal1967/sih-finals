import { useState } from 'react';
import Header from '../../components/ui/Header';
import TabNavigation from '../../components/ui/TabNavigation';
import ExportToolbar from '../../components/ui/ExportToolbar';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import PolicyQnA from "./components/PolicyQnA";
import { useAuditLog } from "../../hooks/useAuditLog";



const API_BASE =
  import.meta.env.VITE_REACT_API_BASE_URL || "http://127.0.0.1:8000";

const PRODUCERS = ["Indonesia", "Malaysia", "Thailand", "Colombia", "Nigeria"];
const WEATHER = ["GOOD", "NORMAL", "BAD"];

const OverviewDashboard = () => {
  useAuditLog("Global Policy Simulator");

  const [apiStatus, setApiStatus] = useState("connected");
  const [simulationStatus, setSimulationStatus] = useState("idle");

  const [horizon, setHorizon] = useState(6);
  const [tariffPct, setTariffPct] = useState(15);
  const [seed, setSeed] = useState(42);

  const [country, setCountry] = useState("");
  const [weather, setWeather] = useState("");

  const [timeline, setTimeline] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const runSimulation = async () => {
    setIsLoading(true);
    setSimulationStatus("processing");

    try {
      const actions = Array.from({ length: horizon }, () => ({
        tariff_pct: Number(tariffPct),
        ...(country && weather && {
          force_weather: { country, state: weather }
        })
      }));

      const res = await fetch(`${API_BASE}/overview/simulate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          horizon,
          actions,
          seed
        })
      });

      if (!res.ok) throw new Error("Simulation failed");

      const json = await res.json();
      setTimeline(json.timeline || []);
      setApiStatus("connected");
      setSimulationStatus("idle");
    } catch (err) {
      console.error(err);
      setApiStatus("error");
      setSimulationStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  const latest = timeline[timeline.length - 1];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <TabNavigation />

      <div className="px-6 py-6 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              Global Policy Simulator
            </h1>
            <p className="text-muted-foreground mt-1">
              Multi-country palm oil policy sandbox with stochastic shocks
            </p>
          </div>

          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <ExportToolbar simulationData={{ timeline, horizon, tariffPct }} />
          </div>
        </div>

        {/* Controls */}
        <div className="bg-card border border-border rounded-lg p-6 space-y-4">
          <div className="flex items-center space-x-2">
            <Icon name="Settings" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold">Simulation Controls</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Horizon (months)</label>
              <input
                type="number"
                value={horizon}
                min={1}
                max={24}
                onChange={e => setHorizon(Number(e.target.value))}
                className="w-full h-10 border rounded px-3"
              />
            </div>

            <div>
              <label className="text-sm font-medium">India Tariff (%)</label>
              <input
                type="number"
                value={tariffPct}
                onChange={e => setTariffPct(e.target.value)}
                className="w-full h-10 border rounded px-3"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Random Seed</label>
              <input
                type="number"
                value={seed}
                onChange={e => setSeed(e.target.value)}
                className="w-full h-10 border rounded px-3"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Force Weather (Country)</label>
              <select
                value={country}
                onChange={e => setCountry(e.target.value)}
                className="w-full h-10 border rounded px-3"
              >
                <option value="">None</option>
                {PRODUCERS.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Weather State</label>
              <select
                value={weather}
                onChange={e => setWeather(e.target.value)}
                className="w-full h-10 border rounded px-3"
                disabled={!country}
              >
                <option value="">None</option>
                {WEATHER.map(w => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <Button
                size="lg"
                fullWidth
                iconName="Play"
                onClick={runSimulation}
                loading={isLoading}
              >
                Run Simulation
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        {latest && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card border rounded p-4">
              <p className="text-xs text-muted-foreground">Global Price</p>
              <p className="text-xl font-semibold">${latest.global_price_usd}/t</p>
            </div>
            <div className="bg-card border rounded p-4">
              <p className="text-xs text-muted-foreground">India Imports</p>
              <p className="text-xl font-semibold">
                {latest.india_imports.toLocaleString()} t
              </p>
            </div>
            <div className="bg-card border rounded p-4">
              <p className="text-xs text-muted-foreground">Govt Revenue</p>
              <p className="text-xl font-semibold">
                ₹{latest.govt_revenue.toLocaleString()}
              </p>
            </div>
          </div>
        )}
        

        {/* Table */}
        {timeline.length > 0 && (
          <div className="bg-card border border-blue-200/70 dark:border-blue-900/60 rounded-lg overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-blue-200/70 dark:border-blue-900/60 bg-gradient-to-r from-blue-50 via-indigo-50 to-cyan-50 dark:from-blue-950/50 dark:via-indigo-950/40 dark:to-cyan-950/40">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Icon name="Table" size={18} className="text-blue-600 dark:text-blue-300" />
                  <div>
                    <h3 className="text-base font-semibold text-blue-900 dark:text-blue-100">Simulation Timeline</h3>
                    <p className="text-xs text-blue-700/80 dark:text-blue-200/80">
                      Month-by-month outputs for the selected horizon
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex items-center gap-2 text-xs text-blue-800 dark:text-blue-200 bg-blue-100/80 dark:bg-blue-900/40 px-2.5 py-1 rounded-full border border-blue-200/80 dark:border-blue-700/40">
                  <Icon name="Rows" size={14} className="text-blue-700 dark:text-blue-300" />
                  <span>{timeline.length} rows</span>
                </div>
              </div>
            </div>

            <div className="overflow-auto max-h-[420px]">
              <table className="min-w-full text-sm">
                <thead className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white backdrop-blur border-b border-blue-700">
                  <tr>
                    <th className="text-left px-6 py-3 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap">
                      Month
                    </th>
                    <th className="text-right px-6 py-3 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap">
                      Global ($/t)
                    </th>
                    <th className="text-right px-6 py-3 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap">
                      India imports (t)
                    </th>
                    <th className="text-right px-6 py-3 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap">
                      Retail (₹)
                    </th>
                    <th className="text-right px-6 py-3 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap">
                      CFPI
                    </th>
                    <th className="text-right px-6 py-3 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap">
                      Freight
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-100 dark:divide-blue-900/50">
                  {timeline.map((r, idx) => (
                    <tr
                      key={r.month ?? idx}
                      className={[
                        "transition-colors duration-150",
                        idx % 2 === 0
                          ? "bg-white dark:bg-slate-950/30"
                          : "bg-blue-50/40 dark:bg-blue-950/20",
                        "hover:bg-cyan-50 dark:hover:bg-cyan-900/20",
                      ].join(" ")}
                    >
                      <td className="px-6 py-3 whitespace-nowrap font-medium text-blue-900 dark:text-blue-100">
                        <span className="inline-flex items-center justify-center min-w-8 h-7 px-2 rounded-md bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200 text-xs font-semibold border border-blue-200/80 dark:border-blue-800/50">
                          {r.month}
                        </span>
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-right tabular-nums text-indigo-700 dark:text-indigo-300 font-medium">
                        {typeof r.global_price_usd === "number"
                          ? r.global_price_usd.toFixed(2)
                          : r.global_price_usd}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-right tabular-nums text-emerald-700 dark:text-emerald-300 font-medium">
                        {typeof r.india_imports === "number"
                          ? r.india_imports.toLocaleString()
                          : r.india_imports}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-right tabular-nums text-fuchsia-700 dark:text-fuchsia-300 font-medium">
                        {typeof r.india_retail_price === "number"
                          ? r.india_retail_price.toLocaleString()
                          : r.india_retail_price}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-right tabular-nums text-amber-700 dark:text-amber-300 font-medium">
                        {typeof r.cfpi === "number" ? r.cfpi.toFixed(2) : r.cfpi}
                      </td>
                      <td className="px-6 py-3 whitespace-nowrap text-right tabular-nums text-sky-700 dark:text-sky-300 font-medium">
                        {typeof r.freight === "number" ? r.freight.toFixed(2) : r.freight}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OverviewDashboard;
