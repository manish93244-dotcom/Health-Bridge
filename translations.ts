export type SupportedLanguage = 'en' | 'hi';

export interface Translations {
  emergencyBanner: {
    gridTitle: string;
    nationalAmbulance: string;
    maternalChild: string;
    pmjayHelpline: string;
    launchSos: string;
    viewLiveTrack: string;
    activeSosText: string;
    languageSelect: string;
  };
  nav: {
    home: string;
    navigator: string;
    doctors: string;
    hospitals: string;
    medicines: string;
    schemes: string;
    contact: string;
    signIn: string;
    patientProfile: string;
    doctorWorkspace: string;
    pharmacyKendra: string;
    adminDashboard: string;
    sosBadge: string;
    askAi: string;
  };
  landing: {
    badge: string;
    heroTitle1: string;
    heroTitle2: string;
    heroTitle3: string;
    heroSubtitle: string;
    searchPlaceholder: string;
    searchButton: string;
    statJanAushadhi: string;
    statJanAushadhiSub: string;
    statPmjay: string;
    statPmjaySub: string;
    statDoctors: string;
    statDoctorsSub: string;
    statEmergency: string;
    statEmergencySub: string;
    portalGatewayTitle: string;
    portalGatewayHeading: string;
    portalGatewaySub: string;
    quickActionSymptom: string;
    quickActionSymptomTag: string;
    quickActionSymptomSub: string;
    quickActionSymptomBtn: string;
    quickActionTelehealth: string;
    quickActionTelehealthTag: string;
    quickActionTelehealthSub: string;
    quickActionTelehealthBtn: string;
    quickActionMedicines: string;
    quickActionMedicinesTag: string;
    quickActionMedicinesSub: string;
    quickActionMedicinesBtn: string;
    quickActionBeds: string;
    quickActionBedsTag: string;
    quickActionBedsSub: string;
    quickActionBedsBtn: string;
    quickActionSchemes: string;
    quickActionSchemesTag: string;
    quickActionSchemesSub: string;
    quickActionSchemesBtn: string;
    quickActionEmergency: string;
    quickActionEmergencyTag: string;
    quickActionEmergencySub: string;
    quickActionEmergencyBtn: string;
    featuredDoctorsTitle: string;
    featuredDoctorsBadge: string;
    viewAllDoctors: string;
    dawaDostBadge: string;
    dawaDostTitle: string;
    dawaDostSub: string;
    dawaDostBtn: string;
    dawaDostExampleTitle: string;
    dawaDostBrandLabel: string;
    dawaDostGenericLabel: string;
    dawaDostSaveLabel: string;
    dawaDostGovtNote: string;
    contactBadge: string;
    contactTitle: string;
    contactSub: string;
    contactBtn: string;
    contactNoLabel: string;
    intercomNoLabel: string;
    deptLabel: string;
    locLabel: string;
    emailLabel: string;
  };
  doctors: {
    badge: string;
    title: string;
    sub: string;
    pmjayPill: string;
    searchPlaceholder: string;
    filterSpecialty: string;
    onlyPmjay: string;
    onlyTelehealth: string;
    allSpecialties: string;
    bookAppointment: string;
    videoConsult: string;
    experience: string;
    consultFee: string;
    freePmjay: string;
    verifiedDoctor: string;
    languagesSpoken: string;
    availableToday: string;
    nextSlot: string;
    noResults: string;
  };
  hospitals: {
    badge: string;
    title: string;
    sub: string;
    emergencyAmbulanceBtn: string;
    metricIcu: string;
    metricVentilator: string;
    metricGeneral: string;
    searchPlaceholder: string;
    allTypes: string;
    onlyIcu: string;
    onlyPmjay: string;
    totalBeds: string;
    icuAvailable: string;
    oxygenAvailable: string;
    bloodBank: string;
    callHospital: string;
    directions: string;
    pmjayEmpanelled: string;
  };
  medicines: {
    badge: string;
    title: string;
    sub: string;
    scanPrescriptionBtn: string;
    closeScannerBtn: string;
    searchPlaceholder: string;
    allCategories: string;
    brandName: string;
    genericSalt: string;
    janAushadhiPrice: string;
    marketPrice: string;
    savings: string;
    findKendra: string;
    saveMedicine: string;
    scannerTitle: string;
    scannerSub: string;
    pastePrescription: string;
    analyzeBtn: string;
  };
  schemes: {
    badge: string;
    title: string;
    sub: string;
    eligibilityTitle: string;
    checkEligibilityBtn: string;
    coverageAmount: string;
    beneficiaries: string;
    documentsRequired: string;
    howToApply: string;
    pmjayCardDownload: string;
  };
  emergency: {
    badge: string;
    title: string;
    sub: string;
    sosButtonText: string;
    dispatchAmbulanceNow: string;
    dial108Direct: string;
    trackingAmbulance: string;
    driverName: string;
    etaMinutes: string;
    ambulanceNo: string;
    patientVitals: string;
    nearestHospital: string;
    cancelSos: string;
  };
  navigator: {
    badge: string;
    title: string;
    sub: string;
    inputPlaceholder: string;
    analyzeBtn: string;
    suggestedQueries: string;
    triageLevel: string;
    recommendedDoctor: string;
    emergencyWarning: string;
  };
  contact: {
    badge: string;
    title: string;
    sub: string;
    deptName: string;
    instituteName: string;
    emergencyHotline: string;
    openDirectory: string;
  };
}

