import React, { useState } from 'react';
import {
  ShieldCheck,
  Bookmark,
  BookmarkCheck,
  FileText,
  PhoneCall,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { GovernmentScheme } from '../../types';
import { useHealthBridge } from '../../context/HealthBridgeContext';

interface SchemeCardProps {
  scheme: GovernmentScheme;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({ scheme }) => {
  const { bookmarkedSchemes, toggleBookmarkScheme } = useHealthBridge();
  const [expanded, setExpanded] = useState(false);
  const isBookmarked = bookmarkedSchemes.includes(scheme.id);

  return (
    <div className="bg-sky-50/95 rounded-3xl border border-sky-200 shadow-xl hover:shadow-2xl hover:border-sky-400 hover:ring-2 hover:ring-sky-400/20 hover:-translate-y-1.5 active:scale-[0.99] transition-all duration-300 p-5 flex flex-col justify-between group text-sky-950 cursor-pointer">
      
      {/* Top Banner & Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg bg-white/90 text-teal-700 border border-sky-200 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-teal-600" />
                Government Healthcare Assurance
              </span>
              <span className="text-[10px] text-sky-700 font-medium">
                {scheme.applicableHospitalsCount.toLocaleString()}+ Empanelled Centers
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-sky-950 group-hover:text-blue-700 transition-colors">
              {scheme.name}
            </h3>
            <p className="text-xs text-sky-700 font-medium">{scheme.ministry}</p>
          </div>

          <button
            onClick={() => toggleBookmarkScheme(scheme.id)}
            className={`p-2.5 rounded-2xl border transition-all hover:scale-105 active:scale-95 shrink-0 cursor-pointer ${
              isBookmarked
                ? 'bg-amber-100 text-amber-800 border-amber-300 shadow-xs'
                : 'bg-white/80 text-sky-700 hover:text-sky-950 border-sky-200'
            }`}
            title={isBookmarked ? 'Saved in my benefits' : 'Bookmark scheme'}
          >
            {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-amber-600" /> : <Bookmark className="w-4 h-4" />}
          </button>
        </div>

        {/* Coverage Amount Banner */}
        <div className="bg-white/80 rounded-2xl p-3.5 border border-sky-200/80 my-3 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 block">
            Financial Health Cover
          </span>
          <span className="text-base sm:text-lg font-extrabold text-sky-950 font-['Outfit',sans-serif]">
            {scheme.coverageAmount}
          </span>
          <p className="text-xs text-sky-800 mt-1 leading-snug">
            {scheme.tagline}
          </p>
        </div>

        {/* Core Eligibility Quick Preview */}
        <div className="space-y-1.5 mb-3">
          <span className="text-[11px] font-bold text-sky-800 uppercase tracking-wider block">
            Key Eligibility Criteria:
          </span>
          <ul className="space-y-1 text-xs text-sky-900">
            {scheme.eligibilityCriteria.slice(0, 2).map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Expanded Details: Documents & How to Apply */}
        {expanded && (
          <div className="pt-3 border-t border-sky-200 space-y-3.5 animate-in fade-in duration-150 text-xs">
            <div>
              <span className="font-bold text-sky-950 block mb-1">
                Required Documents:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {scheme.requiredDocuments.map((doc, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-white/80 border border-sky-200 text-sky-800 font-medium flex items-center gap-1 text-[11px]"
                  >
                    <FileText className="w-3 h-3 text-sky-600" />
                    {doc}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="font-bold text-sky-950 block mb-1">
                Step-by-Step Claim / Application Process:
              </span>
              <ol className="space-y-1.5 text-sky-900 list-decimal pl-4">
                {scheme.howToApply.map((step, idx) => (
                  <li key={idx} className="pl-0.5">{step}</li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>

      {/* Action Strip */}
      <div className="pt-3 border-t border-sky-200 flex items-center justify-between gap-2 mt-3">
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors cursor-pointer"
        >
          <span>{expanded ? 'Hide Application Steps' : 'View Full Details & Steps'}</span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${scheme.helpline.split('/')[0].trim()}`}
            className="p-2.5 rounded-xl bg-white/80 hover:bg-white border border-sky-200 text-sky-700 text-xs font-bold transition-all hover:scale-105 active:scale-95"
            title={`Call Helpline: ${scheme.helpline}`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
          </a>

          <a
            href={scheme.officialPortalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/25 hover:shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Official Portal</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
