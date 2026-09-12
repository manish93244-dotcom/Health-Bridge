export type UserRole = 'patient' | 'doctor' | 'pharmacy' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  avatar: string;
  abhaId?: string; // Ayushman Bharat Health Account ID
  bloodGroup?: string;
  allergies?: string[];
  emergencyContacts?: { name: string; relation: string; phone: string }[];
  doctorDetails?: {
    specialty: string;
    qualification: string;
    experienceYears: number;
    regNumber: string;
    hospital: string;
    consultationFee: number;
    rating: number;
    reviewsCount: number;
  };
  pharmacyDetails?: {
    storeName: string;
    kendraCode: string;
    licenseNumber: string;
    address: string;
  };
}

export interface Doctor {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  qualification: string;
  experienceYears: number;
  rating: number;
  reviewsCount: number;
  consultationFee: number;
  isPmjayEmpanelled: boolean;
  hospital: string;
  location: string;
  languages: string[];
  isAvailableToday: boolean;
  availableSlots: string[];
  telehealthEnabled: boolean;
  about: string;
}

export interface HospitalFacility {
  id: string;
  name: string;
  type: 'Government Super Specialty' | 'District Hospital' | 'Private Multi-Specialty' | 'Charitable Trauma Center' | 'Community Health Center';
  address: string;
  city: string;
  distanceKm: number;
  phone: string;
  emergencyPhone: string;
  rating: number;
  isPmjayEmpanelled: boolean;
  totalBeds: number;
  availableGeneralBeds: number;
  availableICUBeds: number;
  availableVentilatorBeds: number;
  oxygenStatus: 'Adequate' | 'High' | 'Critical';
  bloodBankInventory: { [group: string]: number }; // units available
  departments: string[];
  emergencyWaitTimeMins: number;
  coordinates: { lat: number; lng: number };
}

export interface MedicineItem {
  id: string;
  brandName: string;
  genericName: string;
  composition: string;
  category: string;
  brandPrice: number;
  genericPrice: number;
  savingsPercentage: number;
  unit: string;
  janAushadhiAvailable: boolean;
  usageDescription: string;
  dosageGuidelines: string;
  sideEffects: string[];
  inStockKendrasCount: number;
  stockUnits?: number;
  thresholdUnits?: number;
  imageUrl?: string;
}

export interface GovernmentScheme {
  id: string;
  name: string;
  shortName: string;
  ministry: string;
  coverageAmount: string;
  tagline: string;
  description: string;
  eligibilityCriteria: string[];
  benefits: string[];
  requiredDocuments: string[];
  applicableHospitalsCount: number;
  howToApply: string[];
  officialPortalUrl: string;
  helpline: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone: string;
  patientAge: number;
  patientGender: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  hospitalName: string;
  date: string;
  timeSlot: string;
  type: 'telehealth' | 'in-person';
  status: 'upcoming' | 'completed' | 'cancelled' | 'in-progress';
  symptoms: string;
  meetRoomId?: string;
  notes?: string;
  prescriptionId?: string;
}

export interface PrescriptionMedicine {
  medicineName: string;
  isGeneric: boolean;
  genericAlternative?: string;
  dosage: string; // e.g. "500mg"
  frequency: string; // e.g. "1-0-1 (After Food)"
  duration: string; // e.g. "5 Days"
  instructions: string;
}

export interface Prescription {
  id: string;
  appointmentId?: string;
  patientId: string;
  patientName: string;
  patientAge: number;
  patientGender: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorRegNo: string;
  hospital: string;
  date: string;
  vitals: {
    bloodPressure?: string;
    heartRate?: string;
    temperature?: string;
    spO2?: string;
    weightKg?: number;
  };
  diagnosis: string;
  medicines: PrescriptionMedicine[];
  dietAdvice?: string;
  followUpDate?: string;
  digitalSignatureHash: string;
}

export interface EmergencySOS {
  id: string;
  callerName: string;
  callerPhone: string;
  location: {
    lat: number;
    lng: number;
    addressText: string;
  };
  emergencyType: 'Cardiac Arrest' | 'Trauma / Road Accident' | 'Severe Respiratory' | 'Maternity Emergency' | 'Stroke / Neurological' | 'Other Critical';
  priority: 'CRITICAL_P1' | 'HIGH_P2' | 'MEDIUM_P3';
  status: 'DISPATCHED' | 'EN_ROUTE' | 'ON_SCENE' | 'REACHED_HOSPITAL' | 'RESOLVED';
  assignedAmbulance?: {
    vehicleNo: string;
    driverName: string;
    driverPhone: string;
    paramedicName: string;
    type: 'ALS (Advanced Life Support)' | 'BLS (Basic Life Support)' | 'Neonatal ICU Ambulance';
    currentEtaMinutes: number;
  };
  destinationHospital?: {
    name: string;
    distanceKm: number;
    emergencyTraumaPhone: string;
  };
  timestamp: string;
}

export interface SymptomTriageResult {
  riskLevel: 'Mild / Home Care' | 'Moderate / See Doctor' | 'Emergency / Immediate Medical Attention';
  severityScore: number; // 1-10
  possibleCauses: string[];
  recommendedSpecialist: string;
  recommendedAction: string;
  redFlags: string[];
  firstAidAdvice: string[];
  suggestedQuestionsForDoctor: string[];
}
