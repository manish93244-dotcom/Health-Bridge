import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Doctor,
  HospitalFacility,
  MedicineItem,
  GovernmentScheme,
  Appointment,
  Prescription,
  EmergencySOS
} from '../types';
import {
  MOCK_DOCTORS,
  MOCK_HOSPITALS,
  MOCK_MEDICINES,
  MOCK_SCHEMES,
  MOCK_APPOINTMENTS,
  MOCK_PRESCRIPTIONS,
  MOCK_EMERGENCY_SOS
} from '../data/mockData';
import { SupportedLanguage, Translations, TRANSLATIONS } from '../utils/translations';

interface HealthBridgeContextType {
  language: SupportedLanguage;
  t: Translations;
  setLanguage: (lang: SupportedLanguage) => void;
  doctors: Doctor[];
  hospitals: HospitalFacility[];
  medicines: MedicineItem[];
  schemes: GovernmentScheme[];
  appointments: Appointment[];
  prescriptions: Prescription[];
  activeSOS: EmergencySOS | null;
  savedMedicines: MedicineItem[];
  bookmarkedSchemes: string[];
  aiAssistantOpen: boolean;
  aiInitialPrompt: string;
  currentTelehealthRoom: string | null;
  
  // Actions
  setAiAssistantOpen: (open: boolean) => void;
  openAiWithPrompt: (prompt: string) => void;
  setCurrentTelehealthRoom: (roomId: string | null) => void;
  bookAppointment: (aptData: Omit<Appointment, 'id' | 'status'>) => Promise<Appointment>;
  cancelAppointment: (id: string) => void;
  createPrescription: (rxData: Omit<Prescription, 'id' | 'digitalSignatureHash'>) => Prescription;
  triggerEmergencySOS: (emergencyType: EmergencySOS['emergencyType'], callerName?: string, phone?: string) => Promise<EmergencySOS>;
  cancelSOS: () => void;
  toggleSaveMedicine: (medicine: MedicineItem) => void;
  removeSavedMedicine: (medicineId: string) => void;
  toggleBookmarkScheme: (schemeId: string) => void;
  updateHospitalBedCounts: (hospitalId: string, icuDelta: number, generalDelta: number) => void;
  addMedicine: (medicineData: Omit<MedicineItem, 'id' | 'savingsPercentage'>) => MedicineItem;
  toggleMedicineAvailability: (medicineId: string) => void;
  updateMedicineStock: (medicineId: string, stockUnits: number, isAvailable?: boolean) => void;
  removeMedicine: (medicineId: string) => void;
}

const HealthBridgeContext = createContext<HealthBridgeContextType | undefined>(undefined);

