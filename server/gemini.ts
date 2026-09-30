import { GoogleGenAI } from '@google/genai';

// Initialize Gemini client strictly on the server-side with telemetry header
const apiKey = process.env.GEMINI_API_KEY;

function withTimeout<T>(promise: Promise<T>, ms: number = 4500): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) => setTimeout(() => reject(new Error('AI inference timeout')), ms))
  ]);
}

let ai: GoogleGenAI | null = null;
if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI client:', err);
  }
}

export async function analyzeSignalAI(input: {
  text: string;
  language?: string;
  source?: string;
  location?: string;
}) {
  if (ai) {
    try {
      const prompt = `You are CivicTwin AI's Multilingual Citizen Signal Ingestion Engine.
Analyze the following citizen report:
"${input.text}"
(Context: Reported in language "${input.language || 'Auto'}", Source: "${input.source || 'Direct'}", Location: "${input.location || 'Unknown'}")

Return ONLY valid JSON matching this schema:
{
  "translatedEnglish": "string translation",
  "issueCategory": "Water & Sanitation" | "Roads & Connectivity" | "Healthcare" | "School Education" | "Power & Energy" | "Irrigation & Agriculture" | "Public Housing & Drainage",
  "subCategory": "short specific issue",
  "severity": "High" | "Medium" | "Low",
  "affectedPopulationEstimate": number,
  "department": "string government department",
  "sentiment": "Urgent" | "Frustrated" | "Dissatisfied" | "Neutral",
  "confidence": number between 0.8 and 0.99,
  "extractedEntities": ["entity1", "entity2", "entity3"],
  "summary": "one sentence civic synthesis"
}`;

      const response = await withTimeout(
        ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json'
          }
        }),
        4500
      );

      if (response.text) {
        return {
          aiPowered: true,
          analysis: JSON.parse(response.text)
        };
      }
    } catch (err) {
      console.warn('Gemini analysis failed, falling back to rule-based parser:', err);
    }
  }

  // Deterministic rule-based fallback
  const textLower = input.text.toLowerCase();
  let category = 'Roads & Connectivity';
  let department = 'Road Transport & Highways';
  let subCat = 'Rural Road Access';
  let severity: 'High' | 'Medium' | 'Low' = 'Medium';

  if (textLower.includes('pani') || textLower.includes('water') || textLower.includes('tanker') || textLower.includes('jal') || textLower.includes('nal')) {
    category = 'Water & Sanitation';
    department = 'Jal Shakti & Water Supply';
    subCat = 'Drinking Water Reliability';
    severity = 'High';
  } else if (textLower.includes('doctor') || textLower.includes('hospital') || textLower.includes('ambulance') || textLower.includes('bimari') || textLower.includes('clinic')) {
    category = 'Healthcare';
    department = 'Health & Family Welfare';
    subCat = 'Emergency Medical Accessibility';
    severity = 'High';
  } else if (textLower.includes('school') || textLower.includes('bachhe') || textLower.includes('shala') || textLower.includes('teacher')) {
    category = 'School Education';
    department = 'School Education';
    subCat = 'School Infrastructure & Wash';
  } else if (textLower.includes('bijli') || textLower.includes('power') || textLower.includes('light') || textLower.includes('transformer')) {
    category = 'Power & Energy';
    department = 'Power & Renewable Energy';
    subCat = 'Grid Supply Continuity';
  } else if (textLower.includes('kisan') || textLower.includes('crop') || textLower.includes('fasal') || textLower.includes('mandi') || textLower.includes('nahar')) {
    category = 'Irrigation & Agriculture';
    department = 'Agriculture & Farmers Welfare';
    subCat = 'Farmgate Logistics & Irrigation';
  }

  return {
    aiPowered: false,
    mode: 'Rule-based demo mode',
    analysis: {
      translatedEnglish: input.text,
      issueCategory: category,
      subCategory: subCat,
      severity,
      affectedPopulationEstimate: 12500,
      department,
      sentiment: severity === 'High' ? 'Urgent' : 'Frustrated',
      confidence: 0.88,
      extractedEntities: [category, subCat, input.location || 'Local Habitation'],
      summary: `Citizen signal regarding ${category} processed for administrative routing.`
    }
  };
}

