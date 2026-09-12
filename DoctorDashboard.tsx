import React, { useState } from 'react';
import {
  Stethoscope,
  Video,
  Clock,
  User,
  FileText,
  CheckCircle2,
  Calendar,
  Sparkles,
  Pill,
  Send,
  Plus,
  Trash2,
  PhoneCall
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useHealthBridge } from '../context/HealthBridgeContext';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';

interface DoctorDashboardProps {
  onNavigateTab: (tabId: string) => void;
  onStartTelehealth: (patientOrDocInfo: any) => void;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({
  onNavigateTab,
  onStartTelehealth
}) => {
  const { user } = useAuth();
  const { appointments, addPrescription } = useHealthBridge();
  const [currentSection, setCurrentSection] = useState('queue');

  // e-Prescription Form State
  const [patientName, setPatientName] = useState('Rahul Verma');
  const [diagnosis, setDiagnosis] = useState('Acute Bacterial Sinusitis & Pharyngitis');
  const [instructions, setInstructions] = useState('Complete 5-day antibiotic course. Steam inhalation twice daily. Drink warm fluids.');
  const [medsList, setMedsList] = useState([
    { brandName: 'Augmentin 625 Duo', genericSalt: 'Amoxicillin + Clavulanic Acid (500mg+125mg)', dosage: '625mg', frequency: '1-0-1 (After Food)', duration: '5 Days' },
    { brandName: 'Pantocid 40', genericSalt: 'Pantoprazole 40mg', dosage: '40mg', frequency: '1-0-0 (Before Breakfast)', duration: '5 Days' },
    { brandName: 'Calpol 650', genericSalt: 'Paracetamol 650mg', dosage: '650mg', frequency: 'SOS if fever > 100 F', duration: '3 Days' }
  ]);
  const [prescribedSuccess, setPrescribedSuccess] = useState(false);

  const handleAddMedRow = () => {
    setMedsList(prev => [
      ...prev,
      { brandName: '', genericSalt: '', dosage: '', frequency: '1-0-1', duration: '5 Days' }
    ]);
  };

  const handleRemoveMedRow = (idx: number) => {
    setMedsList(prev => prev.filter((_, i) => i !== idx));
  };

  const handleUpdateMed = (index: number, field: string, val: string) => {
    setMedsList(prev => {
      const copy = [...prev];
      (copy[index] as any)[field] = val;
      return copy;
    });
  };

  const handleIssueRx = (e: React.FormEvent) => {
    e.preventDefault();
    addPrescription({
      patientId: 'pat-1',
      patientName,
      doctorId: user?.id || 'doc-1',
      doctorName: user?.name || 'Dr. Priya Sharma',
      doctorSpecialty: 'Internal Medicine',
      hospitalName: 'AIIMS New Delhi',
      date: new Date().toISOString().split('T')[0],
      diagnosis,
      medicines: medsList,
      instructions
    });
    setPrescribedSuccess(true);
    setTimeout(() => setPrescribedSuccess(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-blue-700 text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-sky-100 text-xs font-bold border border-white/20">
            <Stethoscope className="w-3.5 h-3.5 text-sky-200" />
            <span>Doctor Consultation Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-['Outfit',sans-serif]">
            {user?.name} (MD, DNB)
          </h1>
          <p className="text-xs text-sky-100">
            AIIMS New Delhi • Cardiology & General Medicine • OPD Room #402
          </p>
        </div>

        <button
          onClick={() => onStartTelehealth({ name: 'Rahul Verma (Next in Queue)' })}
          className="px-5 py-3 bg-white text-sky-900 hover:bg-sky-50 text-xs sm:text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <Video className="w-4 h-4 text-sky-600 animate-pulse" />
          <span>Launch Telehealth Video Room</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Sidebar */}
        <DashboardSidebar
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          onNavigateTab={onNavigateTab}
        />

        {/* Dynamic Section */}
        <div className="flex-1 w-full space-y-6">
          
          {/* SECTION: Patient Queue */}
          {currentSection === 'queue' && (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Today's OPD & Telehealth Patient Queue
                  </h3>
                  <p className="text-xs text-slate-500">
                    4 patients in queue (1 Telehealth, 3 In-Clinic).
                  </p>
                </div>
                <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
                  Queue Active
                </span>
              </div>

              <div className="space-y-3">
                {[
                  { id: '1', name: 'Rahul Verma', age: 42, gender: 'Male', time: '10:00 AM', mode: 'Telehealth Video', reason: 'Fever 101 F, throat congestion, fatigue', abha: '91-4920-1849-0129', status: 'Next Up' },
                  { id: '2', name: 'Sunita Devi', age: 58, gender: 'Female', time: '10:30 AM', mode: 'In-Clinic', reason: 'Hypertension follow-up & Blood Pressure check', abha: '91-8840-2918-4421', status: 'Waiting' },
                  { id: '3', name: 'Amit Patel', age: 34, gender: 'Male', time: '11:00 AM', mode: 'In-Clinic', reason: 'Post-viral chest tightness, ECG review', abha: '91-3320-1192-5502', status: 'Waiting' },
                  { id: '4', name: 'Vikram Singh', age: 67, gender: 'Male', time: '11:30 AM', mode: 'Telehealth Video', reason: 'PM-JAY Cardiology review & Angiography consult', abha: '91-7710-9941-1003', status: 'Waiting' }
                ].map(pt => (
                  <div
                    key={pt.id}
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-slate-900">{pt.name}</span>
                        <span className="text-xs text-slate-500">({pt.age}y / {pt.gender})</span>
                        <span className="text-[10px] font-mono text-teal-800 bg-teal-50 px-1.5 py-0.2 rounded border border-teal-200">
                          ABHA: {pt.abha}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium">Chief Complaint: {pt.reason}</p>
                      <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">
                        Slot: {pt.time} • Mode: <strong>{pt.mode}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {pt.mode.includes('Telehealth') ? (
                        <button
                          onClick={() => onStartTelehealth(pt)}
                          className="px-3.5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
                        >
                          <Video className="w-3.5 h-3.5" />
                          <span>Start Video</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setCurrentSection('prescribe')}
                          className="px-3.5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
                        >
                          <FileText className="w-3.5 h-3.5" />
                          <span>Examine & Rx</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION: Write e-Prescription */}
          {currentSection === 'prescribe' && (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Write Digital e-Prescription (Jan Aushadhi Compliant)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Automatically converts brand medicines into generic salts for Jan Aushadhi Kendra dispensing.
                  </p>
                </div>
              </div>

              {prescribedSuccess && (
                <div className="bg-emerald-600 text-white p-3.5 rounded-xl text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                  <span>Prescription securely transmitted to Patient ABHA Digital Health Locker and Jan Aushadhi Network!</span>
                </div>
              )}

              <form onSubmit={handleIssueRx} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Patient Name</label>
                    <input
                      type="text"
                      value={patientName}
                      onChange={e => setPatientName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-teal-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Clinical Diagnosis</label>
                    <input
                      type="text"
                      value={diagnosis}
                      onChange={e => setDiagnosis(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-semibold text-slate-900 focus:outline-none focus:border-teal-600 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-700">Prescription Medicines & Generic Salts</label>
                    <button
                      type="button"
                      onClick={handleAddMedRow}
                      className="text-xs text-teal-700 font-bold hover:underline flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Medicine</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {medsList.map((med, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-1 sm:grid-cols-12 gap-2 items-center text-xs">
                        <div className="sm:col-span-4">
                          <input
                            type="text"
                            placeholder="Brand (e.g. Augmentin 625)"
                            value={med.brandName}
                            onChange={e => handleUpdateMed(idx, 'brandName', e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded-lg p-2 font-medium text-slate-900 placeholder:text-slate-400"
                          />
                        </div>
                        <div className="sm:col-span-4">
                          <input
                            type="text"
                            placeholder="Generic Salt (e.g. Amoxicillin+Clavulanate)"
                            value={med.genericSalt}
                            onChange={e => handleUpdateMed(idx, 'genericSalt', e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded-lg p-2 text-emerald-800 font-medium placeholder:text-slate-400"
                          />
                        </div>
                        <div className="sm:col-span-3">
                          <input
                            type="text"
                            placeholder="Dosage & Frequency"
                            value={med.frequency}
                            onChange={e => handleUpdateMed(idx, 'frequency', e.target.value)}
                            className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 placeholder:text-slate-400 font-medium"
                          />
                        </div>
                        <div className="sm:col-span-1 text-right">
                          <button
                            type="button"
                            onClick={() => handleRemoveMedRow(idx)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Dietary & Clinical Instructions</label>
                  <textarea
                    rows={2}
                    value={instructions}
                    onChange={e => setInstructions(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit e-Prescription to Patient & PMBJP Network</span>
                </button>
              </form>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
