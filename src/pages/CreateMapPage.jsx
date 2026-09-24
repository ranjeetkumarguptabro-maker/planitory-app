import React, { useState, useRef } from 'react';
import {
  Sparkles,
  Map as MapIcon,
  Plane,
  Heart,
  Image as ImageIcon,
  List,
  Plus,
  ArrowRight,
  ArrowLeft,
  Search,
  MapPin,
  Pencil,
  Layers,
  Navigation,
  Crosshair,
  X,
  Check,
  CheckCircle2,
  Home,
  Users,
  User,
  Coffee,
  Utensils,
  Camera,
  Trees,
  Landmark,
  Building2
} from 'lucide-react';

const INITIAL_BUILD_PINS = [
  {
    id: 'camera',
    name: 'Pont des Arts Photo Spot',
    category: 'Photo Spot',
    type: 'camera',
    x: 37.5,
    y: 27.2,
    color: '#7c3aed',
    icon: Camera,
  },
  {
    id: 'cafe',
    name: 'Café de Flore',
    category: 'Café',
    type: 'cafe',
    x: 65.2,
    y: 32.1,
    color: '#78350f',
    icon: Coffee,
  },
  {
    id: 'food',
    name: 'Le Comptoir du Relais',
    category: 'Restaurant',
    type: 'food',
    x: 38.2,
    y: 41.2,
    color: '#e11d48',
    icon: Utensils,
  },
  {
    id: 'museum',
    name: 'Musée d’Orsay',
    category: 'Museum',
    type: 'museum',
    x: 29.4,
    y: 46.5,
    color: '#4f46e5',
    icon: Landmark,
  },
  {
    id: 'park',
    name: 'Jardin du Luxembourg',
    category: 'Park',
    type: 'park',
    x: 72.5,
    y: 44.2,
    color: '#15803d',
    icon: Trees,
  },
  {
    id: 'hotel',
    name: 'Hôtel Lutetia',
    category: 'Hotel',
    type: 'hotel',
    x: 75.4,
    y: 58.6,
    color: '#2563eb',
    icon: Building2,
  },
];

