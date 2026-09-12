import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Search,
  Navigation,
  ExternalLink,
  Compass,
  X,
  Building2,
  Stethoscope,
  Pill,
  ShieldAlert,
  ChevronRight,
  Check,
  Globe
} from 'lucide-react';

export interface LocationItem {
  id: string;
  name: string;
  address: string;
  city?: string;
  state?: string;
  type?: string;
  location?: { lat: number; lng: number };
  mapsUri?: string;
  directionsUri?: string;
}

interface GoogleMapsLocationSearchProps {
  onSelectLocation?: (location: LocationItem) => void;
  onNavigateTab?: (tabId: string, locationQuery?: string) => void;
}

export const GoogleMapsLocationSearch: React.FC<GoogleMapsLocationSearchProps> = ({
  onSelectLocation,
  onNavigateTab
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<LocationItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationItem | null>(null);
  const [isDetectingGps, setIsDetectingGps] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const popularLocations: LocationItem[] = [
    { id: 'del-1', name: 'AIIMS New Delhi (Ansari Nagar)', address: 'Sri Aurobindo Marg, Ansari Nagar East, New Delhi, Delhi 110029', city: 'New Delhi', state: 'Delhi', type: 'Premier Government Hospital', location: { lat: 28.5672, lng: 77.2100 } },
    { id: 'del-2', name: 'Connaught Place (CP), New Delhi', address: 'Connaught Place, Central Delhi, New Delhi 110001', city: 'New Delhi', state: 'Delhi', type: 'Central Capital Hub', location: { lat: 28.6304, lng: 77.2177 } },
    { id: 'mum-1', name: 'Tata Memorial & KEM Hospital, Mumbai', address: 'Parel, Mumbai, Maharashtra 400012', city: 'Mumbai', state: 'Maharashtra', type: 'Apex Tertiary Care', location: { lat: 19.0041, lng: 72.8433 } },
    { id: 'mum-2', name: 'Andheri West, Mumbai', address: 'Andheri West, Mumbai Suburban, Maharashtra 400058', city: 'Mumbai', state: 'Maharashtra', type: 'Urban Medical Corridor', location: { lat: 19.1363, lng: 72.8277 } },
    { id: 'blr-1', name: 'Victoria Hospital & BMCRI, Bengaluru', address: 'Fort Road, Near City Market, Bengaluru, Karnataka 560002', city: 'Bengaluru', state: 'Karnataka', type: 'Medical College & Trauma', location: { lat: 12.9629, lng: 77.5753 } },
    { id: 'blr-2', name: 'Indiranagar & Koramangala, Bengaluru', address: 'East Bengaluru Urban, Karnataka 560038', city: 'Bengaluru', state: 'Karnataka', type: 'Healthcare Hub', location: { lat: 12.9784, lng: 77.6408 } },
    { id: 'chn-1', name: 'Apollo Hospitals & Rajiv Gandhi General, Chennai', address: 'Greams Road & Park Town, Chennai, Tamil Nadu 600006', city: 'Chennai', state: 'Tamil Nadu', type: 'Multi-Speciality & Gov General', location: { lat: 13.0583, lng: 80.2520 } },
    { id: 'hyd-1', name: 'NIMS & Osmania Hospital, Hyderabad', address: 'Punjagutta & Afzal Gunj, Hyderabad, Telangana 500082', city: 'Hyderabad', state: 'Telangana', type: 'Apex Healthcare Institutions', location: { lat: 17.4223, lng: 78.4526 } },
    { id: 'kol-1', name: 'SSKM Hospital & IPGMER, Kolkata', address: '244 AJC Bose Road, Kolkata, West Bengal 700020', city: 'Kolkata', state: 'West Bengal', type: 'Apex Government Hospital', location: { lat: 22.5388, lng: 88.3444 } }
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search query
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      setErrorMsg(null);
      try {
        const res = await fetch(`/api/maps/search?q=${encodeURIComponent(query.trim())}`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data.results || []);
          setIsOpen(true);
        }
      } catch (err) {
        console.error('Google Maps search failed:', err);
      } finally {
        setIsSearching(false);
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (item: LocationItem) => {
    setSelectedLocation(item);
    setQuery(item.name);
    setIsOpen(false);
    if (onSelectLocation) {
      onSelectLocation(item);
    }
  };

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setErrorMsg('Geolocation is not supported by your browser.');
      return;
    }

    setIsDetectingGps(true);
    setErrorMsg(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(`/api/maps/reverse-geocode?lat=${latitude}&lng=${longitude}`);
          if (res.ok) {
            const data = await res.json();
            const gpsLoc: LocationItem = {
              id: 'gps-current',
              name: data.name || `My Current Location (${latitude.toFixed(3)}°, ${longitude.toFixed(3)}°)`,
              address: data.address || `GPS coordinates: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
              city: 'Detected Location',
              type: 'Current GPS Location',
              location: { lat: latitude, lng: longitude },
              mapsUri: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
              directionsUri: `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`
            };
            handleSelect(gpsLoc);
          } else {
            const fallbackLoc: LocationItem = {
              id: 'gps-current',
              name: `My GPS Location (${latitude.toFixed(3)}°, ${longitude.toFixed(3)}°)`,
              address: `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`,
              type: 'GPS Coordinates',
              location: { lat: latitude, lng: longitude },
              mapsUri: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
            };
            handleSelect(fallbackLoc);
          }
        } catch (e) {
          console.error('Reverse geocode error:', e);
        } finally {
          setIsDetectingGps(false);
        }
      },
      (err) => {
        console.warn('Geolocation error:', err);
        setIsDetectingGps(false);
        setErrorMsg('Unable to retrieve your location. Please check browser permissions or search manually.');
      },
      { timeout: 8000, enableHighAccuracy: true }
    );
  };

  const openGoogleMapsDirectly = (item?: LocationItem | null) => {
    const target = item || selectedLocation;
    let url = 'https://www.google.com/maps';
    if (target?.mapsUri) {
      url = target.mapsUri;
    } else if (target?.location) {
      url = `https://www.google.com/maps/search/?api=1&query=${target.location.lat},${target.location.lng}`;
    } else if (query.trim()) {
      url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query.trim())}`;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openGoogleMapsDirections = (item?: LocationItem | null) => {
    const target = item || selectedLocation;
    let url = 'https://www.google.com/maps/dir/';
    if (target?.directionsUri) {
      url = target.directionsUri;
    } else if (target?.location) {
      url = `https://www.google.com/maps/dir/?api=1&destination=${target.location.lat},${target.location.lng}`;
    } else if (query.trim()) {
      url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(query.trim())}`;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div ref={containerRef} className="w-full max-w-3xl mx-auto space-y-4 text-left">
      
      {/* Main Google Maps Search Bar */}
      <div className="relative">
        <div className="bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-2xl border border-white/40 flex flex-col sm:flex-row items-center gap-2 text-slate-900 focus-within:ring-2 focus-within:ring-teal-400/50 transition-all">
          
          {/* Location Pin & Input */}
          <div className="flex items-center gap-2.5 px-3 flex-1 w-full">
            <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600 shrink-0">
              <MapPin className="w-5 h-5 text-teal-600 animate-pulse" />
            </div>
            
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsOpen(true);
              }}
              onFocus={() => setIsOpen(true)}
              placeholder="Search location, city, hospital, or address on Google Maps..."
              className="w-full bg-transparent py-2.5 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none font-medium"
              aria-label="Search location on Google Maps"
            />

            {/* Clear Query */}
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setSelectedLocation(null);
                  setSuggestions([]);
                }}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* GPS Detect Current Location Button */}
            <button
              type="button"
              onClick={handleUseCurrentLocation}
              disabled={isDetectingGps}
              className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 ${
                isDetectingGps
                  ? 'bg-teal-100 text-teal-700 animate-pulse'
                  : 'bg-slate-100 hover:bg-teal-50 text-slate-600 hover:text-teal-700'
              }`}
              title="Detect my current location with GPS"
            >
              <Navigation className={`w-3.5 h-3.5 ${isDetectingGps ? 'animate-spin' : ''}`} />
              <span className="hidden md:inline">{isDetectingGps ? 'Locating...' : 'GPS'}</span>
            </button>
          </div>

          {/* Search / Google Maps Action Button */}
          <button
            type="button"
            onClick={() => {
              if (selectedLocation) {
                openGoogleMapsDirectly(selectedLocation);
              } else if (query.trim()) {
                const manualLoc: LocationItem = {
                  id: 'manual',
                  name: query.trim(),
                  address: query.trim(),
                  mapsUri: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query.trim())}`
                };
                handleSelect(manualLoc);
              } else {
                setIsOpen(true);
              }
            }}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
          >
            <Compass className="w-4 h-4" />
            <span>Search Location</span>
          </button>
        </div>

        {/* Error message if any */}
        {errorMsg && (
          <p className="text-xs text-rose-300 font-medium mt-2 px-2 flex items-center gap-1">
            <span>⚠️</span> {errorMsg}
          </p>
        )}

        {/* Dropdown Suggestions List */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 divide-y divide-slate-100 text-slate-800 animate-in fade-in slide-in-from-top-2 duration-150 max-h-96 overflow-y-auto">
            
            {/* Header / GPS shortcut */}
            <div className="p-3 bg-slate-50/80 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 uppercase tracking-wider">
                <Globe className="w-3.5 h-3.5 text-teal-600" />
                <span>Google Maps Location Finder</span>
              </div>
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1 hover:underline"
              >
                <Navigation className="w-3 h-3" />
                Use Current Location
              </button>
            </div>

            {/* Live Suggestions or Popular Places */}
            <div className="py-1">
              {isSearching ? (
                <div className="p-4 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
                  <span>Searching Google Maps locations...</span>
                </div>
              ) : suggestions.length > 0 ? (
                suggestions.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelect(item)}
                    className="w-full text-left px-4 py-3 hover:bg-teal-50/80 transition-colors flex items-start gap-3 group"
                  >
                    <div className="p-2 rounded-xl bg-slate-100 text-slate-600 group-hover:bg-teal-100 group-hover:text-teal-700 transition-colors shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-teal-900 truncate">
                          {item.name}
                        </span>
                        {item.type && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-teal-200/60 group-hover:text-teal-800 shrink-0">
                            {item.type}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        {item.address}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                  </button>
                ))
              ) : query.trim() ? (
                <div className="p-4 text-center">
                  <p className="text-xs text-slate-600">No exact match found for "{query}".</p>
                  <button
                    type="button"
                    onClick={() => openGoogleMapsDirectly()}
                    className="mt-2 text-xs font-bold text-teal-600 hover:text-teal-700 inline-flex items-center gap-1 underline"
                  >
                    <span>Search "{query}" directly in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div>
                  <div className="px-4 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Popular Medical & Metro Centers
                  </div>
                  {popularLocations.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelect(item)}
                      className="w-full text-left px-4 py-2.5 hover:bg-teal-50/80 transition-colors flex items-start gap-3 group"
                    >
                      <MapPin className="w-4 h-4 text-slate-400 group-hover:text-teal-600 shrink-0 mt-1" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-semibold text-slate-800 group-hover:text-teal-900 truncate">
                            {item.name}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 shrink-0">
                            {item.city}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.address}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Quick Location Chips */}
      <div className="flex items-center justify-center flex-wrap gap-2 pt-1 text-xs">
        <span className="text-teal-200/80 font-medium text-[11px]">Quick Search:</span>
        {[
          { label: '📍 New Delhi', query: 'AIIMS New Delhi' },
          { label: '📍 Mumbai', query: 'Tata Memorial Mumbai' },
          { label: '📍 Bengaluru', query: 'Victoria Hospital Bengaluru' },
          { label: '📍 Chennai', query: 'Apollo Hospitals Chennai' },
          { label: '📍 Hyderabad', query: 'NIMS Hospital Hyderabad' },
          { label: '📍 Kolkata', query: 'SSKM Hospital Kolkata' }
        ].map((chip, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setQuery(chip.query);
              setIsOpen(true);
            }}
            className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white/90 text-xs font-medium backdrop-blur-md border border-white/20 transition-all hover:scale-105 cursor-pointer"
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Selected Location Details Card with Google Maps actions */}
      {selectedLocation && (
        <div className="mt-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-teal-200/80 text-slate-900 animate-in fade-in zoom-in-95 duration-200">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-teal-500 text-white shadow-md shrink-0 mt-0.5">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                    Selected Location
                  </span>
                  {selectedLocation.location && (
                    <span className="text-[11px] text-slate-500 font-mono">
                      {selectedLocation.location.lat.toFixed(4)}°, {selectedLocation.location.lng.toFixed(4)}°
                    </span>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mt-1 font-['Outfit',sans-serif]">
                  {selectedLocation.name}
                </h3>
                <p className="text-xs text-slate-600 mt-0.5 max-w-xl">
                  {selectedLocation.address}
                </p>
              </div>
            </div>

            {/* Google Maps Actions */}
            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <button
                type="button"
                onClick={() => openGoogleMapsDirectly(selectedLocation)}
                className="flex-1 sm:flex-none px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                title="Open location in Google Maps"
              >
                <Globe className="w-3.5 h-3.5 text-teal-400" />
                <span>Open in Maps</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </button>

              <button
                type="button"
                onClick={() => openGoogleMapsDirections(selectedLocation)}
                className="flex-1 sm:flex-none px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                title="Get driving/walking directions in Google Maps"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Directions</span>
              </button>
            </div>
          </div>

          {/* Connected Healthcare Navigation in this location */}
          {onNavigateTab && (
            <div className="pt-3">
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                Explore Healthcare In & Around {selectedLocation.city || selectedLocation.name}:
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => onNavigateTab('hospitals', selectedLocation.city || selectedLocation.name)}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200/80 hover:border-teal-300 text-left transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <Building2 className="w-4 h-4 text-teal-600 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-800 group-hover:text-teal-900 truncate">Hospitals & Beds</div>
                    <div className="text-[10px] text-slate-500">Live ICU status</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigateTab('doctors', selectedLocation.city || selectedLocation.name)}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200/80 hover:border-teal-300 text-left transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <Stethoscope className="w-4 h-4 text-blue-600 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-800 group-hover:text-blue-900 truncate">Find Doctors</div>
                    <div className="text-[10px] text-slate-500">Book OPD/Video</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigateTab('medicines', selectedLocation.city || selectedLocation.name)}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200/80 hover:border-teal-300 text-left transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <Pill className="w-4 h-4 text-amber-600 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-800 group-hover:text-amber-900 truncate">Jan Aushadhi</div>
                    <div className="text-[10px] text-slate-500">Generic stores</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigateTab('emergency', selectedLocation.city || selectedLocation.name)}
                  className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100/80 border border-rose-200 text-left transition-all flex items-center gap-2 group cursor-pointer"
                >
                  <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-rose-900 truncate">108 Emergency</div>
                    <div className="text-[10px] text-rose-600 font-semibold">Trauma dispatch</div>
                  </div>
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
