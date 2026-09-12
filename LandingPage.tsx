import React, { useState } from 'react';
import {
  HeartPulse,
  Stethoscope,
  Building2,
  Pill,
  ShieldCheck,
  PhoneCall,
  Compass,
  Sparkles,
  ArrowRight,
  Video,
  Activity,
  Bed,
  MapPin,
  Clock,
  CheckCircle2,
  Star,
  Users,
  Search,
  Zap,
  TrendingDown,
  ShieldAlert,
  Mail
} from 'lucide-react';
import { useHealthBridge } from '../context/HealthBridgeContext';
import { useAuth } from '../context/AuthContext';
import { DoctorCard } from '../components/cards/DoctorCard';
import { FacilityCard } from '../components/cards/FacilityCard';
import { SchemeCard } from '../components/cards/SchemeCard';
import { GoogleMapsLocationSearch, LocationItem } from '../components/GoogleMapsLocationSearch';

interface LandingPageProps {
  onNavigate: (tabId: string) => void;
  onStartTelehealthWithDoctor?: (doc: any) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onStartTelehealthWithDoctor
}) => {
  const { doctors, hospitals, medicines, schemes, bookAppointment, openAiWithPrompt, t, language } = useHealthBridge();
  const { activeRole } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState<LocationItem | null>(null);

  const quickStats = [
    { label: t.landing.statJanAushadhi, value: '14,200+', sub: t.landing.statJanAushadhiSub, icon: Pill, color: 'text-amber-600 bg-amber-50 border-amber-200' },
    { label: t.landing.statPmjay, value: '28,400+', sub: t.landing.statPmjaySub, icon: ShieldCheck, color: 'text-teal-600 bg-teal-50 border-teal-200' },
    { label: t.landing.statDoctors, value: '50,000+', sub: t.landing.statDoctorsSub, icon: Stethoscope, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { label: t.landing.statEmergency, value: '4.2 min', sub: t.landing.statEmergencySub, icon: PhoneCall, color: 'text-rose-600 bg-rose-50 border-rose-200' }
  ];

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Section with 100% Opacity Background Image */}
      <section className="relative overflow-hidden text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 rounded-b-3xl shadow-xl">
        {/* Background Image at 100% Opacity */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <img
            src="/pm-hospital-inspection.jpg"
            alt="Healthcare and Hospital Infrastructure"
            className="w-full h-full object-cover object-center opacity-100"
            referrerPolicy="no-referrer"
          />
          {/* Subtle soft gradient overlay so text remains perfectly readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/60 to-slate-950/75"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10 text-center space-y-6">
          
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs sm:text-sm font-semibold text-teal-200 shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{t.landing.badge}</span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-['Outfit',sans-serif] leading-tight">
            {t.landing.heroTitle1} <br />
            {t.landing.heroTitle2} <br />
            <span className="bg-gradient-to-r from-teal-300 via-emerald-300 to-teal-200 bg-clip-text text-transparent">
              {t.landing.heroTitle3}
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-sm sm:text-base lg:text-lg text-teal-100/80 font-normal leading-relaxed">
            {t.landing.heroSubtitle}
          </p>

          {/* Dedicated Google Maps Location Search Bar */}
          <div className="pt-2">
            <GoogleMapsLocationSearch
              onSelectLocation={(loc) => setSelectedLocation(loc)}
              onNavigateTab={(tabId) => onNavigate(tabId)}
            />
          </div>

        </div>
      </section>

      {/* Metrics Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
              >
                <div className={`p-3 rounded-xl border ${stat.color} shrink-0`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-2xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                    {stat.value}
                  </span>
                  <h3 className="text-xs font-bold text-slate-700 leading-tight">
                    {stat.label}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">{stat.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Core Health Portals Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
              {t.landing.portalGatewayTitle}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif]">
              {t.landing.portalGatewayHeading}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md">
            {t.landing.portalGatewaySub}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: AI Symptom Navigator */}
          <div
            onClick={() => onNavigate('navigator')}
            className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-teal-400 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                  {t.landing.quickActionSymptom}
                </h3>
                <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded-full">
                  {t.landing.quickActionSymptomTag}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {t.landing.quickActionSymptomSub}
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700">
              <span>{t.landing.quickActionSymptomBtn}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Find Doctors & Telehealth */}
          <div
            onClick={() => onNavigate('doctors')}
            className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-teal-400 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {t.landing.quickActionTelehealth}
                </h3>
                <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full">
                  {t.landing.quickActionTelehealthTag}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {t.landing.quickActionTelehealthSub}
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
              <span>{t.landing.quickActionTelehealthBtn}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Jan Aushadhi Generic Medicines */}
          <div
            onClick={() => onNavigate('medicines')}
            className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-amber-400 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Pill className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                  {t.landing.quickActionMedicines}
                </h3>
                <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                  {t.landing.quickActionMedicinesTag}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {t.landing.quickActionMedicinesSub}
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-700">
              <span>{t.landing.quickActionMedicinesBtn}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Live Beds & Hospitals */}
          <div
            onClick={() => onNavigate('hospitals')}
            className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-teal-400 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {t.landing.quickActionBeds}
                </h3>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                  {t.landing.quickActionBedsTag}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {t.landing.quickActionBedsSub}
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>{t.landing.quickActionBedsBtn}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 5: Government Health Schemes */}
          <div
            onClick={() => onNavigate('schemes')}
            className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-teal-400 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-800 transition-colors">
                  {t.landing.quickActionSchemes}
                </h3>
                <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded-full">
                  {t.landing.quickActionSchemesTag}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                {t.landing.quickActionSchemesSub}
              </p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700">
              <span>{t.landing.quickActionSchemesBtn}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 6: 24x7 Emergency SOS Dispatch */}
          <div
            onClick={() => onNavigate('emergency')}
            className="bg-gradient-to-br from-red-600 via-rose-600 to-red-700 text-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <PhoneCall className="w-6 h-6 text-white" />
              </div>
              <div className="flex items-center gap-2 mb-1.5">
                <h3 className="text-lg font-bold text-white">
                  {t.landing.quickActionEmergency}
                </h3>
                <span className="text-[10px] bg-white/20 text-white font-bold px-2 py-0.5 rounded-full animate-pulse">
                  {t.landing.quickActionEmergencyTag}
                </span>
              </div>
              <p className="text-xs text-red-100 leading-relaxed mb-4">
                {t.landing.quickActionEmergencySub}
              </p>
            </div>
            <div className="pt-3 border-t border-white/20 flex items-center justify-between text-xs font-bold text-white">
              <span>{t.landing.quickActionEmergencyBtn}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* Featured Doctors Preview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
              {t.landing.featuredDoctorsBadge}
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif]">
              {t.landing.featuredDoctorsTitle}
            </h2>
          </div>
          <button
            onClick={() => onNavigate('doctors')}
            className="text-xs font-bold text-teal-300 hover:text-teal-200 flex items-center gap-1 cursor-pointer"
          >
            <span>{t.landing.viewAllDoctors} ({doctors.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.slice(0, 3).map(doctor => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
              onBookAppointment={(doc, slot, type) => {
                bookAppointment({
                  patientId: 'pat-1',
                  patientName: 'Rahul Verma',
                  patientPhone: '+91 6200488260',
                  patientAge: 42,
                  patientGender: 'Male',
                  doctorId: doc.id,
                  doctorName: doc.name,
                  doctorSpecialty: doc.specialty,
                  hospitalName: doc.hospital,
                  date: new Date().toISOString().split('T')[0],
                  timeSlot: slot,
                  type,
                  symptoms: 'Routine check-up via HealthBridge portal'
                });
              }}
              onStartInstantTelehealth={onStartTelehealthWithDoctor}
            />
          ))}
        </div>
      </section>

      {/* Generic Medicine Price Comparison Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-600 text-white rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold">
              <TrendingDown className="w-4 h-4" />
              <span>{t.landing.dawaDostBadge}</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold font-['Outfit',sans-serif] leading-tight">
              {t.landing.dawaDostTitle}
            </h2>

            <p className="text-xs sm:text-sm text-amber-50 leading-relaxed">
              {t.landing.dawaDostSub}
            </p>

            <button
              onClick={() => onNavigate('medicines')}
              className="px-6 py-3 bg-white text-slate-900 hover:bg-slate-50 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Pill className="w-4 h-4 text-amber-600" />
              <span>{t.landing.dawaDostBtn}</span>
            </button>
          </div>

          {/* Quick Comparison Card Spotlight */}
          <div className="bg-white rounded-2xl p-5 text-slate-900 shadow-2xl w-full max-w-md border border-white/20">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              {t.landing.dawaDostExampleTitle}
            </span>
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/medicines/augmentin-625.jpg"
                    alt="Augmentin 625 Duo"
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-lg object-cover border border-slate-200"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Augmentin 625 Duo</h4>
                    <p className="text-[11px] text-slate-500">{t.landing.dawaDostBrandLabel}</p>
                  </div>
                </div>
                <span className="text-base font-bold text-slate-400 line-through font-mono">₹224</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-slate-100 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100">
                <div>
                  <div className="flex items-center gap-1">
                    <h4 className="text-sm font-extrabold text-emerald-900">{t.landing.dawaDostGenericLabel}</h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <p className="text-[10px] text-emerald-700 font-medium">Amoxicillin + Clavulanic Acid</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-extrabold text-emerald-700 font-mono">₹58</span>
                  <span className="block text-[10px] font-bold text-emerald-800 bg-emerald-200 px-1.5 py-0.2 rounded">
                    {t.landing.dawaDostSaveLabel}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 text-center mt-3">
              {t.landing.dawaDostGovtNote}
            </p>
          </div>

        </div>
      </section>

      {/* ================= SECTION 5: CONTACT US & DIRECTORY (MITS-GWL) ================= */}
      <section className="space-y-6 pt-4 pb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20 mb-2">
              <Building2 className="w-3.5 h-3.5" />
              <span>{t.landing.contactBadge}</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-white font-['Outfit',sans-serif]">
              {t.landing.contactTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {t.landing.contactSub}
            </p>
          </div>

          <button
            onClick={() => onNavigate('contact')}
            className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/40 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 w-fit cursor-pointer"
          >
            <span>{t.landing.contactBtn}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 6 Directory Cards Preview */}
        <div className="space-y-4">
          {[
            {
              id: 'c-1',
              name: 'Hariom Shukla',
              designation: 'Project Lead & Architecture',
              contactNo: '7413820032',
              intercomNo: '801',
              department: 'Mathematics & Computing',
              location: 'MITS-GWL',
              email: '25mc1ha49@mitsgwl.ac.in'
            },
            {
              id: 'c-2',
              name: 'Manish Kumar',
              designation: 'AI & Systems Developer',
              contactNo: '6200488260',
              intercomNo: '802',
              department: 'Mathematics & Computing',
              location: 'MITS-GWL',
              email: 'manish93244@gmail.com'
            },
            {
              id: 'c-3',
              name: 'Karan Patel',
              designation: 'Full-Stack Developer',
              contactNo: '7898999841',
              intercomNo: '803',
              department: 'Mathematics & Computing',
              location: 'MITS-GWL',
              email: 'karan1828p@gmail.com'
            },
            {
              id: 'c-4',
              name: 'Muskan Chhonkar',
              designation: 'UI/UX & Health Informatics',
              contactNo: '9244032790',
              intercomNo: '804',
              department: 'Mathematics & Computing',
              location: 'MITS-GWL',
              email: 'muskanchhonkar@gmail.com'
            },
            {
              id: 'c-5',
              name: 'Harshvardhan Singh Rathore',
              designation: 'Cloud & Data Systems',
              contactNo: '9575256152',
              intercomNo: '805',
              department: 'Mathematics & Computing',
              location: 'MITS-GWL',
              email: 'harshvardhansinghrathore487@gmail.com'
            },
            {
              id: 'c-6',
              name: 'Macy Gupta',
              designation: 'Quality Analyst & Operations',
              contactNo: '9301826290',
              intercomNo: '806',
              department: 'Mathematics & Computing',
              location: 'MITS-GWL',
              email: 'macygupta62@gmail.com'
            }
          ].map(member => (
            <div
              key={member.id}
              className="bg-white rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-xl border border-slate-200/90 transition-all duration-200 text-slate-900 group"
            >
              {/* Top Row: Name and Designation Badge shifted together */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-4 pb-3 border-b border-slate-100">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                  {member.name}
                </h3>
                <span className="inline-flex items-center px-3 py-1 rounded bg-[#134988] text-white text-[11px] sm:text-xs font-semibold tracking-wide shadow-xs">
                  {member.designation}
                </span>
              </div>

              {/* Middle Row: 4 Metadata Columns (Contact No, Intercom No, Department, Location) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                <div>
                  <span className="block text-[11px] font-medium text-slate-500 mb-0.5">
                    {t.landing.contactNoLabel || 'Contact No.'}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    {member.contactNo}
                  </span>
                </div>

                <div>
                  <span className="block text-[11px] font-medium text-slate-500 mb-0.5">
                    {t.landing.intercomNoLabel || 'Intercom No.'}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    {member.intercomNo}
                  </span>
                </div>

                <div>
                  <span className="block text-[11px] font-medium text-slate-500 mb-0.5">
                    {t.landing.deptLabel || 'Department'}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {member.department}
                  </span>
                </div>

                <div>
                  <span className="block text-[11px] font-medium text-slate-500 mb-0.5">
                    {t.landing.locLabel || 'Location'}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900">
                    {member.location}
                  </span>
                </div>
              </div>

              {/* Bottom Row: Email Id and Direct Link */}
              <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="block text-[11px] font-medium text-slate-500">
                    {t.landing.emailLabel || 'Email Id'}
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-slate-800 font-mono select-all">
                    {member.email}
                  </span>
                </div>

                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 transition-colors w-fit"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Direct Email</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
