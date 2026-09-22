import React, { useState } from 'react';
import {
  X,
  ShieldCheck
} from 'lucide-react';

export default function WelcomePage({ onNavigate }) {
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSkip = () => {
    if (onNavigate) onNavigate('home');
  };

  const handlePhoneLogin = () => {
    if (onNavigate) onNavigate('phone');
  };

  const handleGoogleSelect = (accountName, email) => {
    setShowGoogleModal(false);
    showToast(`Signed in as ${accountName} (${email})`);
    setTimeout(() => {
      if (onNavigate) onNavigate('regions');
    }, 600);
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      showToast('Please enter a valid email address');
      return;
    }
    setShowEmailModal(false);
    showToast(`Verification code sent to ${emailInput}`);
    setTimeout(() => {
      if (onNavigate) onNavigate('regions');
    }, 600);
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-white sm:rounded-[44px] flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 bg-[#1e2337] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-xl border border-white/10 flex items-center gap-2 animate-fade-in">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* The 100% Exact High-Resolution Image from c20.png */}
      <div className="relative w-full h-full">
        <img
          src="/c20.png"
          alt="Planitory Welcome Screen"
          className="w-full h-full object-cover pointer-events-none"
        />

        {/* 1. Interactive Hitbox: Top User Badge (Switch / View Profile) */}
        <button
          onClick={() => {
            if (onNavigate) onNavigate('user-profile');
            else showToast("Logged in as Alex Parker");
          }}
          className="absolute top-[2.2%] left-[7.5%] w-[42%] h-[2.5%] rounded-full cursor-pointer hover:bg-black/10 active:scale-95 transition-all z-20"
          title="View Profile"
        />

        {/* 2. Interactive Hitbox: Top Skip Button */}
        <button
          onClick={handleSkip}
          className="absolute top-[2.0%] right-[7.0%] w-[16%] h-[2.6%] rounded-full cursor-pointer hover:bg-black/10 active:scale-95 transition-all z-20"
          title="Skip to Home"
        />

        {/* 3. Interactive Hitbox: Continue with Google */}
        <button
          onClick={() => setShowGoogleModal(true)}
          className="absolute top-[58.8%] left-[12.8%] right-[12.8%] h-[4.2%] rounded-2xl cursor-pointer hover:bg-black/5 active:scale-[0.99] transition-all z-20"
          title="Continue with Google"
        />

        {/* 4. Interactive Hitbox: Continue with phone number */}
        <button
          onClick={handlePhoneLogin}
          className="absolute top-[64.6%] left-[12.8%] right-[12.8%] h-[4.2%] rounded-2xl cursor-pointer hover:bg-black/5 active:scale-[0.99] transition-all z-20"
          title="Continue with phone number"
        />

        {/* 5. Interactive Hitbox: Continue with email */}
        <button
          onClick={() => setShowEmailModal(true)}
          className="absolute top-[70.4%] left-[12.8%] right-[12.8%] h-[4.2%] rounded-2xl cursor-pointer hover:bg-black/5 active:scale-[0.99] transition-all z-20"
          title="Continue with email"
        />

        {/* 6. Interactive Hitbox: Apple Social */}
        <button
          onClick={() => showToast('Apple Sign In')}
          className="absolute top-[79.0%] left-[27.0%] w-[13.0%] aspect-square rounded-full cursor-pointer hover:bg-black/10 active:scale-95 transition-all z-20"
          title="Apple Sign In"
        />

        {/* 7. Interactive Hitbox: Facebook Social */}
        <button
          onClick={() => showToast('Facebook Sign In')}
          className="absolute top-[79.0%] left-[44.0%] w-[13.0%] aspect-square rounded-full cursor-pointer hover:bg-black/10 active:scale-95 transition-all z-20"
          title="Facebook Sign In"
        />

        {/* 8. Interactive Hitbox: Instagram Social */}
        <button
          onClick={() => showToast('Instagram Sign In')}
          className="absolute top-[79.0%] right-[27.0%] w-[13.0%] aspect-square rounded-full cursor-pointer hover:bg-black/10 active:scale-95 transition-all z-20"
          title="Instagram Sign In"
        />

        {/* 9. Interactive Hitbox: Terms of Service */}
        <button
          onClick={() => setShowTermsModal(true)}
          className="absolute top-[87.2%] left-[58.0%] w-[32.0%] h-[1.8%] rounded-sm cursor-pointer hover:bg-indigo-500/20 transition-all z-20"
          title="Terms of Service"
        />

        {/* 10. Interactive Hitbox: Privacy Policy */}
        <button
          onClick={() => setShowTermsModal(true)}
          className="absolute top-[89.2%] left-[43.5%] w-[25.5%] h-[1.8%] rounded-sm cursor-pointer hover:bg-indigo-500/20 transition-all z-20"
          title="Privacy Policy"
        />

        {/* 11. Interactive Hitbox: Sign In */}
        <button
          onClick={() => setShowEmailModal(true)}
          className="absolute top-[93.4%] left-[61.0%] w-[18.0%] h-[2.2%] rounded-md cursor-pointer hover:bg-indigo-500/20 transition-all z-20"
          title="Sign In"
        />
      </div>

      {/* Google Account Selector Modal */}
      {showGoogleModal && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white w-full rounded-3xl p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z" />
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.17 0 9.99 0 12s.45 3.83 1.25 5.42l4.03-3.15z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                </svg>
                <span className="font-bold text-sm text-slate-800">Sign in with Google</span>
              </div>
              <button onClick={() => setShowGoogleModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 space-y-2">
              <div
                onClick={() => handleGoogleSelect('Alex Parker', 'alex.parker@gmail.com')}
                className="p-3 rounded-2xl hover:bg-slate-50 border border-slate-100 flex items-center gap-3 cursor-pointer transition"
              >
                <img src="/c14-avatar.png" alt="Alex" className="w-9 h-9 rounded-full object-cover" />
                <div className="text-left">
                  <div className="font-bold text-xs text-slate-900">Alex Parker</div>
                  <div className="text-[11px] text-slate-500">alex.parker@gmail.com</div>
                </div>
              </div>
              <div
                onClick={() => handleGoogleSelect('Travel Explorer', 'explorer@gmail.com')}
                className="p-3 rounded-2xl hover:bg-slate-50 border border-slate-100 flex items-center gap-3 cursor-pointer transition"
              >
                <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs">
                  TE
                </div>
                <div className="text-left">
                  <div className="font-bold text-xs text-slate-900">Travel Explorer</div>
                  <div className="text-[11px] text-slate-500">explorer@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Email Input Modal */}
      {showEmailModal && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white w-full rounded-3xl p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-sm text-slate-800">Sign in with Email</span>
              <button onClick={() => setShowEmailModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleEmailSubmit} className="mt-4 space-y-3">
              <input
                type="email"
                placeholder="name@example.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 outline-none focus:border-[#544ee5]"
                autoFocus
              />
              <button
                type="submit"
                className="w-full py-3 bg-[#544ee5] hover:bg-[#4842db] text-white font-bold text-xs rounded-xl shadow-md transition"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Terms & Conditions Modal */}
      {showTermsModal && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white w-full max-h-[85%] rounded-3xl p-5 shadow-2xl border border-slate-100 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#544ee5]" />
                <h3 className="font-bold text-sm text-slate-900">Terms of Service & Pricing</h3>
              </div>
              <button onClick={() => setShowTermsModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="overflow-y-auto mt-3 space-y-2.5 text-xs text-slate-600 pr-1 leading-relaxed">
              <div className="p-3 bg-indigo-50/70 rounded-2xl border border-indigo-100">
                <h4 className="font-bold text-xs text-[#544ee5] mb-1">Creator Pricing Policy</h4>
                <ul className="list-disc pl-4 space-y-1 text-[11.5px] text-slate-700">
                  <li><strong>First 5 Listings:</strong> 100% Free to publish.</li>
                  <li><strong>Subsequent Listings:</strong> €0.20 per created map listing.</li>
                  <li><strong>Platform Commission:</strong> 10% on each completed map sale.</li>
                </ul>
              </div>

              <p>
                By using Planitory, you agree to discover, share, and purchase authentic local map guides created by verified travel creators.
              </p>
              <p>
                All payments are securely processed through Stripe. Offline downloads are stored locally on your device for seamless navigation abroad without roaming charges.
              </p>
            </div>

            <button
              onClick={() => setShowTermsModal(false)}
              className="mt-4 w-full py-2.5 bg-[#544ee5] hover:bg-[#4842db] text-white font-bold text-xs rounded-xl shadow-md transition"
            >
              I Understand & Agree
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
