import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  SlidersHorizontal,
  Bell,
  Heart,
  MapPin,
  Clock,
  ArrowRight,
  Plus,
  Home,
  Map,
  User,
  Users,
  Compass,
  CheckCircle2,
  Share2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 'rome-cafes',
    title: 'Best 5 Cafés in Rome',
    city: 'Rome',
    country: 'Italy',
    places: '5 places',
    duration: '1–2 days',
    price: '$9',
    img: '/d1.png',
  },
  {
    id: 'barcelona-cafes',
    title: 'Best 5 Cafés in Barcelona',
    city: 'Barcelona',
    country: 'Spain',
    places: '5 places',
    duration: '1–2 days',
    price: '$8',
    img: '/d2.png',
  },
  {
    id: 'vienna-cafes',
    title: 'Best 5 Cafés in Vienna',
    city: 'Vienna',
    country: 'Austria',
    places: '5 places',
    duration: '1–2 days',
    price: '$11',
    img: '/d3.png',
  },
];

const CATEGORIES = [
  { id: 'cafes', name: 'Cafés', img: '/c6-cat-cafe.png' },
  { id: 'museums', name: 'Museums', img: '/c6-cat-museum.png' },
  { id: 'food', name: 'Food', img: '/c6-cat-food.png' },
  { id: 'nature', name: 'Nature', img: '/c6-cat-nature.png' },
  { id: 'culture', name: 'Culture', img: '/c6-cat-culture.png' },
];

const POPULAR_MAPS = [
  {
    id: 'paris-museums',
    title: 'Top 5 Museums in Paris',
    subtitle: 'Art, history and must-see highlights.',
    thumbnail: '/c6-thumb-paris-museums.png',
    places: '5 places',
    duration: '1–2 days',
    price: '$10',
    isLiked: false,
  },
  {
    id: 'rome-gems',
    title: 'Hidden Gems of Rome',
    subtitle: 'Off the beaten path, real local spots.',
    thumbnail: '/c6-thumb-rome.png',
    places: '7 places',
    duration: '2–3 days',
    price: '$11',
    isLiked: false,
  },
];

const TRAVELERS = [
  {
    handle: '@sarah.travels',
    followers: '1.2M followers',
    avatar: '/c6-traveler-sarah.png',
  },
  {
    handle: '@thewanderjay',
    followers: '980K followers',
    avatar: '/c6-traveler-jay.png',
  },
  {
    handle: '@mapsofmaya',
    followers: '750K followers',
    avatar: '/c6-traveler-maya.png',
  },
  {
    handle: '@roamwithalex',
    followers: '640K followers',
    avatar: '/c6-traveler-alex.png',
  },
];

