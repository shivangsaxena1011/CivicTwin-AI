import React, { useState } from 'react';
import {
  Cpu,
  Layers,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Building2,
  FileCheck,
  SearchCode,
  DollarSign,
  Users,
  ShieldCheck,
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { NeedCluster, Project, Recommendation } from '../types.js';

interface ProjectCompilerViewProps {
  clusters: NeedCluster[];
  projects: Project[];
  recommendations: Recommendation[];
  initialClusterId?: string;
  onOpenEvidence: (recId: string) => void;
  onSaveCandidate: (rec: Recommendation) => void;
}

export const ProjectCompilerView: React.FC<ProjectCompilerViewProps> = ({
  clusters,
  projects,
  recommendations,
  initialClusterId = 'clus-conn-01',
  onOpenEvidence,
  onSaveCandidate
}) => {
  const [selectedClusterId, setSelectedClusterId] = useState<string>(initialClusterId);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isCompiling, setIsCompiling] = useState<boolean>(false);
  const [compiledRec, setCompiledRec] = useState<Recommendation | null>(null);

  const cluster = clusters.find((c) => c.id === selectedClusterId) || clusters[0];
  const regionName = cluster?.locations[0]?.district || 'Mandla';

  // Find existing project in same region for collision detection
  const existingProject = projects.find(
    (p) => p.district.toLowerCase() === regionName.toLowerCase()
  );

  // Determine collision status
  let overlapLevel: 'NO OVERLAP' | 'PARTIAL OVERLAP' | 'HIGH OVERLAP' = 'NO OVERLAP';
  let collisionNotes = 'No active schemes identified in this specific sector for the district.';
  let collisionAction = 'Proceed with standalone capital budget requisition.';

  if (existingProject) {
    if (existingProject.coveragePercent >= 75) {
      overlapLevel = 'HIGH OVERLAP';
      collisionNotes = `High geographic and thematic overlap with Project #${existingProject.id} (${existingProject.name}).`;
      collisionAction = 'Avoid independent tender. Coordinate inter-departmental integration.';
    } else if (existingProject.categories.some((cat) => cluster.categories.includes(cat))) {
      overlapLevel = 'PARTIAL OVERLAP';
      collisionNotes = `Existing Project #${existingProject.id} (${existingProject.name}) operates in ${regionName} but covers trunk infrastructure, leaving local feeder habitations excluded.`;
      collisionAction = 'Recommend scope expansion / contract variation order under existing mobilization rather than initiating a duplicate tender.';
    } else {
      overlapLevel = 'PARTIAL OVERLAP';
      collisionNotes = `Adjacent project in ${regionName} by ${existingProject.department}. Opportunity for synchronized civil work.`;
      collisionAction = 'Coordinate right-of-way and utility relocation joint approvals.';
    }
  }

  // Pre-compiled recommendation from repository or default
  const existingRec = recommendations.find((r) => r.needClusterId === cluster?.id);

  const handleCompile = () => {
    setIsCompiling(true);
    setTimeout(() => {
      const rec: Recommendation = existingRec || {
        id: `rec-gen-${Date.now().toString().slice(-4)}`,
        title: `Comprehensive Infrastructure Intervention for ${cluster.title}`,
        interventionType: 'Capital Expansion',
        region: `${regionName}, Madhya Pradesh`,
        district: regionName,
        state: 'Madhya Pradesh',
        estimatedCost: cluster.estimatedCost || 35.0,
        affectedPopulation: cluster.affectedPopulation,
        expectedGapReduction: Math.min(60, Math.round(cluster.infrastructureGapScore * 0.5)),
        rationale: cluster.description,
        evidence: {
          signalsCount: cluster.signalCount,
          infraGap: `Infrastructure gap score is ${cluster.infrastructureGapScore}/100`,
          vulnerabilityHighlight: `High vulnerability score of ${cluster.vulnerabilityScore}/100`,
          contributingDepartments: ['Road Transport & Highways', 'Rural Development'],
          keySignalQuotes: ['Citizen signals indicate severe seasonal access disruptions.']
        },
        existingProjectOverlap: {
          projectId: existingProject?.id,
          projectName: existingProject?.name,
          overlapLevel,
          notes: collisionNotes,
          recommendedAction: collisionAction
        },
        confidence: cluster.confidence || 0.92,
        assumptions: [
          'Pre-monsoon civil works execution schedule strictly adhered to',
          'Inter-departmental coordination committee established for joint utility clearances'
        ],
        needClusterId: cluster.id,
        createdAt: new Date().toISOString()
      };
      setCompiledRec(rec);
      setIsCompiling(false);
      setCurrentStep(4);
    }, 800);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <Cpu className="h-5 w-5 text-indigo-400" />
          <span>Need-to-Project Compiler & Collision Detector</span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Step-by-step conversion of clustered citizen needs into evidence-backed, budget-aware capital intervention proposals.
        </p>
      </div>

      {/* 4-Step Process Breadcrumb */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-xs">
        {[
          { num: 1, label: '1. Select Need Cluster' },
          { num: 2, label: '2. Review Evidence Base' },
          { num: 3, label: '3. Collision Detection' },
          { num: 4, label: '4. Candidate Proposal' }
        ].map((step) => (
          <button
            key={step.num}
            onClick={() => setCurrentStep(step.num)}
            className={`p-2.5 rounded-lg text-left transition font-medium ${
              currentStep === step.num
                ? 'bg-indigo-600 text-white'
                : currentStep > step.num
                ? 'bg-slate-950 text-indigo-300 border border-indigo-900/60'
                : 'bg-slate-950 text-slate-500'
            }`}
          >
            {step.label}
          </button>
        ))}
      </div>

      {/* Main Compiler Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Step View */}
        <div className="lg:col-span-8 space-y-5">
          {/* STEP 1: Select Need Cluster */}
          {currentStep === 1 && (
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Step 1: Choose Target Need Cluster</span>
              </h2>
              <p className="text-xs text-slate-400">
                Select a spatial aggregation synthesized from citizen signals and geographic indicators.
              </p>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Identified Need Clusters:
                </label>
                <select
                  value={selectedClusterId}
                  onChange={(e) => setSelectedClusterId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-xs text-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-indigo-500"
                >
                  {clusters.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.title} — {c.locations[0]?.district} ({c.affectedPopulation.toLocaleString()} citizens)
                    </option>
                  ))}
                </select>
              </div>

              <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs space-y-2">
                <div className="flex justify-between font-semibold text-slate-200">
                  <span>Selected: {cluster.title}</span>
                  <span className="text-indigo-400">Priority Score: {cluster.priorityScore}/100</span>
                </div>
                <p className="text-slate-400 leading-relaxed">{cluster.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {cluster.categories.map((cat, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300">
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setCurrentStep(2)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition"
              >
                <span>Proceed to Evidence Review</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* STEP 2: Review Evidence */}
          {currentStep === 2 && (
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Step 2: Cross-Source Evidence Verification</span>
              </h2>
              <p className="text-xs text-slate-400">
                AI correlates citizen testimony with audited engineering and demographic data.
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Citizen Signal Volume:</span>
                  <span className="text-base font-bold text-white">{cluster.signalCount} verified signals</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Infrastructure Deficit Gap:</span>
                  <span className="text-base font-bold text-rose-400">-{cluster.infrastructureGapScore} pts gap</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Vulnerability Score:</span>
                  <span className="text-base font-bold text-amber-300">{cluster.vulnerabilityScore} / 100</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block mb-1">Estimated Capital Requirement:</span>
                  <span className="text-base font-bold text-emerald-400">₹{cluster.estimatedCost} Cr</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs"
                >
                  Back
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition"
                >
                  <span>Check Existing Project Collisions</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Project Collision Detector */}
          {currentStep === 3 && (
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <Building2 className="h-4 w-4 text-amber-400" />
                <span>Step 3: Project Collision & Overlap Detector</span>
              </h2>
              <p className="text-xs text-slate-400">
                Scanning approved and active government expenditure to avoid redundant duplication.
              </p>

              {/* Collision Alert Banner */}
              <div
                className={`p-4 rounded-xl border text-xs space-y-2 ${
                  overlapLevel === 'PARTIAL OVERLAP'
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-200'
                    : overlapLevel === 'HIGH OVERLAP'
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-200'
                    : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200'
                }`}
              >
                <div className="flex items-center justify-between font-bold text-sm">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Collision Status: {overlapLevel}</span>
                  </div>
                  <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-black/30">
                    {existingProject?.department || 'Unassigned'}
                  </span>
                </div>

                <p className="text-slate-300 leading-relaxed">{collisionNotes}</p>

                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 text-xs">
                  <span className="font-semibold text-white block mb-0.5">
                    Collision Engine Recommendation:
                  </span>
                  <p className="text-indigo-300 font-medium">{collisionAction}</p>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs"
                >
                  Back
                </button>
                <button
                  onClick={handleCompile}
                  disabled={isCompiling}
                  className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-medium text-xs shadow-md transition disabled:opacity-50"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>{isCompiling ? 'Compiling Proposal...' : 'Generate Project Recommendation'}</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Review Compiled Recommendation Card */}
          {currentStep === 4 && (
            <div className="p-5 rounded-xl bg-slate-900 border border-indigo-500/40 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[11px] font-semibold uppercase text-indigo-400">
                    Step 4: AI-Compiled Development Proposal
                  </span>
                  <h2 className="text-base font-bold text-white leading-tight mt-0.5">
                    {compiledRec?.title || existingRec?.title}
                  </h2>
                </div>
                <span className="px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
                  {compiledRec?.interventionType || existingRec?.interventionType}
                </span>
              </div>

              {/* Core Attributes */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block mb-0.5">Estimated Cost:</span>
                  <span className="text-base font-bold text-emerald-400">
                    ₹{compiledRec?.estimatedCost || existingRec?.estimatedCost} Cr
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block mb-0.5">Population Reached:</span>
                  <span className="text-base font-bold text-white">
                    {(compiledRec?.affectedPopulation || existingRec?.affectedPopulation || 0).toLocaleString()}
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block mb-0.5">Expected Gap Reduction:</span>
                  <span className="text-base font-bold text-indigo-400">
                    +{compiledRec?.expectedGapReduction || existingRec?.expectedGapReduction}% pts
                  </span>
                </div>
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-400 block mb-0.5">AI Confidence:</span>
                  <span className="text-base font-bold text-violet-300">
                    {Math.round(((compiledRec?.confidence || existingRec?.confidence) || 0.94) * 100)}%
                  </span>
                </div>
              </div>

              {/* Rationale */}
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                <span className="font-semibold text-slate-300 block mb-1">Structured Rationale:</span>
                <p className="text-slate-300 leading-relaxed">
                  {compiledRec?.rationale || existingRec?.rationale}
                </p>
              </div>

              {/* Assumptions */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                <span className="font-semibold text-slate-400 block mb-1">Key Assumptions:</span>
                <ul className="list-disc pl-4 space-y-1 text-slate-400">
                  {(compiledRec?.assumptions || existingRec?.assumptions || []).map((assump, idx) => (
                    <li key={idx}>{assump}</li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => onOpenEvidence((compiledRec || existingRec)!.id)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-950 border border-indigo-800/80 text-indigo-300 hover:text-white text-xs font-medium transition"
                >
                  <SearchCode className="h-4 w-4" />
                  <span>Why this recommendation? (Open Evidence Chain)</span>
                </button>

                <button
                  onClick={() => {
                    const toSave = compiledRec || existingRec;
                    if (toSave) onSaveCandidate(toSave);
                  }}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-md transition"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Create Project Candidate in Registry</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Active Candidate Proposals */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <h3 className="text-sm font-bold text-white">Active Candidate Proposals</h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                {recommendations.length} total
              </span>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-[460px] pr-1">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => {
                    setSelectedClusterId(rec.needClusterId);
                    setCompiledRec(rec);
                    setCurrentStep(4);
                  }}
                  className="p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-indigo-500/50 transition cursor-pointer text-xs group"
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-semibold text-slate-200 line-clamp-1 group-hover:text-indigo-300">
                      {rec.title}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mb-2">{rec.region}</span>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
                    <span className="font-bold text-emerald-400">₹{rec.estimatedCost} Cr</span>
                    <span className="text-slate-500">{rec.affectedPopulation.toLocaleString()} citizens</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-500 text-center">
            Illustrative Capital Interventions compiled by CivicTwin AI
          </div>
        </div>
      </div>
    </div>
  );
};
