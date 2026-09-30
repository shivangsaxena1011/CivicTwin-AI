import React from 'react';
import {
  LayoutDashboard,
  MessageSquareText,
  Network,
  EyeOff,
  GitMerge,
  Cpu,
  Calculator,
  SearchCode,
  LineChart,
  Database,
  Sparkles,
  BookOpen,
  X,
  Layers,
  Globe2
} from 'lucide-react';

export type NavView =
  | 'landing'
  | 'command-center'
  | 'signals'
  | 'need-graph'
  | 'silent-gaps'
  | 'convergence'
  | 'compiler'
  | 'simulator'
  | 'evidence'
  | 'outcomes'
  | 'data-explorer';

interface SidebarProps {
  currentView: NavView;
  setCurrentView: (view: NavView) => void;
  onOpenShowcase: () => void;
  onOpenBrics: () => void;
  onOpenJudgeDemo: () => void;
  onOpenQAReport: () => void;
  silentGapsCount: number;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
  activeCountry?: string;
  setActiveCountry?: (c: string) => void;
  currentLanguage?: string;
  setCurrentLanguage?: (l: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  setCurrentView,
  onOpenShowcase,
  onOpenBrics,
  onOpenJudgeDemo,
  onOpenQAReport,
  silentGapsCount,
  isOpenMobile = false,
  onCloseMobile,
  activeCountry = 'India',
  setActiveCountry,
  currentLanguage = 'English',
  setCurrentLanguage
}) => {
  const languages = [
    { code: 'EN', name: 'English' },
    { code: 'HI', name: 'हिन्दी (Hindi)' },
    { code: 'MR', name: 'मराठी (Marathi)' },
    { code: 'TA', name: 'தமிழ் (Tamil)' },
    { code: 'BN', name: 'বাংলা (Bengali)' },
    { code: 'KN', name: 'ಕನ್ನಡ (Kannada)' },
    { code: 'OD', name: 'ଓଡ଼ିଆ (Odia)' }
  ];

  const navItems = [
    { id: 'command-center', label: 'Command Center', icon: LayoutDashboard },
    { id: 'signals', label: 'Citizen Signals', icon: MessageSquareText },
    { id: 'need-graph', label: 'Need Graph', icon: Network },
    {
      id: 'silent-gaps',
      label: 'Silent Gaps',
      icon: EyeOff,
      badge: silentGapsCount > 0 ? `${silentGapsCount} Flagged` : undefined,
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30'
    },
    {
      id: 'convergence',
      label: 'Need Convergence',
      icon: GitMerge,
      badge: 'Multi-Dept',
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
    },
    { id: 'compiler', label: 'Project Compiler', icon: Cpu },
    { id: 'simulator', label: 'Budget Simulator', icon: Calculator },
    { id: 'evidence', label: 'Evidence Explorer', icon: SearchCode },
    { id: 'outcomes', label: 'Outcomes (Closed Loop)', icon: LineChart },
    { id: 'data-explorer', label: 'Data Explorer', icon: Database }
  ];

  const handleItemClick = (id: NavView) => {
    setCurrentView(id);
    if (onCloseMobile) onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-950 text-slate-300 border-r border-slate-800">
      {/* Mobile drawer header */}
      <div className="lg:hidden p-4 border-b border-slate-800 bg-slate-950 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-indigo-600 flex items-center justify-center text-white">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <span className="font-bold text-sm text-white block leading-tight">CivicTwin AI</span>
              <span className="text-[10px] text-slate-400">Digital Public Good</span>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800 transition"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Mobile Country & Language Quick Bar */}
        <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
          <button
            onClick={() => {
              onOpenBrics();
              if (onCloseMobile) onCloseMobile();
            }}
            className="flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-200 font-medium hover:border-slate-700"
          >
            <Globe2 className="h-3.5 w-3.5 text-indigo-400" />
            <span className="truncate">{activeCountry}</span>
          </button>

          {setCurrentLanguage && (
            <select
              value={currentLanguage}
              onChange={(e) => setCurrentLanguage(e.target.value)}
              className="bg-slate-900 border border-slate-800 text-xs text-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:border-indigo-500 truncate"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.name}>
                  {l.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Navigation items list */}
      <div className="p-3 flex-1 overflow-y-auto space-y-1">
        <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          Intelligence Modules
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id as NavView)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`h-4 w-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded border ${
                    isActive ? 'bg-white/20 text-white border-white/30' : item.badgeColor
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Showcase Card, Judge Demo, QA & DPG Architecture */}
      <div className="p-3 border-t border-slate-800/80 space-y-2 bg-slate-950/80 shrink-0">
        {/* Judge Demo Guided 3-Minute Walkthrough Button */}
        <button
          onClick={() => {
            onOpenJudgeDemo();
            if (onCloseMobile) onCloseMobile();
          }}
          className="w-full text-left p-2.5 rounded-lg bg-gradient-to-r from-amber-950/60 to-indigo-950/60 border border-amber-500/50 hover:border-amber-400 transition group shadow-sm"
        >
          <div className="flex items-center justify-between text-[11px] font-bold text-amber-300 mb-0.5">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
              <span>Judge Demo (3-Min Tour)</span>
            </div>
            <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/30 text-amber-200">
              8 Steps
            </span>
          </div>
          <p className="text-[10px] text-slate-300 leading-tight">
            Guided end-to-end evaluation flow
          </p>
        </button>

        {/* Showcase Scenario Quick Button */}
        <button
          onClick={() => {
            onOpenShowcase();
            if (onCloseMobile) onCloseMobile();
          }}
          className="w-full text-left p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition group"
        >
          <div className="flex items-center gap-1 text-[11px] font-semibold text-indigo-300">
            <span>Showcase: Mandla Road Washout</span>
          </div>
        </button>

        {/* QA Report & DPG Architecture */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => {
              onOpenQAReport();
              if (onCloseMobile) onCloseMobile();
            }}
            className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 text-[10px] text-emerald-300 transition"
          >
            <span>QA Audit (15/15)</span>
          </button>

          <button
            onClick={() => {
              onOpenBrics();
              if (onCloseMobile) onCloseMobile();
            }}
            className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-[10px] text-slate-400 hover:text-slate-200 transition"
          >
            <span>DPG & BRICS</span>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar (>= lg) */}
      <aside className="hidden lg:flex w-64 shrink-0 h-[calc(100vh-57px)] sticky top-[57px]">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-over Drawer (< lg) */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />

          {/* Drawer content panel */}
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
