import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  Navigation,
  Crosshair,
  Layers,
  SlidersHorizontal,
  X,
  Check,
  Star,
  Bookmark,
  CheckCircle2,
  Home,
  Map as MapIcon,
  Users,
  User,
  Plus,
  Compass,
  Palette,
  Sparkles,
  Bed,
  Camera,
  Coffee,
  Landmark,
  Trees,
  UtensilsCrossed
} from 'lucide-react';

// Custom Map Pins matching c26.png exactly
export const MY_MAP_PINS = [
  {
    id: 'flore',
    name: 'Café de Flore',
    type: 'cafe',
    category: 'Café • Saint-Germain',
    address: '172 Boulevard Saint-Germain, 75006 Paris',
    rating: 4.8,
    reviews: '320',
    img: '/c7-photo-cafe-de-flore.png',
    x: 69.5,
    y: 24.2,
    color: '#854d0e', // Brown coffee pin in c26
    icon: 'coffee',
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Cafe+de+Flore+Paris',
  },
  {
    id: 'food-bistro',
    name: 'Le Comptoir du Relais',
    type: 'food',
    category: 'Restaurant • Odéon',
    address: '9 Carrefour de l’Odéon, 75006 Paris',
    rating: 4.9,
    reviews: '410',
    img: '/c7-photo-croissant.png',
    x: 71,
    y: 35.8,
    color: '#dc2626', // Red/pink fork & knife pin in c26
    icon: 'food',
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Le+Comptoir+du+Relais+Paris',
  },
  {
    id: 'camera-seine',
    name: 'Pont des Arts Viewpoint',
    type: 'camera',
    category: 'Photo Spot • Seine',
    address: 'Pont des Arts, 75006 Paris',
    rating: 4.9,
    reviews: '280',
    img: '/map-card-paris-hq.png',
    x: 80.2,
    y: 54.5,
    color: '#ca8a04', // Gold camera pin in c26
    icon: 'camera',
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Pont+des+Arts+Paris',
  },
  {
    id: 'park-tree',
    name: 'Jardin du Luxembourg',
    type: 'park',
    category: 'Park • 6th Arr.',
    address: '75006 Paris, France',
    rating: 4.9,
    reviews: '520',
    img: '/c4-thumb-europe.png',
    x: 33.8,
    y: 19,
    color: '#15803d', // Green tree pin in c26
    icon: 'park',
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Jardin+du+Luxembourg+Paris',
  },
  {
    id: 'museum-monument',
    name: 'Musée d’Orsay',
    type: 'museum',
    category: 'Museum • 7th Arr.',
    address: '1 Rue de la Légion d’Honneur, Paris',
    rating: 4.9,
    reviews: '340',
    img: '/c6-thumb-paris-museums.png',
    x: 26.8,
    y: 34.5,
    color: '#7e22ce', // Purple museum pin in c26
    icon: 'museum',
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Musee+dOrsay+Paris',
  },
  {
    id: 'hotel-stay',
    name: 'Hôtel Lutetia',
    type: 'hotel',
    category: 'Luxury Hotel • Rive Gauche',
    address: '45 Boulevard Raspail, 75006 Paris',
    rating: 4.8,
    reviews: '195',
    img: '/c8-thumb-paris.png',
    x: 27.8,
    y: 52.8,
    color: '#3b82f6', // Blue hotel bed pin in c26
    icon: 'hotel',
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Hotel+Lutetia+Paris',
  },
];

// Map Styles matching c27.png 3x2 grid
export const MAP_STYLES = [
  {
    id: 'default',
    name: 'Default',
    img: '/style-default.png',
    filter: 'none',
  },
  {
    id: 'light',
    name: 'Light',
    img: '/style-light.png',
    filter: 'brightness(1.12) contrast(0.92) saturate(0.8)',
  },
  {
    id: 'dark',
    name: 'Dark',
    img: '/style-dark.png',
    filter: 'invert(0.92) hue-rotate(180deg) brightness(0.85) contrast(1.15)',
  },
  {
    id: 'retro',
    name: 'Retro',
    img: '/style-retro.png',
    filter: 'sepia(0.5) contrast(1.1) brightness(0.96)',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    img: '/style-minimal.png',
    filter: 'grayscale(0.65) brightness(1.08) contrast(0.95)',
  },
  {
    id: 'night',
    name: 'Night',
    img: '/style-night.png',
    filter: 'invert(1) hue-rotate(200deg) contrast(1.35) brightness(0.7)',
  },
];

