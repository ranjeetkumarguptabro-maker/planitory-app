import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Check, CheckCircle2 } from 'lucide-react';

const GOALS = [
  {
    id: 'maps',
    title: 'Ready-made travel maps',
    subtitle: 'Curated routes with top places',
    icon: '/c5-icon-maps.png',
  },
  {
    id: 'local',
    title: 'Local recommendations',
    subtitle: 'From real travelers and locals',
    icon: '/c5-icon-local.png',
  },
  {
    id: 'unique',
    title: 'Unique places',
    subtitle: 'Hidden gems off the beaten path',
    icon: '/c5-icon-unique.png',
  },
  {
    id: 'inspiration',
    title: 'Trip inspiration',
    subtitle: 'Ideas for my next adventure',
    icon: '/c5-icon-inspiration.png',
  },
];

export default function TravelGoalsPage({ onBack, onNavigate }) {
  const [selectedGoal, setSelectedGoal] = useState('maps');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const handleStartExploring = () => {
    showToast("Welcome to Planitory! Your personalized map is ready!");
    if (onNavigate) onNavigate('explore');
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

          {/* 3-Step Segmented Progress Bar (3 / 3 ALL filled) */}
          <div className="flex-1 max-w-[190px] flex items-center gap-1.5 px-1">
            <div className="h-[4px] flex-1 rounded-full bg-[#544ee5]" />
            <div className="h-[4px] flex-1 rounded-full bg-[#544ee5]" />
            <div className="h-[4px] flex-1 rounded-full bg-[#544ee5]" />
          </div>

          {/* Step Indicator */}
          <span className="text-[13.5px] font-semibold text-[#64748b] tracking-wide shrink-0">
            3 / 3
          </span>
        </div>
      </div>

      {/* Main Scrollable Content Area */}
      <div className="w-full flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y scrollbar-none flex flex-col justify-between">
        <div className="w-full px-5 sm:px-6 flex flex-col items-center text-center pt-2 pb-4">
          {/* Soft Periwinkle Emblem with 3D Compass Needle */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#eeeefa] flex items-center justify-center shadow-[0_4px_16px_rgba(84,78,229,0.12)] mb-2">
            <img
              src="/c5-compass-badge.png"
              alt="Compass Navigation"
              className="w-full h-full object-contain rounded-full pointer-events-none drop-shadow-sm"
            />
          </div>

          {/* Headline */}
          <h1 className="text-[20px] sm:text-[22px] font-extrabold text-[#0e1738] tracking-[-0.02em] leading-tight mb-1">
            What are you looking for?
          </h1>

          {/* Subtitle */}
          <p className="text-[12.5px] sm:text-[13px] leading-snug text-[#737ea1] max-w-[270px] mb-3">
            This helps us create a better experience for you.
          </p>

          {/* List of 4 Goals Options */}
          <div className="w-full flex flex-col gap-2.5 mb-4">
            {GOALS.map((goal) => {
              const isSelected = selectedGoal === goal.id;
              return (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() => setSelectedGoal(goal.id)}
                  className={`w-full h-[60px] sm:h-[64px] px-3 sm:px-3.5 rounded-2xl flex items-center justify-between transition-all duration-150 cursor-pointer ${
                    isSelected
                      ? 'border-2 border-[#544ee5] bg-[#f4f6fe] shadow-[0_4px_14px_rgba(84,78,229,0.1)]'
                      : 'border border-[#e4e8f7] bg-white/95 hover:bg-white hover:border-slate-300 shadow-[0_2px_6px_rgba(50,70,140,0.03)]'
                  } active:scale-[0.985]`}
                >
                  {/* Left: Icon & Text */}
                  <div className="flex items-center gap-3 text-left">
                    <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center shrink-0">
                      <img
                        src={goal.icon}
                        alt={goal.title}
                        className="max-w-full max-h-full object-contain pointer-events-none drop-shadow-xs"
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13.5px] sm:text-[14px] font-bold text-[#111936] tracking-tight leading-tight">
                        {goal.title}
                      </span>
                      <span className="text-[11.5px] sm:text-[12px] text-[#717ea1] leading-tight mt-0.5">
                        {goal.subtitle}
                      </span>
                    </div>
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

          {/* Single Primary Action Button */}
          <button
            onClick={handleStartExploring}
            className="w-full h-[52px] sm:h-[54px] bg-[#544ee5] hover:bg-[#4842db] active:bg-[#3f39cc] text-white font-bold text-[15.5px] rounded-full shadow-[0_6px_20px_rgba(84,78,229,0.32)] btn-interactive flex items-center justify-center gap-2 cursor-pointer mb-3"
          >
            <span>Start Exploring</span>
            <ArrowRight className="w-5 h-5 stroke-[2.4]" />
          </button>
        </div>

        {/* Bottom Kangaroo & Coastal Scenery Artwork */}
        <div className="w-full relative shrink-0 mt-auto">
          <img
            src="/c5-bottom-scenery.png"
            alt="Planitory Kangaroo - Same Journeys Happier You"
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
