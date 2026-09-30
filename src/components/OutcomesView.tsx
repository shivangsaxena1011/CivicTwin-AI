import React from 'react';
import {
  LineChart,
  CheckCircle2,
  TrendingUp,
  MessageSquareText,
  Building2,
  MapPin,
  Clock,
  Info
} from 'lucide-react';
import { Outcome } from '../types.js';

interface OutcomesViewProps {
  outcomes: Outcome[];
}

export const OutcomesView: React.FC<OutcomesViewProps> = ({ outcomes }) => {
  return (
    <div className="p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
          <LineChart className="h-5 w-5 text-indigo-400" />
          <span>Closed-Loop Outcomes & Post-Project Feedback</span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Evaluating whether funded capital interventions successfully shifted ground infrastructure indicators and citizen satisfaction.
        </p>
      </div>

      {/* Notice Banner */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
        <Info className="h-4 w-4 text-indigo-400 shrink-0" />
        <span>
          Outcome data is illustrative in this hackathon prototype to demonstrate the closed-loop evaluation workflow.
        </span>
      </div>

      {/* Outcomes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {outcomes.map((outcome) => (
          <div
            key={outcome.projectId}
            className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4 shadow-lg flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-semibold uppercase text-indigo-400">
                    Scheme ID: #{outcome.projectId}
                  </span>
                  <h3 className="text-sm font-bold text-white leading-tight mt-0.5">
                    {outcome.projectName}
                  </h3>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded font-semibold ${
                    outcome.completionPercent === 100
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  }`}
                >
                  {outcome.completionPercent}% Complete
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 my-2">
                <MapPin className="h-3.5 w-3.5" />
                <span>{outcome.region}</span>
              </div>

              {/* Before vs After Score Comparison */}
              <div className="space-y-3 my-4">
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-300 mb-1">
                    <span>Ground Infrastructure Index:</span>
                    <span>
                      {outcome.baselineScore} → <strong className="text-emerald-400">{outcome.currentScore} / 100</strong>
                    </span>
                  </div>
                  {/* Dual bar showing shift */}
                  <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden flex">
                    <div
                      className="bg-slate-700 h-2"
                      style={{ width: `${outcome.baselineScore}%` }}
                      title={`Baseline: ${outcome.baselineScore}`}
                    />
                    <div
                      className="bg-indigo-500 h-2"
                      style={{ width: `${outcome.currentScore - outcome.baselineScore}%` }}
                      title={`Gain: +${outcome.currentScore - outcome.baselineScore}`}
                    />
                  </div>
                </div>

                {/* Satisfaction and Accessibility Metrics */}
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block mb-0.5">Citizen Satisfaction:</span>
                    <span className="text-base font-bold text-emerald-400">
                      {outcome.citizenSatisfaction}% positive
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="text-slate-400 block mb-0.5">Service Accessibility:</span>
                    <span className="text-base font-bold text-indigo-400">
                      {outcome.serviceAccessibility} / 100
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Quantitative Metric */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                <span className="font-semibold text-slate-300 block mb-1">Measured Impact:</span>
                <p className="text-slate-400 leading-relaxed">{outcome.keyMetric}</p>
              </div>
            </div>

            {/* Qualitative Citizen Feedback Quote */}
            <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-900/40 text-xs">
              <span className="text-[10px] font-semibold text-indigo-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
                <MessageSquareText className="h-3 w-3" />
                <span>Post-Implementation Citizen Voice</span>
              </span>
              <p className="text-slate-300 italic">"{outcome.citizenFeedbackSample}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
