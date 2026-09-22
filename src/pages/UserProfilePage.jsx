import React, { useState } from 'react';
import {
  Settings,
  Camera,
  Pencil,
  MapPin,
  Mail,
  Globe,
  Map as MapIcon,
  Users,
  Heart,
  MoreHorizontal,
  Eye,
  Home,
  Plus,
  User,
  Check,
  CheckCircle2,
  Folder,
  X
} from 'lucide-react';

const INITIAL_MAPS = [
  {
    id: 'paris-cafes',
    title: 'Best 5 Cafés in Paris',
    places: '5 places',
    duration: '1-2 days',
    description: 'Iconic cafés, cozy corners and local favorites.',
    views: '12.4K',
    likesCount: 2400,
    likesDisplay: '2.4K',
    isLiked: true,
    img: '/c14-paris.png',
  },
  {
    id: 'japan-food',
    title: 'Japan Street Food',
    places: '10 places',
    duration: '3 days',
    description: "A delicious journey through Tokyo's local food spots.",
    views: '8.2K',
    likesCount: 1700,
    likesDisplay: '1.7K',
    isLiked: false,
    img: '/c14-tokyo.png',
  },
  {
    id: 'rome-museums',
    title: 'Top Museums in Rome',
    places: '7 places',
    duration: '2-3 days',
    description: 'Art, history and must-see highlights.',
    views: '6.9K',
    likesCount: 1300,
    likesDisplay: '1.3K',
    isLiked: false,
    img: '/c14-rome.png',
  },
  {
    id: 'greece-gems',
    title: 'Hidden Gems of Greece',
    places: '12 places',
    duration: '4 days',
    description: 'Secluded beaches, charming towns and more.',
    views: '15.1K',
    likesCount: 3100,
    likesDisplay: '3.1K',
    isLiked: false,
    img: '/c14-greece.png',
  },
];

