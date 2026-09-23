import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  Search,
  Layers,
  Crosshair,
  MoreVertical,
  Plus,
  Check,
  Star,
  Bookmark,
  Navigation,
  ExternalLink,
  X,
  Compass,
  CheckCircle2,
  Home,
  Map as MapIcon,
  Users,
  User,
  Trees,
  Landmark,
  UtensilsCrossed,
  Sparkles,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';

// Curated Paris Locations & Illustrated Landmarks matching c25.png
export const PARIS_LANDMARKS = [
  {
    id: 'sacré-coeur',
    name: 'Sacré-Cœur',
    area: 'Montmartre',
    type: 'museum',
    lat: 48.8867,
    lng: 2.3431,
    x: 69,
    y: 29.5,
    icon: '⛪',
    rating: 4.8,
    reviews: 185,
    img: '/c15-pop-paris.png',
    isIllustrated: true,
    label: 'Sacré-Cœur',
  },
  {
    id: 'palais-garnier',
    name: 'Palais Garnier',
    area: '9th Arr.',
    type: 'museum',
    lat: 48.8719,
    lng: 2.3316,
    x: 55,
    y: 43.5,
    icon: '🏛️',
    rating: 4.9,
    reviews: 210,
    img: '/c8-thumb-paris.png',
    isIllustrated: true,
    label: 'Palais Garnier',
  },
  {
    id: 'louvre',
    name: 'Louvre Museum',
    area: '1st Arr.',
    type: 'museum',
    lat: 48.8606,
    lng: 2.3376,
    x: 63.5,
    y: 56.5,
    icon: '🏛️',
    rating: 4.9,
    reviews: 320,
    img: '/c6-thumb-paris-museums.png',
    isIllustrated: true,
    label: 'Louvre Museum',
  },
  {
    id: 'eiffel',
    name: 'Tour Eiffel',
    area: '7th Arr.',
    type: 'museum',
    lat: 48.8584,
    lng: 2.2945,
    x: 17.5,
    y: 63,
    icon: '🗼',
    rating: 4.9,
    reviews: 340,
    img: '/map-card-paris-hq.png',
    isIllustrated: true,
    label: 'Tour Eiffel',
  },
  {
    id: 'notre-dame',
    name: 'Notre-Dame',
    area: '4th Arr.',
    type: 'museum',
    lat: 48.8530,
    lng: 2.3499,
    x: 88,
    y: 61,
    icon: '⛪',
    rating: 4.8,
    reviews: 290,
    img: '/c18-cover-paris.png',
    isIllustrated: true,
    label: 'Notre-Dame',
  },
];

