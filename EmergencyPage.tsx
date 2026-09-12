import React, { useState, useEffect } from 'react';
import {
  PhoneCall,
  Activity,
  MapPin,
  AlertTriangle,
  HeartPulse,
  Clock,
  ShieldAlert,
  Droplet,
  Navigation,
  CheckCircle2,
  XCircle,
  Truck,
  Users,
  Info
} from 'lucide-react';
import { useHealthBridge } from '../context/HealthBridgeContext';

export const EmergencyPage: React.FC = () => {
  const { activeSOS, triggerSOS, cancelSOS, hospitals, t } = useHealthBridge();
  const [emergencyType, setEmergencyType] = useState('Cardiac Arrest / Chest Pain');
  const [patientLocation, setPatientLocation] = useState('Connaught Place, Central Delhi, Delhi - 110001');
  const [patientContact, setPatientContact] = useState('+91 6200488260');
  const [simulatedEta, setSimulatedEta] = useState(6);

  const emergencyTypes = [
    'Cardiac Arrest / Chest Pain',
    'Severe Accident / Trauma',
    'Breathing Difficulty / Asthma',
    'Maternal Labor / Delivery',
    'Stroke / Sudden Paralysis',
    'Severe Burns / Chemical Injury'
  ];

  // Tick down ETA if active
  useEffect(() => {
    let interval: any = null;
    if (activeSOS) {
      interval = setInterval(() => {
        setSimulatedEta(prev => (prev > 1 ? prev - 1 : 1));
      }, 15000);
    }
    return () => clearInterval(interval);
  }, [activeSOS]);

  const handleDispatch = () => {
    triggerSOS({
      patientName: 'Rahul Verma',
      patientPhone: patientContact,
      location: patientLocation,
      emergencyType,
      assignedHospital: 'AIIMS New Delhi (Apex Trauma Center)'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Emergency Header Bar */}
      <div className="bg-gradient-to-r from-red-700 via-red-800 to-rose-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30 animate-pulse">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{t.emergency.badge}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-['Outfit',sans-serif]">
            {t.emergency.title}
          </h1>
          <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
            {t.emergency.sub}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
            <a
              href="tel:108"
              className="px-4 py-2 bg-white text-red-700 font-extrabold rounded-xl shadow-md hover:bg-red-50 flex items-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{t.emergency.dial108Direct}</span>
            </a>
            <span className="text-red-200">National Emergency: 112 | Maternal: 102</span>
          </div>
        </div>
      </div>

      {/* Active SOS Tracker OR Trigger Module */}
      {activeSOS ? (
        <div className="bg-white rounded-3xl border-2 border-red-500 shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center animate-bounce shadow-md">
                <Truck className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                  Ambulance En Route • High Priority
                </span>
                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
                  Ambulance Unit #{activeSOS.ambulanceNumber}
                </h2>
                <p className="text-xs text-slate-500">
                  Paramedic Crew: Vikram Sharma & Team • Oxygen & Defibrillator Equipped
                </p>
              </div>
            </div>

            <div className="text-right flex sm:flex-col items-center sm:items-end justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase">Estimated Arrival</span>
              <div className="text-3xl sm:text-4xl font-black text-red-600 font-mono">
                {simulatedEta} mins
              </div>
            </div>
          </div>

          {/* Live Telemetry Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">
                Pickup Destination
              </span>
              <p className="text-xs font-bold text-slate-800 flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                <span>{activeSOS.location}</span>
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">
                Pre-Notified Trauma Hospital
              </span>
              <p className="text-xs font-bold text-slate-800 flex items-start gap-1.5">
                <Activity className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                <span>{activeSOS.assignedHospital}</span>
              </p>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded inline-block">
                Trauma ICU Bed Reserved
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">
                Reported Nature
              </span>
              <p className="text-xs font-bold text-red-700 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span>{activeSOS.emergencyType}</span>
              </p>
              <span className="text-[10px] text-slate-500 block">
                Dispatched at: {activeSOS.dispatchedAt}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <a
              href={`tel:${activeSOS.driverContact}`}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Paramedic Driver ({activeSOS.driverContact})</span>
            </a>

            <button
              onClick={cancelSOS}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
            >
              Cancel False Alarm / Resolved
            </button>
          </div>

        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Dispatch Form (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Instant Emergency SOS Dispatch
                </h2>
                <p className="text-xs text-slate-500">
                  Fill details or tap dispatch for automated nearest ambulance routing.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Nature of Medical Emergency
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {emergencyTypes.map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setEmergencyType(type)}
                      className={`text-xs p-2.5 rounded-xl border text-left font-medium transition-all ${
                        emergencyType === type
                          ? 'bg-red-50 text-red-900 border-red-400 font-bold shadow-2xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Incident Pickup Location / Landmark
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={patientLocation}
                    onChange={e => setPatientLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 font-medium focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Caller / Attendant Phone Number
                </label>
                <div className="relative">
                  <PhoneCall className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={patientContact}
                    onChange={e => setPatientContact(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm font-mono text-slate-900 focus:outline-none focus:border-red-600"
                  />
                </div>
              </div>

              <button
                onClick={handleDispatch}
                className="w-full py-4 bg-gradient-to-r from-red-600 via-rose-600 to-red-700 hover:from-red-700 hover:to-rose-800 text-white rounded-2xl font-black text-sm sm:text-base tracking-wide shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                <PhoneCall className="w-5 h-5 animate-pulse" />
                <span>DISPATCH 108 AMBULANCE NOW</span>
              </button>
            </div>
          </div>

          {/* First Aid Guidance Strip (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 space-y-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-red-600" />
                <span>Immediate First Aid Protocols While Waiting:</span>
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-red-50/70 rounded-xl border border-red-200/70">
                  <span className="font-bold text-red-900 block mb-0.5">1. Suspected Heart Attack</span>
                  <p className="text-slate-700">Keep patient calm in sitting position. Loosen tight clothes. If conscious and not allergic, administer Aspirin 300mg chewable.</p>
                </div>

                <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200/70">
                  <span className="font-bold text-amber-900 block mb-0.5">2. Severe Bleeding</span>
                  <p className="text-slate-700">Apply direct, firm pressure with a clean cloth over the wound. Elevate injured limb above heart level if no fracture.</p>
                </div>

                <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200/70">
                  <span className="font-bold text-blue-900 block mb-0.5">3. Unresponsive Breathing (CPR)</span>
                  <p className="text-slate-700">Place heels of both hands in center of chest. Push hard and fast (100-120 beats/min to the rhythm of 'Stayin Alive').</p>
                </div>
              </div>
            </div>

            {/* Live Blood Bank Stock Grid */}
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-6 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Droplet className="w-3.5 h-3.5 text-rose-600 fill-rose-600" />
                  <span>District Blood Bank Units</span>
                </h4>
                <span className="text-[10px] text-emerald-600 font-bold">Live Inventory</span>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center text-xs">
                <div className="bg-rose-50 p-2 rounded-xl border border-rose-100">
                  <span className="font-bold text-rose-900 block">O-</span>
                  <span className="font-mono font-extrabold text-slate-800">14 units</span>
                </div>
                <div className="bg-rose-50 p-2 rounded-xl border border-rose-100">
                  <span className="font-bold text-rose-900 block">O+</span>
                  <span className="font-mono font-extrabold text-slate-800">62 units</span>
                </div>
                <div className="bg-rose-50 p-2 rounded-xl border border-rose-100">
                  <span className="font-bold text-rose-900 block">B+</span>
                  <span className="font-mono font-extrabold text-slate-800">48 units</span>
                </div>
                <div className="bg-rose-50 p-2 rounded-xl border border-rose-100">
                  <span className="font-bold text-rose-900 block">AB+</span>
                  <span className="font-mono font-extrabold text-slate-800">28 units</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
