import React, { useState } from 'react';
import {
  Search,
  Bell,
  ArrowRight,
  Heart,
  Bookmark,
  MapPin,
  Star,
  UtensilsCrossed,
  Trees,
  Landmark,
  Moon,
  Map as MapIcon,
  Gem,
  Sparkles,
  Plus,
  Home,
  Users,
  User,
  CheckCircle2,
  Leaf,
  BookOpen,
  ChevronRight
} from 'lucide-react';

// Categories matching c29.png
const CATEGORIES = [
  { id: 'food', name: 'Food & Drinks', icon: UtensilsCrossed },
  { id: 'nature', name: 'Nature', icon: Leaf },
  { id: 'culture', name: 'Culture', icon: Landmark },
  { id: 'nightlife', name: 'Nightlife', icon: Moon },
  { id: 'guides', name: 'City Guides', icon: BookOpen },
  { id: 'gems', name: 'Hidden Gems', icon: Gem },
];

// Featured Maps matching c29.png exactly
const INITIAL_FEATURED_MAPS = [
  {
    id: 'nyc-food',
    title: 'New York City Food Guide',
    places: '42 places',
    creatorHandle: 'jess.travels',
    creatorAvatar: '/c29-avatar-jess.png',
    rating: 4.8,
    reviews: '120',
    price: '$9.99',
    originalPrice: null,
    badge: 'Bestseller',
    badgeType: 'bestseller',
    thumbnail: '/c29-map-nyc.png',
    category: 'food',
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 'bali-wellness',
    title: 'Bali – Nature & Wellness',
    places: '56 places',
    creatorHandle: 'mindfulmiles',
    creatorAvatar: '/c29-avatar-mindful.png',
    rating: 4.9,
    reviews: '87',
    price: '$12.99',
    originalPrice: null,
    badge: 'New',
    badgeType: 'new-teal',
    thumbnail: '/c29-map-bali.png',
    category: 'nature',
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: 'europe-bundle',
    title: 'Europe City Bundle',
    places: '120+ places',
    creatorHandle: 'thetraveleredit',
    creatorAvatar: '/c29-avatar-traveler.png',
    rating: 4.7,
    reviews: '200',
    price: '$19.99',
    originalPrice: '$29.00',
    badge: 'New',
    badgeType: 'new-purple',
    thumbnail: '/c29-map-europe.png',
    category: 'culture',
    isLiked: false,
    isBookmarked: false,
  },
];

