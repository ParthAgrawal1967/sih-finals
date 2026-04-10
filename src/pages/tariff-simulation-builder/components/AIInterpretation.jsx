import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Icon from "../../../components/AppIcon";

const AIInterpretation = ({ interpretation, isInterpreting }) => {
  const splitIntoInsightCards = (text = "") => {
    if (!text.trim()) return [];

    const normalized = text.replace(/\r\n/g, "\n").trim();

    // Prefer markdown headings as logical card boundaries.
    const hasHeadings = /^#{1,6}\s+/m.test(normalized);
    if (hasHeadings) {
      const sections = normalized
        .split(/(?=^#{1,6}\s+)/m)
        .map((chunk) => chunk.trim())
        .filter(Boolean);

      return sections;
    }

    // Fallback: chunk by paragraphs.
    return normalized
      .split(/\n\s*\n/)
      .map((chunk) => chunk.trim())
      .filter(Boolean);
  };

  const insightCards = splitIntoInsightCards(interpretation);

  const cardThemes = [
    "bg-[#c6dbef] text-slate-900 border-blue-200 shadow-[0_8px_20px_-12px_rgba(59,130,246,0.35)]",
    "bg-gradient-to-br from-blue-50 to-cyan-100 text-blue-900 border-blue-200 shadow-[0_8px_20px_-12px_rgba(56,189,248,0.6)]",
    "bg-white text-slate-900 border-blue-100 shadow-[0_8px_20px_-12px_rgba(15,23,42,0.25)]",
  ];

  return (
    <div className="bg-card border border-blue-200/70 dark:border-blue-900/60 rounded-lg overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-blue-200/70 dark:border-blue-900/60 bg-gradient-to-r from-blue-50 via-indigo-50 to-cyan-50 dark:from-blue-950/50 dark:via-indigo-950/40 dark:to-cyan-950/40">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Icon name="Sparkles" size={20} className="text-blue-600 dark:text-blue-300" />
            <div>
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                AI Interpretation & Insights
              </h3>
              <p className="text-xs text-blue-700/80 dark:text-blue-200/80">
                Intelligent narrative generated from simulation outputs
              </p>
            </div>
          </div>
          {!isInterpreting && insightCards.length > 0 && (
            <span className="hidden md:inline-flex items-center rounded-full bg-blue-100 text-blue-700 border border-blue-200 px-2.5 py-1 text-xs font-semibold">
              {insightCards.length} insight cards
            </span>
          )}
        </div>
      </div>

      {/* LOADING STATE */}
      {isInterpreting && (
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-pulse">
            {[0, 1, 2].map((k) => (
              <div
                key={k}
                className={[
                  "rounded-xl border p-5 min-h-[130px]",
                  k === 0 ? "bg-blue-100/70 border-blue-200" : k === 1 ? "bg-cyan-50 border-cyan-200" : "bg-white border-slate-200",
                ].join(" ")}
              >
                <div className="h-4 w-1/2 bg-white/70 rounded mb-3" />
                <div className="h-3 w-full bg-white/70 rounded mb-2" />
                <div className="h-3 w-5/6 bg-white/70 rounded" />
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-4">Generating interpretation...</p>
        </div>
      )}

      {/* FINAL MARKDOWN OUTPUT */}
      {!isInterpreting && interpretation && (
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insightCards.map((section, idx) => (
              <div
                key={idx}
                className={`rounded-xl border p-5 ${cardThemes[idx % cardThemes.length]}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon
                    name={idx % 3 === 0 ? "Brain" : idx % 3 === 1 ? "Lightbulb" : "BarChart3"}
                    size={16}
                    className="text-blue-600"
                  />
                  <span className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                    Insight {idx + 1}
                  </span>
                </div>

                <div
                  className="prose prose-sm max-w-none leading-7 prose-headings:text-slate-900 prose-headings:mb-3 prose-headings:leading-7 prose-p:text-slate-700 prose-p:leading-7 prose-p:my-3 prose-strong:text-slate-900 prose-li:text-slate-700 prose-li:my-1 prose-li:leading-7 prose-ul:my-3 prose-ol:my-3"
                >
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {section}
                  </ReactMarkdown>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ERROR STATE */}
      {!isInterpreting && !interpretation && (
        <div className="p-6">
          <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-5 shadow-[0_8px_20px_-12px_rgba(56,189,248,0.45)]">
            <p className="text-blue-700 font-medium">No interpretation available.</p>
            <p className="text-sm text-blue-600/80 mt-1">
              Run a simulation to generate AI-based insights and recommendations.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIInterpretation;
