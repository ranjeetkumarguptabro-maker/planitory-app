import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, CheckCircle2 } from 'lucide-react';

const REGIONS = [
  {
    id: 'europe',
    name: 'Europe',
    thumbnail: '/c4-thumb-europe.png',
  },
  {
    id: 'asia',
    name: 'Asia',
    thumbnail: '/c4-thumb-asia.png',
  },
  {
    id: 'americas',
    name: 'Americas',
    thumbnail: '/c4-thumb-americas.png',
  },
  {
    id: 'local',
    name: 'Local trips',
    thumbnail: '/c4-thumb-local.png',
  },
  {
    id: 'anywhere',
    name: 'Anywhere',
    thumbnail: '/c4-thumb-anywhere.png',
  },
];

export default function TravelRegionsPage({ onBack, onNavigate }) {
  const [selectedRegion, setSelectedRegion] = useState('europe');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const handleContinue = () => {
    const chosen = REGIONS.find((r) => r.id === selectedRegion)?.name || 'Europe';
    showToast(`Region selected: ${chosen}`);
    if (onNavigate) onNavigate('preferences');
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#fafbfe] sm:rounded-[44px] flex flex-col justify-between">
      {/* Top Header & Status Bar Area */}
      <div className="w-full pt-3 sm:pt-4 px-6 z-20 shrink-0 bg-[#fafbfe]/95 backdrop-blur-md">
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
        <div className="flex items-center justify-between gap-3 mt-1 pb-2">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center text-[#12183a] hover:bg-slate-100 active:scale-95 transition-all shrink-0 cursor-pointer"
            title="Go back"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
          </button>

          {/* 3-Step Segmented Progress Bar (1 / 3 filled) */}
          <div className="flex-1 max-w-[190px] flex items-center gap-1.5 px-1">
            <div className="h-[4px] flex-1 rounded-full bg-[#544ee5]" />
            <div className="h-[4px] flex-1 rounded-full bg-[#dbe1f5]" />
            <div className="h-[4px] flex-1 rounded-full bg-[#dbe1f5]" />
          </div>

          {/* Step Indicator */}
          <span className="text-[13.5px] font-semibold text-[#64748b] tracking-wide shrink-0">
            1 / 3
          </span>
        </div>
      </div>

      {/* Main Scrollable Content Area */}
      <div className="w-full flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y scrollbar-none flex flex-col justify-between">
        <div className="w-full px-5 sm:px-6 flex flex-col items-center text-center pt-2 pb-4">
          {/* Soft Lavender Emblem with 3D Purple Map Pin */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#eeeefa] flex items-center justify-center shadow-[0_4px_16px_rgba(84,78,229,0.12)] mb-2">
            <img
              src="/c4-pin-badge.png"
              alt="Travel Location Pin"
              className="w-full h-full object-contain rounded-full pointer-events-none drop-shadow-sm"
            />
          </div>

          {/* Headline */}
          <h1 className="text-[20px] sm:text-[22px] font-extrabold text-[#0e1738] tracking-[-0.02em] leading-tight mb-1">
            Where do you usually travel?
          </h1>

          {/* Subtitle */}
          <p className="text-[12.5px] sm:text-[13px] leading-snug text-[#737ea1] max-w-[270px] mb-3">
            This helps us show you the most relevant maps and recommendations.
          </p>

          {/* Destination List (5 Items) */}
          <div className="w-full flex flex-col gap-2.5 mb-4">
            {REGIONS.map((region) => {
              const isSelected = selectedRegion === region.id;
              return (
                <button
                  key={region.id}
                  type="button"
                  onClick={() => setSelectedRegion(region.id)}
                  className={`w-full h-[52px] sm:h-[56px] px-2.5 sm:px-3 rounded-2xl flex items-center justify-between transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'border-2 border-[#544ee5] bg-[#f4f6fe] shadow-[0_4px_14px_rgba(84,78,229,0.1)]'
                      : 'border border-[#e4e8f7] bg-white/95 hover:bg-white hover:border-slate-300 shadow-[0_2px_6px_rgba(50,70,140,0.03)]'
                  } active:scale-[0.985]`}
                >
                  {/* Left: Thumbnail & Name */}
                  <div className="flex items-center gap-3">
                    <img
                      src={region.thumbnail}
                      alt={region.name}
                      className="w-14 h-9 sm:w-[60px] sm:h-[38px] object-cover rounded-xl shadow-xs shrink-0 pointer-events-none"
                    />
                    <span className="text-[14px] sm:text-[14.5px] font-bold text-[#111936] tracking-tight">
                      {region.name}
                    </span>
                  </div>

                  {/* Right: Radio Indicator */}
                  <div className="pr-1 shrink-0">
                    {isSelected ? (
                      <div className="w-[22px] h-[22px] rounded-full bg-[#544ee5] text-white flex items-center justify-center shadow-sm animate-in zoom-in-75 duration-100">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-[22px] h-[22px] rounded-full border-2 border-[#ccd4ea] bg-transparent" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Single Continue Button */}
          <button
            onClick={handleContinue}
            className="w-full h-[52px] sm:h-[54px] bg-[#544ee5] hover:bg-[#4842db] active:bg-[#3f39cc] text-white font-bold text-[15.5px] rounded-full shadow-[0_6px_20px_rgba(84,78,229,0.32)] btn-interactive flex items-center justify-center gap-2 cursor-pointer mb-3"
          >
            <span>Continue</span>
            <ArrowRight className="w-5 h-5 stroke-[2.4]" />
          </button>
        </div>

        {/* Bottom Coastal Artwork with Script Quote */}
        <div className="w-full relative shrink-0 mt-auto">
          <img
            src="/c4-bottom-scenery.png"
            alt="Santorini Coastal Illustration - Explore More Places"
            className="w-full h-auto object-cover pointer-events-none block"
          />
        </div>
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
