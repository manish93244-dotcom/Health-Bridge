import React, { useState } from 'react';
import { Mail, Phone, MapPin, Building, UserCheck, ShieldCheck, ExternalLink, Send, CheckCircle2 } from 'lucide-react';
import { useHealthBridge } from '../context/HealthBridgeContext';

export interface ContactPerson {
  id: string;
  name: string;
  designation: string;
  contactNo: string;
  intercomNo: string;
  department: string;
  location: string;
  email: string;
}

const contactMembers: ContactPerson[] = [
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
];

export const ContactUsPage: React.FC = () => {
  const { t } = useHealthBridge();
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryEmail, setInquiryEmail] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryEmail.trim() || !inquiryMsg.trim()) return;
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setInquiryName('');
      setInquiryEmail('');
      setInquiryMsg('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#070e1e] text-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="bg-gradient-to-r from-sky-600 via-sky-700 to-blue-700 rounded-3xl p-6 sm:p-8 border border-sky-400/40 shadow-xl relative overflow-hidden text-white">
          <div className="relative z-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30">
              <Building className="w-3.5 h-3.5 text-sky-200" />
              <span>{t.contact.badge}</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit',sans-serif]">
              {t.contact.title}
            </h1>
            <p className="text-sky-100 text-xs sm:text-sm leading-relaxed">
              {t.contact.sub}
            </p>
          </div>
        </div>

        {/* Main Content Layout with Social sidebar & 6 Cards */}
        <div className="relative flex flex-col lg:flex-row gap-6">
          
          {/* Side Floating Social Media Bar (Matching design) */}
          <div className="hidden lg:flex flex-col gap-2 sticky top-24 h-fit shrink-0">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
              title="Facebook"
            >
              <span className="font-extrabold text-lg">f</span>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#FF0000] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
              title="YouTube"
            >
              <span className="text-xs font-bold">▶</span>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#000000] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform cursor-pointer"
              title="X / Twitter"
            >
              <span className="font-bold text-sm">𝕏</span>
            </a>
          </div>

          {/* 6 Directory Cards Grid */}
          <div className="flex-1 space-y-4">
            {contactMembers.map((member) => (
                <div
                  key={member.id}
                  id={`contact-card-${member.id}`}
                  className="bg-white rounded-2xl p-5 sm:p-6 shadow-md hover:shadow-xl border border-slate-200/90 transition-all duration-200 text-slate-900 group min-h-[185px] flex flex-col justify-between w-full"
                >
                  {/* Top Row: Name and Designation Badge shifted together */}
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-4 pb-3 border-b border-slate-100 min-h-[38px]">
                    <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                      {member.name}
                    </h2>
                    <span className="inline-flex items-center px-3 py-1 rounded bg-[#134988] text-white text-[11px] sm:text-xs font-semibold tracking-wide shadow-xs">
                      {member.designation}
                    </span>
                  </div>

                  {/* Middle Row: 4 Metadata Columns (Contact No, Intercom No, Department, Location) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 flex-1">
                    <div>
                      <span className="block text-[11px] font-medium text-slate-500 mb-0.5">
                        Contact No.
                      </span>
                      <span className="text-sm sm:text-base font-bold text-slate-900">
                        {member.contactNo}
                      </span>
                    </div>

                    <div>
                      <span className="block text-[11px] font-medium text-slate-500 mb-0.5">
                        Intercom No.
                      </span>
                      <span className="text-sm sm:text-base font-bold text-slate-900">
                        {member.intercomNo}
                      </span>
                    </div>

                    <div>
                      <span className="block text-[11px] font-medium text-slate-500 mb-0.5">
                        Department
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                        {member.department}
                      </span>
                    </div>

                    <div>
                      <span className="block text-[11px] font-medium text-slate-500 mb-0.5">
                        Location
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-slate-900">
                        {member.location}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Row: Email Id and Direct Link */}
                  <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-auto">
                    <div>
                      <span className="block text-[11px] font-medium text-slate-500">
                        Email Id
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
        </div>

        {/* Quick Send Message / Help Desk Form */}
        <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-4 text-center mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white font-['Outfit',sans-serif]">
              Send an Official Inquiry or Feedback
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Have questions regarding HealthBridge architecture, hospital integrations, or research collaboration? Reach out directly.
            </p>
          </div>

          {inquirySent ? (
            <div className="max-w-xl mx-auto bg-emerald-500/20 border border-emerald-400/40 rounded-2xl p-6 text-center space-y-2 animate-in fade-in">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="text-base font-bold text-white">Inquiry Received Successfully</h4>
              <p className="text-xs text-emerald-200">
                Thank you. The Department of Mathematics & Computing team at MITS-GWL will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="max-w-xl mx-auto space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rajesh Sharma"
                    value={inquiryName}
                    onChange={e => setInquiryName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={inquiryEmail}
                    onChange={e => setInquiryEmail(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Message / Project Inquiry</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your inquiry, grievance, or research collaboration requirement..."
                  value={inquiryMsg}
                  onChange={e => setInquiryMsg(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-teal-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-500 text-white py-3 rounded-xl font-bold text-sm shadow-lg shadow-teal-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry to Team</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
