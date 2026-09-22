import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, Lock, CheckCircle2, ShieldCheck } from 'lucide-react';

const COUNTRIES = [
  { code: '+1', name: 'United States', flag: '🇺🇸' },
  { code: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+1', name: 'Canada', flag: '🇨🇦' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: '+81', name: 'Japan', flag: '🇯🇵' },
];

export default function PhoneNumberPage({ onBack, onNavigate }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  // Format phone number as user types: "123 456 7890"
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

  const handleSendCode = (e) => {
    e?.preventDefault();
    const cleanNumber = phoneNumber || '123 456 7890';
    showToast(`Verification code sent to ${selectedCountry.code} ${cleanNumber}`);
    setShowOtpModal(true);
  };

  const handleOtpChange = (index, val) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    // Auto-advance focus
    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  return (
    <div className="relative w-full h-full min-h-[720px] max-h-[960px] aspect-[9/16] select-none overflow-hidden rounded-[32px] sm:rounded-[44px] shadow-2xl bg-[#fafbfe] flex flex-col justify-between">
      {/* Top Header & Status Bar Area */}
      <div className="w-full pt-3 sm:pt-4 px-6 z-20">
        {/* Mock iOS Status Bar */}
        <div className="flex items-center justify-between text-xs font-semibold text-[#0f1738] mb-2 px-1">
          <span className="text-[13px] tracking-tight font-bold">9:41</span>
          <div className="flex items-center gap-1.5">
            {/* Cellular signal bars */}
            <div className="flex items-end gap-[1.5px] h-3">
              <div className="w-[3px] h-1 bg-[#0f1738] rounded-[0.5px]" />
              <div className="w-[3px] h-1.5 bg-[#0f1738] rounded-[0.5px]" />
              <div className="w-[3px] h-2 bg-[#0f1738] rounded-[0.5px]" />
              <div className="w-[3px] h-3 bg-[#0f1738] rounded-[0.5px]" />
            </div>
            {/* Wifi */}
            <svg className="w-3.5 h-3.5 fill-[#0f1738]" viewBox="0 0 24 24">
              <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98A16.88 16.88 0 0 0 12 4z" />
            </svg>
            {/* Battery */}
            <div className="w-5 h-2.5 border border-[#0f1738] rounded-[3px] p-[1px] flex items-center">
              <div className="w-full h-full bg-[#0f1738] rounded-[1px]" />
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-2">
          <button
            onClick={onBack}
            className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-[#12183a] hover:bg-slate-100 active:scale-95 transition-all"
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
        <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-[#737ea1] max-w-[270px] mb-6">
          We’ll send you a verification code to confirm your account.
        </p>

        {/* Phone Input Box */}
        <div className="relative w-full mb-4">
          <div className="w-full h-[54px] sm:h-[56px] rounded-2xl bg-white border border-[#dbe1f5] shadow-[0_2px_8px_rgba(50,70,140,0.03)] flex items-center overflow-hidden focus-within:border-[#544ee5] focus-within:ring-3 focus-within:ring-[#544ee5]/15 transition-all">
            {/* Country Selector Button */}
            <button
              type="button"
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
              className="h-full px-3.5 sm:px-4 flex items-center gap-2 hover:bg-slate-50 active:bg-slate-100 transition-colors shrink-0"
            >
              <span className="text-xl">{selectedCountry.flag}</span>
              <span className="font-bold text-[#111936] text-[15.5px]">
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
              placeholder="123 456 7890"
              className="w-full h-full px-4 text-[#111936] text-[16px] sm:text-[16.5px] font-medium outline-none placeholder:text-[#a0a8bf] bg-transparent"
              autoFocus
            />
          </div>

          {/* Country Dropdown Menu */}
          {showCountryDropdown && (
            <div className="absolute top-[62px] left-0 z-50 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 text-left max-h-48 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-150">
              {COUNTRIES.map((c, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSelectedCountry(c);
                    setShowCountryDropdown(false);
                  }}
                  className="w-full px-3 py-2 text-sm flex items-center gap-3 rounded-xl hover:bg-indigo-50/70 transition-colors text-slate-800"
                >
                  <span className="text-lg">{c.flag}</span>
                  <span className="font-medium flex-1 truncate">{c.name}</span>
                  <span className="font-bold text-[#544ee5] text-xs">{c.code}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Send Code Primary Button */}
        <button
          onClick={handleSendCode}
          className="w-full h-[52px] sm:h-[55px] bg-[#544ee5] hover:bg-[#4842db] active:bg-[#3f39cc] text-white font-bold text-[15.5px] rounded-2xl shadow-[0_6px_20px_rgba(84,78,229,0.32)] btn-interactive flex items-center justify-center cursor-pointer mb-5"
        >
          Send code
        </button>

        {/* "or" Divider */}
        <div className="w-full flex items-center justify-center gap-3 mb-5">
          <div className="h-[1px] flex-1 bg-[#e3e8f6]" />
          <span className="text-[13px] text-[#737ea1] font-medium">or</span>
          <div className="h-[1px] flex-1 bg-[#e3e8f6]" />
        </div>

        {/* Continue with Google Secondary Button */}
        <button
          onClick={() => showToast("Connecting to Google authentication...")}
          className="w-full h-[52px] sm:h-[55px] bg-white hover:bg-[#fafbff] active:bg-[#f2f4fa] text-[#131b38] font-bold text-[15px] sm:text-[15.5px] rounded-2xl border border-[#e4e8f7] shadow-[0_2px_8px_rgba(50,70,140,0.04)] btn-interactive flex items-center justify-center gap-3.5 cursor-pointer mb-5"
        >
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
          <span>Continue with Google</span>
        </button>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-1.5 text-[12px] text-[#717ea2] font-medium mb-2">
          <Lock className="w-3.5 h-3.5 text-[#717ea2] shrink-0" />
          <span>Your information is safe with us.</span>
        </div>
      </div>

      {/* Bottom Scenic Illustration with Script Quote */}
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

      {/* Interactive OTP Verification Sheet */}
      {showOtpModal && (
        <div className="absolute inset-0 bg-black/45 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-indigo-50 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2 text-[#544ee5]">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="font-bold text-[#111936] text-base">Verify Your Code</h3>
              </div>
              <button
                onClick={() => setShowOtpModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-semibold px-2 py-1"
              >
                Cancel
              </button>
            </div>
            <p className="text-xs text-[#737ea1] mb-5">
              Enter the 4-digit code sent to{' '}
              <strong className="text-[#111936]">
                {selectedCountry.code} {phoneNumber || '123 456 7890'}
              </strong>
            </p>

            {/* 4-digit inputs */}
            <div className="flex justify-between gap-3 mb-5">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  className="w-13 h-14 text-center text-xl font-bold rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-[#544ee5] focus:ring-2 focus:ring-[#544ee5]/20 outline-none text-[#111936]"
                />
              ))}
            </div>

            <button
              onClick={() => {
                showToast("Account verified successfully! Welcome to Planitory!");
                setShowOtpModal(false);
                if (onNavigate) onNavigate('home');
              }}
              className="w-full py-3 bg-[#544ee5] hover:bg-[#4842db] text-white font-bold rounded-xl text-sm shadow-md shadow-indigo-200 transition-all"
            >
              Verify & Proceed
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
