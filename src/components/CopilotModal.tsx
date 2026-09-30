import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  Send,
  X,
  MessageSquare,
  HelpCircle,
  FileCheck,
  CheckCircle2,
  Info
} from 'lucide-react';

interface CopilotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateView: (view: any) => void;
}

export const CopilotModal: React.FC<CopilotModalProps> = ({
  isOpen,
  onClose,
  onNavigateView
}) => {
  const [messages, setMessages] = useState<
    Array<{ role: 'user' | 'assistant'; text: string; evidence?: any }>
  >([
    {
      role: 'assistant',
      text: `Hello! I am **CivicTwin Copilot**, your infrastructure intelligence advisor grounded in our Digital Public Good civic data repository. 

You can ask me about:
- Unresolved infrastructure gaps and silent gaps across Indian states (Maharashtra, Bihar, Rajasthan, MP, etc.).
- Cross-department root causes (e.g. Mandla-Dindori road washout, Jalna water salinity).
- Budget trade-offs under ₹250 Cr or ₹500 Cr scenarios.
- Multi-project collision detection against existing schemes.`
    }
  ]);

  const [inputQuestion, setInputQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [expandedEvidenceIdx, setExpandedEvidenceIdx] = useState<number | null>(null);

  const SUGGESTED_PROMPTS = [
    'What are the biggest unresolved needs in Maharashtra?',
    'Which regions may be underrepresented in citizen feedback?',
    'Which existing projects overlap with water-related needs?',
    'What cross-department problems exist in Mandla & Dindori?',
    'What could happen under a ₹500 Cr illustrative budget?'
  ];

  if (!isOpen) return null;

  const handleSend = async (qText?: string) => {
    const question = qText || inputQuestion;
    if (!question.trim()) return;

    const newMsgs = [...messages, { role: 'user' as const, text: question }];
    setMessages(newMsgs);
    setInputQuestion('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/copilot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });
      const data = await res.json();
      setMessages([
        ...newMsgs,
        {
          role: 'assistant',
          text: data.answer || 'No response generated.',
          evidence: data.evidence
        }
      ]);
    } catch (err) {
      console.error(err);
      setMessages([
        ...newMsgs,
        {
          role: 'assistant',
          text: 'Unable to reach the AI Copilot endpoint. Using deterministic baseline response for query.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-lg bg-slate-900 border-l border-slate-800 h-full flex flex-col justify-between shadow-2xl">
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">CivicTwin AI Copilot</h3>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                  Grounded Advisor
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Grounded in 115+ signals & audited indicators</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Chat message history */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                m.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[92%] p-3.5 rounded-xl leading-relaxed whitespace-pre-line ${
                  m.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-br-none'
                    : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none shadow-sm'
                }`}
              >
                {m.text}

                {/* Structured Evidence Badges */}
                {m.evidence && (
                  <div className="mt-3 pt-3 border-t border-slate-800/80">
                    <div className="flex flex-wrap items-center gap-1.5 mb-2">
                      <span className="text-[10px] uppercase font-bold text-slate-400 mr-1 flex items-center gap-1">
                        <FileCheck className="h-3 w-3 text-indigo-400" />
                        <span>Retrieved Evidence:</span>
                      </span>

                      {m.evidence.matchedClusters?.length > 0 && (
                        <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-semibold border border-indigo-500/30">
                          {m.evidence.matchedClusters.length} Clusters
                        </span>
                      )}

                      {m.evidence.matchedSignals?.length > 0 && (
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold border border-emerald-500/30">
                          {m.evidence.matchedSignals.length} Verbatim Signals
                        </span>
                      )}

                      {m.evidence.matchedProjects?.length > 0 && (
                        <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-semibold border border-amber-500/30">
                          {m.evidence.matchedProjects.length} Schemes Audited
                        </span>
                      )}

                      {m.evidence.matchedInfrastructure?.length > 0 && (
                        <span className="px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-semibold border border-cyan-500/30">
                          {m.evidence.matchedInfrastructure.length} Indicator Deficits
                        </span>
                      )}

                      {m.evidence.matchedSilentGaps?.length > 0 && (
                        <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-semibold border border-rose-500/30">
                          {m.evidence.matchedSilentGaps.length} Silent Gaps
                        </span>
                      )}

                      {m.evidence.budgetSimulation && (
                        <span className="px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-300 text-[10px] font-semibold border border-violet-500/30">
                          ₹{m.evidence.budgetSimulation.budgetEnvelopeCr} Cr Optimization
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          setExpandedEvidenceIdx(
                            expandedEvidenceIdx === idx ? null : idx
                          )
                        }
                        className="text-[10px] text-indigo-400 hover:text-indigo-300 underline font-medium ml-auto"
                      >
                        {expandedEvidenceIdx === idx ? 'Hide Evidence Detail' : 'Inspect Retrieved Evidence'}
                      </button>
                    </div>

                    {/* Expandable Evidence Detail Box */}
                    {expandedEvidenceIdx === idx && (
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-2 text-[11px]">
                        {m.evidence.matchedClusters?.length > 0 && (
                          <div>
                            <span className="font-semibold text-indigo-300 block mb-0.5">
                              Matched Need Clusters:
                            </span>
                            <ul className="list-disc pl-3.5 space-y-0.5 text-slate-300">
                              {m.evidence.matchedClusters.map((c: any) => (
                                <li key={c.id}>
                                  <strong>[{c.id}] {c.title}</strong> — {c.locations.map((l: any) => `${l.district}, ${l.state}`).join(' & ')} (Gap: {c.infrastructureGapScore}/100, Pop: {c.affectedPopulation.toLocaleString()})
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {m.evidence.matchedSignals?.length > 0 && (
                          <div>
                            <span className="font-semibold text-emerald-300 block mb-0.5">
                              Sample Citizen Signals:
                            </span>
                            <ul className="list-disc pl-3.5 space-y-0.5 text-slate-300">
                              {m.evidence.matchedSignals.slice(0, 3).map((s: any) => (
                                <li key={s.id}>
                                  [{s.district}, {s.state} - {s.language}]: "{s.quote}"
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {m.evidence.matchedProjects?.length > 0 && (
                          <div>
                            <span className="font-semibold text-amber-300 block mb-0.5">
                              Active Schemes Audited for Collisions:
                            </span>
                            <ul className="list-disc pl-3.5 space-y-0.5 text-slate-300">
                              {m.evidence.matchedProjects.slice(0, 3).map((p: any) => (
                                <li key={p.id}>
                                  <strong>#{p.id} {p.name}</strong> ({p.department}, ₹{p.budgetCr} Cr, {p.coveragePercent}% coverage)
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-indigo-400 text-xs py-2">
              <div className="h-4 w-4 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin" />
              <span>CivicTwin AI reasoning through repository data...</span>
            </div>
          )}
        </div>

        {/* Suggested Quick Prompts */}
        <div className="px-4 py-2 bg-slate-950/60 border-t border-slate-800/80">
          <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
            Suggested Policy Inquiries:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED_PROMPTS.map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSend(p)}
                className="text-[10px] px-2 py-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 transition text-left"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuestion}
              onChange={(e) => setInputQuestion(e.target.value)}
              placeholder="Ask Copilot about needs, silent gaps, or budgets..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={loading || !inputQuestion.trim()}
              className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50 transition"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
