import {
  CitizenSignal,
  DemographicIndicator,
  InfrastructureIndicator,
  NeedCluster,
  NeedConvergenceGroup,
  Outcome,
  Project,
  Recommendation,
  SilentGapItem,
  SimulationResult
} from '../../src/types.js';
import { SEEDED_CLUSTERS } from './clusters.js';
import { SEEDED_DEMOGRAPHICS, SEEDED_INFRASTRUCTURE } from './indicators.js';
import { SEEDED_OUTCOMES, SEEDED_PROJECTS, SEEDED_RECOMMENDATIONS } from './projects.js';
import { SEEDED_SIGNALS } from './signals.js';

// In-Memory Mutable State
class DataRepository {
  signals: CitizenSignal[] = [];
  clusters: NeedCluster[] = [];
  infrastructure: InfrastructureIndicator[] = [];
  demographics: DemographicIndicator[] = [];
  projects: Project[] = [];
  recommendations: Recommendation[] = [];
  outcomes: Outcome[] = [];

  constructor() {
    this.reset();
  }

  reset() {
    this.signals = JSON.parse(JSON.stringify(SEEDED_SIGNALS));
    this.clusters = JSON.parse(JSON.stringify(SEEDED_CLUSTERS));
    this.infrastructure = JSON.parse(JSON.stringify(SEEDED_INFRASTRUCTURE));
    this.demographics = JSON.parse(JSON.stringify(SEEDED_DEMOGRAPHICS));
    this.projects = JSON.parse(JSON.stringify(SEEDED_PROJECTS));
    this.recommendations = JSON.parse(JSON.stringify(SEEDED_RECOMMENDATIONS));
    this.outcomes = JSON.parse(JSON.stringify(SEEDED_OUTCOMES));
  }

  getSilentGaps(): SilentGapItem[] {
    const items: SilentGapItem[] = [];

    // Evaluate each demographic region against its infrastructure indicators & citizen signals
    for (const demo of this.demographics) {
      const regionSignals = this.signals.filter(
        (s) => s.district.toLowerCase() === demo.district.toLowerCase()
      );
      const signalCount = regionSignals.length;

      const regionInfra = this.infrastructure.filter(
        (i) => i.district.toLowerCase() === demo.district.toLowerCase()
      );

      for (const infra of regionInfra) {
        // High infrastructure gap + High population impact + Low digital participation = Silent Gap
        // Silent Gap Score: weighted formula
        const infraGapFactor = (infra.gap / 100) * 45; // up to 45
        const vulnFactor = (demo.vulnerabilityIndex / 100) * 35; // up to 35
        const silenceFactor = ((100 - demo.digitalParticipationIndex) / 100) * 20; // up to 20
        const totalScore = Math.min(100, Math.round(infraGapFactor + vulnFactor + silenceFactor));

        // Signal penalty: if signals are unusually high, it's not a silent gap (it's an expressed loud gap)
        const adjustedScore = signalCount < 10 ? totalScore : Math.max(20, totalScore - (signalCount - 10) * 3);

        let level: SilentGapItem['level'] = 'Moderate Silent Gap';
        if (adjustedScore >= 75) level = 'Critical Silent Gap';
        else if (adjustedScore >= 55) level = 'High Silent Gap';

        if (adjustedScore >= 50) {
          items.push({
            id: `sg-${demo.district.toLowerCase()}-${infra.id}`,
            region: demo.region,
            district: demo.district,
            state: demo.state,
            category: infra.category,
            citizenSignalsCount: signalCount,
            infrastructureScore: infra.currentScore,
            benchmarkScore: infra.benchmark,
            infrastructureGap: infra.gap,
            affectedPopulation: demo.population,
            digitalParticipationIndex: demo.digitalParticipationIndex,
            vulnerabilityIndex: demo.vulnerabilityIndex,
            silentGapScore: adjustedScore,
            level,
            whyFlagged: `High infrastructure gap (${infra.gap} pts below benchmark) coupled with severe digital exclusion (participation score ${demo.digitalParticipationIndex}/100) and low reporting volume (${signalCount} signals for ${demo.population.toLocaleString()} citizens).`,
            recommendedAction: `Deploy active field enumeration teams (Gram Sabha surveys / ASHA worker intake) rather than waiting for passive digital complaints.`,
            confidence: Number((0.88 + (adjustedScore % 10) * 0.01).toFixed(2))
          });
        }
      }
    }

    return items.sort((a, b) => b.silentGapScore - a.silentGapScore);
  }

