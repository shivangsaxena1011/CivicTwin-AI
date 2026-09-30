export type Severity = 'High' | 'Medium' | 'Low';

export type SignalSource = 'WhatsApp' | 'Gram Sabha Voice' | 'Civic Portal' | 'IVR Call' | 'SMS';

export type IssueCategory =
  | 'Water & Sanitation'
  | 'Roads & Connectivity'
  | 'Healthcare'
  | 'School Education'
  | 'Power & Energy'
  | 'Irrigation & Agriculture'
  | 'Public Housing & Drainage';

export interface CitizenSignal {
  id: string;
  source: SignalSource;
  language: string;
  originalText: string;
  translatedText: string;
  timestamp: string;
  district: string;
  state: string;
  latitude: number;
  longitude: number;
  issueCategory: IssueCategory;
  subCategory: string;
  severity: Severity;
  affectedPopulationEstimate: number;
  department: string;
  sentiment: 'Frustrated' | 'Urgent' | 'Dissatisfied' | 'Neutral';
  confidence: number;
  extractedEntities: string[];
  anonymized: boolean;
  clusterId: string;
}

export interface NeedCluster {
  id: string;
  title: string;
  description: string;
  categories: IssueCategory[];
  locations: { district: string; state: string }[];
  signalCount: number;
  affectedPopulation: number;
  expressedDemandScore: number; // 0 - 100
  infrastructureGapScore: number; // 0 - 100
  vulnerabilityScore: number; // 0 - 100
  accessibilityScore: number; // 0 - 100
  strategicAlignmentScore: number; // 0 - 100
  estimatedCost: number; // in ₹ Cr
  priorityScore: number; // calculated synthetic priority
  confidence: number;
  evidenceIds: string[];
  status?: 'Unaddressed' | 'Partially Covered' | 'Addressed' | 'In Proposal';
}

export interface InfrastructureIndicator {
  id: string;
  region: string; // District, State
  state: string;
  district: string;
  category: IssueCategory;
  indicator: string;
  currentScore: number; // 0 - 100
  benchmark: number; // target score, e.g. 85
  gap: number; // benchmark - currentScore
  source: string;
  year: number;
}

export interface DemographicIndicator {
  region: string; // District, State
  district: string;
  state: string;
  population: number;
  populationDensity: number; // per sq km
  ageGroups: { under14: number; working15to59: number; senior60plus: number };
  vulnerabilityIndex: number; // 0 - 100 (higher = more marginalized/vulnerable)
  digitalParticipationIndex: number; // 0 - 100 (low = reporting blind spot)
}

export type ProjectStatus = 'Approved' | 'In Progress' | 'Planned' | 'Completed';

export interface Project {
  id: string;
  name: string;
  department: string;
  region: string;
  district: string;
  state: string;
  status: ProjectStatus;
  budget: number; // in ₹ Cr
  startDate: string;
  endDate: string;
  categories: IssueCategory[];
  coveragePercent: number;
  latitude: number;
  longitude: number;
  description?: string;
}

export interface Recommendation {
  id: string;
  title: string;
  interventionType: 'Capital Expansion' | 'New Infrastructure' | 'Service Augmentation' | 'Inter-Departmental Joint Scheme';
  region: string;
  district: string;
  state: string;
  estimatedCost: number; // in ₹ Cr
  affectedPopulation: number;
  expectedGapReduction: number; // percentage points
  rationale: string;
  evidence: {
    signalsCount: number;
    infraGap: string;
    vulnerabilityHighlight: string;
    contributingDepartments: string[];
    keySignalQuotes: string[];
  };
  existingProjectOverlap: {
    projectId?: string;
    projectName?: string;
    overlapLevel: 'NO OVERLAP' | 'PARTIAL OVERLAP' | 'HIGH OVERLAP';
    notes: string;
    recommendedAction: string;
  };
  confidence: number;
  assumptions: string[];
  needClusterId: string;
  createdAt: string;
}

export interface Outcome {
  projectId: string;
  projectName: string;
  region: string;
  baselineScore: number;
  currentScore: number;
  citizenSatisfaction: number; // 0 - 100
  serviceAccessibility: number; // 0 - 100
  completionPercent: number;
  measuredAt: string;
  keyMetric: string;
  citizenFeedbackSample: string;
}

export interface SilentGapItem {
  id: string;
  region: string;
  district: string;
  state: string;
  category: IssueCategory;
  citizenSignalsCount: number;
  infrastructureScore: number;
  benchmarkScore: number;
  infrastructureGap: number;
  affectedPopulation: number;
  digitalParticipationIndex: number;
  vulnerabilityIndex: number;
  silentGapScore: number; // 0 - 100
  level: 'Critical Silent Gap' | 'High Silent Gap' | 'Moderate Silent Gap';
  whyFlagged: string;
  recommendedAction: string;
  confidence: number;
}

export interface NeedConvergenceGroup {
  id: string;
  title: string;
  rootCause: string;
  region: string;
  departments: string[];
  categories: IssueCategory[];
  symptoms: {
    department: string;
    complaintTheme: string;
    signalCount: number;
    sampleQuote: string;
  }[];
  totalSignals: number;
  affectedPopulation: number;
  opportunitySummary: string;
}

export interface SimulationResult {
  budget: number;
  allocatedCost: number;
  remainingBudget: number;
  selectedProjects: {
    id: string;
    title: string;
    region: string;
    cost: number;
    affectedPopulation: number;
    gapReduction: number;
    category: string;
    interventionType: string;
  }[];
  totalPopulationReached: number;
  averageGapReduction: number;
  unresolvedNeedCost: number;
  unresolvedNeedPopulation: number;
  regionsCovered: string[];
  categoryBreakdown: { category: string; amount: number; percentage: number }[];
  assumptions: string[];
}
