import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  MoreHorizontal,
  MapPin,
  Heart,
  Check,
  CheckCircle2
} from 'lucide-react';

const CREATOR_MAPS = [
  {
    id: 'paris-cafes',
    title: 'Best 5 Cafés in Paris',
    places: '5 places',
    duration: '1-2 days',
    price: '$10',
    img: '/c13-clean-cafes.png',
    isLiked: false,
  },
  {
    id: 'paris-night',
    title: 'Paris at Night',
    places: '8 places',
    duration: '2 days',
    price: '$9',
    img: '/c13-clean-night.png',
    isLiked: false,
  },
  {
    id: 'art-walk',
    title: 'Art & Culture Walk',
    places: '10 places',
    duration: '3 days',
    price: '$12',
    img: '/c13-clean-culture.png',
    isLiked: false,
  },
  {
    id: 'hidden-paris',
    title: 'Hidden Paris',
    places: '12 places',
    duration: '3 days',
    price: '$10',
    img: '/c13-clean-hidden.png',
    isLiked: false,
  },
];

export default function CreatorProfilePage({ onBack, onNavigate }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('maps');
  const [maps, setMaps] = useState(CREATOR_MAPS);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleLike = (mapId, title) => {
    setMaps((prev) =>
      prev.map((m) => {
        if (m.id === mapId) {
          const next = !m.isLiked;
          showToast(next ? `Saved "${title}" to favorites!` : `Removed from favorites`);
          return { ...m, isLiked: next };
        }
        return m;
      })
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Emma Wilson on Planitory',
        url: window.location.href,
      }).catch(() => {});
    } else {
      showToast("Profile link copied to clipboard!");
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#fafbfe] sm:rounded-[44px] flex flex-col justify-between">
      {/* Scrollable Profile Content */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y pb-16 scrollbar-none">
        {/* Cover Panorama Banner with Built-in Status Bar & Action Buttons */}
        <div className="relative w-full aspect-[908/305] overflow-hidden shrink-0">
          <img
            src="/c13-cover-top.png"
            alt="Emma Wilson Travel Cover"
            className="w-full h-full object-cover pointer-events-none"
          />

          {/* Interactive Click Target: Back Button (matching baked button in image) */}
          <button
            onClick={onBack}
            className="absolute left-[5.4%] top-[43.2%] w-[11%] aspect-square rounded-full cursor-pointer hover:bg-black/10 active:scale-90 transition-all z-20"
            title="Go back"
          />

          {/* Interactive Click Target: Share Button (matching baked button in image) */}
          <button
            onClick={handleShare}
            className="absolute right-[5.4%] top-[43.2%] w-[11%] aspect-square rounded-full cursor-pointer hover:bg-black/10 active:scale-90 transition-all z-20"
            title="Share profile"
          />
        </div>

        {/* Profile Card Container */}
        <div className="relative -mt-6 bg-white rounded-t-[32px] px-6 pt-0 pb-6 shadow-xs border-b border-slate-100 space-y-3.5">
          {/* Avatar & Main Identity Row */}
          <div className="flex items-end justify-between">
            {/* Avatar overlapping cover */}
            <div className="relative -mt-12 w-22 h-22 sm:w-24 sm:h-24 rounded-full overflow-hidden shadow-lg ring-4 ring-white bg-white shrink-0">
              <img
                src="/c7-creator-emma.png"
                alt="Emma Wilson"
                className="w-full h-full object-cover pointer-events-none"
              />
            </div>
          </div>

          {/* Name & Title */}
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-[21px] sm:text-[23px] font-black text-[#0f1738] tracking-tight">
                Emma Wilson
              </h1>
              {/* Blue Verified Badge */}
              <div className="w-4 h-4 rounded-full bg-[#3b82f6] text-white flex items-center justify-center shrink-0">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </div>
            </div>
            <p className="text-[13px] text-[#717ea1] font-medium leading-tight">
              Travel Creator
            </p>
          </div>

          {/* Stats & Follow Action Row */}
          <div className="flex items-center justify-between pt-1">
            {/* 3 Stats Columns */}
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="flex flex-col">
                <span className="text-[16px] font-black text-[#0f1738] leading-none">24</span>
                <span className="text-[11px] text-[#717ea1] font-medium mt-0.5">Maps</span>
              </div>
              <div className="w-[1px] h-6 bg-slate-200" />
              <div className="flex flex-col">
                <span className="text-[16px] font-black text-[#0f1738] leading-none">12.5K</span>
                <span className="text-[11px] text-[#717ea1] font-medium mt-0.5">Followers</span>
              </div>
              <div className="w-[1px] h-6 bg-slate-200" />
              <div className="flex flex-col">
                <span className="text-[16px] font-black text-[#0f1738] leading-none">312</span>
                <span className="text-[11px] text-[#717ea1] font-medium mt-0.5">Following</span>
              </div>
            </div>

            {/* Actions: Follow + Options */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const next = !isFollowing;
                  setIsFollowing(next);
                  showToast(next ? "Following Emma Wilson" : "Unfollowed");
                }}
                className={`px-6 py-2 rounded-xl font-bold text-[13.5px] transition-all cursor-pointer ${
                  isFollowing
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs'
                    : 'bg-[#544ee5] hover:bg-[#4842db] text-white shadow-md shadow-indigo-200'
                } active:scale-95`}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>

              <button
                onClick={() => showToast("Options: Mute, Block, Report, Copy Profile URL")}
                className="w-10 h-10 rounded-xl bg-[#edf0fd] hover:bg-[#e2e7f8] text-[#544ee5] flex items-center justify-center transition-colors cursor-pointer"
                title="More options"
              >
                <MoreHorizontal className="w-5 h-5 stroke-[2.2]" />
              </button>
            </div>
          </div>

          {/* Bio Description */}
          <div className="text-[12.5px] sm:text-[13px] text-[#111936] font-medium leading-relaxed space-y-0.5">
            <p>Exploring the world one café at a time ☕</p>
            <p className="text-[#64748b]">Sharing curated travel maps, hidden gems and local favorites.</p>
          </div>

          {/* Location & Social Icons Row */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5 text-[12px] text-[#717ea1] font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#717ea1] shrink-0" />
              <span>Paris, France</span>
            </div>

            {/* Social Icons (Instagram, YouTube, TikTok) */}
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <button
                onClick={() => showToast("Instagram: @emma.wilson.travels")}
                className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#feda75] via-[#fa7e1e] via-[#d62976] to-[#962fbf] p-[1.5px] shadow-xs active:scale-95 transition-transform"
                title="Instagram"
              >
                <div className="w-full h-full bg-white rounded-[6px] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#d62976]" />
                </div>
              </button>

              {/* YouTube */}
              <button
                onClick={() => showToast("YouTube: Emma Wilson Travel Vlogs")}
                className="w-6 h-6 rounded-lg bg-[#ff0000] flex items-center justify-center shadow-xs active:scale-95 transition-transform"
                title="YouTube"
              >
                <div className="w-0 h-0 border-y-[3.5px] border-y-transparent border-l-[6px] border-l-white ml-0.5" />
              </button>

              {/* TikTok */}
              <button
                onClick={() => showToast("TikTok: @emma_travels")}
                className="w-6 h-6 rounded-lg bg-black text-white flex items-center justify-center font-bold text-[10px] shadow-xs active:scale-95 transition-transform"
                title="TikTok"
              >
                ♪
              </button>
            </div>
          </div>
        </div>

        {/* Segmented Pill Tabs (Maps / About / Posts) */}
        <div className="px-5 sm:px-6 pt-3">
          <div className="w-full bg-[#f0f2fb] p-1 rounded-2xl flex items-center justify-between text-[13px]">
            <button
              onClick={() => setActiveTab('maps')}
              className={`flex-1 py-1.5 rounded-xl font-bold transition-all text-center cursor-pointer ${
                activeTab === 'maps'
                  ? 'bg-white text-[#544ee5] shadow-xs'
                  : 'text-[#717ea1] hover:text-[#111936]'
              }`}
            >
              Maps (24)
            </button>

            <button
              onClick={() => setActiveTab('about')}
              className={`flex-1 py-1.5 rounded-xl font-semibold transition-all text-center cursor-pointer ${
                activeTab === 'about'
                  ? 'bg-white text-[#544ee5] shadow-xs'
                  : 'text-[#717ea1] hover:text-[#111936]'
              }`}
            >
              About
            </button>

            <button
              onClick={() => setActiveTab('posts')}
              className={`flex-1 py-1.5 rounded-xl font-semibold transition-all text-center cursor-pointer ${
                activeTab === 'posts'
                  ? 'bg-white text-[#544ee5] shadow-xs'
                  : 'text-[#717ea1] hover:text-[#111936]'
              }`}
            >
              Posts
            </button>
          </div>
        </div>

        {/* Tab Content: Maps (2x2 Grid) */}
        {activeTab === 'maps' && (
          <div className="px-5 sm:px-6 pt-3">
            <div className="grid grid-cols-2 gap-3">
              {maps.map((map) => (
                <div
                  key={map.id}
                  onClick={() => {
                    if (onNavigate) {
                      onNavigate('map-detail');
                    } else {
                      showToast(`Opening: ${map.title}`);
                    }
                  }}
                  className="rounded-2xl bg-white border border-[#e4e8f7] overflow-hidden shadow-[0_2px_8px_rgba(50,70,140,0.04)] hover:border-slate-300 transition-all cursor-pointer group"
                >
                  {/* Clean Thumbnail with no cut text */}
                  <div className="relative aspect-[394/207] overflow-hidden">
                    <img
                      src={map.img}
                      alt={map.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none"
                    />

                    {/* Interactive Heart Button aligned over baked circle */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(map.id, map.title);
                      }}
                      className="absolute top-1.5 right-1.5 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer active:scale-90 transition-transform"
                      title="Favorite"
                    >
                      {map.isLiked && (
                        <Heart className="w-4 h-4 fill-[#ff4a73] text-[#ff4a73] animate-in zoom-in-50 duration-150" />
                      )}
                    </button>
                  </div>

                  {/* Card Info */}
                  <div className="p-2.5">
                    <h3 className="text-[13px] font-bold text-[#0f1738] tracking-tight truncate leading-snug">
                      {map.title}
                    </h3>
                    <p className="text-[11px] text-[#717ea1] leading-tight mt-0.5">
                      {map.places} &bull; {map.duration}
                    </p>
                    <span className="text-[14px] font-black text-[#0f1738] block mt-1.5">
                      {map.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab Content: About */}
        {activeTab === 'about' && (
          <div className="px-5 sm:px-6 pt-3">
            <div className="p-4 rounded-2xl bg-white border border-slate-100 text-xs space-y-2 text-[#51617e]">
              <h3 className="font-bold text-[#0f1738] text-sm">About Emma</h3>
              <p className="leading-relaxed">
                Hi! I’m Emma, a Parisian photographer and travel author. For the last 6 years, I’ve mapped over 200 secret courtyards, third-wave coffee shops, and scenic viewpoints across Europe.
              </p>
              <p className="leading-relaxed">
                All maps are updated quarterly with fresh spots and offline GPS walking directions.
              </p>
            </div>
          </div>
        )}

        {/* Tab Content: Posts */}
        {activeTab === 'posts' && (
          <div className="px-5 sm:px-6 pt-3">
            <div className="p-4 rounded-2xl bg-white border border-slate-100 text-xs text-center text-slate-500 py-8">
              <span>No new photo posts this week &bull; Check back soon!</span>
            </div>
          </div>
        )}
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
