"use client";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [useCase, setUseCase] = useState("it_support");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    try {
      const res = await fetch("/api/n8n", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          use_case: useCase,
          query: query,
          session_id: `demo-${Date.now()}`,
        }),
      });

      const data = await res.json();
      setResponse({ status: res.status, data });
    } catch (error) {
      setResponse({ error: "Failed to connect to Kalvore Engine" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="mb-12 border-b border-yellow-600 pb-4">
          <h1 className="text-4xl font-bold tracking-widest text-yellow-500" style={{ fontVariant: 'small-caps' }}>
            <span className="text-5xl">K</span>ALVORE <span className="text-5xl">N</span>EXUS
          </h1>
          <p className="text-gray-400 mt-2 tracking-wide text-sm uppercase">Enterprise AI Automation Engine</p>
        </header>

        {/* Input Form */}
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg mb-8 shadow-lg shadow-yellow-900/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-yellow-500 text-sm mb-2 uppercase tracking-wider font-semibold">Select Domain</label>
              <select 
                className="w-full bg-black border border-zinc-700 rounded p-3 text-white focus:border-yellow-500 focus:outline-none transition-colors"
                value={useCase}
                onChange={(e) => setUseCase(e.target.value)}
              >
                <option value="it_support">IT Support Ticketing</option>
                <option value="financial">Financial Client Servicing</option>
              </select>
            </div>

            <div>
              <label className="block text-yellow-500 text-sm mb-2 uppercase tracking-wider font-semibold">Client / User Query</label>
              <textarea 
                className="w-full bg-black border border-zinc-700 rounded p-3 text-white h-32 focus:border-yellow-500 focus:outline-none transition-colors"
                placeholder="Describe the issue or query here..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded transition-colors uppercase tracking-widest disabled:opacity-50"
            >
              {loading ? "Processing via Gemini AI..." : "Process Request"}
            </button>
          </form>
        </div>

        {/* Response Display */}
        {response && (
          <div className={`p-6 rounded-lg border ${response.status === 202 ? 'bg-red-950/30 border-red-800' : 'bg-zinc-900 border-zinc-800'}`}>
            <h2 className="text-xl font-semibold mb-4 text-yellow-500 flex items-center gap-2">
              <span className="uppercase tracking-wider">Engine Response</span>
              {response.status === 202 && <span className="bg-red-900 text-red-200 text-xs px-2 py-1 rounded ml-auto">ESCALATED</span>}
              {response.status === 200 && <span className="bg-green-900 text-green-200 text-xs px-2 py-1 rounded ml-auto">SUCCESS</span>}
            </h2>
            <pre className="text-gray-300 whitespace-pre-wrap overflow-x-auto text-sm p-4 bg-black rounded border border-zinc-800">
              {JSON.stringify(response.data || response.error, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}