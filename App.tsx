import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { HealthBridgeProvider, useHealthBridge } from './context/HealthBridgeContext';
import { Navbar } from './components/common/Navbar';
import { EmergencyBanner } from './components/common/EmergencyBanner';
import { Footer } from './components/common/Footer';
import { AIAssistantModal } from './components/common/AIAssistantModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { NavigatorPage } from './pages/NavigatorPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { HospitalsPage } from './pages/HospitalsPage';
import { MedicinesPage } from './pages/MedicinesPage';
import { GovernmentBenefitsPage } from './pages/GovernmentBenefitsPage';
import { EmergencyPage } from './pages/EmergencyPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { PatientDashboard } from './pages/PatientDashboard';
import { DoctorDashboard } from './pages/DoctorDashboard';
import { DoctorCameraPage } from './pages/DoctorCameraPage';
import { PharmacyDashboard } from './pages/PharmacyDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { Bot, Sparkles } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('landing');
  const [telehealthTarget, setTelehealthTarget] = useState<any>(null);
  const { isAiModalOpen, setIsAiModalOpen } = useHealthBridge();
  const { activeRole } = useAuth();

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleStartTelehealth = (target: any) => {
    setTelehealthTarget(target);
    setActiveTab('telehealth-room');
  };

  const handleEndTelehealth = () => {
    setTelehealthTarget(null);
    if (activeRole === 'doctor') {
      setActiveTab('doctor-dash');
    } else {
      setActiveTab('patient-dash');
    }
  };

  const renderActivePage = () => {
    switch (activeTab) {
      case 'landing':
        return (
          <LandingPage
            onNavigate={setActiveTab}
            onStartTelehealthWithDoctor={handleStartTelehealth}
          />
        );
      case 'navigator':
        return (
          <NavigatorPage
            onNavigate={setActiveTab}
          />
        );
      case 'doctors':
        return (
          <DoctorsPage
            onStartTelehealth={handleStartTelehealth}
          />
        );
      case 'hospitals':
        return (
          <HospitalsPage
            onNavigateToEmergency={() => setActiveTab('emergency')}
          />
        );
      case 'medicines':
        return <MedicinesPage />;
      case 'schemes':
        return <GovernmentBenefitsPage />;
      case 'contact':
        return <ContactUsPage />;
      case 'emergency':
        return <EmergencyPage />;
      case 'patient-dash':
        return (
          <PatientDashboard
            onNavigateTab={setActiveTab}
            onStartTelehealthWithDoctor={handleStartTelehealth}
          />
        );
      case 'doctor-dash':
        return (
          <DoctorDashboard
            onNavigateTab={setActiveTab}
            onStartTelehealth={handleStartTelehealth}
          />
        );
      case 'telehealth-room':
        return (
          <DoctorCameraPage
            onEndCall={handleEndTelehealth}
            targetDoctorOrPatient={telehealthTarget}
          />
        );
      case 'pharmacy-dash':
        return <PharmacyDashboard onNavigateTab={setActiveTab} />;
      case 'admin-dash':
        return <AdminDashboard onNavigateTab={setActiveTab} />;
      default:
        return (
          <LandingPage
            onNavigate={setActiveTab}
            onStartTelehealthWithDoctor={handleStartTelehealth}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-teal-500 selection:text-white relative overflow-x-hidden">
      
      {/* Ambient Frosted Glow Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 -right-32 w-[480px] h-[480px] bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-[420px] h-[420px] bg-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Emergency Global Banner */}
        <EmergencyBanner onNavigateToEmergency={() => setActiveTab('emergency')} />

        {/* Main Navigation Header */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Main Content View */}
        <main className="flex-1">
          {renderActivePage()}
        </main>

        {/* Floating AI Assistant Trigger Button (when modal is closed) */}
        {!isAiModalOpen && activeTab !== 'telehealth-room' && (
          <button
            onClick={() => setIsAiModalOpen(true)}
            className="fixed bottom-6 right-6 z-40 bg-teal-600/80 hover:bg-teal-600 text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl backdrop-blur-xl border border-teal-400/30 transition-all flex items-center gap-2.5 group cursor-pointer hover:shadow-teal-500/20"
            aria-label="Open HealthBridge AI Assistant"
          >
            <div className="relative">
              <Bot className="w-6 h-6 text-teal-200 group-hover:scale-110 transition-transform" />
              <Sparkles className="w-3 h-3 text-amber-300 absolute -top-1 -right-1 animate-ping" />
            </div>
            <span className="hidden sm:inline font-bold text-xs sm:text-sm tracking-tight font-['Outfit',sans-serif]">
              HealthBridge AI
            </span>
          </button>
        )}

        {/* AI Assistant Modal */}
        <AIAssistantModal
          isOpen={isAiModalOpen}
          onClose={() => setIsAiModalOpen(false)}
          onNavigate={setActiveTab}
        />

        {/* Footer */}
        <Footer setActiveTab={setActiveTab} />
      </div>

    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <HealthBridgeProvider>
        <MainAppContent />
      </HealthBridgeProvider>
    </AuthProvider>
  );
}
