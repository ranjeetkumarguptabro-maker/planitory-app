# 🌍 Planitory — Maps with Stories. Trips with Meaning.

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Cloudflare Workers](https://img.shields.io/badge/Cloudflare_Workers-Assets_%2B_Worker-F38020?logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)
[![Stripe](https://img.shields.io/badge/Stripe-Payment_Gateway-635BFF?logo=stripe&logoColor=white)](https://stripe.com/)

**Planitory** is a mobile-first travel web application that connects travelers with curated city maps, hidden gems, and itineraries crafted by local creators worldwide.

---

## ✨ Features & All 15 Implemented Screens

| Screen | File | Highlights |
| :--- | :--- | :--- |
| **P1: Welcome & Auth** | [`WelcomePage.jsx`](src/pages/WelcomePage.jsx) | Full branding, Google OAuth, Phone SMS OTP, Email auth, Terms & Privacy modals. |
| **P2: Phone Verification** | [`PhoneNumberPage.jsx`](src/pages/PhoneNumberPage.jsx) | International country codes, phone input formatting, and 4-digit animated OTP verification. |
| **P3: Region Selection** | [`TravelRegionsPage.jsx`](src/pages/TravelRegionsPage.jsx) | Onboarding 1/3: Europe, Asia, Americas, Local, Anywhere multi-select badges. |
| **P4: Place Preferences** | [`PreferencesPage.jsx`](src/pages/PreferencesPage.jsx) | Onboarding 2/3: 3×3 interactive category grid (Cafés, Culture, Food, Nature, etc.). |
| **P5: Travel Goals** | [`TravelGoalsPage.jsx`](src/pages/TravelGoalsPage.jsx) | Onboarding 3/3: Exploration, inspiration, and unique destination goal cards. |
| **P6: Explore Feed** | [`ExplorePage.jsx`](src/pages/ExplorePage.jsx) | Auto-cycling hero maps (Rome, Barcelona, Vienna), category pills, traveler spotlights, and bottom nav. |
| **P7: Map Detail** | [`MapDetailPage.jsx`](src/pages/MapDetailPage.jsx) | "Best 5 Cafés in Paris" cover gallery, review scores, feature badges, tabs (Overview, Inside, Reviews), and Buy Now trigger. |
| **P8: Stripe Checkout** | [`CheckoutPage.jsx`](src/pages/CheckoutPage.jsx) | Real-time card brand detection, live validation, Stripe PaymentIntent backend integration, and animated receipt modal with Transaction ID copy. |
| **P9: Real Zoomable Map** | [`PurchasedMapView.jsx`](src/pages/PurchasedMapView.jsx) | **Real Zoom In / Zoom Out map** (100%–250%), touch/drag panning, GPS radar pulse marker, 15 Paris locations (5 Museums, 5 Cafés, 5 Places), interactive detail cards, and "My Maps" empty state. |
| **P10: Creators Feed** | [`CreatorsPage.jsx`](src/pages/CreatorsPage.jsx) | Top travel creator directory with follow toggles, verified creator badges, and photo galleries. |
| **P11: Creator Profile** | [`CreatorProfilePage.jsx`](src/pages/CreatorProfilePage.jsx) | Emma Wilson profile with panorama cover, stats, social links, and 2×2 curated map collection. |
| **P12: User Profile** | [`UserProfilePage.jsx`](src/pages/UserProfilePage.jsx) | Alex Parker profile, avatar customization, stats cards, and segmented tabs (My Maps, Favorites, Saved Places, Activity). |
| **P13: Search & Filter** | [`SearchPage.jsx`](src/pages/SearchPage.jsx) | Real-time search across destinations, themes, and maps with instant filtering and empty state handling. |
| **P14: Notifications** | [`NotificationsPage.jsx`](src/pages/NotificationsPage.jsx) | Filterable notifications (All, Unread, Mentions, Purchases) with action links. |
| **P15: Create Map Studio** | [`CreateMapPage.jsx`](src/pages/CreateMapPage.jsx) | Multi-step interactive builder for travelers to design, pin, and publish their own travel maps. |

---

## 🗺️ Interactive Real Map & My Maps Section

Planitory features a dedicated **Real Zoomable Interactive Map Engine**:
- **🔍 Zoom Controls**: Floating `+` (Zoom In) and `−` (Zoom Out) controls with dynamic zoom percentage (100% to 250%).
- **✋ Smooth Pan**: Full touch-drag and mouse-drag panning across Paris streets.
- **📍 15 Specific Paris Landmark Pins**:
  - **🏛️ 5 Museums**: Louvre Museum, Musée d'Orsay, Centre Pompidou, Musée Rodin, Musée de Cluny.
  - **☕ 5 Cafés**: Café de Flore, Les Deux Magots, Carette, Boot Café, Café Kitsuné.
  - **⭐ 5 Places**: Tour Eiffel, Arc de Triomphe, Notre-Dame Cathedral, Place de la Bastille, Montmartre & Sacré-Cœur.
- **🎯 Category Filtering**: Toggle between *All*, *Museums*, *Cafés*, and *Places* with instant pin re-rendering.
- **📭 Empty State**: Dedicated *"You currently have no maps"* view when no purchases exist, with quick explore and demo preview buttons.

---

## 💳 Stripe Payment Gateway Integration

- **Frontend**: Stripe.js client (`src/services/stripe.js`) with live card validation and tokenization.
- **Backend**: Cloudflare Worker endpoint (`/api/create-payment-intent` in `worker/index.js`) creating server-side Stripe PaymentIntents with `STRIPE_SECRET_KEY`.
- **Receipts**: Auto-generated transaction receipt modal with copyable Transaction IDs.

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: React 18, Vite 6, Tailwind CSS 3, Lucide React Icons
- **Backend / Hosting**: Cloudflare Workers with Static Assets Binding (`wrangler.jsonc` + `worker/index.js`)
- **Payments**: Stripe API & Stripe.js (`pk_test_...` client-side / `sk_...` server-side)
- **Database & Auth**: Supabase JS Client & LocalStorage fallback

---

## 📁 Project Structure

```
planitory-app/
├── public/                 # High-resolution map assets & UI illustrations
├── src/
│   ├── pages/              # All 15 screen components
│   │   ├── WelcomePage.jsx
│   │   ├── PhoneNumberPage.jsx
│   │   ├── TravelRegionsPage.jsx
│   │   ├── PreferencesPage.jsx
│   │   ├── TravelGoalsPage.jsx
│   │   ├── ExplorePage.jsx
│   │   ├── MapDetailPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── PurchasedMapView.jsx   # Real Zoomable Map & Empty State
│   │   ├── CreatorsPage.jsx
│   │   ├── CreatorProfilePage.jsx
│   │   ├── UserProfilePage.jsx
│   │   ├── SearchPage.jsx
│   │   ├── NotificationsPage.jsx
│   │   └── CreateMapPage.jsx
│   ├── services/
│   │   ├── stripe.js       # Stripe client service
│   │   └── supabase.js     # Supabase auth service
│   ├── App.jsx             # Main navigation orchestrator & desktop switcher
│   ├── index.css           # Safe-area insets & touch scrolling CSS
│   └── main.jsx
├── worker/
│   └── index.js            # Cloudflare Worker backend API (/api/*) & SPA static asset fallback
├── wrangler.jsonc          # Cloudflare Worker + Assets configuration
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **npm** (v9 or higher)

### 2. Installation

```bash
# Clone the repository
git clone https://github.com/ranjeetkumarguptabro-maker/planitory-app.git

# Navigate to project directory
cd planitory-app

# Install dependencies
npm install
```

### 3. Local Development

```bash
# Run local development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📱 Mobile Device Testing (iOS & Android)

To test directly on an iPhone or Android phone connected to the same Wi-Fi network:

```bash
npm run dev -- --host 0.0.0.0
```

Then open `http://<YOUR_LOCAL_IP>:5173` on your mobile browser (e.g. `http://172.20.10.8:5173`).

---

## ☁️ Cloudflare Deployment Configuration

The repository is configured for Cloudflare Workers with Static Assets:

- **`wrangler.jsonc`**: Automatically runs `npm run build` and binds static assets from `./dist` to `worker/index.js`.
- **Environment Secrets**: Add `STRIPE_SECRET_KEY` in the Cloudflare Dashboard under **Workers & Pages → planitory-app → Settings → Variables and Secrets**.

---

## 📄 License

This project is licensed under the MIT License.