export const TRANSLATIONS: Record<SupportedLanguage, Translations> = {
  en: {
    emergencyBanner: {
      gridTitle: '24x7 National Emergency Grid',
      nationalAmbulance: 'National Ambulance',
      maternalChild: 'Maternal & Child SOS',
      pmjayHelpline: 'PM-JAY Helpline',
      launchSos: 'Launch SOS Dispatch',
      viewLiveTrack: 'View Live Dispatch Track',
      activeSosText: 'ACTIVE SOS',
      languageSelect: 'Language'
    },
    nav: {
      home: 'Home',
      navigator: 'AI Navigator',
      doctors: 'Find Doctors',
      hospitals: 'Hospitals & Beds',
      medicines: 'Medicines',
      schemes: 'Govt Schemes',
      contact: 'Contact Us',
      signIn: 'Sign In',
      patientProfile: 'Patient Profile',
      doctorWorkspace: 'Doctor Workspace',
      pharmacyKendra: 'Jan Aushadhi Kendra',
      adminDashboard: 'Health Mission Admin',
      sosBadge: 'Emergency SOS 108',
      askAi: 'AI Health Assistant'
    },
    landing: {
      badge: 'National Digital Health & Emergency Infrastructure',
      heroTitle1: 'Right Care.',
      heroTitle2: 'Right Time.',
      heroTitle3: 'Right for You.',
      heroSubtitle: 'Connecting citizens to verified doctors, live hospital ICU beds, 80% cheaper Jan Aushadhi generic medicines, and Ayushman Bharat PM-JAY cashless benefits with AI symptom triage.',
      searchPlaceholder: 'Search hospitals, doctors, Jan Aushadhi generic salts, or enter city/pincode...',
      searchButton: 'Find Healthcare',
      statJanAushadhi: '14,200+ Jan Aushadhi Kendras',
      statJanAushadhiSub: 'Up to 90% medicine savings',
      statPmjay: '28,400+ Empanelled Hospitals',
      statPmjaySub: '₹5 Lakh cashless cover per family',
      statDoctors: '50,000+ Verified Doctors',
      statDoctorsSub: 'Instant video & in-person appointments',
      statEmergency: '4.2 min Emergency Response',
      statEmergencySub: 'Nationwide 108 GPS-tracked fleet',
      portalGatewayTitle: 'Citizen Healthcare Gateway',
      portalGatewayHeading: 'Complete Healthcare in One Unified Platform',
      portalGatewaySub: 'Seamlessly transition from symptoms to verified diagnosis, affordable generic prescriptions, and hospital bed admissions.',
      quickActionSymptom: 'AI Symptom Navigator',
      quickActionSymptomTag: 'AI Triage',
      quickActionSymptomSub: 'Enter your symptoms to receive an instant clinical triage evaluation, risk level, specialist recommendation, and safe home care advice.',
      quickActionSymptomBtn: 'Start Symptom Triage',
      quickActionTelehealth: 'Verified Doctors & Telehealth',
      quickActionTelehealthTag: 'Video / In-Clinic',
      quickActionTelehealthSub: 'Consult with verified cardiologists, neurologists, physicians, and pediatricians. Cashless under Ayushman Bharat or standard fee.',
      quickActionTelehealthBtn: 'Book Appointment Slot',
      quickActionMedicines: 'Jan Aushadhi Generic Search',
      quickActionMedicinesTag: 'Save 50-90%',
      quickActionMedicinesSub: 'Compare brand medicines with WHO-GMP certified generic alternatives. Locate over 14,200 Jan Aushadhi Kendras with live stock.',
      quickActionMedicinesBtn: 'Compare Medicine Prices',
      quickActionBeds: 'Live ICU & Hospital Beds',
      quickActionBedsTag: 'Real-time Grid',
      quickActionBedsSub: 'Check live ICU, ventilator, and oxygen bed vacancy across public and private empanelled hospitals before emergency transit.',
      quickActionBedsBtn: 'View Live Bed Grid',
      quickActionSchemes: 'Ayushman Bharat PM-JAY',
      quickActionSchemesTag: '₹5 Lakh Cover',
      quickActionSchemesSub: 'Check eligibility for central & state health protection schemes. Learn required documents and get step-by-step claim assistance.',
      quickActionSchemesBtn: 'Calculate Scheme Benefits',
      quickActionEmergency: '24x7 Emergency SOS Dispatch',
      quickActionEmergencyTag: 'Dial 108',
      quickActionEmergencySub: 'One-touch ambulance dispatch with real-time GPS tracking, trauma hospital pre-notification, and live blood bank inventory.',
      quickActionEmergencyBtn: 'Launch Emergency Track',
      featuredDoctorsTitle: 'Top Rated Doctors Available for Tele-Consultation Today',
      featuredDoctorsBadge: 'Verified Specialists',
      viewAllDoctors: 'View All Doctors',
      dawaDostBadge: 'Dawa Dost - Jan Aushadhi Initiative',
      dawaDostTitle: 'Stop Overpaying for Branded Medicines. Save up to 85% with Generic Salts.',
      dawaDostSub: 'Same chemical active ingredients, same clinical efficacy, certified by WHO-GMP laboratories at a fraction of branded marketing markups.',
      dawaDostBtn: 'Search Your Brand Prescription',
      dawaDostExampleTitle: 'Live Real-World Price Example',
      dawaDostBrandLabel: 'Branded (10 Tabs)',
      dawaDostGenericLabel: 'Jan Aushadhi Generic',
      dawaDostSaveLabel: 'Save 74%',
      dawaDostGovtNote: '*Approved by Department of Pharmaceuticals, Govt of India',
      contactBadge: 'Institutional Research & Support Directory',
      contactTitle: 'Contact Us & Team Directory',
      contactSub: 'Department of Mathematics & Computing, Madhav Institute of Technology & Science (MITS-GWL)',
      contactBtn: 'Open Full Institutional Directory',
      contactNoLabel: 'Contact No.',
      intercomNoLabel: 'Intercom No.',
      deptLabel: 'Department',
      locLabel: 'Location',
      emailLabel: 'Email Id'
    },
    doctors: {
      badge: 'Verified Practitioner Network',
      title: 'Find Verified Doctors & Telehealth Consultations',
      sub: 'Book in-person visits or connect to live video consult rooms with PM-JAY cashless benefits.',
      pmjayPill: 'Ayushman PM-JAY: ₹0 Consultations Available',
      searchPlaceholder: 'Search by doctor name, specialty, or hospital...',
      filterSpecialty: 'Specialty',
      onlyPmjay: 'PM-JAY Cashless Only',
      onlyTelehealth: 'Instant Video Telehealth Only',
      allSpecialties: 'All Specialties',
      bookAppointment: 'Book In-Clinic Slot',
      videoConsult: 'Start Video Consult',
      experience: 'Experience',
      consultFee: 'Fee',
      freePmjay: 'FREE under PM-JAY',
      verifiedDoctor: 'ABDM Verified Practitioner',
      languagesSpoken: 'Languages',
      availableToday: 'Available Today',
      nextSlot: 'Next Slot',
      noResults: 'No doctors matched your criteria. Try resetting filters.'
    },
    hospitals: {
      badge: 'District Bed Availability Network',
      title: 'Live Hospital ICU & Bed Availability Tracker',
      sub: 'Real-time occupancy updates across public and private empanelled hospitals with verified oxygen and blood bank inventory.',
      emergencyAmbulanceBtn: 'Emergency Ambulance 108',
      metricIcu: 'District ICU Beds Available',
      metricVentilator: 'Ventilator Units Ready',
      metricGeneral: 'General Oxygen Beds Ready',
      searchPlaceholder: 'Search hospital name, area, department, or city...',
      allTypes: 'All Facility Types',
      onlyIcu: 'Has Available ICU Beds',
      onlyPmjay: 'PM-JAY Empanelled Only',
      totalBeds: 'Total Beds',
      icuAvailable: 'ICU Beds Vacant',
      oxygenAvailable: 'Oxygen Available',
      bloodBank: 'Blood Units in Bank',
      callHospital: 'Call Facility',
      directions: 'Get Directions',
      pmjayEmpanelled: 'PM-JAY Empanelled'
    },
    medicines: {
      badge: 'Pradhan Mantri Bhartiya Janaushadhi Pariyojana',
      title: 'Jan Aushadhi Generic Medicine & Price Comparison',
      sub: 'Search expensive branded medicines to find identical WHO-GMP certified generic formulations available at Jan Aushadhi Kendras with 50% to 90% savings.',
      scanPrescriptionBtn: 'Scan Prescription for Generic Substitutes',
      closeScannerBtn: 'Close Prescription Scanner',
      searchPlaceholder: 'Enter brand name (e.g., Augmentin, Lipitor, Pan-D) or generic salt...',
      allCategories: 'All Categories',
      brandName: 'Branded Drug',
      genericSalt: 'Jan Aushadhi Salt Equivalent',
      janAushadhiPrice: 'Jan Aushadhi Price',
      marketPrice: 'Branded MRP',
      savings: 'Direct Citizen Savings',
      findKendra: 'Find Nearest Kendra',
      saveMedicine: 'Save to Medicine Cabinet',
      scannerTitle: 'AI Prescription Generic Substitute Scanner',
      scannerSub: 'Upload or paste prescription text to discover Jan Aushadhi generic salts instantly.',
      pastePrescription: 'Paste prescription text or doctor notes here...',
      analyzeBtn: 'Analyze Generic Substitutes'
    },
    schemes: {
      badge: 'Ministry of Health & Family Welfare (MoHFW)',
      title: 'Government Health Schemes & PM-JAY Benefits',
      sub: 'Explore cashless healthcare schemes, calculate your family eligibility, download PM-JAY Golden Card, and find empanelled hospitals.',
      eligibilityTitle: 'PM-JAY Cashless Eligibility Calculator',
      checkEligibilityBtn: 'Check Instant Eligibility',
      coverageAmount: '₹5,00,000 Cashless Cover Per Family / Year',
      beneficiaries: 'Over 55 Crore Citizens Eligible Nationwide',
      documentsRequired: 'Aadhaar Card, Ration Card, or PM-JAY Letter',
      howToApply: 'Step-by-Step Claim & E-Card Process',
      pmjayCardDownload: 'Download AB-PMJAY Golden Card'
    },
    emergency: {
      badge: 'National Emergency Response System (NERS)',
      title: '108 Emergency Ambulance & Critical SOS Dispatch',
      sub: 'Instant GPS-tracked ambulance dispatch with direct telemetry to nearest trauma center and on-call ER physician.',
      sosButtonText: 'LAUNCH EMERGENCY 108 SOS',
      dispatchAmbulanceNow: 'Dispatch Nearest Ambulance Immediately',
      dial108Direct: 'Direct Dial 108 Emergency Hotline',
      trackingAmbulance: 'Live Ambulance GPS Tracking',
      driverName: 'Assigned Driver',
      etaMinutes: 'Estimated Arrival Time',
      ambulanceNo: 'Vehicle Registration',
      patientVitals: 'Real-Time Vitals Stream to Hospital',
      nearestHospital: 'Destination Trauma Center',
      cancelSos: 'Cancel Emergency Dispatch'
    },
    navigator: {
      badge: 'AI Clinical Triage & Symptom Assessment',
      title: 'AI Health Navigator & Symptom Checker',
      sub: 'Describe your symptoms in English or Hindi to receive an instant medical assessment, specialty guidance, and home care protocols.',
      inputPlaceholder: 'Describe your symptoms (e.g., "High fever with chills and dry cough for 3 days")...',
      analyzeBtn: 'Run AI Symptom Analysis',
      suggestedQueries: 'Quick Symptom Prompts',
      triageLevel: 'Clinical Urgency Level',
      recommendedDoctor: 'Recommended Specialist',
      emergencyWarning: 'If experiencing chest pain, severe breathlessness, or stroke symptoms, launch 108 SOS immediately.'
    },
    contact: {
      badge: 'Institutional Research & Support Directory',
      title: 'Contact Us & Departmental Directory',
      sub: 'Department of Mathematics & Computing, Madhav Institute of Technology & Science (MITS-GWL)',
      deptName: 'Department of Mathematics & Computing',
      instituteName: 'Madhav Institute of Technology & Science (MITS Gwalior)',
      emergencyHotline: 'Emergency Direct Line: +91 6200488260',
      openDirectory: 'View Complete Faculty & Technical Team Directory'
    }
  },
  hi: {
    emergencyBanner: {
      gridTitle: '24x7 राष्ट्रीय आपातकालीन ग्रिड',
      nationalAmbulance: 'राष्ट्रीय एम्बुलेंस',
      maternalChild: 'मातृ एवं शिशु SOS',
      pmjayHelpline: 'आयुष्मान हेल्पलाइन',
      launchSos: 'आपातकालीन SOS शुरू करें',
      viewLiveTrack: 'लाइव एम्बुलेंस ट्रैक देखें',
      activeSosText: 'सक्रिय आपातकाल (SOS)',
      languageSelect: 'भाषा'
    },
    nav: {
      home: 'होम',
      navigator: 'AI स्वास्थ्य सहायक',
      doctors: 'डॉक्टर खोजें',
      hospitals: 'अस्पताल और बेड',
      medicines: 'सस्ती दवाएं',
      schemes: 'सरकारी योजनाएं',
      contact: 'संपर्क करें',
      signIn: 'साइन इन',
      patientProfile: 'रोगी प्रोफ़ाइल',
      doctorWorkspace: 'डॉक्टर वर्कस्पेस',
      pharmacyKendra: 'जन औषधि केंद्र',
      adminDashboard: 'स्वास्थ्य मिशन एडमिन',
      sosBadge: 'आपातकालीन SOS 108',
      askAi: 'AI स्वास्थ्य सहायक'
    },
    landing: {
      badge: 'राष्ट्रीय डिजिटल स्वास्थ्य एवं आपातकालीन नेटवर्क',
      heroTitle1: 'सही इलाज।',
      heroTitle2: 'सही समय पर।',
      heroTitle3: 'आपके अपने लिए।',
      heroSubtitle: 'सत्यापित डॉक्टरों, लाइव अस्पताल आईसीयू बेड, 80% तक सस्ती जन औषधि जेनेरिक दवाओं और आयुष्मान भारत पीएम-जय (PM-JAY) कैशलेस लाभों से तुरंत जुड़ें।',
      searchPlaceholder: 'अस्पताल, डॉक्टर, जन औषधि दवा या शहर/पिनकोड खोजें...',
      searchButton: 'स्वास्थ्य सेवा खोजें',
      statJanAushadhi: '14,200+ जन औषधि केंद्र',
      statJanAushadhiSub: 'दवाओं पर 90% तक की भारी बचत',
      statPmjay: '28,400+ संबद्ध अस्पताल',
      statPmjaySub: 'प्रति परिवार ₹5 लाख तक का कैशलेस इलाज',
      statDoctors: '50,000+ सत्यापित डॉक्टर',
      statDoctorsSub: 'त्वरित वीडियो कॉल व क्लिनिक परामर्श',
      statEmergency: '4.2 मिनट त्वरित प्रतिक्रिया',
      statEmergencySub: 'देशव्यापी 108 जीपीएस-ट्रैक्ड एम्बुलेंस',
      portalGatewayTitle: 'नागरिक स्वास्थ्य सेवा प्रवेशद्वार',
      portalGatewayHeading: 'संपूर्ण स्वास्थ्य सेवाएं एक ही एकीकृत मंच पर',
      portalGatewaySub: 'लक्षणों की पहचान से लेकर सटीक निदान, सस्ती जेनेरिक दवाएं और अस्पताल में बेड उपलब्धता तक सब कुछ एक जगह।',
      quickActionSymptom: 'AI लक्षण जांच (Symptom Navigator)',
      quickActionSymptomTag: 'AI ट्राइएज',
      quickActionSymptomSub: 'अपने लक्षण दर्ज करें और त्वरित चिकित्सकीय मूल्यांकन, जोखिम स्तर, उपयुक्त विशेषज्ञ और सुरक्षित घरेलू देखभाल परामर्श पाएं।',
      quickActionSymptomBtn: 'लक्षण जांच शुरू करें',
      quickActionTelehealth: 'सत्यापित डॉक्टर और टेलीहेल्थ',
      quickActionTelehealthTag: 'वीडियो / क्लिनिक',
      quickActionTelehealthSub: 'हृदय रोग, तंत्रिका रोग, बाल रोग एवं सामान्य विशेषज्ञों से परामर्श करें। आयुष्मान भारत के तहत पूर्णतः कैशलेस।',
      quickActionTelehealthBtn: 'अपॉइंटमेंट स्लॉट बुक करें',
      quickActionMedicines: 'जन औषधि जेनेरिक दवा खोज',
      quickActionMedicinesTag: '50-90% बचत',
      quickActionMedicinesSub: 'महंगी ब्रांडेड दवाओं की तुलना WHO-GMP प्रमाणित जेनेरिक दवाओं से करें। 14,200+ जन औषधि केंद्रों पर लाइव स्टॉक देखें।',
      quickActionMedicinesBtn: 'दवाओं की कीमतों की तुलना करें',
      quickActionBeds: 'लाइव आईसीयू एवं अस्पताल बेड',
      quickActionBedsTag: 'वास्तविक समय ग्रिड',
      quickActionBedsSub: 'आपातकालीन स्थिति में जाने से पहले सरकारी व निजी संबद्ध अस्पतालों में खाली आईसीयू, वेंटिलेटर और ऑक्सीजन बेड देखें।',
      quickActionBedsBtn: 'लाइव बेड उपलब्धता देखें',
      quickActionSchemes: 'आयुष्मान भारत पीएम-जय (PM-JAY)',
      quickActionSchemesTag: '₹5 लाख सुरक्षा',
      quickActionSchemesSub: 'सरकारी स्वास्थ्य योजनाओं में अपनी पात्रता जांचें, आवश्यक दस्तावेज जानें और चरणबद्ध क्लेम सहायता प्राप्त करें।',
      quickActionSchemesBtn: 'योजना लाभ और पात्रता जांचें',
      quickActionEmergency: '24x7 आपातकालीन SOS एम्बुलेंस',
      quickActionEmergencyTag: 'डायल 108',
      quickActionEmergencySub: 'लाइव जीपीएस ट्रैकिंग, नजदीकी ट्रॉमा सेंटर अलर्ट और ऑन-कॉल इमरजेंसी डॉक्टर के साथ त्वरित 108 एम्बुलेंस सेवा।',
      quickActionEmergencyBtn: 'आपातकालीन ट्रैक शुरू करें',
      featuredDoctorsTitle: 'आज टेली-परामर्श के लिए उपलब्ध शीर्ष रेटेड विशेषज्ञ डॉक्टर',
      featuredDoctorsBadge: 'सत्यापित विशेषज्ञ',
      viewAllDoctors: 'सभी डॉक्टर देखें',
      dawaDostBadge: 'दवा दोस्त - जन औषधि पहल',
      dawaDostTitle: 'ब्रांडेड दवाओं पर अधिक खर्च बंद करें। जेनेरिक साल्ट से 85% तक बचाएं।',
      dawaDostSub: 'समान रासायनिक फॉर्मूलेशन, समान चिकित्सीय प्रभावकारिता, भारत सरकार द्वारा प्रमाणित भारी बचत के साथ।',
      dawaDostBtn: 'अपनी ब्रांडेड दवा खोजें',
      dawaDostExampleTitle: 'वास्तविक मूल्य तुलना का उदाहरण',
      dawaDostBrandLabel: 'ब्रांडेड दवा (10 टैबलेट)',
      dawaDostGenericLabel: 'जन औषधि जेनेरिक साल्ट',
      dawaDostSaveLabel: '74% की बचत',
      dawaDostGovtNote: '*औषध विभाग, रसायन एवं उर्वरक मंत्रालय, भारत सरकार द्वारा प्रमाणित',
      contactBadge: 'संस्थागत अनुसंधान एवं सहायता निर्देशिका',
      contactTitle: 'हमसे संपर्क करें एवं टीम निर्देशिका',
      contactSub: 'गणित एवं कंप्यूटिंग विभाग, माधव इंस्टीट्यूट ऑफ टेक्नोलॉजी एंड साइंस (MITS-GWL)',
      contactBtn: 'संपूर्ण संस्थागत निर्देशिका खोलें',
      contactNoLabel: 'संपर्क नंबर',
      intercomNoLabel: 'इंटरकॉम नंबर',
      deptLabel: 'विभाग',
      locLabel: 'स्थान',
      emailLabel: 'ईमेल आईडी'
    },
    doctors: {
      badge: 'सत्यापित चिकित्सक नेटवर्क',
      title: 'सत्यापित डॉक्टर खोजें और टेलीहेल्थ परामर्श लें',
      sub: 'क्लिनिक में अपॉइंटमेंट बुक करें या आयुष्मान भारत के तहत मुफ्त वीडियो कॉल परामर्श से तुरंत जुड़ें।',
      pmjayPill: 'आयुष्मान भारत PM-JAY: ₹0 में परामर्श उपलब्ध',
      searchPlaceholder: 'डॉक्टर का नाम, विशेषता या अस्पताल खोजें...',
      filterSpecialty: 'विशेषज्ञता',
      onlyPmjay: 'केवल PM-JAY कैशलेस',
      onlyTelehealth: 'केवल त्वरित वीडियो परामर्श',
      allSpecialties: 'सभी विशेषज्ञताएं',
      bookAppointment: 'क्लिनिक अपॉइंटमेंट बुक करें',
      videoConsult: 'वीडियो परामर्श शुरू करें',
      experience: 'अनुभव',
      consultFee: 'परामर्श शुल्क',
      freePmjay: 'PM-JAY के तहत पूर्णतः निःशुल्क',
      verifiedDoctor: 'ABDM सत्यापित डॉक्टर',
      languagesSpoken: 'भाषाएं',
      availableToday: 'आज उपलब्ध',
      nextSlot: 'अगला स्लॉट',
      noResults: 'आपके खोज मानदंडों से मेल खाने वाला कोई डॉक्टर नहीं मिला। कृपया फ़िल्टर बदलें।'
    },
    hospitals: {
      badge: 'जिला स्तरीय बेड उपलब्धता नेटवर्क',
      title: 'लाइव अस्पताल आईसीयू एवं बेड उपलब्धता ट्रैकर',
      sub: 'सरकारी और निजी संबद्ध अस्पतालों में वास्तविक समय में आईसीयू, वेंटिलेटर, ऑक्सीजन और ब्लड बैंक की उपलब्धता।',
      emergencyAmbulanceBtn: 'आपातकालीन एम्बुलेंस 108',
      metricIcu: 'जिले में उपलब्ध कुल आईसीयू बेड',
      metricVentilator: 'सक्रिय वेंटिलेटर यूनिट',
      metricGeneral: 'उपलब्ध सामान्य ऑक्सीजन बेड',
      searchPlaceholder: 'अस्पताल का नाम, क्षेत्र, विभाग या शहर खोजें...',
      allTypes: 'सभी अस्पताल प्रकार',
      onlyIcu: 'केवल खाली आईसीयू बेड वाले',
      onlyPmjay: 'केवल PM-JAY संबद्ध अस्पताल',
      totalBeds: 'कुल बेड',
      icuAvailable: 'खाली आईसीयू बेड',
      oxygenAvailable: 'ऑक्सीजन सुविधा',
      bloodBank: 'ब्लड बैंक यूनिट',
      callHospital: 'अस्पताल को कॉल करें',
      directions: 'दिशा-निर्देश (Directions)',
      pmjayEmpanelled: 'PM-JAY संबद्ध अस्पताल'
    },
    medicines: {
      badge: 'प्रधानमंत्री भारतीय जनऔषधि परियोजना',
      title: 'जन औषधि जेनेरिक दवाएं एवं मूल्य तुलना',
      sub: 'ब्रांडेड दवाओं की तुलना में 50% से 90% तक कम कीमत पर समान WHO-GMP प्रमाणित जेनेरिक साल्ट खोजें।',
      scanPrescriptionBtn: 'प्रिस्क्रिप्शन स्कैन कर सस्ती दवा खोजें',
      closeScannerBtn: 'प्रिस्क्रिप्शन स्कैनर बंद करें',
      searchPlaceholder: 'ब्रांड नाम (जैसे Augmentin, Lipitor, Pan-D) या जेनेरिक साल्ट लिखें...',
      allCategories: 'सभी श्रेणियां',
      brandName: 'ब्रांडेड दवा',
      genericSalt: 'जन औषधि जेनेरिक साल्ट',
      janAushadhiPrice: 'जन औषधि मूल्य',
      marketPrice: 'बाजार एमआरपी (MRP)',
      savings: 'नागरिकों की सीधी बचत',
      findKendra: 'निकटतम केंद्र खोजें',
      saveMedicine: 'दवा कैबिनेट में सहेजें',
      scannerTitle: 'AI प्रिस्क्रिप्शन जेनेरिक विकल्प विश्लेषक',
      scannerSub: 'डॉक्टर का पर्चा या दवा का नाम डालें और तुरंत जन औषधि जेनेरिक साल्ट खोजें।',
      pastePrescription: 'यहाँ प्रिस्क्रिप्शन का टेक्स्ट या दवा का नाम लिखें...',
      analyzeBtn: 'जेनेरिक विकल्पों का विश्लेषण करें'
    },
    schemes: {
      badge: 'स्वास्थ्य एवं परिवार कल्याण मंत्रालय (MoHFW)',
      title: 'सरकारी स्वास्थ्य योजनाएं एवं आयुष्मान भारत लाभ',
      sub: 'कैशलेस स्वास्थ्य योजनाओं की जानकारी लें, परिवार की पात्रता जांचें और PM-JAY गोल्डन कार्ड डाउनलोड करें।',
      eligibilityTitle: 'PM-JAY कैशलेस पात्रता कैलकुलेटर',
      checkEligibilityBtn: 'तुरंत पात्रता जांचें',
      coverageAmount: 'प्रति परिवार प्रति वर्ष ₹5,00,000 का मुफ्त इलाज',
      beneficiaries: 'देश भर में 55 करोड़ से अधिक नागरिक पात्र',
      documentsRequired: 'आधार कार्ड, राशन कार्ड या PM-JAY पत्र',
      howToApply: 'कार्ड बनवाने व क्लेम की चरणबद्ध प्रक्रिया',
      pmjayCardDownload: 'AB-PMJAY गोल्डन कार्ड डाउनलोड करें'
    },
    emergency: {
      badge: 'राष्ट्रीय आपातकालीन प्रतिक्रिया प्रणाली (NERS)',
      title: '108 आपातकालीन एम्बुलेंस एवं त्वरित SOS सेवा',
      sub: 'लाइव जीपीएस ट्रैक्ड 108 एम्बुलेंस सहायता, नजदीकी ट्रॉमा सेंटर रूटिंग और ऑन-कॉल इमरजेंसी डॉक्टर संपर्क।',
      sosButtonText: 'आपातकालीन 108 SOS शुरू करें',
      dispatchAmbulanceNow: 'तुरंत नजदीकी एम्बुलेंस भेजें',
      dial108Direct: '108 हेल्पलाइन पर सीधे कॉल करें',
      trackingAmbulance: 'लाइव एम्बुलेंस जीपीएस ट्रैकिंग',
      driverName: 'नियुक्त चालक',
      etaMinutes: 'अनुमानित आगमन समय',
      ambulanceNo: 'वाहन पंजीकरण संख्या',
      patientVitals: 'अस्पताल को लाइव वाइटल्स प्रसारण',
      nearestHospital: 'गंतव्य ट्रॉमा सेंटर',
      cancelSos: 'आपातकालीन अनुरोध रद्द करें'
    },
    navigator: {
      badge: 'AI क्लिनिकल ट्राइएज एवं लक्षण मूल्यांकन',
      title: 'AI स्वास्थ्य सहायक एवं लक्षण जांच',
      sub: 'अपने लक्षण हिंदी या अंग्रेजी में बताएं और त्वरित स्वास्थ्य मूल्यांकन, सही डॉक्टर की सलाह व प्राथमिक उपचार पाएं।',
      inputPlaceholder: 'अपने लक्षण बताएं (उदा. "3 दिन से तेज बुखार, ठंड लगना और सूखी खांसी")...',
      analyzeBtn: 'AI लक्षण विश्लेषण करें',
      suggestedQueries: 'त्वरित लक्षण संकेत',
      triageLevel: 'चिकित्सकीय गंभीरता स्तर',
      recommendedDoctor: 'अनुशंसित विशेषज्ञ डॉक्टर',
      emergencyWarning: 'यदि सीने में दर्द, सांस लेने में गंभीर कठिनाई या स्ट्रोक के लक्षण हों, तो तुरंत 108 SOS पर संपर्क करें।'
    },
    contact: {
      badge: 'संस्थागत अनुसंधान एवं सहायता निर्देशिका',
      title: 'हमसे संपर्क करें एवं विभागीय निर्देशिका',
      sub: 'गणित एवं कंप्यूटिंग विभाग, माधव इंस्टीट्यूट ऑफ टेक्नोलॉजी एंड साइंस (MITS-GWL)',
      deptName: 'गणित एवं कंप्यूटिंग विभाग',
      instituteName: 'माधव इंस्टीट्यूट ऑफ टेक्नोलॉजी एंड साइंस (MITS ग्वालियर)',
      emergencyHotline: 'आपातकालीन डायरेक्ट लाइन: +91 6200488260',
      openDirectory: 'संपूर्ण फैकल्टी एवं टेक्निकल टीम निर्देशिका देखें'
    }
  }
};
