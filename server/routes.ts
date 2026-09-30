import { Router, Request, Response } from 'express';
import { repository } from './data/index.js';
import {
  analyzeSignalAI,
  generateCopilotAnswerAI,
  generateConvergenceOpportunityAI,
  processVoiceAudioAI
} from './gemini.js';
import { CitizenSignal, Project, Recommendation } from '../src/types.js';

export const apiRouter = Router();

// Regions endpoint
apiRouter.get('/regions', (_req: Request, res: Response) => {
  const regions = [
    { state: 'Madhya Pradesh', districts: ['Mandla', 'Dindori', 'Sehore', 'Shahdol', 'Tikamgarh'] },
    { state: 'Maharashtra', districts: ['Jalna', 'Gadchiroli', 'Nandurbar', 'Nashik', 'Yavatmal'] },
    { state: 'Rajasthan', districts: ['Barmer', 'Jaisalmer', 'Jhunjhunu'] },
    { state: 'Bihar', districts: ['Araria', 'Darbhanga', 'Saharsa'] },
    { state: 'Tamil Nadu', districts: ['Thiruvallur', 'Madurai'] },
    { state: 'Karnataka', districts: ['Raichur', 'Uttara Kannada', 'Chikkaballapur'] },
    { state: 'Odisha', districts: ['Kalahandi', 'Malkangiri', 'Mayurbhanj'] },
    { state: 'Uttar Pradesh', districts: ['Sonbhadra', 'Lakhimpur Kheri'] },
    { state: 'West Bengal', districts: ['South 24 Parganas'] }
  ];
  res.json({ regions });
});

// Citizen signals
apiRouter.get('/signals', (req: Request, res: Response) => {
  let list = [...repository.signals];
  const { category, department, severity, language, state, district, search } = req.query;

  if (category && category !== 'All') {
    list = list.filter((s) => s.issueCategory === category);
  }
  if (department && department !== 'All') {
    list = list.filter((s) => s.department === department);
  }
  if (severity && severity !== 'All') {
    list = list.filter((s) => s.severity === severity);
  }
  if (language && language !== 'All') {
    list = list.filter((s) => s.language === language);
  }
  if (state && state !== 'All') {
    list = list.filter((s) => s.state === state);
  }
  if (district && district !== 'All') {
    list = list.filter((s) => s.district === district);
  }
  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    list = list.filter(
      (s) =>
        s.originalText.toLowerCase().includes(q) ||
        s.translatedText.toLowerCase().includes(q) ||
        s.district.toLowerCase().includes(q) ||
        s.subCategory.toLowerCase().includes(q)
    );
  }

  res.json({ total: list.length, signals: list });
});

apiRouter.post('/signals', async (req: Request, res: Response) => {
  const { text, language, district, state, source, issueCategory } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'Signal text is required' });
  }

  const analysisResult = await analyzeSignalAI({
    text,
    language,
    source: source || 'Civic Portal',
    location: `${district || 'General'}, ${state || 'India'}`
  });

  const parsed = analysisResult.analysis;
  const resolvedCat = (issueCategory as any) || parsed.issueCategory;

  // Correctly and dynamically assign to cluster, coordinates, and jurisdiction
  const assignment = repository.assignSignalToCluster({
    district,
    state,
    category: resolvedCat,
    text
  });

  const newSignal: CitizenSignal = {
    id: `sig-${Date.now().toString().slice(-5)}`,
    source: (source as any) || 'Civic Portal',
    language: language || 'Hindi',
    originalText: text,
    translatedText: parsed.translatedEnglish || text,
    timestamp: new Date().toISOString(),
    district: assignment.resolvedDistrict,
    state: assignment.resolvedState,
    latitude: assignment.latitude,
    longitude: assignment.longitude,
    issueCategory: resolvedCat,
    subCategory: parsed.subCategory || 'Citizen Ingestion',
    severity: parsed.severity || 'Medium',
    affectedPopulationEstimate: parsed.affectedPopulationEstimate || 10000,
    department: parsed.department || 'Rural Development',
    sentiment: parsed.sentiment || 'Dissatisfied',
    confidence: parsed.confidence || 0.9,
    extractedEntities: parsed.extractedEntities || [assignment.resolvedDistrict],
    anonymized: true,
    clusterId: assignment.clusterId
  };

  repository.signals.unshift(newSignal);
  res.status(201).json({
    message: 'Signal successfully ingested, geo-located, and assigned to need cluster',
    signal: newSignal,
    aiPowered: analysisResult.aiPowered
  });
});