export default function UserProfilePage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('my-maps');
  const [maps, setMaps] = useState(INITIAL_MAPS);
  const [toastMessage, setToastMessage] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Profile editable info
  const [profileData, setProfileData] = useState({
    name: 'Alex Parker',
    headline: 'Adventure & Travel Creator',
    location: 'Lisbon, Portugal',
    email: 'alex.parker@gmail.com',
    bioLine1: 'Exploring the world one map at a time 🌍',
    bioLine2: 'Sharing curated travel maps, hidden gems and unforgettable experiences.',
  });

  const [editForm, setEditForm] = useState(profileData);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const toggleMapLike = (mapId, title) => {
    setMaps((prev) =>
      prev.map((m) => {
        if (m.id === mapId) {
          const next = !m.isLiked;
          const newCount = next ? m.likesCount + 1 : m.likesCount - 1;
          const display = (newCount / 1000).toFixed(1) + 'K';
          showToast(next ? `Added "${title}" to your favorites` : `Removed from favorites`);
          return {
            ...m,
            isLiked: next,
            likesCount: newCount,
            likesDisplay: display,
          };
        }
        return m;
      })
    );
  };

  const saveProfileEdits = (e) => {
    e.preventDefault();
    setProfileData(editForm);
    setIsEditingProfile(false);
    showToast('Profile updated successfully!');
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#fafbfe] sm:rounded-[44px] flex flex-col justify-between">
      {/* Scrollable Profile Content */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y pb-36 scrollbar-none">
        {/* Top Header & Status Bar Area */}
        <div className="pt-3 sm:pt-4 px-6 shrink-0 bg-[#fafbfe]/95 backdrop-blur-md">
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

          {/* Profile Title & Settings Icon */}
          <div className="flex items-center justify-between py-1">
            <div>
              <h1 className="text-[25px] sm:text-[27px] font-black text-[#0f1738] tracking-tight leading-none">
                Profile
              </h1>
              <p className="text-[12px] sm:text-[12.5px] text-[#717ea1] font-medium mt-1">
                Your travel journey, all in one place
              </p>
            </div>

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#111936] hover:bg-[#edf0fd] active:scale-95 transition-all cursor-pointer"
              title="Settings"
            >
              <Settings className="w-6 h-6 stroke-[2]" />
            </button>
          </div>
        </div>

        {/* Cover Landscape Banner Container using exact c14-cover-banner.png */}
        <div className="px-5 sm:px-6 pt-3 relative">
          <div className="relative w-full aspect-[769/272] rounded-[24px] sm:rounded-[26px] overflow-hidden shadow-xs border border-slate-100">
            <img
              src="/c14-cover-banner.png"
              alt="Alex Parker Cover - Explore Create Inspire"
              className="w-full h-full object-cover pointer-events-none"
            />

            {/* Clickable Hitbox: Edit Cover */}
            <button
              onClick={() => showToast('Choose photo to update cover panorama')}
              className="absolute bottom-[4.5%] right-[2.5%] w-[27%] h-[18%] rounded-full cursor-pointer hover:bg-black/10 active:scale-95 transition-all z-20"
              title="Edit Cover"
            />

            {/* Clickable Hitbox: Edit Avatar */}
            <button
              onClick={() => showToast('Update profile photo')}
              className="absolute bottom-[4%] left-[23%] w-[8%] aspect-square rounded-full cursor-pointer hover:bg-black/10 active:scale-95 transition-all z-20"
              title="Edit profile photo"
            />
          </div>
        </div>

        {/* Profile Info Container below avatar */}
        <div className="px-5 sm:px-6 pt-2 relative z-10 space-y-3">
          {/* Identity & Edit Profile Button Row */}
          <div className="flex items-center justify-between pt-0.5">
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-[19px] sm:text-[21px] font-black text-[#0f1738] tracking-tight">
                  {profileData.name}
                </h2>
                {/* Blue Verified Badge */}
                <div className="w-4 h-4 rounded-full bg-[#3b82f6] text-white flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              </div>
              <p className="text-[12.5px] sm:text-[13px] text-[#717ea1] font-medium leading-tight mt-0.5">
                {profileData.headline}
              </p>
            </div>

            {/* Edit Profile Button */}
            <button
              onClick={() => {
                setEditForm(profileData);
                setIsEditingProfile(true);
              }}
              className="px-4 py-1.5 rounded-xl bg-[#edf0fd] hover:bg-[#e2e7f8] text-[#544ee5] font-bold text-[12.5px] tracking-tight transition-all active:scale-95 cursor-pointer shadow-xs"
            >
              Edit Profile
            </button>
          </div>

          {/* Location, Email & Social Icons Row */}
          <div className="flex items-center justify-between text-[11.5px] text-[#717ea1] font-medium pt-0.5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#717ea1] shrink-0" />
                <span>{profileData.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#717ea1] shrink-0" />
                <span className="truncate max-w-[130px]">{profileData.email}</span>
              </div>
            </div>

            {/* Social Icons (Instagram, YouTube, X / Twitter, Globe) */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Instagram */}
              <button
                onClick={() => showToast('Instagram: @alex.parker')}
                className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#feda75] via-[#fa7e1e] via-[#d62976] to-[#962fbf] p-[1.5px] shadow-xs active:scale-95 transition-transform"
                title="Instagram"
              >
                <div className="w-full h-full bg-white rounded-[5px] flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full border-[1.5px] border-[#d62976]" />
                </div>
              </button>

              {/* YouTube */}
              <button
                onClick={() => showToast('YouTube: Alex Parker Travel')}
                className="w-6 h-6 rounded-lg bg-[#ff0000] flex items-center justify-center shadow-xs active:scale-95 transition-transform"
                title="YouTube"
              >
                <div className="w-0 h-0 border-y-[3.5px] border-y-transparent border-l-[6px] border-l-white ml-0.5" />
              </button>

              {/* X / Twitter */}
              <button
                onClick={() => showToast('X: @alexparker')}
                className="w-6 h-6 rounded-lg bg-black text-white flex items-center justify-center shadow-xs active:scale-95 transition-transform"
                title="X (Twitter)"
              >
                <svg className="w-3 h-3 fill-white" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </button>

              {/* Globe */}
              <button
                onClick={() => showToast('Website: https://alexparker.travel')}
                className="w-6 h-6 rounded-lg bg-[#edf0fd] hover:bg-[#e2e7f8] text-[#544ee5] flex items-center justify-center shadow-xs active:scale-95 transition-transform"
                title="Website"
              >
                <Globe className="w-3.5 h-3.5 stroke-[2]" />
              </button>
            </div>
          </div>

          {/* Bio Lines */}
          <div className="text-[12px] sm:text-[12.5px] text-[#556488] font-medium leading-snug space-y-0.5">
            <p>{profileData.bioLine1}</p>
            <p>{profileData.bioLine2}</p>
          </div>

          {/* 4 Stats Cards Grid */}
          <div className="grid grid-cols-4 gap-2 pt-1">
            {/* Maps */}
            <div className="bg-[#f4f6fc] rounded-2xl p-2.5 flex items-center gap-2 border border-[#e8ecf8]">
              <div className="text-[#544ee5] shrink-0">
                <MapIcon className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-black text-[#0f1738] leading-none">5</span>
                <span className="text-[10px] text-[#717ea1] font-semibold mt-0.5">Maps</span>
              </div>
            </div>

            {/* Following */}
            <div className="bg-[#f4f6fc] rounded-2xl p-2.5 flex items-center gap-2 border border-[#e8ecf8]">
              <div className="text-[#544ee5] shrink-0">
                <Users className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-black text-[#0f1738] leading-none">28</span>
                <span className="text-[10px] text-[#717ea1] font-semibold mt-0.5">Following</span>
              </div>
            </div>

            {/* Followers */}
            <div className="bg-[#f4f6fc] rounded-2xl p-2.5 flex items-center gap-2 border border-[#e8ecf8]">
              <div className="text-[#544ee5] shrink-0">
                <Users className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-black text-[#0f1738] leading-none">12.4K</span>
                <span className="text-[10px] text-[#717ea1] font-semibold mt-0.5">Followers</span>
              </div>
            </div>

            {/* Likes */}
            <div className="bg-[#f4f6fc] rounded-2xl p-2.5 flex items-center gap-2 border border-[#e8ecf8]">
              <div className="text-[#544ee5] shrink-0">
                <Heart className="w-5 h-5 fill-[#544ee5] text-[#544ee5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-black text-[#0f1738] leading-none">342</span>
                <span className="text-[10px] text-[#717ea1] font-semibold mt-0.5">Likes</span>
              </div>
            </div>
          </div>

          {/* Segmented Filter Pills */}
          <div className="grid grid-cols-4 gap-2 pt-1.5">
            <button
              onClick={() => setActiveTab('my-maps')}
              className={`py-2 rounded-xl text-[12.5px] font-bold text-center transition-all cursor-pointer ${
                activeTab === 'my-maps'
                  ? 'bg-[#544ee5] text-white shadow-xs'
                  : 'bg-[#f0f3fa] text-[#556488] hover:bg-[#e6ebf7]'
              }`}
            >
              My Maps
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`py-2 rounded-xl text-[12.5px] font-semibold text-center transition-all cursor-pointer ${
                activeTab === 'favorites'
                  ? 'bg-[#544ee5] text-white shadow-xs'
                  : 'bg-[#f0f3fa] text-[#556488] hover:bg-[#e6ebf7]'
              }`}
            >
              Favorites
            </button>
            <button
              onClick={() => setActiveTab('saved-places')}
              className={`py-2 rounded-xl text-[12.5px] font-semibold text-center transition-all cursor-pointer ${
                activeTab === 'saved-places'
                  ? 'bg-[#544ee5] text-white shadow-xs'
                  : 'bg-[#f0f3fa] text-[#556488] hover:bg-[#e6ebf7]'
              }`}
            >
              Saved Places
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`py-2 rounded-xl text-[12.5px] font-semibold text-center transition-all cursor-pointer ${
                activeTab === 'activity'
                  ? 'bg-[#544ee5] text-white shadow-xs'
                  : 'bg-[#f0f3fa] text-[#556488] hover:bg-[#e6ebf7]'
              }`}
            >
              Activity
            </button>
          </div>

          {/* Maps List / Feed */}
          {activeTab === 'my-maps' && (
            <div className="space-y-3 pt-1">
              {maps.map((map) => (
                <div
                  key={map.id}
                  className="w-full bg-white rounded-[22px] sm:rounded-[24px] border border-[#e4e8f7] p-3 shadow-[0_2px_10px_rgba(50,70,140,0.03)] hover:border-slate-300 transition-all flex gap-3 items-center"
                >
                  {/* Left Thumbnail with Heart Badge */}
                  <div className="relative w-28 h-24 sm:w-32 sm:h-26 rounded-2xl overflow-hidden shadow-xs shrink-0">
                    <img
                      src={map.img}
                      alt={map.title}
                      className="w-full h-full object-cover pointer-events-none"
                    />

                    {/* Floating Heart Button */}
                    <button
                      type="button"
                      onClick={() => toggleMapLike(map.id, map.title)}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/95 backdrop-blur-md shadow-sm flex items-center justify-center text-[#111936] hover:bg-white active:scale-90 transition-all cursor-pointer z-10"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 transition-colors ${
                          map.isLiked ? 'fill-[#544ee5] text-[#544ee5]' : 'text-[#111936]'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Right Details Column */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    {/* Title and More Icon */}
                    <div className="flex items-start justify-between gap-1">
                      <h3
                        onClick={() => onNavigate && onNavigate('map-detail')}
                        className="text-[14px] sm:text-[14.5px] font-bold text-[#0f1738] tracking-tight truncate leading-snug cursor-pointer hover:text-[#544ee5] transition-colors"
                      >
                        {map.title}
                      </h3>
                      <button
                        onClick={() => showToast(`Options for ${map.title}`)}
                        className="text-[#9aa5c4] hover:text-[#0f1738] p-0.5 -mr-1 cursor-pointer"
                      >
                        <MoreHorizontal className="w-4 h-4 stroke-[2]" />
                      </button>
                    </div>

                    {/* Places & Days Line */}
                    <div className="flex items-center gap-1.5 text-[11px] text-[#717ea1] font-medium mt-0.5">
                      <Folder className="w-3 h-3 text-[#717ea1] stroke-[2]" />
                      <span>{map.places}</span>
                      <span>&bull;</span>
                      <span>{map.duration}</span>
                    </div>

                    {/* Subtitle / Description */}
                    <p className="text-[11px] text-[#717ea1] truncate leading-tight mt-0.5">
                      {map.description}
                    </p>

                    {/* Bottom Row: Metrics & View Map Button */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2.5 text-[11px] text-[#717ea1] font-medium">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 stroke-[2]" />
                          <span>{map.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-3 h-3 stroke-[2]" />
                          <span>{map.likesDisplay}</span>
                        </div>
                      </div>

                      {/* View Map Action Pill */}
                      <button
                        onClick={() => onNavigate && onNavigate('map-detail')}
                        className="px-3.5 py-1.5 rounded-xl bg-[#edf0fd] hover:bg-[#e2e7f8] text-[#544ee5] font-bold text-[12px] tracking-tight transition-all active:scale-95 cursor-pointer shadow-2xs"
                      >
                        View Map
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Favorites Tab Content */}
          {activeTab === 'favorites' && (
            <div className="space-y-3 pt-1">
              {maps.filter((m) => m.isLiked).length === 0 ? (
                <div className="p-8 text-center bg-white rounded-2xl border border-slate-100 text-[#717ea1] text-xs">
                  No favorite maps yet. Tap the heart on any map to save it here!
                </div>
              ) : (
                maps
                  .filter((m) => m.isLiked)
                  .map((map) => (
                    <div
                      key={map.id}
                      className="w-full bg-white rounded-[22px] border border-[#e4e8f7] p-3 shadow-xs flex gap-3 items-center"
                    >
                      <div className="relative w-28 h-24 rounded-2xl overflow-hidden shadow-xs shrink-0">
                        <img src={map.img} alt={map.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[14px] font-bold text-[#0f1738] truncate">{map.title}</h3>
                        <p className="text-[11px] text-[#717ea1] mt-0.5">{map.places} &bull; {map.duration}</p>
                        <button
                          onClick={() => onNavigate && onNavigate('map-detail')}
                          className="mt-2 px-3 py-1 rounded-lg bg-[#544ee5] text-white text-xs font-bold"
                        >
                          View Map
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>
          )}

          {/* Saved Places Tab Content */}
          {activeTab === 'saved-places' && (
            <div className="p-6 bg-white rounded-2xl border border-[#e4e8f7] text-center space-y-2 text-xs text-[#717ea1]">
              <MapPin className="w-8 h-8 text-[#544ee5] mx-auto opacity-70" />
              <p className="font-bold text-[#0f1738] text-sm">34 Saved Locations</p>
              <p>Bookmarked cafes, scenic viewpoints, and museum spots across Lisbon, Paris and Rome.</p>
            </div>
          )}

          {/* Activity Tab Content */}
          {activeTab === 'activity' && (
            <div className="p-4 bg-white rounded-2xl border border-[#e4e8f7] text-xs text-[#717ea1] space-y-2">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span>Created "Best 5 Cafés in Paris"</span>
                <span className="text-[10px] text-slate-400">2d ago</span>
              </div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span>Earned "Top Creator" verified badge</span>
                <span className="text-[10px] text-slate-400">1w ago</span>
              </div>
              <div className="flex items-center justify-between">
                <span>12.4K milestone followers reached</span>
                <span className="text-[10px] text-slate-400">2w ago</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Floating Bottom Navigation Bar (5 Tabs) */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-[#e8ecf8] px-5 pt-2 pb-3 sm:pb-2.5 shadow-[0_-4px_20px_rgba(50,70,140,0.06)] flex items-center justify-between">
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
              else showToast('Create new map story...');
            }}
            className="w-13 h-13 rounded-full bg-[#544ee5] hover:bg-[#4842db] active:scale-95 text-white flex items-center justify-center shadow-lg shadow-indigo-300 transition-all cursor-pointer"
            title="Create"
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

        {/* Profile Tab (ACTIVE PURPLE IN c14.png!) */}
        <button
          onClick={() => showToast('You are on your profile')}
          className="flex flex-col items-center gap-1 text-[#544ee5] transition-all cursor-pointer"
        >
          <User className="w-5 h-5 fill-current" />
          <span className="text-[10.5px] font-bold">Profile</span>
        </button>
      </div>

      {/* Edit Profile Modal */}
      {isEditingProfile && (
        <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-5 w-full max-w-xs shadow-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-[#0f1738] text-[16px]">Edit Profile</h3>
              <button
                onClick={() => setIsEditingProfile(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={saveProfileEdits} className="space-y-2.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Name</label>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-indigo-500 text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Headline</label>
                <input
                  type="text"
                  value={editForm.headline}
                  onChange={(e) => setEditForm({ ...editForm, headline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-indigo-500 text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Location</label>
                <input
                  type="text"
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-indigo-500 text-slate-800"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Bio</label>
                <textarea
                  rows="2"
                  value={editForm.bioLine1}
                  onChange={(e) => setEditForm({ ...editForm, bioLine1: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-indigo-500 text-slate-800 resize-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(false)}
                  className="flex-1 py-2 rounded-xl bg-slate-100 font-bold text-slate-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#544ee5] font-bold text-white shadow-md shadow-indigo-200 cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="absolute inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-5 w-full max-w-xs shadow-2xl space-y-3.5 text-xs">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-[#0f1738] text-[16px]">Account Settings</h3>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
                <span className="font-semibold text-slate-700">Push Notifications</span>
                <input type="checkbox" defaultChecked className="toggle-checkbox accent-[#544ee5]" />
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
                <span className="font-semibold text-slate-700">Currency</span>
                <span className="text-[#544ee5] font-bold">USD ($)</span>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50">
                <span className="font-semibold text-slate-700">App Version</span>
                <span className="text-slate-400">v2.4.0</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsSettingsOpen(false);
                showToast('Signed out of Planitory');
                if (onNavigate) onNavigate('welcome');
              }}
              className="w-full py-2.5 rounded-xl bg-rose-50 text-rose-600 font-bold hover:bg-rose-100 transition-colors cursor-pointer"
            >
              Log Out
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
