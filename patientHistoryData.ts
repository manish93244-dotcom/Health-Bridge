export interface LabReport {
  id: string;
  testName: string;
  category: string;
  date: string;
  value: string;
  unit: string;
  referenceRange: string;
  status: 'Normal' | 'Borderline' | 'Elevated' | 'Attention';
  hospitalLab: string;
  notes?: string;
}

export interface PastConsultation {
  id: string;
  date: string;
  doctorName: string;
  doctorSpecialty: string;
  hospital: string;
  chiefComplaint: string;
  diagnosis: string;
  vitals: {
    bp: string;
    pulse: string;
    temp: string;
    spo2: string;
    weight: string;
  };
  prescribedMedicines: {
    brandName: string;
    genericSalt: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  clinicalNotes: string;
  followUpAdvised: string;
}

export interface CameraActivityMetric {
  metric: string;
  currentValue: string;
  baselineValue: string;
  changeStatus: 'Improved' | 'Stable' | 'Worsened';
  percentageChange: string;
  clinicalSignificance: string;
}

export interface PatientDetailedHistory {
  id: string;
  name: string;
  age: number;
  gender: string;
  abhaId: string;
  pmjayId: string;
  pmjaySchemeStatus: string;
  bloodGroup: string;
  maritalStatus: string;
  contactNumber: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  allergies: {
    substance: string;
    reaction: string;
    severity: 'Mild' | 'Moderate' | 'Severe';
  }[];
  chronicConditions: {
    condition: string;
    diagnosedSince: string;
    managementPlan: string;
    status: 'Controlled' | 'Active Monitoring' | 'Remission';
  }[];
  surgicalHistory: {
    procedure: string;
    year: string;
    hospital: string;
    outcome: string;
  }[];
  familyHistory: {
    relative: string;
    condition: string;
  }[];
  lifestyle: {
    smoking: string;
    alcohol: string;
    diet: string;
    physicalActivity: string;
    sleepHours: string;
  };
  vitalsTimeline: {
    date: string;
    bp: string;
    hr: number;
    spo2: number;
    temp: number;
    weightKg: number;
  }[];
  labReports: LabReport[];
  consultationHistory: PastConsultation[];
  cameraActivityComparison: {
    lastVisitDate: string;
    overallImprovementScore: number; // 0-100%
    metrics: CameraActivityMetric[];
    doctorVisualImpression: string;
  };
}

export const samplePatientHistory: PatientDetailedHistory = {
  id: 'pat-1',
  name: 'Rahul Verma',
  age: 42,
  gender: 'Male',
  abhaId: '91-4920-1849-0129',
  pmjayId: 'PMJAY-DEL-2024-88491',
  pmjaySchemeStatus: '₹5,00,000 Family Cover Active (AB PM-JAY Gold Card)',
  bloodGroup: 'B+ Positive',
  maritalStatus: 'Married',
  contactNumber: '+91 98101 23456',
  emergencyContact: {
    name: 'Sunita Verma',
    relation: 'Spouse',
    phone: '+91 98101 23457'
  },
  allergies: [
    { substance: 'Penicillin & Amoxicillin Derivatives', reaction: 'Erythematous urticarial rash & itching', severity: 'Moderate' },
    { substance: 'Sulfa Drugs', reaction: 'Mild periorbital edema', severity: 'Mild' },
    { substance: 'Peanuts / Tree Nuts', reaction: 'None documented', severity: 'Mild' }
  ],
  chronicConditions: [
    {
      condition: 'Type 2 Diabetes Mellitus',
      diagnosedSince: 'March 2021 (4 years)',
      managementPlan: 'Metformin 500mg BD + Low GI diet + 30m brisk walking',
      status: 'Controlled'
    },
    {
      condition: 'Stage 1 Essential Hypertension',
      diagnosedSince: 'September 2022',
      managementPlan: 'Telmisartan 40mg OD + Sodium restriction (<2g/day)',
      status: 'Controlled'
    },
    {
      condition: 'Allergic Rhinitis / Pharyngitis',
      diagnosedSince: 'Seasonal (Winter/Smog)',
      managementPlan: 'Cetirizine 10mg PRN + Steam Inhalation',
      status: 'Active Monitoring'
    }
  ],
  surgicalHistory: [
    {
      procedure: 'Laparoscopic Appendectomy',
      year: '2018',
      hospital: 'Safdarjung Hospital, New Delhi',
      outcome: 'Uncomplicated recovery, healed primary intention'
    },
    {
      procedure: 'Left Knee Arthroscopic Meniscal Debridement',
      year: '2022',
      hospital: 'AIIMS New Delhi (Orthopedics)',
      outcome: 'Full mobility restored, physiotherapy completed'
    }
  ],
  familyHistory: [
    { relative: 'Father', condition: 'Coronary Artery Disease (CAD), Hypertensive' },
    { relative: 'Mother', condition: 'Type 2 Diabetes Mellitus, Osteoarthritis' },
    { relative: 'Sibling (Brother)', condition: 'No known chronic disorders' }
  ],
  lifestyle: {
    smoking: 'Non-Smoker (Quit in 2017)',
    alcohol: 'Occasional social (< 2 units/month)',
    diet: 'Vegetarian, High-Fiber Indian Diet',
    physicalActivity: 'Moderate (4-5 days morning walk 4 km)',
    sleepHours: '6.5 to 7 hours / night'
  },
  vitalsTimeline: [
    { date: '14 Jan 2025', bp: '138/88', hr: 84, spo2: 97, temp: 98.6, weightKg: 78.4 },
    { date: '18 Apr 2025', bp: '130/84', hr: 78, spo2: 98, temp: 98.4, weightKg: 77.1 },
    { date: '14 Aug 2025', bp: '142/92', hr: 92, spo2: 96, temp: 101.2, weightKg: 76.5 },
    { date: 'Today (Live)', bp: '122/80', hr: 74, spo2: 99, temp: 98.6, weightKg: 76.2 }
  ],
  labReports: [
    {
      id: 'lab-01',
      testName: 'HbA1c (Glycosylated Hemoglobin)',
      category: 'Diabetic Profile',
      date: '15 Aug 2025',
      value: '6.4%',
      unit: '%',
      referenceRange: '< 5.7% Normal, 5.7-6.4% Prediabetic, > 6.5% Diabetic',
      status: 'Normal',
      hospitalLab: 'Dr. Lal PathLabs (NHA ABDM Empanelled)',
      notes: 'Well controlled with oral anti-hyperglycemics and dietary adherence.'
    },
    {
      id: 'lab-02',
      testName: 'Fasting Blood Glucose (FBG)',
      category: 'Diabetic Profile',
      date: '15 Aug 2025',
      value: '108',
      unit: 'mg/dL',
      referenceRange: '70 - 110 mg/dL',
      status: 'Normal',
      hospitalLab: 'AIIMS Central Clinical Biochemistry',
      notes: 'Optimal glycemic control.'
    },
    {
      id: 'lab-03',
      testName: 'Lipid Profile - Total Cholesterol',
      category: 'Cardiovascular',
      date: '15 Aug 2025',
      value: '178',
      unit: 'mg/dL',
      referenceRange: '< 200 mg/dL',
      status: 'Normal',
      hospitalLab: 'Safdarjung Hospital Pathology',
      notes: 'LDL: 98 mg/dL, HDL: 46 mg/dL, Triglycerides: 142 mg/dL.'
    },
    {
      id: 'lab-04',
      testName: 'Serum Creatinine & eGFR',
      category: 'Renal Function (KFT)',
      date: '15 Aug 2025',
      value: '0.92',
      unit: 'mg/dL',
      referenceRange: '0.7 - 1.2 mg/dL',
      status: 'Normal',
      hospitalLab: 'AIIMS Central Clinical Biochemistry',
      notes: 'eGFR > 90 mL/min/1.73m2. Normal glomerular filtration.'
    },
    {
      id: 'lab-05',
      testName: 'Complete Blood Count (CBC) - Hemoglobin',
      category: 'Hematology',
      date: '14 Aug 2025',
      value: '14.4',
      unit: 'g/dL',
      referenceRange: '13.5 - 17.5 g/dL',
      status: 'Normal',
      hospitalLab: 'Safdarjung Hospital Pathology',
      notes: 'TLC: 8,200/uL, Platelets: 2.4 Lakhs/uL. No leukocytosis.'
    },
    {
      id: 'lab-06',
      testName: '12-Lead Standard Electrocardiogram (ECG)',
      category: 'Cardiology Diagnostics',
      date: '18 Apr 2025',
      value: 'Normal Sinus Rhythm (NSR)',
      unit: '76 bpm',
      referenceRange: '60 - 100 bpm',
      status: 'Normal',
      hospitalLab: 'AIIMS Cardiology Lab',
      notes: 'Normal axis, no ST-T segment elevation/depression, normal PR and QTc intervals.'
    }
  ],
  consultationHistory: [
    {
      id: 'cons-01',
      date: '14 Aug 2025 (Previous Visit)',
      doctorName: 'Dr. Priya Sharma',
      doctorSpecialty: 'Internal Medicine & Critical Care',
      hospital: 'AIIMS New Delhi',
      chiefComplaint: 'Acute spike in fever (101.2 F), severe throat pain, difficulty swallowing, productive cough.',
      diagnosis: 'Acute Streptococcal Pharyngotonsillitis with reactive lymphadenopathy.',
      vitals: {
        bp: '142/92 mmHg',
        pulse: '92 bpm',
        temp: '101.2 F',
        spo2: '96%',
        weight: '76.5 kg'
      },
      prescribedMedicines: [
        {
          brandName: 'Augmentin 625 Duo',
          genericSalt: 'Amoxicillin 500mg + Clavulanic Acid 125mg (Jan Aushadhi #JA-8491)',
          dosage: '625mg',
          frequency: '1-0-1 After Meals',
          duration: '5 Days'
        },
        {
          brandName: 'Calpol 650',
          genericSalt: 'Paracetamol 650mg',
          dosage: '650mg',
          frequency: 'SOS (Every 6-8 hrs if temp > 100 F)',
          duration: '3 Days'
        },
        {
          brandName: 'Betadine 2% Gargle',
          genericSalt: 'Povidone Iodine 2% w/v',
          dosage: '5ml in warm water',
          frequency: 'Thrice Daily',
          duration: '5 Days'
        }
      ],
      clinicalNotes: 'Patient was visibly fatigued, posture slumped with antalgic neck guarding. Throat showed bilateral 2+ tonsillar hypertrophy with creamy exudates. Advised hydration & vocal rest.',
      followUpAdvised: 'Telehealth review in 10-14 days for post-antibiotic symptom resolution.'
    },
    {
      id: 'cons-02',
      date: '18 Apr 2025',
      doctorName: 'Dr. Rajesh Gupta',
      doctorSpecialty: 'Cardiology & Vascular Medicine',
      hospital: 'Safdarjung Hospital, New Delhi',
      chiefComplaint: 'Quarterly hypertension and diabetes routine review. Occasional morning dizziness.',
      diagnosis: 'Essential Hypertension (Well Controlled) + T2D on Metformin.',
      vitals: {
        bp: '130/84 mmHg',
        pulse: '78 bpm',
        temp: '98.4 F',
        spo2: '98%',
        weight: '77.1 kg'
      },
      prescribedMedicines: [
        {
          brandName: 'Telma 40',
          genericSalt: 'Telmisartan 40mg',
          dosage: '40mg',
          frequency: '1-0-0 Morning',
          duration: '90 Days Refill'
        },
        {
          brandName: 'Glycomet 500',
          genericSalt: 'Metformin Hydrochloride 500mg',
          dosage: '500mg',
          frequency: '1-0-1 Post Meals',
          duration: '90 Days Refill'
        }
      ],
      clinicalNotes: 'Cardiovascular exam normal (S1, S2 audible, no murmur). Fundoscopy showed no hypertensive retinopathy signs. Continue Jan Aushadhi generic dispensary supply.',
      followUpAdvised: 'Routine 6-month checkup with lipid profile & microalbuminuria.'
    }
  ],
  cameraActivityComparison: {
    lastVisitDate: '14 August 2025 (Acute Pharyngitis Consultation)',
    overallImprovementScore: 88,
    metrics: [
      {
        metric: 'Posture & Spinal Ergonomics',
        currentValue: 'Erect, relaxed spinal alignment (No guarding)',
        baselineValue: 'Slumped forward, antalgic neck flexion due to pain',
        changeStatus: 'Improved',
        percentageChange: '+72% Posture Stability',
        clinicalSignificance: 'Resolution of somatic discomfort and chest/neck guarding.'
      },
      {
        metric: 'Estimated Respiratory Rate (Chest Motion)',
        currentValue: '17 - 19 breaths/min (Eupneic, calm)',
        baselineValue: '24 - 26 breaths/min (Tachypneic, shallow)',
        changeStatus: 'Improved',
        percentageChange: '-27% Rate Normalization',
        clinicalSignificance: 'Clear resolution of airway resistance and febrile hyperventilation.'
      },
      {
        metric: 'Facial Tension & Pain Expression Index',
        currentValue: '2 / 10 (Mild / Relaxed brow & periorbital)',
        baselineValue: '7 / 10 (Moderate-to-severe grimacing on swallowing)',
        changeStatus: 'Improved',
        percentageChange: '-71% Pain Reduction',
        clinicalSignificance: 'Visual analgesia corroborates healing of pharyngeal mucosa.'
      },
      {
        metric: 'Eye Tracking & Cognitive Alertness',
        currentValue: '94% (Direct eye contact, rapid saccadic response)',
        baselineValue: '68% (Fatigued, ptosis, delayed focus)',
        changeStatus: 'Improved',
        percentageChange: '+38% Alertness Gain',
        clinicalSignificance: 'Restoration of normal neurological alertness and resolution of malaise.'
      },
      {
        metric: 'Motor Tremor & Involuntary Restlessness',
        currentValue: '0.4 mm micro-deviation (Normal physiological limits)',
        baselineValue: '1.9 mm amplitude (Postural rigors & shivering)',
        changeStatus: 'Improved',
        percentageChange: '-78% Tremor Reduction',
        clinicalSignificance: 'Fever chills completely resolved; steady motor control observed.'
      },
      {
        metric: 'Facial Symmetry Index',
        currentValue: '98% Bilateral Symmetry (Normal cranial nerve VII)',
        baselineValue: '96% Bilateral Symmetry',
        changeStatus: 'Stable',
        percentageChange: 'Normal (< 2% variance)',
        clinicalSignificance: 'No neurological asymmetry, Bell palsy, or facial nerve deficit.'
      }
    ],
    doctorVisualImpression: 'Patient demonstrates robust visual and biomechanical recovery compared to previous visit. Normal respiratory excursion, active ocular engagement, and resolution of posture antalgia.'
  }
};
