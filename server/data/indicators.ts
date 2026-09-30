import { DemographicIndicator, InfrastructureIndicator } from '../../src/types.js';

export const SEEDED_INFRASTRUCTURE: InfrastructureIndicator[] = [
  // Mandla & Dindori (Showcase Region: Seasonal Connectivity)
  {
    id: 'infra-001',
    region: 'Mandla, Madhya Pradesh',
    state: 'Madhya Pradesh',
    district: 'Mandla',
    category: 'Roads & Connectivity',
    indicator: 'All-Weather Rural Road Pavement Coverage (% habitations connected)',
    currentScore: 42,
    benchmark: 88,
    gap: 46,
    source: 'Pradhan Mantri Gram Sadak Yojana (PMGSY) Geo-Spatial Audit',
    year: 2025
  },
  {
    id: 'infra-002',
    region: 'Mandla, Madhya Pradesh',
    state: 'Madhya Pradesh',
    district: 'Mandla',
    category: 'Healthcare',
    indicator: 'Emergency Ambulance Response Time under 30 Mins (% villages accessible)',
    currentScore: 34,
    benchmark: 85,
    gap: 51,
    source: 'National Health Mission Emergency Transit Index',
    year: 2025
  },
  {
    id: 'infra-003',
    region: 'Mandla, Madhya Pradesh',
    state: 'Madhya Pradesh',
    district: 'Mandla',
    category: 'School Education',
    indicator: 'Secondary School Commute Distance Compliance (< 5 km safe transit)',
    currentScore: 48,
    benchmark: 90,
    gap: 42,
    source: 'UDISE+ Unified District Information System for Education',
    year: 2025
  },
  {
    id: 'infra-004',
    region: 'Dindori, Madhya Pradesh',
    state: 'Madhya Pradesh',
    district: 'Dindori',
    category: 'Roads & Connectivity',
    indicator: 'Culvert & Causeway Flood Resistance Index',
    currentScore: 31,
    benchmark: 80,
    gap: 49,
    source: 'State Rural Road Development Authority Audit',
    year: 2025
  },

  // Jalna & Barmer (Water & Sanitation)
  {
    id: 'infra-005',
    region: 'Jalna, Maharashtra',
    state: 'Maharashtra',
    district: 'Jalna',
    category: 'Water & Sanitation',
    indicator: 'Functional Household Tap Connection (FHTC) Year-Round Reliability',
    currentScore: 39,
    benchmark: 85,
    gap: 46,
    source: 'Jal Jeevan Mission MIS Portal',
    year: 2025
  },
  {
    id: 'infra-006',
    region: 'Jalna, Maharashtra',
    state: 'Maharashtra',
    district: 'Jalna',
    category: 'Healthcare',
    indicator: 'Incidence of Waterborne Enteric Inundation per 10k Population',
    currentScore: 41, // lower is worse in gap metric
    benchmark: 85,
    gap: 44,
    source: 'Integrated Disease Surveillance Programme (IDSP)',
    year: 2025
  },
  {
    id: 'infra-007',
    region: 'Barmer, Rajasthan',
    state: 'Rajasthan',
    district: 'Barmer',
    category: 'Water & Sanitation',
    indicator: 'Potable Water Fluoride & TDS Safety Conformance (% habitations)',
    currentScore: 28,
    benchmark: 95,
    gap: 67,
    source: 'Central Ground Water Board Regional Quality Survey',
    year: 2025
  },

  // Gadchiroli & Araria (Silent Gaps)
  {
    id: 'infra-008',
    region: 'Gadchiroli, Maharashtra',
    state: 'Maharashtra',
    district: 'Gadchiroli',
    category: 'Healthcare',
    indicator: 'Institutional Delivery & C-Section Functional Facility Distance Index',
    currentScore: 22,
    benchmark: 85,
    gap: 63,
    source: 'State Family Health Survey 5 / NITI Aayog Aspirational Districts',
    year: 2025
  },
  {
    id: 'infra-009',
    region: 'Gadchiroli, Maharashtra',
    state: 'Maharashtra',
    district: 'Gadchiroli',
    category: 'Power & Energy',
    indicator: 'Uninterrupted 3-Phase Rural Feeder Power Availability (Hours/Day)',
    currentScore: 29,
    benchmark: 80,
    gap: 51,
    source: 'Discom Distribution Reliability Audit',
    year: 2025
  },
  {
    id: 'infra-010',
    region: 'Araria, Bihar',
    state: 'Bihar',
    district: 'Araria',
    category: 'Healthcare',
    indicator: 'Kala-Azar & Endemic Vector Disease Rapid Test Kit Availability Index',
    currentScore: 36,
    benchmark: 90,
    gap: 54,
    source: 'National Centre for Vector Borne Diseases Control',
    year: 2025
  },
  {
    id: 'infra-011',
    region: 'Araria, Bihar',
    state: 'Bihar',
    district: 'Araria',
    category: 'Power & Energy',
    indicator: 'Broadband/Fibre Reach to Gram Panchayat Secretariats (% functional)',
    currentScore: 32,
    benchmark: 90,
    gap: 58,
    source: 'BharatNet Phase II Operational Status',
    year: 2025
  },

  // Thiruvallur & Raichur
  {
    id: 'infra-012',
    region: 'Thiruvallur, Tamil Nadu',
    state: 'Tamil Nadu',
    district: 'Thiruvallur',
    category: 'Public Housing & Drainage',
    indicator: 'Peri-Urban Stormwater Drain Density & Desiltation Frequency Index',
    currentScore: 47,
    benchmark: 85,
    gap: 38,
    source: 'State Municipal Administration Urban Infrastructure Report',
    year: 2025
  },
  {
    id: 'infra-013',
    region: 'Raichur, Karnataka',
    state: 'Karnataka',
    district: 'Raichur',
    category: 'Irrigation & Agriculture',
    indicator: 'Canal Tail-end Flow Regularity & Micro-Irrigation Coverage (% gross cropped)',
    currentScore: 38,
    benchmark: 80,
    gap: 42,
    source: 'Karnataka Water Resources Authority Hydrograph',
    year: 2025
  },
  {
    id: 'infra-014',
    region: 'Raichur, Karnataka',
    state: 'Karnataka',
    district: 'Raichur',
    category: 'Healthcare',
    indicator: 'Primary Health Centre Solar Cold-Chain Continuous Power Uptime',
    currentScore: 44,
    benchmark: 95,
    gap: 51,
    source: 'Universal Immunization Programme Evaluation Report',
    year: 2025
  },

  // South 24 Parganas & Kalahandi
  {
    id: 'infra-015',
    region: 'South 24 Parganas, West Bengal',
    state: 'West Bengal',
    district: 'South 24 Parganas',
    category: 'Public Housing & Drainage',
    indicator: 'Riverine Concrete Geotextile Embankment Resilience Score',
    currentScore: 33,
    benchmark: 90,
    gap: 57,
    source: 'Sundarbans Affairs Department Geo-hazard Mapping',
    year: 2025
  },
  {
    id: 'infra-016',
    region: 'Kalahandi, Odisha',
    state: 'Odisha',
    district: 'Kalahandi',
    category: 'Roads & Connectivity',
    indicator: 'Hilly High-Gradient Stream All-Weather Culverts Coverage',
    currentScore: 35,
    benchmark: 85,
    gap: 50,
    source: 'Odisha Rural Infrastructure Development Fund (RIDF)',
    year: 2025
  },

  // Sonbhadra & Sehore
  {
    id: 'infra-017',
    region: 'Sonbhadra, Uttar Pradesh',
    state: 'Uttar Pradesh',
    district: 'Sonbhadra',
    category: 'Water & Sanitation',
    indicator: 'Heavy Metal / Fly Ash Slurry Separation Compliance Index',
    currentScore: 26,
    benchmark: 90,
    gap: 64,
    source: 'State Pollution Control Board Environmental Water Audit',
    year: 2025
  },
  {
    id: 'infra-018',
    region: 'Sonbhadra, Uttar Pradesh',
    state: 'Uttar Pradesh',
    district: 'Sonbhadra',
    category: 'Healthcare',
    indicator: 'Occupational Respiratory Clinic & Spirometry Access Ratio',
    currentScore: 30,
    benchmark: 80,
    gap: 50,
    source: 'National Programme for Healthcare of the Elderly & Workers',
    year: 2025
  },
  {
    id: 'infra-019',
    region: 'Sehore, Madhya Pradesh',
    state: 'Madhya Pradesh',
    district: 'Sehore',
    category: 'Irrigation & Agriculture',
    indicator: 'Village Farmgate Cold-Storage & Sorting Logistics Hub Capacity',
    currentScore: 45,
    benchmark: 80,
    gap: 35,
    source: 'Agriculture Infrastructure Fund (AIF) Progress MIS',
    year: 2025
  },

  // Nandurbar & Malkangiri
  {
    id: 'infra-020',
    region: 'Nandurbar, Maharashtra',
    state: 'Maharashtra',
    district: 'Nandurbar',
    category: 'Healthcare',
    indicator: 'Severe Acute Malnutrition (SAM) Treatment Centre Density Index',
    currentScore: 27,
    benchmark: 90,
    gap: 63,
    source: 'Integrated Child Development Services (ICDS) Annual Benchmark',
    year: 2025
  },
  {
    id: 'infra-021',
    region: 'Malkangiri, Odisha',
    state: 'Odisha',
    district: 'Malkangiri',
    category: 'Roads & Connectivity',
    indicator: 'Reservoir Cut-off Habitation Feeder Launch & Roadway Integration',
    currentScore: 21,
    benchmark: 85,
    gap: 64,
    source: 'Odisha Backward Areas Development Agency',
    year: 2025
  },
  {
    id: 'infra-022',
    region: 'Jaisalmer, Rajasthan',
    state: 'Rajasthan',
    district: 'Jaisalmer',
    category: 'Power & Energy',
    indicator: 'Dhani-Level Decentralized Solar Mini-Grid Penetration',
    currentScore: 37,
    benchmark: 85,
    gap: 48,
    source: 'Rajasthan Renewable Energy Corporation Limited (RRECL)',
    year: 2025
  }
];

