import React, { useState } from 'react';
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
  Share2
} from 'lucide-react';

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
    <div className="relative w-full h-full min-h-[720px] max-h-[960px] aspect-[9/16] select-none overflow-hidden rounded-[32px] sm:rounded-[44px] shadow-2xl bg-[#fafbfe] flex flex-col justify-between">
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
            onClick={() => showToast("No new notifications")}
            className="relative w-9 h-9 rounded-full flex items-center justify-center text-[#12183a] hover:bg-slate-100 active:scale-95 transition-all"
            title="Notifications"
          >
            <Bell className="w-5 h-5 text-[#12183a]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#ff4a73] ring-2 ring-white" />
          </button>
        </div>

        {/* Search & Filter Pill Bar */}
        <div className="w-full h-[46px] sm:h-[48px] rounded-2xl bg-white border border-[#e4e8f7] shadow-[0_2px_8px_rgba(50,70,140,0.03)] flex items-center px-3.5 gap-2.5 focus-within:border-[#544ee5] focus-within:ring-2 focus-within:ring-[#544ee5]/15 transition-all mb-2.5">
          <Search className="w-4 h-4 text-[#717ea1] shrink-0" />
          <input
            type="text"
            placeholder="Search city, country or theme..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-[13.5px] font-medium text-[#111936] placeholder:text-[#7885a5] outline-none"
          />
          <button
            onClick={() => showToast("Filters: Price, Duration, Rating")}
            className="text-[#131b38] hover:text-[#544ee5] active:scale-95 transition-colors shrink-0"
            title="Filter search"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Scrollable Feed Content */}
      <div className="flex-1 overflow-y-auto px-5 sm:px-6 space-y-4 pb-24 scrollbar-none">
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

        {/* Featured Hero Card (Paris) */}
        <div
          onClick={() => onNavigate ? onNavigate('map-detail') : showToast('Opening "Best 5 Cafés in Paris" itinerary...')}
          className="relative w-full rounded-[24px] sm:rounded-[26px] overflow-hidden shadow-[0_8px_24px_rgba(50,70,140,0.12)] cursor-pointer group hover:shadow-xl transition-all duration-200"
        >
          <img
            src="/c6-hero-paris.png"
            alt="Best 5 Cafés in Paris"
            className="w-full h-auto object-cover group-hover:scale-[1.015] transition-transform duration-300"
          />
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
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#e8ecf8] px-6 py-2 shadow-[0_-4px_20px_rgba(50,70,140,0.06)] flex items-center justify-between">
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
            setActiveTab('mymaps');
            showToast("Opening My Maps");
          }}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'mymaps' ? 'text-[#544ee5]' : 'text-[#717ea1] hover:text-[#111936]'
          }`}
        >
          <Map className="w-5 h-5" />
          <span className="text-[11px] font-semibold">My Maps</span>
        </button>

        {/* Center Floating Action Button (+ Create) */}
        <div className="-mt-6 flex flex-col items-center">
          <button
            onClick={() => showToast("Create new map story...")}
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
