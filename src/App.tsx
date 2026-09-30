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
      alert(`Candidate proposal "${saved.title}" successfully persisted in state registry!`);
    } catch (err) {
      console.error(err);
      setRecommendations((prev) => [newRec, ...prev]);
      alert(`Saved proposal locally: "${newRec.title}"`);
    }
  };

  const handleResetDemo = async () => {
    try {
      await fetch('/api/demo/reset');
      await loadData();
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
          {/* Left Sidebar */}
          <Sidebar
            currentView={currentView}
            setCurrentView={setCurrentView}
            onOpenShowcase={() => setIsShowcaseOpen(true)}
            onOpenBrics={() => setIsBricsOpen(true)}
            onOpenJudgeDemo={handleStartJudgeDemo}
            onOpenQAReport={() => setIsQAReportOpen(true)}
            silentGapsCount={silentGaps.length}
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
        </div>
      )}

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
