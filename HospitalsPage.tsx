import React, { useState } from 'react';
import {
  Building2,
  Search,
  Bed,
  Activity,
  ShieldCheck,
  MapPin,
  Phone,
  Navigation,
  Droplet,
  CheckCircle2,
  AlertCircle,
  Filter
} from 'lucide-react';
import { useHealthBridge } from '../context/HealthBridgeContext';
import { FacilityCard } from '../components/cards/FacilityCard';
import { HospitalFacility } from '../types';

interface HospitalsPageProps {
  onNavigateToEmergency: () => void;
}

export const HospitalsPage: React.FC<HospitalsPageProps> = ({ onNavigateToEmergency }) => {
  const { hospitals, t } = useHealthBridge();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [onlyICU, setOnlyICU] = useState(false);
  const [onlyPmjay, setOnlyPmjay] = useState(false);

  const totalICUBeds = hospitals.reduce((acc, h) => acc + h.availableICUBeds, 0);
  const totalVentilatorBeds = hospitals.reduce((acc, h) => acc + h.availableVentilatorBeds, 0);
  const totalGenBeds = hospitals.reduce((acc, h) => acc + h.availableGeneralBeds, 0);

  const filteredHospitals = hospitals.filter(h => {
    const matchesQuery =
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.departments.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesType = filterType === 'All' || h.type.toLowerCase().includes(filterType.toLowerCase());
    const matchesICU = !onlyICU || h.availableICUBeds > 0;
    const matchesPmjay = !onlyPmjay || h.isPmjayEmpanelled;

    return matchesQuery && matchesType && matchesICU && matchesPmjay;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-blue-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-sky-400/40">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30">
              <Building2 className="w-3.5 h-3.5 text-sky-200" />
              <span>{t.hospitals.badge}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif]">
              {t.hospitals.title}
            </h1>
            <p className="text-xs sm:text-sm text-sky-100 max-w-2xl leading-relaxed">
              {t.hospitals.sub}
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={onNavigateToEmergency}
              className="px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer border border-red-400/30"
            >
              <Activity className="w-4 h-4" />
              <span>{t.hospitals.emergencyAmbulanceBtn}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live District Bed Count Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              {t.hospitals.metricIcu}
            </span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              {totalICUBeds}
            </span>
            <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">
              Live updates across 4 major centers
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <Bed className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              {t.hospitals.metricVentilator}
            </span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              {totalVentilatorBeds}
            </span>
            <span className="text-[11px] text-teal-600 font-bold block mt-0.5">
              Critical care ready with piped oxygen
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              {t.hospitals.metricGeneral}
            </span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              {totalGenBeds}
            </span>
            <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
              PM-JAY Cashless Admission
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t.hospitals.searchPlaceholder}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-600"
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-1.5">
            {['All', 'Government', 'District', 'Private', 'Charitable'].map(type => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                  filterType === type
                    ? 'bg-teal-700 text-white font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {type === 'All' ? t.hospitals.allTypes : `${type} Hospitals`}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold text-slate-700">
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyICU}
                onChange={e => setOnlyICU(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
              />
              <span>{t.hospitals.onlyIcu}</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyPmjay}
                onChange={e => setOnlyPmjay(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
              />
              <span>{t.hospitals.onlyPmjay}</span>
            </label>
          </div>
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredHospitals.map(hospital => (
          <FacilityCard
            key={hospital.id}
            hospital={hospital}
          />
        ))}
      </div>

    </div>
  );
};
