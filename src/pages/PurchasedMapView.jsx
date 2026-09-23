import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Settings,
  Pencil,
  Navigation,
  Heart,
  MoreVertical,
  Search,
  LayoutGrid,
  Landmark,
  Coffee,
  UtensilsCrossed,
  Trees,
  Camera,
  Crosshair,
  MapPin,
  Layers,
  Compass,
  Sparkles,
  ExternalLink,
  X,
  Palette,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Volume2,
  CheckCircle2,
  Clock,
  Home,
  Map as MapIcon,
  Plus,
  Users,
  User,
  ShoppingBag
} from 'lucide-react';

// Exactly 5 Curated Iconic Paris Locations matching c21 3D Map
export const TOP_PARIS_LOCATIONS = [
  {
    id: 'flore',
    type: 'cafe',
    name: 'Café de Flore',
    frenchName: 'Café de Flore',
    area: 'Saint-Germain',
    address: '172 Boulevard Saint-Germain, 75006 Paris, France',
    lat: 48.8543,
    lng: 2.3328,
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Cafe+de+Flore+172+Boulevard+Saint-Germain+Paris',
    rating: 4.8,
    reviewsCount: '320',
    hours: 'Open 7:30 AM – 1:30 AM',
    distance: '900 m',
    walkTime: '11 min walk',
    shortDesc: 'Iconic café in the heart of Paris.',
    description: 'Historic cafe famous for existentialist writers, artisanal thick hot chocolate, and classic red-awning sidewalk terrace.',
    insideHighlights: [
      'Ground Floor Heated Outdoor Terrace',
      'Art Deco Mahogany Booths',
      'Signature Chocolat Chaud Spécial',
      'Fresh Morning Croissants & Brioche'
    ],
    creatorTip: 'Ask for a terrace table under the green foliage and order the hot chocolate served with fresh chantilly cream in a silver pitcher.',
    img: '/c7-photo-cafe-de-flore.png',
    x: 80.2,
    y: 75.5,
    color: '#dc2626',
    icon: '☕',
  },
  {
    id: 'louvre',
    type: 'museum',
    name: 'Louvre Museum',
    frenchName: 'Musée du Louvre',
    area: '1st Arr.',
    address: 'Rue de Rivoli, 75001 Paris, France',
    lat: 48.8606,
    lng: 2.3376,
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Louvre+Museum+Rue+de+Rivoli+Paris',
    rating: 4.9,
    reviewsCount: '142k',
    hours: 'Open 9:00 AM – 6:00 PM',
    distance: '650 m',
    walkTime: '8 min walk',
    shortDesc: 'World’s largest art museum & Glass Pyramid.',
    description: 'World’s largest art museum and historic monument home to the Mona Lisa, Venus de Milo, and iconic Glass Pyramid.',
    insideHighlights: [
      'Cour Napoléon & Glass Pyramid',
      'Denon Wing — Mona Lisa Room',
      'Richelieu Wing — French Sculptures',
      'Medieval Moat Underground Walkway'
    ],
    creatorTip: 'Enter via Carrousel du Louvre underground mall for 70% shorter lines in morning hours.',
    img: '/c6-thumb-paris-museums.png',
    x: 75.3,
    y: 45.2,
    color: '#2563eb',
    icon: '🏛️',
  },
  {
    id: 'eiffel',
    type: 'place',
    name: 'Eiffel Tower',
    frenchName: 'La Tour Eiffel',
    area: '7th Arr.',
    address: 'Champ de Mars, 5 Av. Anatole France, 75007 Paris, France',
    lat: 48.8584,
    lng: 2.2945,
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Eiffel+Tower+Champ+de+Mars+Paris',
    rating: 4.9,
    reviewsCount: '340k',
    hours: 'Open 9:00 AM – 11:45 PM',
    distance: '1.8 km',
    walkTime: '22 min walk',
    shortDesc: 'Iconic Parisian skyline monument.',
    description: 'Paris’s defining global emblem on the Champ de Mars with panoramic views spanning the entire Parisian skyline.',
    insideHighlights: [
      'Champ de Mars Central Lawn',
      '1st Floor Glass Floor Observation Deck',
      '2nd Floor Jules Verne Restaurant View',
      'Summit Skydeck & Gustave Eiffel Office'
    ],
    creatorTip: 'Visit 15 minutes before sunset to catch the golden hour glow followed by the hourly sparkle show.',
    img: '/c18-cover-paris.png',
    x: 18.2,
    y: 57.8,
    color: '#d97706',
    icon: '🗼',
  },
  {
    id: 'arc',
    type: 'place',
    name: 'Arc de Triomphe',
    frenchName: 'Arc de Triomphe de l’Étoile',
    area: '8th Arr.',
    address: 'Place Charles de Gaulle, 75008 Paris, France',
    lat: 48.8738,
    lng: 2.2950,
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Arc+de+Triomphe+Place+Charles+de+Gaulle+Paris',
    rating: 4.8,
    reviewsCount: '190k',
    hours: 'Open 10:00 AM – 10:30 PM',
    distance: '2.4 km',
    walkTime: '28 min walk',
    shortDesc: 'Monumental triumphal arch at Champs-Élysées.',
    description: 'Monumental triumphal arch honoring French military history at the western terminus of the Champs-Élysées with sweeping 360° roof views.',
    insideHighlights: [
      'Tomb of the Unknown Soldier & Eternal Flame',
      'Rooftop 360° Panoramic Terrace',
      'Interior Sculpture & History Museum',
      'Champs-Élysées Central Vista Axis'
    ],
    creatorTip: 'Never try to cross the roundabout traffic above ground; use the pedestrian tunnel from the Champs-Élysées side.',
    img: '/c8-thumb-paris.png',
    x: 25.4,
    y: 32.5,
    color: '#7c3aed',
    icon: '🏛️',
  },
  {
    id: 'sacre-coeur',
    type: 'place',
    name: 'Sacré-Cœur',
    frenchName: 'Basilique du Sacré-Cœur de Montmartre',
    area: 'Montmartre',
    address: '35 Rue du Chevalier de la Barre, 75018 Paris, France',
    lat: 48.8867,
    lng: 2.3431,
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Basilique+du+Sacre+Coeur+Montmartre+Paris',
    rating: 4.8,
    reviewsCount: '185k',
    hours: 'Open 6:30 AM – 10:30 PM',
    distance: '3.1 km',
    walkTime: '38 min walk',
    shortDesc: 'Stunning hilltop basilica in Montmartre.',
    description: 'White-domed basilica crowning the Montmartre butte with the highest natural elevation in Paris.',
    insideHighlights: [
      'Apse Mosaic of Christ in Majesty',
      'Dome Ascent for 360° Paris Panorama',
      'Montmartre Artist Square (Place du Tertre)',
      'Louise Michel Hillside Gardens'
    ],
    creatorTip: 'Climb the Dome for the best sunset view in northern Paris, looking over the Eiffel Tower silhouette.',
    img: '/c15-pop-paris.png',
    x: 56.0,
    y: 10.4,
    color: '#059669',
    icon: '🏛️',
  },
];

