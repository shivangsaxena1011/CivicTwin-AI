import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.js';
import { Sidebar, NavView } from './components/Sidebar.js';
import { LandingView } from './components/LandingView.js';
import { CommandCenter } from './components/CommandCenter.js';
import { SignalsInbox } from './components/SignalsInbox.js';
import { SilentGapsView } from './components/SilentGapsView.js';
import { ConvergenceView } from './components/ConvergenceView.js';
import { NeedGraphView } from './components/NeedGraphView.js';
import { ProjectCompilerView } from './components/ProjectCompilerView.js';
import { BudgetSimulatorView } from './components/BudgetSimulatorView.js';
import { EvidenceExplorerView } from './components/EvidenceExplorerView.js';
import { OutcomesView } from './components/OutcomesView.js';
import { DataExplorerView } from './components/DataExplorerView.js';
import { CopilotModal } from './components/CopilotModal.js';
import { BricsModal } from './components/BricsModal.js';
import { DemoScenarioModal } from './components/DemoScenarioModal.js';
import { JudgeDemoTour } from './components/JudgeDemoTour.js';
import { QAReportModal } from './components/QAReportModal.js';
import {
  LayoutDashboard,
  MessageSquareText,
  EyeOff,
  Cpu,
  Menu,
  CheckCircle2,
  AlertTriangle,
  Info,
  X
} from 'lucide-react';

import {
  CitizenSignal,
  DemographicIndicator,
  InfrastructureIndicator,
  NeedCluster,
  NeedConvergenceGroup,
  Outcome,
  Project,
  Recommendation,
  SilentGapItem
} from './types.js';

