import { Outcome, Project, Recommendation } from '../../src/types.js';

export const SEEDED_PROJECTS: Project[] = [
  // 1. Showcase Overlap: Mandla-Dindori Road Package
  {
    id: 'proj-001',
    name: 'Mandla-Niwas-Shahpura Highway Widening & Bridge Modernization Scheme',
    department: 'Road Transport & Highways',
    region: 'Mandla, Madhya Pradesh',
    district: 'Mandla',
    state: 'Madhya Pradesh',
    status: 'In Progress',
    budget: 142.5,
    startDate: '2024-03-01',
    endDate: '2026-12-31',
    categories: ['Roads & Connectivity'],
    coveragePercent: 48,
    latitude: 22.612,
    longitude: 80.365,
    description: 'Major state arterial corridor upgrading. Note: Does not currently cover rural feeder culverts leading to Bichhiya and Samnapur tribal hamlets.'
  },
  {
    id: 'proj-002',
    name: 'Jal Jeevan Mission Marathwada Grid Package IV (Jalna Rural)',
    department: 'Jal Shakti & Water Supply',
    region: 'Jalna, Maharashtra',
    district: 'Jalna',
    state: 'Maharashtra',
    status: 'In Progress',
    budget: 215.0,
    startDate: '2023-08-15',
    endDate: '2027-03-31',
    categories: ['Water & Sanitation'],
    coveragePercent: 62,
    latitude: 19.835,
    longitude: 75.892,
    description: 'Bulk pipeline transmission from Jayakwadi reservoir; village internal distribution network remains under execution.'
  },
  {
    id: 'proj-003',
    name: 'Barmer Deep Aquifer De-fluoridation & Water ATMs Initiative',
    department: 'Jal Shakti & Water Supply',
    region: 'Barmer, Rajasthan',
    district: 'Barmer',
    state: 'Rajasthan',
    status: 'Planned',
    budget: 85.0,
    startDate: '2025-01-10',
    endDate: '2027-06-30',
    categories: ['Water & Sanitation', 'Healthcare'],
    coveragePercent: 28,
    latitude: 25.748,
    longitude: 71.402,
    description: 'Solar-powered community reverse-osmosis dispensers across 110 Gram Panchayats.'
  },
  {
    id: 'proj-004',
    name: 'Gadchiroli Aspirational District Solar Micro-Grid & Forest Road Links',
    department: 'Rural Development',
    region: 'Gadchiroli, Maharashtra',
    district: 'Gadchiroli',
    state: 'Maharashtra',
    status: 'Approved',
    budget: 68.0,
    startDate: '2025-04-01',
    endDate: '2027-12-31',
    categories: ['Power & Energy', 'Roads & Connectivity'],
    coveragePercent: 18,
    latitude: 20.178,
    longitude: 80.012,
    description: 'Installation of off-grid solar rooftop packs on 85 remote forest schools and primary sub-centres.'
  },
  {
    id: 'proj-005',
    name: 'Kosi Basin Flood Protection & Embankment Revetment Project',
    department: 'Water Resources & Flood Control',
    region: 'Araria, Bihar',
    district: 'Araria',
    state: 'Bihar',
    status: 'In Progress',
    budget: 175.0,
    startDate: '2023-11-01',
    endDate: '2026-11-30',
    categories: ['Public Housing & Drainage'],
    coveragePercent: 55,
    latitude: 26.162,
    longitude: 87.505,
    description: 'Geo-bag slope pitch and spurs along vulnerable river meander bends in Araria and Purnea.'
  },
  {
    id: 'proj-006',
    name: 'Chennai Metropolitan Fringe Stormwater Basin Drain Interceptor',
    department: 'Municipal Administration',
    region: 'Thiruvallur, Tamil Nadu',
    district: 'Thiruvallur',
    state: 'Tamil Nadu',
    status: 'In Progress',
    budget: 310.0,
    startDate: '2023-01-01',
    endDate: '2026-08-31',
    categories: ['Public Housing & Drainage', 'Water & Sanitation'],
    coveragePercent: 70,
    latitude: 13.138,
    longitude: 79.914,
    description: 'Construction of macro-stormwater canal network diverting surplus lake discharge directly into sea.'
  },
  {
    id: 'proj-007',
    name: 'Tungabhadra-Krishna Command Micro-Irrigation Solarization Phase II',
    department: 'Agriculture & Farmers Welfare',
    region: 'Raichur, Karnataka',
    district: 'Raichur',
    state: 'Karnataka',
    status: 'In Progress',
    budget: 92.0,
    startDate: '2024-06-01',
    endDate: '2026-09-30',
    categories: ['Irrigation & Agriculture', 'Power & Energy'],
    coveragePercent: 44,
    latitude: 16.215,
    longitude: 77.362,
    description: 'Subsidized 5HP solar surface and submersible pumps for tail-end canal command farmers.'
  },
  {
    id: 'proj-008',
    name: 'Sundarbans Estuary Climate-Resilient Mangrove & Embankment Armor',
    department: 'Water Resources & Flood Control',
    region: 'South 24 Parganas, West Bengal',
    district: 'South 24 Parganas',
    state: 'West Bengal',
    status: 'In Progress',
    budget: 280.0,
    startDate: '2022-10-01',
    endDate: '2027-03-31',
    categories: ['Public Housing & Drainage', 'Water & Sanitation'],
    coveragePercent: 58,
    latitude: 22.175,
    longitude: 88.552,
    description: 'Multi-tiered concrete tetrapod and bio-shield mangrove plantations across Gosaba and Basanti islands.'
  },
  {
    id: 'proj-009',
    name: 'Biju Setu Yojana Highland Stream Culverts Package 7',
    department: 'Road Transport & Highways',
    region: 'Kalahandi, Odisha',
    district: 'Kalahandi',
    state: 'Odisha',
    status: 'Approved',
    budget: 54.0,
    startDate: '2025-02-15',
    endDate: '2027-05-31',
    categories: ['Roads & Connectivity'],
    coveragePercent: 22,
    latitude: 19.905,
    longitude: 83.098,
    description: 'Constructing high-level submersible bridges across hill streams in Thuamul Rampur.'
  },
  {
    id: 'proj-010',
    name: 'Sonbhadra Industrial Effluent Zero Liquid Discharge Mandate',
    department: 'Environment & Climate Change',
    region: 'Sonbhadra, Uttar Pradesh',
    district: 'Sonbhadra',
    state: 'Uttar Pradesh',
    status: 'Planned',
    budget: 120.0,
    startDate: '2025-07-01',
    endDate: '2028-06-30',
    categories: ['Water & Sanitation', 'Healthcare'],
    coveragePercent: 15,
    latitude: 24.672,
    longitude: 82.971,
    description: 'Enforcement of mechanized dry ash handling and lined settling reservoirs for thermal power plants.'
  },
  {
    id: 'proj-011',
    name: 'Sehore Agro-Logistics Cluster & Farmgate Pre-Cooling Hubs',
    department: 'Agriculture & Farmers Welfare',
    region: 'Sehore, Madhya Pradesh',
    district: 'Sehore',
    state: 'Madhya Pradesh',
    status: 'In Progress',
    budget: 45.0,
    startDate: '2024-01-15',
    endDate: '2026-10-31',
    categories: ['Irrigation & Agriculture'],
    coveragePercent: 65,
    latitude: 23.212,
    longitude: 77.094,
    description: '500-metric ton modular cold rooms and electronic weighbridges at APMC mandis.'
  },
  {
    id: 'proj-012',
    name: 'Thar Desert Renewable Transmission Corridor Phase 3',
    department: 'Power & Renewable Energy',
    region: 'Jaisalmer, Rajasthan',
    district: 'Jaisalmer',
    state: 'Rajasthan',
    status: 'In Progress',
    budget: 380.0,
    startDate: '2023-04-01',
    endDate: '2026-12-31',
    categories: ['Power & Energy'],
    coveragePercent: 78,
    latitude: 26.905,
    longitude: 70.932,
    description: '765kV green energy corridor evacuating 8GW of ultra-mega solar and wind power.'
  },
  {
    id: 'proj-013',
    name: 'Nandurbar Nutrition Rehabilitation Centers & Tribal Mobile Dispensaries',
    department: 'Health & Family Welfare',
    region: 'Nandurbar, Maharashtra',
    district: 'Nandurbar',
    state: 'Maharashtra',
    status: 'Approved',
    budget: 35.0,
    startDate: '2025-03-01',
    endDate: '2027-08-31',
    categories: ['Healthcare'],
    coveragePercent: 25,
    latitude: 21.365,
    longitude: 74.232,
    description: 'Fleet of 4x4 off-road mobile medical clinic vans equipped with ultrasound and pediatric diagnostic kits.'
  },
  {
    id: 'proj-014',
    name: 'Gurupriya Bridge Peripheral Road Network Upgradation',
    department: 'Road Transport & Highways',
    region: 'Malkangiri, Odisha',
    district: 'Malkangiri',
    state: 'Odisha',
    status: 'Completed',
    budget: 187.0,
    startDate: '2019-01-01',
    endDate: '2024-03-31',
    categories: ['Roads & Connectivity'],
    coveragePercent: 100,
    latitude: 18.342,
    longitude: 81.879,
    description: 'Historic connectivity corridor linking 151 previously isolated cut-off villages to mainland Malkangiri.'
  }
];

