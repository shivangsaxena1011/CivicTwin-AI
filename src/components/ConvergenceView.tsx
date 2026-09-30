import React, { useState } from 'react';
import {
  GitMerge,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Building2,
  Activity,
  Layers,
  HelpCircle,
  X,
  FileCheck
} from 'lucide-react';
import { NeedConvergenceGroup } from '../types.js';

interface ConvergenceViewProps {
  convergenceGroups: NeedConvergenceGroup[];
  onSelectCluster: (clusterId: string) => void;
}

export const ConvergenceView: React.FC<ConvergenceViewProps> = ({
  convergenceGroups,
  onSelectCluster
}) => {
  const [selectedGroup, setSelectedGroup] = useState<NeedConvergenceGroup>(
    convergenceGroups[0] || null
  );
  const [generatingForId, setGeneratingForId] = useState<string | null>(null);
  const [generatedOpportunity, setGeneratedOpportunity] = useState<any | null>(null);

  const handleGenerateOpportunity = async (group: NeedConvergenceGroup) => {
    setGeneratingForId(group.id);
    try {
      const res = await fetch('/api/ai/convergence', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(group)
      });
      const data = await res.json();
      setGeneratedOpportunity(data.opportunity);
    } catch (err) {
      console.error(err);
    } finally {
      setGeneratingForId(null);
    }
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Title & Principle */}
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <GitMerge className="h-5 w-5 text-indigo-400" />
          <span>Need Convergence Engine</span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Detecting when multiple disparate department complaints are caused by one shared physical infrastructure root cause.
        </p>
      </div>

      {/* Cross-Department Graph Visualizer Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 mb-6">
          <div>
            <span className="text-[11px] font-semibold uppercase text-indigo-400">
              Active Convergence Patterns
            </span>
            <h2 className="text-base font-bold text-white">
              Root-Cause Cross-Sector Visualizer
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {convergenceGroups.map((g) => (
              <button
                key={g.id}
                onClick={() => setSelectedGroup(g)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  selectedGroup?.id === g.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {g.region.split(',')[0]}
              </button>
            ))}
          </div>
        </div>

        {selectedGroup && (
          <div>
            {/* Visual Root-Cause Node Diagram */}
            <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 mb-6 relative overflow-hidden">
              <div className="text-center max-w-xl mx-auto mb-8">
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  Identified Shared Root Cause
                </span>
                <h3 className="text-lg font-bold text-white mt-1.5">
                  {selectedGroup.rootCause}
                </h3>
                <span className="text-xs text-slate-400 mt-1 block">
                  Region: {selectedGroup.region} · Impacting ~{selectedGroup.affectedPopulation.toLocaleString()} citizens
                </span>
              </div>

              {/* Connecting Tree Lines (Simulated SVG) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                {selectedGroup.symptoms.map((symptom, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between font-semibold text-indigo-300 mb-1">
                        <span className="truncate">{symptom.department}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                          {symptom.signalCount} signals
                        </span>
                      </div>
                      <p className="text-xs text-slate-200 font-medium mb-3">
                        {symptom.complaintTheme}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-800/80">
                      <span className="text-[10px] text-slate-500 block mb-0.5 font-semibold">
                        Citizen Evidence Quote:
                      </span>
                      <p className="text-[11px] text-slate-400 italic">"{symptom.sampleQuote}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Card: Generate Cross-Department Opportunity */}
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-indigo-950/40 border border-indigo-500/30 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-indigo-400" />
                  <span>Synthesize Single Inter-Departmental Joint Scheme</span>
                </h4>
                <p className="text-xs text-slate-300 mt-0.5 max-w-2xl leading-relaxed">
                  Avoid fragmented tenders by 4 separate departments. Unify health, education, and transport allocations into one coordinated civil infrastructure works package.
                </p>
              </div>

              <button
                onClick={() => handleGenerateOpportunity(selectedGroup)}
                disabled={generatingForId === selectedGroup.id}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-md transition shrink-0 disabled:opacity-50"
              >
                <Sparkles className="h-4 w-4" />
                <span>
                  {generatingForId === selectedGroup.id
                    ? 'AI Synthesizing...'
                    : 'Generate Cross-Department Opportunity'}
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Generated Opportunity Modal */}
      {generatedOpportunity && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-xl w-full shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-indigo-400" />
                <h3 className="text-base font-bold text-white">Cross-Department Opportunity Synthesized</h3>
              </div>
              <button
                onClick={() => setGeneratedOpportunity(null)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider block mb-1">
                  Proposed Unified Scheme Title
                </span>
                <p className="text-sm font-bold text-white">{generatedOpportunity.proposedSchemeTitle}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Lead Administrative Dept:</span>
                  <span className="font-semibold text-slate-200">{generatedOpportunity.leadDepartment}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Estimated Capital Budget:</span>
                  <span className="font-semibold text-emerald-400">₹{generatedOpportunity.estimatedBudget} Cr</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block mb-1 font-semibold">Joint Intervention Scope:</span>
                <p className="text-slate-300 leading-relaxed">{generatedOpportunity.jointInterventionSummary}</p>
              </div>

              <div className="p-3 rounded-lg bg-indigo-500/10 border border-indigo-500/30">
                <span className="text-indigo-300 block mb-1 font-semibold">Cost Savings vs Siloed Approaches:</span>
                <p className="text-slate-200 leading-relaxed">{generatedOpportunity.costSavingsVsSiloedApproaches}</p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setGeneratedOpportunity(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setGeneratedOpportunity(null);
                  onSelectCluster('clus-conn-01');
                }}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs"
              >
                Open in Project Compiler →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