interface ToastItem {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

export default function App() {
  const [currentView, setCurrentView] = useState<NavView>('landing');
  const [activeCountry, setActiveCountry] = useState<string>('India');
  const [currentLanguage, setCurrentLanguage] = useState<string>('English');

  // Modals
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);
  const [isBricsOpen, setIsBricsOpen] = useState<boolean>(false);
  const [isShowcaseOpen, setIsShowcaseOpen] = useState<boolean>(false);
  const [isJudgeDemoOpen, setIsJudgeDemoOpen] = useState<boolean>(false);
  const [judgeDemoStep, setJudgeDemoStep] = useState<number>(1);
  const [isQAReportOpen, setIsQAReportOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // In-app non-blocking toasts (replaces window.alert for iframe compatibility)
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cross-view selection state
  const [selectedClusterId, setSelectedClusterId] = useState<string>('clus-conn-01');
  const [selectedRecId, setSelectedRecId] = useState<string>('rec-001');

  // Repository Data State
  const [signals, setSignals] = useState<CitizenSignal[]>([]);
  const [clusters, setClusters] = useState<NeedCluster[]>([]);
  const [infrastructure, setInfrastructure] = useState<InfrastructureIndicator[]>([]);
  const [demographics, setDemographics] = useState<DemographicIndicator[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [outcomes, setOutcomes] = useState<Outcome[]>([]);
  const [silentGaps, setSilentGaps] = useState<SilentGapItem[]>([]);
  const [convergenceGroups, setConvergenceGroups] = useState<NeedConvergenceGroup[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Load all repository data
  const loadData = async () => {
    try {
      const [
        sigRes,
        clusRes,
        infraRes,
        demoRes,
        projRes,
        recRes,
        outRes,
        sgRes,
        convRes
      ] = await Promise.all([
        fetch('/api/signals').then((r) => r.json()),
        fetch('/api/needs').then((r) => r.json()),
        fetch('/api/infrastructure').then((r) => r.json()),
        fetch('/api/demographics').then((r) => r.json()),
        fetch('/api/projects').then((r) => r.json()),
        fetch('/api/recommendations').then((r) => r.json()),
        fetch('/api/outcomes').then((r) => r.json()),
        fetch('/api/silent-gaps').then((r) => r.json()),
        fetch('/api/convergence').then((r) => r.json())
      ]);

      if (sigRes?.signals) setSignals(sigRes.signals);
      if (clusRes?.clusters) setClusters(clusRes.clusters);
      if (infraRes?.indicators) setInfrastructure(infraRes.indicators);
      if (demoRes?.demographics) setDemographics(demoRes.demographics);
      if (projRes?.projects) setProjects(projRes.projects);
      if (recRes?.recommendations) setRecommendations(recRes.recommendations);
      if (outRes?.outcomes) setOutcomes(outRes.outcomes);
      if (sgRes?.silentGaps) setSilentGaps(sgRes.silentGaps);
      if (convRes?.convergenceGroups) setConvergenceGroups(convRes.convergenceGroups);
    } catch (err) {
      console.error('Failed to load repository data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleIngestSignal = (newSignal: CitizenSignal) => {
    setSignals((prev) => [newSignal, ...prev]);
    setClusters((prev) =>
      prev.map((c) =>
        c.id === newSignal.clusterId
          ? { ...c, signalCount: (c.signalCount || 0) + 1 }
          : c
      )
    );
    showToast(`Signal ingested: "${newSignal.subCategory}" (${newSignal.language})`, 'success');
  };

  const handleSaveCandidate = async (newRec: Recommendation) => {
    try {
      const res = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRec)
      });
      const data = await res.json();
      const saved = data.recommendation || newRec;
      setRecommendations((prev) => [saved, ...prev.filter((r) => r.id !== saved.id)]);
      setSelectedRecId(saved.id);

      // Keep projects in sync with newly created candidate project
      const projRes = await fetch('/api/projects').then((r) => r.json());
      if (projRes?.projects) {
        setProjects(projRes.projects);
      }

      showToast(`Candidate proposal "${saved.title}" saved to registry!`, 'success');
    } catch (err) {
      console.error(err);
      setRecommendations((prev) => [newRec, ...prev]);
      showToast(`Saved proposal locally: "${newRec.title}"`, 'info');
    }
  };

  const handleResetDemo = async () => {
    try {
      await fetch('/api/demo/reset');
      await loadData();
      showToast('CivicTwin AI data reset to default baseline state.', 'info');
    } catch (e) {
      console.error(e);
    }
  };

  const handleStartJudgeDemo = async () => {
    await handleResetDemo();
    setJudgeDemoStep(1);
    setIsJudgeDemoOpen(true);
    setCurrentView('signals');
  };

  const handleSelectCluster = (clusterId: string) => {
    setSelectedClusterId(clusterId);
    setCurrentView('compiler');
  };

  const handleOpenCompilerForRegion = (regionName: string) => {
    const matched = clusters.find((c) =>
      c.locations.some((l) => regionName.toLowerCase().includes(l.district.toLowerCase()))
    );
    if (matched) {
      setSelectedClusterId(matched.id);
    }
    setCurrentView('compiler');
  };

  const handleOpenEvidence = (recId: string) => {
    setSelectedRecId(recId);
    setCurrentView('evidence');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        onOpenCopilot={() => setIsCopilotOpen(true)}
        onOpenBrics={() => setIsBricsOpen(true)}
        onOpenShowcase={() => setIsShowcaseOpen(true)}
        onOpenJudgeDemo={handleStartJudgeDemo}
        onOpenQAReport={() => setIsQAReportOpen(true)}
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onRefreshData={loadData}
        activeCountry={activeCountry}
        setActiveCountry={setActiveCountry}
        currentLanguage={currentLanguage}
        setCurrentLanguage={setCurrentLanguage}
      />

      {/* Main Layout */}
      {currentView === 'landing' ? (
        <LandingView
          onEnterApp={(view) => setCurrentView(view || 'command-center')}
          onOpenShowcase={() => setIsShowcaseOpen(true)}
          onOpenBrics={() => setIsBricsOpen(true)}
        />
      ) : (
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar (Desktop + Mobile Drawer) */}
          <Sidebar
            currentView={currentView}
            setCurrentView={setCurrentView}
            onOpenShowcase={() => setIsShowcaseOpen(true)}
            onOpenBrics={() => setIsBricsOpen(true)}
            onOpenJudgeDemo={handleStartJudgeDemo}
            onOpenQAReport={() => setIsQAReportOpen(true)}
            silentGapsCount={silentGaps.length}
            isOpenMobile={isMobileMenuOpen}
            onCloseMobile={() => setIsMobileMenuOpen(false)}
            activeCountry={activeCountry}
            setActiveCountry={setActiveCountry}
            currentLanguage={currentLanguage}
            setCurrentLanguage={setCurrentLanguage}
          />

          {/* Active View Container */}
          <main className="flex-1 overflow-y-auto bg-slate-950 pb-28">
            {currentView === 'command-center' && (
              <CommandCenter
                signals={signals}
                clusters={clusters}
                infrastructure={infrastructure}
                demographics={demographics}
                projects={projects}
                recommendations={recommendations}
                silentGaps={silentGaps}
                onSelectCluster={handleSelectCluster}
                onNavigateView={setCurrentView}
              />
            )}

            {currentView === 'signals' && (
              <SignalsInbox
                signals={signals}
                onIngestSignal={handleIngestSignal}
                onSelectCluster={handleSelectCluster}
                showToast={showToast}
              />
            )}

            {currentView === 'silent-gaps' && (
              <SilentGapsView
                silentGaps={silentGaps}
                onOpenCompilerForRegion={handleOpenCompilerForRegion}
              />
            )}

            {currentView === 'convergence' && (
              <ConvergenceView
                convergenceGroups={convergenceGroups}
                onSelectCluster={handleSelectCluster}
              />
            )}

            {currentView === 'need-graph' && (
              <NeedGraphView
                clusters={clusters}
                projects={projects}
                signals={signals}
                infrastructure={infrastructure}
                onOpenCompiler={handleSelectCluster}
              />
            )}

            {currentView === 'compiler' && (
              <ProjectCompilerView
                clusters={clusters}
                projects={projects}
                recommendations={recommendations}
                initialClusterId={selectedClusterId}
                onOpenEvidence={handleOpenEvidence}
                onSaveCandidate={handleSaveCandidate}
              />
            )}

            {currentView === 'simulator' && (
              <BudgetSimulatorView recommendations={recommendations} />
            )}

            {currentView === 'evidence' && (
              <EvidenceExplorerView
                recommendations={recommendations}
                signals={signals}
                infrastructure={infrastructure}
                demographics={demographics}
                projects={projects}
                selectedRecId={selectedRecId}
              />
            )}

            {currentView === 'outcomes' && <OutcomesView outcomes={outcomes} />}

            {currentView === 'data-explorer' && (
              <DataExplorerView
                signals={signals}
                infrastructure={infrastructure}
                demographics={demographics}
                projects={projects}
                recommendations={recommendations}
                outcomes={outcomes}
              />
            )}
          </main>

          {/* Mobile Bottom Navigation Bar (< lg) */}
          <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-950/95 border-t border-slate-800 backdrop-blur-md px-1 py-1.5 flex items-center justify-around text-[10px] shadow-2xl safe-area-bottom">
            <button
              onClick={() => setCurrentView('command-center')}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition min-w-[56px] ${
                currentView === 'command-center'
                  ? 'text-indigo-400 font-bold bg-indigo-500/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutDashboard className="h-4 w-4 mb-0.5" />
              <span>Command</span>
            </button>

            <button
              onClick={() => setCurrentView('signals')}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition min-w-[56px] ${
                currentView === 'signals'
                  ? 'text-indigo-400 font-bold bg-indigo-500/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MessageSquareText className="h-4 w-4 mb-0.5" />
              <span>Signals</span>
            </button>

            <button
              onClick={() => setCurrentView('silent-gaps')}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition relative min-w-[56px] ${
                currentView === 'silent-gaps'
                  ? 'text-amber-400 font-bold bg-amber-500/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <EyeOff className="h-4 w-4 mb-0.5" />
              <span>Silent Gaps</span>
              {silentGaps.length > 0 && (
                <span className="absolute top-0.5 right-2 h-2 w-2 rounded-full bg-amber-500" />
              )}
            </button>

            <button
              onClick={() => setCurrentView('compiler')}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition min-w-[56px] ${
                currentView === 'compiler'
                  ? 'text-indigo-400 font-bold bg-indigo-500/10'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Cpu className="h-4 w-4 mb-0.5" />
              <span>Compiler</span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-slate-400 hover:text-white min-w-[56px]"
              aria-label="Open full menu"
            >
              <Menu className="h-4 w-4 mb-0.5" />
              <span>More</span>
            </button>
          </nav>
        </div>
      )}

      {/* Floating In-App Toast Notifications (No window.alert in iframe) */}
      <div className="fixed top-16 right-3 sm:right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-2 sm:px-0">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3 rounded-xl shadow-xl border flex items-center justify-between gap-3 text-xs backdrop-blur-md transition-all ${
              toast.type === 'success'
                ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200'
                : toast.type === 'warning'
                ? 'bg-amber-950/90 border-amber-500/50 text-amber-200'
                : 'bg-indigo-950/90 border-indigo-500/50 text-indigo-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {toast.type === 'success' ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              ) : toast.type === 'warning' ? (
                <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
              ) : (
                <Info className="h-4 w-4 text-indigo-400 shrink-0" />
              )}
              <span>{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 rounded hover:bg-white/10 text-white/70 hover:text-white shrink-0"
              aria-label="Dismiss toast"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Guided Judge Demo Tour Panel */}
      <JudgeDemoTour
        isOpen={isJudgeDemoOpen}
        currentStep={judgeDemoStep}
        onStepChange={setJudgeDemoStep}
        onClose={() => setIsJudgeDemoOpen(false)}
        onResetDemo={handleResetDemo}
        onNavigateView={setCurrentView}
        onSelectCluster={setSelectedClusterId}
        onSelectRec={setSelectedRecId}
      />

      {/* QA Verification Report Modal */}
      <QAReportModal
        isOpen={isQAReportOpen}
        onClose={() => setIsQAReportOpen(false)}
      />

      {/* Floating Copilot Modal */}
      <CopilotModal
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        onNavigateView={setCurrentView}
      />

      {/* BRICS Extensibility Modal */}
      <BricsModal
        isOpen={isBricsOpen}
        onClose={() => setIsBricsOpen(false)}
        activeCountry={activeCountry}
        setActiveCountry={setActiveCountry}
      />

      {/* Showcase Demo Scenario Modal */}
      <DemoScenarioModal
        isOpen={isShowcaseOpen}
        onClose={() => setIsShowcaseOpen(false)}
        onNavigateToCompiler={handleSelectCluster}
      />
    </div>
  );
}
