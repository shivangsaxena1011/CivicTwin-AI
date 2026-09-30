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
  Info,
  Menu
} from 'lucide-react';

interface NavbarProps {
  onOpenCopilot: () => void;
  onOpenBrics: () => void;
  onOpenShowcase: () => void;
  onOpenJudgeDemo: () => void;
  onOpenQAReport: () => void;
  onRefreshData: () => void;
  onToggleMobileMenu?: () => void;
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
  onToggleMobileMenu,
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
      <header className="sticky top-0 z-40 bg-slate-950 border-b border-slate-800 text-slate-100 px-3 sm:px-4 lg:px-6 py-2.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo, Hamburger & Identity */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Mobile Menu Hamburger */}
            <button
              onClick={onToggleMobileMenu}
              className="lg:hidden p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>

            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center font-bold text-white shadow-md shrink-0">
              <Layers className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>

            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-bold text-base sm:text-lg tracking-tight text-white whitespace-nowrap">
                  CivicTwin AI
                </span>
                <span className="hidden sm:inline-block text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  DPG
                </span>
                <span className="hidden md:inline-block text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  BRICS Innovation
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block truncate max-w-[200px] md:max-w-none">
                Citizen-to-Infrastructure Decision Intelligence System
              </p>
            </div>
          </div>

          {/* Center: Core 4 Questions Tooltip/Badge */}
          <button
            onClick={onOpenShowcase}
            className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-slate-700 transition shrink-0"
            title="The 4 Core Questions of CivicTwin AI"
          >
            <HelpCircle className="h-3.5 w-3.5 text-indigo-400" />
            <span>Core Questions: Voice → Gap → Collision → Intervention</span>
          </button>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* BRICS Country Selector */}
            <div className="relative hidden md:block">
              <button
                onClick={onOpenBrics}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-200 hover:border-slate-700 transition"
              >
                <Globe2 className="h-3.5 w-3.5 text-indigo-400" />
                <span>{activeCountry}</span>
              </button>
            </div>

            {/* Language Selector */}
            <select
              value={currentLanguage}
              onChange={(e) => setCurrentLanguage(e.target.value)}
              className="hidden sm:block bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-indigo-500"
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
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-200 text-xs font-semibold shadow-xs transition"
              title="Launch 3-Minute Guided Evaluation Tour"
            >
              <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
              <span className="hidden sm:inline">Judge Demo</span>
              <span className="sm:hidden">Tour</span>
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

            {/* Copilot Toggle */}
            <button
              onClick={onOpenCopilot}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-950/80 border border-indigo-700/60 hover:bg-indigo-900 text-indigo-200 text-xs font-medium transition"
              title="Open CivicTwin AI Copilot"
            >
              <Bot className="h-4 w-4 text-indigo-400" />
              <span className="hidden sm:inline">Copilot</span>
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
