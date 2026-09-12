import {
  Doctor,
  HospitalFacility,
  MedicineItem,
  GovernmentScheme,
  Appointment,
  Prescription,
  EmergencySOS
} from '../types';

export const MOCK_DOCTORS: Doctor[] = [
  {
    id: 'doc-1',
    name: 'Dr. Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
    specialty: 'Cardiology',
    qualification: 'MBBS, MD, DM (Cardiology) - AIIMS',
    experienceYears: 14,
    rating: 4.9,
    reviewsCount: 342,
    consultationFee: 600,
    isPmjayEmpanelled: true,
    hospital: 'Apex Heart & Vascular Institute',
    location: 'Central Metro Hub',
    languages: ['English', 'Hindi'],
    isAvailableToday: true,
    availableSlots: ['10:00 AM', '11:30 AM', '02:00 PM', '04:30 PM', '06:00 PM'],
    telehealthEnabled: true,
    about: 'Senior Interventional Cardiologist specializing in preventive heart health, coronary artery disease management, hypertension, and post-angioplasty care.'
  },
  {
    id: 'doc-2',
    name: 'Dr. Rajesh Deshmukh',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80',
    specialty: 'General Medicine & Diabetology',
    qualification: 'MBBS, MD (General Medicine) - KEM Mumbai',
    experienceYears: 18,
    rating: 4.8,
    reviewsCount: 520,
    consultationFee: 400,
    isPmjayEmpanelled: true,
    hospital: 'Civil District Hospital',
    location: 'North Zone',
    languages: ['English', 'Hindi', 'Marathi'],
    isAvailableToday: true,
    availableSlots: ['09:30 AM', '11:00 AM', '01:30 PM', '03:30 PM', '05:00 PM'],
    telehealthEnabled: true,
    about: 'Expert physician focused on chronic metabolic disorders, diabetes reversal lifestyle planning, infectious diseases, and comprehensive family healthcare.'
  },
  {
    id: 'doc-3',
    name: 'Dr. Ananya Sen',
    avatar: '/dr-ananya-sen.jpg',
    specialty: 'Pulmonology & Critical Care',
    qualification: 'MBBS, DNB (Respiratory Medicine), FCCP',
    experienceYears: 11,
    rating: 4.9,
    reviewsCount: 280,
    consultationFee: 550,
    isPmjayEmpanelled: true,
    hospital: 'City Care Super Specialty Hospital',
    location: 'East Sector',
    languages: ['English', 'Hindi', 'Bengali'],
    isAvailableToday: true,
    availableSlots: ['10:30 AM', '12:00 PM', '03:00 PM', '05:30 PM'],
    telehealthEnabled: true,
    about: 'Specialized in asthma, COPD, post-viral respiratory fibrosis, sleep apnea, and allergy immunotherapy.'
  },
  {
    id: 'doc-4',
    name: 'Dr. Vikramaditya Rao',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80',
    specialty: 'Orthopedics & Joint Replacement',
    qualification: 'MBBS, MS (Ortho), MCh (Joint Reconstructive Surgery)',
    experienceYears: 16,
    rating: 4.7,
    reviewsCount: 410,
    consultationFee: 650,
    isPmjayEmpanelled: false,
    hospital: 'Fortis Bone & Joint Centre',
    location: 'South Extension',
    languages: ['English', 'Hindi', 'Telugu'],
    isAvailableToday: false,
    availableSlots: ['Tomorrow 09:00 AM', 'Tomorrow 11:30 AM', 'Tomorrow 03:00 PM'],
    telehealthEnabled: true,
    about: 'Specialist in minimally invasive knee and hip replacements, sports injury arthroscopy, and osteoporosis management.'
  },
  {
    id: 'doc-5',
    name: 'Dr. Sunita Patel',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80',
    specialty: 'Pediatrics & Neonatology',
    qualification: 'MBBS, DCH, MD (Pediatrics)',
    experienceYears: 12,
    rating: 4.9,
    reviewsCount: 630,
    consultationFee: 450,
    isPmjayEmpanelled: true,
    hospital: 'Mother & Child Care Memorial',
    location: 'West Avenue',
    languages: ['English', 'Hindi', 'Gujarati'],
    isAvailableToday: true,
    availableSlots: ['11:00 AM', '12:30 PM', '04:00 PM', '06:30 PM'],
    telehealthEnabled: true,
    about: 'Compassionate pediatrician focusing on developmental milestones, newborn care, pediatric nutrition, and seasonal immunization schedules.'
  },
  {
    id: 'doc-6',
    name: 'Dr. Mohammed Tariq',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80',
    specialty: 'Neurology',
    qualification: 'MBBS, MD, DM (Neurology)',
    experienceYears: 15,
    rating: 4.8,
    reviewsCount: 295,
    consultationFee: 700,
    isPmjayEmpanelled: true,
    hospital: 'Neuro Life Super Specialty Center',
    location: 'Central Metro Hub',
    languages: ['English', 'Hindi', 'Urdu'],
    isAvailableToday: true,
    availableSlots: ['02:00 PM', '03:30 PM', '05:00 PM', '06:30 PM'],
    telehealthEnabled: true,
    about: 'Expert in migraine protocols, stroke recovery, epilepsy control, neuropathic pain, and Parkinson disorder therapies.'
  }
];

