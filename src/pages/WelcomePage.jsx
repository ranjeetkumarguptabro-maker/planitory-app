import React, { useState, useEffect } from 'react';
import { Phone, Mail, X, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { signInWithGoogle, getCurrentUser } from '../services/supabase';

export default function WelcomePage({ onNavigate }) {
  const [activeModal, setActiveModal] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [toastMessage, setToastMessage] = useState(null);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  useEffect(() => {
    // Check if user is already authenticated
    getCurrentUser().then((user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  }, []);

  const handleGoogleLogin = async () => {
    setIsLoadingGoogle(true);
    showToast("Opening Google Sign-In with Supabase...");

    const { data, error } = await signInWithGoogle();

    if (error) {
      console.warn("Google OAuth notice:", error.message);
      // If popup or redirect encounters environment limitation, inform user clearly
      showToast(error.message || "Google OAuth initiated. Enable Google provider in Supabase Dashboard.");
    }
    setIsLoadingGoogle(false);
  };

  const handleSkip = () => {
    showToast("Skipped to main discovery feed");
    if (onNavigate) onNavigate('home');
  };

  return (
    <div className="relative w-full h-full min-h-[720px] max-h-[960px] aspect-[9/16] select-none overflow-hidden rounded-[32px] shadow-2xl bg-[#0f1424]">
      {/* Background artwork */}
      <img
        src="/bg-clean-with-sky.png"
        alt="Planitory - Maps with stories"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Top Bar with interactive Skip button */}
      <div className="absolute top-0 left-0 right-0 pt-6 px-6 sm:px-7 flex justify-between items-center z-20">
        {currentUser ? (
          <span className="text-[12px] bg-white/80 backdrop-blur-md px-2.5 py-1 rounded-full text-indigo-950 font-bold shadow-xs">
            Logged in: {currentUser.name || currentUser.phone || currentUser.email}
          </span>
        ) : (
          <div />
        )}
        <button
          onClick={handleSkip}
          className="text-[#5e6faa] hover:text-[#2d3b66] active:scale-95 font-medium text-[15px] sm:text-[16px] tracking-wide py-1 px-2.5 rounded-lg transition-all"
        >
          Skip
        </button>
      </div>

      {/* Bottom Interactive Area */}
      <div className="absolute left-0 right-0 bottom-0 z-20 flex flex-col items-center px-7 pb-6 pt-2">
        {/* Buttons container */}
        <div className="w-full flex flex-col gap-[11px]">
          {/* Continue with Google */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoadingGoogle}
            className="w-full h-[52px] sm:h-[55px] bg-white hover:bg-[#fafbff] active:bg-[#f3f4fa] rounded-full flex items-center justify-center gap-3.5 shadow-[0_4px_16px_rgba(40,55,120,0.08)] btn-interactive cursor-pointer group disabled:opacity-75"
          >
            {isLoadingGoogle ? (
              <Loader2 className="w-5 h-5 text-[#4285F4] animate-spin" />
            ) : (
              <svg className="w-[21px] h-[21px] shrink-0" viewBox="0 0 24 24">
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
            <span className="text-[#131b38] font-bold text-[15px] sm:text-[15.5px] tracking-[-0.01em]">
              {isLoadingGoogle ? 'Connecting to Google...' : 'Continue with Google'}
            </span>
          </button>

          {/* Continue with phone number */}
          <button
            onClick={() => onNavigate ? onNavigate('phone') : setActiveModal('phone')}
            className="w-full h-[52px] sm:h-[55px] bg-[#edf0fd] hover:bg-[#e4e8fa] active:bg-[#dbe0f7] rounded-full flex items-center justify-center gap-3 btn-interactive cursor-pointer"
          >
            <Phone className="w-[19px] h-[19px] text-[#554fe2] fill-[#554fe2] shrink-0" />
            <span className="text-[#131b38] font-bold text-[15px] sm:text-[15.5px] tracking-[-0.01em]">
              Continue with phone number
            </span>
          </button>

          {/* Continue with email */}
          <button
            onClick={() => setActiveModal('email')}
            className="w-full h-[52px] sm:h-[55px] bg-[#edf0fd] hover:bg-[#e4e8fa] active:bg-[#dbe0f7] rounded-full flex items-center justify-center gap-3 btn-interactive cursor-pointer"
          >
            <Mail className="w-[20px] h-[20px] text-[#554fe2] shrink-0" strokeWidth={2.2} />
            <span className="text-[#131b38] font-bold text-[15px] sm:text-[15.5px] tracking-[-0.01em]">
              Continue with email
            </span>
          </button>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-4 text-center text-[12px] sm:text-[12.5px] leading-snug text-[#73789b] max-w-[340px]">
          By continuing, you agree to our{' '}
          <button
            onClick={() => setActiveModal('terms')}
            className="text-[#4348ca] font-bold hover:underline inline"
          >
            Terms of Service
          </button>{' '}
          and{' '}
          <button
            onClick={() => setActiveModal('privacy')}
            className="text-[#4348ca] font-bold hover:underline inline"
          >
            Privacy Policy.
          </button>
        </div>

        {/* Divider with Sign In */}
        <div className="mt-4 sm:mt-5 flex items-center justify-center w-full gap-2.5 text-[12.5px] sm:text-[13px] text-[#717698]">
          <span className="h-[1px] w-12 sm:w-14 bg-[#d8dced]" />
          <span>Already have an account?</span>
          <button
            onClick={() => setActiveModal('signin')}
            className="text-[#4348ca] font-bold hover:underline cursor-pointer"
          >
            Sign In
          </button>
          <span className="h-[1px] w-12 sm:w-14 bg-[#d8dced]" />
        </div>
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-[#161c3b]/95 backdrop-blur-md text-white px-4 py-2 rounded-full text-[13px] shadow-xl flex items-center gap-2 border border-white/10 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Interactive Modals */}
      {activeModal && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40 flex items-end sm:items-center justify-center p-4 transition-opacity duration-200">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-indigo-50 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#131b38]">
                {activeModal === 'phone' && 'Phone Sign In'}
                {activeModal === 'email' && 'Email Sign In'}
                {activeModal === 'signin' && 'Welcome Back'}
                {activeModal === 'terms' && 'Terms of Service'}
                {activeModal === 'privacy' && 'Privacy Policy'}
              </h3>
              <button
                onClick={() => setActiveModal(null)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            {activeModal === 'phone' && (
              <div className="space-y-4">
                <p className="text-xs text-[#717698]">
                  We'll text you a verification code to securely sign in or register.
                </p>
                <div className="flex rounded-xl border border-slate-200 overflow-hidden focus-within:border-[#554fe2] focus-within:ring-2 focus-within:ring-indigo-100">
                  <span className="bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-600 border-r border-slate-200">
                    +1
                  </span>
                  <input
                    type="tel"
                    placeholder="(555) 000-0000"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm outline-none text-[#131b38]"
                    autoFocus
                  />
                </div>
                <button
                  onClick={() => {
                    showToast("Redirecting to verification...");
                    setActiveModal(null);
                    if (onNavigate) onNavigate('phone');
                  }}
                  className="w-full py-3 bg-[#554fe2] hover:bg-[#4740d4] text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-indigo-200 cursor-pointer"
                >
                  Send Verification Code
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {activeModal === 'email' && (
              <div className="space-y-4">
                <p className="text-xs text-[#717698]">
                  Enter your email address to receive a secure magic sign-in link.
                </p>
                <input
                  type="email"
                  placeholder="your.name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 outline-none focus:border-[#554fe2] focus:ring-2 focus:ring-indigo-100 text-[#131b38]"
                  autoFocus
                />
                <button
                  onClick={() => {
                    showToast("Magic link sent to " + (email || "your email"));
                    setActiveModal(null);
                  }}
                  className="w-full py-3 bg-[#554fe2] hover:bg-[#4740d4] text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-indigo-200 cursor-pointer"
                >
                  Continue with Email
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {activeModal === 'signin' && (
              <div className="space-y-3.5">
                <input
                  type="text"
                  placeholder="Email or phone"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 outline-none focus:border-[#554fe2] focus:ring-2 focus:ring-indigo-100 text-[#131b38]"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 outline-none focus:border-[#554fe2] focus:ring-2 focus:ring-indigo-100 text-[#131b38]"
                />
                <button
                  onClick={() => {
                    showToast("Signed in successfully!");
                    setActiveModal(null);
                  }}
                  className="w-full py-3 bg-[#554fe2] hover:bg-[#4740d4] text-white font-bold rounded-xl text-sm transition-all shadow-md shadow-indigo-200 cursor-pointer"
                >
                  Sign In
                </button>
              </div>
            )}

            {(activeModal === 'terms' || activeModal === 'privacy') && (
              <div className="space-y-3 text-xs text-slate-600 max-h-56 overflow-y-auto pr-1">
                <p>
                  Welcome to <strong>Planitory</strong>. By accessing our maps and travel planning services, you agree to discover the world with respect, curiosity, and kindness.
                </p>
                <p>
                  Your personal itineraries, location data, and travel stories are encrypted and safeguarded under our privacy commitment.
                </p>
                <button
                  onClick={() => setActiveModal(null)}
                  className="w-full mt-2 py-2 bg-slate-100 hover:bg-slate-200 font-semibold rounded-lg text-slate-700 cursor-pointer"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
