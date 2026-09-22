import React, { useState } from 'react';
import {
  ArrowLeft,
  Settings,
  Pencil,
  Camera,
  Navigation,
  SlidersHorizontal,
  Bookmark,
  Coffee,
  Star,
  Home,
  Map as MapIcon,
  Plus,
  User,
  Users,
  ArrowRight,
  CheckCircle2,
  X,
  Palette,
  Eye
} from 'lucide-react';

const PIN_ITEMS = [
  { id: 'm1', type: 'museum', name: 'Louvre Museum', area: '1st Arr.', x: '58%', y: '40%' },
  { id: 'm2', type: 'museum', name: 'Musée d’Orsay', area: '7th Arr.', x: '32%', y: '32%' },
  { id: 'm3', type: 'museum', name: 'Centre Pompidou', area: '4th Arr.', x: '66%', y: '24%' },
  { id: 'm4', type: 'museum', name: 'Musée Rodin', area: '7th Arr.', x: '28%', y: '48%' },
  { id: 'm5', type: 'museum', name: 'Musée de Cluny', area: '5th Arr.', x: '68%', y: '50%' },
  { id: 'c1', type: 'cafe', name: 'Café de Flore', area: '6th Arr.', x: '44%', y: '27%' },
  { id: 'c2', type: 'cafe', name: 'Les Deux Magots', area: '6th Arr.', x: '71%', y: '34%' },
  { id: 'c3', type: 'cafe', name: 'Carette', area: '4th Arr.', x: '11%', y: '35%' },
  { id: 'c4', type: 'cafe', name: 'Boot Café', area: '3rd Arr.', x: '54%', y: '54%' },
  { id: 'c5', type: 'cafe', name: 'Café Kitsuné', area: '1st Arr.', x: '72%', y: '57%' },
  { id: 'p1', type: 'place', name: 'Tour Eiffel', area: '7th Arr.', x: '38%', y: '43%' },
  { id: 'p2', type: 'place', name: 'Arc de Triomphe', area: '8th Arr.', x: '84%', y: '28%' },
  { id: 'p3', type: 'place', name: 'Notre-Dame Cathedral', area: '4th Arr.', x: '87%', y: '51%' },
];

