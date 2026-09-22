import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Share2,
  Star,
  Bookmark,
  Coffee,
  Wifi,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Check,
  X
} from 'lucide-react';

export default function MapDetailPage({ onBack, onNavigate }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [toastMessage, setToastMessage] = useState(null);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Best 5 Cafés in Paris - Planitory',
        url: window.location.href,
      }).catch(() => {});
    } else {
      showToast("Link copied to clipboard!");
    }
  };

  return (
    <div className="relative w-full h-full select-none overflow-hidden bg-white sm:rounded-[44px] flex flex-col justify-between">
      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto pb-24 scrollbar-none">
        {/* Top Hero Image Container */}
        <div className="relative w-full aspect-[16/10] max-h-[300px] overflow-hidden">
          <img
            src="/c7-hero.png"
            alt="Best 5 Cafés in Paris"
            className="w-full h-full object-cover pointer-events-none"
          />

          {/* Clean Interactive Overlays matching baked buttons in c7-hero.png */}
          {/* Back Button Hitbox */}
          <button
            onClick={onBack}
            className="absolute left-[7.5%] top-[25.5%] w-[11%] aspect-square rounded-full cursor-pointer hover:bg-black/10 active:scale-90 transition-all z-20"
            title="Back to Explore"
          />

          {/* Favorite Button Hitbox */}
          <button
            onClick={() => {
              const next = !isLiked;
              setIsLiked(next);
              showToast(next ? "Saved to your favorites!" : "Removed from favorites");
            }}
            className="absolute right-[19.2%] top-[25.5%] w-[11%] aspect-square rounded-full flex items-center justify-center cursor-pointer hover:bg-black/10 active:scale-90 transition-all z-20"
            title="Favorite"
          >
            {isLiked && (
              <Heart className="w-5 h-5 fill-[#ff4a73] text-[#ff4a73] animate-in zoom-in-50 duration-150" />
            )}
          </button>

          {/* Share Button Hitbox */}
          <button
            onClick={handleShare}
            className="absolute right-[7.5%] top-[25.5%] w-[11%] aspect-square rounded-full cursor-pointer hover:bg-black/10 active:scale-90 transition-all z-20"
            title="Share"
          />
        </div>

        {/* Content Card (Rounded Top Overlap) */}
        <div className="relative -mt-5 bg-white rounded-t-[30px] sm:rounded-t-[34px] px-6 pt-5 pb-6 z-20 space-y-4">
          {/* Header Title & Subtitle */}
          <div>
            <h1 className="text-[23px] sm:text-[25px] font-black text-[#0f1738] tracking-[-0.02em] leading-tight">
              Best 5 Cafés in Paris
            </h1>
            <p className="text-[13.5px] sm:text-[14px] text-[#6b779a] mt-1 font-medium">
              Iconic cafés, cozy corners and local favorites.
            </p>
          </div>

          {/* Creator Profile Row */}
          <div className="flex items-center justify-between pt-1">
            <div
              onClick={() => onNavigate ? onNavigate('creator-profile') : null}
              className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity"
            >
              <div className="w-13 h-13 rounded-full overflow-hidden shadow-xs ring-2 ring-slate-100 shrink-0">
                <img
                  src="/c7-creator-emma.png"
                  alt="Emma Wilson"
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[14.5px] font-bold text-[#111936] tracking-tight hover:underline">
                  By Emma Wilson
                </span>
                <span className="text-[12px] text-[#717ea1] font-medium">
                  Travel Creator
                </span>
              </div>
            </div>

            {/* Follow Button */}
            <button
              onClick={() => {
                const next = !isFollowing;
                setIsFollowing(next);
                showToast(next ? "Following Emma Wilson" : "Unfollowed");
              }}
              className={`px-5 py-2 rounded-full font-bold text-[13px] transition-all cursor-pointer ${
                isFollowing
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-[#edf0fd] hover:bg-[#e2e7f8] text-[#544ee5]'
              } active:scale-95`}
            >
              {isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>

          {/* Ratings Row */}
          <div className="flex items-center gap-1.5 text-[13.5px] text-[#111936] font-bold">
            <Star className="w-4 h-4 fill-[#fbbf24] text-[#fbbf24]" />
            <span>4.8</span>
            <span className="text-[#717ea1] font-medium text-[12.5px]">
              (320 reviews)
            </span>
          </div>

          {/* 4 Feature Badges */}
          <div className="grid grid-cols-4 gap-2.5 pt-1">
            {/* 5 Places */}
            <div className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-[#f4f6fe] border border-indigo-50/50">
              <Bookmark className="w-5 h-5 text-[#544ee5] stroke-[2.2] mb-1" />
              <span className="text-[11.5px] font-bold text-[#111936]">5 Places</span>
            </div>

            {/* Cafés */}
            <div className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-[#ffeef1] border border-rose-50/50">
              <Coffee className="w-5 h-5 text-[#e1496a] stroke-[2.2] mb-1" />
              <span className="text-[11.5px] font-bold text-[#111936]">Cafés</span>
            </div>

            {/* Offline */}
            <div className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-[#e8f7f2] border border-emerald-50/50">
              <Wifi className="w-5 h-5 text-[#10b981] stroke-[2.2] mb-1" />
              <span className="text-[11.5px] font-bold text-[#111936]">Offline</span>
            </div>

            {/* 1-2 Days */}
            <div className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-[#fff4ea] border border-amber-50/50">
              <Calendar className="w-5 h-5 text-[#f59e0b] stroke-[2.2] mb-1" />
              <span className="text-[11.5px] font-bold text-[#111936]">1–2 Days</span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center justify-between border-b border-slate-100 text-[13.5px] font-semibold pt-2 text-[#717ea1]">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2 transition-all relative ${
                activeTab === 'overview'
                  ? 'text-[#544ee5] font-bold'
                  : 'hover:text-[#111936]'
              }`}
            >
              Overview
              {activeTab === 'overview' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#544ee5] rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('inside')}
              className={`pb-2 transition-all relative ${
                activeTab === 'inside'
                  ? 'text-[#544ee5] font-bold'
                  : 'hover:text-[#111936]'
              }`}
            >
              What’s Inside
              {activeTab === 'inside' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#544ee5] rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-2 transition-all relative ${
                activeTab === 'reviews'
                  ? 'text-[#544ee5] font-bold'
                  : 'hover:text-[#111936]'
              }`}
            >
              Reviews
              {activeTab === 'reviews' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#544ee5] rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('creator')}
              className={`pb-2 transition-all relative ${
                activeTab === 'creator'
                  ? 'text-[#544ee5] font-bold'
                  : 'hover:text-[#111936]'
              }`}
            >
              Creator
              {activeTab === 'creator' && (
                <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#544ee5] rounded-full" />
              )}
            </button>
          </div>

          {/* Tab Content: Overview */}
          {activeTab === 'overview' && (
            <div className="p-4 rounded-2xl bg-[#fafbfe] border border-slate-100 space-y-3">
              <h2 className="text-[15px] font-bold text-[#111936]">About This Map</h2>
              <p className="text-[13px] leading-relaxed text-[#64748b]">
                A handpicked selection of the most charming cafés in Paris — from cozy local spots to aesthetic coffee corners. Perfect for first-time visitors, couples, and café lovers.
              </p>

              {/* 3 Photo Previews */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <button
                  onClick={() => setPreviewImage('/c7-photo-cafe-de-flore.png')}
                  className="aspect-[4/3] rounded-xl overflow-hidden hover:opacity-90 active:scale-95 transition-all shadow-xs"
                >
                  <img
                    src="/c7-photo-cafe-de-flore.png"
                    alt="Café de Flore"
                    className="w-full h-full object-cover"
                  />
                </button>

                <button
                  onClick={() => setPreviewImage('/c7-photo-croissant.png')}
                  className="aspect-[4/3] rounded-xl overflow-hidden hover:opacity-90 active:scale-95 transition-all shadow-xs"
                >
                  <img
                    src="/c7-photo-croissant.png"
                    alt="Croissant"
                    className="w-full h-full object-cover"
                  />
                </button>

                <button
                  onClick={() => setPreviewImage('/c7-photo-latte.png')}
                  className="aspect-[4/3] rounded-xl overflow-hidden hover:opacity-90 active:scale-95 transition-all shadow-xs"
                >
                  <img
                    src="/c7-photo-latte.png"
                    alt="Latte Art"
                    className="w-full h-full object-cover"
                  />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'inside' && (
            <div className="p-4 rounded-2xl bg-[#fafbfe] border border-slate-100 space-y-2 text-xs">
              <h2 className="text-[14px] font-bold text-[#111936] mb-2">5 Included Locations</h2>
              <div className="space-y-2 text-[#51617e]">
                <div className="p-2 bg-white rounded-xl flex items-center justify-between border border-slate-100">
                  <span className="font-bold text-slate-800">1. Café de Flore</span>
                  <span className="text-[11px] text-slate-400">Saint-Germain</span>
                </div>
                <div className="p-2 bg-white rounded-xl flex items-center justify-between border border-slate-100">
                  <span className="font-bold text-slate-800">2. Les Deux Magots</span>
                  <span className="text-[11px] text-slate-400">Latin Quarter</span>
                </div>
                <div className="p-2 bg-white rounded-xl flex items-center justify-between border border-slate-100">
                  <span className="font-bold text-slate-800">3. Carette Place des Vosges</span>
                  <span className="text-[11px] text-slate-400">Le Marais</span>
                </div>
                <div className="p-2 bg-white rounded-xl flex items-center justify-between border border-slate-100">
                  <span className="font-bold text-slate-800">4. Boot Café</span>
                  <span className="text-[11px] text-slate-400">3rd Arrondissement</span>
                </div>
                <div className="p-2 bg-white rounded-xl flex items-center justify-between border border-slate-100">
                  <span className="font-bold text-slate-800">5. Café Kitsuné Palais Royal</span>
                  <span className="text-[11px] text-slate-400">1st Arrondissement</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="p-4 rounded-2xl bg-[#fafbfe] border border-slate-100 space-y-3 text-xs">
              <h2 className="text-[14px] font-bold text-[#111936]">Traveler Reviews (320)</h2>
              <div className="space-y-2.5">
                <div className="bg-white p-3 rounded-xl border border-slate-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-800">Chloe M.</span>
                    <span className="text-amber-500 font-bold">★ 5.0</span>
                  </div>
                  <p className="text-slate-600 leading-normal">
                    "Found the best hot chocolate at Carette because of this map! Worth every penny."
                  </p>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-100">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-slate-800">Liam K.</span>
                    <span className="text-amber-500 font-bold">★ 5.0</span>
                  </div>
                  <p className="text-slate-600 leading-normal">
                    "The offline GPS routes saved us when we had no data in the Marais."
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'creator' && (
            <div className="p-4 rounded-2xl bg-[#fafbfe] border border-slate-100 space-y-2 text-xs">
              <h2 className="text-[14px] font-bold text-[#111936]">About Emma Wilson</h2>
              <p className="text-slate-600 leading-relaxed">
                Paris-based photographer and travel writer with 6 years experience uncovering hidden gems across France and Italy.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Purchase Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-slate-100 px-6 pt-3 pb-3 sm:pb-3 shadow-[0_-4px_20px_rgba(50,70,140,0.06)]">
        <button
          onClick={() => onNavigate ? onNavigate('checkout') : setShowPurchaseModal(true)}
          className="w-full h-[52px] sm:h-[56px] bg-[#544ee5] hover:bg-[#4842db] active:bg-[#3f39cc] text-white font-bold text-[16px] rounded-full shadow-[0_6px_20px_rgba(84,78,229,0.32)] btn-interactive flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Buy Now — $10</span>
          <ArrowRight className="w-5 h-5 stroke-[2.4]" />
        </button>
      </div>

      {/* Checkout / Unlocked Modal */}
      {showPurchaseModal && (
        <div className="absolute inset-0 bg-black/45 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-indigo-50 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2 text-[#544ee5]">
                <CheckCircle2 className="w-5 h-5" />
                <h3 className="font-bold text-[#111936] text-base">Unlock Itinerary</h3>
              </div>
              <button
                onClick={() => setShowPurchaseModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Get immediate offline access to all 5 verified café locations, walking routes, and creator notes.
            </p>

            <div className="bg-slate-50 p-3.5 rounded-2xl mb-5 space-y-2 border border-slate-100">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Best 5 Cafés in Paris</span>
                <span className="font-bold text-[#111936]">$10.00</span>
              </div>
              <div className="flex justify-between text-xs text-slate-500">
                <span>Platform Fee</span>
                <span>$0.00</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-bold text-[#111936]">
                <span>Total</span>
                <span className="text-[#544ee5]">$10.00</span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowPurchaseModal(false);
                showToast("Map unlocked successfully! Added to My Maps!");
              }}
              className="w-full py-3.5 bg-[#544ee5] hover:bg-[#4842db] text-white font-bold rounded-xl text-sm shadow-md shadow-indigo-200 transition-all flex items-center justify-center gap-2"
            >
              <span>Confirm & Download Map</span>
              <Check className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}

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
