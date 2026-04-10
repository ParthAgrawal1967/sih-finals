import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";

const API_BASE = import.meta.env.VITE_REACT_API_BASE_URL || "http://127.0.0.1:8000";

const PolicyQnA = ({ timeline }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askQuestion = async () => {
    if (!question || !timeline) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch(`${API_BASE}/overview/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          timeline,
          question,
        }),
      });

      const data = await res.json();
      setAnswer(data.answer || "No response generated.");
    } catch (err) {
      console.error(err);
      setAnswer("⚠️ Unable to generate policy analysis.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center space-x-2">
        <Icon name="Brain" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">
          Policy Impact Q&A (AI-Assisted)
        </h3>
      </div>

      <p className="text-sm text-muted-foreground">
        Ask policy questions on top of the simulation results.
        Example: <em>“What happens to Indian consumers if Malaysia faces a supply shock?”</em>
      </p>

      <textarea
        className="w-full min-h-[80px] p-3 border border-border rounded-md bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Type your policy question here..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />

      <Button
        onClick={askQuestion}
        disabled={loading}
        loading={loading}
        iconName="Send"
      >
        Analyze Policy Impact
      </Button>

      {answer && (
        <div className="mt-4 p-4 bg-muted/50 border border-border rounded-md whitespace-pre-wrap text-sm">
          {answer}
        </div>
      )}
    </div>
  );
};

export default PolicyQnA;
