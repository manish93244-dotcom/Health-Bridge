import React, { useState } from 'react';
import {
  LayoutDashboard,
  Building2,
  Activity,
  ShieldCheck,
  PhoneCall,
  Users,
  AlertTriangle,
  Send,
  Bed,
  CheckCircle2,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useHealthBridge } from '../context/HealthBridgeContext';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';

interface AdminDashboardProps {
  onNavigateTab: (tabId: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigateTab }) => {
  const { user } = useAuth();
  const { hospitals, activeSOS } = useHealthBridge();
  const [currentSection, setCurrentSection] = useState('command');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);

  const totalICUBeds = hospitals.reduce((acc, h) => acc + h.availableICUBeds, 0);
  const totalVentilatorBeds = hospitals.reduce((acc, h) => acc + h.availableVentilatorBeds, 0);

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setBroadcastMessage('');
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Top Admin Header */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-blue-700 text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-sky-100 text-xs font-bold border border-white/20">
            <LayoutDashboard className="w-3.5 h-3.5 text-sky-200" />
            <span>District Health Authority & Emergency Command</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-['Outfit',sans-serif]">
            {user?.name || 'Dr. Alok Verma (District Chief Medical Officer)'}
          </h1>
          <p className="text-xs text-sky-100">
            Central Command Jurisdiction • Integrated Emergency 108, PM-JAY & Jan Aushadhi Grid
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-sky-950/60 border border-sky-400/40 px-4 py-2 rounded-xl text-xs font-mono text-sky-200">
            <span className="text-[10px] text-sky-300 block font-semibold">GRID STATUS</span>
            <span className="text-sm font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              All 18 Nodes Normal
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Sidebar */}
        <DashboardSidebar
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          onNavigateTab={onNavigateTab}
        />

        {/* Content */}
        <div className="flex-1 w-full space-y-6">
          
          {/* SECTION: Command Center Metrics */}
          {currentSection === 'command' && (
            <div className="space-y-6">
              
              {/* Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Available ICU Beds
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono mt-1 block">
                    {totalICUBeds}
                  </span>
                  <span className="text-[11px] text-emerald-600 font-bold mt-1 block">
                    Across 4 Tertiary Centers
                  </span>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    108 Ambulances Ready
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono mt-1 block">
                    28 / 32
                  </span>
                  <span className="text-[11px] text-teal-600 font-bold mt-1 block">
                    4 Currently on SOS Run
                  </span>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    PM-JAY Cashless Claims
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono mt-1 block">
                    ₹2.48 Cr
                  </span>
                  <span className="text-[11px] text-emerald-600 font-bold mt-1 block">
                    99.2% Auto-Approved
                  </span>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Jan Aushadhi Stores
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono mt-1 block">
                    142 Active
                  </span>
                  <span className="text-[11px] text-amber-600 font-bold mt-1 block">
                    94% Stock Fill Rate
                  </span>
                </div>
              </div>

              {/* Hospital Occupancy Grid */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-4">
                <h3 className="text-base font-bold text-slate-900">
                  Hospital Critical Care Live Occupancy
                </h3>
                <div className="space-y-3">
                  {hospitals.map(h => (
                    <div key={h.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{h.name}</h4>
                        <p className="text-slate-500">{h.address} • {h.type}</p>
                      </div>
                      <div className="flex items-center gap-4 font-mono font-bold">
                        <span className="text-emerald-700">ICU: {h.availableICUBeds} vac</span>
                        <span className="text-teal-700">Vent: {h.availableVentilatorBeds} vac</span>
                        <span className="text-slate-700">Gen: {h.availableGeneralBeds} vac</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* District Emergency Broadcast Trigger */}
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  <h3 className="text-base font-bold text-slate-900">
                    District Healthcare Public Alert Broadcast
                  </h3>
                </div>

                {broadcastSent && (
                  <div className="p-3 bg-emerald-600 text-white rounded-xl text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                    <span>Emergency Advisory broadcasted to all hospitals, clinics, and ambulance units!</span>
                  </div>
                )}

                <form onSubmit={handleSendBroadcast} className="space-y-3">
                  <textarea
                    rows={2}
                    value={broadcastMessage}
                    onChange={e => setBroadcastMessage(e.target.value)}
                    placeholder="Enter urgent health advisory (e.g. Seasonal dengue alert, heatwave advisories, hospital trauma divert status)..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Issue Official Health Advisory</span>
                  </button>
                </form>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};