// Interactive Layer Pins matching c25.png exactly
export const MAP_PINS = [
  // Food & Drinks (Pink / Red pins)
  {
    id: 'flore',
    name: 'Café de Flore',
    category: 'food',
    type: 'cafe',
    area: '6th Arr. • Saint-Germain',
    rating: 4.8,
    reviews: '320',
    img: '/c7-photo-cafe-de-flore.png',
    address: '172 Boulevard Saint-Germain, 75006 Paris',
    x: 29.5,
    y: 72,
    color: '#f43f5e',
    icon: 'food',
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Cafe+de+Flore+Paris',
  },
  {
    id: 'food-opera',
    name: 'Café de la Paix',
    category: 'food',
    type: 'cafe',
    area: '9th Arr.',
    rating: 4.7,
    reviews: '240',
    img: '/c7-photo-croissant.png',
    address: '5 Place de l’Opéra, 75009 Paris',
    x: 54.5,
    y: 31.8,
    color: '#f43f5e',
    icon: 'food',
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Cafe+de+la+Paix+Paris',
  },
  {
    id: 'food-marais',
    name: 'L’As du Fallafel',
    category: 'food',
    type: 'restaurant',
    area: '4th Arr.',
    rating: 4.8,
    reviews: '410',
    img: '/c6-cat-food.png',
    address: '34 Rue des Rosiers, 75004 Paris',
    x: 83.5,
    y: 43.8,
    color: '#f43f5e',
    icon: 'food',
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Las+du+Fallafel+Paris',
  },
  {
    id: 'food-seine',
    name: 'Le Châtelet Bistro',
    category: 'food',
    type: 'restaurant',
    area: '1st Arr.',
    rating: 4.6,
    reviews: '190',
    img: '/c7-photo-latte.png',
    address: 'Place du Châtelet, 75001 Paris',
    x: 50.5,
    y: 52.2,
    color: '#f43f5e',
    icon: 'food',
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Place+du+Chatelet+Paris',
  },
  {
    id: 'food-leftbank',
    name: 'Les Deux Magots',
    category: 'food',
    type: 'cafe',
    area: '6th Arr.',
    rating: 4.8,
    reviews: '310',
    img: '/c6-cat-cafe.png',
    address: '6 Place Saint-Germain des Prés, Paris',
    x: 31,
    y: 59,
    color: '#f43f5e',
    icon: 'food',
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Les+Deux+Magots+Paris',
  },
  {
    id: 'food-quai',
    name: 'Maison Sauvage',
    category: 'food',
    type: 'restaurant',
    area: '6th Arr.',
    rating: 4.7,
    reviews: '175',
    img: '/c7-photo-cafe-de-flore.png',
    address: '5 Rue de Buci, 75006 Paris',
    x: 15.5,
    y: 54.2,
    color: '#f43f5e',
    icon: 'food',
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Maison+Sauvage+Paris',
  },

  // Museums (Blue pins with columns)
  {
    id: 'mus-orsay',
    name: 'Musée d’Orsay',
    category: 'museums',
    type: 'museum',
    area: '7th Arr.',
    rating: 4.9,
    reviews: '280',
    img: '/c6-thumb-paris-museums.png',
    address: '1 Rue de la Légion d’Honneur, Paris',
    x: 41.5,
    y: 53.2,
    color: '#4f46e5',
    icon: 'museum',
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Musee+dOrsay+Paris',
  },
  {
    id: 'mus-pompidou',
    name: 'Centre Pompidou',
    category: 'museums',
    type: 'museum',
    area: '4th Arr.',
    rating: 4.7,
    reviews: '230',
    img: '/c13-art-culture.png',
    address: 'Place Georges-Pompidou, Paris',
    x: 87.8,
    y: 55.2,
    color: '#4f46e5',
    icon: 'museum',
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Centre+Pompidou+Paris',
  },
  {
    id: 'mus-montmartre',
    name: 'Musée de Montmartre',
    category: 'museums',
    type: 'museum',
    area: '18th Arr.',
    rating: 4.8,
    reviews: '145',
    img: '/c15-dest-paris.png',
    address: '12 Rue Cortot, 75018 Paris',
    x: 83.8,
    y: 33,
    color: '#4f46e5',
    icon: 'museum',
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Musee+de+Montmartre+Paris',
  },

  // Parks (Green pins with trees)
  {
    id: 'park-tuileries',
    name: 'Jardin des Tuileries',
    category: 'parks',
    type: 'park',
    area: '1st Arr.',
    rating: 4.8,
    reviews: '310',
    img: '/c6-cat-nature.png',
    address: 'Place de la Concorde, 75001 Paris',
    x: 33,
    y: 47,
    color: '#10b981',
    icon: 'park',
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Jardin+des+Tuileries+Paris',
  },
  {
    id: 'park-luxembourg',
    name: 'Jardin du Luxembourg',
    category: 'parks',
    type: 'park',
    area: '6th Arr.',
    rating: 4.9,
    reviews: '420',
    img: '/c4-thumb-europe.png',
    address: '75006 Paris, France',
    x: 71,
    y: 75.5,
    color: '#10b981',
    icon: 'park',
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Jardin+du+Luxembourg+Paris',
  },
  {
    id: 'park-buttes',
    name: 'Parc des Buttes-Chaumont',
    category: 'parks',
    type: 'park',
    area: '19th Arr.',
    rating: 4.8,
    reviews: '260',
    img: '/c6-cat-nature.png',
    address: '1 Rue Botzaris, 75019 Paris',
    x: 75.2,
    y: 18,
    color: '#10b981',
    icon: 'park',
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Parc+des+Buttes+Chaumont+Paris',
  },
  {
    id: 'park-montmartre',
    name: 'Square Louise Michel',
    category: 'parks',
    type: 'park',
    area: '18th Arr.',
    rating: 4.7,
    reviews: '190',
    img: '/c15-pop-paris.png',
    address: '6 Place Saint-Pierre, Paris',
    x: 50,
    y: 36.5,
    color: '#10b981',
    icon: 'park',
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Square+Louise+Michel+Paris',
  },
  {
    id: 'park-seine',
    name: 'Parc Rives de Seine',
    category: 'parks',
    type: 'park',
    area: '4th Arr.',
    rating: 4.8,
    reviews: '215',
    img: '/c4-thumb-local.png',
    address: 'Quai de la Râpée, Paris',
    x: 90.8,
    y: 69.2,
    color: '#10b981',
    icon: 'park',
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Parc+Rives+de+Seine+Paris',
  },

  // Hidden Gems (Orange pins with stars)
  {
    id: 'gem-palais-royal',
    name: 'Colonnes de Buren',
    category: 'gems',
    type: 'gem',
    area: '1st Arr.',
    rating: 4.7,
    reviews: '160',
    img: '/c13-clean-hidden.png',
    address: 'Galerie de la Cour d’Honneur, Paris',
    x: 43,
    y: 43.8,
    color: '#f59e0b',
    icon: 'star',
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Colonnes+de+Buren+Paris',
  },
  {
    id: 'gem-cremieux',
    name: 'Rue Crémieux (Pastel Street)',
    category: 'gems',
    type: 'gem',
    area: '12th Arr.',
    rating: 4.6,
    reviews: '180',
    img: '/c13-art-hidden.png',
    address: 'Rue Crémieux, 75012 Paris',
    x: 77,
    y: 50.2,
    color: '#f59e0b',
    icon: 'star',
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Rue+Cremieux+Paris',
  },
];

