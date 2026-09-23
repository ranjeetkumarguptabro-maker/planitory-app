import React, { useState, useEffect } from 'react';
import {
  Search,
  SlidersHorizontal,
  Bell,
  Heart,
  Bookmark,
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
  ChevronLeft,
  ChevronRight,
  Star,
} from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 'vienna-cafes',
    title: 'Best 5 Cafés in Vienna',
    tag: 'EXPLORE',
    subtitle: 'Elegant cafés, rich history and timeless atmosphere.',
    places: '5 places',
    duration: '1–2 days',
    price: '$11',
    scriptText: 'Coffee Culture Vienna ♡',
    img: '/hero-vienna-exact.png',
  },
  {
    id: 'rome-cafes',
    title: 'Best 5 Cafés in Rome',
    tag: 'EXPLORE',
    subtitle: 'Authentic espresso bars, artisan pastries & vibrant piazzas.',
    places: '5 places',
    duration: '1–2 days',
    price: '$9',
    scriptText: 'La Dolce Vita Rome ♡',
    img: '/d1.png',
  },
  {
    id: 'barcelona-cafes',
    title: 'Best 5 Cafés in Barcelona',
    tag: 'EXPLORE',
    subtitle: 'Sunny terrace spots, specialty coffee & Gothic Quarter vibes.',
    places: '5 places',
    duration: '1–2 days',
    price: '$8',
    scriptText: 'Gothic Quarter Gems ♡',
    img: '/d2.png',
  },
];

const CATEGORIES = [
  { id: 'cafes', name: 'Cafés', img: '/c6-cat-cafe.png', icon: '☕' },
  { id: 'museums', name: 'Museums', img: '/c6-cat-museum.png', icon: '🏛️' },
  { id: 'food', name: 'Food', img: '/c6-cat-food.png', icon: '🍝' },
  { id: 'nature', name: 'Nature', img: '/c6-cat-nature.png', icon: '🌲' },
  { id: 'culture', name: 'Culture', img: '/c6-cat-culture.png', icon: '🎭' },
];

const FEATURED_MAPS = [
  {
    id: 'paris-museums',
    title: 'Top 5 Museums in Paris',
    subtitle: 'Art, history and must-see highlights.',
    badge: 'Bestseller',
    badgeBg: 'bg-[#1b254b] text-white',
    thumbnail: '/thumb-paris-map.png',
    places: '5 places',
    duration: '1–2 days',
    creatorHandle: 'travelwithjulie',
    creatorAvatar: '/c6-traveler-sarah.png',
    rating: 4.9,
    reviewsCount: '320',
    price: '$9.99',
    category: 'museums',
    isBookmarked: false,
  },
  {
    id: 'rome-weekend',
    title: 'Rome in a Weekend',
    subtitle: 'Explore iconic places and hidden gems.',
    badge: 'New',
    badgeBg: 'bg-[#eeedff] text-[#544ee5]',
    thumbnail: '/thumb-rome-map.png',
    places: '7 places',
    duration: '2–3 days',
    creatorHandle: 'explorerchris',
    creatorAvatar: '/c6-traveler-jay.png',
    rating: 4.8,
    reviewsCount: '184',
    price: '$11.99',
    category: 'culture',
    isBookmarked: false,
  },
  {
    id: 'tokyo-gems',
    title: 'Tokyo Hidden Gems',
    subtitle: 'Off the beaten path, real local spots.',
    badge: "Editor's Pick",
    badgeBg: 'bg-[#6b62f6] text-white',
    thumbnail: '/thumb-tokyo-map.png',
    places: '6 places',
    duration: '1–2 days',
    creatorHandle: 'sarahmaps',
    creatorAvatar: '/c6-traveler-maya.png',
    rating: 4.9,
    reviewsCount: '267',
    price: '$8.99',
    category: 'culture',
    isBookmarked: false,
  },
];

const POPULAR_MAPS = [
  {
    id: 'paris-popular',
    title: 'Top 5 Museums in Paris',
    subtitle: 'Art, history and must-see highlights.',
    thumbnail: '/thumb-paris-map.png',
    places: '5 places',
    duration: '1–2 days',
    price: '$10',
    category: 'museums',
    isLiked: false,
  },
  {
    id: 'rome-popular',
    title: 'Rome in a Weekend',
    subtitle: 'Explore iconic places and hidden gems.',
    thumbnail: '/thumb-rome-map.png',
    places: '7 places',
    duration: '2–3 days',
    price: '$11.99',
    category: 'culture',
    isLiked: false,
  },
];

