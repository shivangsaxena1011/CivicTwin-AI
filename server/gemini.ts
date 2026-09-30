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

export async function generateCopilotAnswerAI(params: {
  question: string;
  contextSummary: string;
}) {
  if (ai) {
    try {
      const prompt = `You are CivicTwin AI Copilot, an expert advisor for Digital Public Infrastructure, civic data intelligence, and capital allocation across Indian states (and BRICS framework).
Use ONLY the provided verified application data context below. Do not fabricate external statistics. If something is not in the data, state it transparently.

APPLICATION CONTEXT:
${params.contextSummary}

USER QUESTION:
"${params.question}"

Provide a structured, authoritative, scannable response with:
1. Executive Answer (2-3 sentences)
2. Evidence Points from the data (bulleted with numbers, districts, or projects)
3. Actionable Policy or Investment Recommendation
4. Data Confidence & Caveat note (labeling as Illustrative Prototype Data)`;

      const response = await withTimeout(
        ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt
        }),
        4500
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

  // Fallback answer based on keywords
  const q = params.question.toLowerCase();
  let fallback = '';
  if (q.includes('madhya pradesh') || q.includes('mandla')) {
    fallback = `**Executive Synthesis:**
In Madhya Pradesh, the primary unresolved challenge is the **Seasonal Regional Connectivity & Culvert Infrastructure Gap** centered across Mandla and Dindori districts. While trunk highway expansion (Project proj-001) is in progress, 18 feeder culverts remain unbuilt, stranding 81,600 citizens during monsoons.

**Key Evidence Points:**
- **Roads:** 46% gap in all-weather rural road connectivity (PMGSY spatial audit).
- **Healthcare:** 51% emergency ambulance delay index during rain overflows.
- **Convergence:** School absenteeism, emergency medical delays, and vegetable spoilage all trace back to the same washed-out causeways.

**Recommendation:** Issue a scope expansion change order on existing Project proj-001 to fund feeder culverts, saving ₹8.2 Cr in mobilization costs.

*(Data Source: Illustrative Hackathon Prototype Dataset)*`;
  } else if (q.includes('silent gap') || q.includes('underrepresented')) {
    fallback = `**Executive Synthesis:**
CivicTwin AI flagged **12 regions** as potential Silent Gaps where citizen complaint volume is low but structural infrastructure deficit is severe. Top priorities include **Gadchiroli (Maharashtra)**, **Araria (Bihar)**, and **Malkangiri (Odisha)**.

**Key Evidence Points:**
- **Gadchiroli:** Only 5 citizen signals, yet institutional delivery access gap is 63% and digital participation index is only 18/100.
- **Araria:** 4 signals for 2.8 million population; high Kala-Azar vulnerability and 58% gap in GP broadband reach.

**Recommendation:** Replace passive digital complaint waiting with active Gram Sabha enumeration and ASHA worker voice intake.

*(Data Source: Illustrative Hackathon Prototype Dataset)*`;
  } else {
    fallback = `**Executive Synthesis:**
Based on the current CivicTwin AI repository, active infrastructure needs span 26 clusters across 7 states, with 46% of high-priority interventions showing partial overlap with existing state or central schemes.

**Key Evidence Points:**
- **Total Seeded Signals:** 115+ multilingual signals across Hindi, Marathi, Tamil, Bengali, Odia, and Kannada.
- **High-Leverage Projects:** Water grid integration in Marathwada (Jalna) and All-weather culverts in Mandla.
- **Budget Sensitivity:** Under a ₹250 Cr scenario, 6 key multi-sector interventions reach over 410,000 citizens.

*(Data Source: Illustrative Hackathon Prototype Dataset)*`;
  }

  return {
    aiPowered: false,
    mode: 'Rule-based demo mode',
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
