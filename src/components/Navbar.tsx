import React, { useState } from 'react';
import {
  Globe2,
  Sparkles,
  RotateCcw,
  Bot,
  Layers,
  HelpCircle,
  Play,
  CheckCircle2,
  Info
} from 'lucide-react';

interface NavbarProps {
  onOpenCopilot: () => void;
  onOpenBrics: () => void;
  onOpenShowcase: () => void;
  onOpenJudgeDemo: () => void;
  onOpenQAReport: () => void;
  onRefreshData: () => void;
  activeCountry: string;
  setActiveCountry: (c: string) => void;
  currentLanguage: string;
  setCurrentLanguage: (l: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCopilot,
  onOpenBrics,
  onOpenShowcase,
  onOpenJudgeDemo,
  onOpenQAReport,
  onRefreshData,
  activeCountry,
  setActiveCountry,
  currentLanguage,
  setCurrentLanguage
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [resetting, setResetting] = useState(false);

  const countries = [
    { code: 'IN', name: 'India', status: 'Active Seeded Dataset' },
    { code: 'BR', name: 'Brazil', status: 'Integration-Ready' },
    { code: 'RU', name: 'Russia', status: 'Integration-Ready' },
    { code: 'CN', name: 'China', status: 'Integration-Ready' },
    { code: 'ZA', name: 'South Africa', status: 'Integration-Ready' }
  ];

  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'HI', name: 'हिन्दी (Hindi)' },
    { code: 'MR', name: 'मराठी (Marathi)' },
    { code: 'TA', name: 'தமிழ் (Tamil)' },
    { code: 'BN', name: 'বাংলা (Bengali)' },
    { code: 'KN', name: 'ಕನ್ನಡ (Kannada)' },
    { code: 'OD', name: 'ଓଡ଼ିଆ (Odia)' }
  ];

  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    setShowAnalysisModal(true);
    setAnalysisStep(1);

    const steps = [
      'Ingesting multilingual citizen signals & translating intents...',
      'Synthesizing spatial need clusters & estimating population impact...',
      'Running Silent Gap cross-referencing against digital participation indices...',
      'Executing Need Convergence multi-department root cause detection...',
      'Comparing candidate interventions with existing approved projects...',
      'Analysis complete. Dashboard and evidence chains refreshed.'
    ];

    for (let i = 0; i < steps.length; i++) {
      setAnalysisStep(i + 1);
      await new Promise((r) => setTimeout(r, 600));
    }

    try {
      await fetch('/api/demo/run-analysis', { method: 'POST' });
      onRefreshData();
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
      setTimeout(() => setShowAnalysisModal(false), 800);
    }
  };

  const handleReset = async () => {
    setResetting(true);
    try {
      await fetch('/api/demo/reset');
      onRefreshData();
    } catch (err) {
      console.error(err);
    } finally {
      setResetting(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-950 border-b border-slate-800 text-slate-100 px-4 lg:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo & Identity */}
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center font-bold text-white shadow-md">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight text-white">CivicTwin AI</span>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Digital Public Good
                </span>
                <span className="hidden md:inline-block text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  BRICS Innovation
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Citizen-to-Infrastructure Decision Intelligence System
              </p>
            </div>
          </div>

          {/* Center: Core 4 Questions Tooltip/Badge */}
          <button
            onClick={onOpenShowcase}
            className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition"
            title="The 4 Core Questions of CivicTwin AI"
          >
            <HelpCircle className="h-3.5 w-3.5 text-indigo-400" />
            <span>Core Questions: Voice → Gap → Project Collision → Intervention</span>
          </button>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* BRICS Country Selector */}
            <div className="relative">
              <button
                onClick={onOpenBrics}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-200 hover:border-slate-700 transition"
              >
                <Globe2 className="h-3.5 w-3.5 text-indigo-400" />
                <span>{activeCountry}</span>
                <span className="hidden md:inline text-[10px] text-slate-400">
                  {activeCountry === 'India' ? '(Seeded)' : '(Adapter-Ready)'}
                </span>
              </button>
            </div>

            {/* Language Selector */}
            <select
              value={currentLanguage}
              onChange={(e) => setCurrentLanguage(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-indigo-500"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.name}>
                  {l.name}
                </option>
              ))}
            </select>

            {/* Judge Demo Quick Action */}
            <button
              onClick={onOpenJudgeDemo}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 text-xs font-semibold shadow-xs transition"
              title="Launch 3-Minute Guided Evaluation Tour"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
              <span>Judge Demo</span>
            </button>

            {/* QA Audit Action */}
            <button
              onClick={onOpenQAReport}
              className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-medium transition"
              title="Open QA Verification Audit Matrix"
            >
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
              <span>QA Matrix</span>
            </button>

            {/* Demo Mode Badge */}
            <div className="hidden xl:flex items-center gap-1.5 px-2 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-medium">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>Demo Mode</span>
            </div>

            {/* Run Analysis Action */}
            <button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-medium shadow-sm transition disabled:opacity-50"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Run CivicTwin Analysis</span>
              <span className="sm:hidden">Run</span>
            </button>

            {/* Reset Data */}
            <button
              onClick={handleReset}
              disabled={resetting}
              className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition"
              title="Reset Demo Data to Default Baseline"
            >
              <RotateCcw className={`h-4 w-4 ${resetting ? 'animate-spin' : ''}`} />
            </button>

            {/* Copilot Toggle */}
            <button
              onClick={onOpenCopilot}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/80 border border-indigo-700/60 hover:bg-indigo-900 text-indigo-200 text-xs font-medium transition"
            >
              <Bot className="h-4 w-4 text-indigo-400" />
              <span className="hidden sm:inline">AI Copilot</span>
            </button>
          </div>
        </div>
      </header>

      {/* Analysis Running Modal */}
      {showAnalysisModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-lg bg-indigo-500/20 text-indigo-400">
                <Sparkles className="h-6 w-6 animate-spin" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-white">Running CivicTwin AI Inference</h3>
                <p className="text-xs text-slate-400">Citizen-to-Infrastructure Pipeline</p>
              </div>
            </div>

            <div className="space-y-2.5 mb-5 text-xs">
              {[
                'Ingesting multilingual citizen signals (WhatsApp, IVR, Voice, SMS)',
                'Clustering underlying needs & estimating population reach',
                'Calculating Silent Gap indices (Participation vs Deficit)',
                'Executing cross-department Need Convergence analysis',
                'Checking Project Collision against active government schemes',
                'Compiling evidence-backed intervention recommendations'
              ].map((stepText, idx) => {
                const isPast = analysisStep > idx + 1;
                const isCurrent = analysisStep === idx + 1;
                return (
                  <div key={idx} className="flex items-center gap-2">
                    {isPast ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    ) : isCurrent ? (
                      <div className="h-4 w-4 rounded-full border-2 border-indigo-400 border-t-transparent animate-spin shrink-0" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border border-slate-700 shrink-0" />
                    )}
                    <span className={isPast ? 'text-slate-300' : isCurrent ? 'text-indigo-300 font-medium' : 'text-slate-600'}>
                      {stepText}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-indigo-500 h-1.5 transition-all duration-300"
                style={{ width: `${(analysisStep / 6) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
