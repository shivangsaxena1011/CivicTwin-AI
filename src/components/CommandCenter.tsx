import React, { useState } from 'react';
import {
  MessageSquareText,
  Network,
  EyeOff,
  Users,
  Briefcase,
  AlertTriangle,
  Layers,
  MapPin,
  ChevronRight,
  TrendingUp,
  Info,
  CheckCircle2,
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import {
  CitizenSignal,
  DemographicIndicator,
  InfrastructureIndicator,
  NeedCluster,
  Project,
  Recommendation,
  SilentGapItem
} from '../types.js';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

interface CommandCenterProps {
  signals: CitizenSignal[];
  clusters: NeedCluster[];
  infrastructure: InfrastructureIndicator[];
  demographics: DemographicIndicator[];
  projects: Project[];
  recommendations: Recommendation[];
  silentGaps: SilentGapItem[];
  onSelectCluster: (clusterId: string) => void;
  onNavigateView: (view: any) => void;
}

export const CommandCenter: React.FC<CommandCenterProps> = ({
  signals,
  clusters,
  infrastructure,
  demographics,
  projects,
  recommendations,
  silentGaps,
  onSelectCluster,
  onNavigateView
}) => {
  const [activeLayer, setActiveLayer] = useState<'all' | 'demand' | 'silent' | 'projects' | 'recommendations'>('all');
  const [selectedRegion, setSelectedRegion] = useState<string>('Mandla, Madhya Pradesh');

  // Key Totals
  const totalSignals = signals.length;
  const totalClusters = clusters.length;
  const totalSilentGaps = silentGaps.length;
  const totalPopulationAffected = clusters.reduce((acc, c) => acc + c.affectedPopulation, 0);
  const totalActiveProjectsBudget = projects.reduce((acc, p) => acc + p.budget, 0);
  const totalUnaddressedClusters = clusters.filter((c) => c.status === 'Unaddressed').length;

  // Selected Region Drilldown details
  const regionDemo = demographics.find((d) => d.region === selectedRegion) || demographics[0];
  const regionSignals = signals.filter((s) => s.district.toLowerCase() === regionDemo?.district.toLowerCase());
  const regionInfra = infrastructure.filter((i) => i.district.toLowerCase() === regionDemo?.district.toLowerCase());
  const regionProjects = projects.filter((p) => p.district.toLowerCase() === regionDemo?.district.toLowerCase());
  const regionClusters = clusters.filter((c) =>
    c.locations.some((l) => l.district.toLowerCase() === regionDemo?.district.toLowerCase())
  );
  const regionSilentGaps = silentGaps.filter((g) => g.district.toLowerCase() === regionDemo?.district.toLowerCase());

  // Category breakdown for chart
  const categoryCounts: Record<string, number> = {};
  for (const s of signals) {
    categoryCounts[s.issueCategory] = (categoryCounts[s.issueCategory] || 0) + 1;
  }
  const categoryChartData = Object.entries(categoryCounts).map(([name, count]) => ({
    name: name.split(' ')[0], // short name
    fullName: name,
    count
  }));

  // Map markers locations (pre-calculated coords across India)
  const mapNodes = [
    { name: 'Mandla, Madhya Pradesh', lat: 22.6, lng: 80.37, type: 'cluster', showcase: true, label: 'Mandla (Showcase)' },
    { name: 'Dindori, Madhya Pradesh', lat: 22.95, lng: 81.08, type: 'cluster', label: 'Dindori' },
    { name: 'Jalna, Maharashtra', lat: 19.84, lng: 75.88, type: 'cluster', label: 'Jalna' },
    { name: 'Gadchiroli, Maharashtra', lat: 20.18, lng: 80.0, type: 'silent', label: 'Gadchiroli (Silent)' },
    { name: 'Barmer, Rajasthan', lat: 25.75, lng: 71.4, type: 'cluster', label: 'Barmer' },
    { name: 'Araria, Bihar', lat: 26.15, lng: 87.51, type: 'silent', label: 'Araria (Silent)' },
    { name: 'Thiruvallur, Tamil Nadu', lat: 13.14, lng: 79.91, type: 'cluster', label: 'Thiruvallur' },
    { name: 'Raichur, Karnataka', lat: 16.21, lng: 77.35, type: 'cluster', label: 'Raichur' },
    { name: 'South 24 Parganas, West Bengal', lat: 22.18, lng: 88.54, type: 'cluster', label: 'Sundarbans' },
    { name: 'Kalahandi, Odisha', lat: 19.91, lng: 83.11, type: 'cluster', label: 'Kalahandi' },
    { name: 'Sonbhadra, Uttar Pradesh', lat: 24.68, lng: 82.98, type: 'cluster', label: 'Sonbhadra' },
    { name: 'Nandurbar, Maharashtra', lat: 21.37, lng: 74.24, type: 'silent', label: 'Nandurbar (Silent)' },
    { name: 'Malkangiri, Odisha', lat: 18.35, lng: 81.89, type: 'silent', label: 'Malkangiri (Silent)' }
  ];

  // SVG coordinate transformation for India map (approx bounding box: 68E-97E, 8N-36N)
  const projectCoords = (lat: number, lng: number) => {
    const minLng = 68.0;
    const maxLng = 92.0;
    const minLat = 8.0;
    const maxLat = 32.0;

    const x = ((lng - minLng) / (maxLng - minLng)) * 520 + 40;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 480 + 30;
    return { x: Math.max(30, Math.min(560, x)), y: Math.max(30, Math.min(520, y)) };
  };

  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#3b82f6'];

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Title & Status */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Executive Command Center</span>
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              Live Synthesis
            </span>
          </h1>
          <p className="text-xs text-slate-400">
            Real-time cross-referencing of citizen voice, deep spatial indicators, and public capital schemes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigateView('signals')}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 transition"
          >
            + Ingest Signal
          </button>
          <button
            onClick={() => onNavigateView('compiler')}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs text-white font-medium shadow-sm transition"
          >
            Open Project Compiler →
          </button>
        </div>
      </div>

      {/* 6 Top KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Citizen Signals</span>
            <MessageSquareText className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="text-xl font-bold text-white">{totalSignals}</div>
          <span className="text-[10px] text-slate-500">6 languages ingested</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Need Clusters</span>
            <Network className="h-4 w-4 text-violet-400" />
          </div>
          <div className="text-xl font-bold text-white">{totalClusters}</div>
          <span className="text-[10px] text-slate-500">Spatial aggregations</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Silent Gaps</span>
            <EyeOff className="h-4 w-4 text-amber-400" />
          </div>
          <div className="text-xl font-bold text-amber-300">{totalSilentGaps}</div>
          <span className="text-[10px] text-amber-400/80">Low voice / high deficit</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Affected Citizens</span>
            <Users className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold text-white">
            {(totalPopulationAffected / 1000000).toFixed(2)}M
          </div>
          <span className="text-[10px] text-slate-500">Population impacted</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Active Schemes</span>
            <Briefcase className="h-4 w-4 text-cyan-400" />
          </div>
          <div className="text-xl font-bold text-white">₹{totalActiveProjectsBudget} Cr</div>
          <span className="text-[10px] text-slate-500">{projects.length} schemes audited</span>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1">
            <span>Unresolved Gaps</span>
            <AlertTriangle className="h-4 w-4 text-rose-400" />
          </div>
          <div className="text-xl font-bold text-rose-300">{totalUnaddressedClusters}</div>
          <span className="text-[10px] text-rose-400/80">Zero current coverage</span>
        </div>
      </div>

      {/* Main Map + Region Drilldown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Map View */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-sm font-semibold text-white flex items-center gap-2">
                <Compass className="h-4 w-4 text-indigo-400" />
                <span>Geographic Intelligence & Clustered Need Map</span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Click any marker to inspect ground indicators, coverage status, and unresolved needs.
              </p>
            </div>

            {/* Map Layer Toggles */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs overflow-x-auto max-w-full">
              <button
                onClick={() => setActiveLayer('all')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium whitespace-nowrap transition ${
                  activeLayer === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                All Layers
              </button>
              <button
                onClick={() => setActiveLayer('demand')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium whitespace-nowrap transition ${
                  activeLayer === 'demand' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Citizen Demand
              </button>
              <button
                onClick={() => setActiveLayer('silent')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium whitespace-nowrap transition ${
                  activeLayer === 'silent' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Silent Gaps
              </button>
              <button
                onClick={() => setActiveLayer('projects')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium whitespace-nowrap transition ${
                  activeLayer === 'projects' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Existing Projects
              </button>
            </div>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full h-[320px] sm:h-[440px] bg-slate-950/70 border border-slate-800/80 rounded-lg overflow-hidden flex items-center justify-center">
            <svg viewBox="0 0 600 550" className="w-full h-full select-none">
              {/* Subtle Map Grid lines */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="600" height="550" fill="url(#grid)" />

              {/* Simplified India Territorial Outline */}
              <path
                d="M 280,30 L 320,50 L 340,90 L 390,110 L 460,110 L 490,140 L 460,160 L 410,160 L 380,180 L 370,220 L 400,260 L 380,300 L 350,330 L 320,380 L 290,440 L 280,480 L 260,440 L 240,380 L 210,340 L 190,300 L 180,240 L 190,200 L 200,160 L 240,120 L 250,70 Z"
                fill="rgba(30, 41, 59, 0.4)"
                stroke="rgba(71, 85, 105, 0.5)"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />

              {/* Markers */}
              {mapNodes.map((node) => {
                const { x, y } = projectCoords(node.lat, node.lng);
                const isSelected = selectedRegion === node.name;
                const isSilent = node.type === 'silent';
                const isShowcase = node.showcase;

                // Layer filter
                if (activeLayer === 'demand' && isSilent) return null;
                if (activeLayer === 'silent' && !isSilent) return null;

                const fillColor = isShowcase
                  ? '#6366f1' // Indigo showcase
                  : isSilent
                  ? '#f59e0b' // Amber silent gap
                  : '#8b5cf6'; // Violet cluster

                return (
                  <g
                    key={node.name}
                    className="cursor-pointer transition-transform hover:scale-110"
                    onClick={() => setSelectedRegion(node.name)}
                  >
                    {/* Pulsing ring for selected or showcase */}
                    {(isSelected || isShowcase) && (
                      <circle
                        cx={x}
                        cy={y}
                        r={isSelected ? 16 : 12}
                        fill={fillColor}
                        opacity="0.25"
                        className="animate-ping"
                      />
                    )}

                    {/* Outer marker ring */}
                    <circle
                      cx={x}
                      cy={y}
                      r={isSelected ? 8 : 6}
                      fill={fillColor}
                      stroke="#0f172a"
                      strokeWidth="2"
                    />

                    {/* Node label */}
                    <text
                      x={x + 10}
                      y={y + 4}
                      fill={isSelected ? '#ffffff' : '#cbd5e1'}
                      fontSize={isSelected ? '11' : '9'}
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      fontFamily="system-ui"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Map Legend */}
            <div className="absolute bottom-3 left-3 bg-slate-900/90 border border-slate-800 rounded-md p-2 text-[10px] space-y-1 backdrop-blur-xs">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                <span className="text-slate-300">Showcase Need Cluster (Mandla)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                <span className="text-slate-300">Silent Gap (Low Voice, High Need)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
                <span className="text-slate-300">Standard Expressed Cluster</span>
              </div>
            </div>
          </div>
        </div>

        {/* Region Detail Drilldown Panel */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
              <div>
                <span className="text-[10px] font-semibold uppercase text-indigo-400">Region Drilldown</span>
                <h3 className="text-base font-bold text-white">{selectedRegion}</h3>
              </div>
              <MapPin className="h-5 w-5 text-indigo-400" />
            </div>

            {/* Demographic and participation summary */}
            <div className="space-y-3 text-xs mb-4">
              <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Total Population:</span>
                <span className="font-semibold text-slate-200">{regionDemo?.population.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Vulnerability Index:</span>
                <span className="font-semibold text-amber-300">{regionDemo?.vulnerabilityIndex} / 100</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Digital Participation Rate:</span>
                <span
                  className={`font-semibold ${
                    (regionDemo?.digitalParticipationIndex || 50) < 35 ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                >
                  {regionDemo?.digitalParticipationIndex} / 100
                  {(regionDemo?.digitalParticipationIndex || 50) < 35 && ' (Blind Spot)'}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Citizen Signals Recorded:</span>
                <span className="font-semibold text-slate-200">{regionSignals.length} signals</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Active Approved Schemes:</span>
                <span className="font-semibold text-slate-200">{regionProjects.length} active</span>
              </div>
            </div>

            {/* Infrastructure Gaps In This Region */}
            <div className="space-y-2 mb-4">
              <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider block">
                Audited Infrastructure Deficits
              </span>
              {regionInfra.length === 0 ? (
                <p className="text-slate-500 text-xs">No specific indicators seeded for this region.</p>
              ) : (
                regionInfra.map((infra) => (
                  <div key={infra.id} className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 text-xs">
                    <div className="flex justify-between font-medium text-slate-200 mb-1">
                      <span className="truncate pr-2">{infra.category}</span>
                      <span className="text-rose-400">Gap: -{infra.gap}%</span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mb-1.5">{infra.indicator}</p>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-indigo-500 h-1.5 rounded-full"
                        style={{ width: `${infra.currentScore}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Flagged Silent Gap Alert if applicable */}
            {regionSilentGaps.length > 0 && (
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs mb-3">
                <div className="flex items-center gap-1.5 font-semibold mb-1">
                  <EyeOff className="h-3.5 w-3.5" />
                  <span>Potential Silent Gap Flagged</span>
                </div>
                <p className="text-[11px] text-amber-200/90 leading-tight">
                  High infrastructure gap with low digital participation. Passive reporting underrepresents true need.
                </p>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-800 flex gap-2">
            <button
              onClick={() => onNavigateView('signals')}
              className="flex-1 py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-medium transition text-center"
            >
              View Signals ({regionSignals.length})
            </button>
            <button
              onClick={() => onNavigateView('compiler')}
              className="flex-1 py-2 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition text-center"
            >
              Compile Intervention
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chart 1: Signals by Category */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Citizen Signals by Category</h3>
          <p className="text-xs text-slate-400 mb-4">Volume distribution across core Digital Public Infrastructure areas</p>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', fontSize: '12px' }}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Silent Gaps vs Expressed Volume */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 sm:p-5">
          <h3 className="text-sm font-semibold text-white mb-1">Silent Gap vs Expressed Demand Disconnect</h3>
          <p className="text-xs text-slate-400 mb-4">Comparison showing why low complaints $\neq$ low infrastructure need</p>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Expressed Need (Adequate Reporting)', value: totalClusters - totalSilentGaps },
                    { name: 'Critical Silent Gaps', value: 5 },
                    { name: 'High Silent Gaps', value: 4 },
                    { name: 'Moderate Silent Gaps', value: 3 }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                >
                  <Cell fill="#6366f1" />
                  <Cell fill="#ef4444" />
                  <Cell fill="#f59e0b" />
                  <Cell fill="#fbbf24" />
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
