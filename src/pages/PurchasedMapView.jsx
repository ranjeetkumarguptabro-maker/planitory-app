import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Settings,
  Pencil,
  Navigation,
  Heart,
  MoreVertical,
  Search,
  LayoutGrid,
  Landmark,
  Coffee,
  UtensilsCrossed,
  Trees,
  Camera,
  Crosshair,
  MapPin,
  Footprints,
  Layers,
  Compass,
  Sparkles,
  ExternalLink,
  X,
  Palette,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Volume2,
  CheckCircle2,
  Clock,
  Home,
  Map as MapIcon,
  Plus,
  Users,
  User,
  ShoppingBag
} from 'lucide-react';

// Complete Curated Paris Locations matching the 3D Paris Map Reference
export const TOP_PARIS_LOCATIONS = [
  {
    id: 'flore',
    type: 'cafe',
    name: 'Café de Flore',
    frenchName: 'Café de Flore',
    area: 'Saint-Germain',
    address: '172 Boulevard Saint-Germain, 75006 Paris, France',
    lat: 48.8543,
    lng: 2.3328,
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Cafe+de+Flore+Paris',
    rating: 4.8,
    reviewsCount: '320',
    hours: 'Open 7:30 AM – 1:30 AM',
    distance: '900 m',
    walkTime: '11 min walk',
    turn1: 'In 90m, Turn Right onto Rue Bonaparte',
    turn2: 'Walk 180m south directly to Boulevard Saint-Germain terrace',
    shortDesc: 'Historic café with Parisian charm.',
    description: 'Historic cafe famous for existentialist writers, artisanal thick hot chocolate, and classic red-awning sidewalk terrace.',
    insideHighlights: [
      'Ground Floor Heated Outdoor Terrace',
      'Art Deco Mahogany Booths',
      'Signature Chocolat Chaud Spécial',
      'Fresh Morning Croissants & Brioche'
    ],
    creatorTip: 'Ask for a terrace table under the green foliage and order the hot chocolate served with fresh chantilly cream in a silver pitcher.',
    img: '/c7-photo-cafe-de-flore.png',
    x: 52,
    y: 54,
    color: '#b45309',
    icon: '☕',
  },
  {
    id: 'louvre',
    type: 'museum',
    name: 'Louvre Museum',
    frenchName: 'Musée du Louvre',
    area: '1st Arr.',
    address: 'Rue de Rivoli, 75001 Paris, France',
    lat: 48.8606,
    lng: 2.3376,
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Louvre+Museum+Paris',
    rating: 4.9,
    reviewsCount: '142k',
    hours: 'Open 9:00 AM – 6:00 PM',
    distance: '650 m',
    walkTime: '8 min walk',
    turn1: 'In 120m, Turn Left onto Pont du Carrousel',
    turn2: 'Continue straight into Cour Napoléon Glass Pyramid entrance',
    shortDesc: 'World’s largest art museum & Glass Pyramid.',
    description: 'World’s largest art museum and historic monument home to the Mona Lisa, Venus de Milo, and iconic Glass Pyramid.',
    insideHighlights: [
      'Cour Napoléon & Glass Pyramid',
      'Denon Wing — Mona Lisa Room',
      'Richelieu Wing — French Sculptures',
      'Medieval Moat Underground Walkway'
    ],
    creatorTip: 'Enter via Carrousel du Louvre underground mall for 70% shorter lines in morning hours.',
    img: '/c6-thumb-paris-museums.png',
    x: 74,
    y: 47,
    color: '#6d28d9',
    icon: '🏛️',
  },
  {
    id: 'eiffel',
    type: 'place',
    name: 'Eiffel Tower',
    frenchName: 'La Tour Eiffel',
    area: '7th Arr.',
    address: 'Champ de Mars, 5 Av. Anatole France, 75007 Paris, France',
    lat: 48.8584,
    lng: 2.2945,
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Eiffel+Tower+Paris',
    rating: 4.9,
    reviewsCount: '340k',
    hours: 'Open 9:00 AM – 11:45 PM',
    distance: '1.8 km',
    walkTime: '22 min walk',
    turn1: 'In 250m, Continue along Quai Branly towards riverfront',
    turn2: 'Cross Avenue de la Bourdonnais into Champ de Mars Gate 1',
    shortDesc: 'Iconic Parisian skyline monument.',
    description: 'Paris’s defining global emblem on the Champ de Mars with panoramic views spanning the entire Parisian skyline.',
    insideHighlights: [
      'Champ de Mars Central Lawn',
      '1st Floor Glass Floor Observation Deck',
      '2nd Floor Jules Verne Restaurant View',
      'Summit Skydeck & Gustave Eiffel Office'
    ],
    creatorTip: 'Visit 15 minutes before sunset to catch the golden hour glow followed by the hourly sparkle show.',
    img: '/c18-cover-paris.png',
    x: 13,
    y: 49,
    color: '#059669',
    icon: '⭐',
  },
  {
    id: 'arc',
    type: 'place',
    name: 'Arc de Triomphe',
    frenchName: 'Arc de Triomphe de l’Étoile',
    area: '8th Arr.',
    address: 'Place Charles de Gaulle, 75008 Paris, France',
    lat: 48.8738,
    lng: 2.2950,
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Arc+de+Triomphe+Paris',
    rating: 4.8,
    reviewsCount: '190k',
    hours: 'Open 10:00 AM – 10:30 PM',
    distance: '2.4 km',
    walkTime: '28 min walk',
    turn1: 'In 320m, Head northwest on Avenue des Champs-Élysées',
    turn2: 'Use Passage du Souvenir pedestrian tunnel under the roundabout',
    shortDesc: 'Monumental triumphal arch at Champs-Élysées.',
    description: 'Monumental triumphal arch honoring French military history at the western terminus of the Champs-Élysées with sweeping 360° roof views.',
    insideHighlights: [
      'Tomb of the Unknown Soldier & Eternal Flame',
      'Rooftop 360° Panoramic Terrace',
      'Interior Sculpture & History Museum',
      'Champs-Élysées Central Vista Axis'
    ],
    creatorTip: 'Never try to cross the roundabout traffic above ground; use the pedestrian tunnel from the Champs-Élysées side.',
    img: '/c8-thumb-paris.png',
    x: 15,
    y: 31,
    color: '#6d28d9',
    icon: '🏛️',
  },
  {
    id: 'sacre-coeur',
    type: 'place',
    name: 'Sacré-Cœur',
    frenchName: 'Basilique du Sacré-Cœur de Montmartre',
    area: 'Montmartre',
    address: '35 Rue du Chevalier de la Barre, 75018 Paris, France',
    lat: 48.8867,
    lng: 2.3431,
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Sacre+Coeur+Paris',
    rating: 4.8,
    reviewsCount: '185k',
    hours: 'Open 6:30 AM – 10:30 PM',
    distance: '3.1 km',
    walkTime: '38 min walk',
    turn1: 'In 400m, Take Montmartre Funicular or stairs to hilltop',
    turn2: 'Enter the Basilica main terrace for panoramic Parisian view',
    shortDesc: 'Stunning hilltop basilica in Montmartre.',
    description: 'White-domed basilica crowning the Montmartre butte with the highest natural elevation in Paris.',
    insideHighlights: [
      'Apse Mosaic of Christ in Majesty',
      'Dome Ascent for 360° Paris Panorama',
      'Montmartre Artist Square (Place du Tertre)',
      'Louise Michel Hillside Gardens'
    ],
    creatorTip: 'Climb the Dome for the best sunset view in northern Paris, looking over the Eiffel Tower silhouette.',
    img: '/c15-pop-paris.png',
    x: 62,
    y: 19,
    color: '#6d28d9',
    icon: '🏛️',
  },
  {
    id: 'garnier',
    type: 'museum',
    name: 'Palais Garnier',
    frenchName: 'Opéra Garnier',
    area: '9th Arr.',
    address: 'Pl. de l’Opéra, 75009 Paris, France',
    lat: 48.8719,
    lng: 2.3316,
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Palais+Garnier+Paris',
    rating: 4.9,
    reviewsCount: '88k',
    hours: 'Open 10:00 AM – 5:00 PM',
    distance: '1.4 km',
    walkTime: '17 min walk',
    turn1: 'In 180m, Head north on Avenue de l’Opéra',
    turn2: 'Walk directly to the grand marble entrance rotunda',
    shortDesc: 'Opulent historic Paris opera house.',
    description: 'Masterpiece of 19th-century theater architecture known for its grand marble staircase, gold leaf, and Chagall ceiling.',
    insideHighlights: [
      'Grand Escalier Marble Staircase',
      'Auditorium Marc Chagall Painted Ceiling',
      'Grand Foyer Gilded Ballroom',
      'Phantom of the Opera Underground Box 5'
    ],
    creatorTip: 'Book an afternoon self-guided tour when rehearsals are quiet to photograph the Grand Foyer without crowds.',
    img: '/c6-thumb-paris-museums.png',
    x: 41,
    y: 35,
    color: '#6d28d9',
    icon: '🏛️',
  },
  {
    id: 'notre-dame',
    type: 'place',
    name: 'Notre-Dame',
    frenchName: 'Cathédrale Notre-Dame de Paris',
    area: 'Île de la Cité',
    address: '6 Parvis Notre-Dame - Pl. Jean-Paul II, 75004 Paris, France',
    lat: 48.8530,
    lng: 2.3499,
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Notre-Dame+Cathedral+Paris',
    rating: 4.8,
    reviewsCount: '210k',
    hours: 'Parvis open 8:00 AM – 7:00 PM',
    distance: '1.1 km',
    walkTime: '14 min walk',
    turn1: 'In 140m, Cross Pont d’Arcole to Île de la Cité',
    turn2: 'Walk 90m south into Parvis Jean-Paul II square',
    shortDesc: 'Gothic masterpiece on Île de la Cité.',
    description: 'Masterpiece of French Gothic architecture on Île de la Cité featuring magnificent rose windows and twin western bell towers.',
    insideHighlights: [
      'Parvis Jean-Paul II Main Square',
      'West Façade Portal of the Virgin',
      'South Rose Window & Spire View',
      'Square Jean XXIII Riverside Garden'
    ],
    creatorTip: 'Walk along the south bank of the Seine on Quai de Montebello for the classic postcard view of the flying buttresses.',
    img: '/c15-pop-paris.png',
    x: 86,
    y: 53,
    color: '#eab308',
    icon: '⭐',
  },
  {
    id: 'marais-bistro',
    type: 'restaurant',
    name: 'Le Marais Bistro',
    frenchName: 'Bistrot du Marais',
    area: 'Le Marais',
    address: 'Rue des Rosiers, 75004 Paris, France',
    lat: 48.8575,
    lng: 2.3590,
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Le+Marais+Paris',
    rating: 4.7,
    reviewsCount: '1.2k',
    hours: 'Open 12:00 PM – 11:00 PM',
    distance: '1.3 km',
    walkTime: '16 min walk',
    turn1: 'In 200m, Head northeast along Rue de Rivoli',
    turn2: 'Turn left into Rue Vieille-du-Temple',
    shortDesc: 'Cozy authentic bistro with French classics.',
    description: 'Charming vintage bistro serving boeuf bourguignon, duck confit, and fresh tarte tatin in the vibrant Marais quarter.',
    insideHighlights: ['Zinc Bar & Wine Selection', 'Fresh Baked Tarte Tatin', 'Quiet Courtyard Patio'],
    creatorTip: 'Reserve a table by the window for quintessential Marais people watching.',
    img: '/c7-photo-latte.png',
    x: 61,
    y: 29,
    color: '#e11d48',
    icon: '🍴',
  },
  {
    id: 'luxembourg-park',
    type: 'park',
    name: 'Jardin du Luxembourg',
    frenchName: 'Jardin du Luxembourg',
    area: 'Latin Quarter',
    address: '75006 Paris, France',
    lat: 48.8462,
    lng: 2.3372,
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Jardin+du+Luxembourg+Paris',
    rating: 4.9,
    reviewsCount: '95k',
    hours: 'Open 7:30 AM – 8:00 PM',
    distance: '1.2 km',
    walkTime: '15 min walk',
    turn1: 'In 150m, Walk south along Boulevard Saint-Michel',
    turn2: 'Enter via Medici Fountain gate',
    shortDesc: 'Tree-lined garden with iconic green chairs.',
    description: 'Iconic Parisian park surrounding the Luxembourg Palace featuring tree-lined promenades, the Medici Fountain, and model sailboats.',
    insideHighlights: ['Medici Fountain', 'Palais du Luxembourg Lawn', 'Vintage Sailboat Basin'],
    creatorTip: 'Grab a classic green metal chair by the central grand octagonal basin with a book and croissant.',
    img: '/c14-cover-banner.png',
    x: 69,
    y: 59,
    color: '#15803d',
    icon: '🌲',
  },
  {
    id: 'pont-neuf-view',
    type: 'view',
    name: 'Pont Neuf Viewpoint',
    frenchName: 'Square du Vert-Galant',
    area: 'Île de la Cité',
    address: 'Pont Neuf, 75001 Paris, France',
    lat: 48.8570,
    lng: 2.3413,
    googleMapsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Pont+Neuf+Paris',
    rating: 4.8,
    reviewsCount: '45k',
    hours: 'Open 24 hours',
    distance: '750 m',
    walkTime: '9 min walk',
    turn1: 'In 110m, Walk down stairs at the tip of Pont Neuf',
    turn2: 'Reach weeping willow tree at the western tip of Île de la Cité',
    shortDesc: 'Panoramic Seine River sunset viewpoint.',
    description: 'Romantic riverside square situated at the western tip of the Île de la Cité offering panoramic Seine views and sunset boats.',
    insideHighlights: ['Weeping Willow Riverfront Bench', '360° Sunset River Views', 'Historic Henri IV Statue'],
    creatorTip: 'Bring cheese and fresh baguette around 7 PM to watch the illuminated bateaux-mouches cruise by.',
    img: '/c18-cover-paris.png',
    x: 93,
    y: 46,
    color: '#0284c7',
    icon: '📷',
  },
];

