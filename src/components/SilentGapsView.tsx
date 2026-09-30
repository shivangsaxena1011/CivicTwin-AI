import React, { useState } from 'react';
import {
  EyeOff,
  AlertTriangle,
  Info,
  ArrowRight,
  X,
  Search,
  CheckCircle2,
  Users,
  ShieldAlert,
  HelpCircle,
  TrendingDown
} from 'lucide-react';
import { SilentGapItem } from '../types.js';

interface SilentGapsViewProps {
  silentGaps: SilentGapItem[];
  onOpenCompilerForRegion: (region: string) => void;
}

export const SilentGapsView: React.FC<SilentGapsViewProps> = ({
  silentGaps,
  onOpenCompilerForRegion
}) => {
  const [selectedGap, setSelectedGap] = useState<SilentGapItem | null>(null);
  const [filterLevel, setFilterLevel] = useState<string>('All');
  const [search, setSearch] = useState<string>('');

  const filtered = silentGaps.filter((item) => {
    if (filterLevel !== 'All' && item.level !== filterLevel) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!item.region.toLowerCase().includes(q) && !item.category.toLowerCase().includes(q)) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Page Title & Principle */}
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <EyeOff className="h-5 w-5 text-amber-400" />
          <span>Silent Gap Detector</span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Identifying administrative blind spots where infrastructure deficits are severe but citizen reporting remains low.
        </p>
      </div>

      {/* Prominent Innovation Banner */}
      <div className="bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/40 border border-amber-600/40 rounded-xl p-5 shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="h-11 w-11 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <div className="text-lg font-bold text-white flex items-center gap-2">
                <span>{silentGaps.length} regions may be underrepresented in citizen feedback.</span>
              </div>
              <p className="text-xs text-amber-200/90 max-w-2xl leading-relaxed mt-0.5">
                Traditional portals equate complaint volume with need. CivicTwin AI detects that remote tribal, border, and marginalized habitations lack digital connectivity or institutional trust to file passive complaints, despite experiencing critical infrastructure deprivation.
              </p>
            </div>
          </div>

          <div className="bg-slate-950/70 border border-amber-500/30 rounded-lg p-3 text-[11px] text-slate-300 shrink-0">
            <span className="font-semibold text-amber-300 block mb-0.5">Detection Invariant Formula</span>
            <span>High Infrastructure Gap + High Vulnerability + Low Digital Voice = Silent Gap</span>
          </div>
        </div>
      </div>

      {/* Table Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 font-medium mr-1">Severity:</span>
          {['All', 'Critical Silent Gap', 'High Silent Gap', 'Moderate Silent Gap'].map((lvl) => (
            <button
              key={lvl}
              onClick={() => setFilterLevel(lvl)}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition ${
                filterLevel === lvl ? 'bg-amber-600 text-white' : 'bg-slate-950 text-slate-400 hover:text-white'
              }`}
            >
              {lvl.replace(' Silent Gap', '')}
            </button>
          ))}
        </div>

        <div className="relative min-w-[200px] flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by district or category..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Mobile Card View (< md) */}
      <div className="md:hidden space-y-3">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedGap(item)}
            className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition cursor-pointer space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">{item.category}</span>
                <h3 className="text-sm font-bold text-white">{item.region}</h3>
                <span className="text-[10px] text-slate-400">Pop: {item.affectedPopulation.toLocaleString()}</span>
              </div>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-semibold border shrink-0 ${
                  item.level === 'Critical Silent Gap'
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                    : item.level === 'High Silent Gap'
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                }`}
              >
                {item.level}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80">
              <div>
                <span className="text-[10px] text-slate-400 block">Citizen Voice</span>
                <span className="font-bold text-amber-400">{item.citizenSignalsCount}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Infra Deficit</span>
                <span className="font-bold text-rose-400">-{item.infrastructureGap}%</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block">Digital Voice</span>
                <span className={`font-bold ${item.digitalParticipationIndex < 25 ? 'text-rose-400' : 'text-amber-400'}`}>
                  {item.digitalParticipationIndex}/100
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedGap(item);
                }}
                className="flex-1 py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium text-center transition"
              >
                Why Flagged?
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenCompilerForRegion(item.region);
                }}
                className="flex-1 py-1.5 px-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium text-center transition"
              >
                Compile Intervention →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Silent Gaps Table (>= md) */}
      <div className="hidden md:block bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 text-[11px] uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-4 py-3">Region / Habitation</th>
                <th className="px-4 py-3">Sector</th>
                <th className="px-4 py-3 text-center">Citizen Voice</th>
                <th className="px-4 py-3 text-center">Infrastructure Gap</th>
                <th className="px-4 py-3 text-center">Digital Participation</th>
                <th className="px-4 py-3">Silent Gap Level</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  onClick={() => setSelectedGap(item)}
                  className="hover:bg-slate-800/60 transition cursor-pointer"
                >
                  <td className="px-4 py-3 font-semibold text-white">
                    <div>{item.region}</div>
                    <span className="text-[10px] text-slate-500 font-normal">
                      Pop: {item.affectedPopulation.toLocaleString()}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-slate-300">{item.category}</td>

                  <td className="px-4 py-3 text-center">
                    <span className="font-semibold text-amber-400">{item.citizenSignalsCount}</span>
                    <span className="text-[10px] text-slate-500 block">Signals</span>
                  </td>

                  <td className="px-4 py-3 text-center">
                    <div className="inline-flex items-center gap-1 font-semibold text-rose-400">
                      <span>-{item.infrastructureGap}%</span>
                    </div>
                    <div className="w-16 bg-slate-800 rounded-full h-1 mx-auto mt-1">
                      <div
                        className="bg-rose-500 h-1 rounded-full"
                        style={{ width: `${item.infrastructureGap}%` }}
                      />
                    </div>
                  </td>

                  <td className="px-4 py-3 text-center">
                    <span
                      className={`font-semibold ${
                        item.digitalParticipationIndex < 25 ? 'text-rose-400' : 'text-amber-400'
                      }`}
                    >
                      {item.digitalParticipationIndex}/100
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      {item.digitalParticipationIndex < 25 ? 'Severe Blindspot' : 'Low Voice'}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${
                        item.level === 'Critical Silent Gap'
                          ? 'bg-rose-500/20 text-rose-300 border-rose-500/30'
                          : item.level === 'High Silent Gap'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                      }`}
                    >
                      {item.level}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedGap(item);
                      }}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition"
                    >
                      Why Flagged?
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* "Why Flagged" Detail Drawer */}
      {selectedGap && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-lg bg-slate-900 border-l border-slate-800 h-full p-6 overflow-y-auto flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div>
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    Silent Gap Deep-Dive
                  </span>
                  <h2 className="text-base font-bold text-white">{selectedGap.region}</h2>
                </div>
                <button
                  onClick={() => setSelectedGap(null)}
                  className="p-1 rounded text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Status Note */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 mb-5">
                <span className="font-semibold text-slate-200 block mb-1 flex items-center gap-1.5">
                  <Info className="h-3.5 w-3.5 text-indigo-400" />
                  <span>Important Governance Caveat:</span>
                </span>
                <p className="text-slate-400 leading-relaxed">
                  Potential silent gap based on available indicators. This is an algorithmic alert to prompt active field enumeration rather than an absolute truth.
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="space-y-3 text-xs mb-5">
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Sector Analyzed:</span>
                  <span className="font-semibold text-white">{selectedGap.category}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Current Infrastructure Score:</span>
                  <span className="font-semibold text-rose-400">
                    {selectedGap.infrastructureScore} / 100 (Benchmark: {selectedGap.benchmarkScore})
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Calculated Infrastructure Gap:</span>
                  <span className="font-semibold text-rose-400">-{selectedGap.infrastructureGap} points</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Total Population at Risk:</span>
                  <span className="font-semibold text-white">
                    {selectedGap.affectedPopulation.toLocaleString()} citizens
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Digital Participation Score:</span>
                  <span className="font-semibold text-amber-400">
                    {selectedGap.digitalParticipationIndex} / 100
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Socio-Economic Vulnerability:</span>
                  <span className="font-semibold text-purple-300">{selectedGap.vulnerabilityIndex} / 100</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Passive Grievance Signals:</span>
                  <span className="font-semibold text-amber-400">{selectedGap.citizenSignalsCount} signals</span>
                </div>
              </div>

              {/* Detailed Explanation */}
              <div className="space-y-3 mb-5">
                <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs">
                  <span className="font-semibold text-amber-300 block mb-1">
                    Why Flagged by Need Engine:
                  </span>
                  <p className="text-slate-200 leading-relaxed">{selectedGap.whyFlagged}</p>
                </div>

                <div className="p-3.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 text-xs">
                  <span className="font-semibold text-indigo-300 block mb-1">
                    Recommended Policy Action:
                  </span>
                  <p className="text-slate-200 leading-relaxed">{selectedGap.recommendedAction}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex gap-2">
              <button
                onClick={() => {
                  onOpenCompilerForRegion(selectedGap.region);
                  setSelectedGap(null);
                }}
                className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition"
              >
                Compile Targeted Intervention for this Silent Gap →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