export default function ExplorePage({ onBack, onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [maps, setMaps] = useState(INITIAL_FEATURED_MAPS);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleFavorite = (id, title) => {
    setMaps((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const next = !m.isLiked;
          showToast(next ? `Saved "${title}" to favorites` : `Removed from favorites`);
          return { ...m, isLiked: next };
        }
        return m;
      })
    );
  };

  const toggleBookmark = (id, title) => {
    setMaps((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const next = !m.isBookmarked;
          showToast(next ? `Bookmarked "${title}"` : `Removed bookmark`);
          return { ...m, isBookmarked: next };
        }
        return m;
      })
    );
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (onNavigate) {
      onNavigate('search');
    }
  };

  const filteredMaps = maps.filter((m) => {
    const matchesCategory = !selectedCategory || m.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.creatorHandle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#fafbfe] sm:rounded-[44px] flex flex-col justify-between select-none">
      {/* Scrollable Container */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y pb-28 scrollbar-none">
        {/* Top iOS Status Bar */}
        <div className="pt-3 px-6 flex items-center justify-between text-[#0f1738]">
          <span className="text-[13px] tracking-tight font-bold">9:41</span>
          <div className="flex items-center gap-1.5">
            <div className="flex items-end gap-[1.5px] h-3">
              <div className="w-[3px] h-1 bg-[#0f1738] rounded-[0.5px]" />
              <div className="w-[3px] h-1.5 bg-[#0f1738] rounded-[0.5px]" />
              <div className="w-[3px] h-2 bg-[#0f1738] rounded-[0.5px]" />
              <div className="w-[3px] h-3 bg-[#0f1738] rounded-[0.5px]" />
            </div>
          </div>
        </div>

        {/* Brand Header: Logo + Notification Bell (matching c29.png) */}
        <div className="px-5 pt-3 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-0.5">
            <h1 className="text-[24px] sm:text-[26px] font-black tracking-tight text-[#0c1228] font-sans flex items-center">
              <span>PLAN</span>
              <span className="relative text-[#544ee5]">I</span>
              <span>TORY</span>
            </h1>
          </div>

          {/* Notification Bell with Active Indicator */}
          <button
            onClick={() => onNavigate && onNavigate('notifications')}
            className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-[#0f1738] relative active:scale-90 transition-all cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-5 h-5 stroke-[2.2]" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>
        </div>

        {/* Hero Banner with Pinned Polaroids (matching c29.png) */}
        <div className="relative px-5 pt-3 pb-4">
          {/* Subtle World Map Watermark Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/40 via-purple-50/20 to-transparent pointer-events-none rounded-3xl -z-10" />

          <div className="grid grid-cols-12 items-center gap-2">
            {/* Left Hero Typography */}
            <div className="col-span-7 sm:col-span-7 pr-1">
              <p className="text-[9.5px] sm:text-[10.5px] font-extrabold uppercase tracking-wider text-[#717ea1] leading-tight">
                A personalised guide, <br />
                built inside your map
              </p>
              <h2 className="text-[26px] sm:text-[30px] font-black text-[#0f1738] tracking-tight leading-[1.08] mt-2 font-serif">
                Discover, buy and create <br />
                <span className="relative inline-block text-[#0f1738]">
                  travel maps
                  <svg
                    className="absolute -bottom-1.5 left-0 w-full h-2.5 text-[#544ee5]"
                    viewBox="0 0 100 12"
                    preserveAspectRatio="none"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  >
                    <path d="M 2 8 C 25 3, 75 11, 98 4" />
                  </svg>
                </span>
              </h2>
            </div>

            {/* Right Hero Polaroid Cluster (New York, Bali, Tokyo) */}
            <div className="col-span-5 sm:col-span-5 relative flex justify-end">
              <div
                onClick={() => onNavigate && onNavigate('map-detail')}
                className="relative w-full max-w-[175px] aspect-[1/1] cursor-pointer hover:scale-105 transition-transform duration-300"
              >
                <img
                  src="/c29-polaroids.png"
                  alt="New York, Bali, Tokyo Travel Maps"
                  className="w-full h-full object-contain pointer-events-none filter drop-shadow-[0_8px_18px_rgba(84,78,229,0.15)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Global Search Bar (matching c29.png) */}
        <div className="px-5 pt-1 pb-3">
          <form
            onSubmit={handleSearchSubmit}
            className="w-full bg-white rounded-full pl-4 pr-1.5 py-1.5 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-slate-100 flex items-center gap-2.5 transition-all hover:border-slate-200 focus-within:ring-2 focus-within:ring-[#544ee5]/20 focus-within:border-[#544ee5]"
          >
            <Search className="w-4.5 h-4.5 text-[#717ea1] stroke-[2.2] shrink-0 ml-1" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search destinations, cities, creators or categories..."
              className="w-full bg-transparent text-[12.5px] sm:text-[13px] text-[#0f1738] placeholder:text-[#9aa5c4] font-medium outline-none"
            />
            <button
              type="submit"
              className="w-8.5 h-8.5 rounded-full bg-[#0c1228] hover:bg-[#1a2346] active:scale-95 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-sm"
              title="Search"
            >
              <ArrowRight className="w-4 h-4 stroke-[2.4]" />
            </button>
          </form>
        </div>

        {/* Categories Pills Row (matching c29.png) */}
        <div className="px-5 pt-1 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    const next = isSelected ? null : cat.id;
                    setSelectedCategory(next);
                    showToast(next ? `Filtered by ${cat.name}` : 'Showing all categories');
                  }}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[12px] font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-[#544ee5] text-white shadow-md shadow-indigo-300/40 scale-[1.02]'
                      : 'bg-[#f0f0ff] text-[#544ee5] hover:bg-[#e6e6ff] active:scale-95 border border-[#e4e2fa]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 stroke-[2.4]" />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section: Featured Travel Maps (matching c29.png) */}
        <div className="px-5 pt-1 space-y-3">
          {/* Section Header */}
          <div className="flex items-end justify-between">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#717ea1] block">
                EXPLORE
              </span>
              <h3 className="text-[19px] sm:text-[21px] font-black text-[#0f1738] tracking-tight font-serif mt-0.5">
                Featured Travel Maps
              </h3>
            </div>

            <button
              onClick={() => onNavigate && onNavigate('featured-maps')}
              className="text-[13px] font-bold text-[#544ee5] hover:text-[#4338ca] flex items-center gap-1 active:translate-x-0.5 transition-all cursor-pointer pb-0.5"
            >
              <span>View all maps</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </button>
          </div>

          {/* Horizontal Scrollable 3-Card Carousel matching c29.png */}
          <div className="flex gap-3.5 overflow-x-auto scrollbar-none pb-4 pt-1 snap-x snap-mandatory">
            {filteredMaps.map((map) => (
              <div
                key={map.id}
                className="w-[245px] sm:w-[260px] bg-white rounded-[26px] border border-[#e4e8f7] overflow-hidden shadow-[0_4px_16px_rgba(50,70,140,0.06)] hover:border-slate-300 transition-all shrink-0 snap-start flex flex-col justify-between group"
              >
                {/* Card Top Map Thumbnail */}
                <div
                  onClick={() => onNavigate && onNavigate('map-detail')}
                  className="relative w-full aspect-[4/3] overflow-hidden cursor-pointer bg-[#e8f1f5]"
                >
                  <img
                    src={map.thumbnail}
                    alt={map.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none"
                  />

                  {/* Interactive Heart Button aligned over top-right white circle */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(map.id, map.title);
                    }}
                    className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer active:scale-90 transition-transform z-10"
                    title="Favorite"
                  >
                    {map.isLiked && (
                      <Heart className="w-4.5 h-4.5 fill-rose-500 text-rose-500 animate-in zoom-in-50 duration-150" />
                    )}
                  </button>
                </div>

                {/* Card Details Area */}
                <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
                  {/* Title */}
                  <h4
                    onClick={() => onNavigate && onNavigate('map-detail')}
                    className="font-extrabold text-[15px] sm:text-[15.5px] text-[#0f1738] leading-tight tracking-tight cursor-pointer hover:text-[#544ee5] transition-colors truncate"
                  >
                    {map.title}
                  </h4>

                  {/* Pin Location Count */}
                  <div className="flex items-center gap-1.5 text-[11.5px] text-[#717ea1] font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-[#717ea1] stroke-[2]" />
                    <span>{map.places}</span>
                  </div>

                  {/* Creator Info */}
                  <div
                    onClick={() => onNavigate && onNavigate('creator-profile')}
                    className="flex items-center gap-2 pt-0.5 cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={map.creatorAvatar}
                      alt={map.creatorHandle}
                      className="w-5.5 h-5.5 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <span className="text-[12px] font-bold text-[#0f1738]">
                      {map.creatorHandle}
                    </span>
                  </div>

                  {/* Rating & Pricing Row */}
                  <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                    <div className="flex items-center gap-1 text-[12px] font-bold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{map.rating}</span>
                      <span className="text-slate-400 font-semibold text-[11px]">
                        ({map.reviews})
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {map.originalPrice && (
                        <span className="text-[12px] text-slate-400 line-through font-semibold">
                          {map.originalPrice}
                        </span>
                      )}
                      <span className="text-[15px] font-black text-[#0f1738]">
                        {map.price}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons: View Map + Bookmark */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => onNavigate && onNavigate('map-detail')}
                      className="flex-1 py-2 rounded-xl bg-[#eeedff] hover:bg-[#e4e2fa] active:scale-95 text-[#544ee5] font-extrabold text-[12.5px] tracking-tight transition-all cursor-pointer text-center"
                    >
                      View Map
                    </button>

                    <button
                      onClick={() => toggleBookmark(map.id, map.title)}
                      className={`w-9 h-9 rounded-xl border flex items-center justify-center active:scale-90 transition-all cursor-pointer shrink-0 ${
                        map.isBookmarked
                          ? 'bg-indigo-50 border-indigo-200 text-[#544ee5]'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                      title="Bookmark"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${
                          map.isBookmarked ? 'fill-[#544ee5] text-[#544ee5]' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Global Bottom Navigation Bar matching c29.png */}
      <div className="relative z-30 px-3 pb-2 pt-1 pointer-events-none">
        <div className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-full px-5 py-2.5 shadow-[0_4px_24px_rgba(0,0,0,0.1)] border border-slate-100 flex items-center justify-between max-w-sm mx-auto">
          {/* Explore (Active) */}
          <button
            onClick={() => onNavigate && onNavigate('explore')}
            className="flex flex-col items-center gap-0.5 text-[#544ee5] cursor-pointer"
          >
            <Home className="w-4.5 h-4.5 stroke-[2.4]" />
            <span className="text-[9.5px] font-bold">Explore</span>
          </button>

          {/* My Maps */}
          <button
            onClick={() => onNavigate && onNavigate('purchased-map')}
            className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-[#544ee5] transition-colors cursor-pointer"
          >
            <MapIcon className="w-4.5 h-4.5" />
            <span className="text-[9.5px] font-semibold">My Maps</span>
          </button>

          {/* Create Button (Center Purple Circle) */}
          <button
            onClick={() => onNavigate && onNavigate('create')}
            className="w-10 h-10 -my-2 rounded-full bg-[#544ee5] text-white flex items-center justify-center shadow-md shadow-indigo-300 active:scale-95 transition-all cursor-pointer"
            title="Create new map"
          >
            <Plus className="w-5 h-5 stroke-[2.6]" />
          </button>

          {/* Creators */}
          <button
            onClick={() => onNavigate && onNavigate('creators')}
            className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-[#544ee5] transition-colors cursor-pointer"
          >
            <Users className="w-4.5 h-4.5" />
            <span className="text-[9.5px] font-semibold">Creators</span>
          </button>

          {/* Profile */}
          <button
            onClick={() => onNavigate && onNavigate('user-profile')}
            className="flex flex-col items-center gap-0.5 text-slate-400 hover:text-[#544ee5] transition-colors cursor-pointer"
          >
            <User className="w-4.5 h-4.5" />
            <span className="text-[9.5px] font-semibold">Profile</span>
          </button>
        </div>
      </div>

      {/* Live Feedback Toast */}
      {toastMessage && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-[#0f1738]/95 backdrop-blur-md text-white px-4 py-2 rounded-full text-[12px] font-bold shadow-xl flex items-center gap-2 border border-white/10 animate-in fade-in zoom-in-95 duration-150">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
