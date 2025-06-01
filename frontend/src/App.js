import React, { useState } from "react";

const MIN_WORD_COUNT = 100;

const resultMessages = {
  mild: "Your writing shows positive or stable emotional patterns. It's a great sign that you're currently in a mentally healthy state. Keep nurturing your well-being and continue expressing yourself!",
  minimum: "There are subtle hints of stress or emotional fatigue in your writing. It may not be serious, but taking small breaks or engaging in relaxing activities could help. You’ve got this 💪",
  moderate: "Your writing suggests signs of emotional struggle or distress. It might help to talk to someone you trust or consider exploring mental health resources. You're not alone.",
  severe: "Your text reflects strong signs of emotional or mental strain. We strongly recommend reaching out to a mental health professional or support group. Remember, asking for help is a sign of strength—not weakness."
};

export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const wordCount = text.trim().split(/\s+/).length;
  const isTextValid = wordCount >= MIN_WORD_COUNT;

  const handleAnalyze = async () => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await response.json();
      setResult(data.prediction);
    } catch (error) {
      setResult("Error analyzing text. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ fontSize: "2rem", textAlign: "center" }}>🧠 MindLens</h1>
      <p style={{ textAlign: "center", color: "#555" }}>
        A gentle tool to help you reflect on your mental well-being through your own words. Paste something you've written—maybe a journal entry or social media post—and get feedback based on linguistic patterns.
      </p>

      <div style={{ marginTop: "2rem" }}>
        <h2>Enter your text (min. 100 words)</h2>
        <textarea
          style={{ width: "100%", height: "200px", padding: "1rem", fontSize: "1rem" }}
          placeholder="Type or paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <p style={{ fontSize: "0.9rem", color: "#777" }}>Word count: {wordCount}</p>
        <button
          onClick={handleAnalyze}
          disabled={!isTextValid || loading}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#4F46E5",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: isTextValid && !loading ? "pointer" : "not-allowed",
            opacity: isTextValid && !loading ? 1 : 0.6,
            marginTop: "1rem"
          }}
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>

        {result && (
          <div style={{ marginTop: "2rem", padding: "1rem", border: "1px solid #ddd", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
            <h3 style={{ color: "#4F46E5" }}>Result</h3>
            <p>{resultMessages[result] || result}</p>
          </div>
        )}
      </div>

      <footer style={{ marginTop: "3rem", textAlign: "center", fontSize: "0.8rem", color: "#aaa" }}>
        This tool is for educational purposes only and does not replace professional help.
      </footer>
    </div>
  );
}