// Need clusters
apiRouter.get('/needs', (req: Request, res: Response) => {
  let list = [...repository.clusters];
  const { category, search } = req.query;

  if (category && category !== 'All') {
    list = list.filter((c) => c.categories.includes(category as any));
  }
  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    list = list.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.locations.some((l) => l.district.toLowerCase().includes(q))
    );
  }

  res.json({ total: list.length, clusters: list });
});

// Infrastructure indicators
apiRouter.get('/infrastructure', (_req: Request, res: Response) => {
  res.json({ total: repository.infrastructure.length, indicators: repository.infrastructure });
});

// Demographics
apiRouter.get('/demographics', (_req: Request, res: Response) => {
  res.json({ total: repository.demographics.length, demographics: repository.demographics });
});

// Projects
apiRouter.get('/projects', (req: Request, res: Response) => {
  let list = [...repository.projects];
  const { department, status } = req.query;

  if (department && department !== 'All') {
    list = list.filter((p) => p.department === department);
  }
  if (status && status !== 'All') {
    list = list.filter((p) => p.status === status);
  }

  res.json({ total: list.length, projects: list });
});

// Recommendations
apiRouter.get('/recommendations', (_req: Request, res: Response) => {
  res.json({ total: repository.recommendations.length, recommendations: repository.recommendations });
});

apiRouter.post('/recommendations', (req: Request, res: Response) => {
  const newRec: Recommendation = req.body;
  if (!newRec.title || !newRec.region) {
    return res.status(400).json({ error: 'Title and region are required' });
  }
  newRec.id = newRec.id || `rec-${Date.now().toString().slice(-4)}`;
  newRec.createdAt = newRec.createdAt || new Date().toISOString();
  repository.recommendations.unshift(newRec);

  // Register candidate project in repository.projects with the actual jurisdiction
  const projectDistrict = newRec.district || newRec.region.split(',')[0]?.trim() || 'General';
  const projectState = newRec.state || newRec.region.split(',')[1]?.trim() || 'National';

  const exists = repository.projects.find((p) => p.name.toLowerCase() === newRec.title.toLowerCase());
  if (!exists) {
    const candidateProj: Project = {
      id: `proj-cand-${Date.now().toString().slice(-4)}`,
      name: newRec.title,
      department: newRec.evidence?.contributingDepartments?.[0] || 'Inter-Departmental Joint Scheme',
      region: newRec.region,
      district: projectDistrict,
      state: projectState,
      status: 'Planned',
      budget: newRec.estimatedCost || 35.0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      categories: (newRec.evidence?.contributingDepartments?.length
        ? [newRec.evidence.contributingDepartments[0].replace(' Authority', '') as any]
        : ['Roads & Connectivity']) as any,
      coveragePercent: 0,
      latitude: 20.5937,
      longitude: 78.9629,
      description: newRec.rationale
    };
    repository.projects.unshift(candidateProj);
  }

  res.status(201).json({
    message: 'Recommendation compiled and candidate project created in registry',
    recommendation: newRec
  });
});

// Collision check evaluation across all projects
apiRouter.get('/projects/collision-check', (req: Request, res: Response) => {
  const { clusterId } = req.query;
  const evaluation = repository.evaluateProjectCollisions(
    (clusterId as string) || 'clus-conn-01'
  );
  res.json(evaluation);
});

// Outcomes
apiRouter.get('/outcomes', (_req: Request, res: Response) => {
  res.json({ total: repository.outcomes.length, outcomes: repository.outcomes });
});

// Silent Gaps
apiRouter.get('/silent-gaps', (_req: Request, res: Response) => {
  const gaps = repository.getSilentGaps();
  res.json({ total: gaps.length, silentGaps: gaps });
});

