import React, { useState } from 'react';
import ExplorePage from './pages/ExplorePage';
import MapDetailPage from './pages/MapDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import PurchasedMapView from './pages/PurchasedMapView';
import CreatorsPage from './pages/CreatorsPage';
import CreatorProfilePage from './pages/CreatorProfilePage';
import UserProfilePage from './pages/UserProfilePage';
import SearchPage from './pages/SearchPage';
import NotificationsPage from './pages/NotificationsPage';
import CreateMapPage from './pages/CreateMapPage';
import FeaturedMapsPage from './pages/FeaturedMapsPage';
import { Smartphone, Monitor } from 'lucide-react';

export default function App() {
  // Defaults to Home / Explore Page
  const [currentPage, setCurrentPage] = useState('explore'); 
  const [viewMode, setViewMode] = useState('mobile'); // 'mobile' | 'fill'

  const navPages = [
    { id: 'explore', label: 'Explore (Home)' },
    { id: 'featured-maps', label: 'Featured Maps' },
    { id: 'map-detail', label: 'Map Detail' },
    { id: 'checkout', label: 'Checkout' },
    { id: 'purchased-map', label: 'My Map' },
    { id: 'creators', label: 'Creators' },
    { id: 'creator-profile', label: 'Creator Profile' },
    { id: 'user-profile', label: 'Profile' },
    { id: 'search', label: 'Search' },
    { id: 'notifications', label: 'Notif' },
    { id: 'create', label: 'Create' },
  ];

  return (
    <div className="min-h-[100dvh] h-[100dvh] w-full bg-[#0a0d18] flex flex-col items-center justify-center p-0 sm:p-4 text-slate-100 selection:bg-indigo-500 selection:text-white overflow-hidden">
      {/* Top Floating Control Bar (Desktop only) */}
      <header className="hidden sm:flex items-center justify-between w-full max-w-[1040px] mb-3 px-4 py-2 bg-[#141a2f]/85 backdrop-blur-md border border-white/10 rounded-full shadow-lg text-xs">
        {/* Page Switcher Tabs */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-full border border-white/5 overflow-x-auto scrollbar-none">
          {navPages.map((page) => (
            <button
              key={page.id}
              onClick={() => setCurrentPage(page.id)}
              className={`px-3 py-1 rounded-full font-semibold transition-all shrink-0 cursor-pointer ${
                currentPage === page.id
                  ? 'bg-[#544ee5] text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {page.label}
            </button>
          ))}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-black/30 p-1 rounded-full border border-white/5 ml-2 shrink-0">
          <button
            onClick={() => setViewMode('mobile')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
              viewMode === 'mobile'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Mobile Device Preview"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
          <button
            onClick={() => setViewMode('fill')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium transition-all cursor-pointer ${
              viewMode === 'fill'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Fitted View"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Fitted</span>
          </button>
        </div>
      </header>

      {/* Main Canvas Container */}
      <main
        className={`w-full transition-all duration-300 flex flex-col ${
          viewMode === 'mobile'
            ? 'sm:max-w-[430px] sm:h-[890px] sm:rounded-[44px] sm:ring-8 sm:ring-[#212946] sm:shadow-2xl sm:shadow-indigo-950/40'
            : 'sm:max-w-[520px] sm:h-[92vh] sm:rounded-[36px]'
        } h-full flex-1 sm:flex-initial overflow-hidden relative bg-[#fafbfe]`}
      >
        {/* Main Explore Feed (c29.png Home) */}
        {currentPage === 'explore' && (
          <ExplorePage
            onNavigate={(page) => setCurrentPage(page)}
          />
        )}

        {/* Featured Maps - All Curated Locations Grid View */}
        {currentPage === 'featured-maps' && (
          <FeaturedMapsPage
            onBack={() => setCurrentPage('explore')}
            onNavigate={(page) => setCurrentPage(page)}
          />
        )}

        {/* Map Detail */}
        {currentPage === 'map-detail' && (
          <MapDetailPage
            onBack={() => setCurrentPage('explore')}
            onNavigate={(page) => setCurrentPage(page)}
          />
        )}

        {/* Checkout & Payment */}
        {currentPage === 'checkout' && (
          <CheckoutPage
            onBack={() => setCurrentPage('map-detail')}
            onNavigate={(page) => setCurrentPage(page)}
          />
        )}

        {/* Purchased Map View (c26.png My Map) */}
        {currentPage === 'purchased-map' && (
          <PurchasedMapView
            onBack={() => setCurrentPage('explore')}
            onNavigate={(page) => setCurrentPage(page)}
          />
        )}

        {/* Creators Feed */}
        {currentPage === 'creators' && (
          <CreatorsPage
            onBack={() => setCurrentPage('explore')}
            onNavigate={(page) => setCurrentPage(page)}
          />
        )}

        {/* Creator Profile */}
        {currentPage === 'creator-profile' && (
          <CreatorProfilePage
            onBack={() => setCurrentPage('creators')}
            onNavigate={(page) => setCurrentPage(page)}
          />
        )}

        {/* User Profile (c31.png Profile) */}
        {currentPage === 'user-profile' && (
          <UserProfilePage
            onNavigate={(page) => setCurrentPage(page)}
          />
        )}

        {/* Search */}
        {currentPage === 'search' && (
          <SearchPage
            onBack={() => setCurrentPage('explore')}
            onNavigate={(page) => setCurrentPage(page)}
          />
        )}

        {/* Notifications */}
        {currentPage === 'notifications' && (
          <NotificationsPage
            onBack={() => setCurrentPage('explore')}
            onNavigate={(page) => setCurrentPage(page)}
          />
        )}

        {/* Create Map */}
        {currentPage === 'create' && (
          <CreateMapPage
            onBack={() => setCurrentPage('explore')}
            onNavigate={(page) => setCurrentPage(page)}
          />
        )}
      </main>

      {/* Footer Subtext */}
      <footer className="hidden sm:block mt-2 text-[11.5px] text-slate-500 font-medium">
        Planitory Travel App &bull; Active &amp; Ready
      </footer>
    </div>
  );
}
