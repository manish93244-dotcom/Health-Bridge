import React, { useState } from 'react';
import {
  FileText,
  Activity,
  Heart,
  AlertTriangle,
  Calendar,
  User,
  ShieldCheck,
  Stethoscope,
  X,
  Search,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Pill,
  Syringe,
  Download,
  Eye,
  TrendingUp,
  FileCheck2,
  Phone,
  Clock
} from 'lucide-react';
import { PatientDetailedHistory, samplePatientHistory } from '../../data/patientHistoryData';

interface PatientCompleteHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient?: PatientDetailedHistory;
  onImportToPrescription?: (condition: string) => void;
}

export const PatientCompleteHistoryModal: React.FC<PatientCompleteHistoryModalProps> = ({
  isOpen,
  onClose,
  patient = samplePatientHistory,
  onImportToPrescription
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'consultations' | 'labs' | 'vitals' | 'abha'>('summary');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedConsultationId, setExpandedConsultationId] = useState<string | null>(
    patient.consultationHistory[0]?.id || null
  );

  if (!isOpen) return null;

  const filteredLabs = patient.labReports.filter(lab =>
    lab.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lab.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lab.hospitalLab.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden text-slate-800">
        
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-sky-700 via-blue-700 to-indigo-800 text-white p-5 sm:p-6 flex flex-wrap items-center justify-between gap-4 border-b border-sky-400/30">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/25 flex items-center justify-center text-white font-bold text-lg shadow-inner">
              {patient.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight font-['Outfit',sans-serif]">
                  {patient.name}
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/20 text-white font-semibold border border-white/30">
                  {patient.age} Yrs • {patient.gender} • {patient.bloodGroup}
                </span>
              </div>
              <p className="text-xs text-sky-100 flex items-center gap-2 mt-0.5">
                <span>ABHA: <strong>{patient.abhaId}</strong></span>
                <span>•</span>
                <span className="text-emerald-300 font-semibold">{patient.pmjaySchemeStatus}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                alert(`Exporting complete ABDM health records PDF for ${patient.name}...`);
              }}
              className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/25 text-xs font-bold text-white transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/15 hover:bg-white/25 text-white transition-all cursor-pointer"
              title="Close Dossier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-slate-100 px-5 sm:px-6 border-b border-slate-200 flex items-center gap-2 overflow-x-auto py-2.5">
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'summary'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Master EHR Summary</span>
          </button>

          <button
            onClick={() => setActiveTab('consultations')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'consultations'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Past Visits & Prescriptions ({patient.consultationHistory.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('labs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'labs'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>Diagnostic Lab Reports ({patient.labReports.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('vitals')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'vitals'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Vitals History & Trends</span>
          </button>

          <button
            onClick={() => setActiveTab('abha')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'abha'
                ? 'bg-white text-blue-700 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>ABHA & Insurance Claims</span>
          </button>
        </div>

        {/* Modal Main Content Body */}
        <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-6">

          {/* TAB 1: MASTER EHR SUMMARY */}
          {activeTab === 'summary' && (
            <div className="space-y-6 animate-in fade-in duration-150">
              
              {/* Critical Alert Bar: Allergies */}
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider">
                    Known Drug & Food Allergies:
                  </h4>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {patient.allergies.map((alg, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-white border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-1.5 shadow-2xs"
                      >
                        <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                        <span>{alg.substance} ({alg.severity})</span>
                        <span className="text-[10px] text-rose-600 font-normal">[{alg.reaction}]</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Grid: Chronic Conditions & Lifestyle */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Chronic Conditions */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-blue-600" />
                      <span>Chronic Medical Conditions</span>
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                      {patient.chronicConditions.length} Active
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {patient.chronicConditions.map((cond, idx) => (
                      <div key={idx} className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-slate-900">{cond.condition}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {cond.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">Since: {cond.diagnosedSince}</p>
                        <p className="text-xs text-slate-700 font-medium">Rx Plan: {cond.managementPlan}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Surgical & Family History */}
                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 border-b border-slate-200 pb-2.5">
                      <Syringe className="w-4 h-4 text-purple-600" />
                      <span>Past Surgical Procedures</span>
                    </h4>
                    <div className="space-y-2 mt-2.5">
                      {patient.surgicalHistory.map((surg, idx) => (
                        <div key={idx} className="bg-white p-2.5 rounded-xl border border-slate-200/80 shadow-2xs text-xs">
                          <div className="flex justify-between font-bold text-slate-900">
                            <span>{surg.procedure}</span>
                            <span className="text-purple-700 font-mono">{surg.year}</span>
                          </div>
                          <p className="text-[11px] text-slate-500">{surg.hospital} • {surg.outcome}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                      Family Medical History:
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {patient.familyHistory.map((fam, idx) => (
                        <div key={idx} className="bg-white p-2 rounded-xl border border-slate-200/80 text-xs">
                          <span className="font-bold text-slate-900 block">{fam.relative}</span>
                          <span className="text-[11px] text-slate-600">{fam.condition}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Lifestyle & Social Habits */}
              <div className="bg-gradient-to-r from-slate-50 to-blue-50/40 rounded-2xl p-4 border border-slate-200">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
                  Lifestyle, Diet & Social History
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-medium block">Smoking</span>
                    <span className="font-bold text-slate-800">{patient.lifestyle.smoking}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-medium block">Alcohol</span>
                    <span className="font-bold text-slate-800">{patient.lifestyle.alcohol}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-medium block">Dietary Pattern</span>
                    <span className="font-bold text-slate-800">{patient.lifestyle.diet}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-medium block">Physical Activity</span>
                    <span className="font-bold text-slate-800">{patient.lifestyle.physicalActivity}</span>
                  </div>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <span className="text-[10px] text-slate-500 font-medium block">Sleep Quality</span>
                    <span className="font-bold text-slate-800">{patient.lifestyle.sleepHours}</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: CONSULTATION HISTORY & PAST PRESCRIPTIONS */}
          {activeTab === 'consultations' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-600">
                  Chronological record of verified doctor consultations, diagnoses, and Jan Aushadhi generic prescriptions.
                </p>
                <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                  {patient.consultationHistory.length} Prior Visits
                </span>
              </div>

              <div className="space-y-4">
                {patient.consultationHistory.map((cons) => {
                  const isExpanded = expandedConsultationId === cons.id;
                  return (
                    <div
                      key={cons.id}
                      className="bg-slate-50 rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs"
                    >
                      {/* Accordion Bar */}
                      <div
                        onClick={() => setExpandedConsultationId(isExpanded ? null : cons.id)}
                        className="p-4 bg-white hover:bg-slate-50/80 cursor-pointer flex items-center justify-between gap-4 border-b border-slate-200 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 font-bold">
                            <Stethoscope className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-slate-900">{cons.doctorName}</span>
                              <span className="text-[11px] text-slate-500 font-medium">({cons.doctorSpecialty})</span>
                              <span className="text-[10px] bg-sky-50 text-sky-800 px-2 py-0.5 rounded font-medium border border-sky-200">
                                {cons.hospital}
                              </span>
                            </div>
                            <p className="text-xs text-blue-700 font-semibold mt-0.5">
                              Diagnosis: {cons.diagnosis}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <span className="text-xs font-mono font-bold text-slate-500">{cons.date}</span>
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                        </div>
                      </div>

                      {/* Expanded Prescription & Clinical Notes */}
                      {isExpanded && (
                        <div className="p-4 space-y-4 text-xs bg-slate-50">
                          
                          {/* Vitals at that Visit */}
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-white p-3 rounded-xl border border-slate-200">
                            <div>
                              <span className="text-[10px] text-slate-500 block uppercase">Blood Pressure</span>
                              <span className="font-bold text-slate-800">{cons.vitals.bp}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-500 block uppercase">Pulse Rate</span>
                              <span className="font-bold text-slate-800">{cons.vitals.pulse}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-500 block uppercase">Body Temp</span>
                              <span className="font-bold text-slate-800">{cons.vitals.temp}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-500 block uppercase">SpO2 Oxygen</span>
                              <span className="font-bold text-slate-800">{cons.vitals.spo2}</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-500 block uppercase">Body Weight</span>
                              <span className="font-bold text-slate-800">{cons.vitals.weight}</span>
                            </div>
                          </div>

                          {/* Chief Complaint & Doctor's Clinical Note */}
                          <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                            <div>
                              <span className="text-[10px] font-bold text-slate-500 uppercase block">Chief Complaint:</span>
                              <p className="text-slate-800 font-medium">{cons.chiefComplaint}</p>
                            </div>
                            <div className="pt-2 border-t border-slate-100">
                              <span className="text-[10px] font-bold text-slate-500 uppercase block">Clinical Examination & Assessment:</span>
                              <p className="text-slate-700 leading-relaxed">{cons.clinicalNotes}</p>
                            </div>
                          </div>

                          {/* Prescribed Medicines Table */}
                          <div className="space-y-1.5">
                            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                              Prescribed Medications:
                            </span>
                            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
                              {cons.prescribedMedicines.map((med, medIdx) => (
                                <div key={medIdx} className="p-2.5 flex flex-wrap items-center justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    <Pill className="w-3.5 h-3.5 text-teal-600" />
                                    <div>
                                      <span className="font-bold text-slate-900 text-xs">{med.brandName}</span>
                                      <span className="text-[11px] text-slate-500 block">Salt: {med.genericSalt}</span>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-3 text-xs">
                                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono font-medium">
                                      {med.dosage}
                                    </span>
                                    <span className="font-semibold text-blue-700">{med.frequency}</span>
                                    <span className="text-slate-500">[{med.duration}]</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            <span className="text-xs text-slate-600 font-medium">
                              Follow-Up Plan: <strong>{cons.followUpAdvised}</strong>
                            </span>
                            {onImportToPrescription && (
                              <button
                                onClick={() => onImportToPrescription(cons.diagnosis)}
                                className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 font-bold text-xs transition-colors cursor-pointer"
                              >
                                Re-prescribe Similar Regimen
                              </button>
                            )}
                          </div>

                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: DIAGNOSTIC LAB REPORTS */}
          {activeTab === 'labs' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              
              {/* Search Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search tests (e.g. HbA1c, Lipid, CBC, ECG)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
                <span className="text-xs text-slate-500">
                  Showing {filteredLabs.length} verified laboratory records
                </span>
              </div>

              {/* Lab Reports Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredLabs.map((lab) => (
                  <div key={lab.id} className="bg-slate-50 rounded-2xl p-4 border border-slate-200/90 shadow-2xs space-y-3">
                    <div className="flex items-start justify-between gap-2 border-b border-slate-200 pb-2.5">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 block">
                          {lab.category}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{lab.testName}</h4>
                        <span className="text-[11px] text-slate-500 font-medium">{lab.hospitalLab}</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {lab.status}
                      </span>
                    </div>

                    <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase">Reported Value</span>
                        <span className="text-lg font-extrabold text-slate-950 font-mono">
                          {lab.value} <span className="text-xs text-slate-500 font-normal">{lab.unit}</span>
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 block uppercase">Reference Range</span>
                        <span className="text-xs font-mono text-slate-700">{lab.referenceRange}</span>
                      </div>
                    </div>

                    {lab.notes && (
                      <p className="text-xs text-slate-600 bg-white/70 p-2.5 rounded-lg border border-slate-200/60">
                        {lab.notes}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <span>Date: <strong>{lab.date}</strong></span>
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> NHA ABDM Certified
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: VITALS TIMELINE & TRENDS */}
          {activeTab === 'vitals' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span>Longitudinal Vitals Trend (Last 4 Clinical Visits)</span>
                </h4>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead>
                      <tr className="bg-white border-b border-slate-200 text-slate-500 font-bold uppercase">
                        <th className="p-3">Visit Date</th>
                        <th className="p-3">Blood Pressure</th>
                        <th className="p-3">Heart Rate (Pulse)</th>
                        <th className="p-3">SpO2 Oxygen</th>
                        <th className="p-3">Temperature</th>
                        <th className="p-3">Weight (Kg)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/80">
                      {patient.vitalsTimeline.map((row, idx) => (
                        <tr key={idx} className={`hover:bg-white/80 ${idx === patient.vitalsTimeline.length - 1 ? 'bg-sky-50 font-bold' : ''}`}>
                          <td className="p-3 font-semibold text-slate-900 flex items-center gap-1.5">
                            {idx === patient.vitalsTimeline.length - 1 && (
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                            )}
                            <span>{row.date}</span>
                          </td>
                          <td className="p-3 font-mono text-slate-800">{row.bp} mmHg</td>
                          <td className="p-3 font-mono text-slate-800">{row.hr} bpm</td>
                          <td className="p-3 font-mono text-emerald-700">{row.spo2}%</td>
                          <td className="p-3 font-mono text-slate-800">{row.temp} °F</td>
                          <td className="p-3 font-mono text-slate-800">{row.weightKg} kg</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 text-xs">
                  <span className="text-[10px] uppercase font-bold text-emerald-800 block">BP Optimization</span>
                  <p className="text-emerald-950 font-bold text-sm mt-1">122/80 mmHg (Target Reached)</p>
                  <span className="text-emerald-700 text-[11px]">Normalized from 142/92 peak during acute visit.</span>
                </div>
                <div className="bg-blue-50 p-3.5 rounded-2xl border border-blue-200 text-xs">
                  <span className="text-[10px] uppercase font-bold text-blue-800 block">Resting Heart Rate</span>
                  <p className="text-blue-950 font-bold text-sm mt-1">74 bpm (Optimal Range)</p>
                  <span className="text-blue-700 text-[11px]">Steady sinus rhythm on latest check.</span>
                </div>
                <div className="bg-sky-50 p-3.5 rounded-2xl border border-sky-200 text-xs">
                  <span className="text-[10px] uppercase font-bold text-sky-800 block">Weight Trajectory</span>
                  <p className="text-sky-950 font-bold text-sm mt-1">76.2 kg (-2.2 kg in 6 mos)</p>
                  <span className="text-sky-700 text-[11px]">BMI 24.1 (Normal healthy range).</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ABHA & PM-JAY SCHEME COVER */}
          {activeTab === 'abha' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-blue-500/10 rounded-2xl p-5 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase">
                    National Health Authority ABDM Verified
                  </span>
                  <h4 className="text-lg font-bold text-slate-900">
                    Ayushman Bharat Health Account (ABHA) Locker
                  </h4>
                  <p className="text-xs text-slate-600">
                    Full consent granted for digital health records transfer under ABDM HIP/HIU protocols.
                  </p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-emerald-200 text-center font-mono shrink-0 shadow-2xs">
                  <span className="text-[10px] text-slate-500 block uppercase">ABHA Address</span>
                  <span className="font-extrabold text-sm text-teal-800">rahul.verma@abdm</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                  <span className="font-bold text-slate-900 block text-sm">PM-JAY Gold Card Benefits</span>
                  <p className="text-slate-700">Cover: <strong>₹5,00,000 / Year Cashless</strong></p>
                  <p className="text-slate-700">Scheme ID: <strong className="font-mono">{patient.pmjayId}</strong></p>
                  <p className="text-slate-700">Empanelled Coverage: <strong>All Government & Empanelled Private Hospitals</strong></p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                  <span className="font-bold text-slate-900 block text-sm">Prior Cashless Hospital Claims</span>
                  <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                    <div className="flex justify-between font-bold text-slate-900">
                      <span>Safdarjung Hospital</span>
                      <span className="text-emerald-700 font-mono">₹38,500 Cashless</span>
                    </div>
                    <p className="text-[11px] text-slate-500">Appendectomy Package • Claim #PMJAY-CLM-8812</p>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted ABDM v3 Protocol • Doctor Access Authenticated</span>
          </div>

          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-xs transition-all shadow-md cursor-pointer"
          >
            Return to Active Consultation
          </button>
        </div>

      </div>
    </div>
  );
};
