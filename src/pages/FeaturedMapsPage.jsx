import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  Heart,
  Bookmark,
  MapPin,
  Clock,
  Home,
  Map,
  User,
  Users,
  Plus,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';

const CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'cafes', name: 'Cafés', icon: '☕' },
  { id: 'museums', name: 'Museums', icon: '🏛️' },
  { id: 'food', name: 'Food', icon: '🍝' },
  { id: 'nature', name: 'Nature', icon: '🌲' },
  { id: 'culture', name: 'Culture', icon: '🎭' },
];

const ALL_FEATURED_MAPS = [
  {
    id: 'paris-museums',
    title: 'Top 5 Museums in Paris',
    subtitle: 'Art, history and must-see highlights.',
    badge: 'Bestseller',
    badgeBg: 'bg-[#1b254b] text-white',
    thumbnail: '/map-card-paris-hq.png',
    hasEmbeddedBadge: true,
    places: '5 places',
    duration: '1–2 days',
    creatorHandle: 'travelwithjulie',
    creatorAvatar: '/c6-traveler-sarah.png',
    rating: 4.9,
    reviewsCount: '320',
    price: '$9.99',
    category: 'museums',
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 'rome-weekend',
    title: 'Rome in a Weekend',
    subtitle: 'Explore iconic places and hidden gems.',
    badge: 'New',
    badgeBg: 'bg-[#eeedff] text-[#544ee5]',
    thumbnail: '/map-card-rome-hq.jpg',
    hasEmbeddedBadge: true,
    places: '7 places',
    duration: '2–3 days',
    creatorHandle: 'explorerchris',
    creatorAvatar: '/c6-traveler-jay.png',
    rating: 4.8,
    reviewsCount: '184',
    price: '$11.99',
    category: 'culture',
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 'tokyo-gems',
    title: 'Tokyo Hidden Gems',
    subtitle: 'Off the beaten path, real local spots.',
    badge: "Editor's Pick",
    badgeBg: 'bg-[#6b62f6] text-white',
    thumbnail: '/grid-tokyo-map.png',
    hasEmbeddedBadge: false,
    places: '6 places',
    duration: '1–2 days',
    creatorHandle: 'sarahmaps',
    creatorAvatar: '/c6-traveler-maya.png',
    rating: 4.9,
    reviewsCount: '267',
    price: '$8.99',
    category: 'culture',
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 'nyc-food',
    title: 'New York City Food Guide',
    subtitle: 'Iconic bites and local favorites.',
    badge: 'Trending',
    badgeBg: 'bg-[#1b254b] text-white',
    thumbnail: '/map-card-nyc-hq.jpg',
    hasEmbeddedBadge: true,
    places: '10 places',
    duration: '2–4 days',
    creatorHandle: 'matthewgoes',
    creatorAvatar: '/c6-traveler-alex.png',
    rating: 4.7,
    reviewsCount: '190',
    price: '$12.99',
    category: 'food',
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 'amalfi-escape',
    title: 'Amalfi Coast Escape',
    subtitle: 'Breathtaking views, food and fun.',
    badge: 'Popular',
    badgeBg: 'bg-[#1b254b] text-white',
    thumbnail: '/grid-amalfi-map.png',
    places: '8 places',
    duration: '2–3 days',
    creatorHandle: 'jess.travels',
    creatorAvatar: '/c7-creator-emma.png',
    rating: 4.8,
    reviewsCount: '142',
    price: '$10.99',
    category: 'nature',
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 'barcelona-highlights',
    title: 'Barcelona Highlights',
    subtitle: 'History, art and Mediterranean charm.',
    badge: 'New',
    badgeBg: 'bg-[#eeedff] text-[#544ee5]',
    thumbnail: '/grid-barcelona-map.png',
    places: '9 places',
    duration: '2–3 days',
    creatorHandle: 'lucastravels',
    creatorAvatar: '/c6-traveler-sarah.png',
    rating: 4.9,
    reviewsCount: '211',
    price: '$11.99',
    category: 'culture',
    isLiked: false,
    isBookmarked: false,
  },
];