// Need Convergence
apiRouter.get('/convergence', (_req: Request, res: Response) => {
  const groups = repository.getConvergenceGroups();
  res.json({ total: groups.length, convergenceGroups: groups });
});

// AI analysis routes
apiRouter.post('/ai/analyze-signal', async (req: Request, res: Response) => {
  const { text, language, source, location } = req.body;
  const result = await analyzeSignalAI({ text, language, source, location });
  res.json(result);
});

// Multimodal Voice Processing Pipeline (Gemini 3.8 Flash Audio Processing)
apiRouter.post('/ai/process-voice', async (req: Request, res: Response) => {
  const { audioBase64, mimeType, language, district, state } = req.body;
  const result = await processVoiceAudioAI({ audioBase64, mimeType, language, district, state });
  res.json(result);
});

apiRouter.post('/ai/copilot', async (req: Request, res: Response) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({ error: 'Question is required' });
  }

  // Retrieve actual structured evidence dynamically from repository
  const evidence = repository.retrieveEvidenceForQuery(question);
  const result = await generateCopilotAnswerAI({ question, evidence });
  res.json({
    ...result,
    evidence
  });
});

apiRouter.post('/ai/convergence', async (req: Request, res: Response) => {
  const group = req.body;
  const result = await generateConvergenceOpportunityAI(group);
  res.json(result);
});

apiRouter.post('/ai/simulation', (req: Request, res: Response) => {
  const { budget, region, priorityCategory, minimumPopulation, preference } = req.body;
  const result = repository.simulateBudget({
    budget: Number(budget) || 250,
    region,
    priorityCategory,
    minimumPopulation,
    preference
  });
  res.json(result);
});

// Demo run analysis workflow
apiRouter.post('/demo/run-analysis', (_req: Request, res: Response) => {
  // Simulates refreshing AI inference scores and synthesizing new evidence
  const gaps = repository.getSilentGaps();
  const convergence = repository.getConvergenceGroups();
  res.json({
    status: 'Analysis Completed Successfully',
    updatedAt: new Date().toISOString(),
    metrics: {
      signalsIngested: repository.signals.length,
      clustersRefined: repository.clusters.length,
      silentGapsIdentified: gaps.length,
      convergencePatternsDetected: convergence.length,
      recommendationsGenerated: repository.recommendations.length
    }
  });
});

// Demo reset
apiRouter.get('/demo/reset', (_req: Request, res: Response) => {
  repository.reset();
  res.json({ message: 'CivicTwin AI illustrative dataset reset to baseline state.' });
});

// Mock message ingestion adapter (WhatsApp/SMS webhook simulation)
apiRouter.post('/integrations/messages', async (req: Request, res: Response) => {
  const { from, message, language, district, state } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message payload required' });
  }

  const analysisResult = await analyzeSignalAI({
    text: message,
    language: language || 'Hindi',
    source: 'WhatsApp',
    location: `${district || 'General'}, ${state || 'India'}`
  });

  const parsed = analysisResult.analysis;
  const assignment = repository.assignSignalToCluster({
    district,
    state,
    category: parsed.issueCategory,
    text: message
  });

  const signal: CitizenSignal = {
    id: `sig-webhook-${Date.now().toString().slice(-4)}`,
    source: 'WhatsApp',
    language: language || 'Hindi',
    originalText: message,
    translatedText: parsed.translatedEnglish || message,
    timestamp: new Date().toISOString(),
    district: assignment.resolvedDistrict,
    state: assignment.resolvedState,
    latitude: assignment.latitude,
    longitude: assignment.longitude,
    issueCategory: parsed.issueCategory,
    subCategory: parsed.subCategory,
    severity: parsed.severity,
    affectedPopulationEstimate: parsed.affectedPopulationEstimate || 8000,
    department: parsed.department,
    sentiment: parsed.sentiment,
    confidence: parsed.confidence,
    extractedEntities: parsed.extractedEntities,
    anonymized: true, // Anonymized sender phone number
    clusterId: assignment.clusterId
  };

  repository.signals.unshift(signal);
  res.json({
    status: 'received_and_ingested',
    adapter: 'Mock Messaging Ingestion Gateway',
    signalId: signal.id,
    parsed,
    assignment
  });
});