export default function PurchasedMapView({ onBack, onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedPin, setSelectedPin] = useState(null);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [pinThemeColor, setPinThemeColor] = useState('default');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleLocateMe = () => {
    showToast("GPS Centered: You are near the Seine River, 1st Arrondissement");
  };

  return (
    <div className="relative w-full h-full min-h-[720px] max-h-[960px] aspect-[9/16] select-none overflow-hidden rounded-[32px] sm:rounded-[44px] shadow-2xl bg-[#fafbfe] flex flex-col justify-between">
      {/* Top Header & Status Bar Area */}
      <div className="w-full pt-3 sm:pt-4 px-6 z-20 shrink-0 bg-[#fafbfe]/95 backdrop-blur-md">
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

        {/* Title Bar & Settings */}
        <div className="flex items-center justify-between py-1">
          <button
            onClick={onBack}
            className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center text-[#111936] hover:bg-slate-100 active:scale-95 transition-all"
            title="Go back"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
          </button>

          <div className="flex flex-col items-center">
            <h1 className="text-[17.5px] sm:text-[18.5px] font-extrabold text-[#0f1738] tracking-tight leading-tight">
              Paris Essentials
            </h1>
            <span className="text-[11.5px] text-[#717ea1] font-medium tracking-tight">
              Museums &bull; Cafés &bull; Top Places
            </span>
          </div>

          <button
            onClick={() => showToast("Map Settings: Offline cache enabled, units: km")}
            className="w-9 h-9 -mr-2 rounded-full flex items-center justify-center text-[#111936] hover:bg-slate-100 active:scale-95 transition-all"
            title="Settings"
          >
            <Settings className="w-5 h-5 text-[#111936]" />
          </button>
        </div>

        {/* Category Filter Pills Row */}
        <div className="flex items-center gap-2 py-2 overflow-x-auto scrollbar-none">
          {/* All */}
          <button
            onClick={() => {
              setActiveCategory('all');
              showToast("Showing all 15 locations");
            }}
            className={`px-4 py-1.5 rounded-full font-bold text-[12.5px] transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-[#544ee5] text-white shadow-xs'
                : 'bg-white text-[#717ea1] border border-slate-200/80 hover:text-slate-900'
            }`}
          >
            All
          </button>

          {/* Museums */}
          <button
            onClick={() => {
              setActiveCategory('museum');
              showToast("Filtered: 5 Museums");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-[12.5px] transition-all cursor-pointer ${
              activeCategory === 'museum'
                ? 'bg-[#544ee5] text-white shadow-xs'
                : 'bg-white text-[#717ea1] border border-slate-200/80 hover:text-slate-900'
            }`}
          >
            <span className="w-4 h-4 flex items-center justify-center text-xs">🏛️</span>
            <span>Museums</span>
          </button>

          {/* Cafés */}
          <button
            onClick={() => {
              setActiveCategory('cafe');
              showToast("Filtered: 5 Cafés");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-[12.5px] transition-all cursor-pointer ${
              activeCategory === 'cafe'
                ? 'bg-[#544ee5] text-white shadow-xs'
                : 'bg-white text-[#717ea1] border border-slate-200/80 hover:text-slate-900'
            }`}
          >
            <span className="w-4 h-4 flex items-center justify-center text-xs">☕</span>
            <span>Cafés</span>
          </button>

          {/* Places */}
          <button
            onClick={() => {
              setActiveCategory('place');
              showToast("Filtered: Top Landmark Places");
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-[12.5px] transition-all cursor-pointer ${
              activeCategory === 'place'
                ? 'bg-[#544ee5] text-white shadow-xs'
                : 'bg-white text-[#717ea1] border border-slate-200/80 hover:text-slate-900'
            }`}
          >
            <span className="w-4 h-4 flex items-center justify-center text-xs">⭐</span>
            <span>Places</span>
          </button>
        </div>
      </div>

      {/* Main Content: Map Container + Bottom Sheet */}
      <div className="flex-1 flex flex-col justify-between px-5 sm:px-6 relative overflow-hidden pb-20">
        {/* Paris Map Canvas Card */}
        <div className="relative w-full aspect-[1/1.08] rounded-[24px] sm:rounded-[26px] overflow-hidden shadow-[0_8px_24px_rgba(50,70,140,0.08)] border border-[#e4e8f7]">
          {/* Map Graphic Backdrop */}
          <img
            src="/c10-paris-map.png"
            alt="Interactive Map of Paris"
            className="w-full h-full object-cover pointer-events-none"
          />

          {/* Top-Right Layer Settings Hitbox over baked icon */}
          <button
            onClick={() => showToast("Layers: Landmarks, Transit, 3D Buildings enabled")}
            className="absolute top-[3%] right-[3%] w-[10%] aspect-square rounded-full cursor-pointer hover:bg-black/10 active:scale-95 transition-all z-20"
            title="Map Layers"
          />

          {/* Bottom-Left: "Customize Map" Hitbox over baked pill */}
          <button
            onClick={() => setShowCustomizeModal(true)}
            className="absolute bottom-[3.5%] left-[3.5%] w-[45%] h-[8%] rounded-full cursor-pointer hover:bg-black/5 active:scale-95 transition-all z-20"
            title="Customize Map"
          />

          {/* Bottom-Right: GPS Compass Navigation Hitbox over baked blue circle */}
          <button
            onClick={handleLocateMe}
            className="absolute bottom-[3.5%] right-[3.5%] w-[11%] aspect-square rounded-full cursor-pointer hover:bg-black/10 active:scale-95 transition-all z-20"
            title="Locate me"
          />

          {/* Interactive Clickable Hotspots for Pin Detail Preview */}
          {PIN_ITEMS.map((pin) => {
            const isVisible = activeCategory === 'all' || activeCategory === pin.type;
            if (!isVisible) return null;

            return (
              <button
                key={pin.id}
                onClick={() => {
                  setSelectedPin(pin);
                  showToast(`Selected: ${pin.name} (${pin.area})`);
                }}
                style={{ left: pin.x, top: pin.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full z-10 opacity-0 hover:opacity-100 bg-[#544ee5]/15 ring-2 ring-[#544ee5] transition-all cursor-pointer flex items-center justify-center"
                title={pin.name}
              />
            );
          })}

          {/* Active Pin Info Card Overlay */}
          {selectedPin && (
            <div className="absolute top-3 left-3.5 right-14 bg-white/95 backdrop-blur-md p-2.5 rounded-2xl shadow-xl border border-indigo-100 z-30 flex items-center justify-between animate-in fade-in duration-150">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#0f1738]">{selectedPin.name}</span>
                <span className="text-[10.5px] text-[#717ea1]">{selectedPin.area} &bull; Open today</span>
              </div>
              <button
                onClick={() => setSelectedPin(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Bottom Sheet / Panel Overlay */}
        <div className="w-full bg-white rounded-3xl p-3.5 sm:p-4 shadow-[0_4px_20px_rgba(50,70,140,0.06)] border border-[#e8ecf8] space-y-3 mt-2.5">
          {/* Grab Handle */}
          <div className="w-9 h-1 rounded-full bg-slate-200 mx-auto -mt-1 mb-1" />

          {/* "Customize Your Map" Banner */}
          <div className="flex items-start gap-2.5">
            <div className="w-7 h-7 rounded-full bg-indigo-50 text-[#544ee5] flex items-center justify-center shrink-0 mt-0.5">
              <Pencil className="w-3.5 h-3.5" />
            </div>
            <div className="flex-1">
              <h3 className="text-[13.5px] font-extrabold text-[#0f1738] tracking-tight leading-tight">
                Customize Your Map
              </h3>
              <p className="text-[11px] text-[#717ea1] leading-tight mt-0.5">
                Change icon style, color and more to make your map unique.
              </p>
            </div>
          </div>

          {/* Customize Button */}
          <button
            onClick={() => setShowCustomizeModal(true)}
            className="w-full h-[44px] sm:h-[46px] bg-[#544ee5] hover:bg-[#4842db] active:bg-[#3f39cc] text-white font-bold text-[14px] rounded-2xl shadow-[0_4px_16px_rgba(84,78,229,0.28)] btn-interactive flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Customize</span>
            <ArrowRight className="w-4 h-4 stroke-[2.4]" />
          </button>

          {/* 3 Stats Summary Cards (Horizontal Row) */}
          <div className="grid grid-cols-3 gap-2 pt-0.5">
            {/* 5 Museums */}
            <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-[#f4f6fe] border border-indigo-50/50">
              <span className="text-base mb-0.5">🏛️</span>
              <span className="text-[14px] font-black text-[#0f1738] leading-none">5</span>
              <span className="text-[11px] font-semibold text-[#717ea1] mt-0.5">Museums</span>
            </div>

            {/* 5 Cafés */}
            <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-[#fff1f0] border border-rose-50/50">
              <span className="text-base mb-0.5">☕</span>
              <span className="text-[14px] font-black text-[#0f1738] leading-none">5</span>
              <span className="text-[11px] font-semibold text-[#717ea1] mt-0.5">Cafés</span>
            </div>

            {/* 15 Places */}
            <div className="flex flex-col items-center justify-center p-2 rounded-2xl bg-[#e8f7f2] border border-emerald-50/50">
              <span className="text-base mb-0.5">⭐</span>
              <span className="text-[14px] font-black text-[#0f1738] leading-none">15</span>
              <span className="text-[11px] font-semibold text-[#717ea1] mt-0.5">Places</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Navigation Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#e8ecf8] px-6 py-2 shadow-[0_-4px_20px_rgba(50,70,140,0.06)] flex items-center justify-between">
        {/* Explore Tab */}
        <button
          onClick={() => {
            if (onNavigate) onNavigate('explore');
          }}
          className="flex flex-col items-center gap-1 text-[#717ea1] hover:text-[#111936] transition-all cursor-pointer"
        >
          <Home className="w-5 h-5" />
          <span className="text-[11px] font-semibold">Explore</span>
        </button>

        {/* My Maps Tab (ACTIVE in purple in c10.png!) */}
        <button
          onClick={() => showToast("You are viewing Paris Essentials")}
          className="flex flex-col items-center gap-1 text-[#544ee5] transition-all cursor-pointer"
        >
          <MapIcon className="w-5 h-5 fill-current" />
          <span className="text-[11px] font-bold">My Maps</span>
        </button>

        {/* Center Floating Action Button (+ Create) */}
        <div className="-mt-6 flex flex-col items-center">
          <button
            onClick={() => showToast("Add a new custom pin to Paris Essentials")}
            className="w-13 h-13 rounded-full bg-[#544ee5] hover:bg-[#4842db] active:scale-95 text-white flex items-center justify-center shadow-lg shadow-indigo-300 transition-all cursor-pointer"
            title="Add Pin"
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
            else showToast("Opening Profile");
          }}
          className="flex flex-col items-center gap-1 text-[#717ea1] hover:text-[#111936] transition-all cursor-pointer"
        >
          <User className="w-5 h-5" />
          <span className="text-[10.5px] font-semibold">Profile</span>
        </button>
      </div>

      {/* Map Customization Modal */}
      {showCustomizeModal && (
        <div className="absolute inset-0 bg-black/45 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-indigo-50 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2 text-[#544ee5]">
                <Palette className="w-5 h-5" />
                <h3 className="font-bold text-[#111936] text-base">Customize Map</h3>
              </div>
              <button
                onClick={() => setShowCustomizeModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-[#717ea1] mb-4">
              Select your favorite theme palette for pins and map accents:
            </p>

            {/* Color Palette Choices */}
            <div className="grid grid-cols-4 gap-2 mb-5">
              {[
                { id: 'default', name: 'Original', bg: 'bg-[#544ee5]' },
                { id: 'rose', name: 'Pastel', bg: 'bg-[#e1496a]' },
                { id: 'emerald', name: 'Emerald', bg: 'bg-[#10b981]' },
                { id: 'sunset', name: 'Sunset', bg: 'bg-[#f59e0b]' },
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setPinThemeColor(c.id)}
                  className={`p-2 rounded-2xl flex flex-col items-center gap-1.5 border transition-all ${
                    pinThemeColor === c.id
                      ? 'border-[#544ee5] bg-indigo-50/50 ring-2 ring-[#544ee5]/20'
                      : 'border-slate-100 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-full ${c.bg} shadow-xs`} />
                  <span className="text-[11px] font-bold text-slate-700">{c.name}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                setShowCustomizeModal(false);
                showToast("Map styles updated!");
              }}
              className="w-full py-3 bg-[#544ee5] hover:bg-[#4842db] text-white font-bold rounded-xl text-sm shadow-md shadow-indigo-200 transition-all"
            >
              Apply Theme
            </button>
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
