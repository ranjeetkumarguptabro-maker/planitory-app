import React, { useState, useEffect } from 'react';
import {
  Settings,
  Camera,
  Pencil,
  MapPin,
  Map as MapIcon,
  Heart,
  MoreHorizontal,
  Home,
  Plus,
  Users,
  User,
  CheckCircle2,
  X
} from 'lucide-react';
import { getCreatedMaps } from '../services/supabase';

const INITIAL_MAPS = [
  {
    id: 'paris-cafes',
    title: 'Best 5 Cafés in Paris',
    places: '5 places',
    description: 'Iconic cafés, cozy corners and local favorites...',
    img: '/c31-map-paris.png',
  },
  {
    id: 'japan-food',
    title: 'Japan Street Food',
    places: '10 places',
    description: "A delicious journey through Tokyo's local food...",
    img: '/c31-map-japan.png',
  },
];

export default function UserProfilePage({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('my-maps');
  const [maps, setMaps] = useState(INITIAL_MAPS);
  const [toastMessage, setToastMessage] = useState(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Profile editable info matching c31.png
  const [profileData, setProfileData] = useState({
    name: 'Alex Parker',
    headline: 'Travel Creator',
    location: 'Lisbon, Portugal',
    bio: 'Exploring the world one map at a time 🌍',
    mapsCount: 2,
    likesCount: 342,
  });

  const [editForm, setEditForm] = useState(profileData);

  // Load created maps from Supabase / localStorage
  useEffect(() => {
    const loadMaps = async () => {
      try {
        const created = await getCreatedMaps();
        if (created && created.length > 0) {
          const mapList = [
            ...created,
            ...INITIAL_MAPS.filter((im) => !created.some((cm) => cm.id === im.id)),
          ];
          setMaps(mapList);
          setProfileData((prev) => ({
            ...prev,
            mapsCount: mapList.length,
          }));
        }
      } catch (e) {}
    };

    loadMaps();

    const handleCreated = (e) => {
      if (e.detail) {
        const newMap = {
          id: e.detail.id,
          title: e.detail.title,
          description: e.detail.description || 'Custom curated map',
          places: `${e.detail.places_count || e.detail.places?.length || 6} places`,
          img: e.detail.cover_image || '/c31-map-paris.png',
        };
        setMaps((prev) => [newMap, ...prev.filter((m) => m.id !== newMap.id)]);
        setProfileData((prev) => ({
          ...prev,
          mapsCount: prev.mapsCount + 1,
        }));
      }
    };

    window.addEventListener('planitory_map_created', handleCreated);
    return () => window.removeEventListener('planitory_map_created', handleCreated);
  }, []);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const saveProfileEdits = (e) => {
    e.preventDefault();
    setProfileData(editForm);
    setIsEditingProfile(false);
    showToast('Profile updated successfully!');
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-white sm:rounded-[44px] flex flex-col justify-between">
      {/* Scrollable Profile Content */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y pb-28 scrollbar-none">
        {/* Top Header & Status Bar Area (matching c31.png) */}
        <div className="pt-3 sm:pt-4 px-6 shrink-0 bg-white">
          {/* Mock iOS Status Bar */}
          <div className="flex items-center justify-between text-xs font-semibold text-[#0f1738] mb-2 px-0.5">
            <span className="text-[14px] tracking-tight font-bold">9:41</span>
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
          <div className="flex items-start justify-between pt-1 pb-2">
            <div>
              <h1 className="text-[28px] sm:text-[30px] font-black text-[#0f1738] tracking-tight leading-none">
                Profile
              </h1>
              <p className="text-[13px] text-[#717ea1] font-medium mt-1.5">
                Share your maps and travel inspiration.
              </p>
            </div>

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="w-10 h-10 -mr-1 flex items-center justify-center text-[#0f1738] hover:bg-slate-100 rounded-full active:scale-95 transition-all cursor-pointer"
              title="Settings"
            >
              <Settings className="w-6 h-6 stroke-[1.8]" />
            </button>
          </div>
        </div>

        {/* Cover Landscape Banner Container using exact c31-cover-full.png */}
        <div className="px-5 sm:px-6 pt-1 relative">
          <div className="relative w-full aspect-[874/295] rounded-[24px] overflow-hidden">
            <img
              src="/c31-cover-full.png"
              alt="Alex Parker Cover and Avatar"
              className="w-full h-full object-cover pointer-events-none"
            />

            {/* Clickable Hitbox: Edit Cover (bottom-right of cover) */}
            <button
              onClick={() => showToast('Edit cover photo')}
              className="absolute bottom-[8%] right-[3.5%] w-[33%] h-[24%] rounded-full cursor-pointer hover:bg-black/10 active:scale-95 transition-all z-20"
              title="Edit Cover"
            />

            {/* Clickable Hitbox: Edit Profile Photo (purple pencil circle on avatar) */}
            <button
              onClick={() => showToast('Update profile photo')}
              className="absolute bottom-[2%] left-[21%] w-[9%] aspect-square rounded-full cursor-pointer hover:bg-white/20 active:scale-95 transition-all z-20"
              title="Update profile photo"
            />
          </div>
        </div>

        {/* Profile Info Row: Alex Parker + Edit Profile Button (matching c31.png) */}
        <div className="px-5 sm:px-6 pt-3 relative z-10 space-y-2.5">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-[22px] sm:text-[24px] font-black text-[#0f1738] tracking-tight leading-none">
                {profileData.name}
              </h2>
              <p className="text-[13.5px] text-[#717ea1] font-semibold mt-1">
                {profileData.headline}
              </p>
            </div>

            {/* Edit Profile Button */}
            <button
              onClick={() => {
                setEditForm(profileData);
                setIsEditingProfile(true);
              }}
              className="px-4 py-1.5 rounded-full bg-[#f0f3ff] hover:bg-[#e4e9ff] text-[#544ee5] font-bold text-[12.5px] tracking-tight transition-all active:scale-95 cursor-pointer"
            >
              Edit Profile
            </button>
          </div>

          {/* Location Line */}
          <div className="flex items-center gap-1 text-[13px] text-[#717ea1] font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#717ea1] stroke-[2]" />
            <span>{profileData.location}</span>
          </div>

          {/* Bio Line */}
          <p className="text-[13px] text-[#556488] font-medium leading-tight">
            {profileData.bio}
          </p>

          {/* Stats Box (5 Maps | 342 Likes matching c31.png) */}
          <div className="bg-white rounded-[20px] border border-slate-200/80 p-3.5 shadow-xs grid grid-cols-2 divide-x divide-slate-100 my-2">
            {/* Left Stat: Maps */}
            <div className="flex flex-col items-center justify-center text-center">
              <MapIcon className="w-5 h-5 text-[#544ee5] stroke-[2.2] mb-1" />
              <span className="text-[18px] font-black text-[#0f1738] leading-tight">
                {profileData.mapsCount}
              </span>
              <span className="text-[12px] text-[#717ea1] font-semibold mt-0.5">
                Maps
              </span>
            </div>

            {/* Right Stat: Likes */}
            <div className="flex flex-col items-center justify-center text-center">
              <Heart className="w-5 h-5 fill-[#544ee5] text-[#544ee5] mb-1" />
              <span className="text-[18px] font-black text-[#0f1738] leading-tight">
                {profileData.likesCount}
              </span>
              <span className="text-[12px] text-[#717ea1] font-semibold mt-0.5">
                Likes
              </span>
            </div>
          </div>

          {/* 3 Tab Filter Pills (My Maps / Favorites / Saved Places) */}
          <div className="grid grid-cols-3 gap-2.5 pt-1">
            <button
              onClick={() => setActiveTab('my-maps')}
              className={`py-2.5 rounded-full text-[13px] font-bold text-center transition-all cursor-pointer ${
                activeTab === 'my-maps'
                  ? 'bg-[#544ee5] text-white shadow-xs'
                  : 'bg-[#f4f6fb] text-[#717ea1] hover:bg-[#ebf0f8]'
              }`}
            >
              My Maps
            </button>
            <button
              onClick={() => setActiveTab('favorites')}
              className={`py-2.5 rounded-full text-[13px] font-bold text-center transition-all cursor-pointer ${
                activeTab === 'favorites'
                  ? 'bg-[#544ee5] text-white shadow-xs'
                  : 'bg-[#f4f6fb] text-[#717ea1] hover:bg-[#ebf0f8]'
              }`}
            >
              Favorites
            </button>
            <button
              onClick={() => setActiveTab('saved-places')}
              className={`py-2.5 rounded-full text-[13px] font-bold text-center transition-all cursor-pointer ${
                activeTab === 'saved-places'
                  ? 'bg-[#544ee5] text-white shadow-xs'
                  : 'bg-[#f4f6fb] text-[#717ea1] hover:bg-[#ebf0f8]'
              }`}
            >
              Saved Places
            </button>
          </div>

          {/* Maps Feed (matching c31.png) */}
          {activeTab === 'my-maps' && (
            <div className="space-y-3 pt-2">
              {maps.map((map) => (
                <div
                  key={map.id}
                  className="w-full bg-white rounded-[22px] border border-slate-200/80 p-2.5 sm:p-3 shadow-xs hover:border-slate-300 transition-all flex gap-3 items-center"
                >
                  {/* Left Thumbnail (c31-map-paris.png / c31-map-japan.png) */}
                  <div
                    onClick={() => onNavigate && onNavigate('purchased-map')}
                    className="relative w-28 h-22 sm:w-32 sm:h-24 rounded-2xl overflow-hidden shadow-2xs shrink-0 cursor-pointer"
                  >
                    <img
                      src={map.img}
                      alt={map.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 pointer-events-none"
                    />
                  </div>

                  {/* Right Details Column */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                    {/* Header Row: Title & Options Dots */}
                    <div className="flex items-center justify-between gap-1">
                      <h3
                        onClick={() => onNavigate && onNavigate('purchased-map')}
                        className="text-[14.5px] sm:text-[15px] font-black text-[#0f1738] tracking-tight truncate leading-tight cursor-pointer hover:text-[#544ee5] transition-colors"
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

                    {/* Places with purple pin icon */}
                    <div className="flex items-center gap-1 text-[12px] text-[#717ea1] font-semibold mt-0.5">
                      <MapPin className="w-3.5 h-3.5 fill-[#544ee5] text-[#544ee5]" />
                      <span>{map.places}</span>
                    </div>

                    {/* Description */}
                    <p className="text-[11.5px] text-[#717ea1] font-medium truncate leading-tight mt-0.5">
                      {map.description}
                    </p>

                    {/* Bottom Right: View Map Action Pill Button */}
                    <div className="flex items-center justify-end pt-2">
                      <button
                        onClick={() => onNavigate && onNavigate('purchased-map')}
                        className="px-4 py-1.5 rounded-full bg-[#f0f3ff] hover:bg-[#e4e9ff] text-[#544ee5] font-bold text-[12px] tracking-tight transition-all active:scale-95 cursor-pointer"
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
            <div className="p-8 text-center bg-[#f8f9fe] rounded-2xl border border-slate-100 text-[#717ea1] text-xs">
              <Heart className="w-8 h-8 text-[#544ee5] fill-[#544ee5]/20 mx-auto mb-2" />
              <p className="font-bold text-[#0f1738] text-sm mb-1">No Favorites Yet</p>
              <p>Maps you heart across Planitory will appear here.</p>
            </div>
          )}

          {/* Saved Places Tab Content */}
          {activeTab === 'saved-places' && (
            <div className="p-8 text-center bg-[#f8f9fe] rounded-2xl border border-slate-100 text-[#717ea1] text-xs space-y-1">
              <MapPin className="w-8 h-8 text-[#544ee5] mx-auto mb-2 opacity-80" />
              <p className="font-bold text-[#0f1738] text-sm">34 Bookmarked Locations</p>
              <p>Cafés, scenic viewpoints, and local spots saved in Lisbon, Paris, and Tokyo.</p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Bottom Navigation Bar matching c31.png */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 pt-2 pb-3 sm:pb-2.5 shadow-[0_-4px_20px_rgba(50,70,140,0.04)] flex items-center justify-between">
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

        {/* Profile Tab (ACTIVE PURPLE IN c31.png) */}
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
                <label className="font-bold text-slate-700 block mb-1">Headline / Role</label>
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
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
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
                <span className="text-slate-400">v2.5.0</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsSettingsOpen(false);
                showToast('Signed out of Planitory');
                if (onNavigate) onNavigate('explore');
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