export default function CreateMapPage({ onBack, onNavigate }) {
  // Step: 1 = Create Details (create_page_first_image.png), 2 = Build Your Map (c35.png)
  const [currentStep, setCurrentStep] = useState(1);

  // Step 1 State
  const [activeMode, setActiveMode] = useState('map'); // 'map' | 'trip'
  const [selectedType, setSelectedType] = useState('custom'); // 'custom' | 'trip' | 'saved'
  const [mapTitle, setMapTitle] = useState('Paris Café Guide');
  const [mapDescription, setMapDescription] = useState('');

  // Step 2 State (c35.png)
  const [searchPlaceQuery, setSearchPlaceQuery] = useState('');
  const [addedPlaces, setAddedPlaces] = useState([]);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [activeLayer, setActiveLayer] = useState('standard');

  // Map Pan / Zoom
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Modals & Feedback
  const [toastMessage, setToastMessage] = useState(null);
  const [showInspireModal, setShowInspireModal] = useState(false);
  const [showPlacesSearchModal, setShowPlacesSearchModal] = useState(false);
  const [showListsModal, setShowListsModal] = useState(false);
  const [showGmapsModal, setShowGmapsModal] = useState(false);
  const [showDoneModal, setShowDoneModal] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // AI Suggestion helper
  const handleAiSuggest = () => {
    const suggestions = [
      {
        title: 'Paris Café & Bakery Guide ☕',
        desc: 'A curated walking tour of secret courtyards, specialty espresso bars, and flaky croissants in Saint-Germain and Le Marais.'
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
        title: 'Tokyo Hidden Ramen & Neon Speakeasies 🍜',
        desc: 'Late-night ramen dens, hidden speakeasies, and vibrant neighborhood street spots in Shibuya.'
      }
    ];

    const pick = suggestions[Math.floor(Math.random() * suggestions.length)];
    setMapTitle(pick.title);
    setMapDescription(pick.desc);
    showToast('✨ AI suggested a map title & description!');
  };

  // Step 1 -> Step 2 transition
  const handleProceedToStep2 = () => {
    if (!mapTitle.trim()) {
      showToast('Please enter a title for your map');
      return;
    }
    setCurrentStep(2);
    showToast('📍 Step 2: Add places and build your map');
  };

  // Drag & Pan handlers for Map Canvas
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
    if (e.touches.length === 1 && isDragging) {
      const maxBound = (zoomLevel - 1) * 200;
      const newX = Math.max(-maxBound, Math.min(maxBound, e.touches[0].clientX - dragStart.x));
      const newY = Math.max(-maxBound, Math.min(maxBound, e.touches[0].clientY - dragStart.y));
      setPanOffset({ x: newX, y: newY });
    }
  };

  const handleTouchEnd = () => setIsDragging(false);

  const handleRecenter = () => {
    setZoomLevel(1.2);
    setPanOffset({ x: 0, y: 0 });
    showToast('📍 Recentered on current location (Seine River)');
  };

  const handleAddPlaceToList = (placeName) => {
    if (!addedPlaces.includes(placeName)) {
      setAddedPlaces([...addedPlaces, placeName]);
      showToast(`Added "${placeName}" to your map 📍`);
    }
    setShowPlacesSearchModal(false);
    setShowListsModal(false);
    setShowGmapsModal(false);
  };

  return (
    <div className="relative w-full h-full bg-white sm:rounded-[44px] flex flex-col justify-between overflow-hidden select-none">
      {/* ========================================================================= */}
      {/* SCREEN 1: CREATE MAP DETAILS (matching create_page_first_image (1).png)   */}
      {/* ========================================================================= */}
      {currentStep === 1 && (
        <>
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

            {/* Primary Action Button: Next → (routes to Step 2 / c35.png) */}
            <div className="px-5 sm:px-6 pt-7">
              <button
                onClick={handleProceedToStep2}
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
              onClick={() => onNavigate?.('explore')}
              className="flex flex-col items-center gap-1 text-[#717ea1] hover:text-[#111936] transition-all cursor-pointer"
            >
              <Home className="w-5 h-5" />
              <span className="text-[10.5px] font-semibold">Explore</span>
            </button>

            {/* My Maps Tab */}
            <button
              onClick={() => onNavigate?.('purchased-map')}
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
              onClick={() => onNavigate?.('creators')}
              className="flex flex-col items-center gap-1 text-[#717ea1] hover:text-[#111936] transition-all cursor-pointer"
            >
              <Users className="w-5 h-5" />
              <span className="text-[10.5px] font-semibold">Creators</span>
            </button>

            {/* Profile Tab */}
            <button
              onClick={() => onNavigate?.('user-profile')}
              className="flex flex-col items-center gap-1 text-[#717ea1] hover:text-[#111936] transition-all cursor-pointer"
            >
              <User className="w-5 h-5" />
              <span className="text-[10.5px] font-semibold">Profile</span>
            </button>
          </div>
        </>
      )}

      {/* ========================================================================= */}
      {/* SCREEN 2: BUILD YOUR MAP (EXACT 1:1 MATCHING c35.png)                      */}
      {/* ========================================================================= */}
      {currentStep === 2 && (
        <div className="relative w-full h-full min-h-0 overflow-hidden bg-[#e8f1f5] sm:rounded-[44px] select-none">
          {/* Exact Mockup Canvas Background matching c35.png */}
          <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
            <img
              src="/c35-map-full.png"
              alt="Build Your Map - Paris"
              className="w-full h-full object-cover pointer-events-none select-none"
              draggable={false}
            />

            {/* If user customized the title, display custom title overlay pill seamlessly */}
            {mapTitle && mapTitle !== 'Paris Café Guide' && (
              <div
                style={{ top: '4.8%', left: '26%', width: '48%' }}
                className="absolute z-20 text-center pointer-events-none"
              >
                <div className="text-[12px] font-bold text-[#717ea1] truncate flex items-center justify-center gap-1 bg-white/90 backdrop-blur-xs py-0.5 px-2 rounded-full shadow-2xs">
                  <span className="truncate">{mapTitle}</span>
                  <Pencil className="w-2.5 h-2.5 stroke-[2.2]" />
                </div>
              </div>
            )}

            {/* Added Places Counter Badge overlay if custom places were added */}
            {addedPlaces.length > 0 && (
              <div
                style={{ bottom: '21.5%', left: '5.2%' }}
                className="absolute z-20 bg-white/95 px-2 py-0.5 rounded-md pointer-events-none"
              >
                <span className="text-[12.5px] font-bold text-[#544ee5]">
                  {addedPlaces.length} places added
                </span>
              </div>
            )}
          </div>

          {/* ========================================================= */}
          {/* INVISIBLE INTERACTIVE HITBOXES OVER c35.png ELEMENTS      */}
          {/* ========================================================= */}

          {/* Top-Left Back Arrow (<) Hitbox -> returns to Step 1 */}
          <div
            onClick={() => setCurrentStep(1)}
            style={{ top: '3.8%', left: '4.2%', width: '13%', height: '5.5%' }}
            className="absolute z-30 rounded-full cursor-pointer hover:bg-black/5 active:scale-90 transition-all"
            title="Back to Details"
          />

          {/* Top Center Title Hitbox -> Edit Title */}
          <div
            onClick={() => setIsEditingTitle(true)}
            style={{ top: '3.5%', left: '26%', width: '48%', height: '5.5%' }}
            className="absolute z-30 rounded-xl cursor-pointer hover:bg-black/5 active:scale-95 transition-all"
            title="Edit Map Title"
          />

          {/* Top-Right Preview Pill Button Hitbox */}
          <div
            onClick={() => showToast('✨ Interactive Map Preview Active')}
            style={{ top: '3.8%', right: '4.2%', width: '24%', height: '4.8%' }}
            className="absolute z-30 rounded-full cursor-pointer hover:bg-black/5 active:scale-95 transition-all"
            title="Preview Map"
          />

          {/* Global Search Bar Hitbox -> Opens Search Modal */}
          <div
            onClick={() => setShowPlacesSearchModal(true)}
            style={{ top: '9.2%', left: '4.2%', width: '91.6%', height: '5.5%' }}
            className="absolute z-30 rounded-full cursor-pointer hover:bg-black/5 active:scale-98 transition-all"
            title="Search for a place or landmark"
          />

          {/* Right Floating Stack Button 1: Layers */}
          <div
            onClick={() => showToast('Map Layers: Standard View')}
            style={{ top: '17.2%', right: '4.2%', width: '14%', height: '5.2%' }}
            className="absolute z-30 rounded-full cursor-pointer hover:bg-black/5 active:scale-90 transition-all"
            title="Layers"
          />

          {/* Right Floating Stack Button 2: Compass */}
          <div
            onClick={() => showToast('🧭 Compass: Reoriented to North')}
            style={{ top: '23.4%', right: '4.2%', width: '14%', height: '5.2%' }}
            className="absolute z-30 rounded-full cursor-pointer hover:bg-black/5 active:scale-90 transition-all"
            title="Compass"
          />

          {/* Right Floating Stack Button 3: GPS Recenter */}
          <div
            onClick={handleRecenter}
            style={{ top: '29.6%', right: '4.2%', width: '14%', height: '5.2%' }}
            className="absolute z-30 rounded-full cursor-pointer hover:bg-black/5 active:scale-90 transition-all"
            title="My Location"
          />

          {/* Interactive Map Pins Hitboxes */}
          {/* 1. Camera Photo Spot Pin */}
          <div
            onClick={() => handleAddPlaceToList('Pont des Arts Photo Spot')}
            style={{ top: '24.5%', left: '34.5%', width: '10%', height: '5.8%' }}
            className="absolute z-25 rounded-full cursor-pointer hover:bg-black/10 active:scale-90 transition-all"
            title="Pont des Arts Photo Spot"
          />

          {/* 2. Coffee Café de Flore Pin */}
          <div
            onClick={() => handleAddPlaceToList('Café de Flore')}
            style={{ top: '28.5%', left: '62.5%', width: '10%', height: '5.8%' }}
            className="absolute z-25 rounded-full cursor-pointer hover:bg-black/10 active:scale-90 transition-all"
            title="Café de Flore"
          />

          {/* 3. Restaurant Food Pin */}
          <div
            onClick={() => handleAddPlaceToList('Le Comptoir du Relais')}
            style={{ top: '37.0%', left: '35.5%', width: '10%', height: '5.8%' }}
            className="absolute z-25 rounded-full cursor-pointer hover:bg-black/10 active:scale-90 transition-all"
            title="Le Comptoir du Relais"
          />

          {/* 4. Museum Musée d’Orsay Pin */}
          <div
            onClick={() => handleAddPlaceToList('Musée d’Orsay')}
            style={{ top: '42.5%', left: '26.5%', width: '10%', height: '5.8%' }}
            className="absolute z-25 rounded-full cursor-pointer hover:bg-black/10 active:scale-90 transition-all"
            title="Musée d’Orsay"
          />

          {/* 5. Tree Jardin du Luxembourg Pin */}
          <div
            onClick={() => handleAddPlaceToList('Jardin du Luxembourg')}
            style={{ top: '40.5%', left: '69.5%', width: '10%', height: '5.8%' }}
            className="absolute z-25 rounded-full cursor-pointer hover:bg-black/10 active:scale-90 transition-all"
            title="Jardin du Luxembourg"
          />

          {/* 6. Hotel Hôtel Lutetia Pin */}
          <div
            onClick={() => handleAddPlaceToList('Hôtel Lutetia')}
            style={{ top: '54.0%', left: '72.5%', width: '10%', height: '5.8%' }}
            className="absolute z-25 rounded-full cursor-pointer hover:bg-black/10 active:scale-90 transition-all"
            title="Hôtel Lutetia"
          />

          {/* 7. River GPS Pulsing Beacon */}
          <div
            onClick={handleRecenter}
            style={{ top: '52.0%', left: '48.0%', width: '16%', height: '8.5%' }}
            className="absolute z-25 rounded-full cursor-pointer hover:bg-black/5 active:scale-90 transition-all"
            title="Live GPS Beacon"
          />

          {/* Bottom Sheet Card 1 Hitbox: Search & Add */}
          <div
            onClick={() => setShowPlacesSearchModal(true)}
            style={{ bottom: '11.8%', left: '4.2%', width: '29.5%', height: '10.5%' }}
            className="absolute z-30 rounded-2xl cursor-pointer hover:bg-black/5 active:scale-95 transition-all"
            title="Search & Add manually"
          />

          {/* Bottom Sheet Card 2 Hitbox: From Saved Lists */}
          <div
            onClick={() => setShowListsModal(true)}
            style={{ bottom: '11.8%', left: '35.2%', width: '29.5%', height: '10.5%' }}
            className="absolute z-30 rounded-2xl cursor-pointer hover:bg-black/5 active:scale-95 transition-all"
            title="From Saved Lists"
          />

          {/* Bottom Sheet Card 3 Hitbox: Import from Google Maps */}
          <div
            onClick={() => setShowGmapsModal(true)}
            style={{ bottom: '11.8%', left: '66.2%', width: '29.5%', height: '10.5%' }}
            className="absolute z-30 rounded-2xl cursor-pointer hover:bg-black/5 active:scale-95 transition-all"
            title="Import from Google Maps"
          />

          {/* Bottom Sheet Done Button Hitbox */}
          <div
            onClick={() => setShowDoneModal(true)}
            style={{ bottom: '3.6%', left: '4.2%', width: '91.6%', height: '5.8%' }}
            className="absolute z-30 rounded-full cursor-pointer hover:bg-black/10 active:scale-98 transition-all"
            title="Done - Save Map"
          />
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODALS & OVERLAYS                                                         */}
      {/* ========================================================================= */}
      {/* Quick Search & Add Modal */}
      {showPlacesSearchModal && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl border border-slate-100 flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-[#0f1738]">Search &amp; Add Place</h3>
              <button
                onClick={() => setShowPlacesSearchModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                value={searchPlaceQuery}
                onChange={(e) => setSearchPlaceQuery(e.target.value)}
                placeholder="Type place name or address..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 outline-none focus:border-[#544ee5] focus:bg-white"
                autoFocus
              />
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto">
              {[
                'Café de Flore, Saint-Germain',
                'Le Comptoir du Relais, Odéon',
                'Pont des Arts Viewpoint',
                'Jardin du Luxembourg',
                'Musée d’Orsay',
                'Hôtel Lutetia, Raspail'
              ]
                .filter((p) => !searchPlaceQuery || p.toLowerCase().includes(searchPlaceQuery.toLowerCase()))
                .map((place, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAddPlaceToList(place)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50/80 text-left text-xs font-bold text-[#0f1738] flex items-center justify-between cursor-pointer"
                  >
                    <span>{place}</span>
                    <span className="text-[#544ee5] text-[11px]">+ Add</span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* From Saved Lists Modal */}
      {showListsModal && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl border border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-[#0f1738]">From Saved Lists</h3>
              <button
                onClick={() => setShowListsModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#717ea1]">Choose from your saved collections to add instantly:</p>
            <div className="space-y-2">
              {['Favorite Bakeries (5 spots)', 'Top Scenic Bridges (3 spots)', 'Historic Cafés (6 spots)'].map((l, i) => (
                <button
                  key={i}
                  onClick={() => handleAddPlaceToList(l.split(' (')[0])}
                  className="w-full p-3 rounded-xl bg-slate-50 hover:bg-indigo-50 border border-slate-100 text-left text-xs font-bold text-[#0f1738] flex items-center justify-between cursor-pointer"
                >
                  <span>{l}</span>
                  <span className="text-[#544ee5] text-[11px] font-extrabold">Import</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Google Maps Import Modal */}
      {showGmapsModal && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl border border-slate-100 space-y-3 text-center">
            <img src="/c35-gmaps-icon.png" alt="Google Maps" className="w-10 h-12 mx-auto" />
            <h3 className="text-base font-extrabold text-[#0f1738]">Import from Google Maps</h3>
            <p className="text-xs text-[#717ea1]">Connect Google Maps saved places or paste a list link to import all pins.</p>
            <button
              onClick={() => {
                handleAddPlaceToList('Imported 6 Google Maps Saved Spots');
              }}
              className="w-full py-3 rounded-xl bg-[#544ee5] text-white font-bold text-xs shadow-md cursor-pointer"
            >
              Sync Saved Places
            </button>
          </div>
        </div>
      )}

      {/* Done / Published Success Modal */}
      {showDoneModal && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-6 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl border border-slate-100 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-[19px] font-black text-[#0f1738]">Map Created!</h3>
            <p className="text-xs text-[#717ea1] font-medium">
              "{mapTitle}" has been saved with {addedPlaces.length > 0 ? addedPlaces.length : 'all curated'} places.
            </p>

            <div className="pt-2 space-y-2">
              <button
                onClick={() => {
                  setShowDoneModal(false);
                  onNavigate?.('purchased-map');
                }}
                className="w-full py-3.5 bg-[#544ee5] hover:bg-[#4338ca] text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
              >
                Open Map View
              </button>
              <button
                onClick={() => {
                  setShowDoneModal(false);
                  onNavigate?.('explore');
                }}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Back to Explore
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Title Inline Modal */}
      {isEditingTitle && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="bg-white w-full max-w-xs rounded-3xl p-5 shadow-2xl border border-slate-100 space-y-3">
            <h3 className="text-sm font-black text-[#0f1738]">Edit Map Title</h3>
            <input
              type="text"
              value={mapTitle}
              onChange={(e) => setMapTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:border-[#544ee5] outline-none"
              autoFocus
            />
            <button
              onClick={() => setIsEditingTitle(false)}
              className="w-full py-2 bg-[#544ee5] text-white font-bold text-xs rounded-xl cursor-pointer"
            >
              Save Title
            </button>
          </div>
        </div>
      )}

      {/* Inspiration Ideas Modal */}
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
