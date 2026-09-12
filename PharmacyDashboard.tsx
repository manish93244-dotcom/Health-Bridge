import React, { useState } from 'react';
import {
  Pill,
  Search,
  Plus,
  AlertCircle,
  CheckCircle2,
  FileText,
  Sparkles,
  TrendingDown,
  Building2,
  Send,
  Package,
  X,
  Trash2,
  RefreshCw,
  SlidersHorizontal,
  Check,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useHealthBridge } from '../context/HealthBridgeContext';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { MedicineItem } from '../types';

interface PharmacyDashboardProps {
  onNavigateTab: (tabId: string) => void;
}

export const PharmacyDashboard: React.FC<PharmacyDashboardProps> = ({ onNavigateTab }) => {
  const { user } = useAuth();
  const {
    medicines,
    prescriptions,
    addMedicine,
    toggleMedicineAvailability,
    updateMedicineStock,
    removeMedicine
  } = useHealthBridge();

  const [currentSection, setCurrentSection] = useState('inventory');
  const [searchQuery, setSearchQuery] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState<'all' | 'available' | 'unavailable'>('all');
  const [dispensedRx, setDispensedRx] = useState<string[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form State for Adding New Tablet / Medicine
  const [formData, setFormData] = useState({
    genericName: '',
    brandName: '',
    composition: '',
    category: 'Antibiotic / Bacterial Infections',
    brandPrice: '',
    genericPrice: '',
    unit: '10 Tablets Strip',
    stockUnits: '500',
    janAushadhiAvailable: true,
    usageDescription: '',
    dosageGuidelines: '1 tablet twice daily with meals or as advised by physician.'
  });

  const categoryOptions = [
    'Antibiotic / Bacterial Infections',
    'Anti-Diabetic / Type 2 Diabetes',
    'Cardiovascular / Cholesterol Control',
    'Gastrointestinal / Acidity & GERD',
    'Hypertension / Blood Pressure',
    'Analgesic & Antipyretic / Fever & Pain',
    'Respiratory & Allergy',
    'Vitamins & Mineral Supplements'
  ];

  const handleDispense = (rxId: string) => {
    setDispensedRx(prev => [...prev, rxId]);
  };

  const showNotification = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.genericName || !formData.brandName || !formData.genericPrice) {
      alert('Please fill all mandatory fields (Tablet Name, Branded Substitute, Price).');
      return;
    }

    const brandPriceNum = parseFloat(formData.brandPrice) || parseFloat(formData.genericPrice) * 3;
    const genericPriceNum = parseFloat(formData.genericPrice);
    const stockUnitsNum = parseInt(formData.stockUnits, 10) || 0;

    const newMed = addMedicine({
      genericName: formData.genericName.trim(),
      brandName: formData.brandName.trim(),
      composition: formData.composition.trim() || formData.genericName.trim(),
      category: formData.category,
      brandPrice: brandPriceNum,
      genericPrice: genericPriceNum,
      unit: formData.unit || '10 Tablets Strip',
      janAushadhiAvailable: formData.janAushadhiAvailable,
      usageDescription: formData.usageDescription.trim() || `Generic formulation for ${formData.category}.`,
      dosageGuidelines: formData.dosageGuidelines.trim(),
      sideEffects: ['Mild gastrointestinal discomfort (if taken on empty stomach)'],
      inStockKendrasCount: formData.janAushadhiAvailable ? 48 : 0,
      stockUnits: stockUnitsNum,
      thresholdUnits: 100
    });

    setIsAddModalOpen(false);
    // Reset Form
    setFormData({
      genericName: '',
      brandName: '',
      composition: '',
      category: 'Antibiotic / Bacterial Infections',
      brandPrice: '',
      genericPrice: '',
      unit: '10 Tablets Strip',
      stockUnits: '500',
      janAushadhiAvailable: true,
      usageDescription: '',
      dosageGuidelines: '1 tablet twice daily with meals or as advised by physician.'
    });

    showNotification(`✓ Added "${newMed.brandName}" (${newMed.janAushadhiAvailable ? 'Available' : 'Unavailable'}) to live inventory!`);
  };

  const handleToggleAvailability = (med: MedicineItem) => {
    toggleMedicineAvailability(med.id);
    const newStatus = !med.janAushadhiAvailable;
    showNotification(
      newStatus
        ? `● "${med.brandName}" marked AVAILABLE — now live on Citizen Dashboard & Directory.`
        : `✕ "${med.brandName}" marked UNAVAILABLE — Citizen Dashboard updated in real time.`
    );
  };

  const handleQuickRestock = (medId: string, currentStock: number) => {
    const newStock = currentStock + 100;
    updateMedicineStock(medId, newStock, true);
    showNotification(`+100 units restocked for medicine! Stock now: ${newStock}`);
  };

  // Filtered inventory list
  const filteredInventory = medicines.filter(item => {
    const matchesSearch =
      item.genericName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.composition && item.composition.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesAvailability =
      availabilityFilter === 'all' ||
      (availabilityFilter === 'available' && item.janAushadhiAvailable) ||
      (availabilityFilter === 'unavailable' && !item.janAushadhiAvailable);

    return matchesSearch && matchesAvailability;
  });

  const availableCount = medicines.filter(m => m.janAushadhiAvailable).length;
  const unavailableCount = medicines.filter(m => !m.janAushadhiAvailable).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Feedback Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white px-4 py-3 rounded-2xl shadow-2xl border border-amber-500/50 flex items-center gap-3 animate-in slide-in-from-bottom-5 duration-300">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-xs font-bold">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-blue-700 text-white rounded-3xl p-6 sm:p-8 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-sky-100 text-xs font-bold border border-white/20">
            <Pill className="w-3.5 h-3.5 text-sky-200" />
            <span>Pradhan Mantri Jan Aushadhi Kendra #4829</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-['Outfit',sans-serif]">
            {user?.name || 'Jan Aushadhi Kendra (Central Dispensary)'}
          </h1>
          <p className="text-xs text-sky-100">
            Connaught Place Hub • License #DL-PH-2024-9921 • ABDM Digital Dispensary Connected
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-white/15 px-4 py-2 rounded-xl text-xs font-mono text-white text-right border border-white/20">
            <span className="text-[10px] text-sky-200 block font-semibold">TOTAL ACTIVE TABLETS</span>
            <span className="text-lg font-black font-mono">{medicines.length} Salts</span>
          </div>
          <div className="bg-sky-950/60 px-4 py-2 rounded-xl text-xs font-mono text-sky-100 text-right border border-sky-400/40">
            <span className="text-[10px] text-emerald-300 block font-semibold">AVAILABLE TO CITIZENS</span>
            <span className="text-lg font-black font-mono text-emerald-300">{availableCount} In Stock</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Sidebar */}
        <DashboardSidebar
          currentSection={currentSection}
          setCurrentSection={setCurrentSection}
          onNavigateTab={onNavigateTab}
        />

        {/* Main Content */}
        <div className="flex-1 w-full space-y-6">
          
          {/* SECTION: Inventory */}
          {currentSection === 'inventory' && (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-6">
              
              {/* Header & Main Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <span>Jan Aushadhi Generic Medicine Inventory</span>
                    <span className="text-xs font-bold px-2 py-0.5 bg-amber-100 text-amber-800 rounded-full">
                      Live Sync
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Add new tablets and toggle availability status. Changes directly reflect on Citizen & Patient Dashboards.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 shrink-0">
                  {/* Add New Tablet Button */}
                  <button
                    id="add-medicine-btn"
                    onClick={() => setIsAddModalOpen(true)}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>+ Add New Tablet</span>
                  </button>

                  {/* Re-Stock Button */}
                  <button
                    onClick={() => {
                      medicines.forEach(m => {
                        if (!m.janAushadhiAvailable || (m.stockUnits && m.stockUnits < 100)) {
                          updateMedicineStock(m.id, 500, true);
                        }
                      });
                      showNotification('✓ Central depot bulk replenishment applied to all low-stock items!');
                    }}
                    className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Re-Stock Depot</span>
                  </button>
                </div>
              </div>

              {/* Real-time sync banner */}
              <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 text-xs flex items-center justify-between gap-3 text-amber-900">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    <strong>Pharmacist Live Controls:</strong> Click the <strong>Available / Unavailable</strong> button on any tablet below to toggle its status on the user dashboard instantly.
                  </span>
                </div>
              </div>

              {/* Search & Filter Controls */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search by tablet name, salt, or category..."
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-600"
                  />
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                  <button
                    onClick={() => setAvailabilityFilter('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer whitespace-nowrap ${
                      availabilityFilter === 'all'
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    All ({medicines.length})
                  </button>
                  <button
                    onClick={() => setAvailabilityFilter('available')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                      availabilityFilter === 'available'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Available ({availableCount})</span>
                  </button>
                  <button
                    onClick={() => setAvailabilityFilter('unavailable')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1 whitespace-nowrap ${
                      availabilityFilter === 'unavailable'
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
                    }`}
                  >
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Unavailable ({unavailableCount})</span>
                  </button>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
                      <th className="py-3 px-3">Generic Salt Formulation</th>
                      <th className="py-3 px-3">Branded Substitute</th>
                      <th className="py-3 px-3">Kendra Price</th>
                      <th className="py-3 px-3">Stock Units</th>
                      <th className="py-3 px-3 text-center">Live Availability Status (Click to Toggle)</th>
                      <th className="py-3 px-3 text-right">Quick Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {filteredInventory.map(item => {
                      const isAvail = item.janAushadhiAvailable;
                      const stockVal = item.stockUnits ?? (isAvail ? 350 : 0);

                      return (
                        <tr
                          key={item.id}
                          className={`hover:bg-slate-50/80 transition-colors ${
                            !isAvail ? 'bg-rose-50/20' : ''
                          }`}
                        >
                          {/* Generic Name */}
                          <td className="py-3 px-3">
                            <div className="font-bold text-slate-900 max-w-xs">
                              {item.genericName}
                            </div>
                            <span className="text-[10px] text-slate-500 font-normal">
                              {item.category} • Pack of {item.unit}
                            </span>
                          </td>

                          {/* Branded Substitute */}
                          <td className="py-3 px-3">
                            <span className="text-slate-700 font-semibold">{item.brandName}</span>
                            <span className="text-[10px] text-slate-400 block font-mono">
                              MRP ₹{item.brandPrice}
                            </span>
                          </td>

                          {/* Kendra Price */}
                          <td className="py-3 px-3 font-mono">
                            <span className="font-bold text-emerald-700 text-sm">
                              ₹{item.genericPrice}
                            </span>
                            <span className="text-[10px] text-emerald-600 font-bold block">
                              Save {item.savingsPercentage}%
                            </span>
                          </td>

                          {/* Stock Units */}
                          <td className="py-3 px-3 font-mono font-bold text-slate-800">
                            <div className="flex items-center gap-1.5">
                              <span className={stockVal < 100 && isAvail ? 'text-amber-600 font-black' : ''}>
                                {isAvail ? `${stockVal} units` : '0 units (OOS)'}
                              </span>
                            </div>
                          </td>

                          {/* LIVE AVAILABILITY TOGGLE BUTTON */}
                          <td className="py-3 px-3 text-center">
                            <button
                              type="button"
                              id={`toggle-avail-${item.id}`}
                              onClick={() => handleToggleAvailability(item)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs transition-all duration-200 cursor-pointer shadow-xs transform hover:scale-105 active:scale-95 border select-none ${
                                isAvail
                                  ? 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900 border-emerald-300 hover:border-emerald-400'
                                  : 'bg-rose-100 hover:bg-rose-200 text-rose-900 border-rose-300 hover:border-rose-400'
                              }`}
                              title={isAvail ? 'Click to mark as UNAVAILABLE on citizen dashboard' : 'Click to mark as AVAILABLE on citizen dashboard'}
                            >
                              {isAvail ? (
                                <>
                                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
                                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                                  <span>Available (In Stock)</span>
                                  <span className="text-[10px] font-normal text-emerald-700 ml-1 opacity-70">
                                    [Switch]
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span className="w-2 h-2 rounded-full bg-rose-600"></span>
                                  <X className="w-3.5 h-3.5 text-rose-700" />
                                  <span>Unavailable (Out of Stock)</span>
                                  <span className="text-[10px] font-normal text-rose-700 ml-1 opacity-70">
                                    [Switch]
                                  </span>
                                </>
                              )}
                            </button>
                          </td>

                          {/* Quick Actions */}
                          <td className="py-3 px-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleQuickRestock(item.id, stockVal)}
                                className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                                title="Quick Restock +100 Units"
                              >
                                +100 Stock
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm(`Remove "${item.brandName}" from Kendra inventory?`)) {
                                    removeMedicine(item.id);
                                    showNotification(`Removed "${item.brandName}" from inventory.`);
                                  }
                                }}
                                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                                title="Delete Tablet"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {filteredInventory.length === 0 && (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500 space-y-2">
                  <p className="font-bold text-slate-700">No medicines found matching your search.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setAvailabilityFilter('all');
                    }}
                    className="text-amber-700 font-bold hover:underline"
                  >
                    Clear Search Filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* SECTION: Dispense e-Prescriptions */}
          {currentSection === 'dispense' && (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900">
                  e-Prescription Dispensation & Patient Fulfillment
                </h3>
                <p className="text-xs text-slate-500">
                  Doctor digital prescriptions routed to your Kendra for generic substitution and fulfillment.
                </p>
              </div>

              <div className="space-y-4">
                {prescriptions.map(rx => {
                  const isDispensed = dispensedRx.includes(rx.id);
                  return (
                    <div key={rx.id} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-mono text-slate-400">Rx ID: {rx.id}</span>
                          <h4 className="text-sm font-extrabold text-slate-900">{rx.patientName} (ABHA Verified)</h4>
                          <p className="text-xs text-slate-500">Prescribed by {rx.doctorName} • {rx.date}</p>
                        </div>

                        <button
                          onClick={() => handleDispense(rx.id)}
                          disabled={isDispensed}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 ${
                            isDispensed
                              ? 'bg-emerald-600 text-white opacity-80 cursor-default'
                              : 'bg-amber-600 hover:bg-amber-700 text-white cursor-pointer'
                          }`}
                        >
                          {isDispensed ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Dispensed & Invoiced</span>
                            </>
                          ) : (
                            <>
                              <Package className="w-3.5 h-3.5" />
                              <span>Fulfill with Jan Aushadhi Salts</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1.5">
                        <span className="font-bold text-slate-700 block text-[11px] uppercase">Medicines to Dispense:</span>
                        {rx.medicines.map((m, i) => (
                          <div key={i} className="flex justify-between items-center text-slate-800">
                            <span>• {m.genericSalt} ({m.dosage})</span>
                            <span className="font-mono text-emerald-700 font-bold">In Stock</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SECTION: Generic Substitute Calculator */}
          {currentSection === 'substitute' && (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs p-6 space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900">
                  Citizen Savings Calculator & Bill Comparison
                </h3>
                <p className="text-xs text-slate-500">
                  Demonstrate exact financial relief to patients when switching to Jan Aushadhi generics.
                </p>
              </div>

              <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 text-center space-y-3">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                  Typical Chronic Patient Annual Savings:
                </span>
                <span className="text-4xl font-black text-emerald-700 font-mono block">
                  ₹18,400 / Year
                </span>
                <p className="text-xs text-slate-600 max-w-md mx-auto">
                  Based on a typical prescription of Anti-Diabetic (Metformin+Glimepiride), Cardiac (Atorvastatin 20mg), and Anti-Hypertensive (Telmisartan 40mg).
                </p>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* MODAL: Add New Tablet / Medicine (Medical Person Portal) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 animate-in fade-in zoom-in-95 duration-200 my-8">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Kendra Inventory Registration</span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 font-['Outfit',sans-serif]">
                  Add New Tablet / Generic Medicine
                </h3>
                <p className="text-xs text-slate-500">
                  Register generic salts, specify pricing, and choose whether it is immediately Available to citizens.
                </p>
              </div>

              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleAddSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Generic Salt Name */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700">
                    Generic Salt Formulation / Active Molecule <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Cefixime Trihydrate 200mg Tablets IP"
                    value={formData.genericName}
                    onChange={e => setFormData({ ...formData, genericName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600 font-medium"
                  />
                </div>

                {/* Branded Equivalent */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Branded Equivalent Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Taxim-O 200 / Mahacef 200"
                    value={formData.brandName}
                    onChange={e => setFormData({ ...formData, brandName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600 font-medium"
                  />
                </div>

                {/* Therapeutic Category */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Therapeutic Category <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600 font-medium cursor-pointer"
                  >
                    {categoryOptions.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Pack Unit */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Pack Packaging Unit
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 10 Tablets Strip"
                    value={formData.unit}
                    onChange={e => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600 font-medium"
                  />
                </div>

                {/* Initial Stock Units */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">
                    Initial Stock Count (Units)
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="500"
                    value={formData.stockUnits}
                    onChange={e => setFormData({ ...formData, stockUnits: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600 font-mono font-bold"
                  />
                </div>

                {/* Jan Aushadhi Generic Price */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-emerald-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Jan Aushadhi Kendra Price (₹) <span className="text-rose-500">*</span></span>
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    required
                    placeholder="e.g. 42"
                    value={formData.genericPrice}
                    onChange={e => setFormData({ ...formData, genericPrice: e.target.value })}
                    className="w-full bg-emerald-50 border border-emerald-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-emerald-950 focus:outline-none focus:border-emerald-600 font-mono font-bold"
                  />
                </div>

                {/* Branded MRP Price */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">
                    Branded Commercial MRP (₹)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    placeholder="e.g. 175"
                    value={formData.brandPrice}
                    onChange={e => setFormData({ ...formData, brandPrice: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-emerald-600 font-mono"
                  />
                </div>
              </div>

              {/* AVAILABILITY OPTION SELECTOR (Available vs Unavailable) */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2">
                <label className="text-xs font-extrabold text-slate-800 block">
                  Citizen Dashboard Availability Option:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, janAushadhiAvailable: true })}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      formData.janAushadhiAvailable
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-500/30'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Available (In Stock)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, janAushadhiAvailable: false })}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      !formData.janAushadhiAvailable
                        ? 'bg-rose-600 text-white border-rose-600 shadow-md ring-2 ring-rose-500/30'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>Unavailable (Out of Stock)</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-500">
                  {formData.janAushadhiAvailable
                    ? '✓ Will show as "Available in Kendra" on citizen searches and patient dashboard.'
                    : '✕ Will show as "Currently Unavailable (Out of Stock)" on citizen dashboard.'}
                </p>
              </div>

              {/* Usage & Clinical Info */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700">
                  Clinical Indication / Usage Description
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Treats acute bacterial respiratory, ENT, and uncomplicated urinary tract infections."
                  value={formData.usageDescription}
                  onChange={e => setFormData({ ...formData, usageDescription: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-emerald-600"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  <span>Register & Publish Tablet</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};