export const SEEDED_DEMOGRAPHICS: DemographicIndicator[] = [
  {
    region: 'Mandla, Madhya Pradesh',
    district: 'Mandla',
    state: 'Madhya Pradesh',
    population: 1054905,
    populationDensity: 182,
    ageGroups: { under14: 29.4, working15to59: 61.2, senior60plus: 9.4 },
    vulnerabilityIndex: 78,
    digitalParticipationIndex: 38 // Low digital penetration -> silent gap risk
  },
  {
    region: 'Dindori, Madhya Pradesh',
    district: 'Dindori',
    state: 'Madhya Pradesh',
    population: 704524,
    populationDensity: 94,
    ageGroups: { under14: 31.0, working15to59: 60.1, senior60plus: 8.9 },
    vulnerabilityIndex: 86,
    digitalParticipationIndex: 26
  },
  {
    region: 'Jalna, Maharashtra',
    district: 'Jalna',
    state: 'Maharashtra',
    population: 1959046,
    populationDensity: 255,
    ageGroups: { under14: 26.8, working15to59: 63.5, senior60plus: 9.7 },
    vulnerabilityIndex: 68,
    digitalParticipationIndex: 62
  },
  {
    region: 'Barmer, Rajasthan',
    district: 'Barmer',
    state: 'Rajasthan',
    population: 2603751,
    populationDensity: 92,
    ageGroups: { under14: 33.2, working15to59: 59.8, senior60plus: 7.0 },
    vulnerabilityIndex: 79,
    digitalParticipationIndex: 45
  },
  {
    region: 'Gadchiroli, Maharashtra',
    district: 'Gadchiroli',
    state: 'Maharashtra',
    population: 1072942,
    populationDensity: 74,
    ageGroups: { under14: 27.5, working15to59: 63.1, senior60plus: 9.4 },
    vulnerabilityIndex: 94, // Highly vulnerable
    digitalParticipationIndex: 18 // Severe blind spot!
  },
  {
    region: 'Araria, Bihar',
    district: 'Araria',
    state: 'Bihar',
    population: 2811569,
    populationDensity: 992,
    ageGroups: { under14: 36.1, working15to59: 57.3, senior60plus: 6.6 },
    vulnerabilityIndex: 89,
    digitalParticipationIndex: 21 // High population, very low digital voice
  },
  {
    region: 'Thiruvallur, Tamil Nadu',
    district: 'Thiruvallur',
    state: 'Tamil Nadu',
    population: 3728104,
    populationDensity: 1049,
    ageGroups: { under14: 22.4, working15to59: 67.2, senior60plus: 10.4 },
    vulnerabilityIndex: 48,
    digitalParticipationIndex: 81
  },
  {
    region: 'Raichur, Karnataka',
    district: 'Raichur',
    state: 'Karnataka',
    population: 1928812,
    populationDensity: 228,
    ageGroups: { under14: 28.5, working15to59: 62.4, senior60plus: 9.1 },
    vulnerabilityIndex: 74,
    digitalParticipationIndex: 49
  },
  {
    region: 'South 24 Parganas, West Bengal',
    district: 'South 24 Parganas',
    state: 'West Bengal',
    population: 8161961,
    populationDensity: 819,
    ageGroups: { under14: 25.9, working15to59: 64.8, senior60plus: 9.3 },
    vulnerabilityIndex: 84,
    digitalParticipationIndex: 58
  },
  {
    region: 'Kalahandi, Odisha',
    district: 'Kalahandi',
    state: 'Odisha',
    population: 1576869,
    populationDensity: 199,
    ageGroups: { under14: 29.8, working15to59: 61.4, senior60plus: 8.8 },
    vulnerabilityIndex: 87,
    digitalParticipationIndex: 32
  },
  {
    region: 'Sonbhadra, Uttar Pradesh',
    district: 'Sonbhadra',
    state: 'Uttar Pradesh',
    population: 1862559,
    populationDensity: 270,
    ageGroups: { under14: 31.4, working15to59: 61.2, senior60plus: 7.4 },
    vulnerabilityIndex: 82,
    digitalParticipationIndex: 44
  },
  {
    region: 'Sehore, Madhya Pradesh',
    district: 'Sehore',
    state: 'Madhya Pradesh',
    population: 1311332,
    populationDensity: 199,
    ageGroups: { under14: 28.1, working15to59: 62.9, senior60plus: 9.0 },
    vulnerabilityIndex: 61,
    digitalParticipationIndex: 55
  },
  {
    region: 'Jaisalmer, Rajasthan',
    district: 'Jaisalmer',
    state: 'Rajasthan',
    population: 669919,
    populationDensity: 17,
    ageGroups: { under14: 34.0, working15to59: 59.2, senior60plus: 6.8 },
    vulnerabilityIndex: 77,
    digitalParticipationIndex: 39
  },
  {
    region: 'Nandurbar, Maharashtra',
    district: 'Nandurbar',
    state: 'Maharashtra',
    population: 1648295,
    populationDensity: 277,
    ageGroups: { under14: 31.8, working15to59: 60.5, senior60plus: 7.7 },
    vulnerabilityIndex: 93,
    digitalParticipationIndex: 20 // Severe blind spot
  },
  {
    region: 'Malkangiri, Odisha',
    district: 'Malkangiri',
    state: 'Odisha',
    population: 613192,
    populationDensity: 106,
    ageGroups: { under14: 30.5, working15to59: 61.2, senior60plus: 8.3 },
    vulnerabilityIndex: 95,
    digitalParticipationIndex: 16 // Extreme silent gap
  },
  {
    region: 'Darbhanga, Bihar',
    district: 'Darbhanga',
    state: 'Bihar',
    population: 3937385,
    populationDensity: 1728,
    ageGroups: { under14: 34.2, working15to59: 58.7, senior60plus: 7.1 },
    vulnerabilityIndex: 80,
    digitalParticipationIndex: 42
  }
];
