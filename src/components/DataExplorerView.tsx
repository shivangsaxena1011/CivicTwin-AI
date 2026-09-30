import React, { useState } from 'react';
import {
  Database,
  Download,
  Search,
  Filter,
  ArrowUpDown,
  FileSpreadsheet,
  CheckCircle2
} from 'lucide-react';
import {
  CitizenSignal,
  DemographicIndicator,
  InfrastructureIndicator,
  Outcome,
  Project,
  Recommendation
} from '../types.js';

interface DataExplorerViewProps {
  signals: CitizenSignal[];
  infrastructure: InfrastructureIndicator[];
  demographics: DemographicIndicator[];
  projects: Project[];
  recommendations: Recommendation[];
  outcomes: Outcome[];
}

export const DataExplorerView: React.FC<DataExplorerViewProps> = ({
  signals,
  infrastructure,
  demographics,
  projects,
  recommendations,
  outcomes
}) => {
  const [activeTab, setActiveTab] = useState<
    'signals' | 'infrastructure' | 'demographics' | 'projects' | 'recommendations' | 'outcomes'
  >('signals');
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<string>('id');
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const sortItems = <T extends Record<string, any>>(items: T[]): T[] => {
    return [...items].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (valA === undefined || valB === undefined) return 0;
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortAsc ? valA - valB : valB - valA;
      }
      return sortAsc
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  };

  // Export CSV handler
  const handleExportCSV = () => {
    let rows: any[] = [];
    let filename = `civictwin-${activeTab}.csv`;

    if (activeTab === 'signals') rows = signals;
    else if (activeTab === 'infrastructure') rows = infrastructure;
    else if (activeTab === 'demographics') rows = demographics;
    else if (activeTab === 'projects') rows = projects;
    else if (activeTab === 'recommendations') rows = recommendations;
    else if (activeTab === 'outcomes') rows = outcomes;

    if (rows.length === 0) return;

    const headers = Object.keys(rows[0]).filter((k) => typeof rows[0][k] !== 'object');
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [
        headers.join(','),
        ...rows.map((row) =>
          headers
            .map((h) => {
              const val = row[h];
              return `"${String(val ?? '').replace(/"/g, '""')}"`;
            })
            .join(',')
        )
      ].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Database className="h-5 w-5 text-indigo-400" />
            <span>Universal Data Explorer & CSV Export</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Transparent schema inspection for all ingested signals, indicators, and synthesized proposals.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-sm transition"
        >
          <Download className="h-4 w-4" />
          <span>Export Current Table (CSV)</span>
        </button>
      </div>

      {/* Entity Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 bg-slate-900 p-1.5 rounded-xl border border-slate-800 text-xs">
        {[
          { id: 'signals', label: `Citizen Signals (${signals.length})` },
          { id: 'infrastructure', label: `Infrastructure (${infrastructure.length})` },
          { id: 'demographics', label: `Demographics (${demographics.length})` },
          { id: 'projects', label: `Existing Projects (${projects.length})` },
          { id: 'recommendations', label: `Recommendations (${recommendations.length})` },
          { id: 'outcomes', label: `Outcomes (${outcomes.length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as any);
              setSearch('');
            }}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={`Search ${activeTab}...`}
          className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Table Content */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto max-h-[520px]">
          {activeTab === 'signals' && (
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 sticky top-0 uppercase tracking-wider text-[10px]">
                <tr>
                  <th onClick={() => toggleSort('id')} className="px-4 py-2.5 cursor-pointer hover:text-white">
                    ID {sortKey === 'id' ? (sortAsc ? '↑' : '↓') : ''}
                  </th>
                  <th onClick={() => toggleSort('source')} className="px-4 py-2.5 cursor-pointer hover:text-white">
                    Source {sortKey === 'source' ? (sortAsc ? '↑' : '↓') : ''}
                  </th>
                  <th onClick={() => toggleSort('language')} className="px-4 py-2.5 cursor-pointer hover:text-white">
                    Language {sortKey === 'language' ? (sortAsc ? '↑' : '↓') : ''}
                  </th>
                  <th onClick={() => toggleSort('district')} className="px-4 py-2.5 cursor-pointer hover:text-white">
                    Location {sortKey === 'district' ? (sortAsc ? '↑' : '↓') : ''}
                  </th>
                  <th onClick={() => toggleSort('issueCategory')} className="px-4 py-2.5 cursor-pointer hover:text-white">
                    Category {sortKey === 'issueCategory' ? (sortAsc ? '↑' : '↓') : ''}
                  </th>
                  <th onClick={() => toggleSort('severity')} className="px-4 py-2.5 cursor-pointer hover:text-white">
                    Severity {sortKey === 'severity' ? (sortAsc ? '↑' : '↓') : ''}
                  </th>
                  <th className="px-4 py-2.5">Translated Text</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {sortItems(
                  signals.filter((s) => !search || JSON.stringify(s).toLowerCase().includes(search.toLowerCase()))
                ).map((s) => (
                  <tr key={s.id} className="hover:bg-slate-800/50">
                    <td className="px-4 py-2.5 font-mono text-[11px] text-slate-400">{s.id}</td>
                    <td className="px-4 py-2.5">{s.source}</td>
                    <td className="px-4 py-2.5">{s.language}</td>
                    <td className="px-4 py-2.5">{s.district}, {s.state}</td>
                    <td className="px-4 py-2.5">{s.issueCategory}</td>
                    <td className="px-4 py-2.5">
                      <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                        s.severity === 'High' ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-800 text-slate-300'
                      }`}>
                        {s.severity}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 max-w-sm truncate">{s.translatedText}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'infrastructure' && (
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 sticky top-0 uppercase tracking-wider text-[10px]">
                <tr>
                  <th onClick={() => toggleSort('id')} className="px-4 py-2.5 cursor-pointer hover:text-white">ID</th>
                  <th onClick={() => toggleSort('region')} className="px-4 py-2.5 cursor-pointer hover:text-white">Region</th>
                  <th onClick={() => toggleSort('category')} className="px-4 py-2.5 cursor-pointer hover:text-white">Category</th>
                  <th className="px-4 py-2.5">Indicator</th>
                  <th onClick={() => toggleSort('currentScore')} className="px-4 py-2.5 cursor-pointer hover:text-white">Score</th>
                  <th onClick={() => toggleSort('benchmark')} className="px-4 py-2.5 cursor-pointer hover:text-white">Benchmark</th>
                  <th onClick={() => toggleSort('gap')} className="px-4 py-2.5 cursor-pointer hover:text-white">Gap</th>
                  <th className="px-4 py-2.5">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {sortItems(
                  infrastructure.filter((i) => !search || JSON.stringify(i).toLowerCase().includes(search.toLowerCase()))
                ).map((i) => (
                  <tr key={i.id} className="hover:bg-slate-800/50">
                    <td className="px-4 py-2.5 font-mono text-[11px] text-slate-400">{i.id}</td>
                    <td className="px-4 py-2.5 font-semibold text-white">{i.region}</td>
                    <td className="px-4 py-2.5">{i.category}</td>
                    <td className="px-4 py-2.5 max-w-xs truncate">{i.indicator}</td>
                    <td className="px-4 py-2.5">{i.currentScore}</td>
                    <td className="px-4 py-2.5">{i.benchmark}</td>
                    <td className="px-4 py-2.5 text-rose-400 font-bold">-{i.gap}%</td>
                    <td className="px-4 py-2.5 max-w-xs truncate text-[11px] text-slate-400">{i.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'demographics' && (
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 sticky top-0 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-4 py-2.5">Region</th>
                  <th className="px-4 py-2.5">Population</th>
                  <th className="px-4 py-2.5">Density /km²</th>
                  <th className="px-4 py-2.5">Vulnerability Index</th>
                  <th className="px-4 py-2.5">Digital Participation Index</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {demographics
                  .filter((d) => !search || JSON.stringify(d).toLowerCase().includes(search.toLowerCase()))
                  .map((d, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/50">
                      <td className="px-4 py-2.5 font-semibold text-white">{d.region}</td>
                      <td className="px-4 py-2.5">{d.population.toLocaleString()}</td>
                      <td className="px-4 py-2.5">{d.populationDensity}</td>
                      <td className="px-4 py-2.5 text-amber-300">{d.vulnerabilityIndex} / 100</td>
                      <td className="px-4 py-2.5 text-indigo-400">{d.digitalParticipationIndex} / 100</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {activeTab === 'projects' && (
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 sticky top-0 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-4 py-2.5">ID</th>
                  <th className="px-4 py-2.5">Scheme Name</th>
                  <th className="px-4 py-2.5">Department</th>
                  <th className="px-4 py-2.5">Region</th>
                  <th className="px-4 py-2.5">Status</th>
                  <th className="px-4 py-2.5">Budget (₹ Cr)</th>
                  <th className="px-4 py-2.5">Coverage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {projects
                  .filter((p) => !search || JSON.stringify(p).toLowerCase().includes(search.toLowerCase()))
                  .map((p) => (
                    <tr key={p.id} className="hover:bg-slate-800/50">
                      <td className="px-4 py-2.5 font-mono text-[11px] text-slate-400">{p.id}</td>
                      <td className="px-4 py-2.5 font-semibold text-white max-w-sm truncate">{p.name}</td>
                      <td className="px-4 py-2.5">{p.department}</td>
                      <td className="px-4 py-2.5">{p.region}</td>
                      <td className="px-4 py-2.5">{p.status}</td>
                      <td className="px-4 py-2.5 font-bold text-emerald-400">₹{p.budget}</td>
                      <td className="px-4 py-2.5">{p.coveragePercent}%</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {activeTab === 'recommendations' && (
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 sticky top-0 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-4 py-2.5">ID</th>
                  <th className="px-4 py-2.5">Proposal Title</th>
                  <th className="px-4 py-2.5">Type</th>
                  <th className="px-4 py-2.5">Region</th>
                  <th className="px-4 py-2.5">Cost (₹ Cr)</th>
                  <th className="px-4 py-2.5">Pop Reached</th>
                  <th className="px-4 py-2.5">Gap Reduction</th>
                  <th className="px-4 py-2.5">Overlap Level</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {recommendations
                  .filter((r) => !search || JSON.stringify(r).toLowerCase().includes(search.toLowerCase()))
                  .map((r) => (
                    <tr key={r.id} className="hover:bg-slate-800/50">
                      <td className="px-4 py-2.5 font-mono text-[11px] text-slate-400">{r.id}</td>
                      <td className="px-4 py-2.5 font-semibold text-white max-w-sm truncate">{r.title}</td>
                      <td className="px-4 py-2.5">{r.interventionType}</td>
                      <td className="px-4 py-2.5">{r.region}</td>
                      <td className="px-4 py-2.5 font-bold text-emerald-400">₹{r.estimatedCost}</td>
                      <td className="px-4 py-2.5">{r.affectedPopulation.toLocaleString()}</td>
                      <td className="px-4 py-2.5 text-indigo-400">+{r.expectedGapReduction}%</td>
                      <td className="px-4 py-2.5">{r.existingProjectOverlap.overlapLevel}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {activeTab === 'outcomes' && (
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 sticky top-0 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-4 py-2.5">Project ID</th>
                  <th className="px-4 py-2.5">Project Name</th>
                  <th className="px-4 py-2.5">Region</th>
                  <th className="px-4 py-2.5">Baseline</th>
                  <th className="px-4 py-2.5">Current Score</th>
                  <th className="px-4 py-2.5">Satisfaction</th>
                  <th className="px-4 py-2.5">Completion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {outcomes
                  .filter((o) => !search || JSON.stringify(o).toLowerCase().includes(search.toLowerCase()))
                  .map((o) => (
                    <tr key={o.projectId} className="hover:bg-slate-800/50">
                      <td className="px-4 py-2.5 font-mono text-[11px] text-slate-400">{o.projectId}</td>
                      <td className="px-4 py-2.5 font-semibold text-white max-w-sm truncate">{o.projectName}</td>
                      <td className="px-4 py-2.5">{o.region}</td>
                      <td className="px-4 py-2.5">{o.baselineScore}</td>
                      <td className="px-4 py-2.5 font-bold text-emerald-400">{o.currentScore} / 100</td>
                      <td className="px-4 py-2.5">{o.citizenSatisfaction}%</td>
                      <td className="px-4 py-2.5">{o.completionPercent}%</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
