import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  X,
  Clock,
  Heart,
  Bookmark,
  ChevronRight,
  MapPin,
  Compass,
  Home,
  Map,
  Plus,
  Users,
  User,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

const INITIAL_RECENT_SEARCHES = [
  'Paris',
  'Rome',
  'Cafés in Vienna',
  'Barcelona',
  'Museums',
];

const SUGGESTED_DESTINATIONS = [
  {
    id: 'paris',
    city: 'Paris',
    country: 'France',
    img: '/c15-dest-paris.png',
    isLiked: false,
  },
  {
    id: 'rome',
    city: 'Rome',
    country: 'Italy',
    img: '/c15-dest-rome.png',
    isLiked: false,
  },
  {
    id: 'barcelona',
    city: 'Barcelona',
    country: 'Spain',
    img: '/c15-dest-barcelona.png',
    isLiked: false,
  },
  {
    id: 'vienna',
    city: 'Vienna',
    country: 'Austria',
    img: '/c15-dest-vienna.png',
    isLiked: false,
  },
];

const POPULAR_SEARCHES = [
  {
    id: 'pop-paris',
    city: 'Paris',
    description: 'Cafés, art, landmarks, night life',
    img: '/c15-pop-paris.png',
  },
  {
    id: 'pop-rome',
    city: 'Rome',
    description: 'History, food, ancient sites',
    img: '/c15-pop-rome.png',
  },
  {
    id: 'pop-barcelona',
    city: 'Barcelona',
    description: 'Beaches, culture, architecture',
    img: '/c15-pop-barcelona.png',
  },
  {
    id: 'pop-vienna',
    city: 'Vienna',
    description: 'Music, cafés, imperial history',
    img: '/c15-pop-vienna.png',
  },
];

const TRENDING_MAPS = [
  {
    id: 'amalfi',
    title: 'Amalfi Coast Escape',
    places: '5 places',
    duration: '1–2 days',
    img: '/c15-trend-amalfi.png',
    saved: true,
  },
  {
    id: 'swiss',
    title: 'Best of Switzerland',
    places: '7 places',
    duration: '3+ days',
    img: '/c15-trend-swiss.png',
    liked: true,
  },
  {
    id: 'italy-gems',
    title: 'Hidden Gems of Italy',
    places: '6 places',
    duration: '2–3 days',
    img: '/c15-trend-italy.png',
    saved: true,
  },
];

