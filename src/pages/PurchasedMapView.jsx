import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Settings,
  Pencil,
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
  ZoomIn,
  ZoomOut,
  Compass,
  RotateCcw,
  Sparkles,
  ExternalLink,
  MapPin,
  Layers,
  ShoppingBag,
  Footprints,
  Clock,
  Share2,
  Volume2,
  Info,
  Maximize2
} from 'lucide-react';

// Exactly 5 Top Curated Paris Locations
export const TOP_5_LOCATIONS = [
  {
    id: 'louvre',
    type: 'museum',
    name: 'Louvre Museum',
    frenchName: 'Musée du Louvre',
    area: '1st Arr.',
    address: 'Rue de Rivoli, 75001 Paris, France',
    lat: 48.8606,
    lng: 2.3376,
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Louvre+Museum+Paris',
    rating: 4.9,
    reviews: '142k reviews',
    hours: 'Open 9:00 AM – 6:00 PM',
    distance: '650 m',
    walkTime: '8 min walk',
    turn1: 'In 120m, Turn Left onto Pont du Carrousel',
    turn2: 'Continue straight into Cour Napoléon Glass Pyramid entrance',
    description: 'World’s largest art museum and historic monument home to the Mona Lisa, Venus de Milo, and iconic Glass Pyramid.',
    insideHighlights: [
      'Cour Napoléon & Glass Pyramid',
      'Denon Wing — Mona Lisa Room',
      'Richelieu Wing — French Sculptures',
      'Medieval Moat Underground Walkway'
    ],
    creatorTip: 'Enter via Carrousel du Louvre underground mall for 70% shorter lines in morning hours.',
    img: '/c6-thumb-paris-museums.png',
    x: 62,
    y: 35,
    color: '#6941c6',
    icon: '🏛️',
  },
  {
    id: 'eiffel',
    type: 'place',
    name: 'Tour Eiffel',
    frenchName: 'La Tour Eiffel',
    area: '7th Arr.',
    address: 'Champ de Mars, 5 Av. Anatole France, 75007 Paris, France',
    lat: 48.8584,
    lng: 2.2945,
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Eiffel+Tower+Paris',
    rating: 4.9,
    reviews: '340k reviews',
    hours: 'Open 9:00 AM – 11:45 PM',
    distance: '1.8 km',
    walkTime: '22 min walk',
    turn1: 'In 250m, Continue along Quai Branly towards riverfront',
    turn2: 'Cross Avenue de la Bourdonnais into Champ de Mars Gate 1',
    description: 'Paris’s defining global emblem on the Champ de Mars with panoramic views spanning the entire Parisian skyline.',
    insideHighlights: [
      'Champ de Mars Central Lawn',
      '1st Floor Glass Floor Observation Deck',
      '2nd Floor Jules Verne Restaurant View',
      'Summit Skydeck & Gustave Eiffel Office'
    ],
    creatorTip: 'Visit 15 minutes before sunset to catch the golden hour glow followed by the hourly sparkle show.',
    img: '/c18-cover-paris.png',
    x: 29,
    y: 47,
    color: '#059669',
    icon: '⭐',
  },
  {
    id: 'flore',
    type: 'cafe',
    name: 'Café de Flore',
    frenchName: 'Café de Flore',
    area: '6th Arr.',
    address: '172 Boulevard Saint-Germain, 75006 Paris, France',
    lat: 48.8543,
    lng: 2.3328,
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Cafe+de+Flore+Paris',
    rating: 4.7,
    reviews: '26k reviews',
    hours: 'Open 7:30 AM – 1:30 AM',
    distance: '900 m',
    walkTime: '11 min walk',
    turn1: 'In 90m, Turn Right onto Rue Bonaparte',
    turn2: 'Walk 180m south directly to Boulevard Saint-Germain terrace',
    description: 'Historic cafe famous for existentialist writers, artisanal thick hot chocolate, and classic red-awning sidewalk terrace.',
    insideHighlights: [
      'Ground Floor Heated Outdoor Terrace',
      'Art Deco Mahogany Booths',
      'Signature Chocolat Chaud Spécial',
      'Fresh Morning Croissants & Brioche'
    ],
    creatorTip: 'Ask for a terrace table under the green foliage and order the hot chocolate served with fresh chantilly cream in a silver pitcher.',
    img: '/c7-photo-cafe-de-flore.png',
    x: 44,
    y: 29,
    color: '#ea580c',
    icon: '☕',
  },
  {
    id: 'notre-dame',
    type: 'place',
    name: 'Notre-Dame Cathedral',
    frenchName: 'Cathédrale Notre-Dame de Paris',
    area: '4th Arr.',
    address: '6 Parvis Notre-Dame - Pl. Jean-Paul II, 75004 Paris, France',
    lat: 48.8530,
    lng: 2.3499,
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Notre-Dame+Cathedral+Paris',
    rating: 4.8,
    reviews: '210k reviews',
    hours: 'Parvis open 8:00 AM – 7:00 PM',
    distance: '1.1 km',
    walkTime: '14 min walk',
    turn1: 'In 140m, Cross Pont d’Arcole to Île de la Cité',
    turn2: 'Walk 90m south into Parvis Jean-Paul II square',
    description: 'Masterpiece of French Gothic architecture on Île de la Cité featuring magnificent rose windows and twin western bell towers.',
    insideHighlights: [
      'Parvis Jean-Paul II Main Square',
      'West Façade Portal of the Virgin',
      'South Rose Window & Spire View',
      'Square Jean XXIII Riverside Garden'
    ],
    creatorTip: 'Walk along the south bank of the Seine on Quai de Montebello for the classic postcard view of the flying buttresses.',
    img: '/c15-pop-paris.png',
    x: 84,
    y: 52,
    color: '#059669',
    icon: '⭐',
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
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Arc+de+Triomphe+Paris',
    rating: 4.8,
    reviews: '190k reviews',
    hours: 'Open 10:00 AM – 10:30 PM',
    distance: '2.4 km',
    walkTime: '28 min walk',
    turn1: 'In 320m, Head northwest on Avenue des Champs-Élysées',
    turn2: 'Use Passage du Souvenir pedestrian tunnel under the roundabout',
    description: 'Monumental triumphal arch honoring French military history at the western terminus of the Champs-Élysées with sweeping 360° roof views.',
    insideHighlights: [
      'Tomb of the Unknown Soldier & Eternal Flame',
      'Rooftop 360° Panoramic Terrace',
      'Interior Sculpture & History Museum',
      'Champs-Élysées Central Vista Axis'
    ],
    creatorTip: 'Never try to cross the roundabout traffic above ground; use the pedestrian tunnel from the Champs-Élysées side.',
    img: '/c8-thumb-paris.png',
    x: 18,
    y: 19,
    color: '#059669',
    icon: '⭐',
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

  // Active Map Controls
  const [activeCategory, setActiveCategory] = useState('all'); // 'all' | 'museum' | 'cafe' | 'place'
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showDirectionsModal, setShowDirectionsModal] = useState(false);
  const [showInsideModal, setShowInsideModal] = useState(false);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [pinThemeColor, setPinThemeColor] = useState('default');
  const [toastMessage, setToastMessage] = useState(null);

  // In-App Live Walking Navigation State
  const [isNavigating, setIsNavigating] = useState(false);
  const [navProgress, setNavProgress] = useState(0);

  // Live walking step simulation when navigating
  useEffect(() => {
    let interval = null;
    if (isNavigating && selectedLocation) {
      interval = setInterval(() => {
        setNavProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 5;
        });
      }, 700);
    } else {
      setNavProgress(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isNavigating, selectedLocation]);

  // Zoom & Pan Engine State
  const [zoomLevel, setZoomLevel] = useState(1); // 1x to 2.5x
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [focusedPinId, setFocusedPinId] = useState(null);
  const mapContainerRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Zoom In / Out Handlers
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(2.5, Number((prev + 0.35).toFixed(2))));
    showToast(`Zoom: ${Math.round(Math.min(2.5, zoomLevel + 0.35) * 100)}%`);
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const next = Math.max(1, Number((prev - 0.35).toFixed(2)));
      if (next === 1) setPanOffset({ x: 0, y: 0 });
      return next;
    });
    showToast(`Zoom: ${Math.round(Math.max(1, zoomLevel - 0.35) * 100)}%`);
  };

  const handleResetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setSelectedLocation(null);
    setFocusedPinId(null);
    setIsNavigating(false);
    showToast("Map centered on Paris");
  };

  const handleLocateMe = () => {
    setZoomLevel(1.5);
    setPanOffset({ x: 0, y: 0 });
    showToast("📍 GPS Position: Seine River (1st Arr.)");
  };

  // Focus directly onto a location
  const handleSelectLocation = (loc) => {
    setSelectedLocation(loc);
    setFocusedPinId(loc.id);
    // Smoothly pan & zoom towards location
    const targetX = -(loc.x - 50) * 2.8;
    const targetY = -(loc.y - 50) * 2.8;
    setZoomLevel(1.6);
    setPanOffset({ x: targetX, y: targetY });
    setShowDirectionsModal(true);
  };

  // Option 1: Start In-App Live Walking Navigation
  const handleStartInAppNav = () => {
    if (!selectedLocation) return;
    setShowDirectionsModal(false);
    setShowInsideModal(false);
    setIsNavigating(true);
    setNavProgress(0);
    // Center map on route
    const midX = -((50 + selectedLocation.x) / 2 - 50) * 2.2;
    const midY = -((38 + selectedLocation.y) / 2 - 50) * 2.2;
    setZoomLevel(1.6);
    setPanOffset({ x: midX, y: midY });
    showToast(`🟢 In-App Live Navigation active for ${selectedLocation.name}`);
  };

  const handleStopInAppNav = () => {
    setIsNavigating(false);
    setNavProgress(0);
    showToast("⏹️ In-App Navigation ended");
  };

  // Option 2: Explore Inside Map (In-App Zoom & Highlight)
  const handleExploreInsideMap = () => {
    if (!selectedLocation) return;
    setShowDirectionsModal(false);
    setShowInsideModal(true);
    // Deep zoom into location
    const targetX = -(selectedLocation.x - 50) * 3.5;
    const targetY = -(selectedLocation.y - 50) * 3.5;
    setZoomLevel(2.2);
    setPanOffset({ x: targetX, y: targetY });
    showToast(`🗺️ Exploring inside ${selectedLocation.name}`);
  };

  // Option 3: Open in Google Maps Direction
  const handleOpenGoogleMaps = () => {
    if (!selectedLocation) return;
    const url = selectedLocation.googleMapsUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedLocation.name + ' ' + selectedLocation.address)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    showToast(`🚀 Opening ${selectedLocation.name} in Google Maps...`);
  };

  // Pan Gestures (Mouse & Touch)
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const maxBound = (zoomLevel - 1) * 200;
    const newX = Math.max(-maxBound, Math.min(maxBound, e.clientX - dragStart.x));
    const newY = Math.max(-maxBound, Math.min(maxBound, e.clientY - dragStart.y));
    setPanOffset({ x: newX, y: newY });
  };

  const handleMouseUp = () => setIsDragging(false);

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
    if (!isDragging || e.touches.length !== 1) return;
    const maxBound = (zoomLevel - 1) * 200;
    const newX = Math.max(-maxBound, Math.min(maxBound, e.touches[0].clientX - dragStart.x));
    const newY = Math.max(-maxBound, Math.min(maxBound, e.touches[0].clientY - dragStart.y));
    setPanOffset({ x: newX, y: newY });
  };

  const handleTouchEnd = () => setIsDragging(false);

  // Filter 5 Locations
  const visibleLocations = TOP_5_LOCATIONS.filter(
    (loc) => activeCategory === 'all' || loc.type === activeCategory
  );

  // Pin Theme Helper
  const getPinColor = (type) => {
    if (pinThemeColor === 'rose') {
      return type === 'museum' ? '#e11d48' : type === 'cafe' ? '#f43f5e' : '#fb7185';
    }
    if (pinThemeColor === 'emerald') {
      return type === 'museum' ? '#059669' : type === 'cafe' ? '#10b981' : '#34d399';
    }
    if (pinThemeColor === 'sunset') {
      return type === 'museum' ? '#d97706' : type === 'cafe' ? '#f59e0b' : '#fbbf24';
    }
    return type === 'museum' ? '#544ee5' : type === 'cafe' ? '#ea580c' : '#059669';
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#fafbfe] sm:rounded-[44px] flex flex-col justify-between select-none">
      {/* ========================================================= */}
      {/* SCENARIO A: USER HAS NO PURCHASED MAPS (EMPTY STATE)     */}
      {/* ========================================================= */}
      {!hasPurchased && (
        <div className="flex-1 flex flex-col justify-between">
          {/* Top Header */}
          <div className="w-full pt-3 sm:pt-4 px-6 z-20 shrink-0 bg-[#fafbfe]/95 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs font-semibold text-[#0f1738] mb-2 px-1">
              <span className="text-[13px] tracking-tight font-bold">9:41</span>
              <div className="flex items-center gap-1.5">
                <div className="flex items-end gap-[1.5px] h-3">
                  <div className="w-[3px] h-1 bg-[#0f1738] rounded-[0.5px]" />
                  <div className="w-[3px] h-1.5 bg-[#0f1738] rounded-[0.5px]" />
                  <div className="w-[3px] h-2 bg-[#0f1738] rounded-[0.5px]" />
                  <div className="w-[3px] h-3 bg-[#0f1738] rounded-[0.5px]" />
                </div>
                <div className="w-5 h-2.5 border border-[#0f1738] rounded-[3px] p-[1px] flex items-center">
                  <div className="w-full h-full bg-[#0f1738] rounded-[1px]" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-1">
              <button
                onClick={onBack}
                className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center text-[#111936] hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
                title="Go back"
              >
                <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
              </button>
              <h1 className="text-[18px] font-extrabold text-[#0f1738] tracking-tight">
                My Maps
              </h1>
              <div className="w-9" />
            </div>
          </div>

          {/* Empty State Body */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center space-y-4 -mt-10">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-100 to-indigo-50 flex items-center justify-center shadow-inner border border-indigo-100">
                <MapIcon className="w-11 h-11 text-[#544ee5] stroke-[1.8]" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-[#544ee5] text-white flex items-center justify-center shadow-lg shadow-indigo-300">
                <Compass className="w-5 h-5 animate-spin-slow stroke-[2.2]" />
              </div>
            </div>

            <div className="space-y-1.5 max-w-xs">
              <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-[#544ee5] text-[11px] font-bold tracking-wide uppercase">
                0 Active Maps
              </div>
              <h2 className="text-[20px] font-black text-[#0f1738] tracking-tight">
                You currently have no maps
              </h2>
              <p className="text-[13px] text-[#717ea1] font-medium leading-relaxed">
                Explore curated maps handcrafted by local creators. Unlock offline navigation, secret spots, and custom itineraries.
              </p>
            </div>

            <div className="w-full max-w-xs space-y-2.5 pt-2">
              <button
                onClick={() => onNavigate && onNavigate('explore')}
                className="w-full py-3.5 bg-[#544ee5] hover:bg-[#4842db] active:scale-[0.99] text-white font-bold rounded-2xl text-[14px] shadow-lg shadow-indigo-300/40 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Explore Maps</span>
              </button>

              <button
                onClick={() => {
                  setPurchasedMaps(['paris-essentials']);
                  localStorage.setItem('planitory_purchased_maps', JSON.stringify(['paris-essentials']));
                  showToast("✨ Paris Essentials unlocked with 5 top locations!");
                }}
                className="w-full py-3 bg-white border border-[#e4e8f7] hover:border-indigo-200 active:scale-[0.99] text-[#544ee5] font-bold rounded-2xl text-[13px] shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Try Sample Paris Map</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SCENARIO B: REAL WORKING INTERACTIVE MAP (5 TOP LOCATIONS) */}
      {/* ========================================================= */}
      {hasPurchased && (
        <>
          {/* Top Header & Category Filters */}
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
                className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center text-[#111936] hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
                title="Go back"
              >
                <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
              </button>

              <div className="flex flex-col items-center">
                <h1 className="text-[18px] sm:text-[19px] font-extrabold text-[#0f1738] tracking-tight leading-tight">
                  Paris Essentials
                </h1>
                <span className="text-[11.5px] text-[#717ea1] font-medium tracking-tight">
                  Museums &bull; Cafés &bull; Top Places
                </span>
              </div>

              <button
                onClick={() => showToast("Map Settings: High-accuracy GPS active")}
                className="w-9 h-9 -mr-2 rounded-full flex items-center justify-center text-[#111936] hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
                title="Settings"
              >
                <Settings className="w-5 h-5 text-[#111936]" />
              </button>
            </div>

            {/* Category Filter Pills Row */}
            <div className="flex items-center gap-2 py-2 overflow-x-auto scrollbar-none">
              <button
                onClick={() => {
                  setActiveCategory('all');
                  showToast("Showing all 5 highlights");
                }}
                className={`px-4 py-1.5 rounded-full font-bold text-[12.5px] transition-all cursor-pointer shrink-0 ${
                  activeCategory === 'all'
                    ? 'bg-[#544ee5] text-white shadow-xs'
                    : 'bg-white text-[#717ea1] border border-slate-200/80 hover:text-slate-900'
                }`}
              >
                All (5)
              </button>

              <button
                onClick={() => {
                  setActiveCategory('museum');
                  showToast("Filtered: Louvre Museum");
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold text-[12.5px] transition-all cursor-pointer shrink-0 ${
                  activeCategory === 'museum'
                    ? 'bg-[#544ee5] text-white shadow-xs'
                    : 'bg-white text-[#717ea1] border border-slate-200/80 hover:text-slate-900'
                }`}
              >
                <span className="text-xs">🏛️</span>
                <span>Museums</span>
              </button>

              <button
                onClick={() => {
                  setActiveCategory('cafe');
                  showToast("Filtered: Café de Flore");
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold text-[12.5px] transition-all cursor-pointer shrink-0 ${
                  activeCategory === 'cafe'
                    ? 'bg-[#544ee5] text-white shadow-xs'
                    : 'bg-white text-[#717ea1] border border-slate-200/80 hover:text-slate-900'
                }`}
              >
                <span className="text-xs">☕</span>
                <span>Cafés</span>
              </button>

              <button
                onClick={() => {
                  setActiveCategory('place');
                  showToast("Filtered: Eiffel Tower, Notre-Dame, Arc de Triomphe");
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold text-[12.5px] transition-all cursor-pointer shrink-0 ${
                  activeCategory === 'place'
                    ? 'bg-[#544ee5] text-white shadow-xs'
                    : 'bg-white text-[#717ea1] border border-slate-200/80 hover:text-slate-900'
                }`}
              >
                <span className="text-xs">⭐</span>
                <span>Places</span>
              </button>
            </div>
          </div>

          {/* Main Map Canvas + Bottom Sheet Section */}
          <div className="flex-1 flex flex-col justify-between px-5 sm:px-6 relative overflow-hidden pb-20">
            {/* Real Interactive Map Canvas Card */}
            <div
              ref={mapContainerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className={`relative w-full aspect-[1/1.08] rounded-[24px] sm:rounded-[26px] overflow-hidden shadow-[0_8px_24px_rgba(50,70,140,0.08)] border border-[#e4e8f7] ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              } touch-none bg-[#e8f1f5]`}
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
                {/* Real Paris Street Map Graphic */}
                <img
                  src="/c10-paris-map.png"
                  alt="Interactive Paris Street Map"
                  className="w-full h-full object-cover pointer-events-none"
                  draggable={false}
                />

                {/* Pulsing Blue Live GPS Radar User Location Marker (Seine River) */}
                <div
                  style={{
                    left: '50%',
                    top: '38%',
                    transform: `translate(-50%, -50%) scale(${1 / Math.max(1, zoomLevel)})`,
                    transformOrigin: 'center center',
                  }}
                  className="absolute pointer-events-none z-10"
                >
                  <div className="w-9 h-9 -ml-[18px] -mt-[18px] absolute top-1/2 left-1/2 rounded-full bg-blue-500/20 animate-ping" />
                  <div className="w-5 h-5 -ml-[10px] -mt-[10px] absolute top-1/2 left-1/2 rounded-full bg-blue-500/35 animate-pulse" />
                  <div className="w-3.5 h-3.5 rounded-full bg-blue-600 ring-2 ring-white shadow-md relative z-10 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                </div>

                {/* Route Line when Pin is Focused */}
                {selectedLocation && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-15">
                    <line
                      x1="50%"
                      y1="38%"
                      x2={`${selectedLocation.x}%`}
                      y2={`${selectedLocation.y}%`}
                      stroke={isNavigating ? "#10b981" : "#544ee5"}
                      strokeWidth={isNavigating ? 3 / zoomLevel : 2 / zoomLevel}
                      strokeDasharray={`${4 / zoomLevel} ${4 / zoomLevel}`}
                      className="animate-pulse"
                    />
                  </svg>
                )}

                {/* Live Animated Walker Marker when In-App Navigating */}
                {isNavigating && selectedLocation && (
                  <div
                    style={{
                      left: `${50 + (selectedLocation.x - 50) * (navProgress / 100)}%`,
                      top: `${38 + (selectedLocation.y - 38) * (navProgress / 100)}%`,
                      transform: `translate(-50%, -50%) scale(${1 / Math.max(1, zoomLevel)})`,
                      transformOrigin: 'center center',
                    }}
                    className="absolute z-25 pointer-events-none transition-all duration-300"
                  >
                    <div className="w-8 h-8 -ml-4 -mt-4 absolute top-1/2 left-1/2 rounded-full bg-emerald-500/30 animate-ping" />
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white ring-2 ring-white shadow-lg flex items-center justify-center text-xs">
                      <Footprints className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  </div>
                )}

                {/* 5 Specific Curated Location Pins on Paris Map (Always crisp & perfectly sized) */}
                {visibleLocations.map((loc) => {
                  const isSelected = selectedLocation?.id === loc.id;
                  const pinBg = getPinColor(loc.type);

                  return (
                    <div
                      key={loc.id}
                      style={{
                        left: `${loc.x}%`,
                        top: `${loc.y}%`,
                        transform: `translate(-50%, -50%) scale(${(isSelected ? 1.2 : 1) / Math.max(1, zoomLevel)})`,
                        transformOrigin: 'center center',
                      }}
                      className="absolute z-20 transition-transform duration-200"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectLocation(loc);
                        }}
                        style={{ backgroundColor: pinBg }}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-white flex items-center justify-center text-xs shadow-md ring-2 ring-white cursor-pointer transition-all hover:scale-110 active:scale-95 ${
                          isSelected ? 'ring-3 ring-indigo-400 shadow-xl scale-110' : ''
                        }`}
                        title={loc.name}
                      >
                        <span className="text-[13px] leading-none select-none">{loc.icon}</span>
                      </button>

                      {/* Small Location Label on Map - only shown when selected or navigating */}
                      {isSelected && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2.5 py-0.5 rounded-full bg-[#0f1738]/95 backdrop-blur-xs text-[10.5px] font-black text-white whitespace-nowrap shadow-lg border border-white/20 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                          {loc.name}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* In-App Live Navigation Top Turn Banner */}
              {isNavigating && selectedLocation && (
                <div className="absolute top-3 left-3 right-12 z-40 bg-[#0f1738]/95 backdrop-blur-md text-white p-3 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center justify-between animate-in slide-in-from-top duration-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Navigation className="w-4 h-4 fill-current rotate-45" />
                    </div>
                    <div className="flex-1 min-w-0 pr-1">
                      <div className="text-[11.5px] font-black text-emerald-300 leading-tight">
                        {selectedLocation.turn1}
                      </div>
                      <div className="text-[10px] text-slate-300 font-medium truncate mt-0.5">
                        {selectedLocation.turn2}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleStopInAppNav}
                    className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer shrink-0"
                    title="Exit Navigation"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Floating Map Zoom & Navigation Controls */}
              <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-30">
                <button
                  onClick={handleZoomIn}
                  className="w-8 h-8 rounded-xl bg-white/95 backdrop-blur-md shadow-md border border-slate-200/80 text-[#0f1738] hover:text-[#544ee5] active:scale-90 flex items-center justify-center transition-all cursor-pointer"
                  title="Zoom in"
                >
                  <ZoomIn className="w-4 h-4 stroke-[2.4]" />
                </button>

                <button
                  onClick={handleZoomOut}
                  className="w-8 h-8 rounded-xl bg-white/95 backdrop-blur-md shadow-md border border-slate-200/80 text-[#0f1738] hover:text-[#544ee5] active:scale-90 flex items-center justify-center transition-all cursor-pointer"
                  title="Zoom out"
                >
                  <ZoomOut className="w-4 h-4 stroke-[2.4]" />
                </button>

                {(zoomLevel > 1 || panOffset.x !== 0 || panOffset.y !== 0) && (
                  <button
                    onClick={handleResetView}
                    className="w-8 h-8 rounded-xl bg-white/95 backdrop-blur-md shadow-md border border-slate-200/80 text-[#0f1738] hover:text-[#544ee5] active:scale-90 flex items-center justify-center transition-all cursor-pointer animate-in fade-in"
                    title="Reset view"
                  >
                    <RotateCcw className="w-3.5 h-3.5 stroke-[2.2]" />
                  </button>
                )}
              </div>

              {/* Bottom Right: GPS Locate Button */}
              <button
                onClick={handleLocateMe}
                className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md shadow-lg border border-slate-200/80 text-[#544ee5] hover:scale-105 active:scale-90 flex items-center justify-center transition-all cursor-pointer z-30"
                title="Locate my position"
              >
                <Navigation className="w-4 h-4 fill-current rotate-45" />
              </button>

              {/* Floating Top-Left: Start Guided Tour Pill */}
              {!isNavigating && (
                <button
                  onClick={() => {
                    const first = TOP_5_LOCATIONS[0];
                    handleSelectLocation(first);
                    showToast("🧭 Starting Paris 5 Highlights Tour");
                  }}
                  className="absolute top-3 left-3 px-3 py-1.5 rounded-full bg-[#544ee5] text-white text-[11px] font-bold shadow-md hover:bg-[#4842db] active:scale-95 transition-all flex items-center gap-1.5 z-30 cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5 animate-spin-slow" />
                  <span>Start Tour (5 Stops)</span>
                </button>
              )}

              {/* Bottom Left: Quick Zoom Level Indicator */}
              <div className="absolute bottom-3 left-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-xs text-[10px] font-bold text-white z-30 pointer-events-none">
                {isNavigating ? `🚶 Walking: ${selectedLocation.name}` : `${Math.round(zoomLevel * 100)}% Zoom • 5 Places Active`}
              </div>
            </div>

            {/* In-App Live Navigation Active Bottom HUD or Normal Bottom Sheet */}
            {isNavigating && selectedLocation ? (
              <div className="w-full bg-[#0f1738] text-white rounded-3xl p-4 shadow-2xl border border-emerald-500/30 space-y-3 mt-2.5 animate-in slide-in-from-bottom duration-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                      In-App Walking Navigation
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-slate-300">
                    {selectedLocation.name}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-white/5 p-2.5 rounded-2xl border border-white/5">
                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Remaining</div>
                    <div className="text-[16px] font-black text-white">{selectedLocation.distance}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Est. Walk Time</div>
                    <div className="text-[16px] font-black text-emerald-400">{selectedLocation.walkTime}</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleOpenGoogleMaps}
                    className="flex-1 py-2.5 px-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-white/10"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Open in Google Maps</span>
                  </button>

                  <button
                    onClick={handleStopInAppNav}
                    className="py-2.5 px-4 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold rounded-xl text-xs transition-all cursor-pointer border border-rose-500/30"
                  >
                    End
                  </button>
                </div>
              </div>
            ) : (
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

                {/* 3 Interactive Stat Summary Cards for 5 Locations */}
                <div className="grid grid-cols-3 gap-2 pt-0.5">
                  {/* 1 Museum */}
                  <button
                    onClick={() => {
                      setActiveCategory('museum');
                      const louvre = TOP_5_LOCATIONS.find((l) => l.id === 'louvre');
                      if (louvre) handleSelectLocation(louvre);
                    }}
                    className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all cursor-pointer ${
                      activeCategory === 'museum'
                        ? 'bg-indigo-100/70 border-2 border-[#544ee5]'
                        : 'bg-[#f4f6fe] border border-indigo-50/50 hover:bg-indigo-50'
                    }`}
                  >
                    <span className="text-base mb-0.5">🏛️</span>
                    <span className="text-[14px] font-black text-[#0f1738] leading-none">1</span>
                    <span className="text-[11px] font-semibold text-[#717ea1] mt-0.5">Museum</span>
                  </button>

                  {/* 1 Café */}
                  <button
                    onClick={() => {
                      setActiveCategory('cafe');
                      const flore = TOP_5_LOCATIONS.find((l) => l.id === 'flore');
                      if (flore) handleSelectLocation(flore);
                    }}
                    className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all cursor-pointer ${
                      activeCategory === 'cafe'
                        ? 'bg-orange-100/70 border-2 border-orange-500'
                        : 'bg-[#fff1f0] border border-rose-50/50 hover:bg-orange-50'
                    }`}
                  >
                    <span className="text-base mb-0.5">☕</span>
                    <span className="text-[14px] font-black text-[#0f1738] leading-none">1</span>
                    <span className="text-[11px] font-semibold text-[#717ea1] mt-0.5">Café</span>
                  </button>

                  {/* 3 Places */}
                  <button
                    onClick={() => {
                      setActiveCategory('place');
                      showToast("Showing 3 Landmark Places");
                    }}
                    className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all cursor-pointer ${
                      activeCategory === 'place'
                        ? 'bg-emerald-100/70 border-2 border-emerald-500'
                        : 'bg-[#e8f7f2] border border-emerald-50/50 hover:bg-emerald-50'
                    }`}
                  >
                    <span className="text-base mb-0.5">⭐</span>
                    <span className="text-[14px] font-black text-[#0f1738] leading-none">3</span>
                    <span className="text-[11px] font-semibold text-[#717ea1] mt-0.5">Places</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Floating Bottom Navigation Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#e8ecf8] px-6 pt-2 pb-3 sm:pb-2.5 shadow-[0_-4px_20px_rgba(50,70,140,0.06)] flex items-center justify-between">
        <button
          onClick={() => onNavigate && onNavigate('explore')}
          className="flex flex-col items-center gap-1 text-[#717ea1] hover:text-[#111936] transition-all cursor-pointer"
        >
          <Home className="w-5 h-5" />
          <span className="text-[11px] font-semibold">Explore</span>
        </button>

        <button
          onClick={() => showToast("You are on My Maps")}
          className="flex flex-col items-center gap-1 text-[#544ee5] transition-all cursor-pointer"
        >
          <MapIcon className="w-5 h-5 fill-current" />
          <span className="text-[11px] font-bold">My Maps</span>
        </button>

        <div className="-mt-6 flex flex-col items-center">
          <button
            onClick={() => onNavigate && onNavigate('create')}
            className="w-13 h-13 rounded-full bg-[#544ee5] hover:bg-[#4842db] active:scale-95 text-white flex items-center justify-center shadow-lg shadow-indigo-300 transition-all cursor-pointer"
            title="Create New Map"
          >
            <Plus className="w-7 h-7 stroke-[2.8]" />
          </button>
          <span className="text-[10.5px] font-bold text-[#544ee5] mt-0.5">Create</span>
        </div>

        <button
          onClick={() => onNavigate && onNavigate('creators')}
          className="flex flex-col items-center gap-1 text-[#717ea1] hover:text-[#111936] transition-all cursor-pointer"
        >
          <Users className="w-5 h-5" />
          <span className="text-[10.5px] font-semibold">Creators</span>
        </button>

        <button
          onClick={() => onNavigate && onNavigate('user-profile')}
          className="flex flex-col items-center gap-1 text-[#717ea1] hover:text-[#111936] transition-all cursor-pointer"
        >
          <User className="w-5 h-5" />
          <span className="text-[10.5px] font-semibold">Profile</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* 🚀 TWO OPTIONS MODAL: "INSIDE MAP" vs "GOOGLE MAPS"       */}
      {/* ========================================================= */}
      {showDirectionsModal && selectedLocation && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-indigo-50 space-y-4 animate-in slide-in-from-bottom duration-200">
            {/* Header with Photo Thumbnail */}
            <div className="flex items-start gap-3 pb-2 border-b border-slate-100">
              <img
                src={selectedLocation.img}
                alt={selectedLocation.name}
                className="w-14 h-14 rounded-2xl object-cover shadow-sm border border-black/5 shrink-0"
              />
              <div className="flex-1 min-w-0 pr-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">{selectedLocation.icon}</span>
                  <h3 className="font-black text-[15px] text-[#0f1738] truncate">
                    {selectedLocation.name}
                  </h3>
                </div>
                <p className="text-[11px] text-[#717ea1] font-medium truncate">
                  {selectedLocation.frenchName} &bull; {selectedLocation.area}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10.5px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Footprints className="w-3 h-3" />
                    <span>{selectedLocation.walkTime} ({selectedLocation.distance})</span>
                  </span>
                  <span className="text-[10.5px] font-bold text-amber-500">
                    ★ {selectedLocation.rating}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowDirectionsModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Location Description */}
            <p className="text-[11.5px] text-[#556080] leading-relaxed">
              {selectedLocation.description}
            </p>

            {/* Creator Tip Badge */}
            <div className="p-2.5 rounded-2xl bg-[#f5f3ff] border border-indigo-100 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#544ee5] shrink-0 mt-0.5" />
              <div className="text-[11px] text-[#4b43c6] leading-tight">
                <strong className="font-bold">Creator Tip:</strong> {selectedLocation.creatorTip}
              </div>
            </div>

            {/* THREE DIRECTION & EXPLORATION OPTIONS */}
            <div className="space-y-2 pt-1">
              {/* Option 1: Start In-App Live Walking Navigation */}
              <button
                onClick={handleStartInAppNav}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold rounded-2xl text-[13.5px] shadow-md shadow-emerald-200 flex items-center justify-between cursor-pointer transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center">
                    <Navigation className="w-4 h-4 fill-current rotate-45" />
                  </div>
                  <span>Start In-App Navigation</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] bg-white/20 px-2 py-0.5 rounded-full">
                  <span>{selectedLocation.walkTime}</span>
                </div>
              </button>

              {/* Option 2: Get Direction in Google Maps */}
              <button
                onClick={handleOpenGoogleMaps}
                className="w-full py-3 px-4 bg-white border border-[#e2e7f5] hover:border-emerald-300 hover:bg-emerald-50/40 active:scale-[0.99] text-[#0f1738] font-bold rounded-2xl text-[13.5px] shadow-xs flex items-center justify-between cursor-pointer transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                  <span>Get Direction in Google Maps</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              {/* Option 3: Explore Inside Highlights & Audio Tour */}
              <button
                onClick={handleExploreInsideMap}
                className="w-full py-3 px-4 bg-[#544ee5] hover:bg-[#4842db] active:scale-[0.99] text-white font-bold rounded-2xl text-[13.5px] shadow-md shadow-indigo-200 flex items-center justify-between cursor-pointer transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center">
                    <MapIcon className="w-3.5 h-3.5" />
                  </div>
                  <span>Explore Inside Highlights &amp; Audio</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 🏛️ INSIDE MAP HIGHLIGHTS DRAWER (OPTION 1 VIEW)          */}
      {/* ========================================================= */}
      {showInsideModal && selectedLocation && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-end justify-center p-3 animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-indigo-50 space-y-3.5 max-h-[85vh] overflow-y-auto scrollbar-none">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-base">{selectedLocation.icon}</span>
                <h3 className="font-black text-[16px] text-[#0f1738]">
                  Inside {selectedLocation.name}
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
            <div className="relative w-full h-32 rounded-2xl overflow-hidden shadow-inner border border-black/5">
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

            {/* Key Highlights Checklist */}
            <div className="space-y-1.5">
              <span className="text-[12px] font-extrabold text-[#0f1738] block">
                Must-See Highlights & Spots
              </span>
              <div className="space-y-1.5">
                {selectedLocation.insideHighlights.map((hl, idx) => (
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

            {/* Audio Tip Bar with Interactive Play/Pause & Equalizer */}
            <div className="p-3 rounded-2xl bg-indigo-50/90 border border-indigo-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#544ee5] text-white flex items-center justify-center shadow-sm shrink-0">
                  <Volume2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[12px] font-extrabold text-[#0f1738]">
                    Audio Guide &bull; {selectedLocation.name}
                  </div>
                  <div className="text-[10px] text-[#717ea1] flex items-center gap-1.5 mt-0.5">
                    <span>{selectedLocation.walkTime}</span>
                    <span>&bull;</span>
                    <span className="text-emerald-600 font-bold">Curated Story Active</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  showToast(`🎧 Playing narrated audio guide for ${selectedLocation.name}`);
                }}
                className="px-3.5 py-1.5 bg-[#544ee5] text-white font-bold text-[11.5px] rounded-xl shadow-xs hover:bg-[#4842db] active:scale-95 cursor-pointer transition-all shrink-0"
              >
                Play Audio 🔊
              </button>
            </div>

            {/* Tour Step-Through Navigation (Stop 1 to 5) */}
            <div className="pt-1 pb-1 flex items-center justify-between border-t border-slate-100">
              {/* Previous Stop Button */}
              <button
                onClick={() => {
                  const currentIndex = TOP_5_LOCATIONS.findIndex((l) => l.id === selectedLocation.id);
                  const prevIndex = (currentIndex - 1 + TOP_5_LOCATIONS.length) % TOP_5_LOCATIONS.length;
                  const prevLoc = TOP_5_LOCATIONS[prevIndex];
                  setSelectedLocation(prevLoc);
                  const targetX = -(prevLoc.x - 50) * 3.5;
                  const targetY = -(prevLoc.y - 50) * 3.5;
                  setZoomLevel(2.2);
                  setPanOffset({ x: targetX, y: targetY });
                  showToast(`Tour Step: ${prevLoc.name}`);
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95"
              >
                <span>&larr; Prev Stop</span>
              </button>

              {/* Stop Indicator */}
              <div className="text-[11px] font-extrabold text-[#544ee5] bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100/50">
                Stop {TOP_5_LOCATIONS.findIndex((l) => l.id === selectedLocation.id) + 1} of 5
              </div>

              {/* Next Stop Button */}
              <button
                onClick={() => {
                  const currentIndex = TOP_5_LOCATIONS.findIndex((l) => l.id === selectedLocation.id);
                  const nextIndex = (currentIndex + 1) % TOP_5_LOCATIONS.length;
                  const nextLoc = TOP_5_LOCATIONS[nextIndex];
                  setSelectedLocation(nextLoc);
                  const targetX = -(nextLoc.x - 50) * 3.5;
                  const targetY = -(nextLoc.y - 50) * 3.5;
                  setZoomLevel(2.2);
                  setPanOffset({ x: targetX, y: targetY });
                  showToast(`Tour Step: ${nextLoc.name}`);
                }}
                className="px-3 py-1.5 rounded-xl bg-[#544ee5] hover:bg-[#4842db] text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-all active:scale-95 shadow-xs"
              >
                <span>Next Stop &rarr;</span>
              </button>
            </div>

            {/* Bottom Actions */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={handleOpenGoogleMaps}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-[12.5px] shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 fill-current rotate-45" />
                <span>Navigate in Google Maps</span>
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

      {/* Map Customization Modal */}
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
                Pin & Landmark Theme
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