export async function processVoiceAudioAI(input: {
  audioBase64: string;
  mimeType?: string;
  language?: string;
  district?: string;
  state?: string;
}) {
  if (ai && input.audioBase64) {
    try {
      const prompt = `You are CivicTwin AI's Multimodal Citizen Voice Ingestion Engine.
Listen directly to this citizen voice report.
1. Transcribe the speech faithfully into its spoken native language (e.g. Hindi, Marathi, Tamil, etc.).
2. Translate the speech accurately to English.
3. Extract structured civic intelligence:
- issueCategory: 'Water & Sanitation' | 'Roads & Connectivity' | 'Healthcare' | 'School Education' | 'Power & Energy' | 'Irrigation & Agriculture' | 'Public Housing & Drainage'
- subCategory: short specific description
- severity: 'High' | 'Medium' | 'Low'
- affectedPopulationEstimate: integer estimate of citizens affected
- department: string government department responsible
- sentiment: 'Urgent' | 'Frustrated' | 'Dissatisfied' | 'Neutral'
- confidence: float between 0.88 and 0.99
- extractedEntities: string[] of places, landmarks, issues
- summary: concise one-sentence administrative briefing

Return ONLY valid JSON matching this schema:
{
  "transcription": "original language transcription",
  "translatedEnglish": "English translation",
  "issueCategory": "Roads & Connectivity",
  "subCategory": "Breached causeway",
  "severity": "High",
  "affectedPopulationEstimate": 15000,
  "department": "Public Works & Rural Roads",
  "sentiment": "Urgent",
  "confidence": 0.94,
  "extractedEntities": ["Bichhiya", "culvert", "ambulance"],
  "summary": "Report on washed-away causeway blocking emergency vehicles."
}`;

      const response = await withTimeout(
        ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [
            {
              role: 'user',
              parts: [
                {
                  inlineData: {
                    mimeType: input.mimeType || 'audio/webm',
                    data: input.audioBase64
                  }
                },
                {
                  text: prompt
                }
              ]
            }
          ],
          config: {
            responseMimeType: 'application/json'
          }
        }),
        6000
      );

      if (response.text) {
        const parsed = JSON.parse(response.text);
        return {
          aiPowered: true,
          mode: 'Gemini 3.8 Flash Multimodal Voice Pipeline',
          transcription: parsed.transcription || parsed.translatedEnglish,
          analysis: parsed
        };
      }
    } catch (err) {
      console.warn('Gemini multimodal audio processing failed, using high-fidelity fallback:', err);
    }
  }

  // High-fidelity fallback for offline demo or simulated audio
  const demoTexts: Record<string, { transcription: string; english: string; category: string; dept: string; subCat: string; sev: 'High' | 'Medium' | 'Low'; pop: number }> = {
    'marathi': {
      transcription: 'Amchya talukyat 15 divsatun ekda tanker yeto, borewell che pani kharpat zalya mule balakanna ajar hot ahet.',
      english: 'In our taluka, water tankers arrive only once every 15 days; deep borehole salinity is causing illnesses among children.',
      category: 'Water & Sanitation',
      dept: 'Jal Shakti & Water Supply',
      subCat: 'Tanker Rationing & Groundwater Salinity',
      sev: 'High',
      pop: 18000
    },
    'tamil': {
      transcription: 'Mazhai kaalathil eri vellam gramathukulle pugunthuvittathu, thiruvallur drainage kanal thoor vaarapadavillai.',
      english: 'During rains lake floodwaters enter the village; Thiruvallur drainage canals have not been desilted.',
      category: 'Public Housing & Drainage',
      dept: 'Municipal Administration & Water Supply',
      subCat: 'Stormwater Drain Inundation',
      sev: 'High',
      pop: 24000
    },
    'hindi': {
      transcription: 'Bichhiya nala paar karne wala rasta toot gaya hai, ambulance gaon me nahi aa pa rahi hai aur marij pareshan hain.',
      english: 'The causeway road crossing the Bichhiya stream is washed away; ambulances cannot reach the village and patients are stranded.',
      category: 'Roads & Connectivity',
      dept: 'Road Transport & Highways',
      subCat: 'Monsoon Causeway Washout & Medical Transit Blockade',
      sev: 'High',
      pop: 16500
    }
  };

  const langKey = (input.language || '').toLowerCase().includes('marathi')
    ? 'marathi'
    : (input.language || '').toLowerCase().includes('tamil')
    ? 'tamil'
    : 'hindi';

  const demo = demoTexts[langKey];
  return {
    aiPowered: false,
    mode: 'Multimodal Audio Processor (Voice Simulation Fallback)',
    transcription: demo.transcription,
    analysis: {
      translatedEnglish: demo.english,
      issueCategory: demo.category,
      subCategory: demo.subCat,
      severity: demo.sev,
      affectedPopulationEstimate: demo.pop,
      department: demo.dept,
      sentiment: 'Urgent',
      confidence: 0.91,
      extractedEntities: [input.district || 'Habitation', demo.subCat],
      summary: `Voice grievance processed for ${demo.category} in ${input.district || 'district'}.`
    }
  };
}

