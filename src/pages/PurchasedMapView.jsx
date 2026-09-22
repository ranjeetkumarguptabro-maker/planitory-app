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
  ShoppingBag
} from 'lucide-react';

export const ALL_LOCATIONS = [
  // 🏛️ Museums (5)
  {
    id: 'm-louvre',
    type: 'museum',
    name: 'Louvre Museum',
    frenchName: 'Musée du Louvre',
    area: '1st Arr.',
    address: 'Rue de Rivoli, 75001 Paris',
    rating: 4.8,
    reviews: '142k reviews',
    hours: 'Open 9:00 AM – 6:00 PM (Closed Tue)',
    description: 'World’s largest art museum and historic monument home to the Mona Lisa and Venus de Milo.',
    x: 58,
    y: 38,
    color: '#6941c6',
    icon: '🏛️',
  },
  {
    id: 'm-orsay',
    type: 'museum',
    name: 'Musée d’Orsay',
    frenchName: 'Musée d’Orsay',
    area: '7th Arr.',
    address: '1 Rue de la Légion d’Honneur, 75007 Paris',
    rating: 4.9,
    reviews: '98k reviews',
    hours: 'Open 9:30 AM – 6:00 PM (Closed Mon)',
    description: 'Premier collection of Impressionist and Post-Impressionist masterpieces in a grand Beaux-Arts railway station.',
    x: 42,
    y: 42,
    color: '#6941c6',
    icon: '🏛️',
  },
  {
    id: 'm-pompidou',
    type: 'museum',
    name: 'Centre Pompidou',
    frenchName: 'Centre Pompidou',
    area: '4th Arr.',
    address: 'Place Georges-Pompidou, 75004 Paris',
    rating: 4.6,
    reviews: '72k reviews',
    hours: 'Open 11:00 AM – 9:00 PM (Closed Tue)',
    description: 'High-tech architectural icon housing Europe’s largest collection of modern and contemporary art.',
    x: 68,
    y: 28,
    color: '#6941c6',
    icon: '🏛️',
  },
  {
    id: 'm-rodin',
    type: 'museum',
    name: 'Musée Rodin',
    frenchName: 'Musée Rodin',
    area: '7th Arr.',
    address: '77 Rue de Varenne, 75007 Paris',
    rating: 4.7,
    reviews: '34k reviews',
    hours: 'Open 10:00 AM – 6:30 PM (Closed Mon)',
    description: 'Sculptures by Auguste Rodin set in his former residence and serene rose gardens.',
    x: 27,
    y: 49,
    color: '#6941c6',
    icon: '🏛️',
  },
  {
    id: 'm-cluny',
    type: 'museum',
    name: 'Musée de Cluny',
    frenchName: 'Musée National du Moyen Âge',
    area: '5th Arr.',
    address: '28 Rue du Sommerard, 75005 Paris',
    rating: 4.7,
    reviews: '18k reviews',
    hours: 'Open 9:30 AM – 6:15 PM (Closed Mon)',
    description: 'National museum of the Middle Ages, famous for The Lady and the Unicorn tapestries and Roman thermal baths.',
    x: 66,
    y: 52,
    color: '#6941c6',
    icon: '🏛️',
  },

  // ☕ Cafés (5)
  {
    id: 'c-flore',
    type: 'cafe',
    name: 'Café de Flore',
    frenchName: 'Café de Flore',
    area: '6th Arr.',
    address: '172 Boulevard Saint-Germain, 75006 Paris',
    rating: 4.6,
    reviews: '26k reviews',
    hours: 'Open 7:30 AM – 1:30 AM daily',
    description: 'Historic cafe famous for existentialist philosophers, artisanal hot chocolate, and classic Parisian terrace vibes.',
    x: 43,
    y: 31,
    color: '#ea580c',
    icon: '☕',
  },
  {
    id: 'c-magots',
    type: 'cafe',
    name: 'Les Deux Magots',
    frenchName: 'Les Deux Magots',
    area: '6th Arr.',
    address: '6 Place Saint-Germain des Prés, 75006 Paris',
    rating: 4.5,
    reviews: '21k reviews',
    hours: 'Open 7:30 AM – 1:00 AM daily',
    description: 'Celebrated literary cafe overlooking the medieval church of Saint-Germain-des-Prés.',
    x: 71,
    y: 34,
    color: '#ea580c',
    icon: '☕',
  },
  {
    id: 'c-carette',
    type: 'cafe',
    name: 'Carette',
    frenchName: 'Carette Paris',
    area: '4th Arr.',
    address: '25 Place des Vosges, 75004 Paris',
    rating: 4.7,
    reviews: '19k reviews',
    hours: 'Open 7:30 AM – 11:30 PM daily',
    description: 'Iconic tearoom known for rich hot chocolate, mountain of chantilly cream, and flaky fresh pastries.',
    x: 9,
    y: 33,
    color: '#ea580c',
    icon: '☕',
  },
  {
    id: 'c-boot',
    type: 'cafe',
    name: 'Boot Café',
    frenchName: 'Boot Café Marais',
    area: '3rd Arr.',
    address: '19 Rue du Pont aux Choux, 75003 Paris',
    rating: 4.7,
    reviews: '3.4k reviews',
    hours: 'Open 10:00 AM – 5:00 PM daily',
    description: 'Charming micro-cafe housed in a historic vintage cobbler shop serving specialty pour-overs.',
    x: 52,
    y: 54,
    color: '#ea580c',
    icon: '☕',
  },
  {
    id: 'c-kitsune',
    type: 'cafe',
    name: 'Café Kitsuné',
    frenchName: 'Café Kitsuné Palais Royal',
    area: '1st Arr.',
    address: '51 Galerie de Montpensier, 75001 Paris',
    rating: 4.6,
    reviews: '8.2k reviews',
    hours: 'Open 9:00 AM – 7:00 PM daily',
    description: 'Japanese-Parisian specialty coffee bar tucked under the peaceful arcades of Jardin du Palais Royal.',
    x: 73,
    y: 57,
    color: '#ea580c',
    icon: '☕',
  },

  // ⭐ Places & Landmarks (5)
  {
    id: 'p-eiffel',
    type: 'place',
    name: 'Tour Eiffel',
    frenchName: 'La Tour Eiffel',
    area: '7th Arr.',
    address: 'Champ de Mars, 5 Av. Anatole France, 75007 Paris',
    rating: 4.9,
    reviews: '340k reviews',
    hours: 'Open 9:00 AM – 11:45 PM daily',
    description: 'The world-famous wrought-iron lattice tower on the Champ de Mars, Paris’s defining global emblem.',
    x: 35,
    y: 43,
    color: '#059669',
    icon: '⭐',
  },
  {
    id: 'p-arc',
    type: 'place',
    name: 'Arc de Triomphe',
    frenchName: 'Arc de Triomphe de l’Étoile',
    area: '8th Arr.',
    address: 'Place Charles de Gaulle, 75008 Paris',
    rating: 4.8,
    reviews: '190k reviews',
    hours: 'Open 10:00 AM – 10:30 PM daily',
    description: 'Monumental triumphal arch at the western end of the Champs-Élysées with panoramic terrace views.',
    x: 83,
    y: 25,
    color: '#059669',
    icon: '⭐',
  },
  {
    id: 'p-notre-dame',
    type: 'place',
    name: 'Notre-Dame Cathedral',
    frenchName: 'Cathédrale Notre-Dame de Paris',
    area: '4th Arr.',
    address: '6 Parvis Notre-Dame - Pl. Jean-Paul II, 75004 Paris',
    rating: 4.8,
    reviews: '210k reviews',
    hours: 'Parvis open daily 8:00 AM – 7:00 PM',
    description: 'Masterpiece of French Gothic architecture with rose windows, twin bell towers, and gargoyles on Île de la Cité.',
    x: 86,
    y: 50,
    color: '#059669',
    icon: '⭐',
  },
  {
    id: 'p-bastille',
    type: 'place',
    name: 'Place de la Bastille',
    frenchName: 'Place de la Bastille',
    area: '11th Arr.',
    address: 'Place de la Bastille, 75011 Paris',
    rating: 4.6,
    reviews: '45k reviews',
    hours: 'Open 24 hours',
    description: 'Historic square where the storming of the Bastille prison began the French Revolution, centered by the July Column.',
    x: 81,
    y: 42,
    color: '#059669',
    icon: '⭐',
  },
  {
    id: 'p-montmartre',
    type: 'place',
    name: 'Montmartre & Sacré-Cœur',
    frenchName: 'Basilique du Sacré-Cœur',
    area: '18th Arr.',
    address: '35 Rue du Chevalier de la Barre, 75018 Paris',
    rating: 4.9,
    reviews: '175k reviews',
    hours: 'Open 6:30 AM – 10:30 PM daily',
    description: 'Hilltop basilica offering sweeping vistas across Paris, cobbled artist alleyways, and bohemian heritage.',
    x: 53,
    y: 12,
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
    // Default to unlocked for seamless demonstration / purchase flow
    return ['paris-essentials'];
  });

  const hasPurchased = purchasedMaps.length > 0;

  // Active Map Controls
  const [activeCategory, setActiveCategory] = useState('all'); // 'all' | 'museum' | 'cafe' | 'place'
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [pinThemeColor, setPinThemeColor] = useState('default'); // 'default' | 'rose' | 'emerald' | 'sunset'
  const [toastMessage, setToastMessage] = useState(null);

  // Zoom & Pan Engine State
  const [zoomLevel, setZoomLevel] = useState(1); // 1x to 2.5x
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
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
      if (next === 1) setPanOffset({ x: 0, y: 0 }); // reset pan on full zoom out
      return next;
    });
    showToast(`Zoom: ${Math.round(Math.max(1, zoomLevel - 0.35) * 100)}%`);
  };

  const handleResetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setSelectedLocation(null);
    showToast("Map view reset & centered");
  };

  const handleLocateMe = () => {
    setZoomLevel(1.4);
    setPanOffset({ x: -10, y: -20 });
    showToast("📍 Centered on your GPS location: Seine River (1st Arr.)");
  };

  // Pan Gestures (Mouse & Touch)
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const maxBound = (zoomLevel - 1) * 180;
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
    const maxBound = (zoomLevel - 1) * 180;
    const newX = Math.max(-maxBound, Math.min(maxBound, e.touches[0].clientX - dragStart.x));
    const newY = Math.max(-maxBound, Math.min(maxBound, e.touches[0].clientY - dragStart.y));
    setPanOffset({ x: newX, y: newY });
  };

  const handleTouchEnd = () => setIsDragging(false);

  // Filter Locations by Active Category
  const visibleLocations = ALL_LOCATIONS.filter(
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
    // Default palette matching UI
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
            {/* Animated Compass & Map Pin Badge */}
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

            {/* Action Buttons */}
            <div className="w-full max-w-xs space-y-2.5 pt-2">
              <button
                onClick={() => onNavigate && onNavigate('explore')}
                className="w-full py-3.5 bg-[#544ee5] hover:bg-[#4842db] active:scale-[0.99] text-white font-bold rounded-2xl text-[14px] shadow-lg shadow-indigo-300/40 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Explore Maps</span>
              </button>

              {/* Quick Sample Map Demo */}
              <button
                onClick={() => {
                  setPurchasedMaps(['paris-essentials']);
                  localStorage.setItem('planitory_purchased_maps', JSON.stringify(['paris-essentials']));
                  showToast("✨ Paris Essentials map unlocked for preview!");
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
      {/* SCENARIO B: USER HAS PURCHASED MAPS (REAL INTERACTIVE MAP) */}
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
                onClick={() => showToast("Map Settings: Offline cache active & high-accuracy GPS")}
                className="w-9 h-9 -mr-2 rounded-full flex items-center justify-center text-[#111936] hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
                title="Settings"
              >
                <Settings className="w-5 h-5 text-[#111936]" />
              </button>
            </div>

            {/* Category Filter Pills Row (Exact layout from uploaded image) */}
            <div className="flex items-center gap-2 py-2 overflow-x-auto scrollbar-none">
              {/* All */}
              <button
                onClick={() => {
                  setActiveCategory('all');
                  showToast("Showing all 15 locations");
                }}
                className={`px-4 py-1.5 rounded-full font-bold text-[12.5px] transition-all cursor-pointer shrink-0 ${
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
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-bold text-[12.5px] transition-all cursor-pointer shrink-0 ${
                  activeCategory === 'museum'
                    ? 'bg-[#544ee5] text-white shadow-xs'
                    : 'bg-white text-[#717ea1] border border-slate-200/80 hover:text-slate-900'
                }`}
              >
                <span className="text-xs">🏛️</span>
                <span>Museums</span>
              </button>

              {/* Cafés */}
              <button
                onClick={() => {
                  setActiveCategory('cafe');
                  showToast("Filtered: 5 Cafés");
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

              {/* Places */}
              <button
                onClick={() => {
                  setActiveCategory('place');
                  showToast("Filtered: Top Landmark Places");
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
                {/* Real High-Resolution Paris Map Graphic */}
                <img
                  src="/c10-paris-map.png"
                  alt="Interactive Paris Street Map"
                  className="w-full h-full object-cover pointer-events-none"
                  draggable={false}
                />

                {/* Pulsing Blue Live GPS Radar User Location Marker */}
                <div
                  style={{ left: '50%', top: '38%' }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
                >
                  <div className="w-10 h-10 -ml-5 -mt-5 absolute top-1/2 left-1/2 rounded-full bg-blue-500/20 animate-ping" />
                  <div className="w-6 h-6 -ml-3 -mt-3 absolute top-1/2 left-1/2 rounded-full bg-blue-500/35 animate-pulse" />
                  <div className="w-3.5 h-3.5 rounded-full bg-blue-600 ring-2 ring-white shadow-md relative z-10" />
                </div>

                {/* Specific Location Pins on Paris Map */}
                {visibleLocations.map((loc) => {
                  const isSelected = selectedLocation?.id === loc.id;
                  const pinBg = getPinColor(loc.type);

                  return (
                    <div
                      key={loc.id}
                      style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-200"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLocation(loc);
                          showToast(`📍 ${loc.name} (${loc.area})`);
                        }}
                        style={{
                          backgroundColor: pinBg,
                          transform: isSelected ? 'scale(1.25)' : 'scale(1)',
                        }}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-white flex items-center justify-center text-xs sm:text-sm shadow-md ring-2 ring-white cursor-pointer transition-all hover:scale-115 active:scale-95 ${
                          isSelected ? 'ring-4 ring-indigo-300 shadow-xl' : ''
                        }`}
                        title={loc.name}
                      >
                        <span>{loc.icon}</span>
                      </button>

                      {/* Small Location Label on Map */}
                      {zoomLevel >= 1.2 && (
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-1.5 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-[9px] font-bold text-[#0f1738] whitespace-nowrap shadow-xs border border-black/5 pointer-events-none">
                          {loc.name}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Floating Map Zoom & Navigation Controls (+ / - / Reset / Locate) */}
              <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-30">
                {/* Zoom In Button */}
                <button
                  onClick={handleZoomIn}
                  className="w-8 h-8 rounded-xl bg-white/95 backdrop-blur-md shadow-md border border-slate-200/80 text-[#0f1738] hover:text-[#544ee5] active:scale-90 flex items-center justify-center transition-all cursor-pointer"
                  title="Zoom in"
                >
                  <ZoomIn className="w-4 h-4 stroke-[2.4]" />
                </button>

                {/* Zoom Out Button */}
                <button
                  onClick={handleZoomOut}
                  className="w-8 h-8 rounded-xl bg-white/95 backdrop-blur-md shadow-md border border-slate-200/80 text-[#0f1738] hover:text-[#544ee5] active:scale-90 flex items-center justify-center transition-all cursor-pointer"
                  title="Zoom out"
                >
                  <ZoomOut className="w-4 h-4 stroke-[2.4]" />
                </button>

                {/* Reset Zoom Button */}
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

              {/* Bottom Left: Quick Zoom Level Indicator */}
              <div className="absolute bottom-3 left-3 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-xs text-[10px] font-bold text-white z-30 pointer-events-none">
                {Math.round(zoomLevel * 100)}% Zoom &bull; Paris
              </div>

              {/* Selected Pin Detail Sheet Overlay */}
              {selectedLocation && (
                <div className="absolute top-3 left-3 right-14 bg-white/98 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-indigo-100 z-40 flex items-start justify-between animate-in fade-in duration-150">
                  <div className="flex-1 pr-2">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-sm">{selectedLocation.icon}</span>
                      <h4 className="text-xs font-black text-[#0f1738] truncate">
                        {selectedLocation.name}
                      </h4>
                      <span className="text-[10px] font-bold text-amber-500 flex items-center">
                        ★ {selectedLocation.rating}
                      </span>
                    </div>
                    <p className="text-[10.5px] text-[#717ea1] leading-tight line-clamp-1 mb-1.5">
                      {selectedLocation.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold text-slate-500">
                        {selectedLocation.area}
                      </span>
                      <button
                        onClick={() =>
                          showToast(`Opening directions to ${selectedLocation.name}...`)
                        }
                        className="text-[10px] font-bold text-[#544ee5] hover:underline flex items-center gap-0.5 cursor-pointer"
                      >
                        <span>Directions</span>
                        <ExternalLink className="w-2.5 h-2.5" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedLocation(null)}
                    className="p-1 rounded-full text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Bottom Sheet Panel Overlay (Exact from user screenshot) */}
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

              {/* 3 Interactive Stat Summary Cards (Museums, Cafes, Places) */}
              <div className="grid grid-cols-3 gap-2 pt-0.5">
                {/* 5 Museums */}
                <button
                  onClick={() => {
                    setActiveCategory('museum');
                    showToast("Filtered map: 5 Museums");
                  }}
                  className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all cursor-pointer ${
                    activeCategory === 'museum'
                      ? 'bg-indigo-100/70 border-2 border-[#544ee5]'
                      : 'bg-[#f4f6fe] border border-indigo-50/50 hover:bg-indigo-50'
                  }`}
                >
                  <span className="text-base mb-0.5">🏛️</span>
                  <span className="text-[14px] font-black text-[#0f1738] leading-none">5</span>
                  <span className="text-[11px] font-semibold text-[#717ea1] mt-0.5">Museums</span>
                </button>

                {/* 5 Cafés */}
                <button
                  onClick={() => {
                    setActiveCategory('cafe');
                    showToast("Filtered map: 5 Cafés");
                  }}
                  className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all cursor-pointer ${
                    activeCategory === 'cafe'
                      ? 'bg-orange-100/70 border-2 border-orange-500'
                      : 'bg-[#fff1f0] border border-rose-50/50 hover:bg-orange-50'
                  }`}
                >
                  <span className="text-base mb-0.5">☕</span>
                  <span className="text-[14px] font-black text-[#0f1738] leading-none">5</span>
                  <span className="text-[11px] font-semibold text-[#717ea1] mt-0.5">Cafés</span>
                </button>

                {/* 15 Places */}
                <button
                  onClick={() => {
                    setActiveCategory('place');
                    showToast("Filtered map: Top Landmark Places");
                  }}
                  className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all cursor-pointer ${
                    activeCategory === 'place'
                      ? 'bg-emerald-100/70 border-2 border-emerald-500'
                      : 'bg-[#e8f7f2] border border-emerald-50/50 hover:bg-emerald-50'
                  }`}
                >
                  <span className="text-base mb-0.5">⭐</span>
                  <span className="text-[14px] font-black text-[#0f1738] leading-none">15</span>
                  <span className="text-[11px] font-semibold text-[#717ea1] mt-0.5">Places</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Floating Bottom Navigation Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#e8ecf8] px-6 pt-2 pb-3 sm:pb-2.5 shadow-[0_-4px_20px_rgba(50,70,140,0.06)] flex items-center justify-between">
        {/* Explore Tab */}
        <button
          onClick={() => onNavigate && onNavigate('explore')}
          className="flex flex-col items-center gap-1 text-[#717ea1] hover:text-[#111936] transition-all cursor-pointer"
        >
          <Home className="w-5 h-5" />
          <span className="text-[11px] font-semibold">Explore</span>
        </button>

        {/* My Maps Tab (ACTIVE in purple!) */}
        <button
          onClick={() => showToast("You are on My Maps")}
          className="flex flex-col items-center gap-1 text-[#544ee5] transition-all cursor-pointer"
        >
          <MapIcon className="w-5 h-5 fill-current" />
          <span className="text-[11px] font-bold">My Maps</span>
        </button>

        {/* Center Floating Action Button (+ Create) */}
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

        {/* Creators Tab */}
        <button
          onClick={() => onNavigate && onNavigate('creators')}
          className="flex flex-col items-center gap-1 text-[#717ea1] hover:text-[#111936] transition-all cursor-pointer"
        >
          <Users className="w-5 h-5" />
          <span className="text-[10.5px] font-semibold">Creators</span>
        </button>

        {/* Profile Tab */}
        <button
          onClick={() => onNavigate && onNavigate('user-profile')}
          className="flex flex-col items-center gap-1 text-[#717ea1] hover:text-[#111936] transition-all cursor-pointer"
        >
          <User className="w-5 h-5" />
          <span className="text-[10.5px] font-semibold">Profile</span>
        </button>
      </div>

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