export const MOCK_HOSPITALS: HospitalFacility[] = [
  {
    id: 'hosp-1',
    name: 'All India Institute of Medical Sciences (AIIMS Campus)',
    type: 'Government Super Specialty',
    address: 'Ring Road, Ansari Nagar Medical Enclave',
    city: 'Central District',
    distanceKm: 2.8,
    phone: '+91 11 2658 8500',
    emergencyPhone: '108 / +91 11 2659 4405',
    rating: 4.9,
    isPmjayEmpanelled: true,
    totalBeds: 1200,
    availableGeneralBeds: 142,
    availableICUBeds: 18,
    availableVentilatorBeds: 7,
    oxygenStatus: 'Adequate',
    bloodBankInventory: { 'A+': 34, 'A-': 12, 'B+': 45, 'B-': 8, 'O+': 52, 'O-': 14, 'AB+': 22, 'AB-': 5 },
    departments: ['Emergency Trauma (24x7)', 'Cardiology', 'Neurology', 'Oncology', 'Organ Transplant', 'Pediatric ICU', 'Burns & Plastic Surgery'],
    emergencyWaitTimeMins: 12,
    coordinates: { lat: 28.5672, lng: 77.2100 }
  },
  {
    id: 'hosp-2',
    name: 'Civil District General Hospital & Trauma Centre',
    type: 'District Hospital',
    address: 'Hospital Road, Sector 12',
    city: 'North Zone',
    distanceKm: 4.3,
    phone: '+91 11 2789 1100',
    emergencyPhone: '108 / +91 11 2789 1199',
    rating: 4.4,
    isPmjayEmpanelled: true,
    totalBeds: 650,
    availableGeneralBeds: 88,
    availableICUBeds: 11,
    availableVentilatorBeds: 4,
    oxygenStatus: 'Adequate',
    bloodBankInventory: { 'A+': 25, 'A-': 6, 'B+': 32, 'B-': 4, 'O+': 38, 'O-': 9, 'AB+': 15, 'AB-': 3 },
    departments: ['Emergency 24x7', 'General Surgery', 'Orthopedics', 'Maternity / NICU', 'Dialysis Centre', 'Jan Aushadhi Kendra In-House'],
    emergencyWaitTimeMins: 15,
    coordinates: { lat: 28.6139, lng: 77.2090 }
  },
  {
    id: 'hosp-3',
    name: 'Apex Heart & Super Specialty Medical Institute',
    type: 'Private Multi-Specialty',
    address: 'Plot 4, Expressway Health Boulevard',
    city: 'South Extension',
    distanceKm: 6.1,
    phone: '+91 11 4500 9000',
    emergencyPhone: '+91 11 4500 9108',
    rating: 4.8,
    isPmjayEmpanelled: true,
    totalBeds: 450,
    availableGeneralBeds: 62,
    availableICUBeds: 14,
    availableVentilatorBeds: 6,
    oxygenStatus: 'Adequate',
    bloodBankInventory: { 'A+': 20, 'A-': 8, 'B+': 28, 'B-': 7, 'O+': 35, 'O-': 11, 'AB+': 18, 'AB-': 4 },
    departments: ['Cath Lab 24x7', 'Cardiothoracic Surgery', 'Neuro ICU', 'Critical Care', 'Robotic Surgery', 'Coronary Care Unit (CCU)'],
    emergencyWaitTimeMins: 5,
    coordinates: { lat: 28.5355, lng: 77.2410 }
  },
  {
    id: 'hosp-4',
    name: 'Jan Seva Charitable Community Hospital',
    type: 'Charitable Trauma Center',
    address: 'Old Market Road, Block C',
    city: 'East Sector',
    distanceKm: 7.8,
    phone: '+91 11 2341 5566',
    emergencyPhone: '108 / +91 11 2341 5500',
    rating: 4.6,
    isPmjayEmpanelled: true,
    totalBeds: 280,
    availableGeneralBeds: 45,
    availableICUBeds: 6,
    availableVentilatorBeds: 2,
    oxygenStatus: 'Adequate',
    bloodBankInventory: { 'A+': 14, 'A-': 3, 'B+': 19, 'B-': 2, 'O+': 22, 'O-': 5, 'AB+': 8, 'AB-': 1 },
    departments: ['24x7 Casualty', 'Mother & Child Care', 'Ophthalmology (Free Cataract)', 'General Medicine', 'Free Jan Aushadhi Dispensary'],
    emergencyWaitTimeMins: 10,
    coordinates: { lat: 28.6289, lng: 77.2789 }
  }
];

