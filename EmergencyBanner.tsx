import React from 'react';
import { PhoneCall, AlertTriangle, ArrowRight, ShieldAlert, Globe, Ambulance } from 'lucide-react';
import { useHealthBridge } from '../../context/HealthBridgeContext';

interface EmergencyBannerProps {
  onNavigateToEmergency: () => void;
}

export const EmergencyBanner: React.FC<EmergencyBannerProps> = ({ onNavigateToEmergency }) => {
  const { activeSOS, language, setLanguage, t } = useHealthBridge();

  return (
    <aside aria-label="Emergency Alerts and Hotline" className="bg-gradient-to-r from-[#2c050a] via-[#480811] to-[#2c050a] backdrop-blur-xl text-white shadow-md relative z-40 border-b border-red-500/40">
      <div className="w-full max-w-[100rem] mx-auto px-2 sm:px-4 lg:px-8 py-2 flex items-center justify-between gap-2 sm:gap-4 flex-nowrap text-xs sm:text-sm overflow-x-auto no-scrollbar">
        
        {/* Left: Emergency Status or SOS Alert with Numbers */}
        <div className="flex items-center gap-2.5 min-w-0 shrink">
          {activeSOS ? (
            <div className="flex items-center gap-2 bg-red-900/60 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full animate-pulse border border-red-400/40 shrink-0">
              <span className="w-2 h-2 rounded-full bg-amber-300 shrink-0"></span>
              <span className="font-bold text-amber-200 text-xs truncate max-w-[150px] sm:max-w-none">
                {t.emergencyBanner.activeSosText}: Ambulance {activeSOS.assignedAmbulance?.vehicleNo} • ETA {activeSOS.assignedAmbulance?.currentEtaMinutes}m
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 font-semibold tracking-wide shrink-0">
              <span className="flex h-2.5 w-2.5 relative shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-400"></span>
              </span>

              {/* Desktop view: 24x7 Grid Title */}
              <span className="hidden lg:flex items-center gap-1.5 font-bold uppercase tracking-wider text-red-200 whitespace-nowrap text-xs">
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                <span>{t.emergencyBanner.gridTitle}</span>
              </span>

              {/* Mobile view: Ambulance Icon + 108 */}
              <a
                href="tel:108"
                className="flex lg:hidden items-center gap-1.5 text-white font-black text-xs whitespace-nowrap bg-red-800/80 hover:bg-red-700/90 px-2 py-1 rounded-full border border-red-400/40 transition-colors"
                title="Call 108 Emergency Ambulance"
              >
                <Ambulance className="w-4 h-4 text-amber-300 shrink-0 animate-bounce" />
                <span className="font-mono text-red-100 font-extrabold">108</span>
              </a>
            </div>
          )}

          {/* Desktop view: Ambulance No. and PM-JAY No. */}
          <div className="hidden lg:flex items-center gap-3.5 text-red-200/90 pl-3 border-l border-red-500/30 shrink-0 text-xs">
            <a
              href="tel:108"
              className="flex items-center gap-1.5 font-medium hover:text-white transition-colors"
              title="National Ambulance Hotline"
            >
              <Ambulance className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{t.emergencyBanner.nationalAmbulance}:</span>
              <strong className="text-white font-mono bg-red-900/60 px-1.5 py-0.5 rounded border border-red-500/40 font-bold">108</strong>
            </a>
            <a
              href="tel:14555"
              className="flex items-center gap-1.5 font-medium hover:text-white transition-colors"
              title="PM-JAY National Health Helpline"
            >
              <PhoneCall className="w-3.5 h-3.5 text-red-300 shrink-0" />
              <span>{t.emergencyBanner.pmjayHelpline}:</span>
              <strong className="text-white font-mono bg-red-900/60 px-1.5 py-0.5 rounded border border-red-500/40 font-bold">14555</strong>
            </a>
          </div>
        </div>

        {/* Right: Quick SOS Trigger & Language Selector - Anchored Right with generous spacing & clean mobile scaling */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-auto">
          
          {/* SOS Dispatch Launch Button */}
          <button
            id="emergency-banner-sos-btn"
            onClick={onNavigateToEmergency}
            className="flex items-center gap-1.5 sm:gap-2 bg-red-600 hover:bg-red-500 text-white px-2.5 sm:px-4 py-1.5 rounded-full font-bold shadow-md shadow-red-950 hover:shadow-xl hover:shadow-red-500/40 transition-all duration-300 transform hover:scale-105 active:scale-95 group cursor-pointer border border-red-400/50 select-none shrink-0"
          >
            <AlertTriangle className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-white group-hover:scale-110 group-hover:rotate-6 transition-transform duration-200 shrink-0" />
            <span className="whitespace-nowrap font-bold text-xs sm:text-sm">
              {activeSOS ? t.emergencyBanner.viewLiveTrack : t.emergencyBanner.launchSos}
            </span>
            <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-white/90 group-hover:translate-x-1 transition-transform duration-200 shrink-0 hidden sm:inline-block" />
          </button>

          {/* Hindi / English Language Switcher (shifted cleanly to the right of Launch SOS Dispatch) */}
          <div
            id="emergency-language-switcher"
            className="flex items-center bg-black/60 backdrop-blur-md p-0.5 sm:p-1 rounded-full border border-red-400/40 shadow-inner shrink-0"
            role="group"
            aria-label="Select Language (भाषा चुनें)"
          >
            <div className="hidden sm:flex items-center pl-1.5 pr-0.5 text-red-300">
              <Globe className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
            </div>

            {/* English button */}
            <button
              id="lang-btn-en"
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2 sm:px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-200 cursor-pointer select-none whitespace-nowrap ${
                language === 'en'
                  ? 'bg-white text-slate-950 shadow-md scale-105'
                  : 'text-red-200 hover:text-white hover:bg-white/10'
              }`}
              title="Switch to English"
              aria-pressed={language === 'en'}
            >
              EN
            </button>

            {/* Hindi (हिन्दी) button */}
            <button
              id="lang-btn-hi"
              type="button"
              onClick={() => setLanguage('hi')}
              className={`px-2 sm:px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold transition-all duration-200 cursor-pointer select-none whitespace-nowrap ${
                language === 'hi'
                  ? 'bg-amber-400 text-slate-950 shadow-md scale-105'
                  : 'text-red-200 hover:text-white hover:bg-white/10'
              }`}
              title="हिन्दी में बदलें (Switch to Hindi)"
              aria-pressed={language === 'hi'}
            >
              हिन्दी
            </button>
          </div>

        </div>

      </div>
    </aside>
  );
};