  getConvergenceGroups(): NeedConvergenceGroup[] {
    return [
      {
        id: 'conv-001',
        title: 'Monsoon Stream Causeway Breach Cross-Sector Blockade',
        rootCause: 'Unpaved link roads and washed-away drainage causeways cut off all vehicular access during rain.',
        region: 'Mandla & Dindori, Madhya Pradesh',
        departments: [
          'Road Transport & Highways',
          'Health & Family Welfare',
          'School Education',
          'Agriculture & Farmers Welfare'
        ],
        categories: ['Roads & Connectivity', 'Healthcare', 'School Education', 'Irrigation & Agriculture'],
        symptoms: [
          {
            department: 'Health & Family Welfare',
            complaintTheme: 'Emergency ambulance delays and non-attendance of sub-centre nurses',
            signalCount: 8,
            sampleQuote: 'Ambulance nahi aa pati, 4 ghante nala utarne ka intezar karna padta hai.'
          },
          {
            department: 'School Education',
            complaintTheme: 'School bus halt and student absenteeism for 3 consecutive months',
            signalCount: 6,
            sampleQuote: 'Bachhe school nahi ja pate kyunki pul par pani beh raha hai.'
          },
          {
            department: 'Agriculture & Farmers Welfare',
            complaintTheme: 'Perishable produce rotting due to blocked access to APMC mandi',
            signalCount: 5,
            sampleQuote: 'Tamatar aur sabzi mandi tak nahi le ja pa rahe, rasta band hone se fasal khet mein hi sad rahi hai.'
          },
          {
            department: 'Road Transport & Highways',
            complaintTheme: 'Potholes, collapsed road shoulder, and washed-away culverts',
            signalCount: 7,
            sampleQuote: 'Samnapur block me bus service band hai pichhle 2 hafte se kharab sadak ke karan.'
          }
        ],
        totalSignals: 26,
        affectedPopulation: 81600,
        opportunitySummary: 'Instead of treating this as 4 isolated department grievances, construct 18 reinforced box culverts and all-weather pavement under a joint convergence mission.'
      },
      {
        id: 'conv-002',
        title: 'Deep-Aquifer Drought & WASH Deficit',
        rootCause: 'Depleted groundwater table and mineral salinity in deep borewells.',
        region: 'Jalna, Maharashtra',
        departments: ['Jal Shakti & Water Supply', 'Health & Family Welfare', 'School Education'],
        categories: ['Water & Sanitation', 'Healthcare', 'School Education'],
        symptoms: [
          {
            department: 'Jal Shakti & Water Supply',
            complaintTheme: 'Tanker rationing and dry public standposts',
            signalCount: 9,
            sampleQuote: 'Pinaychya panyacha tanker 12 divsatun ekdach yeto.'
          },
          {
            department: 'Health & Family Welfare',
            complaintTheme: 'Pediatric diarrheal outbreaks from untreated well water',
            signalCount: 6,
            sampleQuote: 'Lahan mulana potache ajar hot ahet pani kharpat jhalya mule.'
          },
          {
            department: 'School Education',
            complaintTheme: 'Girls missing school due to non-functional dry toilets',
            signalCount: 5,
            sampleQuote: 'Shale madhe toilet saathi pani nahiye, muli dupari gharat parat yetat.'
          }
        ],
        totalSignals: 20,
        affectedPopulation: 92000,
        opportunitySummary: 'Synchronize bulk pipeline delivery from Jayakwadi reservoir with dedicated school WASH connections and localized de-fluoridation filters.'
      },
      {
        id: 'conv-003',
        title: 'Peri-Urban Industrial Wetland Pollution & Drainage Choke',
        rootCause: 'Uncontrolled industrial runoff entering unlined municipal drainage networks and natural flood retention lakes.',
        region: 'Thiruvallur, Tamil Nadu',
        departments: ['Municipal Administration', 'Jal Shakti & Water Supply', 'Health & Family Welfare'],
        categories: ['Public Housing & Drainage', 'Water & Sanitation', 'Healthcare'],
        symptoms: [
          {
            department: 'Public Housing & Drainage',
            complaintTheme: 'Monsoon street waterlogging and backflow into slums',
            signalCount: 7,
            sampleQuote: 'Mazhai kaalathil drainage thiranthu kidakirathu.'
          },
          {
            department: 'Health & Family Welfare',
            complaintTheme: 'Dengue vector multiplication and skin dermatoses',
            signalCount: 5,
            sampleQuote: 'Kozhandhaigalukku dengu varugiradhu open drain-naala.'
          },
          {
            department: 'Jal Shakti & Water Supply',
            complaintTheme: 'Lake water discoloration and loss of fish livelihood',
            signalCount: 6,
            sampleQuote: 'Sewage pollution kaaranam aeriyil meen irandhadhu.'
          }
        ],
        totalSignals: 18,
        affectedPopulation: 83000,
        opportunitySummary: 'Develop an integrated stormwater interception canal with decentralized bio-remediation wetlands before lake discharge.'
      }
    ];
  }

