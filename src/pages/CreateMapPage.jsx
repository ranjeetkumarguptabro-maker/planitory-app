import React, { useState } from 'react';
import {
  Sparkles,
  Map as MapIcon,
  Plane,
  Heart,
  Image as ImageIcon,
  List,
  Plus,
  ArrowRight,
  Lightbulb,
  Home,
  Users,
  User,
  X,
  CheckCircle2
} from 'lucide-react';

export default function CreateMapPage({ onBack, onNavigate }) {
  // Mode toggle: 'map' | 'trip'
  const [activeMode, setActiveMode] = useState('map');

  // Type selector: 'custom' | 'trip' | 'saved'
  const [selectedType, setSelectedType] = useState('custom');

  // Input Fields
  const [mapTitle, setMapTitle] = useState('');
  const [mapDescription, setMapDescription] = useState('');

  // Modals & Feedback
  const [toastMessage, setToastMessage] = useState(null);
  const [showInspireModal, setShowInspireModal] = useState(false);
  const [step, setStep] = useState(1); // 1 = Details (matching create_page_first_image.png), 2 = Step 2 summary / finish

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // AI Suggestion helper
  const handleAiSuggest = () => {
    const suggestions = [
      {
        title: 'Hidden Cafés & Bakeries in Paris ☕',
        desc: 'A curated walking tour of secret courtyards, third-wave espresso bars, and flaky croissants in Le Marais.'
      },
      {
        title: 'Sunset Cliffs & Coastal Eats of Amalfi 🍋',
        desc: 'Cliffside vistas, swimming grottos, and authentic family-owned trattorias along the Italian coast.'
      },
      {
        title: 'Antalya & Cappadocia Complete Guide 🎈',
        desc: 'From Turquoise Coast beaches to Göreme sunrise balloon flights and ancient subterranean cities.'
      },
      {
        title: 'Tokyo Ramen & Neon Alleyways 🍜',
        desc: 'Late-night ramen dens, hidden speakeasies, and vibrant neighborhood street spots in Shibuya.'
      }
    ];

    const pick = suggestions[Math.floor(Math.random() * suggestions.length)];
    setMapTitle(pick.title);
    setMapDescription(pick.desc);
    showToast('✨ AI suggested a map title & description!');
  };

  const handleNext = () => {
    if (!mapTitle.trim()) {
      showToast('Please enter a title for your map');
      return;
    }
    showToast(`🎉 "${mapTitle}" created! Redirecting to explore...`);
    setTimeout(() => {
      if (onNavigate) onNavigate('explore');
    }, 1200);
  };

  return (
    <div className="relative w-full h-full bg-white sm:rounded-[44px] flex flex-col justify-between overflow-hidden select-none">
      {/* Scrollable Content Container */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y pb-28 scrollbar-none">
        {/* iOS Status Bar */}
        <div className="pt-3 sm:pt-4 px-6 shrink-0 bg-white">
          <div className="flex items-center justify-between text-xs font-semibold text-[#0f1738] mb-2 px-0.5">
            <span className="text-[14px] tracking-tight font-bold">9:41</span>
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

          {/* Header Row: Create + Get Inspired Pill Button */}
          <div className="flex items-start justify-between pt-1 pb-1">
            <div>
              <h1 className="text-[32px] sm:text-[34px] font-black text-[#0f1738] tracking-tight leading-none">
                Create
              </h1>
              <p className="text-[13.5px] text-[#717ea1] font-medium mt-1.5">
                Turn your ideas into amazing maps.
              </p>
            </div>

            {/* Get Inspired Button */}
            <button
              onClick={() => setShowInspireModal(true)}
              className="px-3.5 py-1.5 bg-white border border-slate-200/90 rounded-full shadow-2xs text-[12px] font-bold text-[#0f1738] hover:bg-slate-50 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer mt-0.5"
            >
              <span className="text-[14px]">💡</span>
              <span>Get Inspired</span>
            </button>
          </div>
        </div>

        {/* Top 2-Segment Switcher (Create a Map / Plan a Trip) */}
        <div className="px-5 sm:px-6 pt-3">
          <div className="bg-[#eef1f8] p-1 rounded-2xl flex items-center gap-1">
            <button
              onClick={() => setActiveMode('map')}
              className={`flex-1 py-2.5 sm:py-3 rounded-xl font-bold text-[13px] sm:text-[13.5px] flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeMode === 'map'
                  ? 'bg-[#544ee5] text-white shadow-sm'
                  : 'text-[#0f1738] hover:text-[#544ee5]'
              }`}
            >
              <MapIcon className="w-4 h-4 stroke-[2.2]" />
              <span>Create a Map</span>
            </button>
            <button
              onClick={() => {
                setActiveMode('trip');
                showToast('Switched to Plan a Trip 📅');
              }}
              className={`flex-1 py-2.5 sm:py-3 rounded-xl font-bold text-[13px] sm:text-[13.5px] flex items-center justify-center gap-2 transition-all cursor-pointer ${
                activeMode === 'trip'
                  ? 'bg-[#544ee5] text-white shadow-sm'
                  : 'text-[#0f1738] hover:text-[#544ee5]'
              }`}
            >
              <span>📅</span>
              <span>Plan a Trip</span>
            </button>
          </div>
        </div>

        {/* Section 1: What do you want to create? */}
        <div className="px-5 sm:px-6 pt-5">
          <h2 className="text-[16.5px] sm:text-[17.5px] font-black text-[#0f1738] tracking-tight mb-3">
            What do you want to create?
          </h2>

          <div className="grid grid-cols-3 gap-2.5">
            {/* Card 1: Custom Map */}
            <div
              onClick={() => setSelectedType('custom')}
              className={`p-3 sm:p-3.5 rounded-2xl flex flex-col items-center text-center cursor-pointer transition-all ${
                selectedType === 'custom'
                  ? 'border-2 border-[#544ee5] bg-[#f7f8ff] shadow-xs ring-2 ring-[#544ee5]/10'
                  : 'border border-slate-200/90 bg-white hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="w-8 h-8 flex items-center justify-center text-[#544ee5] mb-2">
                <MapIcon className="w-7 h-7 stroke-[2.2]" />
              </div>
              <span className="font-extrabold text-[13px] text-[#0f1738] leading-snug">
                Custom Map
              </span>
              <span className="text-[9.5px] sm:text-[10px] text-[#717ea1] font-medium leading-tight mt-1">
                Add places, notes and share
              </span>
            </div>

            {/* Card 2: Trip Itinerary */}
            <div
              onClick={() => setSelectedType('trip')}
              className={`p-3 sm:p-3.5 rounded-2xl flex flex-col items-center text-center cursor-pointer transition-all ${
                selectedType === 'trip'
                  ? 'border-2 border-[#544ee5] bg-[#f7f8ff] shadow-xs ring-2 ring-[#544ee5]/10'
                  : 'border border-slate-200/90 bg-white hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="w-8 h-8 flex items-center justify-center text-[#0ea5e9] mb-2">
                <Plane className="w-7 h-7 fill-current" />
              </div>
              <span className="font-extrabold text-[13px] text-[#0f1738] leading-snug">
                Trip Itinerary
              </span>
              <span className="text-[9.5px] sm:text-[10px] text-[#717ea1] font-medium leading-tight mt-1">
                Plan day by day
              </span>
            </div>

            {/* Card 3: Saved Collection */}
            <div
              onClick={() => setSelectedType('saved')}
              className={`p-3 sm:p-3.5 rounded-2xl flex flex-col items-center text-center cursor-pointer transition-all ${
                selectedType === 'saved'
                  ? 'border-2 border-[#544ee5] bg-[#f7f8ff] shadow-xs ring-2 ring-[#544ee5]/10'
                  : 'border border-slate-200/90 bg-white hover:border-slate-300 shadow-2xs'
              }`}
            >
              <div className="w-8 h-8 flex items-center justify-center text-[#f43f5e] mb-2">
                <Heart className="w-7 h-7 fill-current" />
              </div>
              <span className="font-extrabold text-[13px] text-[#0f1738] leading-snug">
                Saved Collection
              </span>
              <span className="text-[9.5px] sm:text-[10px] text-[#717ea1] font-medium leading-tight mt-1">
                Keep your favorites
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: Map Details + AI Suggest */}
        <div className="px-5 sm:px-6 pt-5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[16.5px] sm:text-[17.5px] font-black text-[#0f1738] tracking-tight">
              Map Details
            </h2>
            <button
              onClick={handleAiSuggest}
              className="text-[#544ee5] hover:text-[#4338ca] text-[13px] font-black flex items-center gap-1 cursor-pointer active:scale-95 transition-all"
            >
              <Sparkles className="w-4 h-4 fill-[#544ee5]" />
              <span>AI Suggest</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {/* Title Input */}
            <div className="flex items-center gap-3 px-4 py-3.5 bg-white border border-slate-200/90 rounded-2xl focus-within:border-[#544ee5] focus-within:ring-2 focus-within:ring-indigo-100/60 shadow-2xs transition-all">
              <ImageIcon className="w-5 h-5 text-[#8e9bb5] shrink-0 stroke-[2]" />
              <input
                type="text"
                value={mapTitle}
                onChange={(e) => setMapTitle(e.target.value)}
                placeholder="Give your map a title..."
                className="w-full bg-transparent text-[14px] font-semibold text-[#0f1738] placeholder:text-[#8e9bb5] outline-none"
              />
              {mapTitle && (
                <button
                  onClick={() => setMapTitle('')}
                  className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Description Input */}
            <div className="flex items-center gap-3 px-4 py-3.5 bg-white border border-slate-200/90 rounded-2xl focus-within:border-[#544ee5] focus-within:ring-2 focus-within:ring-indigo-100/60 shadow-2xs transition-all">
              <List className="w-5 h-5 text-[#8e9bb5] shrink-0 stroke-[2]" />
              <input
                type="text"
                value={mapDescription}
                onChange={(e) => setMapDescription(e.target.value)}
                placeholder="Tell us about your map (optional)..."
                className="w-full bg-transparent text-[14px] font-semibold text-[#0f1738] placeholder:text-[#8e9bb5] outline-none"
              />
              {mapDescription && (
                <button
                  onClick={() => setMapDescription('')}
                  className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Primary Action Button: Next → */}
        <div className="px-5 sm:px-6 pt-7">
          <button
            onClick={handleNext}
            className="w-full py-4 rounded-full bg-[#544ee5] hover:bg-[#4338ca] active:scale-[0.99] text-white font-black text-[15px] flex items-center justify-center gap-2 shadow-lg shadow-indigo-300/40 transition-all cursor-pointer"
          >
            <span>Next</span>
            <ArrowRight className="w-4.5 h-4.5 stroke-[2.8]" />
          </button>
        </div>
      </div>

      {/* Floating Bottom Navigation Bar matching create_page_first_image.png */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 pt-2 pb-3 sm:pb-2.5 shadow-[0_-4px_20px_rgba(50,70,140,0.04)] flex items-center justify-between">
        {/* Explore Tab */}
        <button
          onClick={() => {
            if (onNavigate) onNavigate('explore');
          }}
          className="flex flex-col items-center gap-1 text-[#717ea1] hover:text-[#111936] transition-all cursor-pointer"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10.5px] font-semibold">Explore</span>
        </button>

        {/* My Maps Tab */}
        <button
          onClick={() => {
            if (onNavigate) onNavigate('purchased-map');
          }}
          className="flex flex-col items-center gap-1 text-[#717ea1] hover:text-[#111936] transition-all cursor-pointer"
        >
          <MapIcon className="w-5 h-5" />
          <span className="text-[10.5px] font-semibold">My Maps</span>
        </button>

        {/* Center Floating Action Button (+ Create - ACTIVE) */}
        <div className="-mt-6 flex flex-col items-center">
          <button
            onClick={() => showToast('You are on the Create page')}
            className="w-13 h-13 rounded-full bg-[#544ee5] hover:bg-[#4842db] active:scale-95 text-white flex items-center justify-center shadow-lg shadow-indigo-300 transition-all cursor-pointer"
            title="Create"
          >
            <Plus className="w-7 h-7 stroke-[2.8]" />
          </button>
          <span className="text-[10.5px] font-bold text-[#544ee5] mt-0.5">Create</span>
        </div>

        {/* Creators Tab */}
        <button
          onClick={() => {
            if (onNavigate) onNavigate('creators');
          }}
          className="flex flex-col items-center gap-1 text-[#717ea1] hover:text-[#111936] transition-all cursor-pointer"
        >
          <Users className="w-5 h-5" />
          <span className="text-[10.5px] font-semibold">Creators</span>
        </button>

        {/* Profile Tab */}
        <button
          onClick={() => {
            if (onNavigate) onNavigate('user-profile');
          }}
          className="flex flex-col items-center gap-1 text-[#717ea1] hover:text-[#111936] transition-all cursor-pointer"
        >
          <User className="w-5 h-5" />
          <span className="text-[10.5px] font-semibold">Profile</span>
        </button>
      </div>

      {/* Inspiration Modal */}
      {showInspireModal && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-6 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl border border-slate-100 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-[18px]">💡</span>
                <h3 className="text-base font-extrabold text-[#0f1738]">Map Ideas &amp; Inspo</h3>
              </div>
              <button
                onClick={() => setShowInspireModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3.5 space-y-2.5 overflow-y-auto max-h-[60vh] pr-0.5">
              {[
                { title: 'Top 7 Gelaterias in Florence 🍨', tag: 'Foodie', desc: 'Taste tests and flavor recommendations across the Arno river.' },
                { title: 'Secret Rooftops of Tokyo 🌆', tag: 'Views', desc: 'Cocktail bars and observation decks off the beaten tourist path.' },
                { title: 'Weekend Hiking in Chamonix 🏔️', tag: 'Outdoors', desc: 'Beginner-to-intermediate ridge walks with Mont Blanc views.' },
                { title: 'Antalya Turquoise Coast Road Trip 🌊', tag: 'Road Trip', desc: 'Mediterranean cliffside cafes, secluded coves and Roman ruins.' }
              ].map((idea, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setMapTitle(idea.title);
                    setMapDescription(idea.desc);
                    setShowInspireModal(false);
                    showToast(`Loaded: "${idea.title}"`);
                  }}
                  className="p-3 bg-slate-50 hover:bg-indigo-50/70 border border-slate-200/80 rounded-2xl cursor-pointer transition-all"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-[#0f1738]">{idea.title}</h4>
                    <span className="text-[10px] font-bold text-[#544ee5] bg-indigo-100/60 px-2 py-0.5 rounded-full">
                      {idea.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#717ea1] mt-1 font-medium">{idea.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Live Toast Notification */}
      {toastMessage && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-[#0f1738]/95 backdrop-blur-md text-white px-4 py-2 rounded-full text-[12px] font-bold shadow-xl flex items-center gap-2 border border-white/10 animate-in fade-in zoom-in-95 duration-150">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
