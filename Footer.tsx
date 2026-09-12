import React from 'react';
import { HeartPulse, PhoneCall, ShieldCheck, Pill, Stethoscope, Building2, ExternalLink, Heart } from 'lucide-react';
import { HealthBridgeLogo } from './HealthBridgeLogo';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="bg-slate-950/80 backdrop-blur-xl text-slate-300 border-t border-white/10 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-teal-500/30 p-1 flex items-center justify-center shadow-md">
                <HealthBridgeLogo className="w-full h-full" />
              </div>
              <span className="font-extrabold text-2xl text-white tracking-tight font-['Outfit',sans-serif]">
                Health<span className="text-teal-400">Bridge</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed pr-4">
              A public-interest digital health platform bridging citizens to verified doctors, real-time hospital bed & ICU availability, 80% cheaper Jan Aushadhi generic medicines, and government healthcare welfare schemes like Ayushman Bharat (PM-JAY).
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-semibold text-teal-300 flex items-center gap-1.5 backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                ABDM & ABHA Compatible
              </div>
              <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-semibold text-amber-300 flex items-center gap-1.5 backdrop-blur-md">
                <Pill className="w-3.5 h-3.5 text-amber-400" />
                PMBJP Jan Aushadhi Verified
              </div>
            </div>
          </div>

          {/* Quick Access */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Citizen Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('navigator')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  AI Symptom Triage Navigator
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('doctors')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Find Verified Doctors & Telehealth
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('hospitals')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Live ICU & Hospital Bed Tracker
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('medicines')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Jan Aushadhi Generic Medicine Search
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('schemes')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Ayushman Bharat PM-JAY Matcher
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('contact')}
                  className="hover:text-teal-400 transition-colors text-left font-semibold text-teal-300"
                >
                  Contact Us & Team Directory (MITS-GWL)
                </button>
              </li>
            </ul>
          </div>

          {/* Dashboards */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Portals & Roles
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('patient-dash')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Patient Digital Health Locker (ABHA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('doctor-dash')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Doctor Consultation Room & Queue
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('pharmacy-dash')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  Jan Aushadhi Kendra Inventory
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('admin-dash')}
                  className="hover:text-teal-400 transition-colors text-left"
                >
                  District Emergency Command Centre
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency Hotlines */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5" />
              24x7 Helplines
            </h4>
            <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10 space-y-2 text-xs backdrop-blur-md">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Ambulance SOS:</span>
                <span className="font-mono font-bold text-white text-sm bg-red-950/80 text-red-300 px-2 py-0.5 rounded border border-red-500/30">
                  108
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Maternal/Infant:</span>
                <span className="font-mono font-bold text-white text-sm bg-white/10 px-2 py-0.5 rounded border border-white/10">
                  102
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">PM-JAY Scheme:</span>
                <span className="font-mono font-bold text-teal-300 text-sm bg-teal-950/80 px-2 py-0.5 rounded border border-teal-500/30">
                  14555
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Jan Aushadhi:</span>
                <span className="font-mono font-bold text-amber-300 text-xs">
                  1800-180-8080
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="leading-relaxed text-center md:text-left max-w-3xl">
            <strong>Medical Disclaimer:</strong> HealthBridge is a triage and navigation facilitator. AI evaluations are decision-support tools and do not substitute professional medical diagnosis. In case of life-threatening medical emergencies, immediately contact emergency services at <strong>108</strong>.
          </p>
          <div className="flex items-center gap-1 text-slate-400 shrink-0">
            <span>Built for Universal Healthcare Access</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
};
