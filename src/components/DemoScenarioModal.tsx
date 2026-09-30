import React from 'react';
import {
  Sparkles,
  ArrowRight,
  GitMerge,
  Building2,
  CheckCircle2,
  X,
  FileCheck,
  AlertTriangle,
  Info
} from 'lucide-react';

interface DemoScenarioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToCompiler: (clusterId: string) => void;
}

export const DemoScenarioModal: React.FC<DemoScenarioModalProps> = ({
  isOpen,
  onClose,
  onNavigateToCompiler
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-3xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Sparkles className="h-6 w-6" />
            </div>
            <div>
              <span className="text-[10px] font-semibold uppercase text-indigo-400 tracking-wider">
                Showcase Demonstration Scenario
              </span>
              <h2 className="text-base font-bold text-white">
                Mandla-Dindori Seasonal Regional Connectivity Gap
              </h2>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Narrative Flow */}
        <div className="space-y-4 text-xs">
          {/* Step 1: The Disparate Citizen Signals */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-300">
              <span>Step 1: Four Seemingly Unrelated Department Complaints</span>
              <span className="text-[10px] text-slate-500">Multilingual Ingestion</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <strong className="text-indigo-300 block mb-0.5">Health Department Grievance:</strong>
                <p className="text-slate-300 italic">"Ambulance cannot reach Bichhiya village due to flooded stream; emergency delay 4 hours."</p>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <strong className="text-indigo-300 block mb-0.5">Education Department Grievance:</strong>
                <p className="text-slate-300 italic">"Causeway bridge is submerged; school children unable to attend classes for 3 months."</p>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <strong className="text-indigo-300 block mb-0.5">Agriculture & Mandi Grievance:</strong>
                <p className="text-slate-300 italic">"Farmers unable to transport tomatoes to APMC mandi; produce rotting in fields."</p>
              </div>
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
                <strong className="text-indigo-300 block mb-0.5">Road Transport Grievance:</strong>
                <p className="text-slate-300 italic">"Bus service suspended across Samnapur block due to washed-out link culverts."</p>
              </div>
            </div>
          </div>

          {/* Step 2: The AI Convergence Synthesis */}
          <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-900/50 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400">
              <GitMerge className="h-4 w-4" />
              <span>Step 2: AI Need Convergence Engine Deduces the Root Cause</span>
            </div>
            <p className="text-slate-200 leading-relaxed">
              CivicTwin AI recognizes that these are <strong>NOT 4 separate issues</strong> to be shuttled to 4 separate bureaucracies. They are symptoms of a single spatial failure:
            </p>
            <div className="p-3 rounded-lg bg-slate-950 border border-indigo-500/30 text-xs">
              <span className="font-bold text-white block mb-0.5">
                Underlying Need: Seasonal Regional Connectivity & Culvert Infrastructure Gap
              </span>
              <span className="text-slate-400 text-[11px]">
                Affected Population: 81,600 citizens · Infrastructure Gap: 46% · Priority Score: 89/100
              </span>
            </div>
          </div>

          {/* Step 3: Project Collision Detection */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <Building2 className="h-4 w-4" />
              <span>Step 3: Project Collision Detector Identifies Existing Highway Project</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              The system scans active state schemes and locates <strong>Project #proj-001 (Mandla-Niwas-Shahpura Highway Widening, ₹142.5 Cr)</strong>.
            </p>
            <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-200">
              <strong>Collision Finding (PARTIAL OVERLAP):</strong> Project 001 upgrades trunk roads, but 18 critical rural feeder culverts connecting peripheral tribal settlements are completely unbudgeted.
            </div>
          </div>

          {/* Step 4: The Final Recommendation */}
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-900/50 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="h-4 w-4" />
              <span>Step 4: AI Recommendation Generated</span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-emerald-500/40 text-xs space-y-1.5">
              <span className="font-bold text-white block text-sm">
                "Expand Mandla-Dindori Regional Connectivity Scheme to Include 18 Underserved Feeder Culverts & Causeway Bridges"
              </span>
              <p className="text-slate-300 text-[11px]">
                Estimated Budget: <strong>₹38.5 Cr</strong> · Estimated Mobilization Savings: <strong>~₹8.2 Cr</strong> vs launching an independent tender.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 mt-5 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs">
          <span className="text-[11px] text-slate-500 italic">
            * Clearly marked as an AI-generated illustrative recommendation.
          </span>
          <button
            onClick={() => {
              onClose();
              onNavigateToCompiler('clus-conn-01');
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition"
          >
            <span>Inspect in Project Compiler</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