export default function PurchasedMapView({ onBack, onNavigate }) {
  // Selected location (Default is Café de Flore matching c26.png)
  const [selectedLocation, setSelectedLocation] = useState(() => MY_MAP_PINS[0]);

  // Customization State (c27.png modal flow)
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [customizationStep, setCustomizationStep] = useState(1); // 1 = Map Style, 2 = Pin Colors & Icons
  const [selectedMapStyle, setSelectedMapStyle] = useState('default');
  const [pinColorTheme, setPinColorTheme] = useState('original');
  const [pinIconStyle, setPinIconStyle] = useState('classic'); // 'classic' | 'minimal' | 'emoji'

  const [toastMessage, setToastMessage] = useState(null);

  // Map Pan & Zoom Engine
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapContainerRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Recenter GPS
  const handleLocateUser = () => {
    setZoomLevel(1.4);
    setPanOffset({ x: 0, y: 0 });
    showToast('📍 Recentered on Live GPS Beacon (Seine River)');
  };

  // Open Google Maps
  const handleDirections = (loc) => {
    const target = loc || selectedLocation;
    if (!target) return;
    const url =
      target.googleMapsUrl ||
      `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        target.name + ' Paris'
      )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    showToast(`🚀 Directions: Opening ${target.name} in Google Maps...`);
  };

  // Drag & Pan handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const maxBound = (zoomLevel - 1) * 220;
    const newX = Math.max(-maxBound, Math.min(maxBound, e.clientX - dragStart.x));
    const newY = Math.max(-maxBound, Math.min(maxBound, e.clientY - dragStart.y));
    setPanOffset({ x: newX, y: newY });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Touch handlers
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - panOffset.x,
        y: e.touches[0].clientY - panOffset.y,
      });
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && isDragging) {
      const maxBound = (zoomLevel - 1) * 220;
      const newX = Math.max(-maxBound, Math.min(maxBound, e.touches[0].clientX - dragStart.x));
      const newY = Math.max(-maxBound, Math.min(maxBound, e.touches[0].clientY - dragStart.y));
      setPanOffset({ x: newX, y: newY });
    }
  };

  const handleTouchEnd = () => setIsDragging(false);

  // Helper for pin dynamic color theme
  const getDynamicPinColor = (pin) => {
    if (pinColorTheme === 'rose') return '#f43f5e';
    if (pinColorTheme === 'emerald') return '#10b981';
    if (pinColorTheme === 'sunset') return '#f59e0b';
    if (pinColorTheme === 'purple') return '#6366f1';
    if (pinColorTheme === 'slate') return '#475569';
    return pin.color; // Original matching c26
  };

  // Get active CSS filter for selected map style
  const activeStyleConfig =
    MAP_STYLES.find((s) => s.id === selectedMapStyle) || MAP_STYLES[0];

  return (
    <div className="relative w-full h-full min-h-0 overflow-hidden bg-[#e8f1f5] sm:rounded-[44px] flex flex-col justify-between select-none">
      {/* ========================================================= */}
      {/* 1. FULL-SCREEN INTERACTIVE MAP CANVAS (c26.png)           */}
      {/* ========================================================= */}
      <div
        ref={mapContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`absolute inset-0 w-full h-full overflow-hidden ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        } touch-none bg-[#e8f1f5] z-0`}
      >
        <div
          style={{
            transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.2, 0, 0, 1)',
            filter: activeStyleConfig.filter,
          }}
          className="relative w-full h-full transition-all duration-300"
        >
          {/* Angled Paris Map Canvas matching c26.png */}
          <img
            src="/c26-my-map.png"
            alt="My Map Vector Paris"
            className="w-full h-full object-cover pointer-events-none select-none"
            draggable={false}
          />

          {/* Central Blue Pulsing GPS Beacon (Seine River in c26) */}
          <div
            style={{
              left: '44.8%',
              top: '44.6%',
              transform: `translate(-50%, -50%) scale(${1 / Math.max(1, zoomLevel)})`,
              transformOrigin: 'center center',
            }}
            className="absolute pointer-events-none z-10"
          >
            <div className="w-24 h-24 -ml-12 -mt-12 absolute top-1/2 left-1/2 rounded-full bg-blue-400/25 animate-ping" />
            <div className="w-14 h-14 -ml-7 -mt-7 absolute top-1/2 left-1/2 rounded-full bg-blue-500/30 animate-pulse" />
            <div className="w-5.5 h-5.5 rounded-full bg-[#2563eb] ring-3 ring-white shadow-2xl relative z-10 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          </div>

          {/* Custom Styled Pins matching c26.png */}
          {MY_MAP_PINS.map((pin) => {
            const isSelected = selectedLocation?.id === pin.id;
            const pinBgColor = getDynamicPinColor(pin);

            return (
              <div
                key={pin.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedLocation(pin);
                  showToast(`📍 Selected ${pin.name}`);
                }}
                style={{
                  left: `${pin.x}%`,
                  top: `${pin.y}%`,
                  transform: `translate(-50%, -50%) scale(${1 / Math.max(1, zoomLevel)})`,
                  transformOrigin: 'center center',
                }}
                className={`absolute transition-all duration-200 cursor-pointer ${
                  isSelected ? 'z-40 scale-125' : 'z-20 hover:scale-115'
                }`}
              >
                {/* Teardrop Pin matching c26.png */}
                <div
                  className="relative flex items-center justify-center rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.32)] ring-2 ring-white/90"
                  style={{
                    backgroundColor: pinBgColor,
                    width: isSelected ? '36px' : '30px',
                    height: isSelected ? '36px' : '30px',
                  }}
                  title={pin.name}
                >
                  {pinIconStyle === 'emoji' ? (
                    <span className="text-[14px]">
                      {pin.icon === 'coffee' && '☕'}
                      {pin.icon === 'food' && '🍝'}
                      {pin.icon === 'camera' && '📸'}
                      {pin.icon === 'park' && '🌲'}
                      {pin.icon === 'museum' && '🏛️'}
                      {pin.icon === 'hotel' && '🏨'}
                    </span>
                  ) : (
                    <>
                      {pin.icon === 'coffee' && (
                        <Coffee className="w-3.5 h-3.5 text-white stroke-[2.4]" />
                      )}
                      {pin.icon === 'food' && (
                        <UtensilsCrossed className="w-3.5 h-3.5 text-white stroke-[2.4]" />
                      )}
                      {pin.icon === 'camera' && (
                        <Camera className="w-3.5 h-3.5 text-white stroke-[2.4]" />
                      )}
                      {pin.icon === 'park' && (
                        <Trees className="w-3.5 h-3.5 text-white stroke-[2.4]" />
                      )}
                      {pin.icon === 'museum' && (
                        <Landmark className="w-3.5 h-3.5 text-white stroke-[2.4]" />
                      )}
                      {pin.icon === 'hotel' && (
                        <Bed className="w-3.5 h-3.5 text-white stroke-[2.4]" />
                      )}
                    </>
                  )}
                </div>

                {/* Animated Ripple when selected */}
                {isSelected && (
                  <div
                    className="absolute inset-0 rounded-full animate-ping opacity-60 pointer-events-none"
                    style={{ backgroundColor: pinBgColor }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. TOP STATUS BAR (9:41) & FLOATING CONTROLS (c26.png)   */}
      {/* ========================================================= */}
      <div className="relative z-30 pt-3 px-4 flex items-center justify-between pointer-events-none">
        {/* Mock iOS Status Bar Time */}
        <span className="text-[14px] font-bold text-[#0f1738] tracking-tight pl-1 pointer-events-auto">
          9:41
        </span>

        {/* Top-Right Control Stack matching c26.png */}
        <div className="flex flex-col gap-2 pointer-events-auto">
          {/* Layers Button */}
          <button
            onClick={() => showToast('Toggle map layers')}
            className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-white flex items-center justify-center text-[#0f1738] hover:text-[#544ee5] active:scale-90 transition-all cursor-pointer"
            title="Map Layers"
          >
            <Layers className="w-4.5 h-4.5 stroke-[2.2]" />
          </button>

          {/* GPS Location Target Button */}
          <button
            onClick={handleLocateUser}
            className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-white flex items-center justify-center text-[#0f1738] hover:text-[#2563eb] active:scale-90 transition-all cursor-pointer"
            title="My Location"
          >
            <Crosshair className="w-4.5 h-4.5 stroke-[2.2]" />
          </button>

          {/* Map Customization Button (Vibrant Purple Circle matching c26.png) */}
          <button
            onClick={() => {
              setCustomizationStep(1);
              setShowCustomizeModal(true);
            }}
            className="w-10 h-10 rounded-full bg-[#544ee5] text-white shadow-[0_6px_20px_rgba(84,78,229,0.4)] flex items-center justify-center hover:bg-[#4338ca] active:scale-90 transition-all cursor-pointer ring-2 ring-white/60"
            title="Customize Map Styles & Colors"
          >
            <SlidersHorizontal className="w-4.5 h-4.5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. BOTTOM LOCATION CARD, COMPASS & NAV BAR (c26.png)      */}
      {/* ========================================================= */}
      <div className="relative z-30 px-3 pb-2 pt-1 pointer-events-none space-y-2">
        {/* Bottom-Right Floating Navigation Compass Button (c26.png) */}
        <div className="flex justify-end pr-1">
          <button
            onClick={() => handleDirections(selectedLocation)}
            className="w-11 h-11 rounded-full bg-white/95 backdrop-blur-md shadow-[0_6px_20px_rgba(0,0,0,0.14)] border border-white flex items-center justify-center text-[#0f1738] hover:text-[#544ee5] active:scale-90 transition-all cursor-pointer pointer-events-auto"
            title="Compass Navigation"
          >
            <Navigation className="w-5 h-5 stroke-[2.2] fill-current rotate-45 text-[#0f1738]" />
          </button>
        </div>

        {/* Floating Location Detail Card matching c26.png */}
        {selectedLocation && (
          <div className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-[26px] p-3 shadow-[0_8px_32px_rgba(0,0,0,0.16)] border border-white/90 animate-in slide-in-from-bottom-2 duration-200">
            {/* Pull Handle */}
            <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-2" />

            <div className="flex items-center justify-between gap-3">
              {/* Left Photo */}
              <img
                src={selectedLocation.img}
                alt={selectedLocation.name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover shrink-0 shadow-2xs border border-black/5"
              />

              {/* Middle Information */}
              <div
                onClick={() => onNavigate && onNavigate('map-detail')}
                className="flex-1 min-w-0 cursor-pointer"
              >
                <h3 className="font-extrabold text-[15px] sm:text-[16px] text-[#0f1738] leading-tight truncate hover:text-[#544ee5] transition-colors">
                  {selectedLocation.name}
                </h3>
                <div className="flex items-center gap-1 text-[11.5px] font-bold text-[#0f1738] mt-0.5">
                  <span>{selectedLocation.rating}</span>
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 inline" />
                  <span className="text-slate-400 font-semibold text-[11px]">
                    ({selectedLocation.reviews})
                  </span>
                </div>
                <p className="text-[10.5px] text-[#717ea1] font-semibold truncate mt-0.5">
                  {selectedLocation.category}
                </p>
              </div>

              {/* Right Direct Directions Purple Button (matching c26.png) */}
              <button
                onClick={() => handleDirections(selectedLocation)}
                className="px-4 py-2.5 rounded-2xl bg-[#544ee5] hover:bg-[#4338ca] active:scale-95 text-white font-bold text-[12.5px] flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-indigo-300/40 shrink-0"
                title="Directions"
              >
                <Navigation className="w-3.5 h-3.5 fill-current rotate-45" />
                <span>Directions</span>
              </button>
            </div>
          </div>
        )}

        {/* Global Bottom Navigation Bar */}
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-full px-5 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.1)] border border-slate-100 flex items-center justify-between max-w-sm mx-auto">
          <button
            onClick={() => onNavigate && onNavigate('explore')}
            className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-[#544ee5] transition-colors cursor-pointer"
          >
            <Home className="w-4.5 h-4.5" />
            <span className="text-[9.5px] font-semibold">Explore</span>
          </button>

          <button
            onClick={() => onNavigate && onNavigate('purchased-map')}
            className="flex flex-col items-center gap-0.5 text-[#544ee5] cursor-pointer"
          >
            <MapIcon className="w-4.5 h-4.5 stroke-[2.4]" />
            <span className="text-[9.5px] font-bold">My Maps</span>
          </button>

          <button
            onClick={() => onNavigate && onNavigate('create')}
            className="w-10 h-10 -my-2 rounded-full bg-[#544ee5] text-white flex items-center justify-center shadow-md shadow-indigo-300 active:scale-95 transition-all cursor-pointer"
            title="Create new map"
          >
            <Plus className="w-5 h-5 stroke-[2.6]" />
          </button>

          <button
            onClick={() => onNavigate && onNavigate('creators')}
            className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-[#544ee5] transition-colors cursor-pointer"
          >
            <Users className="w-4.5 h-4.5" />
            <span className="text-[9.5px] font-semibold">Creators</span>
          </button>

          <button
            onClick={() => onNavigate && onNavigate('user-profile')}
            className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-[#544ee5] transition-colors cursor-pointer"
          >
            <User className="w-4.5 h-4.5" />
            <span className="text-[9.5px] font-semibold">Profile</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. CUSTOMIZE MAP BOTTOM SHEET MODAL (c27.png)             */}
      {/* ========================================================= */}
      {showCustomizeModal && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-end justify-center animate-in fade-in duration-150">
          <div className="w-full bg-white rounded-t-[36px] p-5 sm:p-6 shadow-2xl border-t border-slate-100 max-h-[88vh] overflow-y-auto scrollbar-none animate-in slide-in-from-bottom duration-250">
            {/* Top Pull Handle Indicator */}
            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-3" />

            {/* Modal Header */}
            <div className="flex justify-between items-center pb-2">
              <h2 className="text-[20px] font-black text-[#0f1738] tracking-tight font-serif">
                {customizationStep === 1 ? 'Customize Map' : 'Pins & Colors'}
              </h2>
              <button
                onClick={() => setShowCustomizeModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 active:scale-90 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* STEP 1: Map Style (matching c27.png exactly) */}
            {customizationStep === 1 && (
              <div className="space-y-4 pt-1">
                <div>
                  <h3 className="text-[15px] font-extrabold text-[#0f1738]">
                    Map Style
                  </h3>
                  <p className="text-[12px] text-[#717ea1] font-medium">
                    Choose a map design for your view
                  </p>
                </div>

                {/* 3x2 Grid of Map Style Cards matching c27.png */}
                <div className="grid grid-cols-3 gap-3">
                  {MAP_STYLES.map((style) => {
                    const isSelected = selectedMapStyle === style.id;
                    return (
                      <div
                        key={style.id}
                        onClick={() => {
                          setSelectedMapStyle(style.id);
                          showToast(`Applied ${style.name} Map Style`);
                        }}
                        className="flex flex-col items-center gap-1.5 cursor-pointer group"
                      >
                        {/* Style Thumbnail Card */}
                        <div
                          className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xs transition-all ${
                            isSelected
                              ? 'ring-2.5 ring-[#544ee5] shadow-md scale-[1.03]'
                              : 'border border-slate-200 group-hover:border-slate-300'
                          }`}
                        >
                          <img
                            src={style.img}
                            alt={style.name}
                            className="w-full h-full object-cover pointer-events-none"
                          />
                          {isSelected && (
                            <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-[#544ee5] text-white flex items-center justify-center shadow-xs">
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </div>
                          )}
                        </div>

                        {/* Style Label */}
                        <span
                          className={`text-[12px] font-bold ${
                            isSelected ? 'text-[#0f1738]' : 'text-[#717ea1]'
                          }`}
                        >
                          {style.name}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Action Buttons */}
                <div className="pt-2">
                  <button
                    onClick={() => setCustomizationStep(2)}
                    className="w-full py-3.5 bg-[#544ee5] hover:bg-[#4338ca] active:scale-[0.99] text-white font-bold rounded-2xl text-[14px] shadow-lg shadow-indigo-300/40 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Next</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Pin Theme Colors & Icon Styles */}
            {customizationStep === 2 && (
              <div className="space-y-4 pt-1">
                <div>
                  <h3 className="text-[15px] font-extrabold text-[#0f1738]">
                    Pin Palette &amp; Icons
                  </h3>
                  <p className="text-[12px] text-[#717ea1] font-medium">
                    Customize the marker colors and badge styles
                  </p>
                </div>

                {/* Color Palette Selector */}
                <div>
                  <span className="text-[12px] font-bold text-[#0f1738] block mb-2">
                    Color Theme
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'original', name: 'Original', color: 'bg-gradient-to-r from-red-500 via-amber-500 to-indigo-500' },
                      { id: 'rose', name: 'Pastel Rose', color: 'bg-[#f43f5e]' },
                      { id: 'emerald', name: 'Emerald', color: 'bg-[#10b981]' },
                      { id: 'sunset', name: 'Sunset Gold', color: 'bg-[#f59e0b]' },
                      { id: 'purple', name: 'Royal Purple', color: 'bg-[#6366f1]' },
                      { id: 'slate', name: 'Midnight', color: 'bg-[#334155]' },
                    ].map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => setPinColorTheme(theme.id)}
                        className={`p-2 rounded-xl flex items-center gap-2 border transition-all cursor-pointer ${
                          pinColorTheme === theme.id
                            ? 'border-[#544ee5] bg-indigo-50/60 ring-2 ring-[#544ee5]/20'
                            : 'border-slate-100 hover:bg-slate-50'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full ${theme.color} shrink-0`} />
                        <span className="text-[11.5px] font-bold text-[#0f1738] truncate">
                          {theme.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Icon Style Selector */}
                <div>
                  <span className="text-[12px] font-bold text-[#0f1738] block mb-2">
                    Icon Glyphs
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'classic', name: 'Classic Vectors', desc: 'Crisp white outlines' },
                      { id: 'emoji', name: '3D Emojis', desc: 'Illustrated colorful icons' },
                    ].map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setPinIconStyle(style.id)}
                        className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                          pinIconStyle === style.id
                            ? 'border-[#544ee5] bg-indigo-50/60 ring-2 ring-[#544ee5]/20'
                            : 'border-slate-100 hover:bg-slate-50'
                        }`}
                      >
                        <span className="text-[12px] font-extrabold text-[#0f1738] block">
                          {style.name}
                        </span>
                        <span className="text-[10px] text-[#717ea1]">
                          {style.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setCustomizationStep(1)}
                    className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-[13px] cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => {
                      setShowCustomizeModal(false);
                      showToast('✨ Map & Pin custom style saved!');
                    }}
                    className="flex-1 py-3.5 bg-[#544ee5] hover:bg-[#4338ca] active:scale-[0.99] text-white font-bold rounded-2xl text-[14px] shadow-lg shadow-indigo-300/40 transition-all cursor-pointer"
                  >
                    Apply &amp; Save
                  </button>
                </div>
              </div>
            )}
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
