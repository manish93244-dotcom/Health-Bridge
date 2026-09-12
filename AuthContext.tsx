import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  activeRole: UserRole;
  switchRole: (role: UserRole) => void;
  loginAs: (role: UserRole, customName?: string) => void;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
}

const DEFAULT_PROFILES: Record<UserRole, UserProfile> = {
  patient: {
    id: 'pat-1',
    name: 'Rahul Verma',
    email: 'rahul.verma@example.com',
    role: 'patient',
    phone: '+91 6200488260',
    avatar: '/user-profile.jpg',
    abhaId: '91-4482-9901-2311',
    bloodGroup: 'B+ Positive',
    allergies: ['Penicillin', 'Sulfa Drugs'],
    emergencyContacts: [
      { name: 'Sunita Verma', relation: 'Spouse', phone: '+91 98765 43211' },
      { name: 'Amit Verma', relation: 'Brother', phone: '+91 98765 43212' }
    ]
  },
  doctor: {
    id: 'doc-1',
    name: 'Dr. Priya Sharma',
    email: 'dr.priya@apexhealth.org',
    role: 'doctor',
    phone: '+91 98100 88221',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80',
    doctorDetails: {
      specialty: 'Cardiology & Electrophysiology',
      qualification: 'MBBS, MD, DM (Cardiology) - AIIMS',
      experienceYears: 14,
      regNumber: 'NMC-2012-77491',
      hospital: 'Apex Heart & Vascular Institute',
      consultationFee: 600,
      rating: 4.9,
      reviewsCount: 342
    }
  },
  pharmacy: {
    id: 'pharma-1',
    name: 'Ramesh Gupta (Pharmacist)',
    email: 'kendra402@janaushadhi.gov.in',
    role: 'pharmacy',
    phone: '+91 98230 45678',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80',
    pharmacyDetails: {
      storeName: 'Pradhan Mantri Jan Aushadhi Kendra #402',
      kendraCode: 'PMBJP-DL-4029',
      licenseNumber: 'DL-20B-18492 / DL-21B-18493',
      address: 'Shop 14, Main Market, Civil Hospital Gate, North Zone'
    }
  },
  admin: {
    id: 'admin-1',
    name: 'NextGen Medics (Nodal Admin)',
    email: 'teammembers.central@healthbridge.gov.in',
    role: 'admin',
    phone: '+91 11 2389 4400',
    avatar: '/nextgen-medics-logo.jpg'
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeRole, setActiveRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('hb_role') as UserRole;
    return saved || 'patient';
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    const savedRole = (localStorage.getItem('hb_role') as UserRole) || 'patient';
    return DEFAULT_PROFILES[savedRole] || DEFAULT_PROFILES.patient;
  });

  useEffect(() => {
    localStorage.setItem('hb_role', activeRole);
  }, [activeRole]);

  const switchRole = (role: UserRole) => {
    setActiveRole(role);
    setUser(DEFAULT_PROFILES[role]);
  };

  const loginAs = (role: UserRole, customName?: string) => {
    setActiveRole(role);
    const profile = { ...DEFAULT_PROFILES[role] };
    if (customName) profile.name = customName;
    setUser(profile);
  };

  const logout = () => {
    setActiveRole('patient');
    setUser(DEFAULT_PROFILES.patient);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    setUser(prev => prev ? { ...prev, ...updated } : null);
  };

  return (
    <AuthContext.Provider value={{ user, activeRole, switchRole, loginAs, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
