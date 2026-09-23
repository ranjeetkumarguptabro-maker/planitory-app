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
  CheckCircle2
} from 'lucide-react';

// Custom Map Pins matching c26.png coordinates
export const MY_MAP_PINS = [
  {
    id: 'flore',
    name: 'Café de Flore',
    type: 'cafe',
    category: 'Café • Saint-Germain',
    address: '172 Boulevard Saint-Germain, 75006 Paris',
    rating: '4.8',
    reviews: '320',
    img: '/c7-photo-cafe-de-flore.png',
    x: 68.8,
    y: 24.2,
    color: '#854d0e',
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Cafe+de+Flore+Paris',
  },
  {
    id: 'food-bistro',
    name: 'Le Comptoir du Relais',
    type: 'food',
    category: 'Restaurant • Odéon',
    address: '9 Carrefour de l’Odéon, 75006 Paris',
    rating: '4.9',
    reviews: '410',
    img: '/c7-photo-croissant.png',
    x: 70.8,
    y: 35.8,
    color: '#dc2626',
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Le+Comptoir+du+Relais+Paris',
  },
  {
    id: 'camera-seine',
    name: 'Pont des Arts Viewpoint',
    type: 'camera',
    category: 'Photo Spot • Seine',
    address: 'Pont des Arts, 75006 Paris',
    rating: '4.9',
    reviews: '280',
    img: '/map-card-paris-hq.png',
    x: 79.8,
    y: 54.5,
    color: '#ca8a04',
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Pont+des+Arts+Paris',
  },
  {
    id: 'park-tree',
    name: 'Jardin du Luxembourg',
    type: 'park',
    category: 'Park • 6th Arr.',
    address: '75006 Paris, France',
    rating: '4.9',
    reviews: '520',
    img: '/c4-thumb-europe.png',
    x: 33.8,
    y: 19.1,
    color: '#15803d',
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Jardin+du+Luxembourg+Paris',
  },
  {
    id: 'museum-monument',
    name: 'Musée d’Orsay',
    type: 'museum',
    category: 'Museum • 7th Arr.',
    address: '1 Rue de la Légion d’Honneur, Paris',
    rating: '4.9',
    reviews: '340',
    img: '/c6-thumb-paris-museums.png',
    x: 26.8,
    y: 34.5,
    color: '#7e22ce',
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Musee+dOrsay+Paris',
  },
  {
    id: 'hotel-stay',
    name: 'Hôtel Lutetia',
    type: 'hotel',
    category: 'Luxury Hotel • Rive Gauche',
    address: '45 Boulevard Raspail, 75006 Paris',
    rating: '4.8',
    reviews: '195',
    img: '/c8-thumb-paris.png',
    x: 27.8,
    y: 52.8,
    color: '#3b82f6',
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
  const [pinIconStyle, setPinIconStyle] = useState('classic');

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
    setZoomLevel(1.35);
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

  // Get active CSS filter for selected map style
  const activeStyleConfig =
    MAP_STYLES.find((s) => s.id === selectedMapStyle) || MAP_STYLES[0];

  return (
    <div className="relative w-full h-full min-h-0 overflow-hidden bg-[#e8f1f5] sm:rounded-[44px] select-none">
      {/* ========================================================= */}
      {/* 1. FULL-SCREEN MAP CANVAS MATCHING c26.png                */}
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
          {/* Paris Map Vector Graphic matching c26.png */}
          <img
            src="/c26-my-map.png"
            alt="My Map Vector Paris"
            className="w-full h-full object-cover pointer-events-none select-none"
            draggable={false}
          />

          {/* Interactive Tap Hitboxes over the 6 Map Pins in c26 */}
          {MY_MAP_PINS.map((pin) => {
            const isSelected = selectedLocation?.id === pin.id;

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
                className="absolute z-20 w-12 h-12 -ml-0.5 -mt-0.5 rounded-full cursor-pointer flex items-center justify-center"
                title={pin.name}
              >
                {/* Subtle Active Highlight Glow */}
                {isSelected && (
                  <div className="w-12 h-12 rounded-full ring-3 ring-[#544ee5] ring-offset-2 ring-offset-white shadow-xl animate-in zoom-in-75 duration-150 flex items-center justify-center bg-indigo-500/10 pointer-events-none" />
                )}
              </div>
            );
          })}

          {/* GPS Beacon Tap Hitbox */}
          <div
            onClick={handleLocateUser}
            style={{
              left: '44.8%',
              top: '44.6%',
              transform: `translate(-50%, -50%) scale(${1 / Math.max(1, zoomLevel)})`,
              transformOrigin: 'center center',
            }}
            className="absolute z-20 w-16 h-16 rounded-full cursor-pointer"
            title="GPS User Location"
          />
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. TOP-LEFT BACK BUTTON (ONLY BACK BUTTON, NO DUPLICATES) */}
      {/* ========================================================= */}
      <div className="absolute top-4 left-4 z-40">
        <button
          onClick={() => onBack && onBack()}
          className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.14)] border border-white flex items-center justify-center text-[#0f1738] hover:bg-white active:scale-90 transition-all cursor-pointer"
          title="Back to Home"
        >
          <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
        </button>
      </div>

      {/* ========================================================= */}
      {/* 3. INVISIBLE INTERACTIVE HITBOXES OVER c26 BUTTONS        */}
      {/* ========================================================= */}
      {/* Top-Right Button Hitbox 1: Layers */}
      <div
        onClick={() => showToast('Toggle map layers')}
        style={{ top: '7.4%', right: '3.6%' }}
        className="absolute z-30 w-12 h-12 rounded-full cursor-pointer hover:bg-black/5 active:scale-90 transition-all"
        title="Map Layers"
      />

      {/* Top-Right Button Hitbox 2: GPS Recenter */}
      <div
        onClick={handleLocateUser}
        style={{ top: '14.2%', right: '3.6%' }}
        className="absolute z-30 w-12 h-12 rounded-full cursor-pointer hover:bg-black/5 active:scale-90 transition-all"
        title="My Location"
      />

      {/* Top-Right Button Hitbox 3: Purple Customization Button -> Opens c27 Modal */}
      <div
        onClick={() => {
          setCustomizationStep(1);
          setShowCustomizeModal(true);
        }}
        style={{ top: '21.0%', right: '3.6%' }}
        className="absolute z-30 w-12 h-12 rounded-full cursor-pointer hover:bg-white/10 active:scale-90 transition-all"
        title="Customize Map Styles & Colors"
      />

      {/* Bottom-Right Compass Hitbox */}
      <div
        onClick={() => handleDirections(selectedLocation)}
        style={{ bottom: '18.5%', right: '3.6%' }}
        className="absolute z-30 w-14 h-14 rounded-full cursor-pointer hover:bg-black/5 active:scale-90 transition-all"
        title="Compass Navigation"
      />

      {/* Bottom Location Card Directions Hitbox */}
      <div
        onClick={() => handleDirections(selectedLocation)}
        style={{ bottom: '3.8%', right: '4.8%', width: '33%', height: '5.2%' }}
        className="absolute z-30 rounded-2xl cursor-pointer hover:bg-black/10 active:scale-95 transition-all"
        title="Get Directions in Google Maps"
      />

      {/* Bottom Location Card Detail Tap Hitbox */}
      <div
        onClick={() => onNavigate && onNavigate('map-detail')}
        style={{ bottom: '3.2%', left: '4.5%', width: '58%', height: '6.5%' }}
        className="absolute z-30 rounded-2xl cursor-pointer hover:bg-black/5"
        title="View Place Details"
      />

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

                {/* Action Button: Next */}
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