export const MOCK_MEDICINES: MedicineItem[] = [
  {
    id: 'med-1',
    brandName: 'Augmentin 625 Duo Tablet',
    genericName: 'Amoxycillin and Potassium Clavulanate Tablets IP (500mg + 125mg)',
    composition: 'Amoxicillin (500mg) + Clavulanic Acid (125mg)',
    category: 'Antibiotic / Bacterial Infections',
    brandPrice: 224,
    genericPrice: 58,
    savingsPercentage: 74,
    unit: '10 Tablets Strip',
    janAushadhiAvailable: true,
    usageDescription: 'Used for bacterial respiratory tract infections, pneumonia, ear-nose-throat infections, skin and soft tissue infections.',
    dosageGuidelines: '1 tablet twice daily with meals or as advised by physician. Complete the full course.',
    sideEffects: ['Mild nausea', 'Diarrhea', 'Stomach upset'],
    inStockKendrasCount: 42,
    stockUnits: 480,
    thresholdUnits: 100,
    imageUrl: '/medicines/augmentin-625.jpg'
  },
  {
    id: 'med-2',
    brandName: 'Glycomet-GP 2 Tablet',
    genericName: 'Metformin Hydrochloride (500mg) + Glimepiride (2mg) Tablets IP',
    composition: 'Metformin (500mg) + Glimepiride (2mg)',
    category: 'Anti-Diabetic / Type 2 Diabetes',
    brandPrice: 198,
    genericPrice: 28,
    savingsPercentage: 86,
    unit: '15 Tablets Strip',
    janAushadhiAvailable: true,
    usageDescription: 'Controls blood glucose levels in adults with Type-2 Diabetes Mellitus when diet and single agent are insufficient.',
    dosageGuidelines: '1 tablet once daily with morning breakfast.',
    sideEffects: ['Hypoglycemia (if skipped meals)', 'Mild gastrointestinal discomfort'],
    inStockKendrasCount: 56,
    stockUnits: 1200,
    thresholdUnits: 200,
    imageUrl: '/medicines/glycomet-gp2.jpg'
  },
  {
    id: 'med-3',
    brandName: 'Lipitor / Atorva 20mg',
    genericName: 'Atorvastatin Calcium Tablets IP 20mg',
    composition: 'Atorvastatin (20mg)',
    category: 'Cardiovascular / Cholesterol Control',
    brandPrice: 310,
    genericPrice: 38,
    savingsPercentage: 88,
    unit: '15 Tablets Strip',
    janAushadhiAvailable: true,
    usageDescription: 'Lowers bad cholesterol (LDL) and triglycerides; reduces heart attack and stroke risk in high-risk cardiovascular patients.',
    dosageGuidelines: '1 tablet at bedtime, once daily.',
    sideEffects: ['Mild muscle aches', 'Headache'],
    inStockKendrasCount: 49,
    stockUnits: 85,
    thresholdUnits: 150,
    imageUrl: '/medicines/lipitor-atorva.jpg'
  },
  {
    id: 'med-4',
    brandName: 'Pantocid 40 / Pan 40',
    genericName: 'Pantoprazole Gastro-resistant Tablets IP 40mg',
    composition: 'Pantoprazole Sodium (40mg)',
    category: 'Gastrointestinal / Acidity & GERD',
    brandPrice: 165,
    genericPrice: 22,
    savingsPercentage: 87,
    unit: '15 Tablets Strip',
    janAushadhiAvailable: true,
    usageDescription: 'Treats acid reflux, heartburn, GERD, and peptic ulcers by reducing stomach acid secretion.',
    dosageGuidelines: '1 tablet in the morning 30 minutes before breakfast.',
    sideEffects: ['Mild dry mouth', 'Headache'],
    inStockKendrasCount: 68,
    stockUnits: 650,
    thresholdUnits: 100,
    imageUrl: '/medicines/pantocid-40.jpg'
  },
  {
    id: 'med-5',
    brandName: 'Telma 40mg',
    genericName: 'Telmisartan Tablets IP 40mg',
    composition: 'Telmisartan (40mg)',
    category: 'Hypertension / Blood Pressure',
    brandPrice: 215,
    genericPrice: 24,
    savingsPercentage: 89,
    unit: '15 Tablets Strip',
    janAushadhiAvailable: true,
    usageDescription: 'Manages high blood pressure (hypertension) and protects kidneys in diabetic hypertension.',
    dosageGuidelines: '1 tablet daily at a fixed time.',
    sideEffects: ['Dizziness when standing rapidly', 'Fatigue'],
    inStockKendrasCount: 51,
    stockUnits: 42,
    thresholdUnits: 100,
    imageUrl: '/medicines/telma-40.jpg'
  },
  {
    id: 'med-6',
    brandName: 'Azithral 500mg',
    genericName: 'Azithromycin Tablets IP 500mg',
    composition: 'Azithromycin (500mg)',
    category: 'Antibiotic / Chest & Throat Infections',
    brandPrice: 135,
    genericPrice: 35,
    savingsPercentage: 74,
    unit: '5 Tablets Pack',
    janAushadhiAvailable: true,
    usageDescription: 'Broad-spectrum antibiotic for throat infections, tonsillitis, sinus, and community-acquired chest infections.',
    dosageGuidelines: '1 tablet once daily 1 hour before or 2 hours after meals for 3-5 days.',
    sideEffects: ['Abdominal cramps', 'Mild nausea'],
    inStockKendrasCount: 60,
    stockUnits: 320,
    thresholdUnits: 80,
    imageUrl: '/medicines/azithral-500.jpg'
  },
  {
    id: 'med-7',
    brandName: 'Calpol 650 / Dolo 650',
    genericName: 'Paracetamol Tablets IP 650mg',
    composition: 'Paracetamol (650mg)',
    category: 'Analgesic & Antipyretic / Fever & Pain',
    brandPrice: 34,
    genericPrice: 9.5,
    savingsPercentage: 72,
    unit: '15 Tablets Strip',
    janAushadhiAvailable: true,
    usageDescription: 'Relieves fever, headache, body aches, muscle pain, and joint discomfort.',
    dosageGuidelines: '1 tablet every 6-8 hours as needed for fever. Maximum 4 tablets in 24 hours.',
    sideEffects: ['Safe at therapeutic dose; do not exceed daily limit'],
    inStockKendrasCount: 92,
    stockUnits: 2400,
    thresholdUnits: 300,
    imageUrl: '/medicines/calpol-650.jpg'
  }
];