export const HealthBridgeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem('hb_language');
    return (saved === 'hi' || saved === 'en') ? saved : 'en';
  });

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('hb_language', lang);
  };

  const t = TRANSLATIONS[language];

  const [doctors] = useState<Doctor[]>(MOCK_DOCTORS);
  const [hospitals, setHospitals] = useState<HospitalFacility[]>(() => {
    const saved = localStorage.getItem('hb_hospitals');
    return saved ? JSON.parse(saved) : MOCK_HOSPITALS;
  });
  const [medicines, setMedicines] = useState<MedicineItem[]>(() => {
    const saved = localStorage.getItem('hb_medicines');
    return saved ? JSON.parse(saved) : MOCK_MEDICINES;
  });
  const [schemes] = useState<GovernmentScheme[]>(MOCK_SCHEMES);

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('hb_appointments');
    return saved ? JSON.parse(saved) : MOCK_APPOINTMENTS;
  });

  const [prescriptions, setPrescriptions] = useState<Prescription[]>(() => {
    const saved = localStorage.getItem('hb_prescriptions');
    return saved ? JSON.parse(saved) : MOCK_PRESCRIPTIONS;
  });

  const [activeSOS, setActiveSOS] = useState<EmergencySOS | null>(() => {
    const saved = localStorage.getItem('hb_active_sos');
    return saved ? JSON.parse(saved) : null;
  });

  const [savedMedicines, setSavedMedicines] = useState<MedicineItem[]>(() => {
    const saved = localStorage.getItem('hb_saved_meds');
    return saved ? JSON.parse(saved) : [MOCK_MEDICINES[0], MOCK_MEDICINES[2]];
  });

  const [bookmarkedSchemes, setBookmarkedSchemes] = useState<string[]>(() => {
    const saved = localStorage.getItem('hb_bookmarked_schemes');
    return saved ? JSON.parse(saved) : ['scheme-1', 'scheme-2'];
  });

  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [aiInitialPrompt, setAiInitialPrompt] = useState('');
  const [currentTelehealthRoom, setCurrentTelehealthRoom] = useState<string | null>(null);

  // Sync state to local storage
  useEffect(() => {
    localStorage.setItem('hb_hospitals', JSON.stringify(hospitals));
  }, [hospitals]);

  useEffect(() => {
    localStorage.setItem('hb_medicines', JSON.stringify(medicines));
  }, [medicines]);

  useEffect(() => {
    localStorage.setItem('hb_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('hb_prescriptions', JSON.stringify(prescriptions));
  }, [prescriptions]);

  useEffect(() => {
    if (activeSOS) {
      localStorage.setItem('hb_active_sos', JSON.stringify(activeSOS));
    } else {
      localStorage.removeItem('hb_active_sos');
    }
  }, [activeSOS]);

  useEffect(() => {
    localStorage.setItem('hb_saved_meds', JSON.stringify(savedMedicines));
  }, [savedMedicines]);

  useEffect(() => {
    localStorage.setItem('hb_bookmarked_schemes', JSON.stringify(bookmarkedSchemes));
  }, [bookmarkedSchemes]);

  // ETA countdown simulator for active SOS
  useEffect(() => {
    if (!activeSOS || !activeSOS.assignedAmbulance) return;
    const interval = setInterval(() => {
      setActiveSOS(prev => {
        if (!prev || !prev.assignedAmbulance) return prev;
        const currentEta = prev.assignedAmbulance.currentEtaMinutes;
        if (currentEta > 1) {
          return {
            ...prev,
            assignedAmbulance: {
              ...prev.assignedAmbulance,
              currentEtaMinutes: currentEta - 1
            }
          };
        } else if (currentEta === 1) {
          return {
            ...prev,
            status: 'ON_SCENE',
            assignedAmbulance: {
              ...prev.assignedAmbulance,
              currentEtaMinutes: 0
            }
          };
        }
        return prev;
      });
    }, 45000); // simulate realistic time step
    return () => clearInterval(interval);
  }, [activeSOS]);

  const openAiWithPrompt = (prompt: string) => {
    setAiInitialPrompt(prompt);
    setAiAssistantOpen(true);
  };

  const bookAppointment = async (aptData: Omit<Appointment, 'id' | 'status'>): Promise<Appointment> => {
    const newAppointment: Appointment = {
      ...aptData,
      id: `apt-${Date.now().toString().slice(-6)}`,
      status: 'upcoming',
      meetRoomId: aptData.type === 'telehealth' ? `room-${Math.random().toString(36).substring(2, 9)}` : undefined
    };
    setAppointments(prev => [newAppointment, ...prev]);
    return newAppointment;
  };

  const cancelAppointment = (id: string) => {
    setAppointments(prev =>
      prev.map(apt => (apt.id === id ? { ...apt, status: 'cancelled' } : apt))
    );
  };

  const createPrescription = (rxData: Omit<Prescription, 'id' | 'digitalSignatureHash'>): Prescription => {
    const randomHash = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const newRx: Prescription = {
      ...rxData,
      id: `rx-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      digitalSignatureHash: `SHA256:${randomHash}`
    };
    setPrescriptions(prev => [newRx, ...prev]);
    return newRx;
  };

  const triggerEmergencySOS = async (
    emergencyType: EmergencySOS['emergencyType'],
    callerName = 'Rahul Verma',
    phone = '+91 6200488260'
  ): Promise<EmergencySOS> => {
    const nearestHospital = hospitals[0];
    const newSOS: EmergencySOS = {
      id: `sos-${Math.floor(1000 + Math.random() * 9000)}`,
      callerName,
      callerPhone: phone,
      location: {
        lat: 28.5672,
        lng: 77.2100,
        addressText: 'GPS Location: Ring Road Junction / Near Central Metro'
      },
      emergencyType,
      priority: emergencyType === 'Cardiac Arrest' || emergencyType === 'Severe Respiratory' ? 'CRITICAL_P1' : 'HIGH_P2',
      status: 'DISPATCHED',
      assignedAmbulance: {
        vehicleNo: `DL-01-EM-${Math.floor(1000 + Math.random() * 9000)}`,
        driverName: 'Suresh Kumar',
        driverPhone: '+91 98112 34567',
        paramedicName: 'Ramesh Chandra (Certified ACLS Paramedic)',
        type: 'ALS (Advanced Life Support)',
        currentEtaMinutes: 4
      },
      destinationHospital: {
        name: nearestHospital?.name || 'Central Trauma Centre',
        distanceKm: 2.1,
        emergencyTraumaPhone: nearestHospital?.emergencyPhone || '108'
      },
      timestamp: new Date().toISOString()
    };
    setActiveSOS(newSOS);
    return newSOS;
  };

  const cancelSOS = () => {
    setActiveSOS(null);
  };

  const toggleSaveMedicine = (medicine: MedicineItem) => {
    setSavedMedicines(prev => {
      const exists = prev.some(m => m.id === medicine.id);
      if (exists) {
        return prev.filter(m => m.id !== medicine.id);
      } else {
        return [...prev, medicine];
      }
    });
  };

  const removeSavedMedicine = (medicineId: string) => {
    setSavedMedicines(prev => prev.filter(m => m.id !== medicineId));
  };

  const addMedicine = (medicineData: Omit<MedicineItem, 'id' | 'savingsPercentage'>): MedicineItem => {
    const savings = Math.max(
      1,
      Math.round(((medicineData.brandPrice - medicineData.genericPrice) / medicineData.brandPrice) * 100)
    );
    const newMed: MedicineItem = {
      ...medicineData,
      id: `med-${Date.now().toString().slice(-6)}`,
      savingsPercentage: savings,
      inStockKendrasCount: medicineData.janAushadhiAvailable ? (medicineData.inStockKendrasCount || 48) : 0,
      stockUnits: medicineData.stockUnits ?? (medicineData.janAushadhiAvailable ? 500 : 0),
      thresholdUnits: medicineData.thresholdUnits ?? 100
    };

    setMedicines(prev => [newMed, ...prev]);
    return newMed;
  };

  const toggleMedicineAvailability = (medicineId: string) => {
    setMedicines(prev =>
      prev.map(med => {
        if (med.id !== medicineId) return med;
        const newAvailability = !med.janAushadhiAvailable;
        return {
          ...med,
          janAushadhiAvailable: newAvailability,
          inStockKendrasCount: newAvailability ? (med.inStockKendrasCount > 0 ? med.inStockKendrasCount : 45) : 0,
          stockUnits: newAvailability ? (med.stockUnits && med.stockUnits > 0 ? med.stockUnits : 350) : 0
        };
      })
    );

    // Also sync saved medicines in patient locker
    setSavedMedicines(prev =>
      prev.map(med => {
        if (med.id !== medicineId) return med;
        const newAvailability = !med.janAushadhiAvailable;
        return {
          ...med,
          janAushadhiAvailable: newAvailability,
          inStockKendrasCount: newAvailability ? (med.inStockKendrasCount > 0 ? med.inStockKendrasCount : 45) : 0,
          stockUnits: newAvailability ? (med.stockUnits && med.stockUnits > 0 ? med.stockUnits : 350) : 0
        };
      })
    );
  };

  const updateMedicineStock = (medicineId: string, stockUnits: number, isAvailable?: boolean) => {
    setMedicines(prev =>
      prev.map(med => {
        if (med.id !== medicineId) return med;
        const available = isAvailable !== undefined ? isAvailable : stockUnits > 0;
        return {
          ...med,
          stockUnits,
          janAushadhiAvailable: available,
          inStockKendrasCount: available ? (med.inStockKendrasCount > 0 ? med.inStockKendrasCount : 45) : 0
        };
      })
    );

    setSavedMedicines(prev =>
      prev.map(med => {
        if (med.id !== medicineId) return med;
        const available = isAvailable !== undefined ? isAvailable : stockUnits > 0;
        return {
          ...med,
          stockUnits,
          janAushadhiAvailable: available,
          inStockKendrasCount: available ? (med.inStockKendrasCount > 0 ? med.inStockKendrasCount : 45) : 0
        };
      })
    );
  };

  const removeMedicine = (medicineId: string) => {
    setMedicines(prev => prev.filter(m => m.id !== medicineId));
    setSavedMedicines(prev => prev.filter(m => m.id !== medicineId));
  };

  const toggleBookmarkScheme = (schemeId: string) => {
    setBookmarkedSchemes(prev => {
      if (prev.includes(schemeId)) {
        return prev.filter(id => id !== schemeId);
      } else {
        return [...prev, schemeId];
      }
    });
  };

  const updateHospitalBedCounts = (hospitalId: string, icuDelta: number, generalDelta: number) => {
    setHospitals(prev =>
      prev.map(hosp => {
        if (hosp.id !== hospitalId) return hosp;
        return {
          ...hosp,
          availableICUBeds: Math.max(0, hosp.availableICUBeds + icuDelta),
          availableGeneralBeds: Math.max(0, hosp.availableGeneralBeds + generalDelta)
        };
      })
    );
  };

  return (
    <HealthBridgeContext.Provider
      value={{
        language,
        t,
        setLanguage,
        doctors,
        hospitals,
        medicines,
        schemes,
        appointments,
        prescriptions,
        activeSOS,
        savedMedicines,
        bookmarkedSchemes,
        aiAssistantOpen,
        aiInitialPrompt,
        currentTelehealthRoom,
        setAiAssistantOpen,
        openAiWithPrompt,
        setCurrentTelehealthRoom,
        bookAppointment,
        cancelAppointment,
        createPrescription,
        triggerEmergencySOS,
        cancelSOS,
        toggleSaveMedicine,
        removeSavedMedicine,
        toggleBookmarkScheme,
        updateHospitalBedCounts,
        addMedicine,
        toggleMedicineAvailability,
        updateMedicineStock,
        removeMedicine
      }}
    >
      {children}
    </HealthBridgeContext.Provider>
  );
};

export const useHealthBridge = () => {
  const context = useContext(HealthBridgeContext);
  if (!context) {
    throw new Error('useHealthBridge must be used within a HealthBridgeProvider');
  }
  return context;
};
