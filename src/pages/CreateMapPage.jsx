import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  Map as MapIcon, 
  Plane, 
  Heart, 
  Users, 
  Image as ImageIcon, 
  List, 
  Plus, 
  Search, 
  MapPin, 
  Camera, 
  Star, 
  Lock, 
  Globe, 
  ChevronDown, 
  Check, 
  Lightbulb, 
  Home, 
  User, 
  X,
  Wifi,
  Battery
} from 'lucide-react';

export default function CreateMapPage({ onBack, onNavigate }) {
  // Mode switcher: 'map' | 'trip'
  const [activeMode, setActiveMode] = useState('map');

  // Creation Type: 'custom' | 'trip' | 'saved' | 'collab'
  const [selectedType, setSelectedType] = useState('custom');

  // Form Fields
  const [mapTitle, setMapTitle] = useState('');
  const [mapDescription, setMapDescription] = useState('');
  const [placeQuery, setPlaceQuery] = useState('');
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [privacy, setPrivacy] = useState('private'); // 'private' | 'public'
  const [showPrivacyDropdown, setShowPrivacyDropdown] = useState(false);

  // Cover image handling
  const [selectedCover, setSelectedCover] = useState('/c18-cover-paris.png');
  const [customCovers, setCustomCovers] = useState([]);
  const fileInputRef = useRef(null);

  // Toast / Inspiration Modal
  const [toastMessage, setToastMessage] = useState('');
  const [showInspireModal, setShowInspireModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Handle local image file upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setCustomCovers((prev) => [dataUrl, ...prev]);
      setSelectedCover(dataUrl);
      showToast('Custom photo uploaded successfully! 📸');
    };
    reader.readAsDataURL(file);
  };

  // AI Suggestion helper
  const handleAiSuggest = () => {
    const suggestions = [
      {
        title: 'Hidden Cafes & Bakeries in Paris ☕',
        desc: 'A curated walking tour of secret courtyards, third-wave espresso bars, and the flakiest croissants in Le Marais.'
      },
      {
        title: 'Sunset Cliffs & Coastal Eats of Amalfi 🍋',
        desc: 'Cliffside views, secluded swimming grottos, and authentic family-owned trattorias along the Italian coast.'
      },
      {
        title: 'Ancient Wonders & Secret Alleyways of Rome 🏛️',
        desc: 'Off-the-beaten-path cobblestone streets, local artisan gelato, and illuminated historic monuments at night.'
      },
      {
        title: 'Alpine Lakes & Fairytale Villages of Switzerland 🏔️',
        desc: 'Crystal-clear glacial lakes, panoramic cable car vistas, and charming wooden chalet towns.'
      }
    ];

    const randomPick = suggestions[Math.floor(Math.random() * suggestions.length)];
    setMapTitle(randomPick.title);
    setMapDescription(randomPick.desc);
    showToast('✨ AI suggested a map title and description!');
  };

  // Handle adding place
  const handleAddPlace = (name) => {
    if (!selectedPlaces.includes(name)) {
      setSelectedPlaces([...selectedPlaces, name]);
      showToast(`Added "${name}" to your map 📍`);
      setPlaceQuery('');
    }
  };

  // Handle Final Create
  const handleCreateMap = () => {
    if (!mapTitle.trim()) {
      showToast('Please enter a title for your map!');
      return;
    }
    setShowSuccessModal(true);
  };

  const presetCovers = [
    { id: 'paris', src: '/c18-cover-paris.png', name: 'Paris Sunset' },
    { id: 'amalfi', src: '/c18-cover-amalfi.png', name: 'Amalfi Coast' },
    { id: 'swiss', src: '/c18-cover-swiss.png', name: 'Alpine Village' },
    { id: 'rome', src: '/c18-cover-rome.png', name: 'Rome Colosseum' },
  ];

  const quickSearchMatches = [
    'Eiffel Tower, Paris',
    'Colosseum, Rome',
    'Positano Beach, Amalfi',
    'Hallstatt Lake, Austria',
    'Louvre Museum, Paris',
    'Trevi Fountain, Rome'
  ].filter(p => placeQuery && p.toLowerCase().includes(placeQuery.toLowerCase()));

  return (
    <div className="w-full h-full bg-white sm:rounded-[44px] flex flex-col justify-between overflow-hidden relative font-sans text-gray-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 bg-[#1e2337] text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-xl border border-white/10 flex items-center gap-2 animate-fade-in">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Hidden File Input for "+ Add Photo" */}
      <input 
        type="file" 
        ref={fileInputRef} 
        accept="image/*" 
        className="hidden" 
        onChange={handleFileUpload} 
      />

      {/* Scrollable Main Content */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain touch-pan-y scrollbar-none pb-28">
        {/* Status Bar */}
        <div className="pt-3 px-7 flex justify-between items-center text-xs font-semibold text-gray-900">
          <span>9:41</span>
          <div className="flex items-center gap-1.5 text-gray-800">
            {/* Cellular Signal */}
            <div className="flex items-end gap-0.5 h-3 mr-0.5">
              <span className="w-0.5 h-1 bg-gray-800 rounded-xs"></span>
              <span className="w-0.5 h-1.5 bg-gray-800 rounded-xs"></span>
              <span className="w-0.5 h-2 bg-gray-800 rounded-xs"></span>
              <span className="w-0.5 h-2.5 bg-gray-800 rounded-xs"></span>
            </div>
            <Wifi className="w-3.5 h-3.5" />
            <div className="w-5 h-2.5 border border-gray-800 rounded-xs p-0.5 flex items-center">
              <div className="w-full h-full bg-gray-800 rounded-2xs"></div>
            </div>
          </div>
        </div>

        {/* Top Header */}
        <div className="px-6 pt-3 pb-2 flex items-start justify-between">
          <div>
            <h1 className="text-[28px] font-extrabold text-gray-950 tracking-tight leading-tight">
              Create
            </h1>
            <p className="text-[13px] text-gray-500 font-medium mt-0.5">
              Turn your ideas into amazing maps.
            </p>
          </div>
          <button
            onClick={() => setShowInspireModal(true)}
            className="mt-1 flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-gray-200 rounded-full shadow-xs text-xs font-semibold text-gray-800 hover:bg-gray-50 active:scale-95 transition-all cursor-pointer shrink-0"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span>Get Inspired</span>
          </button>
        </div>

        {/* Mode Switcher Capsule */}
        <div className="px-6 mt-3">
          <div className="bg-[#f0f2f8] p-1 rounded-2xl flex items-center">
            <button
              onClick={() => setActiveMode('map')}
              className={`flex-1 py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all ${
                activeMode === 'map'
                  ? 'bg-[#544ee5] text-white shadow-md shadow-indigo-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <MapIcon className="w-4 h-4" />
              <span>Create a Map</span>
            </button>
            <button
              onClick={() => {
                setActiveMode('trip');
                showToast("Switched to Plan a Trip mode 📅");
              }}
              className={`flex-1 py-2.5 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-all ${
                activeMode === 'trip'
                  ? 'bg-[#544ee5] text-white shadow-md shadow-indigo-200'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span>📅 Plan a Trip</span>
            </button>
          </div>
        </div>

        {/* What do you want to create? */}
        <div className="px-6 mt-6">
          <h2 className="text-[15px] font-bold text-gray-950 mb-3">
            What do you want to create?
          </h2>
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
            {/* Custom Map */}
            <div
              onClick={() => setSelectedType('custom')}
              className={`min-w-[124px] p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center shrink-0 ${
                selectedType === 'custom'
                  ? 'border-2 border-[#544ee5] bg-[#F5F4FF] shadow-xs'
                  : 'border border-gray-150 bg-white hover:border-gray-300'
              }`}
            >
              <div className="w-8 h-8 flex items-center justify-center text-[#544ee5] mb-2">
                <MapIcon className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="font-bold text-[13px] text-gray-950">Custom Map</span>
              <span className="text-[10px] text-gray-500 font-medium leading-tight mt-1">
                Add places, notes and share
              </span>
            </div>

            {/* Trip Itinerary */}
            <div
              onClick={() => setSelectedType('trip')}
              className={`min-w-[124px] p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center shrink-0 ${
                selectedType === 'trip'
                  ? 'border-2 border-[#544ee5] bg-[#F5F4FF] shadow-xs'
                  : 'border border-gray-150 bg-white hover:border-gray-300'
              }`}
            >
              <div className="w-8 h-8 flex items-center justify-center text-sky-500 mb-2">
                <Plane className="w-6 h-6 fill-current" />
              </div>
              <span className="font-bold text-[13px] text-gray-950">Trip Itinerary</span>
              <span className="text-[10px] text-gray-500 font-medium leading-tight mt-1">
                Plan day by day
              </span>
            </div>

            {/* Saved Collection */}
            <div
              onClick={() => setSelectedType('saved')}
              className={`min-w-[124px] p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center shrink-0 ${
                selectedType === 'saved'
                  ? 'border-2 border-[#544ee5] bg-[#F5F4FF] shadow-xs'
                  : 'border border-gray-150 bg-white hover:border-gray-300'
              }`}
            >
              <div className="w-8 h-8 flex items-center justify-center text-pink-500 mb-2">
                <Heart className="w-6 h-6 fill-current" />
              </div>
              <span className="font-bold text-[13px] text-gray-950">Saved Collection</span>
              <span className="text-[10px] text-gray-500 font-medium leading-tight mt-1">
                Keep your favorite places
              </span>
            </div>

            {/* Collaborate */}
            <div
              onClick={() => setSelectedType('collab')}
              className={`min-w-[124px] p-3 rounded-2xl border transition-all cursor-pointer flex flex-col items-center text-center shrink-0 ${
                selectedType === 'collab'
                  ? 'border-2 border-[#544ee5] bg-[#F5F4FF] shadow-xs'
                  : 'border border-gray-150 bg-white hover:border-gray-300'
              }`}
            >
              <div className="w-8 h-8 flex items-center justify-center text-emerald-500 mb-2">
                <Users className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="font-bold text-[13px] text-gray-950">Collaborate</span>
              <span className="text-[10px] text-gray-500 font-medium leading-tight mt-1">
                Build a map together
              </span>
            </div>
          </div>
        </div>

        {/* Map Details */}
        <div className="px-6 mt-6">
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-[15px] font-bold text-gray-950">Map Details</h2>
            <button
              onClick={handleAiSuggest}
              className="text-[#544ee5] hover:text-[#433cc7] text-xs font-semibold flex items-center gap-1 cursor-pointer transition active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>AI Suggest</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {/* Title Input */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#fafbfe] border border-gray-200/80 rounded-2xl focus-within:border-[#544ee5] focus-within:bg-white transition-all shadow-2xs">
              <ImageIcon className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                value={mapTitle}
                onChange={(e) => setMapTitle(e.target.value)}
                placeholder="Give your map a title..."
                className="w-full bg-transparent text-[13.5px] font-medium text-gray-900 placeholder-gray-400 outline-none"
              />
              {mapTitle && (
                <button onClick={() => setMapTitle('')} className="text-gray-400 hover:text-gray-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Description Input */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[#fafbfe] border border-gray-200/80 rounded-2xl focus-within:border-[#544ee5] focus-within:bg-white transition-all shadow-2xs">
              <List className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                value={mapDescription}
                onChange={(e) => setMapDescription(e.target.value)}
                placeholder="Tell us about your map (optional)..."
                className="w-full bg-transparent text-[13.5px] font-medium text-gray-900 placeholder-gray-400 outline-none"
              />
              {mapDescription && (
                <button onClick={() => setMapDescription('')} className="text-gray-400 hover:text-gray-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Choose a Cover Image */}
        <div className="px-6 mt-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[15px] font-bold text-gray-950">Choose a Cover Image</h2>
            <button
              onClick={() => showToast('Browsing 50+ scenic destination covers 🖼️')}
              className="text-[#544ee5] hover:text-[#433cc7] text-xs font-semibold cursor-pointer"
            >
              See All
            </button>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
            {/* + Add Photo Card */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-[84px] h-[106px] rounded-2xl border-2 border-dashed border-[#544ee5] bg-[#F5F4FF] hover:bg-indigo-50/70 flex flex-col items-center justify-center p-2 shrink-0 cursor-pointer active:scale-95 transition-all group"
              title="Upload your own photo"
            >
              <div className="w-7 h-7 rounded-full bg-[#544ee5] text-white flex items-center justify-center mb-1.5 shadow-sm group-hover:scale-105 transition-transform">
                <Plus className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="text-[11px] font-bold text-[#544ee5]">Add Photo</span>
            </div>

            {/* Custom Uploaded Covers (if any) */}
            {customCovers.map((src, index) => {
              const isSelected = selectedCover === src;
              return (
                <div
                  key={`custom-${index}`}
                  onClick={() => setSelectedCover(src)}
                  className={`w-[84px] h-[106px] rounded-2xl overflow-hidden shrink-0 relative cursor-pointer shadow-xs transition-all ${
                    isSelected ? 'ring-2 ring-[#544ee5] ring-offset-2 scale-102' : 'hover:opacity-90'
                  }`}
                >
                  <img src={src} alt="Uploaded cover" className="w-full h-full object-cover" />
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#544ee5] text-white flex items-center justify-center shadow-md">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                  <span className="absolute bottom-1 left-1.5 bg-black/60 backdrop-blur-xs text-[9px] text-white font-semibold px-1.5 py-0.5 rounded-md">
                    Custom
                  </span>
                </div>
              );
            })}

            {/* Preset Covers */}
            {presetCovers.map((cover) => {
              const isSelected = selectedCover === cover.src;
              return (
                <div
                  key={cover.id}
                  onClick={() => setSelectedCover(cover.src)}
                  className={`w-[84px] h-[106px] rounded-2xl overflow-hidden shrink-0 relative cursor-pointer shadow-xs transition-all ${
                    isSelected ? 'ring-2 ring-[#544ee5] ring-offset-2 scale-102' : 'hover:opacity-90'
                  }`}
                >
                  <img src={cover.src} alt={cover.name} className="w-full h-full object-cover" />
                  {isSelected && (
                    <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#544ee5] text-white flex items-center justify-center shadow-md">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Add Places */}
        <div className="px-6 mt-6">
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-[15px] font-bold text-gray-950">Add Places</h2>
            {selectedPlaces.length > 0 && (
              <span className="text-xs font-semibold text-[#544ee5] bg-indigo-50 px-2 py-0.5 rounded-full">
                {selectedPlaces.length} places added
              </span>
            )}
          </div>

          {/* Place Search Input */}
          <div className="relative">
            <div className="flex items-center gap-3 px-4 py-3 bg-[#fafbfe] border border-gray-200/80 rounded-2xl focus-within:border-[#544ee5] focus-within:bg-white transition-all shadow-2xs">
              <Search className="w-4 h-4 text-gray-400 shrink-0" />
              <input
                type="text"
                value={placeQuery}
                onChange={(e) => setPlaceQuery(e.target.value)}
                placeholder="Search for a city, place or landmark..."
                className="w-full bg-transparent text-[13.5px] font-medium text-gray-900 placeholder-gray-400 outline-none"
              />
              {placeQuery && (
                <button onClick={() => setPlaceQuery('')} className="text-gray-400 hover:text-gray-600">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Autocomplete Dropdown */}
            {quickSearchMatches.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-gray-150 rounded-2xl shadow-xl z-20 overflow-hidden py-1">
                {quickSearchMatches.map((place, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAddPlace(place)}
                    className="w-full px-4 py-2.5 text-left text-xs font-semibold text-gray-800 hover:bg-indigo-50 flex items-center justify-between transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#544ee5]" />
                      <span>{place}</span>
                    </div>
                    <span className="text-[10px] text-[#544ee5] font-bold">+ Add</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Added Places Badges */}
          {selectedPlaces.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {selectedPlaces.map((place, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 bg-[#F5F4FF] text-[#544ee5] text-xs font-semibold px-2.5 py-1 rounded-full border border-indigo-100"
                >
                  <MapPin className="w-3 h-3" />
                  <span>{place}</span>
                  <button
                    onClick={() => setSelectedPlaces(selectedPlaces.filter((_, i) => i !== idx))}
                    className="hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          )}

          {/* 4 Place Options Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar mt-3 pb-1">
            {/* Current Location */}
            <button
              onClick={() => handleAddPlace('Current Location (Paris, 8th Arr.)')}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#f4f5f9] hover:bg-gray-200/70 active:scale-95 rounded-xl text-[11.5px] font-semibold text-gray-800 shrink-0 transition cursor-pointer"
            >
              <div className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center text-[#544ee5]">
                <MapPin className="w-2.5 h-2.5 fill-current" />
              </div>
              <span>Current Location</span>
            </button>

            {/* From My Lists */}
            <button
              onClick={() => handleAddPlace('From My Favorites: Le Marais')}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#f4f5f9] hover:bg-gray-200/70 active:scale-95 rounded-xl text-[11.5px] font-semibold text-gray-800 shrink-0 transition cursor-pointer"
            >
              <div className="w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <List className="w-2.5 h-2.5" />
              </div>
              <span>From My Lists</span>
            </button>

            {/* Add Manually */}
            <button
              onClick={() => {
                const manual = prompt('Enter custom place or address:');
                if (manual) handleAddPlace(manual);
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#f4f5f9] hover:bg-gray-200/70 active:scale-95 rounded-xl text-[11.5px] font-semibold text-gray-800 shrink-0 transition cursor-pointer"
            >
              <div className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <Camera className="w-2.5 h-2.5" />
              </div>
              <span>Add Manually</span>
            </button>

            {/* Use AI Suggestions */}
            <button
              onClick={() => {
                handleAddPlace('Louvre Museum, Paris');
                handleAddPlace('Café de Flore');
                showToast('✨ AI added 2 popular nearby spots!');
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-[#f4f5f9] hover:bg-gray-200/70 active:scale-95 rounded-xl text-[11.5px] font-semibold text-gray-800 shrink-0 transition cursor-pointer"
            >
              <div className="w-4 h-4 rounded-full bg-amber-100 flex items-center justify-center text-amber-500">
                <Star className="w-2.5 h-2.5 fill-current" />
              </div>
              <span>Use AI Suggestions</span>
            </button>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="px-6 mt-6">
          <h2 className="text-[15px] font-bold text-gray-950 mb-2.5">Privacy</h2>
          <div className="relative">
            <div
              onClick={() => setShowPrivacyDropdown(!showPrivacyDropdown)}
              className="flex items-center justify-between p-3.5 bg-white border border-gray-200/80 rounded-2xl cursor-pointer hover:border-gray-300 transition-all shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700">
                  {privacy === 'private' ? (
                    <Lock className="w-4 h-4" />
                  ) : (
                    <Globe className="w-4 h-4 text-emerald-600" />
                  )}
                </div>
                <div>
                  <div className="font-bold text-[13.5px] text-gray-950">
                    {privacy === 'private' ? 'Keep private' : 'Public map'}
                  </div>
                  <div className="text-[11px] text-gray-500 font-medium">
                    {privacy === 'private'
                      ? 'Only you can see this map'
                      : 'Anyone on Planitory can discover this map'}
                  </div>
                </div>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform ${
                  showPrivacyDropdown ? 'rotate-180' : ''
                }`}
              />
            </div>

            {/* Privacy Options Dropdown */}
            {showPrivacyDropdown && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-gray-150 rounded-2xl shadow-xl z-20 overflow-hidden py-1">
                <div
                  onClick={() => {
                    setPrivacy('private');
                    setShowPrivacyDropdown(false);
                  }}
                  className={`p-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer ${
                    privacy === 'private' ? 'bg-indigo-50/50' : ''
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Lock className="w-4 h-4 text-gray-700" />
                    <div>
                      <div className="font-bold text-xs text-gray-900">Keep private</div>
                      <div className="text-[10.5px] text-gray-500">Only you can see this map</div>
                    </div>
                  </div>
                  {privacy === 'private' && <Check className="w-4 h-4 text-[#544ee5]" />}
                </div>

                <div
                  onClick={() => {
                    setPrivacy('public');
                    setShowPrivacyDropdown(false);
                  }}
                  className={`p-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer ${
                    privacy === 'public' ? 'bg-indigo-50/50' : ''
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Globe className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div className="font-bold text-xs text-gray-900">Public map</div>
                      <div className="text-[10.5px] text-gray-500">Anyone on Planitory can discover this map</div>
                    </div>
                  </div>
                  {privacy === 'public' && <Check className="w-4 h-4 text-[#544ee5]" />}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="px-6 mt-7 mb-4">
          <button
            onClick={handleCreateMap}
            className="w-full py-3.5 rounded-2xl bg-[#544ee5] hover:bg-[#4842db] active:scale-[0.99] text-white font-bold text-[14px] shadow-lg shadow-indigo-200/90 flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Sparkles className="w-4 h-4 fill-white" />
            <span>Create Map</span>
          </button>
        </div>
      </div>

      {/* Bottom Fixed Navigation Bar */}
      <div className="absolute bottom-0 left-0 right-0 pt-2 pb-3 sm:pb-2.5 bg-white/95 backdrop-blur-md border-t border-gray-150/80 px-6 flex items-center justify-between z-30">
        {/* Explore */}
        <button
          onClick={() => onNavigate?.('explore')}
          className="flex flex-col items-center gap-1 text-[#717ea1] hover:text-[#111936] transition-all cursor-pointer"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10.5px] font-semibold">Explore</span>
        </button>

        {/* My Maps */}
        <button
          onClick={() => {
            if (onNavigate) onNavigate('purchased-map');
            else showToast("Opening My Maps 🗺️");
          }}
          className="flex flex-col items-center gap-1 text-[#717ea1] hover:text-[#111936] transition-all cursor-pointer"
        >
          <MapIcon className="w-5 h-5" />
          <span className="text-[10.5px] font-semibold">My Maps</span>
        </button>

        {/* Center Floating Action Button (+ Create - ACTIVE) */}
        <div className="-mt-6 flex flex-col items-center">
          <button
            onClick={() => showToast("You are on the Create page!")}
            className="w-13 h-13 rounded-full bg-[#544ee5] active:scale-95 text-white flex items-center justify-center shadow-lg shadow-indigo-300 transition-all cursor-pointer ring-4 ring-white"
            title="Create"
          >
            <Plus className="w-7 h-7 stroke-[2.8]" />
          </button>
          <span className="text-[10.5px] font-bold text-[#544ee5] mt-0.5">Create</span>
        </div>

        {/* Creators */}
        <button
          onClick={() => onNavigate?.('creators')}
          className="flex flex-col items-center gap-1 text-[#717ea1] hover:text-[#111936] transition-all cursor-pointer"
        >
          <Users className="w-5 h-5" />
          <span className="text-[10.5px] font-semibold">Creators</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => onNavigate?.('user-profile')}
          className="flex flex-col items-center gap-1 text-[#717ea1] hover:text-[#111936] transition-all cursor-pointer"
        >
          <User className="w-5 h-5" />
          <span className="text-[10.5px] font-semibold">Profile</span>
        </button>
      </div>

      {/* Inspiration Modal */}
      {showInspireModal && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white w-full rounded-3xl p-5 shadow-2xl border border-gray-100 max-h-[80%] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500 fill-amber-400" />
                <h3 className="text-base font-bold text-gray-900">Map Ideas & Inspo</h3>
              </div>
              <button
                onClick={() => setShowInspireModal(false)}
                className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-2.5 overflow-y-auto pr-1">
              {[
                { title: 'Top 7 Gelaterias in Florence', tag: 'Foodie', desc: 'Taste tests and flavor recommendations across the Arno river.' },
                { title: 'Secret Rooftops of Tokyo', tag: 'Views', desc: 'Cocktail bars and observation decks off the beaten tourist path.' },
                { title: 'Weekend Hiking in Chamonix', tag: 'Outdoors', desc: 'Beginner-to-intermediate ridge walks with Mont Blanc views.' },
                { title: 'Best Thrift & Vintage in Brooklyn', tag: 'Shopping', desc: 'Curated clothing racks, record bins, and flea markets.' }
              ].map((idea, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setMapTitle(idea.title);
                    setMapDescription(idea.desc);
                    setShowInspireModal(false);
                    showToast(`Loaded idea: "${idea.title}"`);
                  }}
                  className="p-3 bg-gray-50 hover:bg-indigo-50/70 border border-gray-150 rounded-2xl cursor-pointer transition"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-gray-900">{idea.title}</h4>
                    <span className="text-[10px] font-bold text-[#544ee5] bg-indigo-100/60 px-2 py-0.5 rounded-full">
                      {idea.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 mt-1">{idea.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-6 animate-fade-in">
          <div className="bg-white w-full rounded-3xl p-6 shadow-2xl border border-gray-100 text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-lg font-extrabold text-gray-950">Map Created!</h3>
            <p className="text-xs text-gray-500 mt-1 font-medium">
              "{mapTitle}" is now live in your personal collection.
            </p>

            <div className="mt-4 p-3 bg-gray-50 rounded-2xl flex items-center gap-3 text-left">
              <img src={selectedCover} alt="Cover" className="w-12 h-14 rounded-xl object-cover shrink-0" />
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-gray-900 truncate">{mapTitle}</div>
                <div className="text-[11px] text-gray-500 mt-0.5 capitalize">{selectedType} Map &bull; {privacy}</div>
                <div className="text-[10.5px] text-[#544ee5] font-semibold mt-0.5">
                  {selectedPlaces.length > 0 ? `${selectedPlaces.length} places pinned` : 'Ready to pin spots'}
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  onNavigate?.('user-profile');
                }}
                className="w-full py-3 bg-[#544ee5] hover:bg-[#4842db] text-white font-bold text-xs rounded-xl shadow-md transition"
              >
                View on My Profile
              </button>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  onNavigate?.('explore');
                }}
                className="w-full py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs rounded-xl transition"
              >
                Back to Explore Feed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
