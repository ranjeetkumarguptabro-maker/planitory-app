# 🌍 Planitory — Maps with Stories. Trips with Meaning.

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-Assets_%2B_Worker-F38020?logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payment_Gateway-635BFF?logo=stripe&logoColor=white)](https://stripe.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Planitory** is a mobile-first travel marketplace and digital itinerary platform that connects modern explorers with interactive, curated city maps and travel guides designed by local creators worldwide.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Highlights & Architecture](#-key-highlights--architecture)
- [Complete Screen-by-Screen Breakdown](#-complete-screen-by-screen-breakdown)
- [Map Customization & 3D Emoji Engine](#-map-customization--3d-emoji-engine)
- [Content Gating & Monetization Flow](#-content-gating--monetization-flow)
- [Dual-Mode Studio: Create a Map & Plan a Trip](#-dual-mode-studio-create-a-map--plan-a-trip)
- [Stripe Payments & Cloudflare Backend](#-stripe-payments--cloudflare-backend)
- [Tech Stack & Dependencies](#-tech-stack--dependencies)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started & Local Setup](#-getting-started--local-setup)
- [Mobile Device Testing (iOS & Android)](#-mobile-device-testing-ios--android)
- [Deployment Guide (Cloudflare Workers)](#-deployment-guide-cloudflare-workers)
- [License](#-license)

---

## 🌟 Overview

Planitory bridges the gap between static blog posts and generic map applications. Instead of scrolling through lengthy articles or searching through thousands of unvetted Google Maps reviews, travelers purchase and unlock curated, verified digital maps that work seamlessly on their mobile devices with offline-ready landmarks, insider audio/text notes, and direct Google Maps navigation.

---

## 💎 Key Highlights & Architecture

- **📱 Mobile-First Responsive Design**: Optimized for iOS (iPhone 14/15/16 Pro Max) and Android viewports with safe-area insets (`env(safe-area-inset-top)`, `env(safe-area-inset-bottom)`), smooth touch momentum scrolling, and touch-drag panning.
- **🗺️ Real Interactive Map Engine**: Multi-layer vector map rendering with 2-finger pinch-to-zoom (100% to 300%), single-finger touch pan, GPS recentering, compass orientation, and dynamic pin selection.
- **🎨 Visual Map Customizer**: Change map themes (*Default, Light, Dark, Retro, Minimal, Night*), select custom pin palettes (*Pastel Rose, Emerald, Sunset Gold, Royal Purple, Midnight*), and toggle between **Classic Vector Outlines** and **3D Emoji Glyphs** (☕, 🍝, 📸, 🌳, 🏛️, 🏨).
- **🔒 Premium Content Gating (1 Free Preview + Locked Spots)**: Allows travelers to inspect the guide's 1st location (e.g., *Café de Flore*) while locking the remaining spots behind a sleek Stripe purchase flow.
- **⚡ High-Performance Cloudflare Workers Backend**: Fast edge delivery via Cloudflare Workers with Static Assets binding and server-side Stripe PaymentIntent creation.
- **🛠️ Dual Creation Studio**: Creators can create themed city maps or build multi-day travel itineraries with duration selectors and AI suggestions.

---

## 📱 Complete Screen-by-Screen Breakdown

| # | Screen | Component File | Description & Key Features |
| :-: | :--- | :--- | :--- |
| **01** | **Explore (Home)** | [`src/pages/ExplorePage.jsx`](src/pages/ExplorePage.jsx) | Hero banner with polaroid clusters, interactive category filter pills (*Food & Drinks, Nature, Culture, Nightlife, City Guides, Hidden Gems*) with mouse-drag and wheel horizontal scroll, and Featured Maps carousel (*Best 5 Cafés in Paris, Bali Wellness, Europe City Bundle, Tokyo Hidden Gems, Rome Secret Passages*). |
| **02** | **Featured Maps Grid** | [`src/pages/FeaturedMapsPage.jsx`](src/pages/FeaturedMapsPage.jsx) | Full directory of all curated maps with badge filters (*Bestseller, Top Rated, New, Editor's Pick*), destination cards, place counts, and instant navigation. |
| **03** | **Map Detail & Guide** | [`src/pages/MapDetailPage.jsx`](src/pages/MapDetailPage.jsx) | Cover photo showcase, author follow badge (*Emma Wilson*), rating badges, and 4-tab panel: **Overview** (summary & photo thumbnails), **What's Inside** (1 Free Unlocked Preview + 4 Locked spots), **Traveler Reviews** (verified ratings), and **Creator Bio**. |
| **04** | **Stripe Checkout** | [`src/pages/CheckoutPage.jsx`](src/pages/CheckoutPage.jsx) | Secure payment interface with real-time card brand detection (Visa, Mastercard, Amex), live formatting, payment summary breakdown, and instant digital unlock receipt modal with copyable Transaction ID. |
| **05** | **Purchased Map View** | [`src/pages/PurchasedMapView.jsx`](src/pages/PurchasedMapView.jsx) | Full-screen interactive Paris map with touch pinch-to-zoom, landmark pins, floating top header, GPS recenter, and responsive bottom place card (*Café de Flore*) with one-tap Google Maps directions. |
| **06** | **Map Customizer** | [`src/pages/PurchasedMapView.jsx`](src/pages/PurchasedMapView.jsx) | Bottom-sheet modal with 2-step customization: **Step 1: Map Style** (6 visual filters) and **Step 2: Pins & Colors** (6 color themes + 3D Emojis toggle). |
| **07** | **Creators Directory** | [`src/pages/CreatorsPage.jsx`](src/pages/CreatorsPage.jsx) | Directory of featured travel creators, filterable by expertise (*Foodies, Photographers, City Guides*), follower counts, verified badges, and quick-follow actions. |
| **08** | **Creator Profile** | [`src/pages/CreatorProfilePage.jsx`](src/pages/CreatorProfilePage.jsx) | Creator portfolio featuring bio, social links, follower stats, reviews, and a 2×2 grid of authored maps (*Paris, Rome, Kyoto, Amalfi Coast*). |
| **09** | **User Profile** | [`src/pages/UserProfilePage.jsx`](src/pages/UserProfilePage.jsx) | User dashboard with avatar, travel stats (*Maps Owned, Saved Places, Countries Explored*), and 4 tabs: **My Maps**, **Favorites**, **Saved Places**, and **Account Settings**. |
| **10** | **Search & Filters** | [`src/pages/SearchPage.jsx`](src/pages/SearchPage.jsx) | Real-time search engine with instant query matching across cities, tags, creators, recent search history chips, and quick recommendations. |
| **11** | **Notifications** | [`src/pages/NotificationsPage.jsx`](src/pages/NotificationsPage.jsx) | Notification feed categorized by *All, Unread, Map Updates, and Creator Alerts* with unread indicators and actionable shortcuts. |
| **12** | **Create Map Studio** | [`src/pages/CreateMapPage.jsx`](src/pages/CreateMapPage.jsx) | Dual-mode studio: **Create a Map** (Custom Map, Curated Guide, Saved Collection) vs **Plan a Trip** (Trip Itinerary, Multi-City Route, Weekend Escape with duration selector pills and AI suggestions). |
| **13** | **Interactive Map Builder** | [`src/pages/CreateMapPage.jsx`](src/pages/CreateMapPage.jsx) | Step 2 map canvas with place search, manual pin drop, saved lists importer, and Google Maps URL integration. |

---

## 🎨 Map Customization & 3D Emoji Engine

Planitory allows users to personalize how their purchased travel maps look in real-time:

### 1. Map Visual Styles
- **Default**: Crisp standard vector cartography with pastel landmarks and blue river veins.
- **Light**: High-key, clean aesthetic for bright outdoor viewing.
- **Dark**: High-contrast, midnight-toned theme for nighttime navigation.
- **Retro**: Vintage sepia styling reminiscent of classic travel journals.
- **Minimal**: Subtle grayscale mode focusing strictly on route lines and pin markers.
- **Night**: Inverted cyberpunk palette with glowing neon streets.

### 2. Custom Marker Palettes
- **Original**: Multi-colored landmarks based on category type.
- **Pastel Rose (`#f43f5e`)**: Elegant warm pink theme.
- **Emerald (`#10b981`)**: Nature-inspired green theme.
- **Sunset Gold (`#f59e0b`)**: Golden hour amber palette.
- **Royal Purple (`#6366f1`)**: Planitory signature indigo palette.
- **Midnight (`#334155`)**: Slate charcoal theme.

### 3. Icon Glyphs & 3D Emojis
- **Classic Vectors**: Crisp SVG icons matching place categories (Coffee, Utensils, Camera, Trees, Landmark, Building).
- **3D Emojis**: Illustrated 3D emoji glyphs rendered seamlessly inside marker heads:
  - ☕ **Cafés** (*Café de Flore*)
  - 🍝 **Restaurants / Bistros** (*Le Comptoir du Relais*)
  - 📸 **Photo Spots** (*Pont des Arts*)
  - 🌳 **Parks & Nature** (*Jardin du Luxembourg*)
  - 🏛️ **Museums & Culture** (*Musée d’Orsay*)
  - 🏨 **Hotels & Stays** (*Hôtel Lutetia*)

---

## 🔒 Content Gating & Monetization Flow

To maximize conversion while giving potential buyers confidence:
1. **Free Preview**: The first landmark (*1. Café de Flore*) displays all details, photos, and location highlights freely.
2. **Blurred & Locked Spots**: Locations 2 through 5 (*2. Les Deux Magots*, *3. Carette Place des Vosges*, *4. Boot Café*, *5. Café Kitsuné*) display blurred names, locked padlock badges, and an explanatory *"Unlocks after purchase"* label.
3. **1-Click Unlock CTA**: Clicking the purchase banner or bottom purchase button routes directly to checkout to unlock all coordinates, photos, and Google Maps GPS navigation links instantly.

---

## 🚀 Dual-Mode Studio: Create a Map & Plan a Trip

In [`CreateMapPage.jsx`](src/pages/CreateMapPage.jsx), creators can choose between two distinct workflows:

### Mode A: Create a Map
- **Options**: *Custom Map*, *Curated Guide*, *Saved Collection*
- **Inputs**: Map title, description, and map-specific AI prompts (*"Paris Café Guide"*, *"Tokyo Hidden Gems"*).
- **Next Step**: Opens map builder canvas with place search and pin management.

### Mode B: Plan a Trip
- **Options**: *Trip Itinerary*, *Multi-City Route*, *Weekend Escape*
- **Inputs**: Trip title, Destination input (*e.g., Paris, France*), Duration pills (*3 Days, 5 Days, 7 Days, 10+ Days*), and itinerary notes.
- **AI Generator**: Provides day-by-day travel suggestion templates (*"5 Days in Paris & Versailles 🥐"*, *"7-Day Swiss Alps Adventure 🏔️"*).

---

## 💳 Stripe Payments & Cloudflare Backend

- **Frontend**: Lightweight Stripe integration in [`src/services/stripe.js`](src/services/stripe.js) with real-time card brand detection, Luhn algorithm validation, and expiration formatting.
- **Backend API**: Cloudflare Worker endpoint (`worker/index.js`) handling `/api/create-payment-intent` and returning valid client secrets.
- **Receipts**: Auto-generated transaction receipt with copyable IDs, timestamp, and instant redirect to the unlocked map.

---

## 🛠️ Tech Stack & Dependencies

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | React 18.3.1 | Component-based UI architecture |
| **Build Tool & Bundler** | Vite 6.4.3 | Instant HMR and optimized production bundling |
| **Styling** | Tailwind CSS 3.4.17 | Utility-first responsive CSS styling |
| **Iconography** | Lucide React 0.344.0 | Crisp, lightweight icon set |
| **Backend / Edge** | Cloudflare Workers | Serverless API routes and edge asset serving |
| **Payments** | Stripe API & Stripe.js | Secure payment intent processing |
| **Database / Auth** | Supabase JS Client | User authentication and storage integration |

---

## 📁 Project Directory Structure

```
planitory-app/
├── public/                     # High-resolution map vectors & UI images
│   ├── c26-my-map.png          # Paris interactive map graphic
│   ├── c26-map-bg.png          # Clean Paris map vector background
│   ├── c29-polaroids.png       # Explore page hero polaroid cluster
│   ├── c31-map-paris.png       # Paris curated guide cover
│   ├── c7-hero.png             # Best 5 Cafés in Paris cover hero
│   ├── c7-creator-emma.png     # Emma Wilson author avatar
│   ├── style-default.png       # Map style previews (Light, Dark, Retro, etc.)
│   └── ...
├── src/
│   ├── pages/                  # Page components
│   │   ├── ExplorePage.jsx        # Home / explore discovery feed
│   │   ├── FeaturedMapsPage.jsx   # Curated travel maps directory
│   │   ├── MapDetailPage.jsx      # Map detail & locked preview
│   │   ├── CheckoutPage.jsx       # Stripe payment & receipt modal
│   │   ├── PurchasedMapView.jsx   # Zoomable map & customizer
│   │   ├── CreatorsPage.jsx       # Creators directory
│   │   ├── CreatorProfilePage.jsx # Creator portfolio & authored maps
│   │   ├── UserProfilePage.jsx    # User profile & saved collections
│   │   ├── SearchPage.jsx         # Global search & discovery
│   │   ├── NotificationsPage.jsx  # Notification center
│   │   └── CreateMapPage.jsx      # Dual studio (Create Map / Plan Trip)
│   ├── services/
│   │   ├── stripe.js              # Stripe payment helper
│   │   └── supabase.js            # Supabase database & storage helper
│   ├── App.jsx                 # Navigation orchestrator & view mode toggle
│   ├── index.css               # Base Tailwind, safe-area insets & touch scrolling
│   └── main.jsx                # React DOM entry point
├── worker/
│   └── index.js                # Cloudflare Worker API & SPA static fallback
├── wrangler.jsonc              # Cloudflare Workers configuration
├── package.json                # Dependencies and project scripts
├── vite.config.js              # Vite build and dev server configuration
└── README.md                   # Comprehensive project documentation
```

---

## 🚀 Getting Started & Local Setup

### 1. Prerequisites
- **Node.js** `v18.0.0` or higher
- **npm** `v9.0.0` or higher

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/ranjeetkumarguptabro-maker/planitory-app.git

# Navigate into the project directory
cd planitory-app

# Install dependencies
npm install
```

### 3. Running Development Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📱 Mobile Device Testing (iOS & Android)

To test the application directly on an iPhone, iPad, or Android device connected to your local network:

```bash
npm run dev -- --host 0.0.0.0 --port 5173
```

Then open the Network URL on your mobile browser (e.g., `http://172.20.10.8:5173`).

---

## ☁️ Deployment Guide (Cloudflare Workers)

This application is ready for zero-config deployment on Cloudflare Workers:

```bash
# 1. Build the production bundle
npm run build

# 2. Deploy to Cloudflare Workers
npx wrangler deploy
```

### Environment Secrets (Optional)
To enable live Stripe payments in production, add your secret key in the Cloudflare Dashboard under **Workers & Pages → planitory-app → Settings → Variables and Secrets**:
- `STRIPE_SECRET_KEY`: `sk_live_...` or `sk_test_...`

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<div align="center">
  <sub>Built with ❤️ by the Planitory Team. Maps with stories. Trips with meaning.</sub>
</div>