export const SEEDED_RECOMMENDATIONS: Recommendation[] = [
  // 1. Showcase Recommendation: Mandla-Dindori Seasonal Connectivity Expansion
  {
    id: 'rec-001',
    title: 'Expand Mandla-Dindori Regional Connectivity Scheme to Include 18 Underserved Feeder Culverts & Causeway Bridges',
    interventionType: 'Capital Expansion',
    region: 'Mandla & Dindori, Madhya Pradesh',
    district: 'Mandla',
    state: 'Madhya Pradesh',
    estimatedCost: 38.5,
    affectedPopulation: 81600,
    expectedGapReduction: 42,
    rationale: 'Citizen signals from Bichhiya and Samnapur identify that monsoon stream breaches sever emergency medical transit to sub-centers, increase seasonal school absenteeism by 38%, and cause agricultural rot of perishable produce. Existing Project (proj-001) widens the main arterial highway but excludes 18 critical rural feeder culverts connecting peripheral tribal settlements.',
    evidence: {
      signalsCount: 22,
      infraGap: 'All-weather road connectivity gap is 46%; emergency transit gap is 51%',
      vulnerabilityHighlight: 'High tribal demographic index (84/100) with limited alternative transit corridors',
      contributingDepartments: ['Road Transport & Highways', 'Health & Family Welfare', 'School Education', 'Agriculture & Farmers Welfare'],
      keySignalQuotes: [
        'Hamare gaon Bichhiya mein baarish ke baad road bilkul kharab ho jaati hai aur ambulance nahi aa pati.',
        'Pul toot gaya hai nala paar karne ke liye. Bachhe school nahi ja pate 3 mahine.',
        'Tamatar aur sabzi mandi tak nahi le ja pa rahe, rasta band hone se fasal khet mein hi sad rahi hai.'
      ]
    },
    existingProjectOverlap: {
      projectId: 'proj-001',
      projectName: 'Mandla-Niwas-Shahpura Highway Widening & Bridge Modernization Scheme',
      overlapLevel: 'PARTIAL OVERLAP',
      notes: 'Project 001 operates in the same geographic quadrant (Mandla district) but focuses on highway trunk widening. Rural feeder links remain unaddressed.',
      recommendedAction: 'Issue an immediate Scope Expansion Change Order under Project 001 to fund rural feeder causeways, leveraging existing contractor mobilization and saving ~₹8.2 Cr in tendering costs.'
    },
    confidence: 0.94,
    assumptions: [
      'Topographical survey confirms 18 high-priority stream crossings require reinforced concrete box culverts',
      'Execution completed within 14-month pre-monsoon construction window',
      'Health department coordinates ambulance dispatch protocols upon causeway completion'
    ],
    needClusterId: 'clus-conn-01',
    createdAt: '2026-09-21T10:00:00Z'
  },

  // 2. Jalna Water & WASH Intervention
  {
    id: 'rec-002',
    title: 'Marathwada School WASH & Groundwater Salinity Mitigation Package',
    interventionType: 'Inter-Departmental Joint Scheme',
    region: 'Jalna, Maharashtra',
    district: 'Jalna',
    state: 'Maharashtra',
    estimatedCost: 46.0,
    affectedPopulation: 92000,
    expectedGapReduction: 38,
    rationale: 'Convergence of drinking water tanker rationing, pediatric enteric infections, and school dropouts among adolescent girls. Piped tap connection gap stands at 46% with recurring groundwater salinity.',
    evidence: {
      signalsCount: 18,
      infraGap: 'Piped water reliability gap 46%; enteric infection incidence 44% above standard',
      vulnerabilityHighlight: 'Drought-prone agro-climatic zone with high seasonal child migration',
      contributingDepartments: ['Jal Shakti & Water Supply', 'School Education', 'Health & Family Welfare'],
      keySignalQuotes: [
        'Amchya Jalna talukyat pinaychya panyacha tanker 12 divsatun ekdach yeto.',
        'Shale madhe toilet saathi pani nahiye, muli dupari gharat parat yetat.'
      ]
    },
    existingProjectOverlap: {
      projectId: 'proj-002',
      projectName: 'Jal Jeevan Mission Marathwada Grid Package IV',
      overlapLevel: 'PARTIAL OVERLAP',
      notes: 'Project 002 delivers bulk water to village outskirts. Secondary distribution to schools and clinics is unbudgeted.',
      recommendedAction: 'Integrate dedicated last-mile school WASH distribution spurs into Project 002 pipeline contracts.'
    },
    confidence: 0.91,
    assumptions: [
      'Jayakwadi reservoir allocations sustained during summer deficit periods',
      'School management committees operationalize maintenance of internal sanitation fixtures'
    ],
    needClusterId: 'clus-water-jalna',
    createdAt: '2026-09-20T14:30:00Z'
  },

  // 3. Silent Gap: Gadchiroli Maternal Healthcare & Power Microgrids
  {
    id: 'rec-003',
    title: 'Gadchiroli Silent Gap: Solar-Resilient Maternal Sub-Centers & All-Terrain Emergency Transit',
    interventionType: 'New Infrastructure',
    region: 'Gadchiroli, Maharashtra',
    district: 'Gadchiroli',
    state: 'Maharashtra',
    estimatedCost: 54.0,
    affectedPopulation: 114000,
    expectedGapReduction: 52,
    rationale: 'Identified as a Critical Silent Gap: Only 5 citizen complaints received despite extreme infrastructure gap (94/100) and institutional delivery deficit (63% gap). Digital participation index is just 18/100, creating an administrative blind spot.',
    evidence: {
      signalsCount: 5,
      infraGap: 'Institutional delivery facility access gap 63%; rural power availability gap 51%',
      vulnerabilityHighlight: 'Scheduled Tribe population exceeds 76%; dense forest terrain with high digital exclusion',
      contributingDepartments: ['Health & Family Welfare', 'Power & Renewable Energy', 'Rural Development'],
      keySignalQuotes: [
        'Vaidyakiy kendrat doctor mahinyatun fakt ekda yetat, gadhodar mahilana adchan.',
        'Bijapur basti me transformer jal gaya hai, 45 din se andhera hai.'
      ]
    },
    existingProjectOverlap: {
      projectId: 'proj-004',
      projectName: 'Gadchiroli Aspirational District Solar Micro-Grid & Forest Road Links',
      overlapLevel: 'PARTIAL OVERLAP',
      notes: 'Project 004 covers 85 forest schools but excludes 24 high-priority maternal health sub-centers.',
      recommendedAction: 'Augment Project 004 by earmarking dedicated lithium-ferro-phosphate backup packs for maternal emergency lighting and vaccine chillers.'
    },
    confidence: 0.93,
    assumptions: [
      'Medical personnel postings incentivized via tribal hardship allowances',
      'Satellite telemetry deployed for off-grid power health monitoring'
    ],
    needClusterId: 'clus-silent-gadchiroli',
    createdAt: '2026-09-22T09:15:00Z'
  },

  // 4. Barmer De-Fluoridation & Health Grid
  {
    id: 'rec-004',
    title: 'Barmer Deep-Aquifer De-Fluoridation & Community Health Surveillance Grid',
    interventionType: 'Capital Expansion',
    region: 'Barmer, Rajasthan',
    district: 'Barmer',
    state: 'Rajasthan',
    estimatedCost: 62.0,
    affectedPopulation: 76000,
    expectedGapReduction: 48,
    rationale: 'Endemic groundwater fluoride exceeding safe limits causes dental and skeletal deformities in children. Community filtration units have suffered high failure rates due to lack of operations and maintenance contracts.',
    evidence: {
      signalsCount: 16,
      infraGap: 'Potable water safety compliance gap is 67%',
      vulnerabilityHighlight: 'Hyper-arid desert terrain where tanker transit is economically prohibitive for poor households',
      contributingDepartments: ['Jal Shakti & Water Supply', 'Health & Family Welfare', 'Rural Development'],
      keySignalQuotes: ['Fluoride levels in groundwater exceed 4.2 mg/L causing fluorosis in school children.']
    },
    existingProjectOverlap: {
      projectId: 'proj-003',
      projectName: 'Barmer Deep Aquifer De-fluoridation & Water ATMs Initiative',
      overlapLevel: 'HIGH OVERLAP',
      notes: 'Planned Project 003 addresses community RO ATMs in 110 villages but lacks operations & maintenance warranty terms.',
      recommendedAction: 'Combine capital procurement with 10-year performance-linked service level agreements to prevent equipment idling.'
    },
    confidence: 0.95,
    assumptions: [
      'Canal water surface transmission arrives within the next 36 months as long-term substitute',
      'Community solar pumps power RO units with minimal grid dependency'
    ],
    needClusterId: 'clus-water-barmer',
    createdAt: '2026-09-18T16:00:00Z'
  },

  // 5. Silent Gap: Araria Border Public Services & Diagnostic Cold Chains
  {
    id: 'rec-005',
    title: 'Araria Border Silent Gap: Rapid Vector Diagnostics & Satellite PDS Connectivity Hubs',
    interventionType: 'Service Augmentation',
    region: 'Araria, Bihar',
    district: 'Araria',
    state: 'Bihar',
    estimatedCost: 32.0,
    affectedPopulation: 135000,
    expectedGapReduction: 44,
    rationale: 'Critical Silent Gap: Border block with 2.8 million population and only 21/100 digital participation. High Kala-Azar recurrence compounded by biometric ration distribution dropouts due to fiber cuts.',
    evidence: {
      signalsCount: 4,
      infraGap: 'Vector disease rapid diagnostic availability gap 54%; broadband GP reach gap 58%',
      vulnerabilityHighlight: 'Flood-prone alluvial plains with extensive landless agricultural labor population',
      contributingDepartments: ['Health & Family Welfare', 'Rural Development', 'Electronics & IT'],
      keySignalQuotes: [
        'Kala-azar dawai aur malaria screening gaon me uplabdh nahi hai.',
        'Panchayat bhawan par internet bilkul nahi chalta, ration card update ke liye 25 km jana padta hai.'
      ]
    },
    existingProjectOverlap: {
      projectId: 'proj-005',
      projectName: 'Kosi Basin Flood Protection Project',
      overlapLevel: 'NO OVERLAP',
      notes: 'Existing project focuses entirely on civil embankment works and does not address public health or telecommunications.',
      recommendedAction: 'Proceed with standalone inter-departmental allocation for satellite VSAT emergency backup and clinic stocking.'
    },
    confidence: 0.89,
    assumptions: [
      'Kala-azar elimination protocol compliant with National Vector Borne Disease Control guidelines',
      'Hybrid satellite-cellular failover modems installed at remote Panchayat Bhawans'
    ],
    needClusterId: 'clus-silent-araria',
    createdAt: '2026-09-19T11:20:00Z'
  },

  // 6. Thiruvallur Peri-Urban Drainage Interceptor
  {
    id: 'rec-006',
    title: 'Thiruvallur Peri-Urban Lake Wetland Rehabilitation & Effluent Separation',
    interventionType: 'Inter-Departmental Joint Scheme',
    region: 'Thiruvallur, Tamil Nadu',
    district: 'Thiruvallur',
    state: 'Tamil Nadu',
    estimatedCost: 41.0,
    affectedPopulation: 83000,
    expectedGapReduction: 35,
    rationale: 'Cross-departmental collision: Untreated runoff causes urban waterlogging, destroys traditional lake aquaculture, and increases dengue vector breeding.',
    evidence: {
      signalsCount: 15,
      infraGap: 'Stormwater drain density gap 38%; water quality standards breach in 6 peri-urban water bodies',
      vulnerabilityHighlight: 'Dense informal settlements along low-lying catchment perimeters',
      contributingDepartments: ['Municipal Administration', 'Jal Shakti & Water Supply', 'Health & Family Welfare'],
      keySignalQuotes: ['Untreated sewage run-off into lake has caused large fish kills in Thiruvallur catchment.']
    },
    existingProjectOverlap: {
      projectId: 'proj-006',
      projectName: 'Chennai Metropolitan Fringe Stormwater Basin Drain Interceptor',
      overlapLevel: 'PARTIAL OVERLAP',
      notes: 'Project 006 constructs trunk stormwater conduits but leaves wetland bio-remediation unaddressed.',
      recommendedAction: 'Incorporate decentralized constructed wetlands at 4 outfalls to naturally treat biological oxygen demand before lake discharge.'
    },
    confidence: 0.92,
    assumptions: [
      'Pollution Control Board enforces industrial CETP pretreatment standards strictly',
      'Stormwater diversion channels maintained free of municipal solid waste dumping'
    ],
    needClusterId: 'clus-drain-thiruvallur',
    createdAt: '2026-09-17T15:45:00Z'
  },

  // 7. Raichur Tail-end Solar Lift & PHC Power Resilience
  {
    id: 'rec-007',
    title: 'Raichur Tail-End Solar Micro-Lift Irrigation & PHC Vaccine Cold-Chain Security',
    interventionType: 'Capital Expansion',
    region: 'Raichur, Karnataka',
    district: 'Raichur',
    state: 'Karnataka',
    estimatedCost: 29.5,
    affectedPopulation: 58000,
    expectedGapReduction: 40,
    rationale: 'Low voltage and unannounced outages cripple tail-end farmers while compromising heat-sensitive childhood vaccine stocks at local primary health clinics.',
    evidence: {
      signalsCount: 12,
      infraGap: 'Canal tail-end flow gap 42%; cold-chain power uptime gap 51%',
      vulnerabilityHighlight: 'Dryland agricultural zone susceptible to recurring drought stress',
      contributingDepartments: ['Agriculture & Farmers Welfare', 'Power & Renewable Energy', 'Health & Family Welfare'],
      keySignalQuotes: ['Graamada primary arogya kendradalli vidyuth illa, vaccine fridge kelasa maaduttilla.']
    },
    existingProjectOverlap: {
      projectId: 'proj-007',
      projectName: 'Tungabhadra-Krishna Command Micro-Irrigation Solarization Phase II',
      overlapLevel: 'PARTIAL OVERLAP',
      notes: 'Project 007 distributes individual farm solar pumps; primary health centres have no institutional link.',
      recommendedAction: 'Expand Project 007 budget envelope by 15% to include micro-solar rooftop installations on 32 primary rural clinics.'
    },
    confidence: 0.90,
    assumptions: [
      'Solar panels fitted with remote monitoring and anti-theft sensors',
      'Farmer water user associations maintain shared canal distribution sumps'
    ],
    needClusterId: 'clus-irrig-raichur',
    createdAt: '2026-09-16T12:00:00Z'
  },

  // 8. Sundarbans Climate-Resilient Bund Reinforcement
  {
    id: 'rec-008',
    title: 'Sundarbans Estuary Geotextile Embankment Armoring & Desalination Ponds',
    interventionType: 'New Infrastructure',
    region: 'South 24 Parganas, West Bengal',
    district: 'South 24 Parganas',
    state: 'West Bengal',
    estimatedCost: 78.0,
    affectedPopulation: 145000,
    expectedGapReduction: 55,
    rationale: 'Tidal surges breach earthen levees, destroying crops and salinizing freshwater drinking supplies across delta islands.',
    evidence: {
      signalsCount: 14,
      infraGap: 'Embankment resilience score has a 57% deficit below safe engineering standard',
      vulnerabilityHighlight: 'Extreme climate vulnerability with high exposure to Bay of Bengal cyclonic systems',
      contributingDepartments: ['Water Resources & Flood Control', 'Jal Shakti & Water Supply', 'Disaster Management'],
      keySignalQuotes: ['Freshwater ponds and potable tube-wells ruined due to saline ingress.']
    },
    existingProjectOverlap: {
      projectId: 'proj-008',
      projectName: 'Sundarbans Estuary Climate-Resilient Mangrove & Embankment Armor',
      overlapLevel: 'PARTIAL OVERLAP',
      notes: 'Project 008 covers Gosaba and Basanti islands. 4 adjoining estuarine blocks remain unprotected.',
      recommendedAction: 'Extend the engineering design and concessionaire scope to incorporate Patharpratima and Kultali blocks.'
    },
    confidence: 0.96,
    assumptions: [
      'Mangrove bio-shield strip width maintained at minimum 50 meters seaward',
      'Solar micro-desalination kiosks installed on raised disaster shelter plinths'
    ],
    needClusterId: 'clus-flood-sundarbans',
    createdAt: '2026-09-15T18:10:00Z'
  },

  // 9. Kalahandi Highland Stream Bridges & Mobile Health Reach
  {
    id: 'rec-009',
    title: 'Kalahandi Highland Stream Bridges & All-Terrain Ambulatory Linkages',
    interventionType: 'Capital Expansion',
    region: 'Kalahandi, Odisha',
    district: 'Kalahandi',
    state: 'Odisha',
    estimatedCost: 35.0,
    affectedPopulation: 46000,
    expectedGapReduction: 46,
    rationale: 'Torrential mountain streams sever 42 tribal hamlets during rains, denying students school access and triggering avoidable maternal deaths.',
    evidence: {
      signalsCount: 11,
      infraGap: 'All-weather culvert coverage deficit is 50%',
      vulnerabilityHighlight: 'Vulnerable Tribal Groups (PVTGs) living in isolated hill topography',
      contributingDepartments: ['Road Transport & Highways', 'School Education', 'Health & Family Welfare'],
      keySignalQuotes: ['In Thuamul Rampur block, students walk 10 km through deep forest due to absence of bridge.']
    },
    existingProjectOverlap: {
      projectId: 'proj-009',
      projectName: 'Biju Setu Yojana Highland Stream Culverts Package 7',
      overlapLevel: 'HIGH OVERLAP',
      notes: 'Project 009 plans 6 bridge structures in the block but implementation has stalled due to forest clearances.',
      recommendedAction: 'Fast-track environmental clearances and add pre-fabricated modular steel girder bridges to speed up execution by 9 months.'
    },
    confidence: 0.93,
    assumptions: [
      'Modular bridge components deliverable via narrow forest hill corridors',
      'Forest department clearances granted under standard public infrastructure exemptions'
    ],
    needClusterId: 'clus-bridge-kalahandi',
    createdAt: '2026-09-14T09:30:00Z'
  },

  // 10. Sonbhadra Industrial Ash Seepage Containment & Health Clinics
  {
    id: 'rec-010',
    title: 'Sonbhadra Fly-Ash Dykes Zero-Discharge Containment & Silicosis Care Center',
    interventionType: 'Inter-Departmental Joint Scheme',
    region: 'Sonbhadra, Uttar Pradesh',
    district: 'Sonbhadra',
    state: 'Uttar Pradesh',
    estimatedCost: 85.0,
    affectedPopulation: 112000,
    expectedGapReduction: 50,
    rationale: 'Toxic fly-ash slurry contaminates drinking canal water and mining dust causes widespread chronic obstructive pulmonary disease among worker settlements.',
    evidence: {
      signalsCount: 17,
      infraGap: 'Industrial effluent containment compliance gap 64%; respiratory clinic access gap 50%',
      vulnerabilityHighlight: 'Heavy industrial concentration with low health insurance penetration among contract laborers',
      contributingDepartments: ['Jal Shakti & Water Supply', 'Health & Family Welfare', 'Environment & Climate Change'],
      keySignalQuotes: ['Fly-ash dyke seepage is polluting primary drinking water canal in Sonbhadra.']
    },
    existingProjectOverlap: {
      projectId: 'proj-010',
      projectName: 'Sonbhadra Industrial Effluent Zero Liquid Discharge Mandate',
      overlapLevel: 'HIGH OVERLAP',
      notes: 'Planned Project 010 mandates plant-level compliance but does not establish remedial healthcare clinics for exposed citizens.',
      recommendedAction: 'Couple plant-level zero liquid discharge enforcement with an employer-supported district occupational health trust.'
    },
    confidence: 0.94,
    assumptions: [
      'Continuous online effluent monitoring system (CEMS) integrated into state regulatory portal',
      'Dedicated specialized pulmonologists posted to Singrauli-Sonbhadra regional clinic'
    ],
    needClusterId: 'clus-ash-sonbhadra',
    createdAt: '2026-09-13T17:25:00Z'
  }
];

