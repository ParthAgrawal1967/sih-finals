import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Icon from "../../components/AppIcon";

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const formatValue = (value, fallback = "N/A") => {
    if (value === null || value === undefined || value === "") return fallback;
    return value;
  };

  const formatPayload = (payload) => {
    if (!payload) return "No payload";

    const serialized =
      typeof payload === "string" ? payload : JSON.stringify(payload, null, 0);

    return serialized.length > 120 ? `${serialized.slice(0, 120)}...` : serialized;
  };

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("audit_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(200);

      if (error) setError(error.message);
      else setLogs(data || []);
      setLoading(false);
    };

    fetchLogs();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background px-6 py-6">
        <div className="bg-card border border-blue-200/70 dark:border-blue-900/60 rounded-lg overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-blue-200/70 dark:border-blue-900/60 bg-gradient-to-r from-blue-50 via-indigo-50 to-cyan-50 dark:from-blue-950/50 dark:via-indigo-950/40 dark:to-cyan-950/40">
            <div className="flex items-center gap-2">
              <Icon name="ShieldAlert" size={18} className="text-blue-600 dark:text-blue-300" />
              <div>
                <h1 className="text-base font-semibold text-blue-900 dark:text-blue-100">Audit Logs</h1>
                <p className="text-xs text-blue-700/80 dark:text-blue-200/80">
                  Fetching recent activity records
                </p>
              </div>
            </div>
          </div>
          <div className="p-6 text-muted-foreground">Loading audit logs...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background px-6 py-6">
        <div className="bg-card border border-red-200 rounded-lg p-6 text-red-600">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-6">
      <div className="bg-card border border-blue-200/70 dark:border-blue-900/60 rounded-lg overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-blue-200/70 dark:border-blue-900/60 bg-gradient-to-r from-blue-50 via-indigo-50 to-cyan-50 dark:from-blue-950/50 dark:via-indigo-950/40 dark:to-cyan-950/40">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Icon name="ShieldAlert" size={18} className="text-blue-600 dark:text-blue-300" />
              <div>
                <h1 className="text-base font-semibold text-blue-900 dark:text-blue-100">Audit Logs</h1>
                <p className="text-xs text-blue-700/80 dark:text-blue-200/80">
                  Recent activity, access trails, and system events
                </p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-blue-800 dark:text-blue-200 bg-blue-100/80 dark:bg-blue-900/40 px-2.5 py-1 rounded-full border border-blue-200/80 dark:border-blue-700/40">
              <Icon name="Rows" size={14} className="text-blue-700 dark:text-blue-300" />
              <span>{logs.length} rows</span>
            </div>
          </div>
        </div>

        <div className="overflow-auto max-h-[70vh]">
          <table className="min-w-full text-sm">
            <thead className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-indigo-600 text-white backdrop-blur border-b border-blue-700">
              <tr className="text-left">
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap">ID</th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap">User ID</th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap">Action</th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap">Page</th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap">Payload</th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap">IP Address</th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap">User Agent</th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap">Created</th>
                <th className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap">Email</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-blue-100 dark:divide-blue-900/50">
              {logs.map((log, idx) => (
                <tr
                  key={log.id}
                  className={[
                    "transition-colors duration-150",
                    idx % 2 === 0
                      ? "bg-white dark:bg-slate-950/30"
                      : "bg-blue-50/40 dark:bg-blue-950/20",
                    "hover:bg-cyan-50 dark:hover:bg-cyan-900/20",
                  ].join(" ")}
                >
                  <td className="px-4 py-3 whitespace-nowrap text-blue-900 dark:text-blue-100 font-medium">
                    <span className="inline-flex items-center justify-center min-w-8 h-7 px-2 rounded-md bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200 text-xs font-semibold border border-blue-200/80 dark:border-blue-800/50">
                      {formatValue(log.id)}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap tabular-nums text-slate-700 dark:text-slate-200">
                    {formatValue(log.userId)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="inline-flex items-center rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/50 px-2.5 py-1 text-xs font-semibold">
                      {formatValue(log.action)}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sky-700 dark:text-sky-300 font-medium">
                    {formatValue(log.page)}
                  </td>
                  <td
                    className="px-4 py-3 text-slate-600 dark:text-slate-300 max-w-[320px] truncate"
                    title={typeof log.payload === "string" ? log.payload : JSON.stringify(log.payload)}
                  >
                    {formatPayload(log.payload)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap tabular-nums text-emerald-700 dark:text-emerald-300 font-medium">
                    {formatValue(log.ip_address)}
                  </td>
                  <td className="px-4 py-3 text-slate-500 dark:text-slate-400 max-w-[260px] truncate" title={log.user_agent}>
                    {formatValue(log.user_agent)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-amber-700 dark:text-amber-300 font-medium">
                    {log.created_at ? new Date(log.created_at).toLocaleString() : "N/A"}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-fuchsia-700 dark:text-fuchsia-300 font-medium">
                    {formatValue(log.email)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
