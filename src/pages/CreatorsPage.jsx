import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  CheckCircle2,
  Home,
  Map as MapIcon,
  Plus,
  Users,
  User,
  Check,
  X
} from 'lucide-react';

const CATEGORIES = ['All', 'Travel', 'Food', 'Culture', 'Nature'];

const CREATORS = [
  {
    id: 'emma',
    name: 'Emma Wilson',
    role: 'Travel Creator',
    followers: '12.5K followers',
    mapsCount: '24 maps',
    bio: 'Exploring the world one café at a time ☕',
    avatar: '/c12-avatar-emma.png',
    category: 'Travel',
    photos: [
      { id: 'e1', img: '/c12-emma-1.png', title: 'Paris sunset' },
      { id: 'e2', img: '/c12-emma-2.png', title: 'Santorini cliffside' },
      { id: 'e3', img: '/c12-emma-3.png', title: 'Provence lavender' },
    ],
  },
  {
    id: 'alex',
    name: 'Alex Carter',
    role: 'Adventure Creator',
    followers: '28.4K followers',
    mapsCount: '36 maps',
    bio: 'Mountains, roads and stories ⛰️',
    avatar: '/c12-avatar-alex.png',
    category: 'Nature',
    photos: [
      { id: 'a1', img: '/c12-alex-1.png', title: 'Alpine peaks' },
      { id: 'a2', img: '/c12-alex-2.png', title: 'Mountain lake' },
      { id: 'a3', img: '/c12-alex-3.png', title: 'Forest trail' },
    ],
  },
  {
    id: 'sophie',
    name: 'Sophie Kim',
    role: 'Food & Travel Creator',
    followers: '18.7K followers',
    mapsCount: '29 maps',
    bio: 'Good food, great places, happier you 🥐',
    avatar: '/c12-avatar-sophie.png',
    category: 'Food',
    photos: [
      { id: 's1', img: '/c12-sophie-1.png', title: 'French pastry' },
      { id: 's2', img: '/c12-sophie-2.png', title: 'Italian pasta' },
      { id: 's3', img: '/c12-sophie-3.png', title: 'Old town walk' },
    ],
  },
];

