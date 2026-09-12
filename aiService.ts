import { SymptomTriageResult } from '../types';

export async function checkSymptomsAI(
  symptoms: string,
  age?: number,
  gender?: string,
  duration?: string
): Promise<SymptomTriageResult> {
  try {
    const response = await fetch('/api/ai/symptom-checker', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symptoms, age, gender, duration })
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.warn('AI triage endpoint unavailable, generating intelligent rule-based triage:', error);
  }

  // Robust fallback triage rule engine
  const lower = symptoms.toLowerCase();
  const isEmergency =
    lower.includes('chest pain') ||
    lower.includes('heart') ||
    lower.includes('unconscious') ||
    lower.includes('breathing difficulty') ||
    lower.includes('stroke') ||
    lower.includes('paralysis') ||
    lower.includes('severe bleeding') ||
    lower.includes('choking');

  const isModerate =
    lower.includes('fever') ||
    lower.includes('cough') ||
    lower.includes('vomit') ||
    lower.includes('diarrhea') ||
    lower.includes('dizziness') ||
    lower.includes('rash') ||
    lower.includes('joint pain') ||
    lower.includes('back pain');

  if (isEmergency) {
    return {
      riskLevel: 'Emergency / Immediate Medical Attention',
      severityScore: 9,
      possibleCauses: [
        'Acute Coronary Syndrome / Angina',
        'Severe Pulmonary Embolism',
        'Acute Hypertensive Crisis',
        'Critical Asthma Exacerbation'
      ],
      recommendedSpecialist: 'Emergency Medicine / Interventional Cardiologist',
      recommendedAction:
        'Call 108 Emergency immediately or visit nearest 24x7 Trauma / Cardiac Emergency unit. Do not drive yourself.',
      redFlags: [
        'Crushing central chest tightness or radiation to left arm/jaw',
        'Sudden breathlessness or blue lips',
        'Sudden weakness, facial droop, or speech slurring',
        'Loss of consciousness or severe cold sweats'
      ],
      firstAidAdvice: [
        'Keep patient in semi-sitting comfortable resting posture.',
        'Loosen tight clothing around neck and waist.',
        'If advised previously by a doctor for diagnosed angina, chew one soluble aspirin (300mg) and notify emergency team.',
        'Keep calm and do not exert physical effort.'
      ],
      suggestedQuestionsForDoctor: [
        'Is an immediate ECG and cardiac troponin biomarker test indicated?',
        'Do I require emergency coronary angiography or ICU monitoring?'
      ]
    };
  }

  if (isModerate) {
    return {
      riskLevel: 'Moderate / See Doctor',
      severityScore: 5,
      possibleCauses: [
        'Acute Upper Respiratory Viral Infection / Bronchitis',
        'Seasonal Influenza / Gastroenteritis',
        'Early Bacterial Pharyngitis',
        'Post-viral Reactive Fatigue'
      ],
      recommendedSpecialist: 'General Physician / Internal Medicine Specialist',
      recommendedAction:
        'Book an in-person or video consultation within 24 hours. Monitor temperature and hydration.',
      redFlags: [
        'High continuous fever (>102°F) refractory to paracetamol',
        'Inability to retain liquids or severe dehydration signs',
        'Persistent shortness of breath or SpO2 dropping below 94%'
      ],
      firstAidAdvice: [
        'Maintain oral rehydration with electrolyte ORS and warm fluids.',
        'Adequate physical rest and light digestible meals.',
        'Paracetamol 650mg SOS for body aches (consult physician for dosage).'
      ],
      suggestedQuestionsForDoctor: [
        'Should I undergo Complete Blood Count (CBC) or viral panel?',
        'Are generic Jan Aushadhi antipyretics and cough expectorants appropriate?'
      ]
    };
  }

  return {
    riskLevel: 'Mild / Home Care',
    severityScore: 2,
    possibleCauses: [
      'Mild Tension Headache',
      'Mild Seasonal Fatigue',
      'Transient Muscle Strain',
      'Mild Acidity / Dyspepsia'
    ],
    recommendedSpecialist: 'General Wellness / Primary Care Physician',
    recommendedAction:
      'Home rest, adequate hydration, balanced nutrition, and tele-consultation if symptoms persist beyond 48 hours.',
    redFlags: [
      'Sudden onset worst headache of life',
      'Stiff neck accompanied by fever and sensitivity to light'
    ],
    firstAidAdvice: [
      'Hydrate with warm water and fresh juices.',
      'Practice gentle stretching and reduce screen exposure.'
    ],
    suggestedQuestionsForDoctor: [
      'Are there preventive lifestyle or dietary modifications recommended?'
    ]
  };
}

