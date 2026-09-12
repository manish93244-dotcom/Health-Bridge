import React, { useState, useEffect, useRef } from 'react';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Sparkles,
  User,
  HeartPulse,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Share2,
  Camera,
  History,
  Activity,
  Calendar,
  Layers,
  FileSpreadsheet,
  TrendingUp,
  AlertTriangle,
  Eye,
  Maximize2,
  Scan,
  RefreshCw,
  Plus,
  ZoomIn,
  ZoomOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useHealthBridge } from '../context/HealthBridgeContext';
import { samplePatientHistory, PatientDetailedHistory } from '../data/patientHistoryData';
import { PatientCompleteHistoryModal } from '../components/telehealth/PatientCompleteHistoryModal';
import { CameraActivityDetector } from '../components/telehealth/CameraActivityDetector';

interface DoctorCameraPageProps {
  onEndCall: () => void;
  targetDoctorOrPatient?: any;
}

export const DoctorCameraPage: React.FC<DoctorCameraPageProps> = ({
  onEndCall,
  targetDoctorOrPatient
}) => {
  const { user, activeRole } = useAuth();
  const { addPrescription } = useHealthBridge();

  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isHudOn, setIsHudOn] = useState(true);
  const [zoomLevel, setZoomLevel] = useState<number>(0.7);
  const [callDuration, setCallDuration] = useState(0);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [activeSideTab, setActiveSideTab] = useState<'activity' | 'history' | 'scribe' | 'labs'>('activity');
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  // Live real-time biometric mock tracker values
  const [livePulse, setLivePulse] = useState(74);
  const [liveResp, setLiveResp] = useState(18);
  const [livePain, setLivePain] = useState(2);
  const [liveAlertness, setLiveAlertness] = useState(94);

  const [aiNotes, setAiNotes] = useState([
    '• Patient reports 3 days of low-grade fever (100.4 F) with dry cough and throat irritation.',
    '• No history of chest pain, dyspnea, or syncope.',
    '• Heart rate regular at ~78 bpm. Throat examination shows mild erythematous posterior pharyngeal wall.',
    '• Assessment: Likely acute viral pharyngitis with secondary bacterial predisposition.',
    '• Recommended Jan Aushadhi generic: Amoxicillin-Clavulanate 625mg + Paracetamol 650mg SOS.'
  ]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Call timer & dynamic biometric variation
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
      setLivePulse(73 + Math.floor(Math.sin(Date.now() / 1400) * 3));
      setLiveResp(18 + Math.floor(Math.sin(Date.now() / 2800) * 1.5));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // WebCam setup
  useEffect(() => {
    async function setupCamera() {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: {
              width: { ideal: 1920, min: 640 },
              height: { ideal: 1080, min: 480 },
              facingMode: 'user'
            },
            audio: true
          });
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        }
      } catch (err: any) {
        console.warn('Camera access fallback (normal in sandboxed/headless previews):', err);
        setCameraError('Live camera access simulated in preview mode.');
      }
    }
    setupCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach(track => {
        track.enabled = !isVideoOn;
      });
    }
  };

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach(track => {
        track.enabled = !isMicOn;
      });
    }
  };

  const handleAppendVisionNotes = (notes: string[]) => {
    setAiNotes(prev => [...prev, ...notes]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      
      {/* Top Telehealth Sky-Blue Status Bar */}
      <div className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 text-white rounded-3xl px-6 py-4 flex flex-wrap items-center justify-between gap-4 border border-sky-400/30 shadow-lg">
        <div className="flex items-center gap-3.5">
          <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 animate-ping"></span>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-extrabold tracking-tight flex items-center gap-2 font-['Outfit',sans-serif]">
                <span>ABDM Encrypted Telehealth Consultation</span>
                <span className="text-[10px] font-mono bg-white/20 text-white px-2 py-0.5 rounded-full border border-white/30">
                  HD Vision & Biometrics
                </span>
              </h2>
            </div>
            <p className="text-xs text-sky-100 flex items-center gap-2 mt-0.5">
              <span>Patient: <strong>{samplePatientHistory.name}</strong> ({samplePatientHistory.age} Y, {samplePatientHistory.gender})</span>
              <span>•</span>
              <span>ABHA: <strong>{samplePatientHistory.abhaId}</strong></span>
              <span>•</span>
              <span className="text-emerald-300 font-semibold">{samplePatientHistory.pmjaySchemeStatus}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          {/* Complete Patient History Open Button */}
          <button
            onClick={() => setIsHistoryModalOpen(true)}
            className="px-4 py-2 bg-white text-blue-700 hover:bg-sky-50 rounded-xl font-bold flex items-center gap-1.5 transition-all shadow-md active:scale-98 cursor-pointer"
          >
            <History className="w-4 h-4 text-blue-600" />
            <span>Complete Patient History (EHR)</span>
          </button>

          <div className="bg-black/20 backdrop-blur-md px-3 py-2 rounded-xl font-mono text-emerald-300 font-bold border border-white/10">
            {formatTimer(callDuration)}
          </div>

          <button
            onClick={onEndCall}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold flex items-center gap-1.5 transition-colors shadow-md cursor-pointer"
          >
            <PhoneOff className="w-3.5 h-3.5" />
            <span>End Call</span>
          </button>
        </div>
      </div>

      {/* Main Video Stage & Side Controls Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Video Canvas & HUD (7 cols on lg) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-3xl overflow-hidden relative shadow-2xl border border-slate-800 flex flex-col justify-between min-h-[480px] sm:min-h-[540px]">
          
          {/* Main Remote Video Feed */}
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950 p-2 sm:p-4 overflow-hidden">
            {isVideoOn ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: 'center center',
                  transition: 'transform 0.2s ease-out'
                }}
                className="max-w-full max-h-full object-contain rounded-xl shadow-lg"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-500 space-y-2">
                <VideoOff className="w-12 h-12 text-slate-600" />
                <span className="text-xs font-semibold">Camera is Turned Off</span>
              </div>
            )}
          </div>

          {/* Fallback Simulation Notice in Sandboxed Environment */}
          {cameraError && (
            <div className="absolute top-4 left-4 z-20 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700 text-[11px] text-sky-300 font-medium flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-sky-400" />
              <span>🎥 Virtual High-Definition Patient Stream Connected</span>
            </div>
          )}

          {/* REAL-TIME CAMERA ACTIVITY DETECTION HUD OVERLAY */}
          {isHudOn && isVideoOn && (
            <div className="absolute inset-0 z-10 pointer-events-none p-4 sm:p-6 flex flex-col justify-between">
              
              {/* Top HUD: Patient Activity & Posture Tracker Bounding Box */}
              <div className="flex items-start justify-between">
                <div className="bg-slate-900/85 backdrop-blur-md border border-sky-400/40 rounded-2xl p-3 text-white space-y-1.5 shadow-xl max-w-xs animate-in fade-in duration-200">
                  <div className="flex items-center justify-between gap-2 border-b border-sky-400/30 pb-1">
                    <span className="text-[10px] font-mono text-sky-300 uppercase tracking-wider flex items-center gap-1">
                      <Scan className="w-3 h-3 text-sky-400 animate-pulse" />
                      <span>AI Camera Activity Detector</span>
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  </div>

                  <div className="space-y-0.5 text-xs">
                    <p className="font-bold text-white flex items-center justify-between">
                      <span className="text-slate-400 font-normal">Activity:</span>
                      <span className="text-emerald-300">Sitting Upright & Conversational</span>
                    </p>
                    <p className="font-bold text-white flex items-center justify-between">
                      <span className="text-slate-400 font-normal">Posture:</span>
                      <span className="text-sky-200">Normal Spinal Alignment</span>
                    </p>
                    <p className="font-bold text-white flex items-center justify-between">
                      <span className="text-slate-400 font-normal">Alertness:</span>
                      <span className="text-emerald-300">{liveAlertness}% (Attentive)</span>
                    </p>
                    <p className="font-bold text-white flex items-center justify-between">
                      <span className="text-slate-400 font-normal">Pain Expression:</span>
                      <span className="text-amber-300">{livePain} / 10 (Mild)</span>
                    </p>
                    <p className="font-bold text-white flex items-center justify-between">
                      <span className="text-slate-400 font-normal">Motor Tremor:</span>
                      <span className="text-teal-300">0.4 mm (Controlled)</span>
                    </p>
                  </div>
                </div>

                {/* Top Right: Live rPPG Vital Waves */}
                <div className="bg-slate-900/85 backdrop-blur-md border border-sky-400/40 rounded-2xl p-2.5 text-white shadow-xl space-y-1 text-right">
                  <div className="flex items-center justify-end gap-1 text-[10px] text-rose-300 uppercase font-mono">
                    <HeartPulse className="w-3 h-3 animate-pulse text-rose-400" />
                    <span>Live Biometrics</span>
                  </div>
                  <div className="font-mono text-xs">
                    <span className="text-rose-400 font-bold">{livePulse}</span> <span className="text-[10px] text-slate-400">BPM</span> • <span className="text-sky-400 font-bold">{liveResp}</span> <span className="text-[10px] text-slate-400">Resp/m</span>
                  </div>
                </div>
              </div>

              {/* Middle Dynamic Vision Focus Frame */}
              <div className="mx-auto w-64 sm:w-80 h-48 sm:h-60 border-2 border-dashed border-sky-400/40 rounded-3xl flex items-center justify-center relative">
                <span className="absolute -top-3 left-4 bg-sky-600/90 text-white text-[9px] font-mono px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                  Target: Rahul Verma
                </span>
                <span className="absolute -bottom-3 right-4 bg-emerald-600/90 text-white text-[9px] font-mono px-2 py-0.5 rounded uppercase font-bold">
                  Bilateral Symmetry: 98%
                </span>
              </div>

              {/* Bottom Notification */}
              <div className="text-center">
                <span className="bg-black/60 backdrop-blur-md text-sky-200 text-[10px] font-mono px-3 py-1 rounded-full border border-sky-400/30">
                  Visual Demeanor Baseline Comparison Active • +88% Clinical Recovery
                </span>
              </div>

            </div>
          )}

          {/* Picture-in-Picture Local Doctor Badge */}
          <div className="absolute bottom-20 right-4 z-20 w-32 sm:w-36 h-24 sm:h-26 bg-slate-800/90 backdrop-blur-md rounded-2xl border-2 border-sky-500 overflow-hidden shadow-2xl flex items-center justify-center text-white">
            <div className="text-center p-2">
              <User className="w-5 h-5 mx-auto text-sky-300" />
              <span className="text-[10px] font-bold block mt-1 truncate">{user?.name}</span>
              <span className="text-[9px] text-sky-200 uppercase">{activeRole}</span>
            </div>
          </div>

          {/* Video Controls Bar */}
          <div className="relative z-20 m-4 bg-slate-900/95 backdrop-blur-md p-3 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-center gap-2.5">
            <button
              onClick={toggleMic}
              className={`p-3 rounded-xl transition-all cursor-pointer ${
                isMicOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-red-600 text-white'
              }`}
              title={isMicOn ? 'Mute Mic' : 'Unmute Mic'}
            >
              {isMicOn ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </button>

            <button
              onClick={toggleVideo}
              className={`p-3 rounded-xl transition-all cursor-pointer ${
                isVideoOn ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-red-600 text-white'
              }`}
              title={isVideoOn ? 'Turn Off Camera' : 'Turn On Camera'}
            >
              {isVideoOn ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
            </button>

            {/* Camera Zoom / Size Controls */}
            <div className="flex items-center gap-1 bg-slate-800/90 px-2.5 py-1.5 rounded-xl border border-slate-700/80">
              <button
                type="button"
                onClick={() => setZoomLevel(prev => Math.max(0.4, Number((prev - 0.1).toFixed(2))))}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                title="Zoom Out (Make camera smaller)"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-mono font-bold text-slate-200 min-w-[38px] text-center select-none">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoomLevel(prev => Math.min(1.4, Number((prev + 0.1).toFixed(2))))}
                className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                title="Zoom In (Make camera larger)"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(0.6)}
                className={`text-[10px] font-bold px-1.5 py-1 rounded transition-colors cursor-pointer ml-1 ${
                  zoomLevel <= 0.65 ? 'bg-sky-600 text-white' : 'bg-slate-700 text-slate-300 hover:text-white'
                }`}
                title="Set to Small wide view"
              >
                Small
              </button>
            </div>

            {/* Toggle HUD */}
            <button
              onClick={() => setIsHudOn(!isHudOn)}
              className={`px-3 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer ${
                isHudOn ? 'bg-sky-600 text-white shadow-xs' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
              title="Toggle AI Camera Biometrics HUD Overlay"
            >
              <Scan className="w-4 h-4" />
              <span>HUD {isHudOn ? 'ON' : 'OFF'}</span>
            </button>

            <button
              onClick={() => alert('Screen sharing initialized with patient.')}
              className="p-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all cursor-pointer"
              title="Share Medical Reports / Scans"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsHistoryModalOpen(true)}
              className="px-3.5 py-2.5 bg-blue-700 hover:bg-blue-600 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
              title="Open Complete Patient EHR Dossier"
            >
              <History className="w-4 h-4" />
              <span>Full EHR</span>
            </button>

            <button
              onClick={onEndCall}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
            >
              <PhoneOff className="w-3.5 h-3.5" />
              <span>End Call</span>
            </button>
          </div>

        </div>

        {/* Real-time Side Control & History Panel (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Tab Navigation Header for Side Panel */}
          <div className="bg-white rounded-2xl p-1.5 border border-slate-200 shadow-xs flex items-center gap-1 overflow-x-auto">
            <button
              onClick={() => setActiveSideTab('activity')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                activeSideTab === 'activity'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Activity & Compare</span>
            </button>

            <button
              onClick={() => setActiveSideTab('history')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                activeSideTab === 'history'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Patient History</span>
            </button>

            <button
              onClick={() => setActiveSideTab('scribe')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                activeSideTab === 'scribe'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Scribe & Rx</span>
            </button>

            <button
              onClick={() => setActiveSideTab('labs')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                activeSideTab === 'labs'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Lab Reports</span>
            </button>
          </div>

          {/* TAB 1: CAMERA ACTIVITY DETECTOR & BASELINE COMPARISON */}
          {activeSideTab === 'activity' && (
            <div className="animate-in fade-in duration-150">
              <CameraActivityDetector
                videoRef={videoRef}
                patientName={samplePatientHistory.name}
                onAnalysisGenerated={handleAppendVisionNotes}
              />
            </div>
          )}

          {/* TAB 2: INLINE PATIENT HISTORY SUMMARY */}
          {activeSideTab === 'history' && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-5 space-y-4 text-slate-800 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <History className="w-4 h-4 text-blue-600" />
                    <span>Patient Medical Records & EHR</span>
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Comprehensive longitudinal records synced via Ayushman Bharat Digital Mission (ABDM).
                  </p>
                </div>
                <button
                  onClick={() => setIsHistoryModalOpen(true)}
                  className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold text-xs transition-colors cursor-pointer"
                >
                  Full View
                </button>
              </div>

              {/* Allergies Highlight */}
              <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3 text-xs space-y-1">
                <span className="font-bold text-rose-900 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  Known Allergies:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {samplePatientHistory.allergies.map((alg, idx) => (
                    <span key={idx} className="bg-white px-2 py-0.5 rounded text-[11px] font-semibold text-rose-800 border border-rose-200">
                      {alg.substance} ({alg.severity})
                    </span>
                  ))}
                </div>
              </div>

              {/* Chronic Conditions */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Active Chronic Conditions:
                </span>
                <div className="space-y-2">
                  {samplePatientHistory.chronicConditions.map((cond, idx) => (
                    <div key={idx} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-xs">
                      <div className="flex justify-between font-bold text-slate-900">
                        <span>{cond.condition}</span>
                        <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          {cond.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">Diagnosed: {cond.diagnosedSince}</p>
                      <p className="text-slate-700 font-medium mt-0.5">Rx: {cond.managementPlan}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Past Visits Summary */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                  Last Doctor Consultation (14 Aug 2025):
                </span>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1.5">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>Dr. Priya Sharma (AIIMS)</span>
                    <span className="text-slate-500 font-mono">14 Aug 2025</span>
                  </div>
                  <p className="text-blue-700 font-semibold">
                    Diagnosis: Acute Streptococcal Pharyngotonsillitis
                  </p>
                  <p className="text-slate-600 text-[11px]">
                    Prescription: Augmentin 625mg Duo (Jan Aushadhi) + Paracetamol 650mg SOS.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsHistoryModalOpen(true)}
                className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>Open Full Patient EHR Dossier</span>
              </button>
            </div>
          )}

          {/* TAB 3: AI SCRIBE & INSTANT E-PRESCRIPTION */}
          {activeSideTab === 'scribe' && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-5 space-y-4 flex flex-col justify-between text-slate-800 animate-in fade-in duration-150">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-sky-600" />
                    <h3 className="text-sm font-bold text-slate-900">
                      Live AI Scribe & SOAP Notes
                    </h3>
                  </div>
                  <span className="text-[10px] font-bold bg-sky-50 text-sky-800 px-2 py-0.5 rounded border border-sky-200">
                    Gemini 3.7 Active
                  </span>
                </div>

                {/* Patient Vitals Card */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70 text-xs space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Patient:</span>
                    <span className="font-bold text-slate-900">Rahul Verma (42 M)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">ABHA Address:</span>
                    <span className="font-mono text-sky-800 font-semibold">rahul.verma@abdm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Ayushman PM-JAY:</span>
                    <span className="font-bold text-emerald-700">₹5,00,000 Cashless Active</span>
                  </div>
                </div>

                {/* Auto-Generated SOAP Summary */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
                    Auto-Generated Clinical Summary:
                  </span>
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2 max-h-60 overflow-y-auto">
                    {aiNotes.map((note, idx) => (
                      <p key={idx} className="leading-relaxed">
                        {note}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Prescription Action */}
              <div className="pt-3 border-t border-slate-100">
                <button
                  onClick={() => {
                    addPrescription({
                      patientId: 'pat-1',
                      patientName: 'Rahul Verma',
                      doctorId: user?.id || 'doc-1',
                      doctorName: targetDoctorOrPatient?.name || 'Dr. Priya Sharma',
                      doctorSpecialty: 'Internal Medicine',
                      hospitalName: 'AIIMS New Delhi',
                      date: new Date().toISOString().split('T')[0],
                      diagnosis: 'Acute Viral Pharyngitis (Resolving) + T2D / HTN Management',
                      medicines: [
                        { brandName: 'Augmentin 625 Duo', genericSalt: 'Amoxicillin + Clavulanic Acid 625mg (Jan Aushadhi JA-8491)', dosage: '625mg', frequency: '1-0-1 (5 days)', duration: '5 Days' },
                        { brandName: 'Calpol 650', genericSalt: 'Paracetamol 650mg', dosage: '650mg', frequency: 'SOS fever', duration: '3 Days' },
                        { brandName: 'Telma 40', genericSalt: 'Telmisartan 40mg (Generic)', dosage: '40mg', frequency: '1-0-0 Morning', duration: '90 Days' }
                      ],
                      instructions: 'Hydrate with warm fluids. Direct generic dispensation routed to nearest PM Jan Aushadhi Kendra.'
                    });
                    alert('e-Prescription issued successfully and synced to Patient ABHA Health Locker!');
                  }}
                  className="w-full py-2.5 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-98 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Issue e-Prescription & Sync ABHA</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: LAB REPORTS & SCANS */}
          {activeSideTab === 'labs' && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-5 space-y-3 text-slate-800 animate-in fade-in duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                  <span>Recent Diagnostic Lab Reports</span>
                </h3>
                <span className="text-xs text-slate-500 font-mono">6 Reports</span>
              </div>

              <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
                {samplePatientHistory.labReports.map((lab) => (
                  <div key={lab.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-bold text-slate-900">{lab.testName}</span>
                        <span className="text-[10px] text-slate-500 block">{lab.hospitalLab} • {lab.date}</span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {lab.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-200/80 mt-1 font-mono">
                      <span className="font-extrabold text-slate-900">{lab.value} {lab.unit}</span>
                      <span className="text-[10px] text-slate-500">Ref: {lab.referenceRange}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setIsHistoryModalOpen(true)}
                className="w-full py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span>View Full Lab Analytics & ECG</span>
              </button>
            </div>
          )}

        </div>

      </div>

      {/* COMPLETE PATIENT EHR DOSSIER MODAL */}
      <PatientCompleteHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        patient={samplePatientHistory}
        onImportToPrescription={(diagnosis) => {
          setAiNotes(prev => [...prev, `• Re-prescribing protocol initialized for prior condition: ${diagnosis}`]);
          setIsHistoryModalOpen(false);
          setActiveSideTab('scribe');
        }}
      />

    </div>
  );
};

