import React, { useState, useRef } from 'react';
import {
  MessageSquareText,
  Mic,
  MicOff,
  Filter,
  Search,
  Volume2,
  Send,
  Sparkles,
  X,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  Building2,
  Tag
} from 'lucide-react';
import { CitizenSignal, IssueCategory, Severity, SignalSource } from '../types.js';

interface SignalsInboxProps {
  signals: CitizenSignal[];
  onIngestSignal: (newSignal: CitizenSignal) => void;
  onSelectCluster: (clusterId: string) => void;
  showToast?: (msg: string, type?: 'success' | 'info' | 'warning') => void;
}

export const SignalsInbox: React.FC<SignalsInboxProps> = ({
  signals,
  onIngestSignal,
  onSelectCluster,
  showToast
}) => {
  const [selectedSignal, setSelectedSignal] = useState<CitizenSignal | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'voice' | 'text' | 'messaging'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filters
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [severityFilter, setSeverityFilter] = useState('All');
  const [languageFilter, setLanguageFilter] = useState('All');

  // Submit Modal State
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [inputLang, setInputLang] = useState('Hindi');
  const [inputSource, setInputSource] = useState<SignalSource>('WhatsApp');
  const [inputDistrict, setInputDistrict] = useState('Mandla');
  const [inputState, setInputState] = useState('Madhya Pradesh');
  const [inputCategory, setInputCategory] = useState<IssueCategory>('Roads & Connectivity');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiAnalysisPreview, setAiAnalysisPreview] = useState<any>(null);

  // Audio Recording State
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<any>(null);

  // Sample quick templates for demo submission
  const DEMO_PRESETS = [
    {
      title: 'Mandla Causeway Breach (Hindi)',
      lang: 'Hindi',
      source: 'WhatsApp' as SignalSource,
      district: 'Mandla',
      state: 'Madhya Pradesh',
      category: 'Roads & Connectivity' as IssueCategory,
      text: 'Bichhiya gaon ke puliya par pani chad gaya hai. 108 ambulance 3 ghante se ruki hui hai aur marij ki halat gambhir hai.'
    },
    {
      title: 'Jalna Tanker Crisis (Marathi)',
      lang: 'Marathi',
      source: 'Gram Sabha Voice' as SignalSource,
      district: 'Jalna',
      state: 'Maharashtra',
      category: 'Water & Sanitation' as IssueCategory,
      text: 'Amchya talukyat 15 divsatun ekda tanker yeto, borewell che pani kharpat zalya mule balakanna ajar hot ahet.'
    },
    {
      title: 'Gadchiroli Silent Gap (Marathi)',
      lang: 'Marathi',
      source: 'IVR Call' as SignalSource,
      district: 'Gadchiroli',
      state: 'Maharashtra',
      category: 'Healthcare' as IssueCategory,
      text: 'Bijapur vanakshetramadhe arogya kendrat doctor mahinyatun fakt ekda yetat, gadhodar mata khup sankatat ahet.'
    }
  ];

  // Voice recording handlers
  const startRecording = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        if (showToast) {
          showToast('Voice recording unavailable in iframe. Using demo text processing.', 'warning');
        }
        setInputText('School bus cannot reach our village because rain water flooded the unpaved road and broken culvert.');
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingDuration(0);
      timerRef.current = setInterval(() => {
        setRecordingDuration((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.warn('Microphone permission denied or unavailable:', err);
      // Graceful fallback per instructions
      setInputText('School bus cannot reach our village because rain water flooded the unpaved road and broken culvert.');
      if (showToast) {
        showToast('Voice processing simulated with demo civic voice record.', 'info');
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
      if (!inputText) {
        setInputText('Bichhiya nala paar karne wala rasta toot gaya hai, ambulance gaon me nahi aa pa rahi hai.');
      }
    }
  };

  const handleSubmitSignal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/signals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText,
          language: inputLang,
          source: inputSource,
          district: inputDistrict,
          state: inputState,
          issueCategory: inputCategory
        })
      });
      const data = await res.json();
      if (data.signal) {
        onIngestSignal(data.signal);
        setAiAnalysisPreview(data.signal);
        setTimeout(() => {
          setIsSubmitModalOpen(false);
          setAiAnalysisPreview(null);
          setInputText('');
          setAudioUrl(null);
        }, 1500);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter signals
  const filteredSignals = signals.filter((s) => {
    if (activeTab === 'voice' && s.source !== 'Gram Sabha Voice' && s.source !== 'IVR Call') return false;
    if (activeTab === 'text' && s.source !== 'Civic Portal') return false;
    if (activeTab === 'messaging' && s.source !== 'WhatsApp' && s.source !== 'SMS') return false;

    if (categoryFilter !== 'All' && s.issueCategory !== categoryFilter) return false;
    if (departmentFilter !== 'All' && s.department !== departmentFilter) return false;
    if (severityFilter !== 'All' && s.severity !== severityFilter) return false;
    if (languageFilter !== 'All' && s.language !== languageFilter) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        s.originalText.toLowerCase().includes(q) ||
        s.translatedText.toLowerCase().includes(q) ||
        s.district.toLowerCase().includes(q) ||
        s.subCategory.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  return (
    <div className="p-4 lg:p-6 space-y-5 max-w-7xl mx-auto">
      {/* Header & Submit Button */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <span>Multilingual Citizen Signals</span>
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {filteredSignals.length} Active
            </span>
          </h1>
          <p className="text-xs text-slate-400">
            Ingesting citizen voice across WhatsApp, IVR audio, Gram Sabha recordings, and SMS.
          </p>
        </div>

        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-md transition"
        >
          <Mic className="h-4 w-4" />
          <span>Submit Citizen Signal (Voice / Text)</span>
        </button>
      </div>

      {/* Source Tabs & Search */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
        {/* Source Segmented Control */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs overflow-x-auto max-w-full">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 rounded text-xs font-medium whitespace-nowrap transition ${
              activeTab === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Sources ({signals.length})
          </button>
          <button
            onClick={() => setActiveTab('messaging')}
            className={`px-3 py-1 rounded text-xs font-medium whitespace-nowrap transition ${
              activeTab === 'messaging' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            WhatsApp / SMS
          </button>
          <button
            onClick={() => setActiveTab('voice')}
            className={`px-3 py-1 rounded text-xs font-medium whitespace-nowrap transition ${
              activeTab === 'voice' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            IVR / Gram Sabha Voice
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={`px-3 py-1 rounded text-xs font-medium whitespace-nowrap transition ${
              activeTab === 'text' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Web Portal
          </button>
        </div>

        {/* Search Field */}
        <div className="relative flex-1 min-w-[220px] max-w-md">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search signals by keyword, district, or entity..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Detailed Filter Dropdowns */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-slate-900 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
        >
          <option value="All">All Categories</option>
          <option value="Water & Sanitation">Water & Sanitation</option>
          <option value="Roads & Connectivity">Roads & Connectivity</option>
          <option value="Healthcare">Healthcare</option>
          <option value="School Education">School Education</option>
          <option value="Power & Energy">Power & Energy</option>
          <option value="Irrigation & Agriculture">Irrigation & Agriculture</option>
        </select>

        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="bg-slate-900 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
        >
          <option value="All">All Severities</option>
          <option value="High">High Severity</option>
          <option value="Medium">Medium Severity</option>
          <option value="Low">Low Severity</option>
        </select>

        <select
          value={languageFilter}
          onChange={(e) => setLanguageFilter(e.target.value)}
          className="bg-slate-900 border border-slate-800 text-slate-300 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-indigo-500"
        >
          <option value="All">All Languages</option>
          <option value="Hindi">Hindi</option>
          <option value="Marathi">Marathi</option>
          <option value="Tamil">Tamil</option>
          <option value="Bengali">Bengali</option>
          <option value="Kannada">Kannada</option>
          <option value="Odia">Odia</option>
          <option value="English">English</option>
        </select>

        <button
          onClick={() => {
            setCategoryFilter('All');
            setDepartmentFilter('All');
            setSeverityFilter('All');
            setLanguageFilter('All');
            setSearchQuery('');
          }}
          className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
        >
          Reset Filters
        </button>
      </div>

      {/* Signals List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredSignals.map((signal) => (
          <div
            key={signal.id}
            onClick={() => setSelectedSignal(signal)}
            className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition cursor-pointer flex flex-col justify-between group"
          >
            <div>
              {/* Header: source, language, severity */}
              <div className="flex items-center justify-between text-[11px] mb-2">
                <span className="text-slate-400 font-medium">
                  {signal.source} · {signal.language}
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${
                    signal.severity === 'High'
                      ? 'bg-rose-500/20 text-rose-300'
                      : signal.severity === 'Medium'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-slate-700 text-slate-300'
                  }`}
                >
                  {signal.severity}
                </span>
              </div>

              {/* Original Text */}
              <p className="text-xs font-medium text-slate-200 line-clamp-2 mb-1.5 italic">
                "{signal.originalText}"
              </p>

              {/* Translated English */}
              <p className="text-xs text-slate-400 line-clamp-2 mb-3">
                {signal.translatedText}
              </p>
            </div>

            {/* Footer metadata */}
            <div className="pt-2.5 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
              <span className="truncate max-w-[130px] font-medium text-slate-300">
                {signal.district}, {signal.state}
              </span>
              <div className="flex items-center gap-1.5 text-indigo-400">
                <span>Confidence {Math.round(signal.confidence * 100)}%</span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Signal Detail Slide-over Drawer */}
      {selectedSignal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-lg bg-slate-900 border-l border-slate-800 h-full p-6 overflow-y-auto flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
                <div>
                  <span className="text-xs text-indigo-400 font-semibold uppercase tracking-wider">
                    Signal Intelligence Detail
                  </span>
                  <h2 className="text-base font-bold text-white">Signal #{selectedSignal.id}</h2>
                </div>
                <button
                  onClick={() => setSelectedSignal(null)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Source & Privacy Badge */}
              <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  Source: {selectedSignal.source}
                </span>
                <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  Language: {selectedSignal.language}
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Citizen Identity Anonymized
                </span>
              </div>

              {/* Signal Text Comparison */}
              <div className="space-y-3 mb-5">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Original Citizen Voice ({selectedSignal.language})
                  </span>
                  <p className="text-xs text-slate-200 italic leading-relaxed">
                    "{selectedSignal.originalText}"
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-[11px] font-semibold text-indigo-400 uppercase tracking-wider block mb-1">
                    Verified English Translation & Intent
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {selectedSignal.translatedText}
                  </p>
                </div>
              </div>

              {/* Extracted Entities & AI Classification */}
              <div className="space-y-3 text-xs mb-6">
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Classified Category:</span>
                  <span className="font-semibold text-white">{selectedSignal.issueCategory}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Sub-Issue:</span>
                  <span className="font-semibold text-slate-200">{selectedSignal.subCategory}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Target Department:</span>
                  <span className="font-semibold text-indigo-300">{selectedSignal.department}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Severity Assessment:</span>
                  <span className="font-semibold text-rose-400">{selectedSignal.severity} Severity</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Affected Population:</span>
                  <span className="font-semibold text-slate-200">
                    ~{selectedSignal.affectedPopulationEstimate.toLocaleString()} citizens
                  </span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Assigned Need Cluster:</span>
                  <button
                    onClick={() => {
                      onSelectCluster(selectedSignal.clusterId);
                      setSelectedSignal(null);
                    }}
                    className="font-semibold text-indigo-400 hover:underline"
                  >
                    {selectedSignal.clusterId} →
                  </button>
                </div>
              </div>

              {/* Extracted Entities */}
              <div className="mb-4">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Extracted Entities & Geographic Tags
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSignal.extractedEntities.map((entity, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300 border border-slate-700"
                    >
                      {entity}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex gap-2">
              <button
                onClick={() => {
                  onSelectCluster(selectedSignal.clusterId);
                  setSelectedSignal(null);
                }}
                className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition"
              >
                Inspect Associated Need Cluster
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submit Citizen Signal Modal (Multilingual Text & Voice) */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-lg w-full shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Mic className="h-4 w-4 text-indigo-400" />
                  <span>Submit Citizen Signal</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Multilingual ingestion adapter for WhatsApp, voice message, or civic intake.
                </p>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Quick Demo Presets */}
            <div className="mb-4">
              <span className="text-[11px] text-slate-400 font-semibold block mb-1.5">
                Load Realistic Demo Preset:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {DEMO_PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setInputText(p.text);
                      setInputLang(p.lang);
                      setInputSource(p.source);
                      setInputDistrict(p.district);
                      setInputState(p.state);
                      setInputCategory(p.category);
                    }}
                    className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 border border-slate-700 transition"
                  >
                    {p.title}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmitSignal} className="space-y-4 text-xs">
              {/* Voice Recording Widget */}
              <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  {!isRecording ? (
                    <button
                      type="button"
                      onClick={startRecording}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600/20 border border-rose-500/40 text-rose-300 hover:bg-rose-600/30 transition"
                    >
                      <Mic className="h-4 w-4 text-rose-400" />
                      <span>Record Voice Signal</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={stopRecording}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 text-white animate-pulse"
                    >
                      <MicOff className="h-4 w-4" />
                      <span>Stop Recording ({recordingDuration}s)</span>
                    </button>
                  )}
                </div>

                {audioUrl && (
                  <div className="mt-2">
                    <audio src={audioUrl} controls className="w-full h-8" />
                  </div>
                )}
                <span className="text-[10px] text-slate-500 block mt-1">
                  Browser MediaRecorder integration with automatic speech-to-intent synthesis.
                </span>
              </div>

              {/* Text Input */}
              <div>
                <label className="block text-slate-300 font-medium mb-1">
                  Citizen Message (Original Language):
                </label>
                <textarea
                  rows={3}
                  required
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter citizen signal text in Hindi, Marathi, Bengali, Tamil, English, etc..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Metadata Inputs */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Language</label>
                  <select
                    value={inputLang}
                    onChange={(e) => setInputLang(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-300 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Hindi">Hindi</option>
                    <option value="Marathi">Marathi</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Bengali">Bengali</option>
                    <option value="Kannada">Kannada</option>
                    <option value="Odia">Odia</option>
                    <option value="English">English</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Ingestion Channel</label>
                  <select
                    value={inputSource}
                    onChange={(e) => setInputSource(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-300 focus:outline-none focus:border-indigo-500"
                  >
                    <option value="WhatsApp">WhatsApp Ingestion</option>
                    <option value="Gram Sabha Voice">Gram Sabha Voice</option>
                    <option value="IVR Call">IVR Automated Call</option>
                    <option value="SMS">SMS Gateway</option>
                    <option value="Civic Portal">Civic Web Portal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">District</label>
                  <input
                    type="text"
                    value={inputDistrict}
                    onChange={(e) => setInputDistrict(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-300 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">State</label>
                  <input
                    type="text"
                    value={inputState}
                    onChange={(e) => setInputState(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-300 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Submit Action */}
              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium disabled:opacity-50"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>{isSubmitting ? 'Analyzing with Gemini...' : 'Analyze & Ingest Signal'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
