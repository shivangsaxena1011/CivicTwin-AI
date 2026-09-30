import React, { useState } from 'react';
import {
  SearchCode,
  FileCheck,
  MessageSquareText,
  Network,
  MapPin,
  Building2,
  Users,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Recommendation, CitizenSignal, InfrastructureIndicator, DemographicIndicator, Project } from '../types.js';

interface EvidenceExplorerViewProps {
  recommendations: Recommendation[];
  signals: CitizenSignal[];
  infrastructure: InfrastructureIndicator[];
  demographics: DemographicIndicator[];
  projects: Project[];
  selectedRecId?: string;
}

export const EvidenceExplorerView: React.FC<EvidenceExplorerViewProps> = ({
  recommendations,
  signals,
  infrastructure,
  demographics,
  projects,
  selectedRecId = 'rec-001'
}) => {
  const [activeRecId, setActiveRecId] = useState<string>(selectedRecId);

  const activeRec = recommendations.find((r) => r.id === activeRecId) || recommendations[0];
  const targetDistrict = activeRec?.district || 'Mandla';

  // Gather supporting evidence entities
  const relatedSignals = signals.filter(
    (s) => s.clusterId === activeRec?.needClusterId || s.district.toLowerCase() === targetDistrict.toLowerCase()
  );
  const relatedInfra = infrastructure.filter(
    (i) => i.district.toLowerCase() === targetDistrict.toLowerCase()
  );
  const relatedDemo = demographics.find(
    (d) => d.district.toLowerCase() === targetDistrict.toLowerCase()
  );
  const relatedProjects = projects.filter(
    (p) => p.district.toLowerCase() === targetDistrict.toLowerCase()
  );

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <SearchCode className="h-5 w-5 text-indigo-400" />
          <span>Evidence Explorer & Chain-of-Justification</span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Auditable multi-source evidence grounding every AI-recommended capital intervention.
        </p>
      </div>

      {/* Select Recommendation Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        <span className="font-semibold text-slate-400">Target Intervention:</span>
        <select
          value={activeRec?.id}
          onChange={(e) => setActiveRecId(e.target.value)}
          className="flex-1 max-w-xl bg-slate-950 border border-slate-800 text-slate-200 rounded-lg p-2 focus:outline-none focus:border-indigo-500"
        >
          {recommendations.map((r) => (
            <option key={r.id} value={r.id}>
              {r.id.toUpperCase()}: {r.title} ({r.region})
            </option>
          ))}
        </select>
      </div>

      {/* Main Chain Visualization Card */}
      <div className="p-6 rounded-xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        {/* Tier Header: The Recommendation */}
        <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/40">
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase text-indigo-400 mb-1">
            <span>Root Recommendation Claim</span>
            <span>ID: {activeRec?.id}</span>
          </div>
          <h2 className="text-base font-bold text-white leading-snug mb-2">
            {activeRec?.title}
          </h2>
          <div className="flex flex-wrap gap-4 text-xs text-slate-300">
            <span>
              <strong>Budget:</strong> ₹{activeRec?.estimatedCost} Cr
            </span>
            <span>·</span>
            <span>
              <strong>Target:</strong> {activeRec?.affectedPopulation.toLocaleString()} citizens
            </span>
            <span>·</span>
            <span>
              <strong>Expected Gap Reduction:</strong> +{activeRec?.expectedGapReduction}%
            </span>
          </div>
        </div>

        {/* AI Reasoning Summary */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-950/40 to-slate-950 border border-indigo-800/40 text-xs space-y-2">
          <div className="flex items-center gap-2 font-semibold text-indigo-300">
            <Sparkles className="h-4 w-4" />
            <span>AI Reasoning Summary (Grounded in Structured Repository)</span>
          </div>
          <p className="text-slate-200 leading-relaxed">
            {activeRec?.rationale} The recommendation prioritizes contract expansion under Project {activeRec?.existingProjectOverlap?.projectId || 'N/A'} rather than an independent tender, cutting mobilization latency by ~9 months and mitigating cross-sector delays in emergency health referrals and school attendance.
          </p>
        </div>

        {/* The 4 Evidence Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Column 1: Citizen Testimony */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
              <MessageSquareText className="h-4 w-4" />
              <span>1. Citizen Voice ({relatedSignals.length})</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Direct colloquial signals logged in original languages.
            </p>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {relatedSignals.slice(0, 3).map((sig) => (
                <div key={sig.id} className="p-2 rounded bg-slate-900 border border-slate-800/80 text-[11px]">
                  <p className="text-slate-300 italic mb-1">"{sig.originalText}"</p>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {sig.language} · {sig.source}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Audited Infrastructure Gaps */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-400">
              <MapPin className="h-4 w-4" />
              <span>2. Infrastructure Audits ({relatedInfra.length})</span>
            </div>
            <p className="text-[11px] text-slate-400">
              State and central geospatial indices & benchmarks.
            </p>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {relatedInfra.map((infra) => (
                <div key={infra.id} className="p-2 rounded bg-slate-900 border border-slate-800/80 text-[11px]">
                  <div className="font-semibold text-slate-200">{infra.category}</div>
                  <div className="text-rose-400 font-medium">Gap: -{infra.gap}% pts</div>
                  <span className="text-[10px] text-slate-500 line-clamp-1">{infra.source}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Demographics & Vulnerability */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <Users className="h-4 w-4" />
              <span>3. Demographics</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Census & digital participation indices.
            </p>

            {relatedDemo && (
              <div className="space-y-2 text-[11px] text-slate-300">
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block">District Population:</span>
                  <span className="font-bold text-white">{relatedDemo.population.toLocaleString()}</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block">Vulnerability Index:</span>
                  <span className="font-bold text-amber-300">{relatedDemo.vulnerabilityIndex} / 100</span>
                </div>
                <div className="p-2 rounded bg-slate-900 border border-slate-800">
                  <span className="text-slate-500 block">Digital Reporting Rate:</span>
                  <span className="font-bold text-emerald-400">
                    {relatedDemo.digitalParticipationIndex} / 100
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Column 4: Project Collision Audit */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
              <Building2 className="h-4 w-4" />
              <span>4. Existing Schemes ({relatedProjects.length})</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Active schemes scanned for overlap or expansion.
            </p>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {relatedProjects.map((proj) => (
                <div key={proj.id} className="p-2 rounded bg-slate-900 border border-slate-800/80 text-[11px]">
                  <div className="font-semibold text-slate-200 line-clamp-1">{proj.name}</div>
                  <div className="text-emerald-400 font-medium">Budget: ₹{proj.budget} Cr</div>
                  <span className="text-[10px] text-slate-500">Coverage: {proj.coveragePercent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
