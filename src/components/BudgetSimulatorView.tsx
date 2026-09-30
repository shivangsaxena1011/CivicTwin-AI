import React, { useState, useEffect } from 'react';
import {
  Calculator,
  DollarSign,
  Users,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
  CheckCircle2,
  PieChart as PieIcon,
  Columns
} from 'lucide-react';
import { Recommendation, SimulationResult } from '../types.js';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';

interface BudgetSimulatorViewProps {
  recommendations: Recommendation[];
}

export const BudgetSimulatorView: React.FC<BudgetSimulatorViewProps> = ({
  recommendations
}) => {
  const [budgetA, setBudgetA] = useState<number>(250);
  const [budgetB, setBudgetB] = useState<number>(500);
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [isCompareMode, setIsCompareMode] = useState<boolean>(true);

  const [resultA, setResultA] = useState<SimulationResult | null>(null);
  const [resultB, setResultB] = useState<SimulationResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Preset button triggers
  const presets = [100, 250, 500, 1000];

  const runSimulation = async (budget: number, setFn: (res: SimulationResult) => void) => {
    try {
      const res = await fetch('/api/ai/simulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          budget,
          region: selectedRegion,
          priorityCategory: selectedCategory
        })
      });
      const data = await res.json();
      setFn(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([
      runSimulation(budgetA, setResultA),
      runSimulation(budgetB, setResultB)
    ]).finally(() => setLoading(false));
  }, [budgetA, budgetB, selectedRegion, selectedCategory]);

  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Title & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Calculator className="h-5 w-5 text-indigo-400" />
            <span>Interactive Capital Budget Simulator</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            "What Happens If?" allocation simulator modeling population reach, gap reduction, and remaining deficit.
          </p>
        </div>

        <button
          onClick={() => setIsCompareMode(!isCompareMode)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
            isCompareMode
              ? 'bg-indigo-600 text-white border-indigo-500'
              : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
          }`}
        >
          <Columns className="h-3.5 w-3.5" />
          <span>{isCompareMode ? 'Comparison Mode (A vs B)' : 'Single Scenario Mode'}</span>
        </button>
      </div>

      {/* Simulator Control Panel */}
      <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Budget Presets:</span>
            {presets.map((amt) => (
              <button
                key={amt}
                onClick={() => {
                  setBudgetA(amt);
                  setBudgetB(amt * 2);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition ${
                  budgetA === amt
                    ? 'bg-indigo-600 text-white border-indigo-500'
                    : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
                }`}
              >
                ₹{amt} Cr
              </button>
            ))}
          </div>

          {/* Filters: Region & Sector */}
          <div className="flex flex-wrap items-center gap-2 text-xs w-full sm:w-auto">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
            >
              <option value="All Regions">All Regions</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Rajasthan">Rajasthan</option>
              <option value="Bihar">Bihar</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Odisha">Odisha</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
            >
              <option value="All Categories">All Categories</option>
              <option value="Water & Sanitation">Water & Sanitation</option>
              <option value="Roads & Connectivity">Roads & Connectivity</option>
              <option value="Healthcare">Healthcare</option>
              <option value="School Education">School Education</option>
              <option value="Power & Energy">Power & Energy</option>
            </select>
          </div>
        </div>

        {/* Sliders for Scenario A & Scenario B */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-3 border-t border-slate-800/80">
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-indigo-300 mb-1.5">
              <span>Scenario A Envelope:</span>
              <span className="text-sm font-bold text-white">₹{budgetA} Cr</span>
            </div>
            <input
              type="range"
              min={50}
              max={1000}
              step={25}
              value={budgetA}
              onChange={(e) => setBudgetA(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          {isCompareMode && (
            <div>
              <div className="flex justify-between items-center text-xs font-semibold text-violet-300 mb-1.5">
                <span>Scenario B Envelope:</span>
                <span className="text-sm font-bold text-white">₹{budgetB} Cr</span>
              </div>
              <input
                type="range"
                min={100}
                max={1500}
                step={50}
                value={budgetB}
                onChange={(e) => setBudgetB(Number(e.target.value))}
                className="w-full accent-violet-500 cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>

      {/* Results Comparison Grid */}
      <div className={`grid grid-cols-1 ${isCompareMode ? 'md:grid-cols-2' : ''} gap-6`}>
        {/* Scenario A Card */}
        {resultA && (
          <div className="p-5 rounded-xl bg-slate-900 border border-indigo-500/40 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-semibold uppercase text-indigo-400">Baseline Scenario A</span>
                <h3 className="text-lg font-bold text-white">₹{resultA.budget} Cr Allocation</h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
                {resultA.selectedProjects.length} Projects Funded
              </span>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block mb-0.5">Population Reached:</span>
                <span className="text-lg font-bold text-emerald-400">
                  {(resultA.totalPopulationReached / 100000).toFixed(1)} Lakh citizens
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block mb-0.5">Average Gap Reduction:</span>
                <span className="text-lg font-bold text-indigo-400">+{resultA.averageGapReduction}% pts</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block mb-0.5">Allocated Capital:</span>
                <span className="text-base font-bold text-white">₹{resultA.allocatedCost} Cr</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block mb-0.5">Unresolved Need:</span>
                <span className="text-base font-bold text-rose-400">₹{resultA.unresolvedNeedCost} Cr</span>
              </div>
            </div>

            {/* Funded Projects List */}
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Funded Capital Projects Under Scenario A:
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {resultA.selectedProjects.map((p) => (
                  <div
                    key={p.id}
                    className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-xs flex justify-between items-center"
                  >
                    <div>
                      <div className="font-semibold text-slate-200 line-clamp-1">{p.title}</div>
                      <span className="text-[10px] text-slate-500">{p.region}</span>
                    </div>
                    <span className="font-bold text-emerald-400 shrink-0 ml-2">₹{p.cost} Cr</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Scenario B Card (Comparison) */}
        {isCompareMode && resultB && (
          <div className="p-5 rounded-xl bg-slate-900 border border-violet-500/40 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-semibold uppercase text-violet-400">Expansion Scenario B</span>
                <h3 className="text-lg font-bold text-white">₹{resultB.budget} Cr Allocation</h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded bg-violet-500/20 text-violet-300 font-semibold border border-violet-500/30">
                {resultB.selectedProjects.length} Projects Funded
              </span>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block mb-0.5">Population Reached:</span>
                <span className="text-lg font-bold text-emerald-400">
                  {(resultB.totalPopulationReached / 100000).toFixed(1)} Lakh citizens
                </span>
                <span className="text-[10px] text-emerald-300">
                  (+{((resultB.totalPopulationReached - (resultA?.totalPopulationReached || 0)) / 100000).toFixed(1)}L over A)
                </span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block mb-0.5">Average Gap Reduction:</span>
                <span className="text-lg font-bold text-violet-400">+{resultB.averageGapReduction}% pts</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block mb-0.5">Allocated Capital:</span>
                <span className="text-base font-bold text-white">₹{resultB.allocatedCost} Cr</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block mb-0.5">Remaining Unresolved Deficit:</span>
                <span className="text-base font-bold text-rose-400">₹{resultB.unresolvedNeedCost} Cr</span>
              </div>
            </div>

            {/* Funded Projects List */}
            <div>
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Funded Capital Projects Under Scenario B:
              </span>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {resultB.selectedProjects.map((p) => (
                  <div
                    key={p.id}
                    className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 text-xs flex justify-between items-center"
                  >
                    <div>
                      <div className="font-semibold text-slate-200 line-clamp-1">{p.title}</div>
                      <span className="text-[10px] text-slate-500">{p.region}</span>
                    </div>
                    <span className="font-bold text-emerald-400 shrink-0 ml-2">₹{p.cost} Cr</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Assumptions & Caveat Note */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400">
        <span className="font-semibold text-slate-300 block mb-1">
          Budget Simulation Modeling Assumptions:
        </span>
        <ul className="list-disc pl-4 space-y-1">
          <li>Assumes uniform departmental execution velocity across selected states.</li>
          <li>Optimized using a greedy impact-per-crore heuristic weighted by vulnerability scores.</li>
          <li>
            <strong>Caveat:</strong> Illustrative prototype simulation designed for policy tradeoff exploration; does not claim exact macroeconomic or budgetary forecasting.
          </li>
        </ul>
      </div>
    </div>
  );
};
