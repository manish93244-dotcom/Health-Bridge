import React, { useState } from 'react';
import {
  Stethoscope,
  Video,
  Calendar,
  Star,
  ShieldCheck,
  Languages,
  Clock,
  Building2,
  CheckCircle2,
  PhoneCall
} from 'lucide-react';
import { Doctor } from '../../types';

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (doctor: Doctor, slot: string, type: 'telehealth' | 'in-person') => void;
  onStartInstantTelehealth?: (doctor: Doctor) => void;
}

export const DoctorCard: React.FC<DoctorCardProps> = ({
  doctor,
  onBookAppointment,
  onStartInstantTelehealth
}) => {
  const [selectedSlot, setSelectedSlot] = useState<string>(doctor.availableSlots[0] || '10:00 AM');
  const [consultType, setConsultType] = useState<'telehealth' | 'in-person'>('telehealth');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBooking = () => {
    onBookAppointment(doctor, selectedSlot, consultType);
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 3500);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-xl hover:shadow-2xl hover:border-emerald-400 hover:ring-2 hover:ring-emerald-400/20 hover:-translate-y-1.5 active:scale-[0.99] transition-all duration-300 p-5 flex flex-col justify-between group text-sky-900 cursor-pointer">
      
      {/* Top Profile Section */}
      <div>
        <div className="flex items-start gap-3.5 mb-3">
          <div className="relative shrink-0 overflow-hidden rounded-2xl">
            <img
              src={doctor.avatar}
              alt={doctor.name}
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null;
                target.src = '/dr-ananya-sen.jpg';
              }}
              className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover ring-2 ring-sky-400/40 group-hover:scale-105 transition-transform duration-300"
            />
            {doctor.isAvailableToday && (
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full z-10" title="Available Today"></span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-bold text-sky-700 bg-sky-50/90 border border-sky-200/80 px-2 py-0.5 rounded-lg">
                {doctor.specialty}
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50/90 px-1.5 py-0.5 rounded-lg border border-amber-200/80">
                <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                <span>{doctor.rating}</span>
                <span className="text-slate-500 font-normal">({doctor.reviewsCount})</span>
              </div>
            </div>

            <h3 className="text-base sm:text-lg font-extrabold text-sky-950 mt-1 truncate">
              {doctor.name}
            </h3>
            <p className="text-xs text-sky-600 font-medium truncate">
              {doctor.qualification}
            </p>
          </div>
        </div>

        {/* Badges & Meta */}
        <div className="space-y-1.5 text-xs text-sky-700 mb-3.5">
          <div className="flex items-center gap-1.5 text-sky-800">
            <Building2 className="w-3.5 h-3.5 text-sky-500 shrink-0" />
            <span className="truncate font-medium">{doctor.hospital} • {doctor.experienceYears} yrs exp</span>
          </div>

          <div className="flex items-center gap-1.5 text-sky-600">
            <Languages className="w-3.5 h-3.5 text-sky-400 shrink-0" />
            <span>{doctor.languages.join(', ')}</span>
          </div>

          {doctor.isPmjayEmpanelled && (
            <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50/90 border border-emerald-200 px-2 py-0.5 rounded-lg mt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>₹0 Free Consultation with Ayushman Card</span>
            </div>
          )}
        </div>

        {/* Slot selector */}
        <div className="bg-sky-50/50 backdrop-blur-sm rounded-2xl p-2.5 border border-sky-100 mb-4">
          <div className="flex items-center justify-between text-[11px] font-semibold text-sky-700 mb-1.5">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-sky-500" /> Available Slots Today:
            </span>
            <div className="flex items-center gap-1 bg-white/90 rounded-lg p-0.5 border border-sky-200 shadow-2xs">
              <button
                type="button"
                onClick={() => setConsultType('telehealth')}
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-colors ${
                  consultType === 'telehealth' ? 'bg-emerald-600 text-white shadow-xs' : 'text-sky-700 hover:text-sky-950'
                }`}
              >
                Video
              </button>
              <button
                type="button"
                onClick={() => setConsultType('in-person')}
                className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition-colors ${
                  consultType === 'in-person' ? 'bg-emerald-600 text-white shadow-xs' : 'text-sky-700 hover:text-sky-950'
                }`}
              >
                In-Clinic
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {doctor.availableSlots.slice(0, 4).map((slot, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={`text-xs px-2.5 py-1 rounded-xl font-mono font-medium transition-all hover:scale-105 active:scale-95 cursor-pointer ${
                  selectedSlot === slot
                    ? 'bg-emerald-600 text-white font-bold shadow-md ring-2 ring-emerald-400/40'
                    : 'bg-white/90 text-sky-800 border border-sky-200/90 hover:border-emerald-400 hover:bg-emerald-50/50 hover:shadow-xs'
                }`}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing & Booking Action */}
      <div className="pt-3 border-t border-sky-100 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-semibold text-sky-600 uppercase block">
            Standard Fee
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-base sm:text-lg font-extrabold text-sky-950 font-mono">
              ₹{doctor.consultationFee}
            </span>
            <span className="text-[10px] text-sky-600">/ session</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {doctor.telehealthEnabled && onStartInstantTelehealth && (
            <button
              onClick={() => onStartInstantTelehealth(doctor)}
              className="p-2.5 rounded-xl bg-sky-50/80 hover:bg-sky-100 text-sky-600 border border-sky-200 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              title="Start instant live video consult room"
            >
              <Video className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={handleBooking}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer ${
              bookingSuccess
                ? 'bg-emerald-700 text-white font-extrabold shadow-emerald-700/30'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-emerald-600/30'
            }`}
          >
            {bookingSuccess ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                <span>Booked!</span>
              </>
            ) : (
              <>
                <Calendar className="w-3.5 h-3.5" />
                <span>Confirm {selectedSlot}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