export const SEEDED_OUTCOMES: Outcome[] = [
  {
    projectId: 'proj-014',
    projectName: 'Gurupriya Bridge Peripheral Road Network Upgradation',
    region: 'Malkangiri, Odisha',
    baselineScore: 21,
    currentScore: 78,
    citizenSatisfaction: 89,
    serviceAccessibility: 84,
    completionPercent: 100,
    measuredAt: '2026-06-30',
    keyMetric: 'Travel time to district headquarters reduced from 14 hours by boat to 45 minutes by motorized road.',
    citizenFeedbackSample: 'Prior to the bridge, crossing the reservoir during monsoon took an entire day; now ambulances reach within an hour.'
  },
  {
    projectId: 'proj-006',
    projectName: 'Chennai Metropolitan Fringe Stormwater Basin Drain Interceptor',
    region: 'Thiruvallur, Tamil Nadu',
    baselineScore: 47,
    currentScore: 68,
    citizenSatisfaction: 72,
    serviceAccessibility: 76,
    completionPercent: 70,
    measuredAt: '2026-07-15',
    keyMetric: 'Waterlogging clearance time after 100mm rainfall reduced from 72 hours to 8 hours.',
    citizenFeedbackSample: 'Dengue hospitalizations in the slum belt decreased by 40% following channel desiltation.'
  },
  {
    projectId: 'proj-001',
    projectName: 'Mandla-Niwas-Shahpura Highway Widening & Bridge Modernization Scheme',
    region: 'Mandla, Madhya Pradesh',
    baselineScore: 42,
    currentScore: 61,
    citizenSatisfaction: 64,
    serviceAccessibility: 58,
    completionPercent: 48,
    measuredAt: '2026-08-01',
    keyMetric: 'Trunk corridor transit speed doubled; however rural feeder culvert complaints remain high.',
    citizenFeedbackSample: 'Main road is smooth, but we still cannot cross the overflowing nala from our hamlet Bichhiya.'
  },
  {
    projectId: 'proj-002',
    projectName: 'Jal Jeevan Mission Marathwada Grid Package IV',
    region: 'Jalna, Maharashtra',
    baselineScore: 39,
    currentScore: 59,
    citizenSatisfaction: 67,
    serviceAccessibility: 63,
    completionPercent: 62,
    measuredAt: '2026-08-20',
    keyMetric: 'Bulk water supply initiated in 45 villages, reducing emergency tanker dispatches by 35%.',
    citizenFeedbackSample: 'Public taps have water every three days now, a major relief compared to last summer.'
  },
  {
    projectId: 'proj-011',
    projectName: 'Sehore Agro-Logistics Cluster & Farmgate Pre-Cooling Hubs',
    region: 'Sehore, Madhya Pradesh',
    baselineScore: 45,
    currentScore: 71,
    citizenSatisfaction: 81,
    serviceAccessibility: 79,
    completionPercent: 65,
    measuredAt: '2026-07-30',
    keyMetric: 'Post-harvest vegetable spoilages down by 28% for participating farmer producer organizations.',
    citizenFeedbackSample: 'We stored 150 crates of tomatoes during the harvest glut instead of dumping them at rock-bottom prices.'
  },
  {
    projectId: 'proj-007',
    projectName: 'Tungabhadra-Krishna Command Micro-Irrigation Solarization Phase II',
    region: 'Raichur, Karnataka',
    baselineScore: 38,
    currentScore: 56,
    citizenSatisfaction: 73,
    serviceAccessibility: 66,
    completionPercent: 44,
    measuredAt: '2026-08-10',
    keyMetric: '850 tail-end smallholders now receive daytime solar irrigation independently of grid power cuts.',
    citizenFeedbackSample: 'Our cotton crop was saved because the solar pump runs quietly through the day without voltage fluctuations.'
  },
  {
    projectId: 'proj-008',
    projectName: 'Sundarbans Estuary Climate-Resilient Mangrove & Embankment Armor',
    region: 'South 24 Parganas, West Bengal',
    baselineScore: 33,
    currentScore: 58,
    citizenSatisfaction: 77,
    serviceAccessibility: 69,
    completionPercent: 58,
    measuredAt: '2026-07-22',
    keyMetric: 'Zero embankment breaches recorded during spring high-tide season in armored pilot sectors.',
    citizenFeedbackSample: 'The geotextile slope held strong during the last cyclonic depression; village pond did not salinize.'
  },
  {
    projectId: 'proj-012',
    projectName: 'Thar Desert Renewable Transmission Corridor Phase 3',
    region: 'Jaisalmer, Rajasthan',
    baselineScore: 37,
    currentScore: 74,
    citizenSatisfaction: 70,
    serviceAccessibility: 78,
    completionPercent: 78,
    measuredAt: '2026-08-18',
    keyMetric: 'Evacuating 5.2 GW of clean renewable energy; rural feeder voltage stabilization in adjacent tehsils.',
    citizenFeedbackSample: 'Transmission grid expansion stabilized village voltage so wheat flour mills can operate steadily.'
  }
];