export default function CreatorsPage({ onBack, onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [followingMap, setFollowingMap] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleFollow = (creatorId, name) => {
    setFollowingMap((prev) => {
      const next = !prev[creatorId];
      showToast(next ? `Now following ${name}!` : `Unfollowed ${name}`);
      return { ...prev, [creatorId]: next };
    });
  };

  const filteredCreators =
    activeCategory === 'All'
      ? CREATORS
      : CREATORS.filter((c) => c.category === activeCategory);

  return (
    <div className="relative w-full h-full min-h-[720px] max-h-[960px] aspect-[9/16] select-none overflow-hidden rounded-[32px] sm:rounded-[44px] shadow-2xl bg-[#fafbfe] flex flex-col justify-between">
      {/* Top Header & Status Bar Area */}
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

        {/* Title Bar & Search */}
        <div className="flex items-center justify-between py-1">
          <button
            onClick={onBack}
            className="w-9 h-9 -ml-2 rounded-full flex items-center justify-center text-[#111936] hover:bg-slate-100 active:scale-95 transition-all"
            title="Go back"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
          </button>

          <h1 className="text-[19px] sm:text-[20px] font-black text-[#0f1738] tracking-tight">
            Creators
          </h1>

          <button
            onClick={() => showToast("Search creators by name, city, or niche")}
            className="w-9 h-9 -mr-2 rounded-full flex items-center justify-center text-[#111936] hover:bg-slate-100 active:scale-95 transition-all"
            title="Search"
          >
            <Search className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* Tagline */}
        <p className="text-center text-[12px] sm:text-[12.5px] text-[#6b789e] leading-snug max-w-[270px] mx-auto pb-2">
          Travel inspiration from people who explore the world differently.
        </p>

        {/* Category Filter Pills Row */}
        <div className="flex items-center gap-2 py-1.5 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  showToast(`Category: ${cat}`);
                }}
                className={`px-4 py-1.5 rounded-full font-bold text-[12.5px] sm:text-[13px] transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#544ee5] text-white shadow-xs'
                    : 'bg-[#f0f2fb] text-[#64748b] hover:bg-[#e6e9f7]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Scrollable Creators List */}
      <div className="flex-1 overflow-y-auto px-5 sm:px-6 space-y-3.5 pt-2 pb-24 scrollbar-none">
        {filteredCreators.map((creator) => {
          const isFollowing = !!followingMap[creator.id];
          return (
            <div
              key={creator.id}
              className="w-full rounded-[24px] sm:rounded-[26px] bg-white border border-[#e4e8f7] shadow-[0_2px_12px_rgba(50,70,140,0.04)] p-4 space-y-3 hover:border-slate-300 transition-all"
            >
              {/* Creator Header Row */}
              <div className="flex items-center justify-between">
                {/* Left: Avatar & Info */}
                <div
                  onClick={() => {
                    if (onNavigate) onNavigate('creator-profile');
                  }}
                  className="flex items-center gap-3 cursor-pointer hover:opacity-85 transition-opacity"
                >
                  <div className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full overflow-hidden shadow-xs ring-2 ring-slate-100 shrink-0">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[14.5px] sm:text-[15px] font-bold text-[#0f1738] tracking-tight">
                        {creator.name}
                      </span>
                      {/* Blue verified badge */}
                      <div className="w-3.5 h-3.5 rounded-full bg-[#3b82f6] text-white flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                    </div>
                    <span className="text-[12px] text-[#717ea1] font-medium leading-tight">
                      {creator.role}
                    </span>
                    <span className="text-[11px] text-[#8e98b5] font-medium mt-0.5 leading-tight">
                      {creator.followers} &bull; {creator.mapsCount}
                    </span>
                  </div>
                </div>

                {/* Right: Follow Button */}
                <button
                  onClick={() => toggleFollow(creator.id, creator.name)}
                  className={`px-5 py-2 rounded-full font-bold text-[13px] transition-all cursor-pointer ${
                    isFollowing
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 shadow-xs'
                      : 'bg-[#edf0fd] hover:bg-[#e2e7f8] text-[#544ee5]'
                  } active:scale-95`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>

              {/* Bio Quote */}
              <p className="text-[12.5px] sm:text-[13px] font-medium text-[#111936] leading-snug pl-0.5">
                {creator.bio}
              </p>

              {/* 3 Photo Thumbnails Grid */}
              <div className="grid grid-cols-3 gap-2 pt-0.5">
                {creator.photos.map((photo) => (
                  <button
                    key={photo.id}
                    onClick={() => setPreviewImage(photo.img)}
                    className="aspect-[4/3] rounded-xl overflow-hidden shadow-xs hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                  >
                    <img
                      src={photo.img}
                      alt={photo.title}
                      className="w-full h-full object-cover pointer-events-none"
                    />
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Bottom Navigation Bar (5 Tabs) */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#e8ecf8] px-5 py-2 shadow-[0_-4px_20px_rgba(50,70,140,0.06)] flex items-center justify-between">
        {/* Explore Tab */}
        <button
          onClick={() => {
            if (onNavigate) onNavigate('explore');
          }}
          className="flex flex-col items-center gap-1 text-[#717ea1] hover:text-[#111936] transition-all cursor-pointer"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10.5px] font-semibold">Explore</span>
        </button>

        {/* My Maps Tab */}
        <button
          onClick={() => {
            if (onNavigate) onNavigate('purchased-map');
          }}
          className="flex flex-col items-center gap-1 text-[#717ea1] hover:text-[#111936] transition-all cursor-pointer"
        >
          <MapIcon className="w-5 h-5" />
          <span className="text-[10.5px] font-semibold">My Maps</span>
        </button>

        {/* Center Floating Action Button (+ Create) */}
        <div className="-mt-6 flex flex-col items-center">
          <button
            onClick={() => {
              if (onNavigate) onNavigate('create');
              else showToast("Create new map story...");
            }}
            className="w-13 h-13 rounded-full bg-[#544ee5] hover:bg-[#4842db] active:scale-95 text-white flex items-center justify-center shadow-lg shadow-indigo-300 transition-all cursor-pointer"
            title="Create"
          >
            <Plus className="w-7 h-7 stroke-[2.8]" />
          </button>
          <span className="text-[10.5px] font-bold text-[#544ee5] mt-0.5">Create</span>
        </div>

        {/* Creators Tab (ACTIVE in purple in c12.png!) */}
        <button
          onClick={() => showToast("You are viewing Creators")}
          className="flex flex-col items-center gap-1 text-[#544ee5] transition-all cursor-pointer"
        >
          <Users className="w-5 h-5 fill-current" />
          <span className="text-[10.5px] font-bold">Creators</span>
        </button>

        {/* Profile Tab */}
        <button
          onClick={() => {
            if (onNavigate) onNavigate('user-profile');
            else showToast("Opening Profile");
          }}
          className="flex flex-col items-center gap-1 text-[#717ea1] hover:text-[#111936] transition-all cursor-pointer"
        >
          <User className="w-5 h-5" />
          <span className="text-[10.5px] font-semibold">Profile</span>
        </button>
      </div>

      {/* Image Lightbox Preview */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          className="absolute inset-0 bg-black/85 z-50 flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-sm w-full rounded-2xl overflow-hidden shadow-2xl">
            <img src={previewImage} alt="Preview" className="w-full h-auto" />
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white"
            >
              <X className="w-5 h-5" />
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
