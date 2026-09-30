import React from 'react';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  X,
  CheckCircle2,
  ArrowRight,
  EyeOff,
  GitMerge,
  Cpu,
  Building2,
  Calculator,
  SearchCode,
  MessageSquareText
} from 'lucide-react';
import { NavView } from './Sidebar.js';

interface JudgeDemoTourProps {
  isOpen: boolean;
  currentStep: number;
  onStepChange: (step: number) => void;
  onClose: () => void;
  onResetDemo: () => Promise<void>;
  onNavigateView: (view: NavView) => void;
  onSelectCluster: (clusterId: string) => void;
  onSelectRec: (recId: string) => void;
}

export const JudgeDemoTour: React.FC<JudgeDemoTourProps> = ({
  isOpen,
  currentStep,
  onStepChange,
  onClose,
  onResetDemo,
  onNavigateView,
  onSelectCluster,
  onSelectRec
}) => {
  if (!isOpen) return null;

  const STEPS = [
    {
      step: 1,
      title: 'STEP 1: Multilingual Citizen Signal Ingestion',
      view: 'signals' as NavView,
      icon: MessageSquareText,
      tag: 'Raw Citizen Voice',
      actionText: 'Inspecting Hindi, Marathi, Tamil & Bengali Signals',
      description:
        'Citizens submit grievances in colloquial dialects via WhatsApp, IVR calls, and Gram Sabha. Notice that complaints are not formal work orders yet; they are unstructured distress signals.',
      judgeFocus:
        'Verify multilingual translation, sentiment classification, entity extraction, and automatic anonymization.',
      setup: () => {
        onNavigateView('signals');
      }
    },
    {
      step: 2,
      title: 'STEP 2: Silent Gap Detector (The Core Innovation)',
      view: 'silent-gaps' as NavView,
      icon: EyeOff,
      tag: 'Algorithmic Blind-Spot Detection',
      actionText: 'Reviewing Gadchiroli & Araria Underrepresentation',
      description:
        'A complaint is NOT the only proof of need. The system flags regions where digital participation is low (< 25/100) but audited infrastructure deficit is severe (> 60%), eliminating administrative blind spots.',
      judgeFocus:
        'Notice that Gadchiroli has only 5 complaints, yet institutional delivery deficit is 63%. Passive complaint dashboards would ignore this region; CivicTwin AI elevates it to a Critical Silent Gap.',
      setup: () => {
        onNavigateView('silent-gaps');
      }
    },
    {
      step: 3,
      title: 'STEP 3: Need Convergence Engine (Cross-Department Root Cause)',
      view: 'convergence' as NavView,
      icon: GitMerge,
      tag: 'Multi-Department Synthesis',
      actionText: 'Connecting Health, Education, Roads & Agriculture',
      description:
        'Different departments receive separate grievances that share ONE physical root cause. A washed-out stream culvert causes ambulance delays (Health), student absenteeism (Education), and rotting tomato crops (Agriculture).',
      judgeFocus:
        'Click "Generate Cross-Department Opportunity" to see server-side Gemini unify 4 siloed grievances into 1 coordinated infrastructure package, saving ~₹8.2 Cr in mobilization costs.',
      setup: () => {
        onNavigateView('convergence');
      }
    },
    {
      step: 4,
      title: 'STEP 4: Project Compiler & Multi-Source Evidence Chain',
      view: 'compiler' as NavView,
      icon: Cpu,
      tag: 'Need-to-Project Compilation',
      actionText: 'Inspecting Mandla-Dindori Seasonal Connectivity Need',
      description:
        'Converts the clustered citizen need into a structured capital works candidate. Every recommendation is anchored to real citizen quotes, geospatial audits, and demographic vulnerability indices.',
      judgeFocus:
        'Walk through Step 1 (Cluster) and Step 2 (Evidence Base) to inspect the 46% road gap and 51% ambulance delay metric.',
      setup: () => {
        onSelectCluster('clus-conn-01');
        onNavigateView('compiler');
      }
    },
    {
      step: 5,
      title: 'STEP 5: Project Collision Detector (Preventing Waste)',
      view: 'compiler' as NavView,
      icon: Building2,
      tag: 'Tender Collision & Overlap Check',
      actionText: 'Comparing Against Project #proj-001 (Highway Scheme)',
      description:
        'Scans active government budgets. Detects that Project #proj-001 (Mandla-Niwas-Shahpura Highway, ₹142.5 Cr) already operates in the district, but only widens the trunk highway, leaving rural feeder culverts stranded.',
      judgeFocus:
        'Observe the PARTIAL OVERLAP finding: instead of issuing an expensive duplicate tender, CivicTwin AI recommends a Scope Expansion Change Order to fund 18 feeder culverts under existing contractor mobilization.',
      setup: () => {
        onSelectCluster('clus-conn-01');
        onNavigateView('compiler');
      }
    },
    {
      step: 6,
      title: 'STEP 6: Generate Candidate Proposal & Save to Registry',
      view: 'compiler' as NavView,
      icon: CheckCircle2,
      tag: 'Persistent Proposal Creation',
      actionText: 'Reviewing Compiled Proposal & Saving to State Registry',
      description:
        'The candidate proposal card displays estimated cost (₹38.5 Cr), affected population (81,600), expected gap reduction (+42% pts), strategic alignment, assumptions, and confidence score.',
      judgeFocus:
        'Click "Create Project Candidate in Registry" to verify persistent storage into the decision pipeline.',
      setup: () => {
        onSelectCluster('clus-conn-01');
        onNavigateView('compiler');
      }
    },
    {
      step: 7,
      title: 'STEP 7: "What Happens If?" Capital Budget Simulator',
      view: 'simulator' as NavView,
      icon: Calculator,
      tag: 'Dynamic Policy Tradeoff Modeling',
      actionText: 'Comparing Scenario A (₹250 Cr) vs Scenario B (₹500 Cr)',
      description:
        'Dynamically recalculates how many citizens are reached and what percentage of infrastructure gaps are closed under different budget envelopes. Toggle between presets (₹100 Cr, ₹250 Cr, ₹500 Cr, ₹1,000 Cr).',
      judgeFocus:
        'Compare Scenario A (₹250 Cr reaches 4.1L citizens) vs Scenario B (₹500 Cr reaches 7.8L citizens). Notice transparent assumptions and unresolved need tracking.',
      setup: () => {
        onNavigateView('simulator');
      }
    },
    {
      step: 8,
      title: 'STEP 8: Evidence Explorer & Full Audit Trail',
      view: 'evidence' as NavView,
      icon: SearchCode,
      tag: 'Explainability & Closed-Loop Outcomes',
      actionText: 'Auditing Multi-Source Ground Truth for Recommendation #rec-001',
      description:
        'Every AI recommendation is traceable to 4 distinct ground evidence pillars: Citizen Voice, Audited Infrastructure Gaps, Demographic Vulnerability, and Active Scheme Audits. No fabricated evidence.',
      judgeFocus:
        'Review the AI Reasoning Summary and the four clickable evidence pillars supporting the Mandla-Dindori intervention.',
      setup: () => {
        onSelectRec('rec-001');
        onNavigateView('evidence');
      }
    }
  ];

  const current = STEPS[currentStep - 1] || STEPS[0];
  const Icon = current.icon;

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      const nextStep = currentStep + 1;
      onStepChange(nextStep);
      STEPS[nextStep - 1].setup();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      const prevStep = currentStep - 1;
      onStepChange(prevStep);
      STEPS[prevStep - 1].setup();
    }
  };

  const handleJump = (stepNum: number) => {
    onStepChange(stepNum);
    STEPS[stepNum - 1].setup();
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <div className="bg-slate-900/95 border-2 border-indigo-500 rounded-2xl p-5 shadow-2xl backdrop-blur-md text-white">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                  Judge Demo Mode · 3-Minute Guided Walkthrough
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                  Step {currentStep} of {STEPS.length}
                </span>
              </div>
              <h2 className="text-sm font-bold text-white leading-tight mt-0.5">
                {current.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={async () => {
                await onResetDemo();
                onStepChange(1);
                STEPS[0].setup();
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition"
              title="Reset Demo Data and restart tour"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset & Restart</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              title="Exit Judge Demo"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Narrative & Focus */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 text-xs mb-4">
          <div className="md:col-span-7 space-y-1.5">
            <p className="text-slate-200 leading-relaxed font-normal">
              {current.description}
            </p>
            <div className="text-[11px] text-indigo-300 font-medium">
              👉 {current.actionText}
            </div>
          </div>

          <div className="md:col-span-5 bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 space-y-1">
            <span className="text-[10px] font-bold uppercase text-amber-400 tracking-wider block">
              What to Evaluate:
            </span>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {current.judgeFocus}
            </p>
          </div>
        </div>

        {/* Step Indicator Progress Pills */}
        <div className="flex items-center justify-between gap-1 mb-4 overflow-x-auto pb-1">
          {STEPS.map((s) => (
            <button
              key={s.step}
              onClick={() => handleJump(s.step)}
              className={`flex-1 py-1.5 px-2 rounded-lg text-[10px] font-semibold transition text-center whitespace-nowrap ${
                currentStep === s.step
                  ? 'bg-indigo-600 text-white shadow-md'
                  : currentStep > s.step
                  ? 'bg-indigo-950 text-indigo-300 border border-indigo-800/60'
                  : 'bg-slate-950 text-slate-500 hover:text-slate-300'
              }`}
            >
              {s.step}. {s.tag.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
          <button
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium disabled:opacity-30 transition"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous Step</span>
          </button>

          <span className="text-[11px] text-slate-400 hidden sm:inline">
            Interactive Walkthrough · Real-time End-to-End Decision System
          </span>

          {currentStep < STEPS.length ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition"
            >
              <span>Next Step ({currentStep + 1} of {STEPS.length})</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition"
            >
              <span>Complete Walkthrough</span>
              <CheckCircle2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
