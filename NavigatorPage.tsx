import React, { useState } from 'react';
import {
  Compass,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Stethoscope,
  PhoneCall,
  Activity,
  ArrowRight,
  RefreshCw,
  Info,
  ShieldAlert,
  HelpCircle,
  Clock,
  HeartPulse,
  Send
} from 'lucide-react';
import { checkSymptomsAI } from '../services/aiService';
import { SymptomTriageResult } from '../types';
import { useHealthBridge } from '../context/HealthBridgeContext';

interface NavigatorPageProps {
  onNavigate: (tabId: string) => void;
  onSelectSpecialist?: (specialty: string) => void;
}

export const NavigatorPage: React.FC<NavigatorPageProps> = ({
  onNavigate,
  onSelectSpecialist
}) => {
  const { doctors, t } = useHealthBridge();
  const [symptomsInput, setSymptomsInput] = useState('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('Male');
  const [duration, setDuration] = useState<string>('2-3 Days');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SymptomTriageResult | null>(null);

  const commonSymptomChips = [
    'Fever with chills',
    'Sore throat & dry cough',
    'Sudden chest heaviness',
    'Shortness of breath',
    'Severe headache & nausea',
    'Upper abdominal acid burning',
    'Lower back pain',
    'Diarrhea & dehydration',
    'Joint pain & stiffness',
    'Skin rash with itching'
  ];

  const handleToggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(prev => prev.filter(t => t !== tag));
    } else {
      setSelectedTags(prev => [...prev, tag]);
    }
  };

  const handleRunTriage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const combinedSymptoms = [
      symptomsInput.trim(),
      selectedTags.length > 0 ? `Selected tags: ${selectedTags.join(', ')}` : ''
    ].filter(Boolean).join('; ');

    if (!combinedSymptoms) return;

    setLoading(true);
    try {
      const parsedAge = parseInt(age, 10) || 30;
      const triage = await checkSymptomsAI(combinedSymptoms, parsedAge, gender, duration);
      setResult(triage);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (level: string) => {
    if (level.includes('Emergency')) {
      return {
        bg: 'bg-red-50',
        border: 'border-red-300',
        badge: 'bg-red-600 text-white',
        text: 'text-red-800',
        icon: ShieldAlert
      };
    }
    if (level.includes('Moderate')) {
      return {
        bg: 'bg-amber-50',
        border: 'border-amber-300',
        badge: 'bg-amber-600 text-white',
        text: 'text-amber-900',
        icon: AlertTriangle
      };
    }
    return {
      bg: 'bg-emerald-50',
      border: 'border-emerald-300',
      badge: 'bg-emerald-600 text-white',
      text: 'text-emerald-900',
      icon: CheckCircle2
    };
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-blue-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-sky-400/40">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30">
            <Compass className="w-3.5 h-3.5 text-sky-200" />
            <span>{t.navigator.badge}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-['Outfit',sans-serif] text-white">
            {t.navigator.title}
          </h1>
          <p className="text-xs sm:text-sm text-sky-100 leading-relaxed">
            {t.navigator.sub}
          </p>
        </div>
      </div>

      {/* Input Form & Triage Workflow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Form (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-5 sm:p-6 space-y-5">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <HeartPulse className="w-5 h-5 text-teal-600" />
            <span>Enter Symptoms & Demographics</span>
          </h2>

          <form onSubmit={handleRunTriage} className="space-y-4">
            
            {/* Demographics Row */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Age (Years)
                </label>
                <input
                  type="number"
                  min="1"
                  max="110"
                  placeholder="e.g. 35"
                  value={age}
                  onChange={e => setAge(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-teal-600 focus:bg-white focus:ring-1 focus:ring-teal-600 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={e => setGender(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-teal-600 focus:bg-white focus:ring-1 focus:ring-teal-600 transition-colors"
                >
                  <option value="Male" className="text-slate-900 bg-white">Male</option>
                  <option value="Female" className="text-slate-900 bg-white">Female</option>
                  <option value="Other" className="text-slate-900 bg-white">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Duration of Symptoms
              </label>
              <select
                value={duration}
                onChange={e => setDuration(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-teal-600 focus:bg-white focus:ring-1 focus:ring-teal-600 transition-colors"
              >
                <option value="Just started (< 6 hours)" className="text-slate-900 bg-white">Just started (&lt; 6 hours)</option>
                <option value="Today (6-24 hours)" className="text-slate-900 bg-white">Today (6-24 hours)</option>
                <option value="2-3 Days" className="text-slate-900 bg-white">2-3 Days</option>
                <option value="1-2 Weeks" className="text-slate-900 bg-white">1-2 Weeks</option>
                <option value="Chronic (> 1 Month)" className="text-slate-900 bg-white">Chronic (&gt; 1 Month)</option>
              </select>
            </div>

            {/* Quick Chips */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">
                Common Symptom Tags:
              </label>
              <div className="flex flex-wrap gap-1.5">
                {commonSymptomChips.map((chip, idx) => {
                  const isSelected = selectedTags.includes(chip);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleToggleTag(chip)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border font-medium transition-all ${
                        isSelected
                          ? 'bg-teal-700 text-white border-teal-700 font-bold shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {chip}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Freeform Symptom Text Area */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Describe in Your Own Words:
              </label>
              <textarea
                rows={3}
                value={symptomsInput}
                onChange={e => setSymptomsInput(e.target.value)}
                placeholder="e.g. Sharp pain in lower right side, mild fever 101 F, feeling nauseous since morning..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-teal-600 focus:bg-white focus:ring-1 focus:ring-teal-600 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading || (!symptomsInput.trim() && selectedTags.length === 0)}
              className="w-full py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 disabled:opacity-50 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing with Clinical AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Run Symptom Triage Assessment</span>
                </>
              )}
            </button>

          </form>
        </div>

        {/* Right Output Area (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {result ? (
            (() => {
              const risk = getRiskColor(result.riskLevel);
              const RiskIcon = risk.icon;

              return (
                <div className={`bg-white rounded-2xl border ${risk.border} shadow-md p-6 space-y-6 animate-in fade-in duration-200`}>
                  
                  {/* Result Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl ${risk.bg} border ${risk.border}`}>
                        <RiskIcon className="w-6 h-6 text-slate-800" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Triage Urgency Level
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={`text-xs sm:text-sm font-extrabold px-3 py-1 rounded-full ${risk.badge}`}>
                            {result.riskLevel}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right sm:border-l sm:border-slate-100 sm:pl-4">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Severity Score
                      </span>
                      <div className="flex items-center sm:justify-end gap-1 mt-0.5">
                        <span className="text-2xl font-black font-mono text-slate-900">
                          {result.severityScore}
                        </span>
                        <span className="text-xs text-slate-400">/ 10</span>
                      </div>
                    </div>
                  </div>

                  {/* Immediate Recommended Action */}
                  <div className={`${risk.bg} rounded-xl p-4 border ${risk.border}`}>
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">
                      Recommended Care Action:
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed">
                      {result.recommendedAction}
                    </p>
                  </div>

                  {/* Clinical Differentials & Matching Specialty */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
                      <span className="text-xs font-bold text-slate-700 block mb-2">
                        Probable Differentials (Non-Definitive):
                      </span>
                      <ul className="space-y-1 text-xs text-slate-700">
                        {result.possibleCauses.map((cause, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-teal-600 font-bold">•</span>
                            <span>{cause}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-teal-50/70 rounded-xl p-4 border border-teal-200/80 flex flex-col justify-between">
                      <div>
                        <span className="text-xs font-bold text-teal-900 block mb-1">
                          Recommended Medical Specialty:
                        </span>
                        <p className="text-sm font-extrabold text-teal-800 font-['Outfit',sans-serif]">
                          {result.recommendedSpecialist}
                        </p>
                      </div>

                      <button
                        onClick={() => onNavigate('doctors')}
                        className="mt-3 w-full py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                      >
                        <Stethoscope className="w-3.5 h-3.5" />
                        <span>Find {result.recommendedSpecialist.split('/')[0]}</span>
                      </button>
                    </div>
                  </div>

                  {/* Red Flags Alert */}
                  {result.redFlags.length > 0 && (
                    <div className="bg-rose-50 rounded-xl p-4 border border-rose-200">
                      <span className="text-xs font-bold text-rose-900 flex items-center gap-1.5 mb-2">
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                        Critical Red Flag Symptoms (Seek ER Immediately):
                      </span>
                      <ul className="space-y-1 text-xs text-rose-800">
                        {result.redFlags.map((flag, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-rose-600 font-bold">⚠</span>
                            <span>{flag}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* First Aid & Supportive Measures */}
                  {result.firstAidAdvice.length > 0 && (
                    <div>
                      <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-2">
                        Safe First Aid & Home Supportive Care:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {result.firstAidAdvice.map((advice, idx) => (
                          <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{advice}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Questions to Ask Doctor */}
                  {result.suggestedQuestionsForDoctor.length > 0 && (
                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                      <span className="text-xs font-bold text-slate-700 block mb-2">
                        Suggested Questions to Ask Your Consulting Doctor:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-600">
                        {result.suggestedQuestionsForDoctor.map((q, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <HelpCircle className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                            <span>"{q}"</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => onNavigate('emergency')}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-2xs transition-colors flex items-center gap-1.5"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Launch Emergency SOS (108)</span>
                    </button>

                    <button
                      onClick={() => onNavigate('medicines')}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors"
                    >
                      Search Generic Jan Aushadhi Meds
                    </button>
                  </div>

                </div>
              );
            })()
          ) : (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center flex flex-col items-center justify-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <Compass className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-800">
                Awaiting Symptom Input
              </h3>
              <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                Select common symptom tags on the left or type your health complaints to generate a comprehensive AI triage report.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
