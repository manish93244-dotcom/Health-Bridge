import React, { useState, useRef, useEffect } from 'react';
import {
  HeartPulse,
  Stethoscope,
  Building2,
  Pill,
  ShieldCheck,
  PhoneCall,
  Bot,
  User,
  ChevronDown,
  Menu,
  X,
  Compass,
  LayoutDashboard,
  LogOut,
  Activity,
  Users
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useHealthBridge } from '../../context/HealthBridgeContext';
import { HealthBridgeLogo } from './HealthBridgeLogo';
import { UserRole } from '../../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { user, activeRole, switchRole, logout } = useAuth();
  const { setAiAssistantOpen, activeSOS, t } = useHealthBridge();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setRoleMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const primaryNavItems = [
    { id: 'landing', label: t.nav.home, icon: HeartPulse },
    { id: 'navigator', label: t.nav.navigator, icon: Compass },
    { id: 'doctors', label: t.nav.doctors, icon: Stethoscope },
    { id: 'hospitals', label: t.nav.hospitals, icon: Building2 },
    { id: 'medicines', label: t.nav.medicines, icon: Pill },
    { id: 'schemes', label: t.nav.schemes, icon: ShieldCheck },
    { id: 'contact', label: t.nav.contact, icon: Users },
  ];

  const roleConfigs: { role: UserRole; title: string; desc: string; icon: any; color: string }[] = [
    { role: 'patient', title: 'Patient Profile', desc: 'Book appointments, ABHA ID & Rx locker', icon: User, color: 'text-teal-400' },
    { role: 'doctor', title: 'Doctor Workspace', desc: 'Telehealth queue & clinical EHR', icon: Stethoscope, color: 'text-blue-400' },
    { role: 'pharmacy', title: 'Jan Aushadhi Kendra', desc: 'Generic medicine inventory & orders', icon: Pill, color: 'text-amber-400' },
    { role: 'admin', title: 'Health Mission Admin', desc: 'Beds, ambulance fleet & claims', icon: LayoutDashboard, color: 'text-purple-400' }
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  const getDashboardTabForRole = (role: UserRole) => {
    switch (role) {
      case 'doctor': return 'doctor-dash';
      case 'pharmacy': return 'pharmacy-dash';
      case 'admin': return 'admin-dash';
      case 'patient':
      default:
        return 'patient-dash';
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-2xl border-b border-white/10 shadow-xl" ref={menuRef}>
      <div className="w-full max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18 gap-2 sm:gap-4">
          
          {/* ================= LEFT SECTION: LOGO + LEFT-ALIGNED NAVIGATION ================= */}
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 xl:gap-5 min-w-0">
            {/* Brand Logo & Title */}
            <button
              onClick={() => handleNavClick('landing')}
              className="flex items-center gap-2 sm:gap-2.5 cursor-pointer select-none group shrink-0 text-left bg-transparent border-0 p-0"
              id="brand-logo-btn"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-slate-900 border border-teal-500/40 p-1 flex items-center justify-center shadow-md shadow-teal-500/10 group-hover:scale-105 group-hover:border-teal-400 transition-all duration-200 shrink-0">
                <HealthBridgeLogo className="w-full h-full" />
              </div>
              <div className="flex flex-col shrink-0">
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-base sm:text-lg xl:text-xl text-white tracking-tight font-['Outfit',sans-serif]">
                    Health<span className="text-teal-400">Bridge</span>
                  </span>
                </div>
                <span className="text-[10px] text-teal-300 font-medium hidden 2xl:inline font-mono">
                  PM-JAY & ABHA Grid
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links (Left Shifted & Visible) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5" aria-label="Main Navigation">
              {primaryNavItems.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    id={`nav-item-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-1.5 px-2.5 xl:px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap cursor-pointer shrink-0 transform hover:scale-105 hover:shadow-lg active:scale-95 ${
                      isActive
                        ? 'bg-white text-slate-950 shadow-md ring-2 ring-teal-400 border border-transparent scale-105'
                        : 'bg-white/95 hover:bg-white text-slate-950 border border-white/20 shadow-sm hover:ring-2 hover:ring-teal-400/60'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-teal-600' : 'text-slate-800'}`} />
                    <span className="text-slate-950">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* ================= RIGHT SECTION: EMERGENCY + USER PROFILE + HAMBURGER ================= */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0 ml-auto">
            
            {/* Quick Emergency SOS Button (Desktop & Mobile optimized) */}
            <button
              onClick={() => handleNavClick('emergency')}
              className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer transform hover:scale-105 hover:shadow-lg active:scale-95 shrink-0 ${
                activeTab === 'emergency' || activeSOS
                  ? 'bg-red-600 text-white shadow-md shadow-red-600/30 animate-pulse'
                  : 'bg-red-950/70 hover:bg-red-900/90 text-red-200 border border-red-500/50 shadow-xs'
              }`}
              title="24/7 Emergency SOS & Ambulance Hotline"
            >
              <PhoneCall className="w-3.5 h-3.5 text-red-400 shrink-0" />
              <span className="hidden md:inline">Emergency</span>
              <span className="md:hidden text-[11px]">SOS</span>
            </button>

            {/* USER PROFILE & ROLE SWITCHER CARD */}
            <div className="relative shrink-0">
              <button
                id="nav-role-dropdown-btn"
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-1.5 sm:gap-2 px-1.5 sm:px-3 py-1 sm:py-1.5 rounded-xl bg-slate-900/90 border border-teal-500/40 hover:border-teal-400 hover:bg-slate-800 transition-all duration-200 shadow-md ring-1 ring-white/5 cursor-pointer select-none group transform hover:scale-105 hover:shadow-lg active:scale-95"
                aria-expanded={roleMenuOpen}
                title="Account Settings & Role Switcher"
              >
                {/* Avatar with status indicator */}
                <div className="relative shrink-0">
                  <img
                    src={user?.avatar || '/user-profile.jpg'}
                    alt={user?.name}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-2 ring-teal-400/80 group-hover:ring-teal-300 transition-all"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-emerald-400 border-2 border-slate-950 rounded-full shadow-xs"></span>
                </div>

                {/* Name & Active Role Badge */}
                <div className="flex flex-col text-left max-w-[65px] xs:max-w-[85px] sm:max-w-[120px]">
                  <span className="text-[11px] sm:text-xs font-bold text-slate-100 leading-tight truncate">
                    {user?.name?.split(' ')[0] || 'User'}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] sm:text-[10px] text-teal-300 font-semibold capitalize leading-none truncate">
                      {activeRole}
                    </span>
                    <span className="text-[8px] sm:text-[9px] px-1 py-0.2 rounded bg-teal-500/20 text-teal-300 font-mono hidden sm:inline leading-none border border-teal-500/30">
                      ABHA
                    </span>
                  </div>
                </div>

                <ChevronDown className={`w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400 group-hover:text-white transition-transform ${roleMenuOpen ? 'rotate-180 text-teal-400' : ''}`} />
              </button>

              {/* Profile & Role Switcher Dropdown */}
              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900/98 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/15 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* Account Header */}
                  <div className="px-3.5 py-2.5 border-b border-white/10 bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={user?.avatar || '/user-profile.jpg'}
                          alt={user?.name}
                          referrerPolicy="no-referrer"
                          className="w-11 h-11 rounded-full object-cover ring-2 ring-teal-400"
                        />
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full"></span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-white truncate">{user?.name}</p>
                        <p className="text-xs text-teal-400 font-mono truncate">{user?.abhaId || user?.email}</p>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                            <Activity className="w-2.5 h-2.5" /> Verified Citizen
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Active Dashboard Link */}
                  <div className="p-2 border-b border-white/10">
                    <button
                      onClick={() => {
                        setRoleMenuOpen(false);
                        handleNavClick(getDashboardTabForRole(activeRole));
                      }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-200 border border-teal-500/40 text-xs font-bold transition-all cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <LayoutDashboard className="w-4 h-4 text-teal-300" />
                        Open {activeRole.toUpperCase()} Dashboard
                      </span>
                      <span className="text-[10px] bg-teal-500 text-slate-950 px-1.5 py-0.5 rounded font-bold">
                        GO &rarr;
                      </span>
                    </button>
                  </div>

                  {/* Switch Role Mode Options */}
                  <div className="px-2 py-1.5">
                    <p className="text-[11px] font-semibold text-slate-400 px-2 uppercase tracking-wider mb-1.5">
                      Switch Role Mode
                    </p>
                    <div className="space-y-1">
                      {roleConfigs.map(item => {
                        const Icon = item.icon;
                        const isCurrent = activeRole === item.role;
                        return (
                          <button
                            key={item.role}
                            id={`role-switch-${item.role}`}
                            onClick={() => {
                              switchRole(item.role);
                              setRoleMenuOpen(false);
                              handleNavClick(getDashboardTabForRole(item.role));
                            }}
                            className={`w-full flex items-start gap-2.5 px-2.5 py-2 rounded-xl text-left transition-all cursor-pointer ${
                              isCurrent
                                ? 'bg-teal-500/15 text-teal-200 border border-teal-500/30'
                                : 'hover:bg-white/5 text-slate-300'
                            }`}
                          >
                            <div className={`p-1.5 rounded-lg mt-0.5 ${isCurrent ? 'bg-teal-500 text-slate-950 font-bold' : 'bg-white/10 text-slate-300'}`}>
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold truncate">{item.title}</span>
                                {isCurrent && (
                                  <span className="text-[9px] bg-teal-500 text-slate-950 px-1.5 py-0.2 rounded font-bold ml-1">
                                    ACTIVE
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-slate-400 leading-tight mt-0.5">{item.desc}</p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Reset Account */}
                  <div className="border-t border-white/10 pt-1.5 px-2">
                    <button
                      onClick={() => {
                        logout();
                        setRoleMenuOpen(false);
                        handleNavClick('landing');
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-2 text-xs font-semibold text-slate-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Reset to Default Patient Mode
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle Button (Tablet & Mobile) */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 border border-white/10 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-teal-400" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* ================= MOBILE DRAWER MENU ================= */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-950/98 backdrop-blur-2xl border-b border-white/10 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-150">
          {/* Navigation Links */}
          <div className="grid grid-cols-1 gap-1">
            {primaryNavItems.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-teal-400" />
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}

            {/* Emergency SOS in Mobile Menu */}
            <button
              onClick={() => handleNavClick('emergency')}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-bold bg-red-600/90 text-white mt-1 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <PhoneCall className="w-4 h-4 text-white" />
                <span>Emergency 24x7 Ambulance & SOS</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/30 text-white">
                108 / 102
              </span>
            </button>
          </div>

          {/* Quick Shortcuts in Drawer */}
          <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                handleNavClick(getDashboardTabForRole(activeRole));
              }}
              className="py-2.5 text-center text-xs font-bold bg-white/10 hover:bg-white/15 text-white rounded-xl border border-white/10 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-teal-400" />
              <span>{activeRole.toUpperCase()} Portal</span>
            </button>
            <button
              onClick={() => {
                setAiAssistantOpen(true);
                setMobileMenuOpen(false);
              }}
              className="py-2.5 px-3 text-xs font-bold bg-teal-600 hover:bg-teal-500 text-white rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-teal-500/20 cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>AI Triage</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};


