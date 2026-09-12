import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertCircle,
  PhoneCall,
  ExternalLink,
  Sparkles,
  Bookmark,
  BookmarkCheck,
  FileText,
  UserCheck,
  Building2,
  HeartPulse
} from 'lucide-react';
import { useHealthBridge } from '../context/HealthBridgeContext';
import { SchemeCard } from '../components/cards/SchemeCard';
import { checkSchemeEligibilityAI } from '../services/aiService';

export const GovernmentBenefitsPage: React.FC = () => {
  const { schemes, t } = useHealthBridge();
  const [searchQuery, setSearchQuery] = useState('');

  // Eligibility Calculator State
  const [calcAge, setCalcAge] = useState<string>('');
  const [calcIncome, setCalcIncome] = useState<string>('Below ₹2.5 Lakhs/year');
  const [calcCategory, setCalcCategory] = useState<string>('Ration Card / BPL / Antyodaya');
  const [calcState, setCalcState] = useState<string>('Delhi NCR / All India');
  const [calcLoading, setCalcLoading] = useState(false);
  const [calcResult, setCalcResult] = useState<any | null>(null);

  const filteredSchemes = schemes.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.coverageAmount.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEvaluateEligibility = async (e: React.FormEvent) => {
    e.preventDefault();
    setCalcLoading(true);
    try {
      const incomeNum =
        calcIncome.includes('Below') ? 180000 : calcIncome.includes('2.5 - 5') ? 350000 : 700000;
      const ageNum = parseInt(calcAge, 10) || 45;
      const isSenior = ageNum >= 70 || calcCategory.includes('Senior');
      const isBpl = calcCategory.includes('Ration') || calcCategory.includes('BPL');

      const res = await checkSchemeEligibilityAI({
        state: calcState,
        familyIncomeAnnual: incomeNum,
        rationCardType: isBpl ? 'Antyodaya/BPL' : 'None',
        hasSeniorCitizen: isSenior,
        bplStatus: isBpl,
        occupationalCategory: calcCategory
      });
      setCalcResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setCalcLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-blue-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-sky-400/40">
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3 flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-200" />
              <span>{t.schemes.badge}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-['Outfit',sans-serif] text-white">
              {t.schemes.title}
            </h1>
            <p className="text-xs sm:text-sm text-sky-100 leading-relaxed">
              {t.schemes.sub}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="px-3 py-1 rounded-lg bg-white/15 text-xs text-white font-mono border border-white/20">
                National PM-JAY Helpline: <strong>14555</strong>
              </div>
              <div className="px-3 py-1 rounded-lg bg-white/20 text-xs text-white font-semibold border border-white/25">
                ✓ Ayushman Vay Vandana (Age 70+ Universal ₹5 Lakhs)
              </div>
            </div>
          </div>

          <div className="shrink-0 w-full lg:w-auto flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-blue-300 rounded-2xl blur-sm opacity-40 group-hover:opacity-70 transition duration-300"></div>
              <img
                src="/pm-ayushman-card.jpg"
                alt="PM presenting Ayushman Vay Vandana Card 5 Lakh Scheme"
                referrerPolicy="no-referrer"
                className="relative w-full sm:w-80 md:w-96 lg:w-84 xl:w-96 h-48 sm:h-52 object-cover rounded-2xl shadow-xl border border-white/30"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Scheme Eligibility Calculator */}
      <div className="bg-white rounded-3xl border border-teal-200/80 shadow-md p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {t.schemes.eligibilityTitle}
            </h2>
            <p className="text-xs text-slate-500">
              {t.schemes.sub}
            </p>
          </div>
        </div>

        <form onSubmit={handleEvaluateEligibility} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Beneficiary Age
            </label>
            <input
              type="number"
              min="1"
              max="110"
              placeholder="e.g. 45"
              value={calcAge}
              onChange={e => setCalcAge(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 placeholder:text-slate-400 placeholder:font-normal focus:outline-none focus:border-teal-600 focus:bg-white focus:ring-1 focus:ring-teal-600 transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Annual Family Income
            </label>
            <select
              value={calcIncome}
              onChange={e => setCalcIncome(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-teal-600 focus:bg-white focus:ring-1 focus:ring-teal-600 transition-colors"
            >
              <option value="Below ₹2.5 Lakhs/year" className="text-slate-900 bg-white">Below ₹2.5 Lakhs/year (BPL/EWS)</option>
              <option value="₹2.5 - ₹5 Lakhs/year" className="text-slate-900 bg-white">₹2.5 - ₹5 Lakhs/year (Low Income)</option>
              <option value="Above ₹5 Lakhs/year" className="text-slate-900 bg-white">Above ₹5 Lakhs/year (Middle Class)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Social / Occupational Category
            </label>
            <select
              value={calcCategory}
              onChange={e => setCalcCategory(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:border-teal-600 focus:bg-white focus:ring-1 focus:ring-teal-600 transition-colors"
            >
              <option value="Ration Card / BPL / Antyodaya" className="text-slate-900 bg-white">Ration Card / BPL / Antyodaya</option>
              <option value="Senior Citizen (70+ All Income)" className="text-slate-900 bg-white">Senior Citizen (Age 70+ Universal Cover)</option>
              <option value="Unorganized Laborer / Street Vendor" className="text-slate-900 bg-white">Unorganized Worker / e-Shram</option>
              <option value="General Citizen" className="text-slate-900 bg-white">General Citizen / Salaried</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              disabled={calcLoading}
              className="w-full py-2.5 bg-teal-700 hover:bg-teal-800 disabled:opacity-50 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {calcLoading ? (
                <span>Evaluating...</span>
              ) : (
                <>
                  <UserCheck className="w-4 h-4" />
                  <span>{t.schemes.checkEligibilityBtn}</span>
                </>
              )}
            </button>
          </div>
        </form>

        {calcResult && (
          <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <h4 className="text-sm font-extrabold text-emerald-950">
                  Eligibility Evaluation Result
                </h4>
              </div>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-200 px-2.5 py-0.5 rounded-full">
                {calcResult.eligibleSchemes?.length > 0 ? `${calcResult.eligibleSchemes.length} Schemes Matched` : 'Evaluation Complete'}
              </span>
            </div>

            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {calcResult.summary}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {calcResult.eligibleSchemes?.map((item: any, idx: number) => (
                <div key={idx} className="bg-white p-3.5 rounded-xl border border-emerald-100 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-teal-900 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-teal-600" />
                      {item.name}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                      {item.matchScore}% Match
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px]">{item.reason}</p>
                  <p className="text-emerald-800 font-semibold text-[11px] pt-1 border-t border-slate-100">
                    Benefit: {item.keyBenefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Schemes Grid */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-white font-['Outfit',sans-serif]">
            Verified Government Health Welfare Programs
          </h2>

          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search scheme name or benefit..."
              className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-600"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSchemes.map(scheme => (
            <SchemeCard key={scheme.id} scheme={scheme} />
          ))}
        </div>
      </div>

    </div>
  );
};
