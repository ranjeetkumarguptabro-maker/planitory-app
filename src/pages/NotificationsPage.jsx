import React, { useState } from 'react';
import {
  ArrowLeft,
  Settings,
  Heart,
  UserCheck,
  MapPin,
  Star,
  Landmark,
  ChevronRight,
  Home,
  Map,
  Plus,
  Users,
  User,
  CheckCircle2,
  X,
  Bell
} from 'lucide-react';

const NOTIFICATIONS = [
  {
    id: 'notif-1',
    group: 'Today',
    category: 'trips',
    title: 'New café map in Paris!',
    subtitle: 'Discover 5 cozy cafés added to your Paris collection.',
    time: '2 hours ago',
    img: '/c16-notif-paris.png',
    badgeType: 'heart',
    badgeBg: 'bg-[#ff4a73]',
    unread: true,
    targetPage: 'map-detail',
  },
  {
    id: 'notif-2',
    group: 'Today',
    category: 'followers',
    title: 'Sarah Thompson started following you.',
    subtitle: 'Travel lover | 120K followers',
    time: '4 hours ago',
    img: '/c16-notif-sarah.png',
    badgeType: 'follower',
    badgeBg: 'bg-[#4f80ff]',
    unread: true,
    targetPage: 'creator-profile',
  },
  {
    id: 'notif-3',
    group: 'Today',
    category: 'trips',
    title: 'Your Rome map is ready!',
    subtitle: 'We’ve created a personalized map based on your interests.',
    time: '6 hours ago',
    img: '/c16-notif-rome.png',
    badgeType: 'map',
    badgeBg: 'bg-[#18c6a0]',
    unread: true,
    targetPage: 'map-detail',
  },
  {
    id: 'notif-4',
    group: 'This Week',
    category: 'offers',
    title: 'Special offer just for you!',
    subtitle: 'Get 20% off on curated maps in Amalfi Coast.',
    time: '1 day ago',
    img: '/c16-notif-amalfi.png',
    badgeType: 'star',
    badgeBg: 'bg-[#f59e0b]',
    unread: false,
    targetPage: 'checkout',
  },
  {
    id: 'notif-5',
    group: 'This Week',
    category: 'updates',
    title: 'New museums added in Vienna',
    subtitle: 'Explore 10+ iconic museums and cultural spots.',
    time: '2 days ago',
    img: '/c16-notif-vienna.png',
    badgeType: 'museum',
    badgeBg: 'bg-[#8b5cf6]',
    unread: false,
    targetPage: 'map-detail',
  },
  {
    id: 'notif-6',
    group: 'This Week',
    category: 'updates',
    title: 'Your map got 50 likes!',
    subtitle: 'People love your “Switzerland Getaway” map. Keep exploring!',
    time: '3 days ago',
    img: '/c16-notif-swiss.png',
    badgeType: 'heart',
    badgeBg: 'bg-[#ff4a73]',
    unread: false,
    targetPage: 'user-profile',
  },
  {
    id: 'notif-7',
    group: 'Earlier',
    category: 'followers',
    title: 'Alex Rivera started following you.',
    subtitle: 'Adventure seeker | 85K followers',
    time: '5 days ago',
    img: '/c16-notif-alex.png',
    badgeType: 'follower',
    badgeBg: 'bg-[#4f80ff]',
    unread: false,
    targetPage: 'creator-profile',
  },
];

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'trips', label: 'Trips' },
  { id: 'followers', label: 'Followers' },
  { id: 'updates', label: 'Updates' },
  { id: 'offers', label: 'Offers' },
];