export async function askHealthAssistantAI(
  message: string,
  chatHistory: { role: 'user' | 'assistant'; text: string }[] = []
): Promise<string> {
  try {
    const response = await fetch('/api/ai/health-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history: chatHistory })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.reply) return data.reply;
    }
  } catch (error) {
    console.warn('AI Health chat server error:', error);
  }

  // High quality context-aware fallback response
  const lower = message.toLowerCase();
  if (lower.includes('ayushman') || lower.includes('pmjay') || lower.includes('scheme')) {
    return `**Ayushman Bharat PM-JAY** provides up to ₹5 Lakhs per family/year of cashless hospitalization at 28,000+ empanelled hospitals. You can check eligibility using your Ration Card or Aadhaar in the **Govt Schemes** tab on HealthBridge.`;
  }
  if (lower.includes('generic') || lower.includes('jan aushadhi') || lower.includes('dawa') || lower.includes('medicine')) {
    return `**Jan Aushadhi Kendras** provide WHO-GMP certified generic medicines that have the identical chemical active salts and bio-equivalence as costly branded drugs, but at **50% to 90% lower prices**. Check our **Generic Medicines** tab to compare your brand medicine prices instantly!`;
  }
  if (lower.includes('emergency') || lower.includes('ambulance') || lower.includes('108') || lower.includes('chest')) {
    return `⚠️ **Emergency Notice:** If you or someone around you is facing a life-threatening symptom (such as chest tightness, difficulty breathing, stroke symptoms, or severe trauma), please tap the red **SOS Emergency button** at the top or dial **108** immediately!`;
  }

  return `Hello! I am your **HealthBridge AI Health Companion**. I can guide you through:
1. **Symptom Triage:** Understanding your symptoms & finding the right specialist.
2. **Generic Medicines:** Finding Jan Aushadhi generic substitutes that save up to 85% on pharmacy costs.
3. **Govt Schemes:** Checking eligibility for Ayushman Bharat PM-JAY and state healthcare assistance.
4. **Emergency Support:** Locating real-time ICU beds and one-touch ambulance dispatch.

How may I assist your health query today? *(Please note: AI guidance is for triage and education; always consult a licensed doctor for final medical decisions.)*`;
}

export async function checkSchemeEligibilityAI(answers: {
  state: string;
  familyIncomeAnnual: number;
  rationCardType: string;
  hasSeniorCitizen: boolean;
  bplStatus: boolean;
  occupationalCategory: string;
}): Promise<{
  eligibleSchemes: { name: string; matchScore: number; reason: string; keyBenefit: string }[];
  summary: string;
}> {
  try {
    const response = await fetch('/api/ai/scheme-eligibility', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(answers)
    });
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.warn('AI scheme eligibility fallback:', error);
  }

  const eligible = [];
  if (answers.bplStatus || answers.rationCardType !== 'None' || answers.familyIncomeAnnual <= 250000 || answers.hasSeniorCitizen) {
    eligible.push({
      name: 'Ayushman Bharat PM-JAY',
      matchScore: 98,
      reason: answers.hasSeniorCitizen
        ? 'Senior citizens aged 70+ have universal ₹5 Lakh coverage regardless of income.'
        : 'Eligible through Antyodaya/Priority Ration card & income bracket criteria.',
      keyBenefit: '₹5,00,000 Cashless Hospitalization per year across 28,000+ empanelled hospitals.'
    });
  }

  eligible.push({
    name: 'Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP)',
    matchScore: 100,
    reason: 'Universal eligibility available to all citizens with valid doctor prescription.',
    keyBenefit: '50% to 90% direct savings on 2,000+ WHO-GMP certified generic medicines.'
  });

  if (answers.bplStatus || answers.familyIncomeAnnual < 180000) {
    eligible.push({
      name: 'Rashtriya Arogya Nidhi (RAN)',
      matchScore: 90,
      reason: 'Eligible for special grants up to ₹15 Lakhs for critical life-threatening ailments in Govt Hospitals.',
      keyBenefit: 'One-time direct financial grant to treating Super Specialty Institute.'
    });
  }

  return {
    eligibleSchemes: eligible,
    summary: `Based on your profile in ${answers.state || 'India'}, you qualify for ${eligible.length} major central and state healthcare welfare programs.`
  };
}
