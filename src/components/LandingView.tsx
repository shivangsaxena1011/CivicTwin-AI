import React from 'react';
import {
  Layers,
  ArrowRight,
  EyeOff,
  GitMerge,
  Cpu,
  Sparkles,
  ShieldCheck,
  Globe2,
  CheckCircle2,
  HelpCircle,
  BarChart3
} from 'lucide-react';
import { NavView } from './Sidebar.js';

interface LandingViewProps {
  onEnterApp: (view?: NavView) => void;
  onOpenShowcase: () => void;
  onOpenBrics: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onEnterApp,
  onOpenShowcase,
  onOpenBrics
}) => {
  return (
    <div className="min-h-full bg-slate-950 text-slate-100 overflow-y-auto pb-16">
      {/* Top Banner / Track Notice */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-b border-indigo-900/40 py-2 px-4 text-center">
        <p className="text-xs text-indigo-300 font-medium flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          <span className="h-2 w-2 rounded-full bg-indigo-400 animate-pulse" />
          <span>Track 1 — AI for Digital Public Infrastructure & Governance</span>
          <span>·</span>
          <span className="text-emerald-300 font-semibold">BRICS Theme — Innovation</span>
        </p>
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 pt-12 pb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-medium mb-6">
          <Sparkles className="h-3.5 w-3.5" />
          <span>From Citizen Voice to Smarter Infrastructure Decisions</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 max-w-4xl mx-auto leading-tight">
          Turn Citizen Voice into{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-300 to-indigo-200">
            Development Intelligence
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto mb-8 font-normal leading-relaxed">
          CivicTwin AI connects multilingual citizen signals with infrastructure, demographic, and investment data to uncover what communities actually need — including critical needs that traditional grievance portals completely miss.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <button
            onClick={() => onEnterApp('command-center')}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/20 transition group"
          >
            <span>Enter Command Center</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={onOpenShowcase}
            className="flex items-center gap-2 px-5 py-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-medium text-sm transition"
          >
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span>Explore Showcase Scenario (Mandla Road Washout)</span>
          </button>

          <button
            onClick={onOpenBrics}
            className="flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-slate-400 hover:text-slate-200 font-medium text-sm transition"
          >
            <Globe2 className="h-4 w-4" />
            <span>BRICS Common Civic Ontology</span>
          </button>
        </div>

        {/* The 4 Core Questions Banner */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 sm:p-6 max-w-5xl mx-auto text-left shadow-xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-3">
            <HelpCircle className="h-4 w-4" />
            <span>The Four Core Questions CivicTwin AI Answers</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="font-semibold text-indigo-300 block mb-1">1. What are citizens saying?</span>
              <p className="text-slate-400">
                Multilingual signals ingested via WhatsApp, IVR calls, Gram Sabha voices, and SMS translated into structured intent.
              </p>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="font-semibold text-amber-300 block mb-1">2. What is actually missing?</span>
              <p className="text-slate-400">
                Silent Gap detector flags areas with high infrastructure deficits where digital citizen reporting is artificially low.
              </p>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="font-semibold text-violet-300 block mb-1">3. What is already funded?</span>
              <p className="text-slate-400">
                Project collision engine scans active government schemes to prevent duplicate tenders and identify scope expansion.
              </p>
            </div>
            <div className="p-3.5 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="font-semibold text-emerald-300 block mb-1">4. What intervention solves it?</span>
              <p className="text-slate-400">
                Evidence-backed capital works compiled with estimated cost, population reached, and expected gap reduction.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Core Innovation Cards */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-white mb-2">Core Architectural Differentiators</h2>
          <p className="text-xs text-slate-400">
            Why CivicTwin AI is a decision system, not a simple complaint management portal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Silent Gap */}
          <div
            onClick={() => onEnterApp('silent-gaps')}
            className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition cursor-pointer group"
          >
            <div className="h-10 w-10 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-4">
              <EyeOff className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2 group-hover:text-amber-300 transition-colors">
              Silent Gap Detection
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              A high grievance count is not the sole proof of need. The system flags regions where digital participation is low but structural infrastructure deficit is severe, eliminating administrative blind spots.
            </p>
            <div className="text-[11px] font-medium text-amber-400 flex items-center gap-1 group-hover:underline">
              <span>Explore 12 flagged silent gaps</span>
              <ArrowRight className="h-3 w-3" />
            </div>
          </div>

          {/* Card 2: Need Convergence */}
          <div
            onClick={() => onEnterApp('convergence')}
            className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 transition cursor-pointer group"
          >
            <div className="h-10 w-10 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-4">
              <GitMerge className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2 group-hover:text-indigo-300 transition-colors">
              Need Convergence Engine
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Different departments receive different complaints that share one physical root cause. A washed-away stream causeway creates health delays, school absenteeism, and rotting crops simultaneously.
            </p>
            <div className="text-[11px] font-medium text-indigo-400 flex items-center gap-1 group-hover:underline">
              <span>View cross-department graph</span>
              <ArrowRight className="h-3 w-3" />
            </div>
          </div>

          {/* Card 3: Project Compiler & Collision */}
          <div
            onClick={() => onEnterApp('compiler')}
            className="p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-violet-500/50 transition cursor-pointer group"
          >
            <div className="h-10 w-10 rounded-lg bg-violet-500/20 text-violet-400 flex items-center justify-center mb-4">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-white mb-2 group-hover:text-violet-300 transition-colors">
              Need-to-Project Compiler
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Transforms citizen signals and geospatial benchmarks into structured development interventions, automatically checking for overlap or scope expansion opportunities with existing projects.
            </p>
            <div className="text-[11px] font-medium text-violet-400 flex items-center gap-1 group-hover:underline">
              <span>Open compiler & collision tool</span>
              <ArrowRight className="h-3 w-3" />
            </div>
          </div>
        </div>
      </div>

      {/* Digital Public Good Principles Strip */}
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="rounded-xl bg-slate-900/60 border border-slate-800 p-5 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Privacy-Preserving (All citizen signals anonymized at ingestion)</span>
          </div>
          <div className="flex items-center gap-2">
            <Globe2 className="h-4 w-4 text-indigo-400" />
            <span>Interoperable APIs & Replaceable Data Adapters for BRICS</span>
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-violet-400" />
            <span>Transparent Explainability (Every AI recommendation shows evidence chain)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