export default function SearchPage({ onBack, onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(INITIAL_RECENT_SEARCHES);
  const [destinations, setDestinations] = useState(SUGGESTED_DESTINATIONS);
  const [trendingMaps, setTrendingMaps] = useState(TRENDING_MAPS);
  const [toastMessage, setToastMessage] = useState(null);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleClearAll = () => {
    setRecentSearches([]);
    showToast("Cleared recent searches");
  };

  const handleTagClick = (tag) => {
    setSearchQuery(tag);
    showToast(`Searching for "${tag}"`);
  };

  const toggleDestinationLike = (id, e) => {
    e.stopPropagation();
    setDestinations((prev) =>
      prev.map((d) => {
        if (d.id === id) {
          const next = !d.isLiked;
          showToast(next ? `Saved ${d.city} to favorites` : `Removed ${d.city}`);
          return { ...d, isLiked: next };
        }
        return d;
      })
    );
  };

  const toggleTrendingBookmark = (id, e) => {
    e.stopPropagation();
    setTrendingMaps((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const next = !m.saved;
          showToast(next ? `Saved "${m.title}"` : `Removed "${m.title}"`);
          return { ...m, saved: next };
        }
        return m;
      })
    );
  };

  return (
    <div className="relative w-full h-full select-none overflow-hidden bg-[#fafbfe] sm:rounded-[44px] flex flex-col justify-between">
      {/* Top Header & Search Bar Area */}
      <div className="w-full pt-3 sm:pt-3.5 px-5 sm:px-6 z-20 shrink-0 bg-[#fafbfe]/95 backdrop-blur-md">
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

        {/* Back Button & Title Header */}
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={onBack}
            className="w-10 h-10 -ml-1.5 rounded-full flex items-center justify-center text-[#111936] hover:bg-slate-100 active:scale-95 transition-all cursor-pointer shrink-0"
            title="Go back"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
          </button>
          <div>
            <h1 className="text-[22px] sm:text-[24px] font-black text-[#111936] tracking-tight leading-tight">
              Search
            </h1>
            <p className="text-[12px] sm:text-[12.5px] text-[#717ea1] font-medium leading-none">
              Find your next destination
            </p>
          </div>
        </div>

        {/* Search Input Row with Filter Button */}
        <div className="flex items-center gap-2.5 pb-2.5">
          <div className="flex-1 h-[48px] rounded-2xl bg-white border border-[#e4e8f7] shadow-[0_2px_8px_rgba(50,70,140,0.03)] flex items-center px-3.5 gap-2.5 focus-within:border-[#544ee5] focus-within:ring-2 focus-within:ring-[#544ee5]/15 transition-all">
            <Search className="w-4 h-4 text-[#717ea1] shrink-0" />
            <input
              type="text"
              placeholder="Search city, country or theme..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-[13.5px] font-medium text-[#111936] placeholder:text-[#7885a5] outline-none"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <button
            onClick={() => setShowFilterModal(true)}
            className="w-[48px] h-[48px] rounded-2xl bg-white border border-[#e4e8f7] shadow-[0_2px_8px_rgba(50,70,140,0.03)] flex items-center justify-center text-[#111936] hover:text-[#544ee5] hover:border-[#544ee5] active:scale-95 transition-all cursor-pointer shrink-0"
            title="Filters"
          >
            <SlidersHorizontal className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-5 sm:px-6 space-y-5 pb-32 scrollbar-none">
        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <div className="pt-1">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[15px] sm:text-[16px] font-extrabold text-[#111936] tracking-tight">
                Recent Searches
              </h2>
              <button
                onClick={handleClearAll}
                className="text-[#544ee5] hover:text-[#423bcb] font-bold text-[12.5px] cursor-pointer"
              >
                Clear All
              </button>
            </div>

            {/* Horizontal Pill Tags */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {recentSearches.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleTagClick(item)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#edf1fb] hover:bg-[#e4e9f7] active:scale-95 text-[#111936] text-[12.5px] font-semibold whitespace-nowrap transition-all cursor-pointer shrink-0"
                >
                  <Clock className="w-3.5 h-3.5 text-[#717ea1] stroke-[2.2]" />
                  <span>{item}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Suggested Destinations */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-[15px] sm:text-[16px] font-extrabold text-[#111936] tracking-tight">
              Suggested Destinations
            </h2>
            <button
              onClick={() => showToast("Viewing all destinations")}
              className="text-[#544ee5] hover:text-[#423bcb] font-bold text-[12.5px] cursor-pointer"
            >
              See All &gt;
            </button>
          </div>

          {/* Horizontal Destinations Carousel */}
          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
            {destinations.map((dest) => (
              <div
                key={dest.id}
                onClick={() => {
                  showToast(`Selected destination: ${dest.city}`);
                  if (onNavigate) onNavigate('map-detail');
                }}
                className="relative w-[112px] sm:w-[124px] h-[135px] sm:h-[145px] rounded-2xl overflow-hidden shrink-0 shadow-[0_4px_12px_rgba(50,70,140,0.08)] cursor-pointer group hover:scale-[1.02] transition-transform duration-200"
              >
                <img
                  src={dest.img}
                  alt={dest.city}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none"
                />

                {/* Hitbox over baked heart */}
                <button
                  onClick={(e) => toggleDestinationLike(dest.id, e)}
                  className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 active:scale-95 transition-all z-10"
                >
                  {dest.isLiked && (
                    <Heart className="w-4 h-4 fill-[#ff4a73] text-[#ff4a73] animate-in zoom-in-50 duration-150" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Searches */}
        <div>
          <h2 className="text-[15px] sm:text-[16px] font-extrabold text-[#111936] tracking-tight mb-2.5">
            Popular Searches
          </h2>

          <div className="space-y-2">
            {POPULAR_SEARCHES.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  showToast(`Exploring ${item.city}...`);
                  if (onNavigate) onNavigate('map-detail');
                }}
                className="w-full p-2 rounded-2xl bg-white border border-[#e4e8f7] shadow-[0_2px_8px_rgba(50,70,140,0.03)] flex items-center justify-between gap-3 hover:border-indigo-200 transition-all cursor-pointer group"
              >
                {/* Thumbnail */}
                <img
                  src={item.img}
                  alt={item.city}
                  className="w-[70px] h-[50px] sm:w-[76px] sm:h-[54px] object-cover rounded-xl shrink-0 pointer-events-none"
                />

                {/* Info */}
                <div className="flex-1 min-w-0 pr-1 text-left">
                  <h3 className="text-[14px] font-bold text-[#111936] tracking-tight group-hover:text-[#544ee5] transition-colors">
                    {item.city}
                  </h3>
                  <p className="text-[11.5px] text-[#717ea1] truncate">
                    {item.description}
                  </p>
                </div>

                {/* Chevron */}
                <ChevronRight className="w-4 h-4 text-[#717ea1] group-hover:text-[#544ee5] transition-colors shrink-0 mr-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Trending Maps */}
        <div>
          <div className="flex items-center justify-between mb-2.5">
            <h2 className="text-[15px] sm:text-[16px] font-extrabold text-[#111936] tracking-tight">
              Trending Maps
            </h2>
            <button
              onClick={() => showToast("Viewing trending maps")}
              className="text-[#544ee5] hover:text-[#423bcb] font-bold text-[12.5px] cursor-pointer"
            >
              See All &gt;
            </button>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
            {trendingMaps.map((map) => (
              <div
                key={map.id}
                onClick={() => {
                  showToast(`Opening map: ${map.title}`);
                  if (onNavigate) onNavigate('map-detail');
                }}
                className="w-[145px] sm:w-[155px] p-2 rounded-2xl bg-white border border-[#e4e8f7] shadow-[0_2px_8px_rgba(50,70,140,0.03)] flex flex-col shrink-0 hover:border-indigo-200 transition-all cursor-pointer group"
              >
                {/* Image Container with Badge */}
                <div className="relative w-full h-[95px] rounded-xl overflow-hidden mb-2">
                  <img
                    src={map.img}
                    alt={map.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none"
                  />
                  <button
                    onClick={(e) => toggleTrendingBookmark(map.id, e)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#111936] hover:bg-white active:scale-95 transition-all shadow-xs cursor-pointer"
                  >
                    {map.liked ? (
                      <Heart className="w-3.5 h-3.5 fill-[#ff4a73] text-[#ff4a73]" />
                    ) : (
                      <Bookmark
                        className={`w-3.5 h-3.5 ${
                          map.saved ? 'fill-[#544ee5] text-[#544ee5]' : 'text-[#111936]'
                        }`}
                      />
                    )}
                  </button>
                </div>

                {/* Details */}
                <h3 className="font-bold text-[12.5px] text-[#111936] tracking-tight truncate mb-1 text-left">
                  {map.title}
                </h3>
                <div className="flex items-center gap-1.5 text-[10.5px] text-[#717ea1] font-medium text-left">
                  <MapPin className="w-3 h-3 text-[#717ea1] shrink-0" />
                  <span>{map.places}</span>
                  <span>&bull;</span>
                  <span>{map.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-end justify-center p-3 animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl space-y-4 border border-indigo-50">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-[16px] text-[#111936]">Filter Results</h3>
              <button
                onClick={() => setShowFilterModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block">Category</span>
              <div className="flex flex-wrap gap-2">
                {['All', 'Cafés', 'Museums', 'Hidden Gems', 'Budget'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat.toLowerCase())}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      activeFilter === cat.toLowerCase()
                        ? 'bg-[#544ee5] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                showToast(`Filter applied: ${activeFilter}`);
                setShowFilterModal(false);
              }}
              className="w-full py-2.5 bg-[#544ee5] text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-200 transition-all cursor-pointer"
            >
              Apply Filters
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

      {/* Bottom Sticky Navigation Bar */}
      <div className="w-full bg-white/95 backdrop-blur-md border-t border-[#e8ecf8] pt-2 pb-3 sm:pb-2.5 px-6 flex items-center justify-between z-30 shrink-0">
        <button
          onClick={() => onNavigate && onNavigate('explore')}
          className="flex flex-col items-center gap-0.5 text-[#544ee5] cursor-pointer"
        >
          <Home className="w-5 h-5 stroke-[2.3]" />
          <span className="text-[10px] font-bold">Explore</span>
        </button>

        <button
          onClick={() => showToast("Opening My Saved Maps...")}
          className="flex flex-col items-center gap-0.5 text-[#919bb8] hover:text-[#111936] transition-colors cursor-pointer"
        >
          <Map className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-semibold">My Maps</span>
        </button>

        <button
          onClick={() => onNavigate && onNavigate('create')}
          className="w-10 h-10 rounded-full bg-[#544ee5] text-white flex items-center justify-center -mt-4 shadow-[0_4px_14px_rgba(84,78,229,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
        >
          <Plus className="w-5 h-5 stroke-[2.8]" />
        </button>

        <button
          onClick={() => onNavigate && onNavigate('creators')}
          className="flex flex-col items-center gap-0.5 text-[#919bb8] hover:text-[#111936] transition-colors cursor-pointer"
        >
          <Users className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-semibold">Creators</span>
        </button>

        <button
          onClick={() => onNavigate && onNavigate('user-profile')}
          className="flex flex-col items-center gap-0.5 text-[#919bb8] hover:text-[#111936] transition-colors cursor-pointer"
        >
          <User className="w-5 h-5 stroke-[2]" />
          <span className="text-[10px] font-semibold">Profile</span>
        </button>
      </div>
    </div>
  );
}
