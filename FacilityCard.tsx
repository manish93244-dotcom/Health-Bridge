import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Phone,
  Bed,
  ShieldCheck,
  Activity,
  Navigation,
  Droplet,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { HospitalFacility } from '../../types';

interface FacilityCardProps {
  hospital: HospitalFacility;
  onBookAmbulanceToHospital?: (hospital: HospitalFacility) => void;
}

export const FacilityCard: React.FC<FacilityCardProps> = ({
  hospital,
  onBookAmbulanceToHospital
}) => {
  const [showBloodDetails, setShowBloodDetails] = useState(false);

  const icuPercent = Math.min(
    100,
    Math.round((hospital.availableICUBeds / (hospital.availableICUBeds + 15)) * 100)
  );

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl hover:shadow-2xl hover:border-emerald-400 hover:ring-2 hover:ring-emerald-400/20 hover:-translate-y-1.5 active:scale-[0.99] transition-all duration-300 p-5 flex flex-col justify-between group text-slate-800 cursor-pointer">
      
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div>
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-lg ${
                hospital.type.includes('Government')
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}>
                {hospital.type}
              </span>
              {hospital.isPmjayEmpanelled && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-amber-600" />
                  AB PM-JAY Empanelled
                </span>
              )}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-emerald-700 transition-colors">
              {hospital.name}
            </h3>
          </div>
          <div className="flex flex-col items-end shrink-0">
            <div className="flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-lg font-bold text-xs">
              <span className="text-amber-500">★</span>
              <span>{hospital.rating}</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium mt-0.5">
              {hospital.distanceKm} km away
            </span>
          </div>
        </div>

        {/* Address */}
        <p className="text-xs text-slate-600 flex items-center gap-1.5 mb-4">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="truncate">{hospital.address}, {hospital.city}</span>
        </p>

        {/* Real-time Bed Availability Grid */}
        <div className="grid grid-cols-3 gap-2 bg-slate-50 rounded-2xl p-3 border border-slate-200/80 mb-4">
          <div className="text-center border-r border-slate-200 pr-1">
            <span className="text-[10px] font-semibold text-slate-500 block uppercase">ICU Beds</span>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <span className={`text-base font-extrabold font-mono ${hospital.availableICUBeds > 5 ? 'text-emerald-600' : hospital.availableICUBeds > 0 ? 'text-amber-600' : 'text-rose-600'}`}>
                {hospital.availableICUBeds}
              </span>
              <span className="text-[10px] text-slate-500">avail</span>
            </div>
          </div>

          <div className="text-center border-r border-slate-200 pr-1">
            <span className="text-[10px] font-semibold text-slate-500 block uppercase">Ventilator</span>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <span className={`text-base font-extrabold font-mono ${hospital.availableVentilatorBeds > 0 ? 'text-teal-600' : 'text-rose-600'}`}>
                {hospital.availableVentilatorBeds}
              </span>
              <span className="text-[10px] text-slate-500">avail</span>
            </div>
          </div>

          <div className="text-center">
            <span className="text-[10px] font-semibold text-slate-500 block uppercase">Gen. Beds</span>
            <div className="flex items-center justify-center gap-1 mt-0.5">
              <span className="text-base font-extrabold text-slate-900 font-mono">
                {hospital.availableGeneralBeds}
              </span>
              <span className="text-[10px] text-slate-500">avail</span>
            </div>
          </div>
        </div>

        {/* Departments tag cloud */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {hospital.departments.slice(0, 3).map((dept, idx) => (
            <span
              key={idx}
              className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-medium"
            >
              {dept}
            </span>
          ))}
          {hospital.departments.length > 3 && (
            <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-500 font-medium">
              +{hospital.departments.length - 3} more
            </span>
          )}
        </div>

        {/* Blood Bank Live Peek */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setShowBloodDetails(!showBloodDetails)}
            className="w-full flex items-center justify-between text-xs text-rose-800 font-bold bg-rose-50 hover:bg-rose-100 border border-rose-200 px-3 py-2 rounded-xl transition-colors cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <Droplet className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
              Live Blood Bank Inventory
            </span>
            <span className="text-[10px] font-medium text-rose-700 underline">
              {showBloodDetails ? 'Hide' : 'View Units'}
            </span>
          </button>

          {showBloodDetails && (
            <div className="mt-2 grid grid-cols-4 gap-1.5 bg-rose-50/70 p-2.5 rounded-xl border border-rose-200 text-center animate-in fade-in duration-150">
              {Object.entries(hospital.bloodBankInventory).map(([grp, units]) => (
                <div key={grp} className="bg-white p-1.5 rounded-lg border border-rose-200 shadow-2xs">
                  <span className="text-[10px] font-bold text-rose-700 block">{grp}</span>
                  <span className="text-xs font-mono font-extrabold text-slate-900">{units}u</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <a
          href={`tel:${hospital.emergencyPhone}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-xs font-bold transition-all hover:scale-105 active:scale-95"
        >
          <Phone className="w-3.5 h-3.5 text-slate-500" />
          <span>Call Desk</span>
        </a>

        {onBookAmbulanceToHospital ? (
          <button
            onClick={() => onBookAmbulanceToHospital(hospital)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 border border-red-500 cursor-pointer"
          >
            <Activity className="w-3.5 h-3.5" />
            <span>SOS Dispatch</span>
          </button>
        ) : (
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${hospital.coordinates.lat},${hospital.coordinates.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/30 hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Navigation className="w-3.5 h-3.5" />
            <span>Directions</span>
          </a>
        )}
      </div>

    </div>
  );
};