export default function ExplorePage({ onBack, onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState('cafes');
  const [searchQuery, setSearchQuery] = useState('');
  const [maps, setMaps] = useState(POPULAR_MAPS);
  const [activeTab, setActiveTab] = useState('explore');
  const [toastMessage, setToastMessage] = useState(null);

  // Hero carousel state (d1, d2, d3: Rome, Barcelona, Vienna)
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  // Auto-advance hero slides every 3.5 seconds (3-4 seconds gap)
  useEffect(() => {
    if (isHeroHovered) return;
    const timer = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isHeroHovered]);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 45) {
      // Swiped left -> next slide
      setCurrentHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    } else if (diff < -45) {
      // Swiped right -> previous slide
      setCurrentHeroIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    }
    setTouchStartX(null);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleLike = (id) => {
    setMaps((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const newState = !m.isLiked;
          showToast(newState ? `Added "${m.title}" to saved maps!` : `Removed from saved maps`);
          return { ...m, isLiked: newState };
        }
        return m;
      })
    );
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#fafbfe] sm:rounded-[44px] flex flex-col justify-between">
      {/* Top Header & Status Bar Area */}
      <div className="w-full pt-3 sm:pt-3.5 px-6 z-20 shrink-0 bg-[#fafbfe]/90 backdrop-blur-md">
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

        {/* Branding & Notifications Header */}
        <div className="flex items-center justify-between pb-2">
          <div className="flex flex-col">
            {/* Logo with Gradient 'A' Pin */}
            <div className="flex items-center">
              <span className="text-[21px] sm:text-[22px] font-black text-[#10173b] tracking-wider font-display">
                PL
              </span>
              {/* Glowing gradient pin inside 'A' */}
              <div className="relative flex items-center justify-center mx-[1px]">
                <span className="text-[21px] sm:text-[22px] font-black text-transparent bg-clip-text bg-gradient-to-b from-[#6961f6] to-[#5146e2] font-display">
                  A
                </span>
                <div className="absolute w-2 h-2 rounded-full bg-white shadow-xs top-[7px]" />
              </div>
              <span className="text-[21px] sm:text-[22px] font-black text-[#10173b] tracking-wider font-display">
                NITORY
              </span>
            </div>
            <span className="text-[11.5px] text-[#6b779a] font-medium tracking-tight -mt-0.5">
              Maps with stories. Trips with meaning.
            </span>
          </div>

          {/* Notification Bell with Red Badge */}
          <button
            onClick={() => onNavigate ? onNavigate('notifications') : showToast("Opening notifications...")}
            className="relative w-9 h-9 rounded-full flex items-center justify-center text-[#12183a] hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-5 h-5 text-[#12183a]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ff4a73] ring-2 ring-white" />
          </button>
        </div>

        {/* Search & Filter Pill Bar */}
        <div
          onClick={() => onNavigate && onNavigate('search')}
          className="w-full h-[46px] sm:h-[48px] rounded-2xl bg-white border border-[#e4e8f7] shadow-[0_2px_8px_rgba(50,70,140,0.03)] flex items-center px-3.5 gap-2.5 focus-within:border-[#544ee5] focus-within:ring-2 focus-within:ring-[#544ee5]/15 transition-all mb-2.5 cursor-pointer hover:border-indigo-200"
        >
          <Search className="w-4 h-4 text-[#717ea1] shrink-0" />
          <input
            type="text"
            placeholder="Search city, country or theme..."
            value={searchQuery}
            readOnly
            onClick={() => onNavigate && onNavigate('search')}
            className="w-full bg-transparent text-[13.5px] font-medium text-[#111936] placeholder:text-[#7885a5] outline-none cursor-pointer"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onNavigate) onNavigate('search');
            }}
            className="text-[#131b38] hover:text-[#544ee5] active:scale-95 transition-colors shrink-0 cursor-pointer"
            title="Filter search"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Scrollable Feed Content */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y px-5 sm:px-6 space-y-4 pb-28 scrollbar-none">
        {/* Horizontal Category Icons */}
        <div className="flex items-center justify-between gap-2 pt-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                showToast(`Filtered by ${cat.name}`);
              }}
              className="flex-1 aspect-square max-w-[66px] rounded-2xl overflow-hidden hover:scale-105 active:scale-95 transition-all duration-150 shadow-[0_2px_8px_rgba(50,70,140,0.04)]"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover pointer-events-none"
              />
            </button>
          ))}
        </div>

        {/* Featured Hero Carousel: Rome (d1), Barcelona (d2), Vienna (d3) */}
        <div
          onMouseEnter={() => setIsHeroHovered(true)}
          onMouseLeave={() => setIsHeroHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full rounded-[24px] sm:rounded-[26px] overflow-hidden shadow-[0_8px_24px_rgba(50,70,140,0.12)] cursor-pointer group hover:shadow-xl transition-all duration-200 aspect-[16/9] bg-slate-900"
        >
          {/* Slides Track - Smooth Horizontal Right-to-Left Slide Transition */}
          <div
            className="flex transition-transform duration-700 ease-out h-full w-full"
            style={{ transform: `translateX(-${currentHeroIndex * 100}%)` }}
          >
            {HERO_SLIDES.map((slide, idx) => (
              <div
                key={slide.id}
                onClick={() => {
                  showToast(`Opening "${slide.title}" itinerary...`);
                  if (onNavigate) onNavigate('map-detail');
                }}
                className="w-full h-full shrink-0 relative select-none"
              >
                <img
                  src={slide.img}
                  alt={slide.title}
                  className="w-full h-full object-cover group-hover:scale-[1.015] transition-transform duration-300 pointer-events-none"
                />
              </div>
            ))}
          </div>

          {/* Left Arrow Navigation Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentHeroIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
            }}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 cursor-pointer shadow-md"
            title="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Right Arrow Navigation Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
            }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-sm text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20 cursor-pointer shadow-md"
            title="Next slide"
          >
            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Interactive Indicator Pills */}
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 bg-black/35 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
            {HERO_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentHeroIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentHeroIndex === idx
                    ? 'w-6 bg-white shadow-xs'
                    : 'w-1.5 bg-white/50 hover:bg-white/80'
                }`}
                title={`Go to ${slide.title}`}
              />
            ))}
          </div>
        </div>

        {/* Popular Maps Section */}
        <div className="w-full space-y-2.5">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-[17px] sm:text-[18px] font-extrabold text-[#111936] tracking-tight">
              Popular Maps
            </h2>
            <button
              onClick={() => showToast("Viewing all popular maps")}
              className="text-[#544ee5] hover:text-[#4139cf] font-bold text-[12.5px] tracking-tight"
            >
              See All &gt;
            </button>
          </div>

          {/* Maps Cards */}
          <div className="space-y-2.5">
            {maps.map((map) => (
              <div
                key={map.id}
                onClick={() => showToast(`Opening map: ${map.title}`)}
                className="w-full p-2.5 rounded-2xl bg-white border border-[#e4e8f7] shadow-[0_2px_8px_rgba(50,70,140,0.03)] flex items-center justify-between gap-3 hover:border-slate-300 transition-all cursor-pointer"
              >
                {/* Thumbnail */}
                <img
                  src={map.thumbnail}
                  alt={map.title}
                  className="w-[88px] h-[64px] sm:w-[96px] sm:h-[68px] object-cover rounded-xl shrink-0 pointer-events-none"
                />

                {/* Info */}
                <div className="flex-1 min-w-0 pr-1">
                  <h3 className="text-[14px] sm:text-[14.5px] font-bold text-[#111936] tracking-tight truncate leading-snug">
                    {map.title}
                  </h3>
                  <p className="text-[11.5px] text-[#717ea1] truncate leading-snug mb-1">
                    {map.subtitle}
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#717ea1] font-medium">
                    <MapPin className="w-3 h-3 text-[#717ea1] shrink-0" />
                    <span>{map.places}</span>
                    <span>&bull;</span>
                    <Clock className="w-3 h-3 text-[#717ea1] shrink-0" />
                    <span>{map.duration}</span>
                  </div>
                </div>

                {/* Favorite & Price */}
                <div className="flex flex-col items-end justify-between h-[64px] sm:h-[68px] shrink-0 py-0.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(map.id);
                    }}
                    className="p-1 rounded-full hover:bg-slate-50 transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 transition-all ${
                        map.isLiked
                          ? 'fill-[#ff4a73] text-[#ff4a73] scale-110'
                          : 'text-[#8b95b5] hover:text-[#ff4a73]'
                      }`}
                    />
                  </button>
                  <span className="text-[14px] font-extrabold text-[#111936]">
                    {map.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Travelers Section */}
        <div className="w-full space-y-2.5 pt-1">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-[17px] sm:text-[18px] font-extrabold text-[#111936] tracking-tight">
              Featured Travelers
            </h2>
            <button
              onClick={() => showToast("Viewing all travelers")}
              className="text-[#544ee5] hover:text-[#4139cf] font-bold text-[12.5px] tracking-tight"
            >
              See All &gt;
            </button>
          </div>

          {/* Travelers Row */}
          <div className="flex items-center gap-3 overflow-x-auto scrollbar-none pb-1">
            {TRAVELERS.map((traveler, idx) => (
              <div
                key={idx}
                onClick={() => {
                  if (onNavigate) onNavigate('creator-profile');
                  else showToast(`Viewing profile of ${traveler.handle}`);
                }}
                className="flex flex-col items-center text-center shrink-0 cursor-pointer hover:opacity-95 transition-opacity"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shadow-sm mb-1.5 ring-2 ring-white">
                  <img
                    src={traveler.avatar}
                    alt={traveler.handle}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </div>
                <span className="text-[11px] font-bold text-[#111936] max-w-[76px] truncate leading-tight">
                  {traveler.handle}
                </span>
                <span className="text-[9.5px] text-[#717ea1] leading-tight">
                  {traveler.followers}
                </span>
              </div>
            ))}

            {/* Next Scroll Arrow */}
            <button
              onClick={() => showToast("Loading more featured creators...")}
              className="w-10 h-10 rounded-full bg-[#edf0fc] hover:bg-[#e2e7f8] text-[#544ee5] flex items-center justify-center shrink-0 shadow-xs transition-colors ml-1"
            >
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Bottom Navigation Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#e8ecf8] px-6 pt-2 pb-3 sm:pb-2.5 shadow-[0_-4px_20px_rgba(50,70,140,0.06)] flex items-center justify-between">
        {/* Explore Tab */}
        <button
          onClick={() => setActiveTab('explore')}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'explore' ? 'text-[#544ee5]' : 'text-[#717ea1] hover:text-[#111936]'
          }`}
        >
          <Home className="w-5 h-5 fill-current" />
          <span className="text-[11px] font-bold">Explore</span>
        </button>

        {/* My Maps Tab */}
        <button
          onClick={() => {
            if (onNavigate) onNavigate('purchased-map');
            else showToast("Opening My Maps");
          }}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'mymaps' ? 'text-[#544ee5]' : 'text-[#717ea1] hover:text-[#111936]'
          } cursor-pointer`}
        >
          <Map className="w-5 h-5" />
          <span className="text-[11px] font-semibold">My Maps</span>
        </button>

        {/* Center Floating Action Button (+ Create) */}
        <div className="-mt-6 flex flex-col items-center">
          <button
            onClick={() => {
              if (onNavigate) onNavigate('create');
              else showToast("Create new map story...");
            }}
            className="w-13 h-13 rounded-full bg-[#544ee5] hover:bg-[#4842db] active:scale-95 text-white flex items-center justify-center shadow-lg shadow-indigo-300 transition-all cursor-pointer"
            title="Create Map"
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
            else {
              setActiveTab('profile');
              showToast("Opening Profile");
            }
          }}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'profile' ? 'text-[#544ee5]' : 'text-[#717ea1] hover:text-[#111936]'
          }`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10.5px] font-semibold">Profile</span>
        </button>
      </div>

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
