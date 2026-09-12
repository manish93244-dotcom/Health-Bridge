import React, { useState, useEffect, useRef } from 'react';
import {
  Bot,
  X,
  Send,
  Sparkles,
  RefreshCw,
  PhoneCall,
  Pill,
  Stethoscope,
  ShieldAlert,
  Mic,
  MicOff,
  User,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useHealthBridge } from '../../context/HealthBridgeContext';
import { askHealthAssistantAI } from '../../services/aiService';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tabId: string) => void;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    tab: string;
    icon: any;
  };
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const { aiInitialPrompt } = useHealthBridge();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: `Hello! I am your **HealthBridge AI Health Companion** powered by clinical guidance models.

I can help you:
• **Assess Symptoms & Triage** to determine if you need self-care, a clinic visit, or emergency care.
• **Find Generic Substitutes (Jan Aushadhi)** to save up to 85% on medicine costs.
• **Check Government Schemes (PM-JAY)** for ₹5 Lakh cashless hospital coverage.
• **Locate Live ICU Beds & Ambulances**.

How may I help you today?`,
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    { label: '🩺 Triage My Symptoms', query: 'I have a sore throat, mild dry cough, and 100.2 F temperature for 2 days. What should I do?' },
    { label: '💊 Jan Aushadhi Generic Finder', query: 'What is the generic equivalent and price difference for Augmentin 625 Duo?' },
    { label: '🛡️ Ayushman Bharat PM-JAY', query: 'How does Ayushman Bharat card work and who is eligible for the ₹5 Lakh cover?' },
    { label: '🚨 Sudden Chest Pain', query: 'Someone near me has sudden severe chest pressure and cold sweats. What immediate steps to take?' }
  ];

  // Auto-fill initial prompt if triggered from external buttons
  useEffect(() => {
    if (aiInitialPrompt && isOpen) {
      setInputText(aiInitialPrompt);
    }
  }, [aiInitialPrompt, isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.sender === 'user' ? ('user' as const) : ('assistant' as const),
        text: m.text
      }));

      const reply = await askHealthAssistantAI(text, history);

      let action: Message['suggestedAction'] | undefined = undefined;
      const lower = text.toLowerCase();
      if (lower.includes('chest') || lower.includes('emergency') || lower.includes('ambulance') || lower.includes('108')) {
        action = { label: 'Go to 24x7 Emergency SOS', tab: 'emergency', icon: PhoneCall };
      } else if (lower.includes('medicine') || lower.includes('generic') || lower.includes('aushadhi') || lower.includes('augmentin')) {
        action = { label: 'Explore Jan Aushadhi Medicines', tab: 'medicines', icon: Pill };
      } else if (lower.includes('doctor') || lower.includes('consult') || lower.includes('appointment')) {
        action = { label: 'Book Verified Doctor', tab: 'doctors', icon: Stethoscope };
      } else if (lower.includes('scheme') || lower.includes('pmjay') || lower.includes('ayushman')) {
        action = { label: 'Check PM-JAY Eligibility', tab: 'schemes', icon: ShieldCheck };
      } else if (lower.includes('symptom') || lower.includes('triage') || lower.includes('fever')) {
        action = { label: 'Launch Guided Symptom Navigator', tab: 'navigator', icon: Bot };
      }

      const assistantMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedAction: action
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: `msg-err-${Date.now()}`,
          sender: 'assistant',
          text: 'I apologize, but I encountered a temporary connection issue. Please check your symptoms in our **AI Navigator** tab or call **108** for emergencies.',
          timestamp: 'Just now'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition is not supported on this browser. Please type your query.');
      return;
    }
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN';

    if (!isListening) {
      setIsListening(true);
      recognition.start();
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
    } else {
      setIsListening(false);
      recognition.stop();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="bg-slate-900/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/15 w-full max-w-2xl h-[85vh] max-h-[720px] flex flex-col overflow-hidden text-slate-100"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-modal-title"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-900/90 via-slate-900 to-slate-950 px-5 py-4 flex items-center justify-between border-b border-white/10 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500/20 backdrop-blur-md flex items-center justify-center border border-teal-400/30">
              <Bot className="w-6 h-6 text-teal-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="ai-modal-title" className="font-bold text-base sm:text-lg tracking-tight text-white">
                  HealthBridge AI Assistant
                </h3>
                <span className="bg-teal-500/20 text-teal-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-teal-400/30 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-amber-400" /> Gemini 3.7
                </span>
              </div>
              <p className="text-xs text-slate-400">Triage, generic medicine savings & PM-JAY scheme guidance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Disclaimer Strip */}
        <div className="bg-amber-950/40 border-b border-amber-500/20 px-4 py-1.5 text-[11px] text-amber-200 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            AI guidance is educational. In medical emergencies, dial <strong>108</strong> immediately.
          </span>
          <button
            onClick={() => onNavigate('emergency')}
            className="font-bold text-red-400 hover:underline shrink-0 ml-2"
          >
            Emergency SOS →
          </button>
        </div>

        {/* Chat History Container */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-950/40">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start gap-2.5 ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs ${
                  msg.sender === 'user'
                    ? 'bg-teal-500 text-slate-950 font-bold'
                    : 'bg-white/10 text-teal-300 border border-white/10'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
              </div>

              <div className={`max-w-[82%] space-y-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                <div
                  className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-md backdrop-blur-md ${
                    msg.sender === 'user'
                      ? 'bg-teal-600/80 text-white rounded-tr-xs border border-teal-400/30'
                      : 'bg-white/5 text-slate-200 border border-white/10 rounded-tl-xs'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Suggested Action CTA */}
                {msg.suggestedAction && (
                  <button
                    onClick={() => {
                      onNavigate(msg.suggestedAction!.tab);
                      onClose();
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500/20 text-teal-200 border border-teal-400/30 hover:bg-teal-500/30 text-xs font-bold transition-all shadow-xs group"
                  >
                    <msg.suggestedAction.icon className="w-3.5 h-3.5 text-teal-400" />
                    <span>{msg.suggestedAction.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )}

                <span className="text-[10px] text-slate-500 block px-1">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-slate-400 text-xs py-2 px-3 bg-white/5 rounded-xl border border-white/10 max-w-[220px] backdrop-blur-md">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-teal-400" />
              <span>Analyzing clinical database...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts Carousel */}
        <div className="bg-slate-950/60 border-t border-white/10 px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[11px] text-slate-400 font-semibold uppercase shrink-0 pl-1">
            Suggested:
          </span>
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(qp.query)}
              className="text-xs px-2.5 py-1 rounded-full bg-white/5 hover:bg-teal-500/20 hover:text-teal-200 hover:border-teal-400/40 border border-white/10 text-slate-300 font-medium whitespace-nowrap transition-colors"
            >
              {qp.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-950/80 border-t border-white/10 flex items-center gap-2">
          <button
            type="button"
            onClick={toggleVoiceInput}
            className={`p-2.5 rounded-xl border transition-colors ${
              isListening
                ? 'bg-red-500 text-white border-red-600 animate-pulse'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border-white/10'
            }`}
            title={isListening ? 'Listening... click to stop' : 'Voice input'}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <input
            type="text"
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
            placeholder="Type your symptoms, medicine query, or question..."
            className="flex-1 bg-white/5 border border-white/10 focus:border-teal-400 focus:bg-white/10 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-slate-500 focus:outline-none transition-all"
          />

          <button
            type="button"
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isLoading}
            className="p-2.5 bg-teal-500 hover:bg-teal-400 disabled:opacity-40 text-slate-950 rounded-xl font-bold transition-all shadow-md flex items-center justify-center shrink-0 cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