export default function NotificationsPage({ onBack, onNavigate }) {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [toastMessage, setToastMessage] = useState(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleNotificationClick = (notif) => {
    // Mark as read
    setNotifications((prev) =>
      prev.map((n) => (n.id === notif.id ? { ...n, unread: false } : n))
    );
    showToast(`Opening "${notif.title}"`);
    if (onNavigate && notif.targetPage) {
      setTimeout(() => onNavigate(notif.targetPage), 300);
    }
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    showToast("All notifications marked as read");
    setShowSettingsModal(false);
  };

  const filteredNotifications = notifications.filter(
    (n) => activeTab === 'all' || n.category === activeTab
  );

  // Group by Today, This Week, Earlier
  const groups = ['Today', 'This Week', 'Earlier'].filter((group) =>
    filteredNotifications.some((n) => n.group === group)
  );

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#fafbfe] sm:rounded-[44px] flex flex-col justify-between">
      {/* Top Header Area */}
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

        {/* Back Button & Title Header with Settings */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 -ml-1.5 rounded-full flex items-center justify-center text-[#111936] hover:bg-slate-100 active:scale-95 transition-all cursor-pointer shrink-0"
              title="Go back"
            >
              <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
            </button>
            <div>
              <h1 className="text-[22px] sm:text-[24px] font-black text-[#111936] tracking-tight leading-tight">
                Notifications
              </h1>
              <p className="text-[12px] sm:text-[12.5px] text-[#717ea1] font-medium leading-none">
                Stay updated with your travel world.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowSettingsModal(true)}
            className="w-10 h-10 rounded-full border border-slate-200 bg-white flex items-center justify-center text-[#111936] hover:bg-slate-50 active:scale-95 transition-all cursor-pointer shadow-xs shrink-0"
            title="Notification Settings"
          >
            <Settings className="w-5 h-5 text-[#111936]" />
          </button>
        </div>

        {/* Filter Tabs (Horizontal Pills) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[#544ee5] text-white shadow-xs'
                  : 'bg-[#edf0fa] text-[#637095] hover:bg-[#e4e9f7]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List Content */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y px-5 sm:px-6 space-y-4 pb-28 scrollbar-none pt-2">
        {groups.map((group) => (
          <div key={group} className="space-y-2">
            <h2 className="text-[13px] font-bold text-[#717ea1] tracking-tight text-left pl-1">
              {group}
            </h2>

            <div className="space-y-2">
              {filteredNotifications
                .filter((n) => n.group === group)
                .map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleNotificationClick(item)}
                    className="w-full p-2.5 rounded-2xl bg-white border border-[#e4e8f7] shadow-[0_2px_8px_rgba(50,70,140,0.03)] flex items-center gap-3 hover:border-indigo-200 transition-all cursor-pointer group text-left"
                  >
                    {/* Thumbnail with Badge Overlay */}
                    <div className="relative w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] shrink-0">
                      <img
                        src={item.img}
                        alt={item.title}
                        className={`w-full h-full object-cover pointer-events-none ${
                          item.badgeType === 'follower' ? 'rounded-full' : 'rounded-2xl'
                        }`}
                      />

                      {/* Small Icon Badge */}
                      <div
                        className={`absolute -top-1 -right-1 w-5 h-5 rounded-full ${item.badgeBg} text-white flex items-center justify-center ring-2 ring-white shadow-xs`}
                      >
                        {item.badgeType === 'heart' && (
                          <Heart className="w-2.5 h-2.5 fill-white" />
                        )}
                        {item.badgeType === 'follower' && (
                          <UserCheck className="w-2.5 h-2.5" />
                        )}
                        {item.badgeType === 'map' && (
                          <MapPin className="w-2.5 h-2.5" />
                        )}
                        {item.badgeType === 'star' && (
                          <Star className="w-2.5 h-2.5 fill-white" />
                        )}
                        {item.badgeType === 'museum' && (
                          <Landmark className="w-2.5 h-2.5" />
                        )}
                      </div>
                    </div>

                    {/* Text Details */}
                    <div className="flex-1 min-w-0 pr-1">
                      <h3 className="font-bold text-[13.5px] sm:text-[14px] text-[#111936] tracking-tight leading-snug truncate group-hover:text-[#544ee5] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[11.5px] text-[#717ea1] leading-snug line-clamp-2 mb-0.5">
                        {item.subtitle}
                      </p>
                      <span className="text-[10.5px] text-[#939db8] font-medium block">
                        {item.time}
                      </span>
                    </div>

                    {/* Unread Purple Dot & Chevron */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      {item.unread && (
                        <div className="w-2 h-2 rounded-full bg-[#544ee5] ring-2 ring-[#544ee5]/20" />
                      )}
                      <ChevronRight className="w-4 h-4 text-[#8a95b3] group-hover:text-[#544ee5] transition-colors" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}

        {groups.length === 0 && (
          <div className="py-12 text-center text-[#717ea1] text-xs space-y-2">
            <Bell className="w-8 h-8 mx-auto text-slate-300" />
            <p className="font-semibold">No notifications in "{activeTab}"</p>
          </div>
        )}
      </div>

      {/* Settings Modal */}
      {showSettingsModal && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-end justify-center p-3 animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl space-y-3.5 border border-indigo-50 text-left">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-[16px] text-[#111936]">Notification Settings</h3>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Manage how and when you receive notifications from creators, trip updates, and new map releases.
            </p>

            <button
              onClick={handleMarkAllAsRead}
              className="w-full py-2.5 bg-indigo-50 hover:bg-indigo-100 text-[#544ee5] font-bold rounded-xl text-xs transition-colors cursor-pointer"
            >
              Mark all as read
            </button>

            <button
              onClick={() => {
                showToast("Push notifications preferences saved");
                setShowSettingsModal(false);
              }}
              className="w-full py-2.5 bg-[#544ee5] text-white font-bold rounded-xl text-xs shadow-md shadow-indigo-200 transition-all cursor-pointer"
            >
              Save Preferences
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
          onClick={() => showToast("Create a new map listing")}
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