  simulateBudget(params: {
    budget: number;
    region?: string;
    priorityCategory?: string;
    minimumPopulation?: number;
    preference?: 'all' | 'rural' | 'high-gap';
  }): SimulationResult {
    const budget = params.budget;
    let pool = [...this.recommendations];

    if (params.region && params.region !== 'All Regions') {
      pool = pool.filter((r) => r.region.toLowerCase().includes(params.region!.toLowerCase()) || r.state.toLowerCase().includes(params.region!.toLowerCase()));
    }

    if (params.priorityCategory && params.priorityCategory !== 'All Categories') {
      pool = pool.filter((r) => {
        const cluster = this.clusters.find((c) => c.id === r.needClusterId);
        return cluster?.categories.includes(params.priorityCategory as any);
      });
    }

    // Sort by cost-effectiveness: (affectedPopulation * expectedGapReduction) / estimatedCost
    pool.sort((a, b) => {
      const scoreA = (a.affectedPopulation * a.expectedGapReduction) / (a.estimatedCost || 1);
      const scoreB = (b.affectedPopulation * b.expectedGapReduction) / (b.estimatedCost || 1);
      return scoreB - scoreA;
    });

    let currentCost = 0;
    const selected: SimulationResult['selectedProjects'] = [];
    const regionsCovered = new Set<string>();

    for (const rec of pool) {
      if (currentCost + rec.estimatedCost <= budget) {
        currentCost += rec.estimatedCost;
        regionsCovered.add(rec.region);
        selected.push({
          id: rec.id,
          title: rec.title,
          region: rec.region,
          cost: rec.estimatedCost,
          affectedPopulation: rec.affectedPopulation,
          gapReduction: rec.expectedGapReduction,
          category: rec.interventionType,
          interventionType: rec.interventionType
        });
      }
    }

    const unselected = pool.filter((p) => !selected.some((s) => s.id === p.id));
    const unresolvedCost = unselected.reduce((acc, curr) => acc + curr.estimatedCost, 0);
    const unresolvedPop = unselected.reduce((acc, curr) => acc + curr.affectedPopulation, 0);

    const totalPop = selected.reduce((acc, curr) => acc + curr.affectedPopulation, 0);
    const avgGap = selected.length > 0 ? Math.round(selected.reduce((acc, curr) => acc + curr.gapReduction, 0) / selected.length) : 0;

    // Category breakdown
    const catMap: Record<string, number> = {};
    for (const s of selected) {
      catMap[s.category] = (catMap[s.category] || 0) + s.cost;
    }
    const categoryBreakdown = Object.entries(catMap).map(([category, amount]) => ({
      category,
      amount: Number(amount.toFixed(1)),
      percentage: Math.round((amount / (currentCost || 1)) * 100)
    }));

    return {
      budget,
      allocatedCost: Number(currentCost.toFixed(1)),
      remainingBudget: Number((budget - currentCost).toFixed(1)),
      selectedProjects: selected,
      totalPopulationReached: totalPop,
      averageGapReduction: avgGap,
      unresolvedNeedCost: Number(unresolvedCost.toFixed(1)),
      unresolvedNeedPopulation: unresolvedPop,
      regionsCovered: Array.from(regionsCovered),
      categoryBreakdown,
      assumptions: [
        'Assumes uniform procurement efficiency across selected state departments',
        'Prioritizes high impact-per-crore interventions with pre-existing spatial clustering',
        'Illustrative allocation model designed for hackathon planning decision simulation'
      ]
    };
  }
}

export const repository = new DataRepository();