export const MOCK_SCHEMES: GovernmentScheme[] = [
  {
    id: 'scheme-1',
    name: 'Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
    shortName: 'AB PM-JAY',
    ministry: 'Ministry of Health and Family Welfare (National Health Authority)',
    coverageAmount: '₹5,00,000 per family / year',
    tagline: 'World’s largest government-funded health assurance program providing cashless hospitalization.',
    description: 'Provides cashless and paperless access to healthcare services for secondary and tertiary care hospitalizations across 28,000+ empanelled public and private hospitals across the nation.',
    eligibilityCriteria: [
      'Identified under SECC 2011 rural and urban occupational criteria',
      'Families holding Antyodaya Anna Yojana (AAY) or Priority Household Ration Cards',
      'Senior citizens aged 70+ (Universal ₹5 Lakh top-up cover)',
      'No cap on family size or age of family members'
    ],
    benefits: [
      'Cashless treatment up to ₹5 Lakh/year across all empanelled hospitals',
      '1,949+ medical treatment procedures covered (cardiac, oncology, neuro, knee replacements, dialysis)',
      'Pre and post-hospitalization expenses (3 days prior & 15 days post-discharge medications)',
      'No pre-existing condition exclusions - covered from Day 1'
    ],
    requiredDocuments: [
      'Aadhaar Card of all family members',
      'Ration Card / Family ID document',
      'Active mobile number for OTP verification'
    ],
    applicableHospitalsCount: 28400,
    howToApply: [
      'Step 1: Check your name in SECC / Beneficiary database at beneficiary.nha.gov.in or nearest CSC Kendra.',
      'Step 2: Complete e-KYC using Aadhaar biometric or OTP.',
      'Step 3: Generate Ayushman PVC Card with unique PM-JAY ID.',
      'Step 4: Show card at any Empanelled Hospital Ayushman Mitra desk for cashless admission.'
    ],
    officialPortalUrl: 'https://beneficiary.nha.gov.in',
    helpline: '14555 / 1800-111-565'
  },
  {
    id: 'scheme-2',
    name: 'Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP)',
    shortName: 'PMBJP Jan Aushadhi',
    ministry: 'Department of Pharmaceuticals, Ministry of Chemicals and Fertilizers',
    coverageAmount: '50% to 90% Direct Price Savings on 2,000+ Medicines',
    tagline: 'Quality generic medicines and surgical products accessible to every citizen at affordable prices.',
    description: 'Operates dedicated Jan Aushadhi Kendras dispensing high-quality WHO-GMP certified generic medicines at a fraction of brand market prices, reducing out-of-pocket medical expenses.',
    eligibilityCriteria: [
      'Universal eligibility - Open to all citizens with a valid doctor prescription',
      'No income certificate or ration card required'
    ],
    benefits: [
      'Access to 2,047 generic medicines and 300 surgical items',
      'Prices are 50% to 90% lower than corresponding branded formulations',
      'Rigorous testing in NABL accredited laboratories for bio-equivalence and potency',
      'Sanitary pads available at ₹1 per pad (Suvidha brand)'
    ],
    requiredDocuments: [
      'Doctor Prescription (Physical or Digital e-Prescription)',
      'No ID card mandatory'
    ],
    applicableHospitalsCount: 14200,
    howToApply: [
      'Step 1: Get prescription written by your physician with generic salt names.',
      'Step 2: Locate nearest Jan Aushadhi Kendra using the HealthBridge Kendra Locator.',
      'Step 3: Present prescription and purchase generic medicines with immediate printed invoice.'
    ],
    officialPortalUrl: 'http://janaushadhi.gov.in',
    helpline: '1800-180-8080'
  },
  {
    id: 'scheme-3',
    name: 'Rashtriya Arogya Nidhi (RAN) & Rare Diseases Financial Assistance',
    shortName: 'RAN & Rare Diseases',
    ministry: 'Ministry of Health & Family Welfare',
    coverageAmount: 'Up to ₹50,00,000 for Rare Diseases & ₹15,00,000 for Life Threatening Ailments',
    tagline: 'One-time financial assistance for patients below poverty line suffering from major life-threatening diseases.',
    description: 'Financial aid provided to patients suffering from severe heart ailments, cancer, renal failure, and rare genetic disorders receiving treatment at Government Super Specialty Institutes.',
    eligibilityCriteria: [
      'Patients living below poverty line (BPL)',
      'Treatment must be availed in Government tertiary hospitals (e.g. AIIMS, PGIMER, JIPMER)',
      'Not covered under CGHS or other government reimbursement mechanisms'
    ],
    benefits: [
      'Direct grant release to the treating Government Hospital',
      'Covers life-saving surgeries, chemotherapy, bone marrow transplants, and specialized implants'
    ],
    requiredDocuments: [
      'Income Certificate issued by Revenue Authority (BPL proof)',
      'Detailed cost estimate and treatment recommendation from Hospital Medical Superintendent',
      'Aadhaar and Voter ID proof'
    ],
    applicableHospitalsCount: 85,
    howToApply: [
      'Step 1: Obtain proforma estimate from treating Government Hospital.',
      'Step 2: Submit application to Medical Superintendent / RAN nodal officer at the institute.',
      'Step 3: Funds transferred directly to patient treatment account at hospital.'
    ],
    officialPortalUrl: 'https://mohfw.gov.in/schemes/ran',
    helpline: '011-2306 1445'
  },
  {
    id: 'scheme-4',
    name: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
    shortName: 'PMMVY Maternal Benefit',
    ministry: 'Ministry of Women and Child Development',
    coverageAmount: '₹5,000 to ₹6,000 Direct Cash Benefit',
    tagline: 'Conditional cash transfer scheme for pregnant women and lactating mothers.',
    description: 'Direct Benefit Transfer (DBT) to maternal bank accounts to provide compensation for wage loss and ensure adequate nutrition during pregnancy and safe institutional delivery.',
    eligibilityCriteria: [
      'Pregnant women and lactating mothers for the first living child (₹5,000) and second child if girl (₹6,000)',
      'Not in regular employment with Central/State Govt or PSUs'
    ],
    benefits: [
      'Direct cash transfer into Aadhaar-seeded bank account in installments',
      'Free ante-natal checkups (ANC) and institutional delivery incentives',
      'Free child vaccination up to first cycle'
    ],
    requiredDocuments: [
      'Mother and Child Protection (MCP) Card',
      'Aadhaar card of mother and husband',
      'Bank passbook details with IFSC code'
    ],
    applicableHospitalsCount: 45000,
    howToApply: [
      'Step 1: Register pregnancy at local Anganwadi Centre or Government PHC within 150 days of LMP.',
      'Step 2: Submit Form 1A along with MCP card copy and Aadhaar.',
      'Step 3: Cash incentive credited via DBT directly to bank account.'
    ],
    officialPortalUrl: 'https://pmmvy.wcd.gov.in',
    helpline: '011-2338 2393'
  }
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    patientId: 'pat-1',
    patientName: 'Rahul Verma',
    patientPhone: '+91 6200488260',
    patientAge: 42,
    patientGender: 'Male',
    doctorId: 'doc-1',
    doctorName: 'Dr. Priya Sharma',
    doctorSpecialty: 'Cardiology',
    hospitalName: 'Apex Heart & Vascular Institute',
    date: '2026-09-02',
    timeSlot: '11:30 AM',
    type: 'telehealth',
    status: 'upcoming',
    symptoms: 'Mild chest heaviness post-walking, elevated resting BP 142/92',
    meetRoomId: 'room-cardio-9982',
    notes: 'Follow-up for lipid profile and 2D Echo review'
  },
  {
    id: 'apt-102',
    patientId: 'pat-1',
    patientName: 'Rahul Verma',
    patientPhone: '+91 6200488260',
    patientAge: 42,
    patientGender: 'Male',
    doctorId: 'doc-2',
    doctorName: 'Dr. Rajesh Deshmukh',
    doctorSpecialty: 'General Medicine & Diabetology',
    hospitalName: 'Civil District Hospital',
    date: '2026-08-20',
    timeSlot: '02:00 PM',
    type: 'in-person',
    status: 'completed',
    symptoms: 'Fasting glucose check, routine seasonal viral check',
    prescriptionId: 'rx-2026-881'
  }
];