export default function ExplorePage({ onBack, onNavigate }) {
  // Layer visibility state matching c25.png
  const [layers, setLayers] = useState({
    food: true,
    museums: true,
    parks: true,
    gems: false, // unchecked by default in c25.png
  });

  const [isLayersCardOpen, setIsLayersCardOpen] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(() => MAP_PINS[0]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  // Toggle layer checkbox
  const toggleLayer = (layerKey) => {
    setLayers((prev) => {
      const next = { ...prev, [layerKey]: !prev[layerKey] };
      const names = {
        food: 'Food & Drinks',
        museums: 'Museums',
        parks: 'Parks',
        gems: 'Hidden Gems',
      };
      showToast(`${next[layerKey] ? 'Enabled' : 'Hidden'} ${names[layerKey]}`);
      return next;
    });
  };

  // Select location pin
  const handleSelectLocation = (loc) => {
    setSelectedLocation(loc);
    showToast(`📍 Selected ${loc.name}`);
  };

  // Open Google Maps Directions
  const handleDirections = (loc) => {
    const target = loc || selectedLocation;
    if (!target) return;
    const url =
      target.googleMapsUrl ||
      `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        target.name + ' Paris'
      )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    showToast(`🚀 Opening Directions for ${target.name}...`);
  };

  // Recenter on user GPS location (Seine River)
  const handleLocateUser = () => {
    setZoomLevel(1.3);
    setPanOffset({ x: 0, y: 0 });
    showToast('📍 Centered on your live GPS beacon');
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

  // Touch Handlers
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

  // Filter visible pins according to active layers
  const visiblePins = MAP_PINS.filter((pin) => {
    if (!layers[pin.category]) return false;
    if (searchQuery.trim()) {
      return (
        pin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pin.area.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className="relative w-full h-full min-h-0 overflow-hidden bg-[#e9f2f6] sm:rounded-[44px] flex flex-col justify-between select-none">
      {/* ========================================================= */}
      {/* 1. FULL INTERACTIVE PARIS MAP CANVAS (c25.png)            */}
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
          }}
          className="relative w-full h-full"
        >
          {/* Base Vector Paris Map (matching c25.png graphic) */}
          <img
            src="/c25-home-map.png"
            alt="Paris Vector Map"
            className="w-full h-full object-cover pointer-events-none select-none"
            draggable={false}
          />

          {/* Central Blue GPS Beacon with Pulsing Radar Rings */}
          <div
            style={{
              left: '51.8%',
              top: '65.2%',
              transform: `translate(-50%, -50%) scale(${1 / Math.max(1, zoomLevel)})`,
              transformOrigin: 'center center',
            }}
            className="absolute pointer-events-none z-10"
          >
            <div className="w-20 h-20 -ml-10 -mt-10 absolute top-1/2 left-1/2 rounded-full bg-blue-400/20 animate-ping" />
            <div className="w-12 h-12 -ml-6 -mt-6 absolute top-1/2 left-1/2 rounded-full bg-blue-500/25 animate-pulse" />
            <div className="w-5 h-5 rounded-full bg-[#2563eb] ring-3 ring-white shadow-xl relative z-10 flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
          </div>

          {/* Illustrated Landmarks (Tour Eiffel, Louvre, Sacré-Cœur, Palais Garnier, Notre-Dame) */}
          {PARIS_LANDMARKS.map((lm) => (
            <div
              key={lm.id}
              onClick={() => handleSelectLocation(lm)}
              style={{
                left: `${lm.x}%`,
                top: `${lm.y}%`,
                transform: `translate(-50%, -50%) scale(${1 / Math.max(1, zoomLevel)})`,
                transformOrigin: 'center center',
              }}
              className="absolute z-20 flex flex-col items-center cursor-pointer group"
            >
              <div
                className={`transition-all duration-200 ${
                  selectedLocation?.id === lm.id
                    ? 'scale-115 filter drop-shadow-[0_4px_12px_rgba(84,78,229,0.5)]'
                    : 'group-hover:scale-110'
                }`}
              >
                {/* Visual landmark trigger */}
                <div className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center" />
              </div>
            </div>
          ))}

          {/* Interactive Layer Pins matching c25.png */}
          {visiblePins.map((pin) => {
            const isSelected = selectedLocation?.id === pin.id;
            return (
              <div
                key={pin.id}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectLocation(pin);
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
                {/* Teardrop Pin matching c25 style */}
                <div
                  className="relative flex items-center justify-center rounded-full shadow-[0_4px_12px_rgba(0,0,0,0.28)] ring-2 ring-white"
                  style={{
                    backgroundColor: pin.color,
                    width: isSelected ? '34px' : '28px',
                    height: isSelected ? '34px' : '28px',
                  }}
                  title={pin.name}
                >
                  {pin.icon === 'food' && (
                    <UtensilsCrossed className="w-3.5 h-3.5 text-white stroke-[2.4]" />
                  )}
                  {pin.icon === 'museum' && (
                    <Landmark className="w-3.5 h-3.5 text-white stroke-[2.4]" />
                  )}
                  {pin.icon === 'park' && (
                    <Trees className="w-3.5 h-3.5 text-white stroke-[2.4]" />
                  )}
                  {pin.icon === 'star' && (
                    <Star className="w-3.5 h-3.5 text-white fill-white" />
                  )}
                </div>

                {/* Animated Ring when selected */}
                {isSelected && (
                  <div
                    className="absolute inset-0 rounded-full animate-ping opacity-60 pointer-events-none"
                    style={{ backgroundColor: pin.color }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. TOP FLOATING HEADER BAR (c25.png)                      */}
      {/* ========================================================= */}
      <div className="relative z-30 pt-3 sm:pt-4 px-3 sm:px-4 pointer-events-none">
        {/* Header Pill Container */}
        <div className="flex items-center justify-between bg-white/95 backdrop-blur-md px-3 py-2 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-white/80 pointer-events-auto">
          {/* Back Button */}
          <button
            onClick={() => onBack && onBack()}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#0f1738] active:scale-95 transition-all cursor-pointer shrink-0"
            title="Go back"
          >
            <ArrowLeft className="w-4.5 h-4.5 stroke-[2.5]" />
          </button>

          {/* Center Title with Eiffel Thumbnail */}
          <div
            onClick={() => onNavigate && onNavigate('purchased-map')}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity"
          >
            <img
              src="/map-card-paris-hq.png"
              alt="Paris Essentials"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#544ee5]/20 shadow-2xs shrink-0"
            />
            <h1 className="text-[17px] font-extrabold text-[#0f1738] tracking-tight font-serif leading-tight">
              Paris Essentials
            </h1>
          </div>

          {/* Right Actions: 3-Dots + Save Purple Pill */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => showToast('Options: Edit Paris Essentials')}
              className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#0f1738] active:scale-95 transition-all cursor-pointer"
              title="More options"
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            <button
              onClick={() => showToast('✨ Paris Essentials saved to your profile!')}
              className="px-4 py-1.5 rounded-full bg-[#544ee5] hover:bg-[#4338ca] active:scale-95 text-white font-bold text-[12.5px] transition-all cursor-pointer shadow-md shadow-indigo-300/40"
            >
              Save
            </button>
          </div>
        </div>

        {/* Search Bar Overlay when search is triggered */}
        {isSearchOpen && (
          <div className="mt-2 bg-white rounded-2xl p-2 shadow-xl border border-slate-100 flex items-center gap-2 pointer-events-auto animate-in slide-in-from-top-2 duration-200">
            <Search className="w-4 h-4 text-slate-400 ml-1.5 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search spots, cafes, museums..."
              className="w-full bg-transparent text-[13px] text-[#0f1738] font-medium outline-none"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="px-2.5 py-1 text-[11.5px] font-bold text-[#544ee5] hover:bg-indigo-50 rounded-lg cursor-pointer"
            >
              Done
            </button>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 3. FLOATING LAYERS CARD (TOP-LEFT) & ACTION STACK (TOP-RIGHT) */}
      {/* ========================================================= */}
      <div className="relative z-20 flex justify-between items-start px-3 sm:px-4 pt-3 pointer-events-none">
        {/* Floating Layers Dropdown Card (matching c25.png) */}
        {isLayersCardOpen && (
          <div className="w-[185px] sm:w-[195px] bg-white/95 backdrop-blur-md rounded-3xl p-3 shadow-[0_8px_28px_rgba(0,0,0,0.12)] border border-white/80 pointer-events-auto animate-in zoom-in-95 duration-150 space-y-2.5">
            {/* Layers Header with Plus Button */}
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <span className="font-extrabold text-[14px] text-[#0f1738]">
                Layers
              </span>
              <button
                onClick={() => showToast('✨ Add custom layer filter')}
                className="w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#0f1738] active:scale-90 transition-all cursor-pointer"
                title="Add layer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.4]" />
              </button>
            </div>

            {/* Layer Row 1: Food & Drinks (Pink) */}
            <div
              onClick={() => toggleLayer('food')}
              className="flex items-center justify-between py-1 cursor-pointer group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className={`w-4 h-4 rounded-[5px] flex items-center justify-center border transition-all ${
                    layers.food
                      ? 'bg-[#544ee5] border-[#544ee5] text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {layers.food && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <UtensilsCrossed className="w-3.5 h-3.5 text-[#f43f5e] shrink-0 stroke-[2.2]" />
                <span className="text-[12px] font-bold text-[#0f1738] truncate group-hover:text-[#544ee5] transition-colors">
                  Food &amp; Drinks
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showToast('Options: Food & Drinks');
                }}
                className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
              >
                <MoreVertical className="w-3 h-3" />
              </button>
            </div>

            {/* Layer Row 2: Museums (Blue) */}
            <div
              onClick={() => toggleLayer('museums')}
              className="flex items-center justify-between py-1 cursor-pointer group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className={`w-4 h-4 rounded-[5px] flex items-center justify-center border transition-all ${
                    layers.museums
                      ? 'bg-[#544ee5] border-[#544ee5] text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {layers.museums && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <Landmark className="w-3.5 h-3.5 text-[#4f46e5] shrink-0 stroke-[2.2]" />
                <span className="text-[12px] font-bold text-[#0f1738] truncate group-hover:text-[#544ee5] transition-colors">
                  Museums
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showToast('Options: Museums');
                }}
                className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
              >
                <MoreVertical className="w-3 h-3" />
              </button>
            </div>

            {/* Layer Row 3: Parks (Green) */}
            <div
              onClick={() => toggleLayer('parks')}
              className="flex items-center justify-between py-1 cursor-pointer group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className={`w-4 h-4 rounded-[5px] flex items-center justify-center border transition-all ${
                    layers.parks
                      ? 'bg-[#544ee5] border-[#544ee5] text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {layers.parks && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <Trees className="w-3.5 h-3.5 text-[#10b981] shrink-0 stroke-[2.2]" />
                <span className="text-[12px] font-bold text-[#0f1738] truncate group-hover:text-[#544ee5] transition-colors">
                  Parks
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showToast('Options: Parks');
                }}
                className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
              >
                <MoreVertical className="w-3 h-3" />
              </button>
            </div>

            {/* Layer Row 4: Hidden Gems (Orange Star) */}
            <div
              onClick={() => toggleLayer('gems')}
              className="flex items-center justify-between py-1 cursor-pointer group"
            >
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className={`w-4 h-4 rounded-[5px] flex items-center justify-center border transition-all ${
                    layers.gems
                      ? 'bg-[#544ee5] border-[#544ee5] text-white'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {layers.gems && <Check className="w-3 h-3 stroke-[3]" />}
                </div>
                <Star className="w-3.5 h-3.5 text-[#f59e0b] fill-[#f59e0b] shrink-0" />
                <span className="text-[12px] font-bold text-[#0f1738] truncate group-hover:text-[#544ee5] transition-colors">
                  Hidden Gems
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showToast('Options: Hidden Gems');
                }}
                className="text-slate-400 hover:text-slate-600 p-0.5 cursor-pointer"
              >
                <MoreVertical className="w-3 h-3" />
              </button>
            </div>
          </div>
        )}

        {/* Top-Right Floating Controls Stack */}
        <div className="flex flex-col gap-2 pointer-events-auto ml-auto">
          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen((prev) => !prev)}
            className="w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-white/80 flex items-center justify-center text-[#0f1738] hover:text-[#544ee5] active:scale-90 transition-all cursor-pointer"
            title="Search Spots"
          >
            <Search className="w-4.5 h-4.5 stroke-[2.2]" />
          </button>

          {/* Toggle Layers Card */}
          <button
            onClick={() => setIsLayersCardOpen((prev) => !prev)}
            className={`w-10 h-10 rounded-2xl backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-white/80 flex items-center justify-center active:scale-90 transition-all cursor-pointer ${
              isLayersCardOpen
                ? 'bg-[#544ee5] text-white shadow-indigo-300/40'
                : 'bg-white/95 text-[#0f1738] hover:text-[#544ee5]'
            }`}
            title="Toggle Layers"
          >
            <Layers className="w-4.5 h-4.5 stroke-[2.2]" />
          </button>

          {/* GPS Recenter */}
          <button
            onClick={handleLocateUser}
            className="w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.12)] border border-white/80 flex items-center justify-center text-[#0f1738] hover:text-[#2563eb] active:scale-90 transition-all cursor-pointer"
            title="Recenter on My Location"
          >
            <Crosshair className="w-4.5 h-4.5 stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. BOTTOM FLOATING LOCATION CARD & BOTTOM NAV (c25.png)   */}
      {/* ========================================================= */}
      <div className="relative z-30 px-3 pb-2 pt-1 pointer-events-none space-y-2">
        {/* Floating Location Card matching c25.png exactly */}
        {selectedLocation && (
          <div className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-[26px] p-3 shadow-[0_8px_32px_rgba(0,0,0,0.16)] border border-white/90 animate-in slide-in-from-bottom-2 duration-200">
            {/* Top Pull Handle Indicator */}
            <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-2" />

            <div className="flex items-center justify-between gap-3">
              {/* Left Photo */}
              <img
                src={selectedLocation.img || '/c7-photo-cafe-de-flore.png'}
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
                <div className="flex items-center gap-1.5 text-[11.5px] font-bold text-amber-500 mt-1">
                  <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{selectedLocation.rating || 4.8}</span>
                  <span className="text-slate-400 font-semibold text-[11px]">
                    ({selectedLocation.reviews || '320'})
                  </span>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                {/* Directions Button (Purple Pill matching c25.png) */}
                <button
                  onClick={() => handleDirections(selectedLocation)}
                  className="px-4 py-2.5 rounded-2xl bg-[#544ee5] hover:bg-[#4338ca] active:scale-95 text-white font-bold text-[12.5px] flex items-center gap-1.5 transition-all cursor-pointer shadow-md shadow-indigo-300/40"
                  title="Turn-by-turn directions"
                >
                  <Navigation className="w-3.5 h-3.5 fill-current rotate-45" />
                  <span>Directions</span>
                </button>

                {/* Bookmark Button */}
                <button
                  onClick={() => {
                    const next = !isBookmarked;
                    setIsBookmarked(next);
                    showToast(
                      next
                        ? `Saved ${selectedLocation.name} to bookmarks`
                        : `Removed from bookmarks`
                    );
                  }}
                  className={`w-10 h-10 rounded-2xl border flex items-center justify-center transition-all active:scale-90 cursor-pointer ${
                    isBookmarked
                      ? 'bg-indigo-50 border-indigo-200 text-[#544ee5]'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                  title="Bookmark location"
                >
                  <Bookmark
                    className={`w-4 h-4 ${
                      isBookmarked ? 'fill-[#544ee5] text-[#544ee5]' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Global Bottom Navigation Bar */}
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-full px-5 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.1)] border border-slate-100 flex items-center justify-between max-w-sm mx-auto">
          <button
            onClick={() => onNavigate && onNavigate('explore')}
            className="flex flex-col items-center gap-0.5 text-[#544ee5] cursor-pointer"
          >
            <Home className="w-4.5 h-4.5 stroke-[2.4]" />
            <span className="text-[9.5px] font-bold">Explore</span>
          </button>

          <button
            onClick={() => onNavigate && onNavigate('purchased-map')}
            className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-[#544ee5] transition-colors cursor-pointer"
          >
            <MapIcon className="w-4.5 h-4.5" />
            <span className="text-[9.5px] font-semibold">My Maps</span>
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

      {/* Live Toast Notification */}
      {toastMessage && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-[#0f1738]/95 backdrop-blur-md text-white px-4 py-2 rounded-full text-[12px] font-bold shadow-xl flex items-center gap-2 border border-white/10 animate-in fade-in zoom-in-95 duration-150">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
