import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, CheckCircle2 } from 'lucide-react';

const INITIAL_CATEGORIES = [
  { id: 'museums', name: 'Museums', icon: '/c3-icon-museum.png', defaultSelected: true },
  { id: 'cafes', name: 'Cafés', icon: '/c3-icon-cafe.png', defaultSelected: true },
  { id: 'food', name: 'Food', icon: '/c3-icon-food.png', defaultSelected: false },
  { id: 'nature', name: 'Nature', icon: '/c3-icon-nature.png', defaultSelected: false },
  { id: 'nightlife', name: 'Nightlife', icon: '/c3-icon-nightlife.png', defaultSelected: false },
  { id: 'culture', name: 'Culture', icon: '/c3-icon-culture.png', defaultSelected: true },
  { id: 'gems', name: 'Hidden gems', icon: '/c3-icon-gems.png', defaultSelected: false },
  { id: 'family', name: 'Family', icon: '/c3-icon-family.png', defaultSelected: false },
  { id: 'shopping', name: 'Shopping', icon: '/c3-icon-shopping.png', defaultSelected: false },
];

export default function PreferencesPage({ onBack, onNavigate }) {
  const [selectedIds, setSelectedIds] = useState(
    INITIAL_CATEGORIES.filter((c) => c.defaultSelected).map((c) => c.id)
  );
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const toggleCategory = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleContinue = () => {
    showToast(`Saved ${selectedIds.length} travel preferences!`);
    if (onNavigate) onNavigate('goals');
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#fafbfe] sm:rounded-[44px] flex flex-col justify-between">
      {/* Top Header & Status Bar Area */}
      <div className="w-full pt-3 sm:pt-4 px-6 z-20 shrink-0">
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

        {/* Navigation & Progress Bar Row */}
        <div className="flex items-center justify-between gap-3 mt-1">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center text-[#12183a] hover:bg-slate-100 active:scale-95 transition-all shrink-0"
            title="Go back"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
          </button>

          {/* 3-Step Segmented Progress Bar (2 / 3 filled) */}
          <div className="flex-1 max-w-[190px] flex items-center gap-1.5 px-1">
            <div className="h-[4px] flex-1 rounded-full bg-[#544ee5]" />
            <div className="h-[4px] flex-1 rounded-full bg-[#544ee5]" />
            <div className="h-[4px] flex-1 rounded-full bg-[#dbe1f5]" />
          </div>

          {/* Step Indicator */}
          <span className="text-[13.5px] font-semibold text-[#64748b] tracking-wide shrink-0">
            2 / 3
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full px-5 sm:px-6 flex flex-col items-center text-center z-20 flex-1 justify-center py-1">
        {/* Pink Badge with 3D Heart */}
        <div className="w-15 h-15 sm:w-16 sm:h-16 rounded-full bg-[#ffe8ee] flex items-center justify-center shadow-[0_4px_16px_rgba(255,140,165,0.18)] mb-2">
          <img
            src="/c3-heart-only.png"
            alt="Love Places"
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain drop-shadow-sm"
          />
        </div>

        {/* Headline */}
        <h1 className="text-[21px] sm:text-[23px] font-extrabold text-[#0e1738] tracking-[-0.02em] leading-tight mb-1">
          What kind of places do you love?
        </h1>

        {/* Subtitle */}
        <p className="text-[13px] sm:text-[13.5px] leading-snug text-[#737ea1] max-w-[260px] mb-3.5">
          Choose a few to personalize your experience.
        </p>

        {/* 3x3 Grid of Categories */}
        <div className="w-full grid grid-cols-3 gap-2.5 sm:gap-3 mb-4">
          {INITIAL_CATEGORIES.map((cat) => {
            const isSelected = selectedIds.includes(cat.id);
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => toggleCategory(cat.id)}
                className={`relative aspect-[1/1.05] rounded-2xl flex flex-col items-center justify-center p-2 transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'border-2 border-[#544ee5] bg-[#f2f5fe] shadow-[0_4px_12px_rgba(84,78,229,0.1)]'
                    : 'border border-[#e3e8f7] bg-white/95 hover:bg-white hover:border-slate-300 shadow-[0_2px_6px_rgba(50,70,140,0.03)]'
                } active:scale-95`}
              >
                {/* Checkmark badge when selected */}
                {isSelected && (
                  <div className="absolute top-1.5 right-1.5 w-[18px] h-[18px] rounded-full bg-[#544ee5] text-white flex items-center justify-center shadow-sm animate-in zoom-in-75 duration-100">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}

                {/* Category Icon */}
                <div className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center mb-1">
                  <img
                    src={cat.icon}
                    alt={cat.name}
                    className="max-w-full max-h-full object-contain pointer-events-none drop-shadow-sm"
                  />
                </div>

                {/* Category Name */}
                <span className="text-[12.5px] sm:text-[13px] font-bold text-[#111936] tracking-tight leading-none">
                  {cat.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Single Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full h-[52px] sm:h-[54px] bg-[#544ee5] hover:bg-[#4842db] active:bg-[#3f39cc] text-white font-bold text-[15.5px] rounded-full shadow-[0_6px_20px_rgba(84,78,229,0.32)] btn-interactive flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Continue</span>
          <ArrowRight className="w-5 h-5 stroke-[2.4]" />
        </button>
      </div>

      {/* Bottom Coastal Artwork with Script Quote (No duplicate button) */}
      <div className="w-full relative shrink-0">
        <img
          src="/c3-bottom-scenery.png"
          alt="Santorini Coastal Illustration - Great Places Brighter Days"
          className="w-full h-auto object-cover pointer-events-none block"
        />
      </div>

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
