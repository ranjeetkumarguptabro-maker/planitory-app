import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Star,
  MapPin,
  CreditCard,
  Lock,
  CheckCircle2,
  Check,
  X,
  Sparkles
} from 'lucide-react';
import { processPayment, STRIPE_PUBLISHABLE_KEY } from '../services/stripe';

export default function CheckoutPage({ onBack, onNavigate }) {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handlePay = async () => {
    setIsProcessing(true);
    try {
      const result = await processPayment({
        amount: 12,
        currency: 'usd',
        itemTitle: 'Paris in 3 Days',
        paymentMethod: selectedMethod,
      });

      setIsProcessing(false);
      if (result.success) {
        showToast("Payment confirmed! Loading your Paris Essentials map...");
        setTimeout(() => {
          if (onNavigate) {
            onNavigate('purchased-map');
          } else {
            setShowSuccessModal(true);
          }
        }, 600);
      } else {
        showToast(result.error || "Payment failed, please try again.");
      }
    } catch (err) {
      setIsProcessing(false);
      showToast("Payment processing error. Please try again.");
    }
  };

  return (
    <div className="relative w-full h-full min-h-[720px] max-h-[960px] aspect-[9/16] select-none overflow-hidden rounded-[32px] sm:rounded-[44px] shadow-2xl bg-[#fafbfe] flex flex-col justify-between">
      {/* Top Header & Status Bar Area */}
      <div className="w-full pt-3 sm:pt-4 px-6 z-20 shrink-0">
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

        {/* Navigation Bar with centered title */}
        <div className="relative flex items-center justify-center py-2">
          <button
            onClick={onBack}
            className="absolute left-0 -ml-2 w-9 h-9 rounded-full flex items-center justify-center text-[#111936] hover:bg-slate-100 active:scale-95 transition-all"
            title="Go back"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
          </button>
          <h1 className="text-[17px] sm:text-[18px] font-extrabold text-[#0f1738] tracking-tight">
            Checkout
          </h1>
        </div>
      </div>

      {/* Main Content Body */}
      <div className="flex-1 overflow-y-auto px-5 sm:px-6 space-y-4 pt-1 pb-6 scrollbar-none">
        {/* Product Card */}
        <div className="w-full p-3 sm:p-3.5 rounded-2xl bg-white border border-[#e4e8f7] shadow-[0_2px_8px_rgba(50,70,140,0.03)] flex items-center justify-between gap-3">
          {/* Thumbnail */}
          <img
            src="/c8-thumb-paris.png"
            alt="Paris in 3 Days"
            className="w-[84px] h-[84px] sm:w-[88px] sm:h-[88px] object-cover rounded-2xl shrink-0 pointer-events-none"
          />

          {/* Details */}
          <div className="flex-1 min-w-0 pr-1">
            <h2 className="text-[15.5px] sm:text-[16px] font-extrabold text-[#0f1738] tracking-tight leading-tight">
              Paris in 3 Days
            </h2>
            <span className="text-[12.5px] text-[#717ea1] font-medium block mt-0.5 mb-1">
              By Anna Travels
            </span>
            <div className="flex items-center gap-1.5 text-[11.5px] text-[#111936] font-bold">
              <Star className="w-3.5 h-3.5 fill-[#f59e0b] text-[#f59e0b]" />
              <span>4.8</span>
              <span className="text-[#717ea1] font-medium text-[11px]">(320 reviews)</span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#717ea1] font-medium mt-1">
              <MapPin className="w-3 h-3 text-[#717ea1] shrink-0" />
              <span>23 places</span>
              <span>&bull;</span>
              <span>3 days</span>
            </div>
          </div>

          {/* Price */}
          <div className="shrink-0 text-right pr-1">
            <span className="text-[20px] font-black text-[#0f1738] tracking-tight">
              $12
            </span>
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="space-y-2">
          <h3 className="text-[14.5px] font-bold text-[#0f1738] tracking-tight pl-0.5">
            Order Summary
          </h3>

          <div className="w-full p-4 rounded-2xl bg-white border border-[#e4e8f7] shadow-[0_2px_8px_rgba(50,70,140,0.03)] space-y-2.5 text-xs">
            <div className="flex justify-between items-center text-[#717ea1] font-medium text-[13px]">
              <span>Map price</span>
              <span className="text-[#0f1738] font-semibold">$12</span>
            </div>
            <div className="flex justify-between items-center text-[#717ea1] font-medium text-[13px]">
              <span>Processing fee</span>
              <span className="text-[#0f1738] font-semibold">$0</span>
            </div>
            <div className="border-t border-[#edf1f8] pt-2.5 flex justify-between items-center text-[15px] font-black text-[#0f1738]">
              <span>Total</span>
              <span>$12</span>
            </div>
          </div>
        </div>

        {/* Payment Method Section */}
        <div className="space-y-2">
          <h3 className="text-[14.5px] font-bold text-[#0f1738] tracking-tight pl-0.5">
            Payment Method
          </h3>

          <div className="space-y-2">
            {/* Option 1: Credit or Debit Card */}
            <div
              onClick={() => setSelectedMethod('card')}
              className={`w-full rounded-2xl transition-all cursor-pointer ${
                selectedMethod === 'card'
                  ? 'border-2 border-[#544ee5] bg-[#fbfbfe] shadow-[0_4px_12px_rgba(84,78,229,0.08)]'
                  : 'border border-[#e4e8f7] bg-white hover:border-slate-300'
              } p-3.5`}
            >
              <div className="flex items-center gap-3">
                {/* Radio Circle */}
                <div className="shrink-0">
                  {selectedMethod === 'card' ? (
                    <div className="w-5 h-5 rounded-full border-2 border-[#544ee5] flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#544ee5]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-[#cad2e8]" />
                  )}
                </div>

                {/* Card Icon */}
                <div className="w-9 h-7 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                  <CreditCard className="w-4 h-4 text-slate-800" strokeWidth={2.2} />
                </div>

                {/* Card Labels & Brand Logos */}
                <div className="flex-1 flex flex-col">
                  <span className="text-[13.5px] font-bold text-[#0f1738] leading-tight">
                    Credit or Debit Card
                  </span>
                  <div className="flex items-center gap-2 mt-1.5">
                    {/* Visa */}
                    <span className="font-extrabold text-[11px] italic tracking-wider text-[#1a1f71]">
                      VISA
                    </span>
                    {/* Mastercard circles */}
                    <div className="flex items-center -space-x-1.5">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#eb001b]" />
                      <div className="w-3.5 h-3.5 rounded-full bg-[#f79e1b] opacity-80" />
                    </div>
                    {/* Amex badge */}
                    <span className="text-[9px] font-bold bg-[#006fcf] text-white px-1 py-0.5 rounded-[3px] tracking-tight">
                      AMEX
                    </span>
                    {/* Discover */}
                    <span className="text-[9px] font-extrabold text-[#f76b1c] tracking-tight">
                      DISCOVER
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Option 2: PayPal */}
            <div
              onClick={() => setSelectedMethod('paypal')}
              className={`w-full rounded-2xl transition-all cursor-pointer ${
                selectedMethod === 'paypal'
                  ? 'border-2 border-[#544ee5] bg-[#fbfbfe] shadow-[0_4px_12px_rgba(84,78,229,0.08)]'
                  : 'border border-[#e4e8f7] bg-white hover:border-slate-300'
              } p-3.5`}
            >
              <div className="flex items-center gap-3">
                <div className="shrink-0">
                  {selectedMethod === 'paypal' ? (
                    <div className="w-5 h-5 rounded-full border-2 border-[#544ee5] flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#544ee5]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-[#cad2e8]" />
                  )}
                </div>

                {/* PayPal Logo */}
                <div className="w-7 h-7 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#003087">
                    <path d="M20.067 8.478c-.492 5.15-4.064 7.21-8.232 7.21h-2.18l-1.34 8.528H3.72l4.137-23.216h7.32c3.784 0 6.643 1.057 6.45 4.98-.06.777-.24 1.62-.56 2.498zm-5.11-.27c.18-1.58-.87-2.31-2.91-2.31H7.817L6.44 14.648h2.89c2.73 0 5.4-1.2 5.627-6.44z" />
                  </svg>
                </div>

                <span className="text-[14px] font-bold text-[#0f1738]">PayPal</span>
              </div>
            </div>

            {/* Option 3: Apple Pay */}
            <div
              onClick={() => setSelectedMethod('apple')}
              className={`w-full rounded-2xl transition-all cursor-pointer ${
                selectedMethod === 'apple'
                  ? 'border-2 border-[#544ee5] bg-[#fbfbfe] shadow-[0_4px_12px_rgba(84,78,229,0.08)]'
                  : 'border border-[#e4e8f7] bg-white hover:border-slate-300'
              } p-3.5`}
            >
              <div className="flex items-center gap-3">
                <div className="shrink-0">
                  {selectedMethod === 'apple' ? (
                    <div className="w-5 h-5 rounded-full border-2 border-[#544ee5] flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#544ee5]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-[#cad2e8]" />
                  )}
                </div>

                {/* Apple Logo */}
                <div className="w-7 h-7 flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5" viewBox="0 0 170 170" fill="#000000">
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.08-7.7-7.94-12.01-14.59-6.07-9.35-10.74-19.68-14.01-30.98-3.27-11.31-4.9-22.15-4.9-32.53 0-14.43 3.65-26.65 10.95-36.65 7.3-10 16.42-15.11 27.35-15.35 4.35 0 9.47 1.25 15.36 3.76 5.88 2.5 9.77 3.82 11.66 3.94 1.63-.12 5.73-1.49 12.3-4.11 6.58-2.63 12.18-3.8 16.82-3.52 14.56.88 25.8 6.36 33.72 16.45-12.73 7.74-19 18.23-18.82 31.47.18 10.45 4.14 19.34 11.88 26.68 7.74 7.34 16.92 11.37 27.53 12.09-2.18 6.53-4.9 13.06-8.16 19.59zM119.22 33.63c0-7.85 2.76-15.17 8.28-21.96 5.52-6.79 12.39-11.02 20.61-12.67.65 1.52.98 3.1.98 4.75 0 7.85-2.88 15.37-8.63 22.56-5.75 7.19-12.76 11.27-21.03 12.24-.11-1.63-.21-3.27-.21-4.92z" />
                  </svg>
                </div>

                <span className="text-[14px] font-bold text-[#0f1738]">Apple Pay</span>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Pay Button */}
        <div className="pt-2">
          <button
            onClick={handlePay}
            disabled={isProcessing}
            className="w-full h-[54px] sm:h-[56px] bg-[#544ee5] hover:bg-[#4842db] active:bg-[#3f39cc] text-white font-bold text-[16px] rounded-2xl shadow-[0_6px_20px_rgba(84,78,229,0.32)] btn-interactive flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Processing...</span>
              </span>
            ) : (
              <>
                <span>Pay $12</span>
                <ArrowRight className="w-5 h-5 stroke-[2.4]" />
              </>
            )}
          </button>
        </div>

        {/* Security Badge */}
        <div className="flex items-center justify-center gap-1.5 text-[12px] text-[#717ea1] font-medium pt-0.5">
          <Lock className="w-3.5 h-3.5 text-[#717ea1] shrink-0" />
          <span>Secure payment powered by Stripe</span>
        </div>

        {/* Bottom Informational Banner */}
        <div className="w-full p-4 rounded-2xl bg-[#edf0fd] flex items-center gap-3.5">
          <div className="w-10 h-10 flex items-center justify-center shrink-0">
            <img
              src="/c8-map-icon-transparent.png"
              alt="Map available"
              className="w-8 h-8 object-contain"
            />
          </div>
          <p className="text-[12px] text-[#556385] leading-snug font-medium">
            After purchase, the complete map with all locations will be immediately available in your library.
          </p>
        </div>
      </div>

      {/* Payment Success Confirmation Modal */}
      {showSuccessModal && (
        <div className="absolute inset-0 bg-black/45 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-indigo-50 text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3.5">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <h3 className="text-xl font-extrabold text-[#0f1738] mb-1">
              Payment Successful!
            </h3>
            <p className="text-xs text-[#717ea1] mb-5 max-w-[260px] mx-auto">
              <strong>Paris in 3 Days</strong> has been added to your map library with full offline GPS navigation.
            </p>

            <div className="space-y-2.5">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  if (onNavigate) onNavigate('explore');
                }}
                className="w-full py-3.5 bg-[#544ee5] hover:bg-[#4842db] text-white font-bold rounded-xl text-sm shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2"
              >
                <span>Explore Map</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  if (onNavigate) onNavigate('explore');
                }}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl text-xs"
              >
                Back to Explore Feed
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-[#161c3b]/95 backdrop-blur-md text-white px-4 py-2 rounded-full text-[13px] shadow-xl flex items-center gap-2 border border-white/10 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
