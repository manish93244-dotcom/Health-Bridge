import React from 'react';
import {
  User,
  Stethoscope,
  Pill,
  LayoutDashboard,
  Calendar,
  FileText,
  Clock,
  ShieldCheck,
  Building2,
  Video,
  Activity,
  HeartPulse,
  LogOut,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useHealthBridge } from '../../context/HealthBridgeContext';
import { UserRole } from '../../types';

interface DashboardSidebarProps {
  currentSection: string;
  setCurrentSection: (section: string) => void;
  onNavigateTab: (tabId: string) => void;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  currentSection,
  setCurrentSection,
  onNavigateTab
}) => {
  const { user, activeRole, switchRole } = useAuth();
  const { appointments, prescriptions, savedMedicines, activeSOS } = useHealthBridge();

  const getMenuItems = () => {
    switch (activeRole) {
      case 'patient':
        return [
          { id: 'overview', label: 'Health Overview & ABHA', icon: HeartPulse },
          { id: 'appointments', label: 'My Appointments', icon: Calendar, badge: appointments.filter(a => a.status === 'upcoming').length.toString() },
          { id: 'prescriptions', label: 'Digital Prescriptions', icon: FileText, badge: prescriptions.length.toString() },
          { id: 'medicines', label: 'Saved Jan Aushadhi Meds', icon: Pill, badge: savedMedicines.length.toString() },
          { id: 'benefits', label: 'PM-JAY Card & Schemes', icon: ShieldCheck }
        ];
      case 'doctor':
        return [
          { id: 'queue', label: 'Today Consultation Queue', icon: Clock, badge: '4 Waiting' },
          { id: 'telehealth', label: 'Active Telehealth Room', icon: Video, pulse: true },
          { id: 'prescribe', label: 'Write New e-Prescription', icon: FileText },
          { id: 'patients', label: 'Patient Clinical EHR', icon: User },
          { id: 'schedule', label: 'Hospital Slot Timings', icon: Calendar }
        ];
      case 'pharmacy':
        return [
          { id: 'inventory', label: 'Jan Aushadhi Inventory', icon: Pill },
          { id: 'dispense', label: 'Fulfill e-Prescription', icon: FileText, badge: 'New Rx' },
          { id: 'substitute', label: 'Generic Price Calculator', icon: Sparkles },
          { id: 'stock-alerts', label: 'Low Stock Reorder', icon: Activity, badge: '3 Low' }
        ];
      case 'admin':
        return [
          { id: 'command', label: 'District Command Centre', icon: LayoutDashboard },
          { id: 'beds', label: 'Hospital ICU Bed Grid', icon: Building2, badge: 'Live' },
          { id: 'ambulances', label: 'Ambulance 108 Fleet', icon: Activity, badge: activeSOS ? '1 SOS' : 'Ready' },
          { id: 'claims', label: 'PM-JAY Scheme Claims', icon: ShieldCheck, badge: '₹2.4 Cr' }
        ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-full lg:w-72 bg-white/[0.04] backdrop-blur-xl rounded-3xl border border-white/10 shadow-xl p-4 flex flex-col justify-between shrink-0 space-y-6 text-slate-100">
      
      {/* Profile Card Header */}
      <div>
        <div className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/10 mb-4 backdrop-blur-md">
          <img
            src={user?.avatar || '/user-profile.jpg'}
            alt={user?.name}
            referrerPolicy="no-referrer"
            className="w-12 h-12 rounded-2xl object-cover ring-2 ring-teal-400/40"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-bold text-white truncate">
              {user?.name}
            </h4>
            <span className="text-[10px] font-bold text-teal-300 bg-teal-500/20 px-2 py-0.5 rounded-md uppercase tracking-wider border border-teal-400/30">
              {activeRole}
            </span>
            {user?.abhaId && (
              <p className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
                {user.abhaId}
              </p>
            )}
          </div>
        </div>

        {/* Sidebar Nav Items */}
        <div className="space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1 block">
            Workspace Nav
          </span>
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentSection(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20'
                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive ? 'bg-slate-950 text-teal-300' : 'bg-white/10 text-teal-300 border border-teal-500/30'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {item.pulse && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Role Switcher in Sidebar */}
      <div className="pt-4 border-t border-white/10 space-y-3">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1 block">
          Switch Demo Persona
        </span>
        <div className="grid grid-cols-2 gap-1.5">
          {(['patient', 'doctor', 'pharmacy', 'admin'] as UserRole[]).map(role => (
            <button
              key={role}
              onClick={() => {
                switchRole(role);
                setCurrentSection(role === 'patient' ? 'overview' : role === 'doctor' ? 'queue' : role === 'pharmacy' ? 'inventory' : 'command');
                onNavigateTab(`${role}-dash`);
              }}
              className={`text-[11px] font-bold py-1.5 px-2 rounded-xl capitalize border transition-all ${
                activeRole === role
                  ? 'bg-teal-500/20 text-teal-200 border-teal-400/40 shadow-xs'
                  : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10 hover:text-white'
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        <button
          onClick={() => onNavigateTab('landing')}
          className="w-full text-center text-xs font-bold text-slate-400 hover:text-teal-300 py-1 transition-colors"
        >
          ← Return to Main Portal
        </button>
      </div>

    </div>
  );
};
