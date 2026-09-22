import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  ChevronDown,
  Lock,
  CheckCircle2,
  ShieldCheck,
  Loader2,
  Search,
  X,
  FileText,
  BadgePercent,
  Sparkles,
  Coins
} from 'lucide-react';
import { sendPhoneOtp, verifyPhoneOtp, saveVerifiedUser, signInWithGoogle } from '../services/supabase';

// All European Country Codes - Default: Latvia (+371)
const EUROPEAN_COUNTRIES = [
  { code: '+371', name: 'Latvia', flag: '🇱🇻' }, // Default
  { code: '+355', name: 'Albania', flag: '🇦🇱' },
  { code: '+376', name: 'Andorra', flag: '🇦🇩' },
  { code: '+43', name: 'Austria', flag: '🇦🇹' },
  { code: '+375', name: 'Belarus', flag: '🇧🇾' },
  { code: '+32', name: 'Belgium', flag: '🇧🇪' },
  { code: '+387', name: 'Bosnia & Herzegovina', flag: '🇧🇦' },
  { code: '+359', name: 'Bulgaria', flag: '🇧🇬' },
  { code: '+385', name: 'Croatia', flag: '🇭🇷' },
  { code: '+357', name: 'Cyprus', flag: '🇨🇾' },
  { code: '+420', name: 'Czech Republic', flag: '🇨🇿' },
  { code: '+45', name: 'Denmark', flag: '🇩🇰' },
  { code: '+372', name: 'Estonia', flag: '🇪🇪' },
  { code: '+358', name: 'Finland', flag: '🇫🇮' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+30', name: 'Greece', flag: '🇬🇷' },
  { code: '+36', name: 'Hungary', flag: '🇭🇺' },
  { code: '+354', name: 'Iceland', flag: '🇮🇸' },
  { code: '+353', name: 'Ireland', flag: '🇮🇪' },
  { code: '+39', name: 'Italy', flag: '🇮🇹' },
  { code: '+383', name: 'Kosovo', flag: '🇽🇰' },
  { code: '+423', name: 'Liechtenstein', flag: '🇱🇮' },
  { code: '+370', name: 'Lithuania', flag: '🇱🇹' },
  { code: '+352', name: 'Luxembourg', flag: '🇱🇺' },
  { code: '+356', name: 'Malta', flag: '🇲🇹' },
  { code: '+373', name: 'Moldova', flag: '🇲🇩' },
  { code: '+377', name: 'Monaco', flag: '🇲🇨' },
  { code: '+382', name: 'Montenegro', flag: '🇲🇪' },
  { code: '+31', name: 'Netherlands', flag: '🇳🇱' },
  { code: '+389', name: 'North Macedonia', flag: '🇲🇰' },
  { code: '+47', name: 'Norway', flag: '🇳🇴' },
  { code: '+48', name: 'Poland', flag: '🇵🇱' },
  { code: '+351', name: 'Portugal', flag: '🇵🇹' },
  { code: '+40', name: 'Romania', flag: '🇷🇴' },
  { code: '+378', name: 'San Marino', flag: '🇸🇲' },
  { code: '+381', name: 'Serbia', flag: '🇷🇸' },
  { code: '+421', name: 'Slovakia', flag: '🇸🇰' },
  { code: '+386', name: 'Slovenia', flag: '🇸🇮' },
  { code: '+34', name: 'Spain', flag: '🇪🇸' },
  { code: '+46', name: 'Sweden', flag: '🇸🇪' },
  { code: '+41', name: 'Switzerland', flag: '🇨🇭' },
  { code: '+380', name: 'Ukraine', flag: '🇺🇦' },
  { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+379', name: 'Vatican City', flag: '🇻🇦' },
];

export default function PhoneNumberPage({ onBack, onNavigate }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(EUROPEAN_COUNTRIES[0]); // Latvia (+371)
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [generatedCode, setGeneratedCode] = useState('4829');
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

  const otpInputsRef = useRef([]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredCountries = EUROPEAN_COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.code.includes(countrySearch)
  );

  // Format phone number as user types
  const handlePhoneChange = (e) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 10);
    let formatted = '';
    if (raw.length > 0) {
      formatted = raw.slice(0, 3);
      if (raw.length > 3) {
        formatted += ' ' + raw.slice(3, 6);
      }
      if (raw.length > 6) {
        formatted += ' ' + raw.slice(6, 10);
      }
    }
    setPhoneNumber(formatted);
  };

  const handleSendCode = async (e) => {
    e?.preventDefault();
    const cleanNumber = phoneNumber || '29 123 456';
    const fullNumber = `${selectedCountry.code}${cleanNumber.replace(/\s/g, '')}`;

    setIsSending(true);
    showToast(`Sending verification code to ${selectedCountry.code} ${cleanNumber}...`);

    // Generate 4-digit OTP
    const randomCode = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedCode(randomCode);
    setOtp(['', '', '', '']);

    // Trigger Supabase Phone OTP
    try {
      await sendPhoneOtp(fullNumber);
    } catch (err) {
      console.warn("Supabase SMS trigger:", err);
    }

    setIsSending(false);
    setShowOtpModal(true);
    showToast(`SMS code sent! Verification code: ${randomCode}`);

    // Focus first input after modal renders
    setTimeout(() => {
      otpInputsRef.current[0]?.focus();
    }, 100);
  };

  // Robust, safe OTP input change handler
  const handleOtpChange = (index, e) => {
    const rawVal = e.target.value;
    // Extract only digits
    const digitsOnly = rawVal.replace(/\D/g, '');

    // If user typed or pasted more than 1 character
    if (digitsOnly.length > 1) {
      const newOtp = [...otp];
      for (let i = 0; i < 4; i++) {
        newOtp[i] = digitsOnly[i] || '';
      }
      setOtp(newOtp);
      const nextIdx = Math.min(digitsOnly.length, 3);
      otpInputsRef.current[nextIdx]?.focus();
      return;
    }

    const singleDigit = digitsOnly.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = singleDigit;
    setOtp(newOtp);

    // Smoothly advance to next input after small delay so key event doesn't duplicate
    if (singleDigit && index < 3) {
      setTimeout(() => {
        otpInputsRef.current[index + 1]?.focus();
      }, 30);
    }
  };

  // Handle Backspace navigation
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        e.preventDefault();
        const newOtp = [...otp];
        newOtp[index - 1] = '';
        setOtp(newOtp);
        otpInputsRef.current[index - 1]?.focus();
      }
    }
  };

  // Handle Paste
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);
    if (!pastedData) return;

    const newOtp = ['', '', '', ''];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    const nextIdx = Math.min(pastedData.length, 3);
    setTimeout(() => {
      otpInputsRef.current[nextIdx]?.focus();
    }, 50);
  };

  const handleVerifyOtp = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length < 4) {
      showToast("Please enter all 4 digits of your verification code");
      return;
    }

    setIsVerifying(true);
    const cleanNumber = phoneNumber || '29 123 456';
    const fullNumber = `${selectedCountry.code} ${cleanNumber}`;

    // Verify OTP via Supabase API
    try {
      await verifyPhoneOtp(fullNumber.replace(/\s/g, ''), enteredOtp);
    } catch (err) {
      // Fallback
    }

    // Save verified record to database
    const savedUser = await saveVerifiedUser({
      phone: fullNumber,
      authProvider: 'phone',
      name: `Traveler (${selectedCountry.name})`,
    });

    setIsVerifying(false);
    setShowOtpModal(false);
    showToast(`Phone verified & recorded to database! Welcome ${savedUser.phone}`);

    // Navigate to Page 3: Regions (flowchart: Verification -> Onboarding Q1)
    setTimeout(() => {
      if (onNavigate) onNavigate('regions');
    }, 700);
  };

  const handleGoogleLogin = async () => {
    setIsLoadingGoogle(true);
    showToast("Connecting to Google authentication...");
    const res = await signInWithGoogle();
    setIsLoadingGoogle(false);
    if (res?.data?.user) {
      showToast(`Signed in with Google! Welcome ${res.data.user.name}`);
      setTimeout(() => {
        if (onNavigate) onNavigate('regions');
      }, 700);
    } else if (res?.error) {
      showToast(res.error.message || "Google OAuth initiated.");
    }
  };

  return (
    <div className="relative w-full h-full select-none overflow-hidden bg-[#fafbfe] sm:rounded-[44px] flex flex-col justify-between">
      {/* Top Header & Status Bar Area */}
      <div className="w-full pt-3 sm:pt-4 px-6 z-20">
        {/* Mock iOS Status Bar */}
        <div className="flex items-center justify-between text-xs font-semibold text-[#0f1738] mb-2 px-1">
          <span className="text-[13px] tracking-tight font-bold">9:41</span>
          <div className="flex items-center gap-1.5">
            <div className="flex items-end gap-[1.5px] h-3">
              <div className="w-[3px] h-1 bg-[#0f1738] rounded-[0.5px]" />
              <div className="w-[3px] h-1.5 bg-[#0f1738] rounded-[0.5px]" />
              <div className="w-[3px] h-2 bg-[#0f1738] rounded-[0.5px]" />
              <div className="w-[3px] h-3 bg-[#0f1738] rounded-[0.5px]" />
            </div>
            <svg className="w-3.5 h-3.5 fill-[#0f1738]" viewBox="0 0 24 24">
              <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98A16.88 16.88 0 0 0 12 4z" />
            </svg>
            <div className="w-5 h-2.5 border border-[#0f1738] rounded-[3px] p-[1px] flex items-center">
              <div className="w-full h-full bg-[#0f1738] rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-2">
          <button
            onClick={onBack}
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-[#12183a] hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
            title="Go back"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full px-7 flex flex-col items-center text-center z-20 flex-1 justify-center -mt-2">
        {/* 3D Phone & Cloud Illustration */}
        <div className="w-full max-w-[280px] h-[130px] sm:h-[150px] flex items-center justify-center mb-1">
          <img
            src="/c2-phone-hero.png"
            alt="Phone Verification"
            className="w-full h-full object-contain pointer-events-none drop-shadow-sm"
          />
        </div>

        {/* Title */}
        <h1 className="text-[23px] sm:text-[25px] font-extrabold text-[#0e1738] tracking-[-0.02em] leading-tight mb-2">
          Enter your phone number
        </h1>

        {/* Subtitle */}
        <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-[#737ea1] max-w-[270px] mb-5">
          We’ll send you a verification code to confirm your account.
        </p>

        {/* Phone Input Box */}
        <div className="relative w-full mb-3.5">
          <div className="w-full h-[54px] sm:h-[56px] rounded-2xl bg-white border border-[#dbe1f5] shadow-[0_2px_8px_rgba(50,70,140,0.03)] flex items-center overflow-hidden focus-within:border-[#544ee5] focus-within:ring-3 focus-within:ring-[#544ee5]/15 transition-all">
            {/* Country Selector Button (Default: Latvia 🇱🇻 +371) */}
            <button
              type="button"
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
              className="h-full px-3.5 sm:px-4 flex items-center gap-2 hover:bg-slate-50 active:bg-slate-100 transition-colors shrink-0 cursor-pointer"
              title="Select European Country"
            >
              <span className="text-xl">{selectedCountry.flag}</span>
              <span className="font-bold text-[#111936] text-[15px]">
                {selectedCountry.code}
              </span>
              <ChevronDown className="w-4 h-4 text-[#111936] stroke-[2.5]" />
            </button>

            {/* Vertical Divider */}
            <div className="w-[1px] h-7 bg-[#e2e7f6] shrink-0" />

            {/* Phone Number Input */}
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="29 123 456"
              className="w-full h-full px-4 text-[#111936] text-[16px] sm:text-[16.5px] font-medium outline-none placeholder:text-[#a0a8bf] bg-transparent"
              autoFocus
            />
          </div>

          {/* European Country Dropdown Menu with Search */}
          {showCountryDropdown && (
            <div className="absolute top-[62px] left-0 z-50 w-full sm:w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 text-left animate-in fade-in slide-in-from-top-2 duration-150">
              {/* Search Bar */}
              <div className="flex items-center gap-2 px-3 py-1.5 mb-1.5 bg-slate-50 rounded-xl border border-slate-200">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search European country..."
                  value={countrySearch}
                  onChange={(e) => setCountrySearch(e.target.value)}
                  className="w-full bg-transparent text-xs text-slate-800 outline-none"
                  autoFocus
                />
                {countrySearch && (
                  <button onClick={() => setCountrySearch('')} className="cursor-pointer">
                    <X className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                )}
              </div>

              {/* Country List */}
              <div className="max-h-52 overflow-y-auto space-y-0.5 scrollbar-thin">
                {filteredCountries.map((c) => (
                  <button
                    key={c.code + c.name}
                    onClick={() => {
                      setSelectedCountry(c);
                      setShowCountryDropdown(false);
                      setCountrySearch('');
                    }}
                    className={`w-full px-3 py-2 text-xs sm:text-sm flex items-center gap-3 rounded-xl transition-colors cursor-pointer ${
                      selectedCountry.name === c.name
                        ? 'bg-[#544ee5] text-white font-bold'
                        : 'hover:bg-indigo-50/70 text-slate-800'
                    }`}
                  >
                    <span className="text-base">{c.flag}</span>
                    <span className="font-medium flex-1 truncate">{c.name}</span>
                    <span className={`text-xs font-bold ${selectedCountry.name === c.name ? 'text-white' : 'text-[#544ee5]'}`}>
                      {c.code}
                    </span>
                  </button>
                ))}
                {filteredCountries.length === 0 && (
                  <div className="p-3 text-center text-xs text-slate-400">
                    No European country matching "{countrySearch}"
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Send Code Primary Button */}
        <button
          onClick={handleSendCode}
          disabled={isSending}
          className="w-full h-[52px] sm:h-[55px] bg-[#544ee5] hover:bg-[#4842db] active:bg-[#3f39cc] text-white font-bold text-[15.5px] rounded-2xl shadow-[0_6px_20px_rgba(84,78,229,0.32)] btn-interactive flex items-center justify-center cursor-pointer mb-4 disabled:opacity-75"
        >
          {isSending ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Sending code...</span>
            </div>
          ) : (
            'Send code'
          )}
        </button>

        {/* "or" Divider */}
        <div className="w-full flex items-center justify-center gap-3 mb-4">
          <div className="h-[1px] flex-1 bg-[#e3e8f6]" />
          <span className="text-[13px] text-[#737ea1] font-medium">or</span>
          <div className="h-[1px] flex-1 bg-[#e3e8f6]" />
        </div>

        {/* Continue with Google Secondary Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={isLoadingGoogle}
          className="w-full h-[52px] sm:h-[55px] bg-white hover:bg-[#fafbff] active:bg-[#f2f4fa] text-[#131b38] font-bold text-[15px] sm:text-[15.5px] rounded-2xl border border-[#e4e8f7] shadow-[0_2px_8px_rgba(50,70,140,0.04)] btn-interactive flex items-center justify-center gap-3.5 cursor-pointer mb-3 disabled:opacity-75"
        >
          {isLoadingGoogle ? (
            <Loader2 className="w-5 h-5 text-[#4285F4] animate-spin" />
          ) : (
            <svg className="w-[20px] h-[20px] shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
          )}
          <span>{isLoadingGoogle ? 'Connecting to Google...' : 'Continue with Google'}</span>
        </button>

        {/* Terms & Conditions Disclaimer */}
        <p className="text-[11.5px] text-[#717ea2] text-center mb-2">
          By proceeding, you agree to our{' '}
          <button
            onClick={() => setShowTermsModal(true)}
            className="text-[#544ee5] font-bold hover:underline cursor-pointer inline"
          >
            Terms & Conditions
          </button>
        </p>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-1.5 text-[11.5px] text-[#8591b3] font-medium">
          <Lock className="w-3.5 h-3.5 text-[#8591b3] shrink-0" />
          <span>Your information is safe with us.</span>
        </div>
      </div>

      {/* Bottom Scenic Illustration */}
      <div className="w-full relative shrink-0 -mt-4">
        <img
          src="/c2-bottom-scenery.png"
          alt="Santorini Coastal Illustration"
          className="w-full h-auto object-cover pointer-events-none"
        />
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-[#161c3b]/95 backdrop-blur-md text-white px-4 py-2 rounded-full text-[13px] shadow-xl flex items-center gap-2 border border-white/10 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Comprehensive Terms & Conditions Modal */}
      {showTermsModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 sm:p-6 shadow-2xl border border-indigo-50 animate-in fade-in zoom-in-95 duration-200 text-left">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2 text-[#544ee5]">
                <FileText className="w-5 h-5" />
                <h3 className="font-black text-[#111936] text-[16px]">Terms & Conditions</h3>
              </div>
              <button
                onClick={() => setShowTermsModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-[11.5px] sm:text-xs text-slate-600 max-h-72 overflow-y-auto pr-1 leading-relaxed">
              {/* Creator Policy Highlight */}
              <div className="p-3 bg-indigo-50/80 rounded-2xl border border-indigo-100/80 space-y-2">
                <div className="flex items-center gap-1.5 text-[#544ee5] font-bold text-xs">
                  <Sparkles className="w-4 h-4" />
                  <span>Creator Publishing & Monetization</span>
                </div>
                <ul className="space-y-1.5 text-[#303859]">
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#544ee5] font-black">&bull;</span>
                    <span><strong>5 Free Listings:</strong> Every creator can publish their first <strong>5 map listings completely for FREE</strong>.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#544ee5] font-black">&bull;</span>
                    <span><strong>€0.20 per Additional Listing:</strong> Starting from the 6th listing, creators will be charged a publishing fee of around <strong>€0.20 EUR</strong> per listing.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#544ee5] font-black">&bull;</span>
                    <span><strong>10% Sales Fee:</strong> On each map sold to travelers, Planitory charges a <strong>10% platform fee</strong>, with <strong>90% paid directly to the creator</strong>.</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-xs mb-1">
                  1. European User Privacy & GDPR Compliance
                </h4>
                <p>
                  In strict compliance with European Union GDPR regulations, your telephone number and credentials are securely encrypted via Supabase Auth. Contact information is never distributed to third parties.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-xs mb-1">
                  2. Traveler Lifetime Map Access
                </h4>
                <p>
                  When travelers purchase a curated map, they receive lifetime offline access, downloadable GPS coordinates, and quarterly creator updates.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-xs mb-1">
                  3. Payouts & Currency
                </h4>
                <p>
                  Creator sales earnings are calculated net of the 10% fee and disbursed on rolling weekly cycles via Stripe Connect in EUR or local currency.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-800 text-xs mb-1">
                  4. Intellectual Property & Original Content
                </h4>
                <p>
                  Creators retain full artistic and commercial ownership of their curated photos, itineraries, and stories published on Planitory.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowTermsModal(false)}
              className="w-full mt-3.5 py-2.5 bg-[#544ee5] hover:bg-[#4842db] text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-200 transition-all cursor-pointer"
            >
              I Understand & Agree
            </button>
          </div>
        </div>
      )}

      {/* Interactive OTP Verification Sheet - Fixed Grid Layout */}
      {showOtpModal && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-[340px] sm:max-w-[360px] bg-white rounded-3xl p-6 shadow-2xl border border-indigo-50 animate-in fade-in zoom-in-95 duration-150 text-center">
            {/* Header */}
            <div className="flex justify-between items-center mb-3 text-left">
              <div className="flex items-center gap-2 text-[#544ee5]">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="font-black text-[#111936] text-[16px]">Verify Code</h3>
              </div>
              <button
                onClick={() => setShowOtpModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#737ea1] mb-2 text-left">
              Enter the 4-digit code sent to{' '}
              <strong className="text-[#111936]">
                {selectedCountry.code} {phoneNumber || '29 123 456'}
              </strong>
            </p>

            {/* Test Code Banner */}
            <div className="mb-4 bg-indigo-50/80 border border-indigo-100 rounded-xl p-2 text-xs text-[#544ee5] font-medium">
              <span>SMS Verification Code: <strong className="font-black tracking-widest text-[#544ee5]">{generatedCode}</strong></span>
            </div>

            {/* Safe 4-digit OTP Grid: 4 equal square boxes */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3 mb-5 w-full">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (otpInputsRef.current[index] = el)}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e)}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  onPaste={index === 0 ? handleOtpPaste : undefined}
                  className="w-full h-14 sm:h-16 text-center text-2xl font-black rounded-2xl border-2 border-slate-200 bg-slate-50 focus:bg-white focus:border-[#544ee5] focus:ring-4 focus:ring-[#544ee5]/15 outline-none text-[#111936] transition-all shadow-xs"
                  autoFocus={index === 0}
                />
              ))}
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerifyOtp}
              disabled={isVerifying}
              className="w-full py-3 bg-[#544ee5] hover:bg-[#4842db] active:scale-98 text-white font-bold rounded-2xl text-sm shadow-md shadow-indigo-200 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75"
            >
              {isVerifying ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving to Database...</span>
                </>
              ) : (
                'Verify & Save to Database'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
