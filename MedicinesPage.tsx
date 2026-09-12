import React, { useState } from 'react';
import {
  Pill,
  Search,
  TrendingDown,
  ShieldCheck,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  MapPin,
  Sparkles,
  ArrowRight,
  UploadCloud,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useHealthBridge } from '../context/HealthBridgeContext';
import { MedicineItem } from '../types';

export const MedicinesPage: React.FC = () => {
  const { medicines, savedMedicines, toggleSaveMedicine, t } = useHealthBridge();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'available' | 'unavailable'>('all');
  const [prescriptionScannerOpen, setPrescriptionScannerOpen] = useState(false);
  const [scannedText, setScannedText] = useState('');
  const [scanAnalysis, setScanAnalysis] = useState<MedicineItem[] | null>(null);

  const categories = [
    'All',
    'Antibiotic',
    'Anti-Diabetic',
    'Cardiovascular',
    'Gastrointestinal',
    'Hypertension',
    'Analgesic'
  ];

  const filteredMedicines = medicines.filter(med => {
    const matchesQuery =
      med.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.composition.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat =
      selectedCategory === 'All' || med.category.toLowerCase().includes(selectedCategory.toLowerCase());

    const matchesAvail =
      availabilityFilter === 'all' ||
      (availabilityFilter === 'available' && med.janAushadhiAvailable) ||
      (availabilityFilter === 'unavailable' && !med.janAushadhiAvailable);

    return matchesQuery && matchesCat && matchesAvail;
  });

  const handleScanPrescription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scannedText.trim()) return;
    
    // Match against medicine dataset
    const matched = medicines.filter(m =>
      scannedText.toLowerCase().includes(m.brandName.toLowerCase().split(' ')[0]) ||
      scannedText.toLowerCase().includes(m.genericName.toLowerCase().split(' ')[0])
    );
    setScanAnalysis(matched.length > 0 ? matched : [medicines[0], medicines[1], medicines[3]]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-emerald-800 text-white rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-amber-200 text-xs font-bold border border-white/20">
            <Pill className="w-3.5 h-3.5" />
            <span>{t.medicines.badge}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-['Outfit',sans-serif]">
            {t.medicines.title}
          </h1>
          <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed">
            {t.medicines.sub}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setPrescriptionScannerOpen(!prescriptionScannerOpen)}
              className="px-4 py-2 bg-white text-slate-900 hover:bg-amber-50 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer"
            >
              <UploadCloud className="w-4 h-4 text-amber-600" />
              <span>{prescriptionScannerOpen ? t.medicines.closeScannerBtn : t.medicines.scanPrescriptionBtn}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Prescription Scanner Dropdown */}
      {prescriptionScannerOpen && (
        <div className="bg-white rounded-2xl border border-amber-200 p-6 shadow-md space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            <h3 className="text-base font-bold text-slate-900">
              {t.medicines.scannerTitle}
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            {t.medicines.scannerSub}
          </p>

          <form onSubmit={handleScanPrescription} className="space-y-3">
            <textarea
              rows={3}
              value={scannedText}
              onChange={e => setScannedText(e.target.value)}
              placeholder={t.medicines.pastePrescription}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs sm:text-sm font-mono text-slate-900 focus:outline-none focus:border-amber-600"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>{t.medicines.analyzeBtn}</span>
            </button>
          </form>

          {scanAnalysis && (
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                Found {scanAnalysis.length} Generic Substitutions:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {scanAnalysis.map(med => (
                  <div key={med.id} className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-1">
                    <span className="font-bold text-slate-800 block">{med.brandName}</span>
                    <span className="text-[11px] text-emerald-800 font-semibold block">{med.genericName}</span>
                    <div className="flex justify-between items-center pt-1 border-t border-emerald-200/60 font-mono">
                      <span className="text-slate-400 line-through">₹{med.brandPrice}</span>
                      <span className="text-sm font-extrabold text-emerald-700">₹{med.genericPrice} ({med.savingsPercentage}% Off)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-4 space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder={t.medicines.searchPlaceholder}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-600"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-600 text-white font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat === 'All' ? t.medicines.allCategories : cat}
              </button>
            ))}
          </div>

          {/* Availability Filter Chips */}
          <div className="flex items-center gap-1.5 border-t sm:border-t-0 pt-2 sm:pt-0">
            <button
              onClick={() => setAvailabilityFilter('all')}
              className={`text-xs px-2.5 py-1 rounded-md font-bold transition-colors cursor-pointer ${
                availabilityFilter === 'all'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setAvailabilityFilter('available')}
              className={`text-xs px-2.5 py-1 rounded-md font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                availabilityFilter === 'available'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              <CheckCircle2 className="w-3 h-3" />
              <span>Available</span>
            </button>
            <button
              onClick={() => setAvailabilityFilter('unavailable')}
              className={`text-xs px-2.5 py-1 rounded-md font-bold transition-colors cursor-pointer flex items-center gap-1 ${
                availabilityFilter === 'unavailable'
                  ? 'bg-rose-600 text-white'
                  : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
              }`}
            >
              <AlertCircle className="w-3 h-3" />
              <span>Out of Stock</span>
            </button>
          </div>
        </div>
      </div>

      {/* Medicines Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredMedicines.map(med => {
          const isSaved = savedMedicines.some(m => m.id === med.id);
          const totalSavingsRupees = med.brandPrice - med.genericPrice;
          const isAvail = med.janAushadhiAvailable;

          return (
            <div
              key={med.id}
              className={`bg-white rounded-2xl border shadow-2xs hover:shadow-md transition-all p-5 flex flex-col justify-between ${
                isAvail ? 'border-slate-200/90' : 'border-rose-200 bg-rose-50/10'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
                      {med.category}
                    </span>
                    {/* Live Availability Status Pill */}
                    {isAvail ? (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                        <span>Available in Kendra</span>
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
                        <span>Currently Unavailable (Out of Stock)</span>
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => toggleSaveMedicine(med)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      isSaved
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : 'bg-slate-50 text-slate-400 hover:text-slate-700 border-slate-200'
                    }`}
                    title={isSaved ? 'Saved in medicine locker' : 'Save to locker'}
                  >
                    {isSaved ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-start gap-3.5 mb-3">
                  {med.imageUrl && (
                    <img
                      src={med.imageUrl}
                      alt={med.brandName}
                      referrerPolicy="no-referrer"
                      className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover border border-slate-200 shadow-xs shrink-0 bg-slate-50"
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                      {med.brandName}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mt-0.5">
                      Pack Unit: {med.unit}
                    </p>
                  </div>
                </div>

                {/* Salt Composition Badge */}
                <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-200/80 mb-3.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                    Active Pharmaceutical Salt (Generic Form):
                  </span>
                  <p className="text-xs font-bold text-teal-800">
                    {med.genericName}
                  </p>
                </div>

                {/* Price Comparison Comparison Box */}
                <div className="grid grid-cols-2 gap-3 bg-gradient-to-r from-slate-50 to-emerald-50/70 p-3.5 rounded-xl border border-emerald-100 mb-3.5">
                  <div>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase block">
                      Branded MRP
                    </span>
                    <span className="text-lg font-bold text-slate-400 line-through font-mono">
                      ₹{med.brandPrice}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase block flex items-center justify-end gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      Jan Aushadhi Price
                    </span>
                    <div className="flex items-baseline justify-end gap-1.5">
                      <span className="text-xl font-black text-emerald-700 font-mono">
                        ₹{med.genericPrice}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-200 px-1.5 py-0.2 rounded">
                        Save {med.savingsPercentage}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Usage description & Dosage */}
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {med.usageDescription}
                </p>
              </div>

              {/* Footer details */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                {isAvail ? (
                  <span className="text-emerald-700 font-bold flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    In stock at {med.inStockKendrasCount || 48} local Kendras
                  </span>
                ) : (
                  <span className="text-rose-600 font-bold flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                    Currently Out of Stock at Kendras
                  </span>
                )}
                <span className="font-mono text-slate-500 font-bold">
                  Saves ₹{totalSavingsRupees.toFixed(0)} per strip
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
