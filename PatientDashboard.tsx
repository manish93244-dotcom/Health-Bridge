import React, { useState } from 'react';
import {
  User,
  HeartPulse,
  Calendar,
  FileText,
  Pill,
  ShieldCheck,
  Video,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
  Trash2,
  Sparkles,
  ArrowRight,
  TrendingDown,
  PhoneCall,
  QrCode
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useHealthBridge } from '../context/HealthBridgeContext';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { Appointment } from '../types';

interface PatientDashboardProps {
  onNavigateTab: (tabId: string) => void;
  onStartTelehealthWithDoctor: (doctorInfo: any) => void;
}

export const PatientDashboard: React.FC<PatientDashboardProps> = ({
  onNavigateTab,
  onStartTelehealthWithDoctor
}) => {
  const { user } = useAuth();
  const { appointments, prescriptions, savedMedicines, removeSavedMedicine, cancelAppointment, schemes } = useHealthBridge();
  const [currentSection, setCurrentSection] = useState('overview');

  // Calculate annual savings on saved medicines
  const annualSavings = savedMedicines.reduce((acc, med) => {
    return acc + (med.brandPrice - med.genericPrice) * 12;
  }, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Dashboard Top Banner */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-blue-700 text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-sky-100 text-xs font-bold border border-white/20">
            <HeartPulse className="w-3.5 h-3.5 text-sky-200" />
            <span>Ayushman Bharat Digital Health Locker</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-['Outfit',sans-serif]">
            Welcome, {user?.name}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs text-sky-100 font-mono">
            <span>ABHA Number: {user?.abhaId}</span>
            <span>•</span>
            <span>Blood Group: {user?.bloodGroup || 'O+'}</span>
            <span>•</span>
            <span className="text-amber-300 font-bold">PM-JAY Card: Active (₹5,00,000 Balance)</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab('navigator')}
            className="px-4 py-2.5 bg-white text-sky-900 hover:bg-sky-50 text-xs sm:text-sm font-bold rounded-xl shadow-md transition-colors flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Check Symptoms</span>
          </button>
        </div>
      </div>

      {/* Main Content Layout with Sidebar */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Sidebar */}
        <DashboardSidebar
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          onNavigateTab={onNavigateTab}
        />

        {/* Dynamic Section Area */}
        <div className="flex-1 w-full space-y-6">
          
          {/* SECTION: Overview & ABHA Locker */}
          {currentSection === 'overview' && (
            <div className="space-y-6">
              
              {/* ABHA Digital Card */}
              <div className="bg-gradient-to-br from-sky-600 via-sky-700 to-blue-800 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-sky-400/40">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sky-400/30">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center font-black text-xl shadow-md border border-white/20">
                      HB
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-sky-200">
                        National Digital Health ID
                      </span>
                      <h3 className="text-lg font-bold text-white font-['Outfit',sans-serif]">
                        ABHA Health Card
                      </h3>
                    </div>
                  </div>
                  <div className="bg-white/15 px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-2 text-xs">
                    <QrCode className="w-4 h-4 text-sky-200" />
                    <span className="font-mono text-sky-100">ABDM Verified</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-xs">
                  <div>
                    <span className="text-[10px] text-sky-200 uppercase block font-semibold">Beneficiary Name</span>
                    <span className="text-base font-bold text-white mt-0.5 block">{user?.name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-sky-200 uppercase block font-semibold">ABHA Address</span>
                    <span className="text-base font-mono font-bold text-sky-100 mt-0.5 block">
                      {user?.abhaId}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-sky-200 uppercase block font-semibold">PM-JAY Scheme Cover</span>
                    <span className="text-base font-bold text-emerald-300 mt-0.5 block">₹5,00,000 / Year</span>
                  </div>
                </div>
              </div>

              {/* Quick Health Summary Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Upcoming Appointments
                  </span>
                  <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">
                    {appointments.filter(a => a.status === 'upcoming').length}
                  </span>
                  <button
                    onClick={() => setCurrentSection('appointments')}
                    className="text-xs font-bold text-teal-700 hover:underline mt-2 inline-flex items-center gap-1"
                  >
                    <span>View Scheduled Visits</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    e-Prescriptions
                  </span>
                  <span className="text-2xl font-black text-slate-900 font-mono mt-1 block">
                    {prescriptions.length}
                  </span>
                  <button
                    onClick={() => setCurrentSection('prescriptions')}
                    className="text-xs font-bold text-teal-700 hover:underline mt-2 inline-flex items-center gap-1"
                  >
                    <span>Open Rx Locker</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Jan Aushadhi Annual Savings
                  </span>
                  <span className="text-2xl font-black text-emerald-600 font-mono mt-1 block">
                    ₹{annualSavings.toLocaleString()}
                  </span>
                  <button
                    onClick={() => setCurrentSection('medicines')}
                    className="text-xs font-bold text-emerald-700 hover:underline mt-2 inline-flex items-center gap-1"
                  >
                    <span>Manage Saved Meds</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* SECTION: Appointments */}
          {currentSection === 'appointments' && (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    My Medical Consultations & Bookings
                  </h3>
                  <p className="text-xs text-slate-500">
                    Track your upcoming in-person visits and live video telehealth sessions.
                  </p>
                </div>
                <button
                  onClick={() => onNavigateTab('doctors')}
                  className="px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  + Book New Doctor
                </button>
              </div>

              <div className="space-y-4">
                {appointments.map(apt => (
                  <div
                    key={apt.id}
                    className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                          apt.type === 'telehealth'
                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}>
                          {apt.type === 'telehealth' ? 'Video Telehealth' : 'In-Person Clinic'}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-500">
                          {apt.date} • {apt.timeSlot}
                        </span>
                      </div>
                      <h4 className="text-base font-extrabold text-slate-900">
                        {apt.doctorName}
                      </h4>
                      <p className="text-xs text-slate-600">
                        {apt.doctorSpecialty} • {apt.hospitalName}
                      </p>
                      {apt.symptoms && (
                        <p className="text-xs text-slate-500 italic">
                          Note: {apt.symptoms}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {apt.type === 'telehealth' && apt.status === 'upcoming' && (
                        <button
                          onClick={() => onStartTelehealthWithDoctor({ name: apt.doctorName, specialty: apt.doctorSpecialty })}
                          className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5"
                        >
                          <Video className="w-4 h-4" />
                          <span>Join Video Call Room</span>
                        </button>
                      )}

                      {apt.status === 'upcoming' && (
                        <button
                          onClick={() => cancelAppointment(apt.id)}
                          className="px-3 py-2 bg-slate-200 hover:bg-rose-100 hover:text-rose-700 text-slate-700 rounded-xl text-xs font-semibold transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {appointments.length === 0 && (
                  <div className="p-8 text-center text-slate-400 text-xs">
                    No active appointments. Book a doctor from our directory!
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECTION: Digital Prescriptions */}
          {currentSection === 'prescriptions' && (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Digital e-Prescriptions Locker
                  </h3>
                  <p className="text-xs text-slate-500">
                    Directly linked from your doctor visits with automatic Jan Aushadhi generic mapping.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                {prescriptions.map(rx => (
                  <div key={rx.id} className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200/70">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase">Rx ID: {rx.id}</span>
                        <h4 className="text-base font-bold text-slate-900">{rx.doctorName} ({rx.doctorSpecialty})</h4>
                        <p className="text-xs text-slate-500">{rx.hospitalName} • Date: {rx.date}</p>
                      </div>
                      <div className="text-left sm:text-right">
                        <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                          Diagnosis: {rx.diagnosis}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-bold text-slate-700 block mb-2">Prescribed Medicines:</span>
                      <div className="space-y-2">
                        {rx.medicines.map((med, idx) => (
                          <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                            <div>
                              <span className="font-bold text-slate-900">{med.brandName}</span>
                              <span className="text-emerald-700 font-semibold block text-[11px]">
                                Generic Salt: {med.genericSalt}
                              </span>
                            </div>
                            <div className="text-slate-600 font-mono text-[11px]">
                              <span>Dosage: {med.dosage} ({med.frequency}) • {med.duration}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-slate-600 bg-amber-50 p-2.5 rounded-xl border border-amber-100">
                      <strong>Doctor Notes:</strong> {rx.instructions}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: Saved Jan Aushadhi Medicines */}
          {currentSection === 'medicines' && (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Saved Jan Aushadhi Generic Medicines
                  </h3>
                  <p className="text-xs text-slate-500">
                    Your customized monthly medicine cabinet with estimated financial savings.
                  </p>
                </div>
                <button
                  onClick={() => onNavigateTab('medicines')}
                  className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  + Add More Medicines
                </button>
              </div>

              <div className="space-y-3">
                {savedMedicines.map(med => {
                  const isAvail = med.janAushadhiAvailable;

                  return (
                    <div
                      key={med.id}
                      className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                        isAvail ? 'bg-slate-50 border-slate-200' : 'bg-rose-50/20 border-rose-200'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-extrabold text-slate-900">{med.brandName}</h4>
                          {isAvail ? (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 inline-flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                              <span>Available in Kendra</span>
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 inline-flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                              <span>Currently Unavailable</span>
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-teal-800 font-semibold">{med.genericName}</p>
                        <p className="text-[11px] text-slate-500">{med.category} • Pack of {med.unit}</p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right font-mono">
                          <span className="text-xs text-slate-400 line-through">₹{med.brandPrice}</span>
                          <span className="text-lg font-black text-emerald-700 block">₹{med.genericPrice}</span>
                          <span className="text-[10px] text-emerald-800 font-bold bg-emerald-100 px-1.5 py-0.2 rounded">
                            Save {med.savingsPercentage}%
                          </span>
                        </div>

                        <button
                          onClick={() => removeSavedMedicine(med.id)}
                          className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Remove from saved"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}

                {savedMedicines.length === 0 && (
                  <div className="p-8 text-center text-slate-400 text-xs">
                    No saved medicines. Search and bookmark items in the Jan Aushadhi Medicines directory!
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECTION: Benefits & Schemes */}
          {currentSection === 'benefits' && (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900">
                  Ayushman Bharat PM-JAY Beneficiary Status
                </h3>
                <p className="text-xs text-slate-500">
                  Cashless healthcare coverage details and empanelled hospital claim history.
                </p>
              </div>

              <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-emerald-600" />
                    <div>
                      <h4 className="text-sm font-bold text-emerald-950">Active PM-JAY Golden Card</h4>
                      <span className="text-xs text-emerald-800">Coverage: ₹5,00,000 per family/year</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-bold rounded-full">
                    Active
                  </span>
                </div>
                <div className="pt-2 text-xs text-slate-700 space-y-1">
                  <p>• Zero out-of-pocket expenses for secondary & tertiary hospitalizations.</p>
                  <p>• 15 days pre-hospitalization and 15 days post-hospitalization medicine covered.</p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
