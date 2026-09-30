import React, { useState } from 'react';
import {
  Network,
  MessageSquareText,
  MapPin,
  Building2,
  LineChart,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { NeedCluster, Project, CitizenSignal, InfrastructureIndicator } from '../types.js';

interface NeedGraphViewProps {
  clusters: NeedCluster[];
  projects: Project[];
  signals: CitizenSignal[];
  infrastructure: InfrastructureIndicator[];
  onOpenCompiler: (clusterId: string) => void;
}

export const NeedGraphView: React.FC<NeedGraphViewProps> = ({
  clusters,
  projects,
  signals,
  infrastructure,
  onOpenCompiler
}) => {
  const [selectedClusterId, setSelectedClusterId] = useState<string>('clus-conn-01');

  const selectedCluster = clusters.find((c) => c.id === selectedClusterId) || clusters[0];
  const relatedSignals = signals.filter((s) => s.clusterId === selectedCluster?.id);
  const districtName = selectedCluster?.locations?.[0]?.district || 'Mandla';
  const relatedInfra = infrastructure.filter(
    (i) => i.district?.toLowerCase() === districtName.toLowerCase()
  );
  const relatedProjects = projects.filter(
    (p) => p.district?.toLowerCase() === districtName.toLowerCase()
  );

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Network className="h-5 w-5 text-indigo-400" />
          <span>Interactive Need-to-Outcome Graph</span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          End-to-end evidence graph tracing citizen voice through infrastructure indicators, existing project coverage, and remaining unresolved gaps.
        </p>
      </div>

      {/* Cluster Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        <span className="text-slate-400 font-medium shrink-0">Select Need Node:</span>
        {clusters.slice(0, 6).map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedClusterId(c.id)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition ${
              selectedClusterId === c.id
                ? 'bg-indigo-600 text-white'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {c.title.split(' ')[0]} ({c.locations[0]?.district})
          </button>
        ))}
      </div>

      {/* Multi-Tier Flow Graph */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
        <div className="text-xs text-indigo-300 font-semibold uppercase tracking-wider flex items-center justify-between">
          <span>End-to-End Decision Flow Hierarchy</span>
          <span className="text-slate-500 font-normal">Click any tier card to inspect relationships</span>
        </div>

        {/* The 5 Tiers Flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {/* Tier 1: Citizen Signals Node */}
          <div className="p-4 rounded-xl bg-slate-950 border border-indigo-900/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 mb-2">
                <MessageSquareText className="h-4 w-4" />
                <span>Tier 1: Citizen Signals</span>
              </div>
              <div className="text-xl font-bold text-white mb-1">
                {selectedCluster?.signalCount || relatedSignals.length} Ingested
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                Multilingual signals synthesized from WhatsApp, IVR audio, and Gram Sabha.
              </p>
            </div>
            <div className="text-[10px] text-indigo-300 font-medium bg-indigo-950/60 p-2 rounded border border-indigo-800/40">
              Confidence: {Math.round((selectedCluster?.confidence || 0.9) * 100)}%
            </div>
          </div>

          {/* Tier 2: Clustered Need Node */}
          <div className="p-4 rounded-xl bg-slate-950 border border-violet-900/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-violet-400 mb-2">
                <Network className="h-4 w-4" />
                <span>Tier 2: Need Cluster</span>
              </div>
              <div className="text-sm font-bold text-white mb-1 leading-tight line-clamp-2">
                {selectedCluster?.title}
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                {selectedCluster?.affectedPopulation.toLocaleString()} citizens affected
              </p>
            </div>
            <div className="text-[10px] text-violet-300 font-medium bg-violet-950/60 p-2 rounded border border-violet-800/40">
              Priority Score: {selectedCluster?.priorityScore} / 100
            </div>
          </div>

          {/* Tier 3: Geographic & Infrastructure Baseline */}
          <div className="p-4 rounded-xl bg-slate-950 border border-cyan-900/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-cyan-400 mb-2">
                <MapPin className="h-4 w-4" />
                <span>Tier 3: Ground Indicator</span>
              </div>
              <div className="text-sm font-bold text-white mb-1">
                {districtName} Region
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                {relatedInfra[0]?.indicator || 'Regional Connectivity Baseline'}
              </p>
            </div>
            <div className="text-[10px] text-rose-300 font-medium bg-rose-950/40 p-2 rounded border border-rose-800/40">
              Deficit Gap: -{relatedInfra[0]?.gap || 46}% below target
            </div>
          </div>

          {/* Tier 4: Existing Government Project */}
          <div className="p-4 rounded-xl bg-slate-950 border border-amber-900/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 mb-2">
                <Building2 className="h-4 w-4" />
                <span>Tier 4: Active Scheme</span>
              </div>
              <div className="text-sm font-bold text-white mb-1 line-clamp-2">
                {relatedProjects[0]?.name || 'State Highway Arterial Package'}
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                Current Budget: ₹{relatedProjects[0]?.budget || 142.5} Cr
              </p>
            </div>
            <div className="text-[10px] text-amber-300 font-medium bg-amber-950/60 p-2 rounded border border-amber-800/40">
              Coverage: {relatedProjects[0]?.coveragePercent || 48}% (Partial)
            </div>
          </div>

          {/* Tier 5: Outcome & Remaining Gap */}
          <div className="p-4 rounded-xl bg-slate-950 border border-emerald-900/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-2">
                <LineChart className="h-4 w-4" />
                <span>Tier 5: Unresolved Gap</span>
              </div>
              <div className="text-xl font-bold text-rose-400 mb-1">
                {100 - (relatedProjects[0]?.coveragePercent || 48)}%
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                Feeder culverts to tribal habitations excluded from highway scope.
              </p>
            </div>
            <button
              onClick={() => onOpenCompiler(selectedCluster.id)}
              className="text-[10px] text-emerald-300 font-medium bg-emerald-950/60 hover:bg-emerald-900/80 p-2 rounded border border-emerald-800/40 transition text-center"
            >
              Compile Intervention →
            </button>
          </div>
        </div>

        {/* Detailed Graph Explanation Banner */}
        <div className="p-4 rounded-lg bg-slate-950/80 border border-slate-800 text-xs">
          <div className="flex items-center gap-2 font-semibold text-slate-200 mb-1">
            <Info className="h-4 w-4 text-indigo-400" />
            <span>Graph Synthesis Summary:</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            {selectedCluster?.description} Although active scheme "{relatedProjects[0]?.name}" operates in the district, it leaves rural secondary feeder roads severed during flood surges. CivicTwin AI recommends expanding the existing contract to encompass 18 culvert bridges rather than initiating a redundant tender.
          </p>
        </div>
      </div>
    </div>
  );
};
