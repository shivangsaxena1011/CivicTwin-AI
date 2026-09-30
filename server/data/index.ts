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
const DISTRICT_COORDS: Record<string, { lat: number; lng: number; state: string; defaultClusterId: string }> = {
  'mandla': { lat: 22.60, lng: 80.38, state: 'Madhya Pradesh', defaultClusterId: 'clus-conn-01' },
  'dindori': { lat: 22.95, lng: 81.08, state: 'Madhya Pradesh', defaultClusterId: 'clus-conn-01' },
  'sehore': { lat: 23.20, lng: 77.08, state: 'Madhya Pradesh', defaultClusterId: 'clus-sehore-grain' },
  'shahdol': { lat: 23.28, lng: 81.35, state: 'Madhya Pradesh', defaultClusterId: 'clus-forest-shahdol' },
  'tikamgarh': { lat: 24.74, lng: 78.83, state: 'Madhya Pradesh', defaultClusterId: 'clus-bundelkhand-tank' },
  'jalna': { lat: 19.84, lng: 75.88, state: 'Maharashtra', defaultClusterId: 'clus-water-jalna' },
  'gadchiroli': { lat: 20.18, lng: 80.00, state: 'Maharashtra', defaultClusterId: 'clus-silent-gadchiroli' },
  'nandurbar': { lat: 21.37, lng: 74.24, state: 'Maharashtra', defaultClusterId: 'clus-silent-nandurbar' },
  'nashik': { lat: 19.99, lng: 73.78, state: 'Maharashtra', defaultClusterId: 'clus-water-jalna' },
  'yavatmal': { lat: 20.39, lng: 78.13, state: 'Maharashtra', defaultClusterId: 'clus-silent-gadchiroli' },
  'pune': { lat: 18.52, lng: 73.85, state: 'Maharashtra', defaultClusterId: 'clus-water-jalna' },
  'mumbai': { lat: 19.07, lng: 72.87, state: 'Maharashtra', defaultClusterId: 'clus-water-jalna' },
  'barmer': { lat: 25.75, lng: 71.40, state: 'Rajasthan', defaultClusterId: 'clus-water-barmer' },
  'jaisalmer': { lat: 26.91, lng: 70.92, state: 'Rajasthan', defaultClusterId: 'clus-desert-power' },
  'jhunjhunu': { lat: 28.13, lng: 75.40, state: 'Rajasthan', defaultClusterId: 'clus-water-barmer' },
  'jaipur': { lat: 26.91, lng: 75.78, state: 'Rajasthan', defaultClusterId: 'clus-water-barmer' },
  'araria': { lat: 26.15, lng: 87.51, state: 'Bihar', defaultClusterId: 'clus-silent-araria' },
  'darbhanga': { lat: 26.15, lng: 85.90, state: 'Bihar', defaultClusterId: 'clus-silent-araria' },
  'saharsa': { lat: 25.88, lng: 86.60, state: 'Bihar', defaultClusterId: 'clus-silent-araria' },
  'patna': { lat: 25.60, lng: 85.13, state: 'Bihar', defaultClusterId: 'clus-silent-araria' },
  'thiruvallur': { lat: 13.14, lng: 79.91, state: 'Tamil Nadu', defaultClusterId: 'clus-drain-thiruvallur' },
  'madurai': { lat: 9.92, lng: 78.11, state: 'Tamil Nadu', defaultClusterId: 'clus-drain-thiruvallur' },
  'chennai': { lat: 13.08, lng: 80.27, state: 'Tamil Nadu', defaultClusterId: 'clus-drain-thiruvallur' },
  'raichur': { lat: 16.21, lng: 77.35, state: 'Karnataka', defaultClusterId: 'clus-irrig-raichur' },
  'uttara kannada': { lat: 14.80, lng: 74.13, state: 'Karnataka', defaultClusterId: 'clus-irrig-raichur' },
  'chikkaballapur': { lat: 13.43, lng: 77.72, state: 'Karnataka', defaultClusterId: 'clus-irrig-raichur' },
  'bengaluru': { lat: 12.97, lng: 77.59, state: 'Karnataka', defaultClusterId: 'clus-irrig-raichur' },
  'kalahandi': { lat: 19.91, lng: 83.11, state: 'Odisha', defaultClusterId: 'clus-bridge-kalahandi' },
  'malkangiri': { lat: 18.35, lng: 81.89, state: 'Odisha', defaultClusterId: 'clus-silent-malkangiri' },
  'mayurbhanj': { lat: 21.93, lng: 86.73, state: 'Odisha', defaultClusterId: 'clus-silent-malkangiri' },
  'sonbhadra': { lat: 24.68, lng: 82.98, state: 'Uttar Pradesh', defaultClusterId: 'clus-ash-sonbhadra' },
  'lakhimpur kheri': { lat: 27.94, lng: 80.78, state: 'Uttar Pradesh', defaultClusterId: 'clus-ash-sonbhadra' },
  'lucknow': { lat: 26.84, lng: 80.94, state: 'Uttar Pradesh', defaultClusterId: 'clus-ash-sonbhadra' },
  'south 24 parganas': { lat: 22.18, lng: 88.54, state: 'West Bengal', defaultClusterId: 'clus-flood-sundarbans' },
  'kolkata': { lat: 22.57, lng: 88.36, state: 'West Bengal', defaultClusterId: 'clus-flood-sundarbans' }
};

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

  assignSignalToCluster(input: {
    district?: string;
    state?: string;
    category?: string;
    text?: string;
  }): {
    clusterId: string;
    latitude: number;
    longitude: number;
    resolvedDistrict: string;
    resolvedState: string;
  } {
    const rawDist = (input.district || '').trim().toLowerCase();
    const rawState = (input.state || '').trim();

    // 1. Check direct coordinates & cluster mapping
    let matchedCoord = rawDist ? DISTRICT_COORDS[rawDist] : undefined;
    let resolvedDistrict = input.district?.trim() || 'General';
    let resolvedState = rawState || (matchedCoord ? matchedCoord.state : 'National');

    // If district not recognized, try finding mentioned district in text
    if (!matchedCoord && input.text) {
      const lowerText = input.text.toLowerCase();
      for (const [dKey, meta] of Object.entries(DISTRICT_COORDS)) {
        if (lowerText.includes(dKey)) {
          matchedCoord = meta;
          resolvedDistrict = dKey.charAt(0).toUpperCase() + dKey.slice(1);
          resolvedState = meta.state;
          break;
        }
      }
    }

    // If state still unresolved, try to infer from known cluster locations matching district
    if ((!resolvedState || resolvedState === 'National') && resolvedDistrict) {
      for (const c of this.clusters) {
        const foundLoc = c.locations.find(
          (l) => l.district.toLowerCase() === resolvedDistrict.toLowerCase()
        );
        if (foundLoc) {
          resolvedState = foundLoc.state;
          break;
        }
      }
    }

    let clusterId = matchedCoord ? matchedCoord.defaultClusterId : 'clus-conn-01';
    let baseLat = matchedCoord ? matchedCoord.lat : 20.5937;
    let baseLng = matchedCoord ? matchedCoord.lng : 78.9629;

    // 2. Cross-reference with existing clusters for best thematic match
    const categoryClusters = this.clusters.filter((c) =>
      input.category ? c.categories.includes(input.category as any) : true
    );

    // Look for a cluster in the same district and sector
    const districtCluster = categoryClusters.find((c) =>
      c.locations.some((l) => l.district.toLowerCase() === resolvedDistrict.toLowerCase())
    );

    if (districtCluster) {
      clusterId = districtCluster.id;
      // Inherit coordinates if not directly in DISTRICT_COORDS
      if (!matchedCoord && districtCluster.locations.length > 0) {
        const dMatch = DISTRICT_COORDS[districtCluster.locations[0].district.toLowerCase()];
        if (dMatch) {
          baseLat = dMatch.lat;
          baseLng = dMatch.lng;
        }
      }
    } else {
      // Find cluster in same state
      const stateCluster = categoryClusters.find((c) =>
        c.locations.some((l) => l.state.toLowerCase() === resolvedState.toLowerCase())
      );
      if (stateCluster) {
        clusterId = stateCluster.id;
      } else if (categoryClusters.length > 0) {
        // Fallback to first cluster matching the issue category
        clusterId = categoryClusters[0].id;
      }
    }

    // 3. Increment the assigned cluster's signalCount
    const targetCluster = this.clusters.find((c) => c.id === clusterId);
    if (targetCluster) {
      targetCluster.signalCount = (targetCluster.signalCount || 0) + 1;
    }

    // Slightly jitter coordinates so multiple signals don't land on identical pixel
    const latitude = Number((baseLat + (Math.random() - 0.5) * 0.04).toFixed(4));
    const longitude = Number((baseLng + (Math.random() - 0.5) * 0.04).toFixed(4));

    return {
      clusterId,
      latitude,
      longitude,
      resolvedDistrict,
      resolvedState
    };
  }

  retrieveEvidenceForQuery(query: string) {
    const q = query.toLowerCase();
    const tokens = q.split(/\s+/).filter((t) => t.length > 2);

    // Detect numeric budget queries (e.g. 500, 250, 100, 1000)
    let budgetSimulation: SimulationResult | undefined = undefined;
    const budgetMatch = query.match(/(?:₹\s*|rs\.?\s*|inr\s*)?(\d{2,4})\s*(?:cr|crore)?/i);
    if (budgetMatch && budgetMatch[1]) {
      const budgetAmount = parseInt(budgetMatch[1], 10);
      if (budgetAmount >= 50 && budgetAmount <= 2000) {
        budgetSimulation = this.simulateBudget({ budget: budgetAmount });
      }
    }

    // Match Need Clusters
    const matchedClusters = this.clusters.filter((c) => {
      const titleMatch = tokens.some((tok) => c.title.toLowerCase().includes(tok));
      const descMatch = tokens.some((tok) => c.description.toLowerCase().includes(tok));
      const locMatch = c.locations.some((l) =>
        q.includes(l.district.toLowerCase()) || q.includes(l.state.toLowerCase())
      );
      const catMatch = c.categories.some((cat) => q.includes(cat.toLowerCase()));
      return titleMatch || descMatch || locMatch || catMatch;
    });

    // Match Citizen Signals
    const matchedSignals = this.signals.filter((s) => {
      const distMatch = q.includes(s.district.toLowerCase());
      const stateMatch = q.includes(s.state.toLowerCase());
      const catMatch = q.includes(s.issueCategory.toLowerCase());
      const textMatch = tokens.some((tok) => s.translatedText.toLowerCase().includes(tok));
      return distMatch || stateMatch || catMatch || textMatch;
    }).slice(0, 8);

    // Match Infrastructure Indicators
    const matchedInfrastructure = this.infrastructure.filter((i) => {
      const distMatch = q.includes(i.district.toLowerCase());
      const stateMatch = q.includes(i.state.toLowerCase());
      const catMatch = q.includes(i.category.toLowerCase());
      return distMatch || stateMatch || catMatch;
    });

    // Match Demographics
    const matchedDemographics = this.demographics.filter((d) => {
      return q.includes(d.district.toLowerCase()) || q.includes(d.state.toLowerCase());
    });

    // Match Projects
    const matchedProjects = this.projects.filter((p) => {
      const distMatch = q.includes(p.district.toLowerCase());
      const stateMatch = q.includes(p.state.toLowerCase());
      const catMatch = p.categories.some((cat) => q.includes(cat.toLowerCase()));
      const overlapMatch = q.includes('overlap') || q.includes('collision') || q.includes('project');
      return distMatch || stateMatch || catMatch || overlapMatch;
    }).slice(0, 6);

    // Match Silent Gaps
    const allGaps = this.getSilentGaps();
    const matchedSilentGaps = allGaps.filter((g) => {
      const distMatch = q.includes(g.district.toLowerCase());
      const stateMatch = q.includes(g.state.toLowerCase());
      const gapQuery = q.includes('silent') || q.includes('gap') || q.includes('underrepresented') || q.includes('deficit');
      return distMatch || stateMatch || gapQuery;
    });

    // Match Recommendations
    const matchedRecommendations = this.recommendations.filter((r) => {
      const distMatch = q.includes(r.district.toLowerCase());
      const stateMatch = q.includes(r.state.toLowerCase());
      const textMatch = tokens.some((t) => r.title.toLowerCase().includes(t) || r.rationale.toLowerCase().includes(t));
      return distMatch || stateMatch || textMatch;
    }).slice(0, 4);

    // Match Convergence Groups
    const matchedConvergence = this.getConvergenceGroups().filter((cg) => {
      const regMatch = q.includes(cg.region.toLowerCase());
      const deptMatch = cg.departments.some((d) => q.includes(d.toLowerCase()));
      const catMatch = cg.categories.some((c) => q.includes(c.toLowerCase()));
      return regMatch || deptMatch || catMatch;
    }).slice(0, 3);

    return {
      query,
      stats: {
        totalSignalsInRepository: this.signals.length,
        totalClustersInRepository: this.clusters.length,
        totalActiveProjectsAudited: this.projects.length,
        totalSilentGapsFlagged: allGaps.length
      },
      matchedClusters: (matchedClusters.length > 0 ? matchedClusters : this.clusters.slice(0, 4)).map((c) => ({
        id: c.id,
        title: c.title,
        locations: c.locations,
        affectedPopulation: c.affectedPopulation,
        infrastructureGapScore: c.infrastructureGapScore,
        priorityScore: c.priorityScore,
        status: c.status,
        signalCount: c.signalCount
      })),
      matchedSignals: matchedSignals.map((s) => ({
        id: s.id,
        district: s.district,
        state: s.state,
        language: s.language,
        issueCategory: s.issueCategory,
        subCategory: s.subCategory,
        severity: s.severity,
        quote: s.translatedText
      })),
      matchedInfrastructure: matchedInfrastructure.slice(0, 6).map((i) => ({
        district: i.district,
        state: i.state,
        category: i.category,
        indicator: i.indicator,
        gapPercent: i.gap,
        currentScore: i.currentScore,
        benchmark: i.benchmark,
        targetScore: i.benchmark
      })),
      matchedDemographics: matchedDemographics.slice(0, 4).map((d) => ({
        district: d.district,
        state: d.state,
        population: d.population,
        vulnerabilityIndex: d.vulnerabilityIndex,
        digitalParticipationIndex: d.digitalParticipationIndex
      })),
      matchedProjects: matchedProjects.map((p) => ({
        id: p.id,
        name: p.name,
        district: p.district,
        state: p.state,
        budgetCr: p.budget,
        coveragePercent: p.coveragePercent,
        status: p.status,
        department: p.department
      })),
      matchedSilentGaps: (matchedSilentGaps.length > 0 ? matchedSilentGaps : allGaps.slice(0, 5)).map((g) => ({
        district: g.district,
        state: g.state,
        category: g.category,
        level: g.level,
        citizenSignalsCount: g.citizenSignalsCount,
        infrastructureGap: g.infrastructureGap,
        digitalParticipationIndex: g.digitalParticipationIndex,
        whyFlagged: g.whyFlagged
      })),
      matchedRecommendations: matchedRecommendations.map((r) => ({
        id: r.id,
        title: r.title,
        region: r.region,
        district: r.district,
        state: r.state,
        estimatedCostCr: r.estimatedCost,
        affectedPopulation: r.affectedPopulation,
        expectedGapReduction: r.expectedGapReduction
      })),
      matchedConvergence: matchedConvergence.map((cg) => ({
        id: cg.id,
        title: cg.title,
        region: cg.region,
        departments: cg.departments,
        rootCause: cg.rootCause
      })),
      budgetSimulation: budgetSimulation ? {
        budgetEnvelopeCr: budgetSimulation.budget,
        allocatedCostCr: budgetSimulation.allocatedCost,
        remainingCr: budgetSimulation.remainingBudget,
        fundedCount: budgetSimulation.selectedProjects.length,
        populationReached: budgetSimulation.totalPopulationReached,
        avgGapReduction: budgetSimulation.averageGapReduction,
        fundedProjects: budgetSimulation.selectedProjects.map((sp) => ({
          title: sp.title,
          costCr: sp.cost,
          population: sp.affectedPopulation,
          region: sp.region
        }))
      } : undefined
    };
  }

  evaluateProjectCollisions(clusterId: string): {
    cluster: NeedCluster | undefined;
    overallOverlapLevel: 'HIGH OVERLAP' | 'PARTIAL OVERLAP' | 'NO OVERLAP';
    evaluatedCount: number;
    collisions: Array<{
      project: Project;
      overlapLevel: 'HIGH OVERLAP' | 'PARTIAL OVERLAP' | 'NO OVERLAP';
      overlapScore: number;
      reason: string;
      recommendedAction: string;
    }>;
    consolidatedNotes: string;
    consolidatedAction: string;
  } {
    const cluster = this.clusters.find((c) => c.id === clusterId) || this.clusters[0];
    if (!cluster) {
      return {
        cluster: undefined,
        overallOverlapLevel: 'NO OVERLAP',
        evaluatedCount: 0,
        collisions: [],
        consolidatedNotes: 'Cluster not found in repository.',
        consolidatedAction: 'Proceed with standalone allocation.'
      };
    }

    const clusterDistricts = (cluster.locations || []).map((l) => l.district.toLowerCase());
    const clusterStates = (cluster.locations || []).map((l) => l.state.toLowerCase());

    const collisions = this.projects
      .filter((p) => {
        const pDist = p.district.toLowerCase();
        const pState = p.state.toLowerCase();
        const pReg = p.region.toLowerCase();

        const matchDistrict = clusterDistricts.some((d) => pDist.includes(d) || pReg.includes(d));
        const matchState = clusterStates.some((s) => pState.includes(s) || pReg.includes(s));
        const matchCategory = p.categories.some((cat) => cluster.categories.includes(cat));

        // Evaluate all projects in the same district, or same state with category match
        return matchDistrict || (matchState && matchCategory);
      })
      .map((p) => {
        const isSameDistrict = clusterDistricts.some((d) => p.district.toLowerCase().includes(d));
        const hasCategoryMatch = p.categories.some((cat) => cluster.categories.includes(cat));

        let overlapLevel: 'HIGH OVERLAP' | 'PARTIAL OVERLAP' | 'NO OVERLAP' = 'NO OVERLAP';
        let overlapScore = 15;
        let reason = `Scheme active in ${p.district} (${p.department}) with distinct operational scope.`;
        let recommendedAction = 'No conflict. Independent capital requisition approved.';

        if (isSameDistrict && hasCategoryMatch) {
          if (p.coveragePercent >= 75) {
            overlapLevel = 'HIGH OVERLAP';
            overlapScore = 85;
            reason = `High corridor and thematic overlap with Project #${p.id} (${p.name}). Both address ${p.categories.join(', ')}.`;
            recommendedAction = 'Avoid independent duplicate tender. Mandate inter-departmental budget consolidation or scope variation.';
          } else {
            overlapLevel = 'PARTIAL OVERLAP';
            overlapScore = 55;
            reason = `Project #${p.id} (${p.name}) covers arterial network in ${p.district}, but leaves local feeder habitations and culverts unbudgeted.`;
            recommendedAction = 'Execute contract scope expansion under existing mobilization rather than initiating a redundant tender.';
          }
        } else if (isSameDistrict && !hasCategoryMatch) {
          overlapLevel = 'PARTIAL OVERLAP';
          overlapScore = 40;
          reason = `Adjacent civil works project in ${p.district} managed by ${p.department}.`;
          recommendedAction = 'Coordinate right-of-way alignments and joint utility clearances to prevent street cuts after completion.';
        } else if (!isSameDistrict && hasCategoryMatch) {
          overlapLevel = 'PARTIAL OVERLAP';
          overlapScore = 30;
          reason = `Statewide program active in neighboring ${p.district} under ${p.department}.`;
          recommendedAction = `Review district allocation formula to extend program benefits to ${cluster.locations[0]?.district || 'target district'}.`;
        }

        return {
          project: p,
          overlapLevel,
          overlapScore,
          reason,
          recommendedAction
        };
      });

    const hasHighOverlap = collisions.some((c) => c.overlapLevel === 'HIGH OVERLAP');
    const hasPartialOverlap = collisions.some((c) => c.overlapLevel === 'PARTIAL OVERLAP');

    const overallOverlapLevel: 'HIGH OVERLAP' | 'PARTIAL OVERLAP' | 'NO OVERLAP' = hasHighOverlap
      ? 'HIGH OVERLAP'
      : hasPartialOverlap
      ? 'PARTIAL OVERLAP'
      : 'NO OVERLAP';

    const primaryCollision = collisions[0];
    const consolidatedNotes = primaryCollision
      ? `${collisions.length} relevant active scheme(s) evaluated in jurisdiction. ${primaryCollision.reason}`
      : `No conflicting or adjacent schemes identified in this sector for ${cluster.locations[0]?.district || 'district'}.`;

    const consolidatedAction = primaryCollision
      ? primaryCollision.recommendedAction
      : 'Proceed with standalone capital budget requisition.';

    return {
      cluster,
      overallOverlapLevel,
      evaluatedCount: collisions.length,
      collisions,
      consolidatedNotes,
      consolidatedAction
    };
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