export default function FeaturedMapsPage({ onBack, onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popular');
  const [mapsList, setMapsList] = useState(ALL_FEATURED_MAPS);
  const [activeTab, setActiveTab] = useState('explore');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleLike = (id) => {
    setMapsList((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const next = !m.isLiked;
          showToast(next ? `Saved "${m.title}" to favorites!` : `Removed from favorites`);
          return { ...m, isLiked: next };
        }
        return m;
      })
    );
  };

  const toggleBookmark = (id) => {
    setMapsList((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const next = !m.isBookmarked;
          showToast(next ? `Bookmarked "${m.title}"!` : `Removed from bookmarks`);
          return { ...m, isBookmarked: next };
        }
        return m;
      })
    );
  };

  // Filtered & Sorted Maps
  const filteredMaps = mapsList
    .filter((m) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.creatorHandle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCat = selectedCategory === 'all' || m.category === selectedCategory;
      return matchesSearch && matchesCat;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price') return parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', ''));
      return 0;
    });

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#fafbfe] sm:rounded-[44px] flex flex-col justify-between select-none">
      {/* ========================================================= */}
      {/* 1. TOP HEADER & SEARCH BAR                                */}
      {/* ========================================================= */}
      <div className="w-full pt-3 sm:pt-3.5 px-5 sm:px-6 z-20 shrink-0 bg-[#fafbfe]/95 backdrop-blur-md">
        {/* iOS Status Bar */}
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

        {/* Title Bar with Back Button & Search Icon */}
        <div className="flex items-center justify-between py-1">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white shadow-xs border border-slate-100 flex items-center justify-center text-[#0f1738] hover:bg-slate-50 active:scale-95 transition-all cursor-pointer shrink-0"
            title="Go back"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.4]" />
          </button>

          <div className="flex flex-col items-center text-center">
            <h1 className="text-[20px] font-extrabold text-[#0f1738] tracking-tight font-serif leading-tight">
              Featured Maps
            </h1>
            <p className="text-[11.5px] text-[#717ea1] font-medium tracking-tight mt-0.5">
              Curated by travelers. Ready to explore.
            </p>
          </div>

          <button
            onClick={() => {
              if (onNavigate) onNavigate('search');
              else showToast('Search maps...');
            }}
            className="w-10 h-10 rounded-full bg-white shadow-xs border border-slate-100 flex items-center justify-center text-[#0f1738] hover:text-[#544ee5] active:scale-95 transition-all cursor-pointer shrink-0"
            title="Search"
            aria-label="Search"
          >
            <Search className="w-5 h-5 stroke-[2]" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="w-full h-[46px] rounded-2xl bg-white border border-[#e4e8f7] shadow-[0_2px_8px_rgba(50,70,140,0.03)] flex items-center px-3.5 gap-2.5 focus-within:border-[#544ee5] focus-within:ring-2 focus-within:ring-[#544ee5]/15 transition-all mt-2 mb-2 hover:border-indigo-200">
          <Search className="w-4 h-4 text-[#717ea1] shrink-0" />
          <input
            type="text"
            placeholder="Search maps, cities or themes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-[13px] font-medium text-[#111936] placeholder:text-[#7885a5] outline-none"
          />
          <button
            onClick={() => {
              if (onNavigate) onNavigate('search');
            }}
            className="text-[#131b38] hover:text-[#544ee5] active:scale-95 transition-colors shrink-0 cursor-pointer"
            title="Filter options"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filter Pills (Horizontal Row) */}
        <div className="flex items-center gap-2 py-1.5 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  showToast(`Category: ${cat.name}`);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-2xl font-bold text-[12px] transition-all cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#544ee5] text-white shadow-sm'
                    : 'bg-white text-[#0f1738] border border-slate-100 shadow-2xs hover:bg-slate-50'
                }`}
              >
                {cat.icon && <span>{cat.icon}</span>}
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. MAIN 2-COLUMN GRID SECTION (MATCHING MOCKUP)           */}
      {/* ========================================================= */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y px-4 sm:px-5 pb-28 pt-1 scrollbar-none">
        {/* Count & Sort Subheader */}
        <div className="flex items-center justify-between py-2 px-1">
          <span className="text-[14px] font-black text-[#0f1738]">
            {filteredMaps.length} Maps
          </span>

          {/* Sort Dropdown */}
          <div className="relative flex items-center gap-1 text-[12px] font-bold text-[#544ee5] cursor-pointer">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-transparent text-[#544ee5] font-bold pr-4 cursor-pointer outline-none"
            >
              <option value="popular">Sort by: Popular</option>
              <option value="rating">Sort by: Rating</option>
              <option value="price">Sort by: Price</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 -ml-3.5 pointer-events-none text-[#544ee5]" />
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 pb-2">
          {filteredMaps.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-[22px] border border-[#e8ecf8] shadow-[0_4px_16px_rgba(50,70,140,0.06)] overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all"
            >
              {/* Top Map Thumbnail with Badge & Heart */}
              <div
                onClick={() => {
                  if (onNavigate) onNavigate('map-detail');
                }}
                className="relative w-full aspect-[16/10] overflow-hidden cursor-pointer bg-slate-100"
              >
                <img
                  src={card.thumbnail}
                  alt={card.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 pointer-events-none"
                />

                {/* Badge (if not already embedded in artwork) */}
                {!card.hasEmbeddedBadge && (
                  <span
                    className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-[9.5px] font-bold shadow-xs ${card.badgeBg}`}
                  >
                    {card.badge}
                  </span>
                )}

                {/* Heart Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(card.id);
                  }}
                  className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-[#0f1738] transition-all cursor-pointer z-10 ${
                    card.isLiked
                      ? 'bg-white shadow-xs'
                      : card.hasEmbeddedBadge
                      ? 'bg-transparent'
                      : 'bg-white/95 backdrop-blur-xs shadow-xs hover:scale-110 active:scale-90'
                  }`}
                  title="Favorite"
                >
                  {(card.isLiked || !card.hasEmbeddedBadge) && (
                    <Heart
                      className={`w-3.5 h-3.5 transition-all ${
                        card.isLiked ? 'fill-[#ff4a73] text-[#ff4a73] scale-110' : 'text-[#717ea1]'
                      }`}
                    />
                  )}
                </button>
              </div>

              {/* Card Body */}
              <div className="p-2.5 sm:p-3 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => {
                      if (onNavigate) onNavigate('map-detail');
                    }}
                    className="text-[13.5px] font-black text-[#0f1738] leading-tight tracking-tight truncate cursor-pointer hover:text-[#544ee5] transition-colors"
                  >
                    {card.title}
                  </h3>
                  <p className="text-[10.5px] text-[#717ea1] leading-tight mt-0.5 truncate font-medium">
                    {card.subtitle}
                  </p>

                  {/* Places & Days Stats */}
                  <div className="flex items-center gap-1.5 text-[10px] text-[#717ea1] font-semibold mt-1.5">
                    <span className="flex items-center gap-0.5 truncate">
                      <MapPin className="w-3 h-3 text-[#717ea1] shrink-0" />
                      {card.places}
                    </span>
                    <span>&bull;</span>
                    <span className="flex items-center gap-0.5 truncate">
                      <Clock className="w-3 h-3 text-[#717ea1] shrink-0" />
                      {card.duration}
                    </span>
                  </div>

                  {/* Creator */}
                  <div
                    onClick={() => {
                      if (onNavigate) onNavigate('creator-profile');
                    }}
                    className="flex items-center gap-1.5 mt-1.5 cursor-pointer hover:opacity-85"
                  >
                    <img
                      src={card.creatorAvatar}
                      alt={card.creatorHandle}
                      className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-100 shrink-0"
                    />
                    <span className="text-[11px] font-semibold text-[#556080] truncate">
                      {card.creatorHandle}
                    </span>
                  </div>
                </div>

                {/* Price & Actions */}
                <div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                    <div className="flex items-center gap-0.5 text-[10.5px] font-bold text-amber-500">
                      <span>★ {card.rating}</span>
                      <span className="text-slate-400 font-normal text-[9.5px]">
                        ({card.reviewsCount})
                      </span>
                    </div>
                    <span className="text-[13px] font-black text-[#0f1738]">{card.price}</span>
                  </div>

                  {/* View Map + Bookmark */}
                  <div className="flex items-center gap-1.5 pt-1.5">
                    <button
                      onClick={() => {
                        showToast(`Opening ${card.title} map details...`);
                        if (onNavigate) onNavigate('map-detail');
                      }}
                      className="flex-1 py-1.5 rounded-xl bg-[#f0efff] hover:bg-[#544ee5] text-[#544ee5] hover:text-white font-bold text-[11px] transition-all cursor-pointer text-center"
                    >
                      View Map
                    </button>
                    <button
                      onClick={() => toggleBookmark(card.id)}
                      className="w-7 h-7 rounded-xl border border-slate-100 flex items-center justify-center text-[#717ea1] hover:text-[#544ee5] hover:bg-slate-50 transition-all cursor-pointer shrink-0"
                      title="Bookmark map"
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${
                          card.isBookmarked ? 'fill-[#544ee5] text-[#544ee5]' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. FLOATING BOTTOM NAVIGATION BAR                         */}
      {/* ========================================================= */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#e8ecf8] px-6 pt-2 pb-3 sm:pb-2.5 shadow-[0_-4px_20px_rgba(50,70,140,0.06)] flex items-center justify-between">
        {/* Explore Tab */}
        <button
          onClick={() => {
            if (onNavigate) onNavigate('explore');
          }}
          className="flex flex-col items-center gap-1 text-[#544ee5] cursor-pointer"
        >
          <Home className="w-5 h-5 fill-current" />
          <span className="text-[11px] font-bold">Explore</span>
        </button>

        {/* My Maps Tab */}
        <button
          onClick={() => {
            if (onNavigate) onNavigate('purchased-map');
            else showToast('Opening My Maps');
          }}
          className="flex flex-col items-center gap-1 text-[#717ea1] hover:text-[#111936] transition-all cursor-pointer"
        >
          <Map className="w-5 h-5" />
          <span className="text-[11px] font-semibold">My Maps</span>
        </button>

        {/* Center Floating Action Button (+ Create) */}
        <div className="-mt-6 flex flex-col items-center">
          <button
            onClick={() => {
              if (onNavigate) onNavigate('create');
              else showToast('Create new map story...');
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
            else showToast('Opening Profile');
          }}
          className="flex flex-col items-center gap-1 text-[#717ea1] hover:text-[#111936] transition-all cursor-pointer"
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
