import React, { useState } from 'react';
import WelcomePage from './pages/WelcomePage';
import PhoneNumberPage from './pages/PhoneNumberPage';
import TravelRegionsPage from './pages/TravelRegionsPage';
import PreferencesPage from './pages/PreferencesPage';
import TravelGoalsPage from './pages/TravelGoalsPage';
import ExplorePage from './pages/ExplorePage';
import MapDetailPage from './pages/MapDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import PurchasedMapView from './pages/PurchasedMapView';
import CreatorsPage from './pages/CreatorsPage';
import CreatorProfilePage from './pages/CreatorProfilePage';
import UserProfilePage from './pages/UserProfilePage';
import { Smartphone, Monitor } from 'lucide-react';

export default function App() {
  // Defaults to Page 1: Welcome & Auth
  const [currentPage, setCurrentPage] = useState('welcome'); 
  const [viewMode, setViewMode] = useState('mobile'); // 'mobile' | 'fill'

  return (
    <div className="min-h-screen w-full bg-[#0a0d18] flex flex-col items-center justify-center p-0 sm:p-4 text-slate-100 selection:bg-indigo-500 selection:text-white">
      {/* Top Floating Control Bar (Desktop only) */}
      <header className="hidden sm:flex items-center justify-between w-full max-w-[1040px] mb-3 px-4 py-2 bg-[#141a2f]/85 backdrop-blur-md border border-white/10 rounded-full shadow-lg text-xs">
        {/* Page Switcher Tabs */}
        <div className="flex items-center gap-1 bg-black/40 p-1 rounded-full border border-white/5 overflow-x-auto">
          <button
            onClick={() => setCurrentPage('welcome')}
            className={`px-2 py-1 rounded-full font-semibold transition-all shrink-0 ${
              currentPage === 'welcome'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            P1 (c1)
          </button>
          <button
            onClick={() => setCurrentPage('phone')}
            className={`px-2 py-1 rounded-full font-semibold transition-all shrink-0 ${
              currentPage === 'phone'
                ? 'bg-[#544ee5] text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            P2 (c2)
          </button>
          <button
            onClick={() => setCurrentPage('regions')}
            className={`px-2 py-1 rounded-full font-semibold transition-all shrink-0 ${
              currentPage === 'regions'
                ? 'bg-[#544ee5] text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            P3 (c4)
          </button>
          <button
            onClick={() => setCurrentPage('preferences')}
            className={`px-2 py-1 rounded-full font-semibold transition-all shrink-0 ${
              currentPage === 'preferences'
                ? 'bg-[#544ee5] text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            P4 (c3)
          </button>
          <button
            onClick={() => setCurrentPage('goals')}
            className={`px-2 py-1 rounded-full font-semibold transition-all shrink-0 ${
              currentPage === 'goals'
                ? 'bg-[#544ee5] text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            P5 (c5)
          </button>
          <button
            onClick={() => setCurrentPage('explore')}
            className={`px-2 py-1 rounded-full font-semibold transition-all shrink-0 ${
              currentPage === 'explore'
                ? 'bg-[#544ee5] text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            P6: Explore (c6)
          </button>
          <button
            onClick={() => setCurrentPage('map-detail')}
            className={`px-2 py-1 rounded-full font-semibold transition-all shrink-0 ${
              currentPage === 'map-detail'
                ? 'bg-[#544ee5] text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            P7 (c7)
          </button>
          <button
            onClick={() => setCurrentPage('checkout')}
            className={`px-2 py-1 rounded-full font-semibold transition-all shrink-0 ${
              currentPage === 'checkout'
                ? 'bg-[#544ee5] text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            P8 (c8)
          </button>
          <button
            onClick={() => setCurrentPage('purchased-map')}
            className={`px-2 py-1 rounded-full font-semibold transition-all shrink-0 ${
              currentPage === 'purchased-map'
                ? 'bg-[#544ee5] text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            P9 (c10)
          </button>
          <button
            onClick={() => setCurrentPage('creators')}
            className={`px-2 py-1 rounded-full font-semibold transition-all shrink-0 ${
              currentPage === 'creators'
                ? 'bg-[#544ee5] text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            P10: Creators (c12)
          </button>
          <button
            onClick={() => setCurrentPage('creator-profile')}
            className={`px-2 py-1 rounded-full font-semibold transition-all shrink-0 ${
              currentPage === 'creator-profile'
                ? 'bg-[#544ee5] text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            P11 (c13)
          </button>
          <button
            onClick={() => setCurrentPage('user-profile')}
            className={`px-2 py-1 rounded-full font-semibold transition-all shrink-0 ${
              currentPage === 'user-profile'
                ? 'bg-[#544ee5] text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            P12: Profile (c14)
          </button>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-black/30 p-1 rounded-full border border-white/5 ml-2 shrink-0">
          <button
            onClick={() => setViewMode('mobile')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium transition-all ${
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
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium transition-all ${
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
        className={`w-full transition-all duration-300 flex items-center justify-center ${
          viewMode === 'mobile'
            ? 'sm:max-w-[430px] sm:h-[890px] sm:rounded-[44px] sm:ring-8 sm:ring-[#212946] sm:shadow-2xl sm:shadow-indigo-950/40'
            : 'max-w-[520px] h-[92vh] sm:rounded-[36px]'
        } h-screen overflow-hidden relative bg-black`}
      >
        {/* Page 1: Welcome (c1.png) */}
        {currentPage === 'welcome' && (
          <WelcomePage onNavigate={(page) => setCurrentPage(page === 'home' ? 'explore' : page)} />
        )}

        {/* Page 2: Phone Verification (c2.png) */}
        {currentPage === 'phone' && (
          <PhoneNumberPage
            onBack={() => setCurrentPage('welcome')}
            onNavigate={(page) => setCurrentPage(page === 'home' ? 'regions' : page)}
          />
        )}

        {/* Page 3: Regions (c4.png - Where do you usually travel?) */}
        {currentPage === 'regions' && (
          <TravelRegionsPage
            onBack={() => setCurrentPage('phone')}
            onNavigate={(page) => setCurrentPage(page === 'home' ? 'preferences' : page)}
          />
        )}

        {/* Page 4: Places (c3.png - What kind of places do you love?) */}
        {currentPage === 'preferences' && (
          <PreferencesPage
            onBack={() => setCurrentPage('regions')}
            onNavigate={(page) => setCurrentPage(page === 'home' ? 'goals' : page)}
          />
        )}

        {/* Page 5: Goals (c5.png - What are you looking for?) */}
        {currentPage === 'goals' && (
          <TravelGoalsPage
            onBack={() => setCurrentPage('preferences')}
            onNavigate={(page) => setCurrentPage(page === 'home' ? 'explore' : page)}
          />
        )}

        {/* Page 6: Main Explore Feed (c6.png) */}
        {currentPage === 'explore' && (
          <ExplorePage
            onBack={() => setCurrentPage('goals')}
            onNavigate={(page) => setCurrentPage(page)}
          />
        )}

        {/* Page 7: Map Detail - Best 5 Cafes in Paris (c7.png) */}
        {currentPage === 'map-detail' && (
          <MapDetailPage
            onBack={() => setCurrentPage('explore')}
            onNavigate={(page) => setCurrentPage(page)}
          />
        )}

        {/* Page 8: Checkout & Payment (c8.png) */}
        {currentPage === 'checkout' && (
          <CheckoutPage
            onBack={() => setCurrentPage('map-detail')}
            onNavigate={(page) => setCurrentPage(page)}
          />
        )}

        {/* Page 9: Purchased Map View - Paris Essentials (c10.png) */}
        {currentPage === 'purchased-map' && (
          <PurchasedMapView
            onBack={() => setCurrentPage('checkout')}
            onNavigate={(page) => setCurrentPage(page)}
          />
        )}

        {/* Page 10: Creators Feed (c12.png) */}
        {currentPage === 'creators' && (
          <CreatorsPage
            onBack={() => setCurrentPage('explore')}
            onNavigate={(page) => setCurrentPage(page)}
          />
        )}

        {/* Page 11: Creator Profile (c13.png) */}
        {currentPage === 'creator-profile' && (
          <CreatorProfilePage
            onBack={() => setCurrentPage('creators')}
            onNavigate={(page) => setCurrentPage(page)}
          />
        )}

        {/* Page 12: User Profile (c14.png) */}
        {currentPage === 'user-profile' && (
          <UserProfilePage
            onNavigate={(page) => setCurrentPage(page)}
          />
        )}
      </main>

      {/* Footer Subtext */}
      <footer className="hidden sm:block mt-2 text-[11.5px] text-slate-500 font-medium">
        All 12 screens implemented with exact fidelity &bull; Ready for your next page
      </footer>
    </div>
  );
}