export default function PurchasedMapView({ onBack, onNavigate }) {
  // Check if user has purchased maps from localStorage
  const [purchasedMaps, setPurchasedMaps] = useState(() => {
    try {
      const saved = localStorage.getItem('planitory_purchased_maps');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return ['paris-essentials'];
  });

  const hasPurchased = purchasedMaps.length > 0;

  // Active Category Filter ('all' | 'museum' | 'cafe' | 'restaurant' | 'park' | 'view')
  const [activeCategory, setActiveCategory] = useState('all');

  // Selected Location (Default is Café de Flore to match reference mockup)
  const [selectedLocation, setSelectedLocation] = useState(() => TOP_PARIS_LOCATIONS[0]);

  // Modals & Map Mode
  const [showInsideModal, setShowInsideModal] = useState(false);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [pinThemeColor, setPinThemeColor] = useState('default');
  const [mapMode, setMapMode] = useState('map'); // 'map' | 'satellite' | '3d'
  const [toastMessage, setToastMessage] = useState(null);

  // Zoom & Pan Engine State
  const [zoomLevel, setZoomLevel] = useState(1); // 1x to 3.5x
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapContainerRef = useRef(null);

  // Multi-Touch Pinch and Double Tap tracking
  const pinchDistRef = useRef(null);
  const pinchZoomStartRef = useRef(1);
  const lastTapRef = useRef(0);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Zoom In / Out Handlers
  const handleZoomIn = () => {
    setZoomLevel((prev) => {
      const next = Math.min(3.5, Number((prev + 0.35).toFixed(2)));
      showToast(`🔍 Zoom: ${Math.round(next * 100)}%`);
      return next;
    });
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const next = Math.max(1, Number((prev - 0.35).toFixed(2)));
      if (next === 1) setPanOffset({ x: 0, y: 0 });
      showToast(`🔍 Zoom: ${Math.round(next * 100)}%`);
      return next;
    });
  };

  const handleResetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    showToast("🧭 Zoom reset & map centered");
  };

  const handleLocateMe = () => {
    setZoomLevel(1.5);
    setPanOffset({ x: 15, y: -10 });
    showToast("📍 GPS: Seine River / Saint-Germain");
  };

  // Select a location pin
  const handleSelectLocation = (loc) => {
    setSelectedLocation(loc);
    // Smooth pan towards the selected pin
    const targetX = -(loc.x - 50) * 2.2;
    const targetY = -(loc.y - 50) * 2.2;
    setPanOffset({ x: targetX, y: targetY });
    showToast(`📍 Selected ${loc.name}`);
  };

  // 🚀 REDIRECT DIRECTLY TO GOOGLE MAPS FOR TURN-BY-TURN DIRECTIONS
  const handleOpenGoogleMaps = (loc) => {
    const target = loc || selectedLocation;
    if (!target) return;
    const url =
      target.googleMapsUrl ||
      `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
        target.name + ' ' + target.address
      )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    showToast(`🚀 Opening ${target.name} in Google Maps Directions...`);
  };

  // Pan Gestures (Mouse)
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

  // Touch Gestures: Single touch Pan + Double Tap Zoom + 2-Finger Pinch to Zoom
  const getTouchDist = (t1, t2) => {
    return Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      // Double tap detector
      const now = Date.now();
      if (now - lastTapRef.current < 320) {
        setZoomLevel((prev) => {
          const next = prev > 1.2 ? 1 : 1.8;
          if (next === 1) setPanOffset({ x: 0, y: 0 });
          showToast(next === 1 ? "Zoom: 100%" : "Zoom: 180%");
          return next;
        });
      }
      lastTapRef.current = now;

      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - panOffset.x,
        y: e.touches[0].clientY - panOffset.y,
      });
      pinchDistRef.current = null;
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      pinchDistRef.current = getTouchDist(e.touches[0], e.touches[1]);
      pinchZoomStartRef.current = zoomLevel;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && pinchDistRef.current) {
      // Pinch to Zoom
      const dist = getTouchDist(e.touches[0], e.touches[1]);
      const factor = dist / pinchDistRef.current;
      const newZoom = Math.min(3.5, Math.max(1, Number((pinchZoomStartRef.current * factor).toFixed(2))));
      setZoomLevel(newZoom);
    } else if (e.touches.length === 1 && isDragging) {
      // Pan
      const maxBound = (zoomLevel - 1) * 220;
      const newX = Math.max(-maxBound, Math.min(maxBound, e.touches[0].clientX - dragStart.x));
      const newY = Math.max(-maxBound, Math.min(maxBound, e.touches[0].clientY - dragStart.y));
      setPanOffset({ x: newX, y: newY });
    }
  };

  const handleTouchEnd = (e) => {
    if (e.touches.length < 2) {
      pinchDistRef.current = null;
    }
    if (e.touches.length === 0) {
      setIsDragging(false);
    }
  };

  // Mouse Wheel Zoom
  const handleWheel = (e) => {
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  // Filter Locations (Exactly 5 curated locations)
  const visibleLocations = TOP_PARIS_LOCATIONS.filter((loc) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'museum') return loc.type === 'museum';
    if (activeCategory === 'cafe') return loc.type === 'cafe';
    if (activeCategory === 'place' || activeCategory === 'landmark') return loc.type === 'place';
    return true;
  });

  // Pin Theme Helper
  const getPinColor = (type, defaultColor) => {
    if (pinThemeColor === 'rose') {
      return type === 'museum' ? '#e11d48' : type === 'cafe' ? '#f43f5e' : '#fb7185';
    }
    if (pinThemeColor === 'emerald') {
      return type === 'museum' ? '#059669' : type === 'cafe' ? '#10b981' : '#34d399';
    }
    if (pinThemeColor === 'sunset') {
      return type === 'museum' ? '#d97706' : type === 'cafe' ? '#f59e0b' : '#fbbf24';
    }
    return defaultColor || (type === 'museum' ? '#6d28d9' : type === 'cafe' ? '#b45309' : '#059669');
  };

  return (
    <div className="relative w-full h-full min-h-0 overflow-hidden bg-[#e8f1f5] sm:rounded-[44px] select-none">
      {/* ===================================================== */}
      {/* 1. FULL-BLEED 3D PARIS MAP CANVAS (100% OF SCREEN)    */}
      {/* ===================================================== */}
      <div
        ref={mapContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onWheel={handleWheel}
        className={`absolute inset-0 w-full h-full overflow-hidden ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        } touch-none bg-[#e8f1f5] z-0`}
      >
        {/* Zoomable & Pannable Inner Map Layer */}
        <div
          style={{
            transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.2, 0, 0, 1)',
          }}
          className="relative w-full h-full"
        >
          {/* 3D Paris Map Graphic */}
          <img
            src="/c21-map-canvas.png"
            alt="3D Paris Street Map"
            className="w-full h-full object-cover pointer-events-none select-none"
            draggable={false}
          />

          {/* Pulsing Blue Live GPS Radar User Beacon (Seine River) */}
          <div
            style={{
              left: '49.8%',
              top: '56.3%',
              transform: `translate(-50%, -50%) scale(${1 / Math.max(1, zoomLevel)})`,
              transformOrigin: 'center center',
            }}
            className="absolute pointer-events-none z-10"
          >
            <div className="w-16 h-16 -ml-8 -mt-8 absolute top-1/2 left-1/2 rounded-full bg-blue-400/20 animate-ping" />
            <div className="w-10 h-10 -ml-5 -mt-5 absolute top-1/2 left-1/2 rounded-full bg-blue-500/25 animate-pulse" />
            <div className="w-4 h-4 rounded-full bg-[#3b82f6] ring-3 ring-white shadow-lg relative z-10 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-white rounded-full" />
            </div>
          </div>

          {/* Interactive Curated Map Pins (All 5 Locations Always Clickable) */}
          {TOP_PARIS_LOCATIONS.map((loc) => {
            const isSelected = selectedLocation?.id === loc.id;
            const isDimmed = activeCategory !== 'all' && (
              (activeCategory === 'museum' && loc.type !== 'museum') ||
              (activeCategory === 'cafe' && loc.type !== 'cafe') ||
              ((activeCategory === 'place' || activeCategory === 'landmark') && loc.type !== 'place')
            );

            const isLeftEdge = loc.x < 35;
            const isRightEdge = loc.x > 68;
            const isTopEdge = loc.y < 25;

            return (
              <div
                key={loc.id}
                style={{
                  left: `${loc.x}%`,
                  top: `${loc.y}%`,
                  transform: `translate(-50%, -50%) scale(${1 / Math.max(1, zoomLevel)})`,
                  transformOrigin: 'center center',
                }}
                className={`absolute transition-transform duration-200 ${
                  isSelected ? 'z-50' : 'z-20'
                }`}
              >
                {/* Floating Callout Tooltip anchored above active landmark */}
                {isSelected && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenGoogleMaps(loc);
                    }}
                    onTouchEnd={(e) => {
                      e.stopPropagation();
                      handleOpenGoogleMaps(loc);
                    }}
                    style={{
                      transform: isLeftEdge
                        ? 'translateX(-12%)'
                        : isRightEdge
                        ? 'translateX(-88%)'
                        : 'translateX(-50%)',
                    }}
                    className={`absolute ${
                      isTopEdge ? 'top-full mt-4' : 'bottom-full mb-4'
                    } left-1/2 z-50 bg-white/95 backdrop-blur-md rounded-[22px] p-2.5 shadow-[0_16px_36px_rgba(0,0,0,0.24)] border border-slate-100 flex items-center gap-2.5 min-w-[210px] max-w-[250px] cursor-pointer hover:shadow-2xl active:scale-95 transition-all animate-in zoom-in-95 duration-200`}
                  >
                    <img
                      src={loc.img}
                      alt={loc.name}
                      className="w-11 h-11 rounded-xl object-cover shrink-0 shadow-2xs border border-black/5 pointer-events-none"
                    />
                    <div className="flex-1 min-w-0 pr-1">
                      <h4 className="font-black text-[12.5px] text-[#0f1738] leading-tight truncate">
                        {loc.name}
                      </h4>
                      <p className="text-[9.5px] text-[#717ea1] truncate leading-tight mt-0.5">
                        {loc.shortDesc || loc.description}
                      </p>
                      <div className="flex items-center gap-1 text-[10.5px] font-black text-amber-500 mt-0.5">
                        <span>★ {loc.rating}</span>
                        <span className="text-slate-400 font-medium text-[9.5px]">
                          ({loc.reviewsCount || '320'})
                        </span>
                      </div>
                    </div>
                    {/* Navigation Icon Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenGoogleMaps(loc);
                      }}
                      className="w-8 h-8 rounded-full bg-[#544ee5] text-white flex items-center justify-center hover:bg-[#4338ca] active:scale-90 transition-all shrink-0 shadow-md shadow-indigo-300"
                      title="Directions in Google Maps"
                    >
                      <Navigation className="w-3.5 h-3.5 fill-current rotate-45" />
                    </button>
                  </div>
                )}

                {/* Animated Ripple for selected pin */}
                {isSelected && (
                  <div
                    className="absolute inset-0 rounded-full animate-ping opacity-75"
                    style={{ backgroundColor: getMarkerColor(loc.type, loc.color) }}
                  />
                )}

                {/* Primary Interactive Pin */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectLocation(loc);
                  }}
                  onTouchEnd={(e) => {
                    e.stopPropagation();
                    handleSelectLocation(loc);
                  }}
                  className={`relative flex items-center justify-center rounded-full shadow-[0_4px_14px_rgba(0,0,0,0.35)] transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'w-10 h-10 ring-4 ring-white shadow-2xl scale-110 z-40'
                      : isDimmed
                      ? 'w-7 h-7 opacity-40 hover:opacity-100 hover:scale-110'
                      : 'w-8 h-8 hover:scale-125 ring-2 ring-white/90 hover:ring-white'
                  }`}
                  style={{
                    backgroundColor: getMarkerColor(loc.type, loc.color),
                  }}
                  title={`${loc.name} - ${loc.frenchName}`}
                >
                  <span className={`${isSelected ? 'text-[17px]' : 'text-[13px]'} select-none drop-shadow-sm`}>
                    {loc.icon}
                  </span>
                </button>

                {/* Pin Label Badge */}
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectLocation(loc);
                  }}
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded-full text-[9.5px] font-bold whitespace-nowrap shadow-sm border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0f1738] text-white border-white/20 shadow-md font-extrabold z-40 scale-105'
                      : isDimmed
                      ? 'bg-white/70 text-[#0f1738]/50 border-slate-200/50'
                      : 'bg-white/95 text-[#0f1738] border-slate-200/80 hover:bg-white'
                  }`}
                >
                  {loc.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ===================================================== */}
      {/* 2. FLOATING TOP HEADER & FILTER PILLS OVER MAP        */}
      {/* ===================================================== */}
      <div className="absolute top-0 left-0 right-0 z-30 pt-2 sm:pt-4 px-3 sm:px-4 bg-gradient-to-b from-black/25 via-black/10 to-transparent pb-4 pointer-events-none">
        {/* Floating Header Bar */}
        <div className="flex items-center justify-between pointer-events-auto bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.08)] border border-white/60">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#0f1738] active:scale-95 transition-all cursor-pointer shrink-0 shadow-2xs"
            title="Go back"
          >
            <ArrowLeft className="w-4.5 h-4.5 stroke-[2.4]" />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-1.5">
              <span className="text-sm">🗼</span>
              <h1 className="text-[16px] sm:text-[18px] font-extrabold text-[#0f1738] tracking-tight font-serif leading-tight">
                Paris Essentials
              </h1>
            </div>
            <p className="text-[10px] text-[#717ea1] font-semibold">
              5 Curated Locations
            </p>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => showToast("❤️ Saved Paris Essentials to Favorites")}
              className="w-9 h-9 rounded-full bg-slate-100 hover:text-[#544ee5] flex items-center justify-center text-[#0f1738] active:scale-95 transition-all cursor-pointer shadow-2xs"
              title="Favorite"
            >
              <Heart className="w-4 h-4 stroke-[2]" />
            </button>
            <button
              onClick={() => setShowCustomizeModal(true)}
              className="w-9 h-9 rounded-full bg-slate-100 hover:text-[#544ee5] flex items-center justify-center text-[#0f1738] active:scale-95 transition-all cursor-pointer shadow-2xs"
              title="Options"
            >
              <MoreVertical className="w-4 h-4 stroke-[2]" />
            </button>
          </div>
        </div>

        {/* Floating Category Filter Pills */}
        <div className="flex items-center gap-1.5 pt-2 overflow-x-auto scrollbar-none pointer-events-auto">
          <button
            onClick={() => { setActiveCategory('all'); showToast("Showing All 5 Curated Spots"); }}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full font-bold text-[11px] backdrop-blur-md transition-all cursor-pointer shrink-0 shadow-sm ${
              activeCategory === 'all'
                ? 'bg-[#0f1738] text-white'
                : 'bg-white/90 text-[#0f1738] border border-white/60 hover:bg-white'
            }`}
          >
            <LayoutGrid className="w-3 h-3" />
            <span>All (5)</span>
          </button>

          <button
            onClick={() => {
              setActiveCategory('museum');
              const louvre = TOP_PARIS_LOCATIONS.find((l) => l.id === 'louvre');
              if (louvre) handleSelectLocation(louvre);
            }}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full font-bold text-[11px] backdrop-blur-md transition-all cursor-pointer shrink-0 shadow-sm ${
              activeCategory === 'museum'
                ? 'bg-[#0f1738] text-white'
                : 'bg-white/90 text-[#0f1738] border border-white/60 hover:bg-white'
            }`}
          >
            <Landmark className="w-3 h-3 text-purple-600" />
            <span>1 Museum</span>
          </button>

          <button
            onClick={() => {
              setActiveCategory('cafe');
              const flore = TOP_PARIS_LOCATIONS.find((l) => l.id === 'flore');
              if (flore) handleSelectLocation(flore);
            }}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full font-bold text-[11px] backdrop-blur-md transition-all cursor-pointer shrink-0 shadow-sm ${
              activeCategory === 'cafe'
                ? 'bg-[#0f1738] text-white'
                : 'bg-white/90 text-[#0f1738] border border-white/60 hover:bg-white'
            }`}
          >
            <Coffee className="w-3 h-3 text-amber-700" />
            <span>1 Café</span>
          </button>

          <button
            onClick={() => {
              setActiveCategory('place');
              const eiffel = TOP_PARIS_LOCATIONS.find((l) => l.id === 'eiffel');
              if (eiffel) handleSelectLocation(eiffel);
            }}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full font-bold text-[11px] backdrop-blur-md transition-all cursor-pointer shrink-0 shadow-sm ${
              activeCategory === 'place'
                ? 'bg-[#0f1738] text-white'
                : 'bg-white/90 text-[#0f1738] border border-white/60 hover:bg-white'
            }`}
          >
            <Trees className="w-3 h-3 text-emerald-600" />
            <span>3 Landmarks</span>
          </button>
        </div>
      </div>

      {/* ===================================================== */}
      {/* 3. FLOATING RIGHT CONTROL STACK                       */}
      {/* ===================================================== */}
      <div className="absolute right-3 top-28 sm:top-28 z-20 flex flex-col gap-1.5">
        {/* Zoom In Button */}
        <button
          onClick={() => handleZoomStep(0.25)}
          className="w-9 h-9 rounded-xl bg-white/95 backdrop-blur-md shadow-[0_3px_12px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center text-[#0f1738] hover:text-[#544ee5] active:scale-90 transition-all cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4 stroke-[2.2]" />
        </button>

        {/* Zoom Out Button */}
        <button
          onClick={() => handleZoomStep(-0.25)}
          className="w-9 h-9 rounded-xl bg-white/95 backdrop-blur-md shadow-[0_3px_12px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center text-[#0f1738] hover:text-[#544ee5] active:scale-90 transition-all cursor-pointer"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4 stroke-[2.2]" />
        </button>

        {/* Reset View Button */}
        {(zoomLevel !== 1 || panOffset.x !== 0 || panOffset.y !== 0) && (
          <button
            onClick={handleResetView}
            className="w-9 h-9 rounded-xl bg-indigo-50/95 backdrop-blur-md shadow-[0_3px_12px_rgba(0,0,0,0.12)] border border-indigo-200 flex items-center justify-center text-[#544ee5] hover:bg-indigo-100 active:scale-90 transition-all cursor-pointer animate-in fade-in zoom-in-75 duration-150"
            title="Reset View to 100%"
          >
            <RotateCcw className="w-4 h-4 stroke-[2.2]" />
          </button>
        )}

        {/* GPS Recenter */}
        <button
          onClick={handleLocateUser}
          className="w-9 h-9 rounded-xl bg-white/95 backdrop-blur-md shadow-[0_3px_12px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center text-[#3b82f6] hover:text-[#1d4ed8] active:scale-90 transition-all cursor-pointer"
          title="Recenter on My Location"
        >
          <Crosshair className="w-4 h-4 stroke-[2.2]" />
        </button>

        {/* Layers Toggle */}
        <button
          onClick={() => {
            const nextMode = mapMode === 'map' ? 'satellite' : mapMode === 'satellite' ? '3d' : 'map';
            setMapMode(nextMode);
            showToast(`Switched map layer to: ${nextMode.toUpperCase()}`);
          }}
          className="w-9 h-9 rounded-xl bg-white/95 backdrop-blur-md shadow-[0_3px_12px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center text-[#0f1738] hover:text-[#544ee5] active:scale-90 transition-all cursor-pointer"
          title="Toggle Layers"
        >
          <Layers className="w-4 h-4 stroke-[2.2]" />
        </button>
      </div>

      {/* ===================================================== */}
      {/* 4. FLOATING BOTTOM CONTROLS & LOCATION CARD          */}
      {/* ===================================================== */}
      <div className="absolute bottom-2.5 left-2.5 right-2.5 z-30 space-y-2 pointer-events-none">
        {/* Mode switcher + Customize Pill row */}
        <div className="flex items-center justify-between pointer-events-auto px-0.5">
          <button
            onClick={() => setShowCustomizeModal(true)}
            className="bg-gradient-to-r from-[#5a50ec] to-[#746af4] text-white px-3 py-1.5 rounded-full shadow-md flex items-center gap-1 text-[11px] font-bold active:scale-95 hover:shadow-indigo-400/50 transition-all cursor-pointer"
          >
            <Sparkles className="w-3 h-3 text-amber-200" />
            <span>Customize</span>
          </button>

          <div className="bg-white/95 backdrop-blur-md p-0.5 rounded-full shadow-md border border-slate-100 flex items-center gap-0.5 text-[10.5px] font-bold">
            <button
              onClick={() => setMapMode('map')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                mapMode === 'map' ? 'bg-[#0f1738] text-white shadow-xs' : 'text-slate-600 hover:text-black'
              }`}
            >
              Map
            </button>
            <button
              onClick={() => setMapMode('satellite')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                mapMode === 'satellite' ? 'bg-[#0f1738] text-white shadow-xs' : 'text-slate-600 hover:text-black'
              }`}
            >
              Satellite
            </button>
            <button
              onClick={() => setMapMode('3d')}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                mapMode === '3d' ? 'bg-[#0f1738] text-white shadow-xs' : 'text-slate-600 hover:text-black'
              }`}
            >
              3D
            </button>
          </div>
        </div>

        {/* Floating Location Detail Card */}
        {selectedLocation && (
          <div className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-[22px] p-2.5 sm:p-3 shadow-[0_8px_30px_rgba(0,0,0,0.18)] border border-slate-100 flex items-center justify-between gap-2.5 animate-in slide-in-from-bottom-2 duration-200">
            <img
              src={selectedLocation.img}
              alt={selectedLocation.name}
              className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl object-cover shrink-0 shadow-xs border border-black/5 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => handleOpenGoogleMaps(selectedLocation)}
            />

            <div
              className="flex-1 min-w-0 pr-0.5 cursor-pointer"
              onClick={() => handleOpenGoogleMaps(selectedLocation)}
            >
              <h3 className="font-bold font-serif text-[14.5px] sm:text-[16px] text-[#0f1738] leading-tight truncate hover:text-[#544ee5] transition-colors">
                {selectedLocation.name}
              </h3>
              <p className="text-[10px] sm:text-[11px] text-[#717ea1] truncate mt-0.5 font-medium">
                {selectedLocation.shortDesc || selectedLocation.description}
              </p>
              <div className="flex items-center gap-1.5 text-[9.5px] sm:text-[10.5px] text-[#717ea1] font-semibold mt-0.5">
                <span className="text-amber-500 font-bold">★ {selectedLocation.rating}</span>
                <span>&bull;</span>
                <span className="text-slate-600">{selectedLocation.area || 'Paris'}</span>
              </div>
            </div>

            {/* Direct Google Maps Navigation Button */}
            <button
              onClick={() => handleOpenGoogleMaps(selectedLocation)}
              className="px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-xl sm:rounded-2xl bg-[#4f46e5] hover:bg-[#4338ca] active:scale-95 text-white font-bold text-[11px] sm:text-[12px] flex items-center gap-1 shrink-0 transition-all cursor-pointer shadow-md shadow-indigo-300/40"
              title="Open in Google Maps"
            >
              <Navigation className="w-3 h-3 fill-current rotate-45" />
              <span>Get Direction</span>
            </button>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 🏛️ PLACE DETAILS & GOOGLE MAPS REDIRECTION DRAWER         */}
      {/* ========================================================= */}
      {showInsideModal && selectedLocation && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-end justify-center p-3 animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-indigo-50 space-y-3.5 max-h-[85vh] overflow-y-auto scrollbar-none">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-base">{selectedLocation.icon}</span>
                <h3 className="font-black text-[16px] text-[#0f1738]">
                  {selectedLocation.name}
                </h3>
              </div>
              <button
                onClick={() => setShowInsideModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cover Hero Photo */}
            <div className="relative w-full h-36 rounded-2xl overflow-hidden shadow-inner border border-black/5">
              <img
                src={selectedLocation.img}
                alt={selectedLocation.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-xs text-white text-[10.5px] font-bold flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-red-400" />
                <span>{selectedLocation.address}</span>
              </div>
            </div>

            {/* Location Description & Rating */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-amber-500 font-black text-xs">★ {selectedLocation.rating}</span>
                  <span className="text-slate-400 text-xs font-semibold">({selectedLocation.reviewsCount || '320'} reviews)</span>
                </div>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full text-[10.5px] font-bold">
                  {selectedLocation.hours}
                </span>
              </div>
              <p className="text-[11.5px] text-[#556080] leading-relaxed pt-0.5">
                {selectedLocation.description}
              </p>
            </div>

            {/* Creator Tip */}
            <div className="p-2.5 rounded-2xl bg-[#f5f3ff] border border-indigo-100 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#544ee5] shrink-0 mt-0.5" />
              <div className="text-[11px] text-[#4b43c6] leading-tight">
                <strong className="font-bold">Creator Tip:</strong> {selectedLocation.creatorTip}
              </div>
            </div>

            {/* Key Highlights Checklist */}
            <div className="space-y-1.5">
              <span className="text-[12px] font-extrabold text-[#0f1738] block">
                Must-See Highlights &amp; Spots
              </span>
              <div className="space-y-1.5">
                {selectedLocation.insideHighlights?.map((hl, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-[11.5px] font-semibold text-[#1f2937] flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#544ee5] shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Audio Story Bar */}
            <div className="p-3 rounded-2xl bg-indigo-50/90 border border-indigo-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#544ee5] text-white flex items-center justify-center shadow-sm shrink-0">
                  <Volume2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[12px] font-extrabold text-[#0f1738]">
                    Audio Story Guide
                  </div>
                  <div className="text-[10px] text-[#717ea1] flex items-center gap-1.5 mt-0.5">
                    <span>{selectedLocation.walkTime}</span>
                    <span>&bull;</span>
                    <span className="text-emerald-600 font-bold">Narration Ready</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  showToast(`🎧 Playing audio narration for ${selectedLocation.name}`);
                }}
                className="px-3.5 py-1.5 bg-[#544ee5] text-white font-bold text-[11.5px] rounded-xl shadow-xs hover:bg-[#4842db] active:scale-95 cursor-pointer transition-all shrink-0"
              >
                Play Audio 🔊
              </button>
            </div>

            {/* Primary Get Direction Action Button */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => handleOpenGoogleMaps(selectedLocation)}
                className="flex-1 py-3.5 bg-gradient-to-r from-[#544ee5] to-[#6366f1] hover:from-[#4842db] hover:to-[#544ee5] text-white font-bold rounded-2xl text-[13.5px] shadow-lg shadow-indigo-300/40 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
              >
                <Navigation className="w-4 h-4 fill-current rotate-45" />
                <span>Get Direction in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </button>

              <button
                onClick={() => setShowInsideModal(false)}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-[12.5px] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MAP CUSTOMIZATION MODAL                                  */}
      {/* ========================================================= */}
      {showCustomizeModal && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-indigo-50 space-y-4">
            <div className="flex justify-between items-center pb-1 border-b border-slate-100">
              <div className="flex items-center gap-2 text-[#544ee5]">
                <Palette className="w-5 h-5" />
                <h3 className="font-bold text-[#111936] text-base">Customize Map Style</h3>
              </div>
              <button
                onClick={() => setShowCustomizeModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-700 block mb-2">
                Pin &amp; Landmark Theme
              </span>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'default', name: 'Original', bg: 'bg-[#544ee5]' },
                  { id: 'rose', name: 'Pastel', bg: 'bg-[#e11d48]' },
                  { id: 'emerald', name: 'Emerald', bg: 'bg-[#059669]' },
                  { id: 'sunset', name: 'Sunset', bg: 'bg-[#d97706]' },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setPinThemeColor(c.id)}
                    className={`p-2 rounded-2xl flex flex-col items-center gap-1.5 border transition-all cursor-pointer ${
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
            </div>

            <button
              onClick={() => {
                setShowCustomizeModal(false);
                showToast("✨ Map customization applied!");
              }}
              className="w-full py-3 bg-[#544ee5] hover:bg-[#4842db] text-white font-bold rounded-xl text-sm shadow-md shadow-indigo-200 transition-all cursor-pointer"
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