export const MOCK_PRESCRIPTIONS: Prescription[] = [
  {
    id: 'rx-2026-881',
    appointmentId: 'apt-102',
    patientId: 'pat-1',
    patientName: 'Rahul Verma',
    patientAge: 42,
    patientGender: 'Male',
    doctorId: 'doc-2',
    doctorName: 'Dr. Rajesh Deshmukh',
    doctorSpecialty: 'General Medicine & Diabetology',
    doctorRegNo: 'MCI-2008-84729',
    hospital: 'Civil District Hospital',
    date: '2026-08-20',
    vitals: {
      bloodPressure: '138/88 mmHg',
      heartRate: '76 bpm',
      temperature: '98.4 °F',
      spO2: '99%',
      weightKg: 74
    },
    diagnosis: 'Mild Essential Hypertension & Pre-diabetes (HbA1c 6.1%)',
    medicines: [
      {
        medicineName: 'Telmisartan Tablets IP 40mg (Generic)',
        isGeneric: true,
        genericAlternative: 'Telma 40mg (Branded ₹215 -> Generic ₹24)',
        dosage: '40mg',
        frequency: '1-0-0 (Morning after breakfast)',
        duration: '30 Days',
        instructions: 'Take regularly at fixed time. Monitor BP weekly.'
      },
      {
        medicineName: 'Metformin Hydrochloride Tablets IP 500mg (Generic)',
        isGeneric: true,
        genericAlternative: 'Glycomet 500 (Branded ₹85 -> Generic ₹14)',
        dosage: '500mg',
        frequency: '0-0-1 (Night after dinner)',
        duration: '30 Days',
        instructions: 'Take after heavy meals to avoid gastric discomfort.'
      },
      {
        medicineName: 'Pantoprazole Tablets IP 40mg',
        isGeneric: true,
        dosage: '40mg',
        frequency: '1-0-0 (Empty stomach, 30 min before food)',
        duration: '14 Days',
        instructions: 'Take in morning with a glass of water.'
      }
    ],
    dietAdvice: 'Low sodium diet (<5g/day), brisk walking 30 mins daily, avoid refined sugars.',
    followUpDate: '2026-09-20',
    digitalSignatureHash: 'SHA256:8f4c2e91b0d774a3f12c6a99e82938174'
  }
];

export const MOCK_EMERGENCY_SOS: EmergencySOS = {
  id: 'sos-9912',
  callerName: 'Rahul Verma',
  callerPhone: '+91 6200488260',
  location: {
    lat: 28.5672,
    lng: 77.2100,
    addressText: 'Near Metro Pillar 142, Ring Road Junction, Central District'
  },
  emergencyType: 'Cardiac Arrest',
  priority: 'CRITICAL_P1',
  status: 'EN_ROUTE',
  assignedAmbulance: {
    vehicleNo: 'DL-01-EM-1088',
    driverName: 'Suresh Kumar',
    driverPhone: '+91 98112 34567',
    paramedicName: 'Ramesh Chandra (Certified ACLS Paramedic)',
    type: 'ALS (Advanced Life Support)',
    currentEtaMinutes: 4
  },
  destinationHospital: {
    name: 'All India Institute of Medical Sciences (AIIMS) - Emergency Trauma Unit',
    distanceKm: 1.8,
    emergencyTraumaPhone: '+91 11 2659 4405'
  },
  timestamp: new Date().toISOString()
};