export default function ExplorePage({ onBack, onNavigate }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredMaps, setFeaturedMaps] = useState(FEATURED_MAPS);
  const [popularMaps, setPopularMaps] = useState(POPULAR_MAPS);
  const [activeTab, setActiveTab] = useState('explore');
  const [toastMessage, setToastMessage] = useState(null);

  // Hero carousel state
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  // Auto-advance hero slides every 3.5 seconds
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
      setCurrentHeroIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    } else if (diff < -45) {
      setCurrentHeroIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    }
    setTouchStartX(null);
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleBookmark = (id) => {
    setFeaturedMaps((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const next = !m.isBookmarked;
          showToast(next ? `Saved "${m.title}" to your bookmarks!` : `Removed from bookmarks`);
          return { ...m, isBookmarked: next };
        }
        return m;
      })
    );
  };

  const togglePopularLike = (id) => {
    setPopularMaps((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const next = !m.isLiked;
          showToast(next ? `Added "${m.title}" to favorites!` : `Removed from favorites`);
          return { ...m, isLiked: next };
        }
        return m;
      })
    );
  };

  // Filtered Featured Maps based on search query & selected category
  const filteredFeatured = featuredMaps.filter((m) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.creatorHandle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = !selectedCategory || m.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  // Filtered Popular Maps
  const filteredPopular = popularMaps.filter((m) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = !selectedCategory || m.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#fafbfe] sm:rounded-[44px] flex flex-col justify-between select-none">
      {/* ========================================================= */}
      {/* TOP HEADER & SEARCH BAR                                   */}
      {/* ========================================================= */}
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

        {/* Branding & Notifications Header */}
        <div className="flex items-center justify-between pb-2">
          <div className="flex flex-col">
            {/* Logo with Gradient 'A' Pin */}
            <div className="flex items-center">
              <span className="text-[22px] sm:text-[24px] font-black text-[#10173b] tracking-wider font-display">
                PL
              </span>
              <div className="relative flex items-center justify-center mx-[1px]">
                <span className="text-[22px] sm:text-[24px] font-black text-transparent bg-clip-text bg-gradient-to-b from-[#6961f6] to-[#5146e2] font-display">
                  A
                </span>
                <div className="absolute w-2 h-2 rounded-full bg-white shadow-xs top-[7px]" />
              </div>
              <span className="text-[22px] sm:text-[24px] font-black text-[#10173b] tracking-wider font-display">
                NITORY
              </span>
            </div>
            <span className="text-[12px] text-[#6b779a] font-medium tracking-tight -mt-0.5">
              Maps with stories. Trips with meaning.
            </span>
          </div>

          {/* Notification Bell with Red Badge */}
          <button
            onClick={() => (onNavigate ? onNavigate('notifications') : showToast('Opening notifications...'))}
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#12183a] hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-5 h-5 text-[#12183a]" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ff4a73] ring-2 ring-white" />
          </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="w-full h-[48px] rounded-2xl bg-white border border-[#e4e8f7] shadow-[0_2px_8px_rgba(50,70,140,0.03)] flex items-center px-3.5 gap-2.5 focus-within:border-[#544ee5] focus-within:ring-2 focus-within:ring-[#544ee5]/15 transition-all mb-2.5 hover:border-indigo-200">
          <Search className="w-4.5 h-4.5 text-[#717ea1] shrink-0" />
          <input
            type="text"
            placeholder="Search city, country or theme..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-[13.5px] font-medium text-[#111936] placeholder:text-[#7885a5] outline-none"
          />
          <button
            onClick={() => {
              if (onNavigate) onNavigate('search');
              else showToast('Filter options...');
            }}
            className="text-[#131b38] hover:text-[#544ee5] active:scale-95 transition-colors shrink-0 cursor-pointer"
            title="Filter search"
          >
            <SlidersHorizontal className="w-4.5 h-4.5" />
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MAIN SCROLLABLE FEED CONTENT                              */}
      {/* ========================================================= */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y px-5 sm:px-6 space-y-4 pb-28 scrollbar-none">
        {/* 1. Horizontal Category Buttons */}
        <div className="flex items-center justify-between gap-2 pt-1">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  const next = selectedCategory === cat.id ? null : cat.id;
                  setSelectedCategory(next);
                  showToast(next ? `Filtered by ${cat.name}` : `Showing all categories`);
                }}
                className={`flex-1 aspect-square max-w-[68px] rounded-2xl overflow-hidden hover:scale-105 active:scale-95 transition-all duration-150 shadow-[0_2px_8px_rgba(50,70,140,0.04)] cursor-pointer ${
                  isActive ? 'ring-3 ring-[#544ee5] scale-105' : ''
                }`}
              >
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover pointer-events-none"
                />
              </button>
            );
          })}
        </div>

        {/* 2. Featured Hero Carousel (Vienna, Rome, Barcelona) */}
        <div
          onMouseEnter={() => setIsHeroHovered(true)}
          onMouseLeave={() => setIsHeroHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full rounded-[24px] sm:rounded-[26px] overflow-hidden shadow-[0_8px_24px_rgba(50,70,140,0.12)] cursor-pointer group hover:shadow-xl transition-all duration-200 aspect-[16/9] bg-slate-900"
        >
          {/* Slides Track */}
          <div
            className="flex transition-transform duration-700 ease-out h-full w-full"
            style={{ transform: `translateX(-${currentHeroIndex * 100}%)` }}
          >
            {HERO_SLIDES.map((slide) => (
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

          {/* Left / Right Arrow Navigation Buttons on Desktop Hover */}
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

          {/* Interactive Indicator Pills matching reference mockup */}
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

        {/* ========================================================= */}
        {/* 3. FEATURED MAPS SECTION (MATCHING REFERENCE MOCKUP)      */}
        {/* ========================================================= */}
        <div className="w-full space-y-3 pt-1">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-[19px] sm:text-[20px] font-extrabold text-[#0f1738] tracking-tight">
              Featured Maps
            </h2>
            <button
              onClick={() => {
                if (onNavigate) onNavigate('search');
                else showToast('Viewing all featured maps');
              }}
              className="text-[#544ee5] hover:text-[#4139cf] font-bold text-[13px] tracking-tight cursor-pointer"
            >
              See All &gt;
            </button>
          </div>

          {/* Horizontal Scrollable Featured Cards List */}
          <div className="flex gap-3.5 overflow-x-auto scrollbar-none pb-2 pt-0.5 -mx-1 px-1">
            {filteredFeatured.map((card) => (
              <div
                key={card.id}
                className="w-[245px] sm:w-[260px] shrink-0 bg-white rounded-[24px] border border-[#e8ecf8] shadow-[0_4px_16px_rgba(50,70,140,0.06)] overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all"
              >
                {/* Top Thumbnail with Badge */}
                <div
                  onClick={() => {
                    if (onNavigate) onNavigate('map-detail');
                  }}
                  className="relative w-full h-[125px] overflow-hidden cursor-pointer"
                >
                  <img
                    src={card.thumbnail}
                    alt={card.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 pointer-events-none"
                  />
                  {/* Badge */}
                  <span
                    className={`absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10.5px] font-bold shadow-xs ${card.badgeBg}`}
                  >
                    {card.badge}
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      onClick={() => {
                        if (onNavigate) onNavigate('map-detail');
                      }}
                      className="text-[15px] font-extrabold text-[#0f1738] leading-snug tracking-tight truncate cursor-pointer hover:text-[#544ee5] transition-colors"
                    >
                      {card.title}
                    </h3>
                    <p className="text-[11.5px] text-[#717ea1] leading-tight mt-0.5 truncate font-medium">
                      {card.subtitle}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center gap-2 text-[11px] text-[#717ea1] font-semibold mt-1.5">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#717ea1]" />
                        {card.places}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-[#717ea1]" />
                        {card.duration}
                      </span>
                    </div>

                    {/* Creator Handle */}
                    <div
                      onClick={() => {
                        if (onNavigate) onNavigate('creator-profile');
                      }}
                      className="flex items-center gap-1.5 mt-2 cursor-pointer hover:opacity-85"
                    >
                      <img
                        src={card.creatorAvatar}
                        alt={card.creatorHandle}
                        className="w-5 h-5 rounded-full object-cover ring-1 ring-slate-100"
                      />
                      <span className="text-[11.5px] font-semibold text-[#556080]">
                        {card.creatorHandle}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Rating & Price */}
                  <div>
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                      <div className="flex items-center gap-1 text-[11.5px] font-bold text-amber-500">
                        <span>★ {card.rating}</span>
                        <span className="text-slate-400 font-normal">({card.reviewsCount})</span>
                      </div>
                      <span className="text-[14.5px] font-black text-[#0f1738]">
                        {card.price}
                      </span>
                    </div>

                    {/* Action Buttons: View Map + Bookmark */}
                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => {
                          showToast(`Opening ${card.title} map details...`);
                          if (onNavigate) onNavigate('map-detail');
                        }}
                        className="flex-1 py-2 rounded-xl bg-[#f0efff] hover:bg-[#544ee5] text-[#544ee5] hover:text-white font-bold text-[12px] transition-all cursor-pointer text-center"
                      >
                        View Map
                      </button>
                      <button
                        onClick={() => toggleBookmark(card.id)}
                        className="w-8 h-8 rounded-xl border border-slate-100 flex items-center justify-center text-[#717ea1] hover:text-[#544ee5] hover:bg-slate-50 transition-all cursor-pointer shrink-0"
                        title="Bookmark map"
                      >
                        <Bookmark
                          className={`w-4 h-4 ${
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
        {/* 4. POPULAR MAPS SECTION (MATCHING REFERENCE MOCKUP)        */}
        {/* ========================================================= */}
        <div className="w-full space-y-2.5 pt-1">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-[19px] sm:text-[20px] font-extrabold text-[#0f1738] tracking-tight">
              Popular Maps
            </h2>
            <button
              onClick={() => {
                if (onNavigate) onNavigate('search');
                else showToast('Viewing all popular maps');
              }}
              className="text-[#544ee5] hover:text-[#4139cf] font-bold text-[13px] tracking-tight cursor-pointer"
            >
              See All &gt;
            </button>
          </div>

          {/* List Cards */}
          <div className="space-y-2.5">
            {filteredPopular.map((map) => (
              <div
                key={map.id}
                onClick={() => {
                  showToast(`Opening "${map.title}" detail & checkout...`);
                  if (onNavigate) onNavigate('map-detail');
                }}
                className="w-full p-2.5 rounded-2xl bg-white border border-[#e4e8f7] shadow-[0_2px_8px_rgba(50,70,140,0.03)] flex items-center justify-between gap-3 hover:border-slate-300 transition-all cursor-pointer"
              >
                {/* Thumbnail */}
                <img
                  src={map.thumbnail}
                  alt={map.title}
                  className="w-[92px] h-[66px] sm:w-[98px] sm:h-[70px] object-cover rounded-xl shrink-0 pointer-events-none"
                />

                {/* Info */}
                <div className="flex-1 min-w-0 pr-1">
                  <h3 className="text-[14.5px] font-extrabold text-[#0f1738] tracking-tight truncate leading-snug hover:text-[#544ee5] transition-colors">
                    {map.title}
                  </h3>
                  <p className="text-[11.5px] text-[#717ea1] truncate leading-snug mb-1 font-medium">
                    {map.subtitle}
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] text-[#717ea1] font-semibold">
                    <MapPin className="w-3 h-3 text-[#717ea1] shrink-0" />
                    <span>{map.places}</span>
                    <span>&bull;</span>
                    <Clock className="w-3 h-3 text-[#717ea1] shrink-0" />
                    <span>{map.duration}</span>
                  </div>
                </div>

                {/* Favorite & Price */}
                <div className="flex flex-col items-end justify-between h-[66px] sm:h-[70px] shrink-0 py-0.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePopularLike(map.id);
                    }}
                    className="p-1 rounded-full hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <Heart
                      className={`w-4.5 h-4.5 transition-all ${
                        map.isLiked
                          ? 'fill-[#ff4a73] text-[#ff4a73] scale-110'
                          : 'text-[#8b95b5] hover:text-[#ff4a73]'
                      }`}
                    />
                  </button>
                  <span className="text-[15px] font-black text-[#0f1738]">
                    {map.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 5. FLOATING BOTTOM NAVIGATION BAR                         */}
      {/* ========================================================= */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#e8ecf8] px-6 pt-2 pb-3 sm:pb-2.5 shadow-[0_-4px_20px_rgba(50,70,140,0.06)] flex items-center justify-between">
        {/* Explore Tab */}
        <button
          onClick={() => setActiveTab('explore')}
          className={`flex flex-col items-center gap-1 transition-all cursor-pointer ${
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
            else showToast('Opening My Maps');
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
            else {
              setActiveTab('profile');
              showToast('Opening Profile');
            }
          }}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'profile' ? 'text-[#544ee5]' : 'text-[#717ea1] hover:text-[#111936]'
          } cursor-pointer`}
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
