import React, { useState } from 'react';
import {
  Stethoscope,
  Search,
  Filter,
  Video,
  Calendar,
  ShieldCheck,
  Star,
  CheckCircle2,
  PhoneCall,
  Languages,
  Clock,
  Sparkles
} from 'lucide-react';
import { useHealthBridge } from '../context/HealthBridgeContext';
import { DoctorCard } from '../components/cards/DoctorCard';
import { Doctor } from '../types';

interface DoctorsPageProps {
  onStartTelehealth: (doc: Doctor) => void;
}

export const DoctorsPage: React.FC<DoctorsPageProps> = ({ onStartTelehealth }) => {
  const { doctors, bookAppointment, t } = useHealthBridge();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [onlyPmjay, setOnlyPmjay] = useState(false);
  const [onlyTelehealth, setOnlyTelehealth] = useState(false);
  const [bookingNotification, setBookingNotification] = useState<string | null>(null);

  const specialties = [
    'All',
    'Cardiology',
    'General Medicine & Diabetology',
    'Pulmonology & Critical Care',
    'Orthopedics & Joint Replacement',
    'Pediatrics & Neonatology',
    'Neurology'
  ];

  const filteredDoctors = doctors.filter(doc => {
    const matchesQuery =
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.hospital.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSpecialty =
      selectedSpecialty === 'All' || doc.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());

    const matchesPmjay = !onlyPmjay || doc.isPmjayEmpanelled;
    const matchesTelehealth = !onlyTelehealth || doc.telehealthEnabled;

    return matchesQuery && matchesSpecialty && matchesPmjay && matchesTelehealth;
  });

  const handleBook = async (doctor: Doctor, slot: string, type: 'telehealth' | 'in-person') => {
    const apt = await bookAppointment({
      patientId: 'pat-1',
      patientName: 'Rahul Verma',
      patientPhone: '+91 6200488260',
      patientAge: 42,
      patientGender: 'Male',
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      hospitalName: doctor.hospital,
      date: new Date().toISOString().split('T')[0],
      timeSlot: slot,
      type,
      symptoms: 'Scheduled via HealthBridge Doctor Directory'
    });

    setBookingNotification(`Appointment successfully confirmed with ${doctor.name} for ${slot} (${type === 'telehealth' ? 'Video Telehealth' : 'In-Person Clinic'}).`);
    setTimeout(() => setBookingNotification(null), 5000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-blue-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-sky-400/40">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30">
              <Stethoscope className="w-3.5 h-3.5 text-sky-200" />
              <span>{t.doctors.badge}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif]">
              {t.doctors.title}
            </h1>
            <p className="text-xs sm:text-sm text-sky-100 max-w-2xl leading-relaxed">
              {t.doctors.sub}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="bg-white/20 border border-white/30 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-white flex items-center gap-2 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-300" />
              <span>{t.doctors.pmjayPill}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Notification Toast */}
      {bookingNotification && (
        <div className="bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-md flex items-center justify-between gap-3 text-xs sm:text-sm font-semibold animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-200 shrink-0" />
            <span>{bookingNotification}</span>
          </div>
          <button
            onClick={() => setBookingNotification(null)}
            className="text-emerald-200 hover:text-white font-bold text-xs"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 space-y-4">
        
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t.doctors.searchPlaceholder}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-600"
          />
        </div>

        {/* Filter Toggle Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          
          {/* Specialty Filter pills */}
          <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto">
            {specialties.map(spec => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedSpecialty === spec
                    ? 'bg-teal-700 text-white font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {spec === 'All' ? t.doctors.allSpecialties : spec}
              </button>
            ))}
          </div>

          {/* Quick Checkbox Toggles */}
          <div className="flex items-center gap-3 text-xs font-semibold text-slate-700">
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyPmjay}
                onChange={e => setOnlyPmjay(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
              />
              <span>{t.doctors.onlyPmjay}</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={onlyTelehealth}
                onChange={e => setOnlyTelehealth(e.target.checked)}
                className="w-4 h-4 text-teal-600 rounded focus:ring-teal-500"
              />
              <span>{t.doctors.onlyTelehealth}</span>
            </label>
          </div>

        </div>

      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map(doctor => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
            onBookAppointment={handleBook}
            onStartInstantTelehealth={onStartTelehealth}
          />
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-2">
          <Stethoscope className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-sm font-bold text-slate-700">{t.doctors.noResults}</h3>
        </div>
      )}

    </div>
  );
};