export async function generateCopilotAnswerAI(params: {
  question: string;
  evidence?: any;
  contextSummary?: string;
}) {
  const evidence = params.evidence;

  // Format structured evidence context
  let structuredContext = '';
  if (evidence) {
    const clusterSummary = (evidence.matchedClusters || [])
      .map((c: any) => `• Cluster [${c.id}]: "${c.title}" in ${c.locations.map((l: any) => `${l.district}, ${l.state}`).join(' & ')} | Gap: ${c.infrastructureGapScore}/100 | Priority: ${c.priorityScore}/100 | Signals: ${c.signalCount} | Reached: ${c.affectedPopulation.toLocaleString()}`)
      .join('\n');

    const signalSummary = (evidence.matchedSignals || [])
      .map((s: any) => `• Signal [${s.id} in ${s.district}, ${s.state} - ${s.language}]: "${s.quote}" (${s.subCategory}, Severity: ${s.severity})`)
      .join('\n');

    const projectSummary = (evidence.matchedProjects || [])
      .map((p: any) => `• Existing Scheme [${p.id}]: "${p.name}" (${p.department}) in ${p.district}, ${p.state} | Budget: ₹${p.budgetCr} Cr | Coverage: ${p.coveragePercent}% | Status: ${p.status}`)
      .join('\n');

    const indicatorSummary = (evidence.matchedInfrastructure || [])
      .map((i: any) => `• Infrastructure Deficit: ${i.indicator} in ${i.district}, ${i.state} (Score: ${i.currentScore}/100, Benchmark: ${i.benchmark}/100, Gap: ${i.gapPercent}% pts)`)
      .join('\n');

    const silentGapSummary = (evidence.matchedSilentGaps || [])
      .map((g: any) => `• Silent Gap: ${g.district}, ${g.state} (Level: ${g.level}, Gap Score: ${g.infrastructureGap}%, Digital Participation: ${g.digitalParticipationIndex}/100, Signals: ${g.citizenSignalsCount}) - ${g.whyFlagged}`)
      .join('\n');

    const recSummary = (evidence.matchedRecommendations || [])
      .map((r: any) => `• Candidate Proposal [${r.id}]: "${r.title}" in ${r.region} | Cost: ₹${r.estimatedCostCr} Cr | Affected Pop: ${r.affectedPopulation.toLocaleString()} | Expected Gap Reduction: +${r.expectedGapReduction}% pts`)
      .join('\n');

    const simSummary = evidence.budgetSimulation
      ? `• Budget Simulation (₹${evidence.budgetSimulation.budgetEnvelopeCr} Cr envelope): Funded ${evidence.budgetSimulation.fundedCount} projects, Reached ${evidence.budgetSimulation.populationReached.toLocaleString()} citizens, Avg Gap Reduction: +${evidence.budgetSimulation.avgGapReduction}% pts. Projects funded: ${evidence.budgetSimulation.fundedProjects.map((fp: any) => `${fp.title} (₹${fp.costCr} Cr in ${fp.region})`).join(', ')}`
      : '';

    structuredContext = `
VERIFIED REPOSITORY EVIDENCE (Retrieved dynamically for this query):
=== Need Clusters in Scope ===
${clusterSummary || 'None in immediate query scope'}

=== Verbatim Citizen Quotes ===
${signalSummary || 'None directly matching'}

=== Active Government Schemes in Jurisdiction ===
${projectSummary || 'No active conflicting schemes in sector'}

=== Infrastructure Gap Audits ===
${indicatorSummary || 'Standard baseline indicators'}

=== Silent Gap Blind Spots ===
${silentGapSummary || 'No high-urgency silent gaps in selected region'}

=== Candidate Intervention Proposals ===
${recSummary || 'No pre-compiled candidate proposals'}

${simSummary ? `=== Simulated Budget Allocation ===\n${simSummary}` : ''}
`;
  } else if (params.contextSummary) {
    structuredContext = params.contextSummary;
  }

  if (ai) {
    try {
      const prompt = `You are CivicTwin AI Copilot, an expert advisor for Digital Public Infrastructure, civic data intelligence, and capital allocation across Indian states (and BRICS framework).
Use ONLY the verified application data context below. Do not fabricate external statistics. Quote specific project numbers, cluster IDs, district names, and budget amounts directly from the evidence provided.

${structuredContext}

USER QUESTION:
"${params.question}"

Provide a structured, authoritative, scannable response with:
1. Executive Answer (2-3 sentences with specific figures)
2. Evidence Points from the Data (bulleted, quoting specific districts, indicator gap percentages, or citizen quotes)
3. Actionable Policy or Investment Recommendation (including collision avoidance or inter-departmental co-ordination)
4. Data Grounding Note (citing exact numbers of signals, clusters, or schemes audited)`;

      const response = await withTimeout(
        ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt
        }),
        5000
      );

      if (response.text) {
        return {
          aiPowered: true,
          answer: response.text
        };
      }
    } catch (err) {
      console.warn('Gemini copilot call failed:', err);
    }
  }

  // Dynamic Evidence-Grounded Fallback Engine
  const q = params.question.toLowerCase();
  let executive = '';
  let evidencePoints: string[] = [];
  let recommendation = '';

  if (evidence?.budgetSimulation) {
    const bs = evidence.budgetSimulation;
    executive = `Under an illustrative capital expenditure envelope of **₹${bs.budgetEnvelopeCr} Cr**, CivicTwin AI's optimization engine allocates **₹${bs.allocatedCostCr} Cr** across **${bs.fundedCount} priority multi-sector interventions**, reaching approximately **${bs.populationReached.toLocaleString()} citizens** with an average gap reduction of **+${bs.avgGapReduction}% pts**.`;
    evidencePoints = bs.fundedProjects.map(
      (fp: any) => `**${fp.title}**: ₹${fp.costCr} Cr in ${fp.region} reaching ${fp.population.toLocaleString()} citizens.`
    );
    recommendation = `Prioritize bundling contiguous works (such as drainage and rural culverts) to capture an estimated 8-12% in mobilization savings while reserving the remaining ₹${bs.remainingCr.toFixed(1)} Cr for emergency contingencies.`;
  } else if (q.includes('silent') || q.includes('underrepresented') || q.includes('blind spot')) {
    const gaps = evidence?.matchedSilentGaps || [];
    const topGaps = gaps.slice(0, 3);
    executive = `CivicTwin AI detected **${gaps.length} critical Silent Gap regions** across India where citizen digital grievance volume is statistically disconnected from severe underlying structural deficits.`;
    evidencePoints = topGaps.map(
      (g: any) => `**${g.district} (${g.state})**: Only ${g.citizenSignalsCount} citizen reports despite an infrastructure gap of ${g.infrastructureGap}% and a digital participation score of only ${g.digitalParticipationIndex}/100. ${g.whyFlagged}`
    );
    recommendation = `Shift from passive digital portal reporting to active Gram Sabha enumeration, ASHA worker voice-intake tablets, and localized IVR radio surveys to eliminate regional reporting blind spots.`;
  } else if (evidence?.matchedClusters?.length > 0) {
    const primaryCluster = evidence.matchedClusters[0];
    const locNames = primaryCluster.locations.map((l: any) => `${l.district}, ${l.state}`).join(' & ');
    executive = `For **${primaryCluster.title}** in **${locNames}**, CivicTwin AI identifies an infrastructure gap score of **${primaryCluster.infrastructureGapScore}/100** affecting over **${primaryCluster.affectedPopulation.toLocaleString()} citizens**.`;
    
    evidencePoints = [
      `**Cluster Priority Score:** ${primaryCluster.priorityScore}/100 based on synthetic multi-criteria weighting.`,
      `**Citizen Evidence:** ${primaryCluster.signalCount} verified multilingual signals ingested from regional sources.`
    ];

    if (evidence.matchedSignals?.length > 0) {
      const topSig = evidence.matchedSignals[0];
      evidencePoints.push(`**Citizen Testimony (${topSig.district} - ${topSig.language}):** "${topSig.quote}"`);
    }

    if (evidence.matchedProjects?.length > 0) {
      const topProj = evidence.matchedProjects[0];
      evidencePoints.push(`**Active Scheme in Area:** #${topProj.id} "${topProj.name}" (${topProj.department}, ₹${topProj.budgetCr} Cr, ${topProj.coveragePercent}% coverage).`);
      recommendation = `Issue a co-ordinated scope expansion on Project #${topProj.id} to incorporate local feeder habitations rather than releasing a disjointed tender.`;
    } else {
      recommendation = `Requisition a targeted capital allocation package estimated at ₹${primaryCluster.estimatedCost || 35.0} Cr under an inter-departmental joint scheme.`;
    }
  } else {
    executive = `Based on CivicTwin AI's cross-sectoral repository, current infrastructure intelligence spans 26 need clusters across 7 states, cross-referenced against 115+ citizen signals and audited infrastructure indicators.`;
    evidencePoints = [
      `**Coverage:** Multilingual voice, SMS, and portal reports across Hindi, Marathi, Tamil, Bengali, Odia, and Kannada.`,
      `**Collision Detection:** Over 40% of priority citizen needs sit adjacent to existing central or state works, presenting immediate budget consolidation opportunities.`,
      `**Silent Gap Sentinel:** Real-time flagging of high-vulnerability blocks where digital divide suppresses complaint frequency.`
    ];
    recommendation = `Deploy the Project Compiler to generate evidence-backed intervention dossiers for review by district planning committees.`;
  }

  const fallback = `**Executive Synthesis:**
${executive}

**Key Evidence Points:**
${evidencePoints.map((pt) => `• ${pt}`).join('\n')}

**Co-ordinated Action Recommendation:**
${recommendation}

*(Grounded in CivicTwin AI Verified Repository: ${evidence?.stats?.totalSignalsInRepository || 115} signals, ${evidence?.stats?.totalClustersInRepository || 26} clusters, ${evidence?.stats?.totalActiveProjectsAudited || 10} active schemes audited)*`;

  return {
    aiPowered: false,
    mode: 'Structured Evidence Synthesis Engine',
    answer: fallback
  };
}

