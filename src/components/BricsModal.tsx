import React, { useState } from 'react';
import {
  Globe2,
  Layers,
  ShieldCheck,
  Cpu,
  CheckCircle2,
  X,
  Code2,
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface BricsModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCountry: string;
  setActiveCountry: (c: string) => void;
}

export const BricsModal: React.FC<BricsModalProps> = ({
  isOpen,
  onClose,
  activeCountry,
  setActiveCountry
}) => {
  const [selectedBricsCountry, setSelectedBricsCountry] = useState<string>(activeCountry);

  if (!isOpen) return null;

  const BRICS_COUNTRIES = [
    {
      name: 'India',
      code: 'IN',
      status: 'Primary Seeded Dataset (Active)',
      languages: 'Hindi, Marathi, Tamil, Bengali, Kannada, Odia, English',
      administrativeHierarchy: 'Center → State → District → Block/Taluka → Gram Panchayat',
      coverageSummary: 'Full synthetic dataset with 115+ citizen signals, 26 clusters, 22 indicators, 14 projects, 10 recommendations.'
    },
    {
      name: 'Brazil',
      code: 'BR',
      status: 'Integration-Ready Adapter',
      languages: 'Portuguese (pt-BR), Indigenous Languages',
      administrativeHierarchy: 'União → Estado → Município → Distrito / Bairro',
      coverageSummary: 'Common ontology adapter ready for Fala.BR citizen complaints & IBGE demographic indicators.'
    },
    {
      name: 'Russia',
      code: 'RU',
      status: 'Integration-Ready Adapter',
      languages: 'Russian (ru-RU), Regional Languages',
      administrativeHierarchy: 'Federation → Federal Subject (Oblast/Krai) → Raion → Settlement',
      coverageSummary: 'Adapter mappings aligned with Gosuslugi public service feedback and Rosstat regional indices.'
    },
    {
      name: 'China',
      code: 'CN',
      status: 'Integration-Ready Adapter',
      languages: 'Mandarin (zh-CN), Regional Dialects',
      administrativeHierarchy: 'National → Province → Prefecture/City → County → Township/Village',
      coverageSummary: 'Adapter aligned with 12345 Citizen Service Hotline categorization & national rural infrastructure benchmarks.'
    },
    {
      name: 'South Africa',
      code: 'ZA',
      status: 'Integration-Ready Adapter',
      languages: 'isiZulu, isiXhosa, Afrikaans, English, Sepedi, Setswana',
      administrativeHierarchy: 'National → Province → District Municipality → Local Municipality → Ward',
      coverageSummary: 'Adapter schema formatted for Presidential Hotline inputs and Stats SA Community Survey metrics.'
    }
  ];

  const COMMON_ONTOLOGY = [
    { coreDomain: 'Water', bricsTerm: 'Potable Water & Aquifer Security', indicatorExample: 'Piped Water Hours / Salinity Deficit' },
    { coreDomain: 'Roads', bricsTerm: 'Rural Connectivity & Culvert Assets', indicatorExample: 'All-Weather Pavement % / Bridge Resiliency' },
    { coreDomain: 'Healthcare', bricsTerm: 'Primary Health & Emergency Transit', indicatorExample: 'Maternal Referral Response Time' },
    { coreDomain: 'Education', bricsTerm: 'School WASH & Commute Safety', indicatorExample: 'Safe Commute Radius / Girls Toilet WASH' },
    { coreDomain: 'Sanitation', bricsTerm: 'Liquid & Solid Waste Containment', indicatorExample: 'Stormwater Inundation / Drainage Density' },
    { coreDomain: 'Energy', bricsTerm: 'Last-Mile Power & Off-Grid Mini-Grids', indicatorExample: 'Rural 3-Phase Reliability Hours/Day' },
    { coreDomain: 'Connectivity', bricsTerm: 'Digital Service Points & PDS Inclusion', indicatorExample: 'Broadband / Biometric Terminal Uptime' },
    { coreDomain: 'Housing', bricsTerm: 'Climate-Resilient Settlement Embankment', indicatorExample: 'Flood & Saline Inundation Armor Score' },
    { coreDomain: 'Transport', bricsTerm: 'Public Transit & Farm-to-Mandi Corridors', indicatorExample: 'Bus Route Halts / Perishable Post-Harvest Spoilage' }
  ];

  const activeData = BRICS_COUNTRIES.find((c) => c.name === selectedBricsCountry) || BRICS_COUNTRIES[0];

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-4xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
              <Globe2 className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>Digital Public Good & BRICS Innovation Extensibility</span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Track 1
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Shared civic decision architecture designed for plug-and-play sovereign deployment across BRICS nations.
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 4 Architectural Pillars of DPG */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6 text-xs">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <ShieldCheck className="h-4 w-4 text-emerald-400 mb-1" />
            <span className="font-semibold text-white block mb-0.5">Privacy by Design</span>
            <p className="text-slate-400 text-[11px]">
              All citizen signals anonymized at ingestion; no phone numbers, names, or tracking PII.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <Cpu className="h-4 w-4 text-indigo-400 mb-1" />
            <span className="font-semibold text-white block mb-0.5">Modular AI Engine</span>
            <p className="text-slate-400 text-[11px]">
              Replaceable Gemini model layer with deterministic fallback for offline or air-gapped deployments.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <Code2 className="h-4 w-4 text-violet-400 mb-1" />
            <span className="font-semibold text-white block mb-0.5">Interoperable Schema</span>
            <p className="text-slate-400 text-[11px]">
              GeoJSON, Open Data, and REST standard formats compatible with Postgres/PostGIS.
            </p>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <Globe2 className="h-4 w-4 text-cyan-400 mb-1" />
            <span className="font-semibold text-white block mb-0.5">Common Civic Ontology</span>
            <p className="text-slate-400 text-[11px]">
              Standardized taxonomy mapping across infrastructure categories regardless of language.
            </p>
          </div>
        </div>

        {/* BRICS Country Selector */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-white uppercase tracking-wider">
              Country Integration Profiles
            </span>
            <span className="text-[11px] text-slate-400">Select country to inspect adapter readiness</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {BRICS_COUNTRIES.map((country) => (
              <button
                key={country.code}
                onClick={() => {
                  setSelectedBricsCountry(country.name);
                  setActiveCountry(country.name);
                }}
                className={`px-3 py-2 rounded-lg font-medium transition whitespace-nowrap flex items-center gap-1.5 ${
                  selectedBricsCountry === country.name
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <span>{country.name}</span>
                <span className="text-[10px] opacity-80">
                  {country.code === 'IN' ? '(Active)' : '(Adapter)'}
                </span>
              </button>
            ))}
          </div>

          {/* Country Adapter Card */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2.5">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800">
              <span className="font-bold text-sm text-white">{activeData.name} Sovereign Profile</span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                  activeData.code === 'IN'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}
              >
                {activeData.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
              <div>
                <span className="text-slate-500 block mb-0.5">Language Coverage:</span>
                <span className="font-medium text-slate-200">{activeData.languages}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-0.5">Administrative Hierarchy:</span>
                <span className="font-medium text-slate-200">{activeData.administrativeHierarchy}</span>
              </div>
            </div>

            <div>
              <span className="text-slate-500 block mb-0.5">Integration Scope:</span>
              <p className="text-slate-300 leading-relaxed">{activeData.coverageSummary}</p>
            </div>

            {activeData.code !== 'IN' && (
              <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-400">
                <strong>Transparent DPG Caveat:</strong> Government statistics and citizen signals are seeded for India in this hackathon prototype. For other BRICS partners, the system demonstrates architectural readiness and semantic ontology mapping without fabricating live government statistics.
              </div>
            )}
          </div>

          {/* Common Civic Ontology Table */}
          <div className="mt-5">
            <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
              BRICS Common Civic Taxonomy Mapping (9 Core Domains)
            </h3>
            <div className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden text-xs">
              <table className="w-full text-left text-slate-300">
                <thead className="bg-slate-900 text-slate-400 text-[10px] uppercase">
                  <tr>
                    <th className="px-3 py-2">Domain</th>
                    <th className="px-3 py-2">Universal BRICS Concept</th>
                    <th className="px-3 py-2">Standard Indicator Metric</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-[11px]">
                  {COMMON_ONTOLOGY.map((onto, i) => (
                    <tr key={i} className="hover:bg-slate-900/40">
                      <td className="px-3 py-1.5 font-bold text-indigo-300">{onto.coreDomain}</td>
                      <td className="px-3 py-1.5">{onto.bricsTerm}</td>
                      <td className="px-3 py-1.5 text-slate-400">{onto.indicatorExample}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="pt-4 mt-6 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};