export default function PurchasedMapView({ onBack, onNavigate }) {
  // Check if user has purchased maps from localStorage
  const [purchasedMaps, setPurchasedMaps] = useState(() => {
    try {
      const saved = localStorage.getItem('planitory_purchased_maps');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return ['paris-essentials'];
  });

  const hasPurchased = purchasedMaps.length > 0;

  // Active Category Filter ('all' | 'museum' | 'cafe' | 'restaurant' | 'park' | 'view')
  const [activeCategory, setActiveCategory] = useState('all');

  // Selected Location (Default is Café de Flore to match the reference mockup)
  const [selectedLocation, setSelectedLocation] = useState(() => TOP_PARIS_LOCATIONS[0]);

  // Modals & Map Mode
  const [showDirectionsModal, setShowDirectionsModal] = useState(false);
  const [showInsideModal, setShowInsideModal] = useState(false);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [pinThemeColor, setPinThemeColor] = useState('default');
  const [mapMode, setMapMode] = useState('map'); // 'map' | 'satellite' | '3d'
  const [toastMessage, setToastMessage] = useState(null);

  // In-App Live Walking Navigation State
  const [isNavigating, setIsNavigating] = useState(false);
  const [navProgress, setNavProgress] = useState(0);

  // Live walking step simulation when navigating
  useEffect(() => {
    let interval = null;
    if (isNavigating && selectedLocation) {
      interval = setInterval(() => {
        setNavProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 5;
        });
      }, 700);
    } else {
      setNavProgress(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isNavigating, selectedLocation]);

  // Zoom & Pan Engine State
  const [zoomLevel, setZoomLevel] = useState(1); // 1x to 3.5x
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapContainerRef = useRef(null);

  // Multi-Touch Pinch and Double Tap tracking
  const pinchDistRef = useRef(null);
  const pinchZoomStartRef = useRef(1);
  const lastTapRef = useRef(0);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Zoom In / Out Handlers
  const handleZoomIn = () => {
    setZoomLevel((prev) => {
      const next = Math.min(3.5, Number((prev + 0.35).toFixed(2)));
      showToast(`🔍 Zoom: ${Math.round(next * 100)}%`);
      return next;
    });
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => {
      const next = Math.max(1, Number((prev - 0.35).toFixed(2)));
      if (next === 1) setPanOffset({ x: 0, y: 0 });
      showToast(`🔍 Zoom: ${Math.round(next * 100)}%`);
      return next;
    });
  };

  const handleResetView = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setIsNavigating(false);
    showToast("🧭 Zoom reset & map centered");
  };

  const handleLocateMe = () => {
    setZoomLevel(1.5);
    setPanOffset({ x: 15, y: -10 });
    showToast("📍 GPS: Seine River / Saint-Germain");
  };

  // Select a location pin
  const handleSelectLocation = (loc) => {
    setSelectedLocation(loc);
    // Smooth pan towards the selected pin
    const targetX = -(loc.x - 50) * 2.2;
    const targetY = -(loc.y - 50) * 2.2;
    setPanOffset({ x: targetX, y: targetY });
    showToast(`📍 Selected ${loc.name}`);
  };

  // Option 1: Start In-App Live Walking Navigation
  const handleStartInAppNav = () => {
    if (!selectedLocation) return;
    setShowDirectionsModal(false);
    setShowInsideModal(false);
    setIsNavigating(true);
    setNavProgress(0);
    // Center map on route
    const midX = -((46 + selectedLocation.x) / 2 - 50) * 2.2;
    const midY = -((47 + selectedLocation.y) / 2 - 50) * 2.2;
    setZoomLevel(1.5);
    setPanOffset({ x: midX, y: midY });
    showToast(`🟢 In-App Live Navigation active for ${selectedLocation.name}`);
  };

  const handleStopInAppNav = () => {
    setIsNavigating(false);
    setNavProgress(0);
    showToast("⏹️ In-App Navigation ended");
  };

  // Option 2: Explore Inside Map (In-App Zoom & Highlights)
  const handleExploreInsideMap = () => {
    if (!selectedLocation) return;
    setShowDirectionsModal(false);
    setShowInsideModal(true);
    // Deep zoom into location
    const targetX = -(selectedLocation.x - 50) * 3.2;
    const targetY = -(selectedLocation.y - 50) * 3.2;
    setZoomLevel(2.0);
    setPanOffset({ x: targetX, y: targetY });
    showToast(`🗺️ Exploring inside ${selectedLocation.name}`);
  };

  // Option 3: Open in Google Maps Directions
  const handleOpenGoogleMaps = () => {
    if (!selectedLocation) return;
    const url =
      selectedLocation.googleMapsUrl ||
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        selectedLocation.name + ' ' + selectedLocation.address
      )}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    showToast(`🚀 Opening ${selectedLocation.name} in Google Maps...`);
  };

  // Pan Gestures (Mouse)
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const maxBound = (zoomLevel - 1) * 220;
    const newX = Math.max(-maxBound, Math.min(maxBound, e.clientX - dragStart.x));
    const newY = Math.max(-maxBound, Math.min(maxBound, e.clientY - dragStart.y));
    setPanOffset({ x: newX, y: newY });
  };

  const handleMouseUp = () => setIsDragging(false);

  // Touch Gestures: Single touch Pan + Double Tap Zoom + 2-Finger Pinch to Zoom
  const getTouchDist = (t1, t2) => {
    return Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      // Double tap detector
      const now = Date.now();
      if (now - lastTapRef.current < 320) {
        setZoomLevel((prev) => {
          const next = prev > 1.2 ? 1 : 1.8;
          if (next === 1) setPanOffset({ x: 0, y: 0 });
          showToast(next === 1 ? "Zoom: 100%" : "Zoom: 180%");
          return next;
        });
      }
      lastTapRef.current = now;

      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - panOffset.x,
        y: e.touches[0].clientY - panOffset.y,
      });
      pinchDistRef.current = null;
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      pinchDistRef.current = getTouchDist(e.touches[0], e.touches[1]);
      pinchZoomStartRef.current = zoomLevel;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && pinchDistRef.current) {
      // Pinch to Zoom
      const dist = getTouchDist(e.touches[0], e.touches[1]);
      const factor = dist / pinchDistRef.current;
      const newZoom = Math.min(3.5, Math.max(1, Number((pinchZoomStartRef.current * factor).toFixed(2))));
      setZoomLevel(newZoom);
    } else if (e.touches.length === 1 && isDragging) {
      // Pan
      const maxBound = (zoomLevel - 1) * 220;
      const newX = Math.max(-maxBound, Math.min(maxBound, e.touches[0].clientX - dragStart.x));
      const newY = Math.max(-maxBound, Math.min(maxBound, e.touches[0].clientY - dragStart.y));
      setPanOffset({ x: newX, y: newY });
    }
  };

  const handleTouchEnd = (e) => {
    if (e.touches.length < 2) {
      pinchDistRef.current = null;
    }
    if (e.touches.length === 0) {
      setIsDragging(false);
    }
  };

  // Mouse Wheel Zoom
  const handleWheel = (e) => {
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  // Filter Locations
  const visibleLocations = TOP_PARIS_LOCATIONS.filter(
    (loc) =>
      activeCategory === 'all' ||
      loc.type === activeCategory ||
      (activeCategory === 'museum' && (loc.type === 'museum' || loc.id === 'sacre-coeur' || loc.id === 'arc')) ||
      (activeCategory === 'cafe' && loc.type === 'cafe') ||
      (activeCategory === 'place' && (loc.type === 'place' || loc.type === 'park'))
  );

  // Pin Theme Helper
  const getPinColor = (type, defaultColor) => {
    if (pinThemeColor === 'rose') {
      return type === 'museum' ? '#e11d48' : type === 'cafe' ? '#f43f5e' : '#fb7185';
    }
    if (pinThemeColor === 'emerald') {
      return type === 'museum' ? '#059669' : type === 'cafe' ? '#10b981' : '#34d399';
    }
    if (pinThemeColor === 'sunset') {
      return type === 'museum' ? '#d97706' : type === 'cafe' ? '#f59e0b' : '#fbbf24';
    }
    return defaultColor || (type === 'museum' ? '#6d28d9' : type === 'cafe' ? '#b45309' : '#059669');
  };

  return (
    <div className="relative w-full h-full min-h-0 overflow-hidden bg-[#fafbfe] sm:rounded-[44px] flex flex-col justify-between select-none">
      {/* ========================================================= */}
      {/* SCENARIO A: USER HAS NO PURCHASED MAPS (EMPTY STATE)     */}
      {/* ========================================================= */}
      {!hasPurchased && (
        <div className="flex-1 flex flex-col justify-between">
          {/* Top Header */}
          <div className="w-full pt-3 sm:pt-4 px-6 z-20 shrink-0 bg-[#fafbfe]/95 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs font-semibold text-[#0f1738] mb-2 px-1">
              <span className="text-[13px] tracking-tight font-bold">9:41</span>
              <div className="flex items-center gap-1.5">
                <div className="flex items-end gap-[1.5px] h-3">
                  <div className="w-[3px] h-1 bg-[#0f1738] rounded-[0.5px]" />
                  <div className="w-[3px] h-1.5 bg-[#0f1738] rounded-[0.5px]" />
                  <div className="w-[3px] h-2 bg-[#0f1738] rounded-[0.5px]" />
                  <div className="w-[3px] h-3 bg-[#0f1738] rounded-[0.5px]" />
                </div>
                <div className="w-5 h-2.5 border border-[#0f1738] rounded-[3px] p-[1px] flex items-center">
                  <div className="w-full h-full bg-[#0f1738] rounded-[1px]" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between py-1">
              <button
                onClick={onBack}
                className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-[#0f1738] hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
                title="Go back"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.4]" />
              </button>
              <h1 className="text-[18px] font-extrabold text-[#0f1738] tracking-tight">
                My Maps
              </h1>
              <div className="w-10" />
            </div>
          </div>

          {/* Empty State Body */}
          <div className="flex-1 flex flex-col items-center justify-center px-6 text-center space-y-4 -mt-10">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-indigo-100 to-indigo-50 flex items-center justify-center shadow-inner border border-indigo-100">
                <MapIcon className="w-11 h-11 text-[#544ee5] stroke-[1.8]" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-[#544ee5] text-white flex items-center justify-center shadow-lg shadow-indigo-300">
                <Compass className="w-5 h-5 animate-spin-slow stroke-[2.2]" />
              </div>
            </div>

            <div className="space-y-1.5 max-w-xs">
              <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-[#544ee5] text-[11px] font-bold tracking-wide uppercase">
                0 Active Maps
              </div>
              <h2 className="text-[20px] font-black text-[#0f1738] tracking-tight">
                You currently have no maps
              </h2>
              <p className="text-[13px] text-[#717ea1] font-medium leading-relaxed">
                Explore curated maps handcrafted by local creators. Unlock offline navigation, secret spots, and custom itineraries.
              </p>
            </div>

            <div className="w-full max-w-xs space-y-2.5 pt-2">
              <button
                onClick={() => onNavigate && onNavigate('explore')}
                className="w-full py-3.5 bg-[#544ee5] hover:bg-[#4842db] active:scale-[0.99] text-white font-bold rounded-2xl text-[14px] shadow-lg shadow-indigo-300/40 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Explore Maps</span>
              </button>

              <button
                onClick={() => {
                  setPurchasedMaps(['paris-essentials']);
                  localStorage.setItem('planitory_purchased_maps', JSON.stringify(['paris-essentials']));
                  showToast("✨ Paris Essentials unlocked with full 3D map!");
                }}
                className="w-full py-3 bg-white border border-[#e4e8f7] hover:border-indigo-200 active:scale-[0.99] text-[#544ee5] font-bold rounded-2xl text-[13px] shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Try Sample Paris Map</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SCENARIO B: REAL 3D ILLUSTRATED WORKING INTERACTIVE MAP   */}
      {/* ========================================================= */}
      {hasPurchased && (
        <div className="flex-1 flex flex-col justify-between h-full min-h-0 overflow-hidden">
          {/* ===================================================== */}
          {/* 1. TOP HEADER & CATEGORY FILTER ROW (MATCHING MOCKUP) */}
          {/* ===================================================== */}
          <div className="w-full pt-3 sm:pt-4 px-4 sm:px-5 z-30 shrink-0 bg-[#fafbfe]/95 backdrop-blur-md">
            {/* iOS Status Bar */}
            <div className="flex items-center justify-between text-xs font-semibold text-[#0f1738] mb-1.5 px-1">
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

            {/* Title Bar with Circular Action Buttons */}
            <div className="flex items-center justify-between py-1">
              {/* Circular Back Button */}
              <button
                onClick={onBack}
                className="w-10 h-10 rounded-full bg-white shadow-[0_2px_8px_rgba(50,70,140,0.06)] border border-slate-100 flex items-center justify-center text-[#0f1738] hover:bg-slate-50 active:scale-95 transition-all cursor-pointer shrink-0"
                title="Go back"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.4]" />
              </button>

              {/* Center Title with Eiffel Icon Badge */}
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-[#faf4ea] border border-[#f0e2cd] flex items-center justify-center text-sm shadow-2xs">
                    🗼
                  </div>
                  <h1 className="text-[20px] font-extrabold text-[#0f1738] tracking-tight font-serif leading-tight">
                    Paris Essentials
                  </h1>
                </div>
                <p className="text-[11.5px] text-[#717ea1] font-medium tracking-tight mt-0.5">
                  Museums &bull; Cafés &bull; Top Places
                </p>
              </div>

              {/* Right Action Buttons (Favorite + More) */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => showToast("❤️ Saved Paris Essentials to Favorites")}
                  className="w-10 h-10 rounded-full bg-white shadow-[0_2px_8px_rgba(50,70,140,0.06)] border border-slate-100 flex items-center justify-center text-[#0f1738] hover:text-[#544ee5] active:scale-95 transition-all cursor-pointer"
                  title="Favorite map"
                >
                  <Heart className="w-4.5 h-4.5 stroke-[2]" />
                </button>

                <button
                  onClick={() => setShowCustomizeModal(true)}
                  className="w-10 h-10 rounded-full bg-white shadow-[0_2px_8px_rgba(50,70,140,0.06)] border border-slate-100 flex items-center justify-center text-[#0f1738] hover:text-[#544ee5] active:scale-95 transition-all cursor-pointer"
                  title="Map Options"
                >
                  <MoreVertical className="w-4.5 h-4.5 stroke-[2]" />
                </button>
              </div>
            </div>

            {/* Category Filter Pills (Horizontal Scrollable) */}
            <div className="flex items-center gap-2 py-2 overflow-x-auto scrollbar-none">
              {/* All */}
              <button
                onClick={() => {
                  setActiveCategory('all');
                  showToast("Showing All Highlights");
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl font-bold text-[12.5px] transition-all cursor-pointer shrink-0 ${
                  activeCategory === 'all'
                    ? 'bg-[#0f1738] text-white shadow-md'
                    : 'bg-white text-[#0f1738] border border-slate-100 shadow-2xs hover:bg-slate-50'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span>All</span>
              </button>

              {/* Museums */}
              <button
                onClick={() => {
                  setActiveCategory('museum');
                  showToast("Showing Museums");
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl font-bold text-[12.5px] transition-all cursor-pointer shrink-0 ${
                  activeCategory === 'museum'
                    ? 'bg-[#0f1738] text-white shadow-md'
                    : 'bg-white text-[#0f1738] border border-slate-100 shadow-2xs hover:bg-slate-50'
                }`}
              >
                <Landmark className="w-4 h-4 text-purple-600" />
                <span>Museums</span>
              </button>

              {/* Cafes */}
              <button
                onClick={() => {
                  setActiveCategory('cafe');
                  const flore = TOP_PARIS_LOCATIONS.find((l) => l.id === 'flore');
                  if (flore) handleSelectLocation(flore);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl font-bold text-[12.5px] transition-all cursor-pointer shrink-0 ${
                  activeCategory === 'cafe'
                    ? 'bg-[#0f1738] text-white shadow-md'
                    : 'bg-white text-[#0f1738] border border-slate-100 shadow-2xs hover:bg-slate-50'
                }`}
              >
                <Coffee className="w-4 h-4 text-amber-700" />
                <span>Cafés</span>
              </button>

              {/* Restaurants */}
              <button
                onClick={() => {
                  setActiveCategory('restaurant');
                  showToast("Showing Restaurants");
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl font-bold text-[12.5px] transition-all cursor-pointer shrink-0 ${
                  activeCategory === 'restaurant'
                    ? 'bg-[#0f1738] text-white shadow-md'
                    : 'bg-white text-[#0f1738] border border-slate-100 shadow-2xs hover:bg-slate-50'
                }`}
              >
                <UtensilsCrossed className="w-4 h-4 text-rose-600" />
                <span>Restaurants</span>
              </button>

              {/* Parks */}
              <button
                onClick={() => {
                  setActiveCategory('park');
                  showToast("Showing Parks & Gardens");
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl font-bold text-[12.5px] transition-all cursor-pointer shrink-0 ${
                  activeCategory === 'park'
                    ? 'bg-[#0f1738] text-white shadow-md'
                    : 'bg-white text-[#0f1738] border border-slate-100 shadow-2xs hover:bg-slate-50'
                }`}
              >
                <Trees className="w-4 h-4 text-emerald-600" />
                <span>Parks</span>
              </button>

              {/* Views */}
              <button
                onClick={() => {
                  setActiveCategory('view');
                  showToast("Showing Photo & View Points");
                }}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl font-bold text-[12.5px] transition-all cursor-pointer shrink-0 ${
                  activeCategory === 'view'
                    ? 'bg-[#0f1738] text-white shadow-md'
                    : 'bg-white text-[#0f1738] border border-slate-100 shadow-2xs hover:bg-slate-50'
                }`}
              >
                <Camera className="w-4 h-4 text-blue-500" />
                <span>Views</span>
              </button>
            </div>
          </div>

          {/* ===================================================== */}
          {/* 2. 3D PARIS MAP CANVAS + INTERACTIVE OVERLAY CONTROLS */}
          {/* ===================================================== */}
          <div className="flex-1 min-h-0 flex flex-col justify-between px-3 sm:px-4 relative overflow-hidden pb-1">
            {/* Real Interactive Map Canvas Card */}
            <div
              ref={mapContainerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onWheel={handleWheel}
              className={`relative w-full flex-1 rounded-[26px] overflow-hidden shadow-[0_8px_24px_rgba(50,70,140,0.08)] border border-[#e4e8f7] ${
                isDragging ? 'cursor-grabbing' : 'cursor-grab'
              } touch-none bg-[#e8f1f5]`}
            >
              {/* Zoomable & Pannable Inner Map Layer */}
              <div
                style={{
                  transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
                  transformOrigin: 'center center',
                  transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.2, 0, 0, 1)',
                }}
                className="relative w-full h-full"
              >
                {/* 3D Paris Map Graphic */}
                <img
                  src="/paris-3d-map-bg.png"
                  alt="3D Paris Street Map"
                  className="w-full h-full object-cover pointer-events-none select-none"
                  draggable={false}
                />

                {/* Pulsing Blue Live GPS Radar User Beacon (Seine River) */}
                <div
                  style={{
                    left: '46%',
                    top: '47%',
                    transform: `translate(-50%, -50%) scale(${1 / Math.max(1, zoomLevel)})`,
                    transformOrigin: 'center center',
                  }}
                  className="absolute pointer-events-none z-10"
                >
                  <div className="w-16 h-16 -ml-8 -mt-8 absolute top-1/2 left-1/2 rounded-full bg-blue-400/20 animate-ping" />
                  <div className="w-10 h-10 -ml-5 -mt-5 absolute top-1/2 left-1/2 rounded-full bg-blue-500/25 animate-pulse" />
                  <div className="w-4 h-4 rounded-full bg-[#3b82f6] ring-3 ring-white shadow-lg relative z-10 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  </div>
                </div>

                {/* Route Line when Pin is Focused / Navigating */}
                {selectedLocation && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none z-15">
                    <line
                      x1="46%"
                      y1="47%"
                      x2={`${selectedLocation.x}%`}
                      y2={`${selectedLocation.y}%`}
                      stroke={isNavigating ? '#10b981' : '#544ee5'}
                      strokeWidth={isNavigating ? 3.5 / zoomLevel : 2.5 / zoomLevel}
                      strokeDasharray={`${5 / zoomLevel} ${5 / zoomLevel}`}
                      className="animate-pulse"
                    />
                  </svg>
                )}

                {/* Live Animated Walker Marker when In-App Navigating */}
                {isNavigating && selectedLocation && (
                  <div
                    style={{
                      left: `${46 + (selectedLocation.x - 46) * (navProgress / 100)}%`,
                      top: `${47 + (selectedLocation.y - 47) * (navProgress / 100)}%`,
                      transform: `translate(-50%, -50%) scale(${1 / Math.max(1, zoomLevel)})`,
                      transformOrigin: 'center center',
                    }}
                    className="absolute z-25 pointer-events-none transition-all duration-300"
                  >
                    <div className="w-9 h-9 -ml-4.5 -mt-4.5 absolute top-1/2 left-1/2 rounded-full bg-emerald-500/30 animate-ping" />
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white ring-2 ring-white shadow-lg flex items-center justify-center text-xs">
                      <Footprints className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </div>
                )}

                {/* Interactive Curated Map Pins (Scale Compensated) */}
                {visibleLocations.map((loc) => {
                  const isSelected = selectedLocation?.id === loc.id;
                  const pinBg = getPinColor(loc.type, loc.color);

                  return (
                    <div
                      key={loc.id}
                      style={{
                        left: `${loc.x}%`,
                        top: `${loc.y}%`,
                        transform: `translate(-50%, -50%) scale(${(isSelected ? 1.15 : 1) / Math.max(1, zoomLevel)})`,
                        transformOrigin: 'center center',
                      }}
                      className="absolute z-20 transition-transform duration-200"
                    >
                      {/* Floating Callout Tooltip anchored above selected pin (Matches Café de Flore in mockup) */}
                      {isSelected && !isNavigating && (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowDirectionsModal(true);
                          }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3.5 z-40 bg-white rounded-[20px] p-2.5 shadow-[0_12px_30px_rgba(0,0,0,0.18)] border border-slate-100 flex items-center gap-2.5 min-w-[215px] max-w-[250px] cursor-pointer hover:shadow-2xl active:scale-95 transition-all animate-in zoom-in-95 duration-200"
                        >
                          <img
                            src={loc.img}
                            alt={loc.name}
                            className="w-12 h-12 rounded-xl object-cover shrink-0 shadow-2xs border border-black/5"
                          />
                          <div className="flex-1 min-w-0 pr-1">
                            <h4 className="font-black text-[13px] text-[#0f1738] leading-tight truncate">
                              {loc.name}
                            </h4>
                            <p className="text-[10px] text-[#717ea1] truncate leading-tight mt-0.5">
                              {loc.shortDesc || loc.description}
                            </p>
                            <div className="flex items-center gap-1 text-[11px] font-black text-amber-500 mt-0.5">
                              <span>★ {loc.rating}</span>
                              <span className="text-slate-400 font-medium text-[10px]">
                                ({loc.reviewsCount || '320'})
                              </span>
                            </div>
                          </div>
                          <div className="w-7 h-7 rounded-full bg-indigo-50 text-[#544ee5] flex items-center justify-center shrink-0">
                            <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                          </div>
                          {/* Triangle Pointer */}
                          <div className="w-3 h-3 bg-white rotate-45 border-r border-b border-slate-100 absolute -bottom-1.5 left-1/2 -translate-x-1/2" />
                        </div>
                      )}

                      {/* Pin Marker Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectLocation(loc);
                        }}
                        style={{ backgroundColor: pinBg }}
                        className={`w-8 h-8 rounded-full text-white flex items-center justify-center text-xs shadow-lg ring-2 ring-white cursor-pointer transition-all hover:scale-110 active:scale-95 ${
                          isSelected ? 'ring-3 ring-indigo-400 shadow-2xl scale-110' : ''
                        }`}
                        title={loc.name}
                      >
                        <span className="text-[13px] leading-none select-none">{loc.icon}</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Floating Map Overlay Elements */}

              {/* Top Left: Search this area pill */}
              <div
                onClick={() => showToast("🔍 Searching Paris area landmarks...")}
                className="absolute top-3 left-3 z-30 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] border border-slate-100/80 text-xs text-[#0f1738] font-bold cursor-pointer hover:bg-white active:scale-95 transition-all"
              >
                <Search className="w-3.5 h-3.5 text-slate-500 stroke-[2.4]" />
                <span className="text-[12px] font-bold">Search this area</span>
              </div>

              {/* Live Zoom Percentage Badge */}
              {zoomLevel > 1 && (
                <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 px-3 py-1 rounded-full bg-black/75 backdrop-blur-xs text-white text-[11px] font-black shadow-md pointer-events-none animate-in fade-in duration-150 border border-white/20">
                  {Math.round(zoomLevel * 100)}% Zoom
                </div>
              )}

              {/* Top Right: Vertical Control Stack with Dedicated Zoom Buttons */}
              <div className="absolute top-3 right-3 z-30 flex flex-col gap-1.5">
                {/* Dedicated Zoom In (+) Button */}
                <button
                  onClick={handleZoomIn}
                  className="w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-md shadow-[0_3px_12px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center text-[#0f1738] hover:text-[#544ee5] active:scale-90 transition-all cursor-pointer"
                  title="Zoom In (+)"
                  aria-label="Zoom In"
                >
                  <ZoomIn className="w-5 h-5 stroke-[2.4]" />
                </button>

                {/* Dedicated Zoom Out (-) Button */}
                <button
                  onClick={handleZoomOut}
                  className="w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-md shadow-[0_3px_12px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center text-[#0f1738] hover:text-[#544ee5] active:scale-90 transition-all cursor-pointer"
                  title="Zoom Out (-)"
                  aria-label="Zoom Out"
                >
                  <ZoomOut className="w-5 h-5 stroke-[2.4]" />
                </button>

                {/* Reset Zoom Button */}
                {(zoomLevel > 1 || panOffset.x !== 0 || panOffset.y !== 0) && (
                  <button
                    onClick={handleResetView}
                    className="w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-md shadow-[0_3px_12px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center text-[#0f1738] hover:text-[#544ee5] active:scale-90 transition-all cursor-pointer animate-in fade-in"
                    title="Reset Map View"
                    aria-label="Reset Map View"
                  >
                    <RotateCcw className="w-4 h-4 stroke-[2.2]" />
                  </button>
                )}

                {/* GPS Locate Button */}
                <button
                  onClick={handleLocateMe}
                  className="w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-md shadow-[0_3px_12px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center text-[#544ee5] hover:scale-105 active:scale-90 transition-all cursor-pointer"
                  title="Locate my position"
                  aria-label="Locate GPS Position"
                >
                  <Crosshair className="w-5 h-5 stroke-[2.4]" />
                </button>

                {/* Layers Mode Toggle */}
                <button
                  onClick={() => {
                    const nextMode = mapMode === 'map' ? 'satellite' : mapMode === 'satellite' ? '3d' : 'map';
                    setMapMode(nextMode);
                    showToast(`View Mode: ${nextMode.toUpperCase()}`);
                  }}
                  className="w-10 h-10 rounded-2xl bg-white/95 backdrop-blur-md shadow-[0_3px_12px_rgba(0,0,0,0.12)] border border-slate-100 flex items-center justify-center text-[#0f1738] hover:text-[#544ee5] active:scale-90 transition-all cursor-pointer"
                  title="Toggle Layers"
                  aria-label="Toggle Layers"
                >
                  <Layers className="w-5 h-5 stroke-[2.2]" />
                </button>
              </div>

              {/* Bottom Left: Gradient "Customize Map" Pill */}
              <button
                onClick={() => setShowCustomizeModal(true)}
                className="absolute bottom-3 left-3 z-30 bg-gradient-to-r from-[#5a50ec] to-[#746af4] text-white px-4 py-2.5 rounded-2xl shadow-[0_4px_16px_rgba(90,80,236,0.35)] flex items-center gap-2 text-[12.5px] font-bold active:scale-95 hover:shadow-indigo-400/50 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Customize Map</span>
              </button>

              {/* Bottom Right: Map View Mode Switcher Pill */}
              <div className="absolute bottom-3 right-3 z-30 bg-white/95 backdrop-blur-md p-1 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.08)] border border-slate-100 flex items-center gap-1 text-[11.5px] font-bold">
                <button
                  onClick={() => setMapMode('map')}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    mapMode === 'map'
                      ? 'bg-[#0f1738] text-white shadow-xs'
                      : 'text-[#717ea1] hover:text-[#0f1738]'
                  }`}
                >
                  Map
                </button>
                <button
                  onClick={() => setMapMode('satellite')}
                  className={`px-2.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                    mapMode === 'satellite'
                      ? 'bg-[#0f1738] text-white shadow-xs'
                      : 'text-[#717ea1] hover:text-[#0f1738]'
                  }`}
                >
                  Satellite
                </button>
                <button
                  onClick={() => setMapMode('3d')}
                  className={`px-2.5 py-1.5 rounded-xl transition-all cursor-pointer ${
                    mapMode === '3d'
                      ? 'bg-[#0f1738] text-white shadow-xs'
                      : 'text-[#717ea1] hover:text-[#0f1738]'
                  }`}
                >
                  3D
                </button>
              </div>

              {/* In-App Live Navigation Active Top Turn Banner */}
              {isNavigating && selectedLocation && (
                <div className="absolute top-3 left-3 right-14 z-40 bg-[#0f1738]/95 backdrop-blur-md text-white p-3 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center justify-between animate-in slide-in-from-top duration-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <Navigation className="w-4 h-4 fill-current rotate-45" />
                    </div>
                    <div className="flex-1 min-w-0 pr-1">
                      <div className="text-[11.5px] font-black text-emerald-300 leading-tight">
                        {selectedLocation.turn1}
                      </div>
                      <div className="text-[10px] text-slate-300 font-medium truncate mt-0.5">
                        {selectedLocation.turn2}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleStopInAppNav}
                    className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white cursor-pointer shrink-0"
                    title="Exit Navigation"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* ===================================================== */}
            {/* 3. BOTTOM SHEET DRAWER (MATCHING REFERENCE MOCKUP)    */}
            {/* ===================================================== */}
            <div className="w-full bg-white rounded-t-[28px] p-3.5 sm:p-4 shadow-[0_-4px_24px_rgba(50,70,140,0.06)] border border-[#e8ecf8] space-y-3 mt-2 shrink-0">
              {/* Top Drag Handle Pill */}
              <div className="w-10 h-1 rounded-full bg-slate-200 mx-auto -mt-1 mb-1.5" />

              {/* In-App Live Navigation HUD OR Selected Place Card */}
              {isNavigating && selectedLocation ? (
                <div className="w-full bg-[#0f1738] text-white rounded-2xl p-3.5 shadow-xl border border-emerald-500/30 space-y-2.5 animate-in slide-in-from-bottom duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                        In-App Walking Navigation
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-slate-300">
                      {selectedLocation.name}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-white/5 p-2 rounded-xl border border-white/5">
                    <div>
                      <div className="text-[9.5px] text-slate-400 font-semibold uppercase">Remaining</div>
                      <div className="text-[15px] font-black text-white">{selectedLocation.distance}</div>
                    </div>
                    <div>
                      <div className="text-[9.5px] text-slate-400 font-semibold uppercase">Est. Walk Time</div>
                      <div className="text-[15px] font-black text-emerald-400">{selectedLocation.walkTime}</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={handleOpenGoogleMaps}
                      className="flex-1 py-2 px-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-white/10"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Open in Google Maps</span>
                    </button>

                    <button
                      onClick={handleStopInAppNav}
                      className="py-2 px-3.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-bold rounded-xl text-xs transition-all cursor-pointer border border-rose-500/30"
                    >
                      End
                    </button>
                  </div>
                </div>
              ) : selectedLocation ? (
                /* Selected Location Card (Café de Flore) */
                <div className="flex items-center justify-between gap-3 p-1">
                  <img
                    src={selectedLocation.img}
                    alt={selectedLocation.name}
                    className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl object-cover shrink-0 shadow-sm border border-black/5"
                  />

                  <div className="flex-1 min-w-0 pr-1">
                    <h3 className="font-bold font-serif text-[17px] text-[#0f1738] leading-tight truncate">
                      {selectedLocation.name}
                    </h3>
                    <p className="text-[11.5px] text-[#717ea1] truncate mt-0.5 font-medium">
                      {selectedLocation.shortDesc || selectedLocation.description}
                    </p>

                    <div className="flex items-center gap-2 text-[11px] text-[#717ea1] font-semibold mt-1.5 flex-wrap">
                      <span className="text-amber-500 font-bold flex items-center gap-0.5">
                        ★ {selectedLocation.rating}{' '}
                        <span className="text-slate-400 font-normal">
                          ({selectedLocation.reviewsCount || '320'})
                        </span>
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-0.5 text-slate-600">
                        <MapPin className="w-3 h-3 text-[#544ee5]" />
                        {selectedLocation.area || 'Saint-Germain'}
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-0.5 text-slate-500">
                        <Clock className="w-3 h-3" />
                        ~1–2 hours
                      </span>
                    </div>
                  </div>

                  {/* "View Details →" Action Pill */}
                  <button
                    onClick={() => setShowDirectionsModal(true)}
                    className="px-3.5 py-2.5 rounded-2xl bg-[#eef1fd] hover:bg-[#e2e7fc] text-[#544ee5] font-bold text-[12px] flex items-center gap-1.5 shrink-0 active:scale-95 transition-all cursor-pointer shadow-2xs"
                  >
                    <span>View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              ) : null}

              {/* 3 Interactive Category Stat Summary Cards */}
              <div className="grid grid-cols-3 gap-2.5 pt-1">
                {/* 5 Museums */}
                <button
                  onClick={() => {
                    setActiveCategory('museum');
                    const louvre = TOP_PARIS_LOCATIONS.find((l) => l.id === 'louvre');
                    if (louvre) handleSelectLocation(louvre);
                  }}
                  className={`p-2.5 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                    activeCategory === 'museum'
                      ? 'bg-indigo-100/80 border-2 border-indigo-600 shadow-sm'
                      : 'bg-[#f5f4ff] border border-indigo-100/60 hover:bg-indigo-50/80'
                  }`}
                >
                  <Landmark className="w-4.5 h-4.5 text-purple-600 mb-1" />
                  <span className="text-[16px] font-black text-[#0f1738] leading-none">5</span>
                  <span className="text-[10.5px] font-semibold text-[#717ea1] mt-0.5">Museums</span>
                </button>

                {/* 5 Cafés */}
                <button
                  onClick={() => {
                    setActiveCategory('cafe');
                    const flore = TOP_PARIS_LOCATIONS.find((l) => l.id === 'flore');
                    if (flore) handleSelectLocation(flore);
                  }}
                  className={`p-2.5 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                    activeCategory === 'cafe'
                      ? 'bg-orange-100/80 border-2 border-orange-600 shadow-sm'
                      : 'bg-[#fdf4f0] border border-orange-100/60 hover:bg-orange-50/80'
                  }`}
                >
                  <Coffee className="w-4.5 h-4.5 text-amber-700 mb-1" />
                  <span className="text-[16px] font-black text-[#0f1738] leading-none">5</span>
                  <span className="text-[10.5px] font-semibold text-[#717ea1] mt-0.5">Cafés</span>
                </button>

                {/* 15 Places */}
                <button
                  onClick={() => {
                    setActiveCategory('place');
                    showToast("Showing 15 Paris Landmark Places");
                  }}
                  className={`p-2.5 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                    activeCategory === 'place'
                      ? 'bg-emerald-100/80 border-2 border-emerald-600 shadow-sm'
                      : 'bg-[#f0f9f4] border border-emerald-100/60 hover:bg-emerald-50/80'
                  }`}
                >
                  <Trees className="w-4.5 h-4.5 text-emerald-600 mb-1" />
                  <span className="text-[16px] font-black text-[#0f1738] leading-none">15</span>
                  <span className="text-[10.5px] font-semibold text-[#717ea1] mt-0.5">Places</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 🚀 THREE OPTIONS MODAL: "INSIDE MAP" vs "GOOGLE MAPS"     */}
      {/* ========================================================= */}
      {showDirectionsModal && selectedLocation && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-indigo-50 space-y-4 animate-in slide-in-from-bottom duration-200">
            {/* Header with Photo Thumbnail */}
            <div className="flex items-start gap-3 pb-2 border-b border-slate-100">
              <img
                src={selectedLocation.img}
                alt={selectedLocation.name}
                className="w-14 h-14 rounded-2xl object-cover shadow-sm border border-black/5 shrink-0"
              />
              <div className="flex-1 min-w-0 pr-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs">{selectedLocation.icon}</span>
                  <h3 className="font-black text-[15px] text-[#0f1738] truncate">
                    {selectedLocation.name}
                  </h3>
                </div>
                <p className="text-[11px] text-[#717ea1] font-medium truncate">
                  {selectedLocation.frenchName} &bull; {selectedLocation.area}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10.5px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Footprints className="w-3 h-3" />
                    <span>
                      {selectedLocation.walkTime} ({selectedLocation.distance})
                    </span>
                  </span>
                  <span className="text-[10.5px] font-bold text-amber-500">
                    ★ {selectedLocation.rating}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowDirectionsModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Location Description */}
            <p className="text-[11.5px] text-[#556080] leading-relaxed">
              {selectedLocation.description}
            </p>

            {/* Creator Tip Badge */}
            <div className="p-2.5 rounded-2xl bg-[#f5f3ff] border border-indigo-100 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#544ee5] shrink-0 mt-0.5" />
              <div className="text-[11px] text-[#4b43c6] leading-tight">
                <strong className="font-bold">Creator Tip:</strong> {selectedLocation.creatorTip}
              </div>
            </div>

            {/* THREE DIRECTION & EXPLORATION OPTIONS */}
            <div className="space-y-2 pt-1">
              {/* Option 1: Start In-App Live Walking Navigation */}
              <button
                onClick={handleStartInAppNav}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold rounded-2xl text-[13.5px] shadow-md shadow-emerald-200 flex items-center justify-between cursor-pointer transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center">
                    <Navigation className="w-4 h-4 fill-current rotate-45" />
                  </div>
                  <span>Start In-App Navigation</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] bg-white/20 px-2 py-0.5 rounded-full">
                  <span>{selectedLocation.walkTime}</span>
                </div>
              </button>

              {/* Option 2: Get Direction in Google Maps */}
              <button
                onClick={handleOpenGoogleMaps}
                className="w-full py-3 px-4 bg-white border border-[#e2e7f5] hover:border-emerald-300 hover:bg-emerald-50/40 active:scale-[0.99] text-[#0f1738] font-bold rounded-2xl text-[13.5px] shadow-xs flex items-center justify-between cursor-pointer transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                  <span>Get Direction in Google Maps</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400" />
              </button>

              {/* Option 3: Explore Inside Highlights & Audio */}
              <button
                onClick={handleExploreInsideMap}
                className="w-full py-3 px-4 bg-[#544ee5] hover:bg-[#4842db] active:scale-[0.99] text-white font-bold rounded-2xl text-[13.5px] shadow-md shadow-indigo-200 flex items-center justify-between cursor-pointer transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-white/20 flex items-center justify-center">
                    <MapIcon className="w-3.5 h-3.5" />
                  </div>
                  <span>Explore Inside Highlights &amp; Audio</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 🏛️ INSIDE MAP HIGHLIGHTS DRAWER                          */}
      {/* ========================================================= */}
      {showInsideModal && selectedLocation && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-end justify-center p-3 animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl border border-indigo-50 space-y-3.5 max-h-[85vh] overflow-y-auto scrollbar-none">
            <div className="flex justify-between items-center pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-base">{selectedLocation.icon}</span>
                <h3 className="font-black text-[16px] text-[#0f1738]">
                  Inside {selectedLocation.name}
                </h3>
              </div>
              <button
                onClick={() => setShowInsideModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Cover Hero Photo */}
            <div className="relative w-full h-32 rounded-2xl overflow-hidden shadow-inner border border-black/5">
              <img
                src={selectedLocation.img}
                alt={selectedLocation.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-xs text-white text-[10.5px] font-bold flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-red-400" />
                <span>{selectedLocation.address}</span>
              </div>
            </div>

            {/* Key Highlights Checklist */}
            <div className="space-y-1.5">
              <span className="text-[12px] font-extrabold text-[#0f1738] block">
                Must-See Highlights &amp; Spots
              </span>
              <div className="space-y-1.5">
                {selectedLocation.insideHighlights?.map((hl, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-[11.5px] font-semibold text-[#1f2937] flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#544ee5] shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Audio Tip Bar */}
            <div className="p-3 rounded-2xl bg-indigo-50/90 border border-indigo-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#544ee5] text-white flex items-center justify-center shadow-sm shrink-0">
                  <Volume2 className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[12px] font-extrabold text-[#0f1738]">
                    Audio Guide &bull; {selectedLocation.name}
                  </div>
                  <div className="text-[10px] text-[#717ea1] flex items-center gap-1.5 mt-0.5">
                    <span>{selectedLocation.walkTime}</span>
                    <span>&bull;</span>
                    <span className="text-emerald-600 font-bold">Curated Story Active</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  showToast(`🎧 Playing narrated audio guide for ${selectedLocation.name}`);
                }}
                className="px-3.5 py-1.5 bg-[#544ee5] text-white font-bold text-[11.5px] rounded-xl shadow-xs hover:bg-[#4842db] active:scale-95 cursor-pointer transition-all shrink-0"
              >
                Play Audio 🔊
              </button>
            </div>

            {/* Bottom Actions */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={handleOpenGoogleMaps}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-[12.5px] shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 fill-current rotate-45" />
                <span>Navigate in Google Maps</span>
              </button>

              <button
                onClick={() => setShowInsideModal(false)}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl text-[12.5px] cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MAP CUSTOMIZATION MODAL                                  */}
      {/* ========================================================= */}
      {showCustomizeModal && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-end sm:items-center justify-center p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-indigo-50 space-y-4">
            <div className="flex justify-between items-center pb-1 border-b border-slate-100">
              <div className="flex items-center gap-2 text-[#544ee5]">
                <Palette className="w-5 h-5" />
                <h3 className="font-bold text-[#111936] text-base">Customize Map Style</h3>
              </div>
              <button
                onClick={() => setShowCustomizeModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-700 block mb-2">
                Pin &amp; Landmark Theme
              </span>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'default', name: 'Original', bg: 'bg-[#544ee5]' },
                  { id: 'rose', name: 'Pastel', bg: 'bg-[#e11d48]' },
                  { id: 'emerald', name: 'Emerald', bg: 'bg-[#059669]' },
                  { id: 'sunset', name: 'Sunset', bg: 'bg-[#d97706]' },
                ].map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setPinThemeColor(c.id)}
                    className={`p-2 rounded-2xl flex flex-col items-center gap-1.5 border transition-all cursor-pointer ${
                      pinThemeColor === c.id
                        ? 'border-[#544ee5] bg-indigo-50/50 ring-2 ring-[#544ee5]/20'
                        : 'border-slate-100 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-full ${c.bg} shadow-xs`} />
                    <span className="text-[11px] font-bold text-slate-700">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setShowCustomizeModal(false);
                showToast("✨ Map customization applied!");
              }}
              className="w-full py-3 bg-[#544ee5] hover:bg-[#4842db] text-white font-bold rounded-xl text-sm shadow-md shadow-indigo-200 transition-all cursor-pointer"
            >
              Apply Theme
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