export async function generateConvergenceOpportunityAI(group: {
  title: string;
  region: string;
  departments: string[];
  symptoms: any[];
  rootCause: string;
}) {
  if (ai) {
    try {
      const prompt = `You are CivicTwin AI's Need Convergence Engine.
Analyze this cross-department cluster:
Title: ${group.title}
Region: ${group.region}
Root Cause: ${group.rootCause}
Departments: ${group.departments.join(', ')}
Symptoms Reported by Citizens:
${JSON.stringify(group.symptoms, null, 2)}

Return a structured JSON recommendation for a joint inter-departmental intervention:
{
  "proposedSchemeTitle": "string",
  "leadDepartment": "string",
  "participatingDepartments": ["dept1", "dept2"],
  "jointInterventionSummary": "string",
  "estimatedBudget": number in Cr,
  "expectedCitizenOutcome": "string",
  "costSavingsVsSiloedApproaches": "string"
}`;

      const response = await withTimeout(
        ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: { responseMimeType: 'application/json' }
        }),
        4500
      );

      if (response.text) {
        return {
          aiPowered: true,
          opportunity: JSON.parse(response.text)
        };
      }
    } catch (err) {
      console.warn('Gemini convergence generation failed:', err);
    }
  }

  // Fallback
  return {
    aiPowered: false,
    mode: 'Rule-based demo mode',
    opportunity: {
      proposedSchemeTitle: `Joint Inter-Departmental Infrastructure Resilience Mission (${group.region})`,
      leadDepartment: group.departments[0] || 'Rural Development',
      participatingDepartments: group.departments,
      jointInterventionSummary: `A single coordinated capital works package addressing the shared root cause: "${group.rootCause}", eliminating redundant contractor mobilizations across ${group.departments.length} departments.`,
      estimatedBudget: 42.5,
      expectedCitizenOutcome: 'Simultaneous reduction in transit delays, school absenteeism, and emergency health referral blockages.',
      costSavingsVsSiloedApproaches: 'Estimated 22-28% reduction in administrative overhead and shared earthmoving costs.'
    }
  };
}
