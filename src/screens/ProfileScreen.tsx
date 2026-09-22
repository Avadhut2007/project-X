import { useState } from "react";

interface MapRestaurant {
  id: number;
  name: string;
  cuisine: string;
  address: string;
  x: number;
  y: number;
  color: string;
  emoji: string;
  collection: string;
  rating: string;
  note: string;
  image: string;
}

const MAP_RESTAURANTS: MapRestaurant[] = [
  {
    id: 1, name: "Zuni Café", cuisine: "American", address: "1658 Market St",
    x: 148, y: 76, color: "#C8614A", emoji: "🍗", collection: "Date Night",
    rating: "★★★★★", note: "The best whole roast chicken in SF. Book 2 weeks ahead.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=200&fit=crop&auto=format",
  },
  {
    id: 2, name: "State Bird Provisions", cuisine: "Californian", address: "1529 Fillmore St",
    x: 252, y: 132, color: "#6B7C52", emoji: "🦅", collection: "Special Occasion",
    rating: "★★★★★", note: "Dim sum-style Californian. Say yes to everything on the cart.",
    image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=300&h=200&fit=crop&auto=format",
  },
  {
    id: 3, name: "Al's Place", cuisine: "Californian", address: "1499 Valencia St",
    x: 190, y: 188, color: "#C8614A", emoji: "🌿", collection: "Special Occasion",
    rating: "★★★★★", note: "Vegetable-forward genius. The brisket is a must.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=200&fit=crop&auto=format",
  },
  {
    id: 4, name: "Nopa", cuisine: "American", address: "560 Divisadero St",
    x: 74, y: 132, color: "#8B6E5A", emoji: "🔥", collection: "Late Night",
    rating: "★★★★½", note: "Open until 1am. Pork chop + burger are legendary.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop&auto=format",
  },
  {
    id: 5, name: "Rich Table", cuisine: "American", address: "199 Gough St",
    x: 322, y: 60, color: "#6B7C52", emoji: "💎", collection: "Date Night",
    rating: "★★★★★", note: "Porcini doughnuts are a SF institution. Tasting menu.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop&auto=format",
  },
  {
    id: 6, name: "Tartine Bakery", cuisine: "Bakery", address: "600 Guerrero St",
    x: 52, y: 252, color: "#C8614A", emoji: "🥐", collection: "Best Brunch",
    rating: "★★★★★", note: "Get there at 5pm when the country loaf comes out.",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&h=200&fit=crop&auto=format",
  },
  {
    id: 7, name: "Foreign Cinema", cuisine: "Mediterranean", address: "2534 Mission St",
    x: 340, y: 220, color: "#8B6E5A", emoji: "🎬", collection: "Date Night",
    rating: "★★★★", note: "Movies in the courtyard. Oysters + steak frites.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop&auto=format",
  },
  {
    id: 8, name: "Flour + Water", cuisine: "Italian", address: "2401 Harrison St",
    x: 218, y: 256, color: "#6B7C52", emoji: "🍝", collection: "Special Occasion",
    rating: "★★★★★", note: "Best housemade pasta in the city. Tagliatelle al ragù.",
    image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=300&h=200&fit=crop&auto=format",
  },
];

const COLLECTIONS = [
  {
    id: 1, name: "Date Night Spots", count: 6, emoji: "🕯",
    color: "#C8614A", bg: "#F2DDD8",
    covers: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&h=200&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&h=200&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&h=200&fit=crop&auto=format",
    ],
    followers: 234,
  },
  {
    id: 2, name: "Best Brunch SF", count: 8, emoji: "☀️",
    color: "#E8934A", bg: "#FDE9D4",
    covers: [
      "https://images.unsplash.com/photo-1567620905733-c4deb55e4f94?w=200&h=200&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=200&h=200&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=200&h=200&fit=crop&auto=format",
    ],
    followers: 891,
  },
  {
    id: 3, name: "Late Night Eats", count: 5, emoji: "🌙",
    color: "#2C1810", bg: "#E8DDD0",
    covers: [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=200&h=200&fit=crop&auto=format",
    ],
    followers: 412,
  },
  {
    id: 4, name: "Special Occasion", count: 4, emoji: "✨",
    color: "#6B7C52", bg: "#E8F0DC",
    covers: [
      "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=200&h=200&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=200&h=200&fit=crop&auto=format",
    ],
    followers: 156,
  },
];

const GRID_POSTS = [
  { id: 1, type: "meal", image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=300&h=300&fit=crop&auto=format" },
  { id: 2, type: "restaurant", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&h=300&fit=crop&auto=format" },
  { id: 3, type: "meal", image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=300&h=300&fit=crop&auto=format" },
  { id: 4, type: "restaurant", image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=300&h=300&fit=crop&auto=format" },
  { id: 5, type: "meal", image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=300&h=300&fit=crop&auto=format" },
  { id: 6, type: "restaurant", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&h=300&fit=crop&auto=format" },
  { id: 7, type: "meal", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=300&fit=crop&auto=format" },
  { id: 8, type: "meal", image: "https://images.unsplash.com/photo-1567620905733-c4deb55e4f94?w=300&h=300&fit=crop&auto=format" },
  { id: 9, type: "restaurant", image: "https://images.unsplash.com/photo-1558030006-450675393462?w=300&h=300&fit=crop&auto=format" },
  { id: 10, type: "meal", image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=300&h=300&fit=crop&auto=format" },
  { id: 11, type: "restaurant", image: "https://images.unsplash.com/photo-1534790566855-4cb788d389ec?w=300&h=300&fit=crop&auto=format" },
  { id: 12, type: "meal", image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&h=300&fit=crop&auto=format" },
];

function CityMap() {
  const [activePin, setActivePin] = useState<number | null>(null);
  const activeRestaurant = MAP_RESTAURANTS.find(r => r.id === activePin);

  return (
    <div className="px-4 py-2">
      {/* Map label */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-display text-base font-semibold" style={{ color: "#2C1810", letterSpacing: "-0.02em" }}>
            Maya's San Francisco
          </h3>
          <p className="text-xs" style={{ color: "#8B6E5A" }}>{MAP_RESTAURANTS.length} favorite spots</p>
        </div>
        <div className="flex gap-3 text-[10px] font-semibold">
          {[
            { color: "#C8614A", label: "Date Night" },
            { color: "#6B7C52", label: "Special" },
            { color: "#8B6E5A", label: "Late Night" },
          ].map(l => (
            <div key={l.label} className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ background: l.color }} />
              <span style={{ color: "#8B6E5A" }}>{l.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* SVG Map */}
      <div className="rounded-2xl overflow-hidden relative" style={{ border: "1.5px solid #DDD0C0", background: "#EDE3CF" }}>
        <svg viewBox="0 0 380 290" className="w-full" style={{ display: "block" }}>
          {/* Map base */}
          <rect width="380" height="290" fill="#EDE3CF" />

          {/* Dolores Park - top left */}
          <rect x="0" y="0" width="54" height="108" fill="#C4D9A0" />
          <line x1="0" y1="20" x2="54" y2="20" stroke="#B8CE94" strokeWidth="0.8" />
          <line x1="0" y1="40" x2="54" y2="40" stroke="#B8CE94" strokeWidth="0.8" />
          <line x1="0" y1="60" x2="54" y2="60" stroke="#B8CE94" strokeWidth="0.8" />
          <line x1="0" y1="80" x2="54" y2="80" stroke="#B8CE94" strokeWidth="0.8" />
          <line x1="0" y1="100" x2="54" y2="100" stroke="#B8CE94" strokeWidth="0.8" />
          <line x1="13" y1="0" x2="13" y2="108" stroke="#B8CE94" strokeWidth="0.8" />
          <line x1="27" y1="0" x2="27" y2="108" stroke="#B8CE94" strokeWidth="0.8" />
          <line x1="41" y1="0" x2="41" y2="108" stroke="#B8CE94" strokeWidth="0.8" />
          <text x="27" y="55" textAnchor="middle" fontSize="7" fill="#7A9B5A" fontFamily="Outfit,sans-serif" fontWeight="600">DOLORES</text>
          <text x="27" y="65" textAnchor="middle" fontSize="7" fill="#7A9B5A" fontFamily="Outfit,sans-serif" fontWeight="600">PARK</text>

          {/* Small park - Alamo Square area */}
          <rect x="178" y="108" width="54" height="50" fill="#C8D9A4" />
          <line x1="178" y1="125" x2="232" y2="125" stroke="#B8CE94" strokeWidth="0.8" />
          <line x1="205" y1="108" x2="205" y2="158" stroke="#B8CE94" strokeWidth="0.8" />

          {/* Horizontal streets */}
          <rect x="0" y="54" width="380" height="8" fill="#FAF3E7" />
          <rect x="0" y="108" width="380" height="8" fill="#FAF3E7" />
          <rect x="0" y="162" width="380" height="8" fill="#FAF3E7" />
          <rect x="0" y="216" width="380" height="8" fill="#FAF3E7" />
          <rect x="0" y="268" width="380" height="8" fill="#FAF3E7" />

          {/* Vertical streets */}
          <rect x="54" y="0" width="8" height="290" fill="#FAF3E7" />
          <rect x="108" y="0" width="8" height="290" fill="#FAF3E7" />
          <rect x="162" y="0" width="8" height="290" fill="#FAF3E7" />
          <rect x="216" y="0" width="8" height="290" fill="#FAF3E7" />
          <rect x="270" y="0" width="8" height="290" fill="#FAF3E7" />
          <rect x="324" y="0" width="8" height="290" fill="#FAF3E7" />

          {/* City blocks - Row 1 (y 0-54) */}
          <rect x="62" y="2" width="46" height="52" fill="#E5D9C5" rx="2" />
          <rect x="116" y="2" width="46" height="52" fill="#DDD0BB" rx="2" />
          {/* skip 170-216 park */}
          <rect x="224" y="2" width="46" height="52" fill="#E0D4BC" rx="2" />
          <rect x="278" y="2" width="46" height="52" fill="#E5D9C5" rx="2" />
          <rect x="332" y="2" width="46" height="52" fill="#DDD0BB" rx="2" />

          {/* Row 2 (y 62-108) */}
          <rect x="0" y="62" width="54" height="46" fill="#E5D9C5" rx="2" />
          <rect x="62" y="62" width="46" height="46" fill="#E0D4BC" rx="2" />
          <rect x="116" y="62" width="46" height="46" fill="#E5D9C5" rx="2" />
          <rect x="170" y="62" width="46" height="46" fill="#DDD0BB" rx="2" />
          <rect x="224" y="62" width="46" height="46" fill="#E5D9C5" rx="2" />
          <rect x="278" y="62" width="46" height="46" fill="#E0D4BC" rx="2" />
          <rect x="332" y="62" width="46" height="46" fill="#E5D9C5" rx="2" />

          {/* Row 3 (y 116-162) */}
          <rect x="0" y="116" width="54" height="46" fill="#DDD0BB" rx="2" />
          <rect x="62" y="116" width="46" height="46" fill="#E5D9C5" rx="2" />
          <rect x="116" y="116" width="46" height="46" fill="#DDD0BB" rx="2" />
          {/* Park here 178-232 */}
          <rect x="232" y="116" width="38" height="46" fill="#E5D9C5" rx="2" />
          <rect x="278" y="116" width="46" height="46" fill="#E0D4BC" rx="2" />
          <rect x="332" y="116" width="46" height="46" fill="#E5D9C5" rx="2" />

          {/* Row 4 (y 170-216) */}
          <rect x="0" y="170" width="54" height="46" fill="#E5D9C5" rx="2" />
          <rect x="62" y="170" width="46" height="46" fill="#E0D4BC" rx="2" />
          <rect x="116" y="170" width="46" height="46" fill="#E5D9C5" rx="2" />
          <rect x="170" y="170" width="46" height="46" fill="#DDD0BB" rx="2" />
          <rect x="224" y="170" width="46" height="46" fill="#E5D9C5" rx="2" />
          <rect x="278" y="170" width="46" height="46" fill="#E0D4BC" rx="2" />
          <rect x="332" y="170" width="46" height="46" fill="#E5D9C5" rx="2" />

          {/* Row 5 (y 224-268) */}
          <rect x="0" y="224" width="54" height="44" fill="#DDD0BB" rx="2" />
          <rect x="62" y="224" width="46" height="44" fill="#E5D9C5" rx="2" />
          <rect x="116" y="224" width="46" height="44" fill="#DDD0BB" rx="2" />
          <rect x="170" y="224" width="46" height="44" fill="#E5D9C5" rx="2" />
          <rect x="224" y="224" width="46" height="44" fill="#E0D4BC" rx="2" />
          <rect x="278" y="224" width="46" height="44" fill="#E5D9C5" rx="2" />
          <rect x="332" y="224" width="46" height="44" fill="#DDD0BB" rx="2" />

          {/* Row 6 (y 276-290) */}
          <rect x="0" y="276" width="54" height="14" fill="#E5D9C5" rx="2" />
          <rect x="62" y="276" width="46" height="14" fill="#DDD0BB" rx="2" />
          <rect x="116" y="276" width="46" height="14" fill="#E5D9C5" rx="2" />
          <rect x="170" y="276" width="46" height="14" fill="#DDD0BB" rx="2" />
          <rect x="224" y="276" width="46" height="14" fill="#E5D9C5" rx="2" />
          <rect x="278" y="276" width="46" height="14" fill="#DDD0BB" rx="2" />
          <rect x="332" y="276" width="46" height="14" fill="#E5D9C5" rx="2" />

          {/* Street labels */}
          <text x="85" y="52" textAnchor="middle" fontSize="5.5" fill="#A89480" fontFamily="Outfit,sans-serif">Market St</text>
          <text x="85" y="106" textAnchor="middle" fontSize="5.5" fill="#A89480" fontFamily="Outfit,sans-serif">16th St</text>
          <text x="85" y="160" textAnchor="middle" fontSize="5.5" fill="#A89480" fontFamily="Outfit,sans-serif">Valencia St</text>
          <text x="85" y="214" textAnchor="middle" fontSize="5.5" fill="#A89480" fontFamily="Outfit,sans-serif">24th St</text>
          <text x="57" y="42" textAnchor="start" fontSize="5.5" fill="#A89480" fontFamily="Outfit,sans-serif" transform="rotate(-90,57,42)">Divisadero</text>
          <text x="111" y="42" textAnchor="start" fontSize="5.5" fill="#A89480" fontFamily="Outfit,sans-serif" transform="rotate(-90,111,42)">Fillmore</text>
          <text x="165" y="42" textAnchor="start" fontSize="5.5" fill="#A89480" fontFamily="Outfit,sans-serif" transform="rotate(-90,165,42)">Guerrero</text>
          <text x="219" y="42" textAnchor="start" fontSize="5.5" fill="#A89480" fontFamily="Outfit,sans-serif" transform="rotate(-90,219,42)">Mission</text>

          {/* Restaurant pins */}
          {MAP_RESTAURANTS.map((r) => (
            <g key={r.id} style={{ cursor: "pointer" }} onClick={() => setActivePin(activePin === r.id ? null : r.id)}>
              {/* Drop shadow */}
              <circle cx={r.x + 2} cy={r.y + 3} r="13" fill="rgba(44,24,16,0.18)" />
              {/* Pin circle */}
              <circle
                cx={r.x}
                cy={r.y}
                r="13"
                fill={activePin === r.id ? r.color : "#FFFCF8"}
                stroke={r.color}
                strokeWidth="2.5"
              />
              {/* Emoji */}
              <text
                x={r.x}
                y={r.y + 5}
                textAnchor="middle"
                fontSize="11"
                style={{ userSelect: "none" }}
              >
                {r.emoji}
              </text>
              {/* Active pulse ring */}
              {activePin === r.id && (
                <circle cx={r.x} cy={r.y} r="17" fill="none" stroke={r.color} strokeWidth="2" opacity="0.4" />
              )}
            </g>
          ))}
        </svg>

        {/* Attribution */}
        <div className="absolute bottom-2 right-3 text-[9px] font-medium" style={{ color: "#A89480" }}>
          Hayes Valley · Mission District · SF
        </div>
      </div>

      {/* Active pin info card */}
      {activeRestaurant && (
        <div
          className="mt-3 rounded-2xl overflow-hidden transition-all"
          style={{ border: "1.5px solid #DDD0C0", background: "#FFFCF8" }}
        >
          <div className="flex">
            <div className="w-24 h-24 shrink-0" style={{ background: "#E8DDD0" }}>
              <img src={activeRestaurant.image} alt={activeRestaurant.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 p-3 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-sm leading-tight" style={{ color: "#2C1810" }}>{activeRestaurant.name}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "#8B6E5A" }}>{activeRestaurant.cuisine} · {activeRestaurant.address}</p>
                </div>
                <span
                  className="text-[10px] font-bold px-2 py-1 rounded-full shrink-0"
                  style={{ background: activeRestaurant.color + "22", color: activeRestaurant.color }}
                >
                  {activeRestaurant.collection}
                </span>
              </div>
              <p className="text-xs mt-1.5 leading-relaxed" style={{ color: "#5C3D2E" }}>"{activeRestaurant.note}"</p>
              <p className="text-xs mt-1" style={{ color: "#C8614A" }}>{activeRestaurant.rating}</p>
            </div>
          </div>
        </div>
      )}

      {/* Restaurant list */}
      <div className="mt-4 space-y-2">
        <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#8B6E5A" }}>All Favorites</p>
        {MAP_RESTAURANTS.map((r) => (
          <button
            key={r.id}
            onClick={() => setActivePin(activePin === r.id ? null : r.id)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-left transition-all"
            style={{
              background: activePin === r.id ? "#F2DDD8" : "#FFFCF8",
              border: `1.5px solid ${activePin === r.id ? "#C8614A" : "#DDD0C0"}`,
            }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0"
              style={{ background: r.color + "22" }}
            >
              {r.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold leading-tight truncate" style={{ color: "#2C1810" }}>{r.name}</p>
              <p className="text-[10px]" style={{ color: "#8B6E5A" }}>{r.cuisine} · {r.collection}</p>
            </div>
            <p className="text-xs shrink-0" style={{ color: r.color }}>{r.rating}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function ProfileScreen({ initialTab = "posts" }: { initialTab?: "posts" | "map" | "collections" }) {
  const [activeTab, setActiveTab] = useState<"posts" | "map" | "collections">(initialTab);
  const [gridFilter, setGridFilter] = useState<"all" | "meal" | "restaurant">("all");
  const [isFollowing, setIsFollowing] = useState(false);

  const filteredPosts = gridFilter === "all"
    ? GRID_POSTS
    : GRID_POSTS.filter(p => p.type === (gridFilter === "meal" ? "meal" : "restaurant"));

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: "#FAF6F0" }}>
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Profile header */}
        <div className="relative">
          {/* Cover photo */}
          <div className="h-36 relative" style={{ background: "#C8614A" }}>
            <img
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=750&h=280&fit=crop&auto=format"
              alt="Cover"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: "rgba(44,24,16,0.25)" }} />
          </div>

          {/* Header controls */}
          <div className="absolute top-12 left-0 right-0 flex justify-between items-start px-5">
            <div />
            <div className="flex gap-2">
              <button
                className="w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm"
                style={{ background: "rgba(44,24,16,0.4)" }}
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="white" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Avatar + info */}
          <div className="px-5 pt-0 pb-4" style={{ background: "#FAF6F0" }}>
            <div className="flex items-end justify-between -mt-10 mb-4">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&auto=format"
                  alt="Maya Chen"
                  className="w-20 h-20 rounded-full object-cover"
                  style={{ border: "3px solid #FAF6F0", boxShadow: "0 2px 12px rgba(44,24,16,0.2)" }}
                />
                <div
                  className="absolute bottom-0 right-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
                  style={{ background: "#C8614A", border: "2px solid #FAF6F0" }}
                >
                  ✓
                </div>
              </div>
              <div className="flex gap-2 pb-1">
                <button
                  onClick={() => setIsFollowing(!isFollowing)}
                  className="px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95"
                  style={{
                    background: isFollowing ? "#F0E8DC" : "#C8614A",
                    color: isFollowing ? "#5C3D2E" : "#FFFCF8",
                  }}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
                <button
                  className="px-4 py-2 rounded-xl text-xs font-bold"
                  style={{ background: "#F0E8DC", color: "#5C3D2E" }}
                >
                  Message
                </button>
              </div>
            </div>

            <div className="mb-3">
              <h1 className="font-display text-xl font-semibold" style={{ color: "#2C1810", letterSpacing: "-0.02em" }}>
                Maya Chen
              </h1>
              <p className="text-sm" style={{ color: "#8B6E5A" }}>@mayachen</p>
              <p className="text-sm mt-2 leading-relaxed" style={{ color: "#5C3D2E" }}>
                Home cook obsessed with pasta & fermentation. SF's hidden gems hunter.
                Always hunting the next great bowl of ramen. 🍜
              </p>
              <div className="flex items-center gap-1.5 mt-2 text-xs" style={{ color: "#8B6E5A" }}>
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                  <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
                San Francisco, CA
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-around py-4 rounded-2xl" style={{ background: "#FFFCF8", border: "1.5px solid #DDD0C0" }}>
              {[
                { value: "84", label: "Posts" },
                { value: "2.4k", label: "Followers" },
                { value: "318", label: "Following" },
                { value: "8", label: "Fav Spots" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-lg font-semibold" style={{ color: "#2C1810", letterSpacing: "-0.02em" }}>{stat.value}</p>
                  <p className="text-[10px] font-medium" style={{ color: "#8B6E5A" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          className="flex border-b px-4 shrink-0 sticky top-0 z-10"
          style={{ borderColor: "#DDD0C0", background: "#FAF6F0" }}
        >
          {(["posts", "map", "collections"] as const).map((tab) => {
            const labels = { posts: "Posts", map: "Favorites Map", collections: "Collections" };
            const icons = {
              posts: (
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
                  <rect x="3" y="3" width="7" height="7" rx="1"/>
                  <rect x="14" y="3" width="7" height="7" rx="1"/>
                  <rect x="3" y="14" width="7" height="7" rx="1"/>
                  <rect x="14" y="14" width="7" height="7" rx="1"/>
                </svg>
              ),
              map: (
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              ),
              collections: (
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                </svg>
              ),
            };
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-1 flex flex-col items-center gap-1 py-3 relative text-xs font-semibold transition-colors"
                style={{ color: activeTab === tab ? "#C8614A" : "#8B6E5A" }}
              >
                {icons[tab]}
                <span>{labels[tab]}</span>
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 rounded-full" style={{ background: "#C8614A" }} />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        {activeTab === "posts" && (
          <div>
            {/* Filter chips */}
            <div className="flex gap-2 px-4 py-3">
              {(["all", "meal", "restaurant"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setGridFilter(f)}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-all"
                  style={{
                    background: gridFilter === f ? "#2C1810" : "#F0E8DC",
                    color: gridFilter === f ? "#FFFCF8" : "#5C3D2E",
                  }}
                >
                  {f === "all" ? "All" : f === "meal" ? "🍳 Cooked" : "📍 Restaurant"}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-0.5">
              {filteredPosts.map((post) => (
                <div key={post.id} className="relative" style={{ aspectRatio: "1/1", background: "#E8DDD0" }}>
                  <img src={post.image} alt="" className="w-full h-full object-cover" loading="lazy" />
                  <div
                    className="absolute top-1.5 left-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[9px]"
                    style={{ background: "rgba(44,24,16,0.65)" }}
                  >
                    {post.type === "meal" ? "🍳" : "📍"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "map" && <CityMap />}

        {activeTab === "collections" && (
          <div className="p-4 space-y-4">
            {COLLECTIONS.map((col) => (
              <div key={col.id} className="rounded-2xl overflow-hidden cursor-pointer" style={{ background: "#FFFCF8", border: "1.5px solid #DDD0C0" }}>
                {/* Cover mosaic */}
                <div className="flex h-28">
                  <div className="flex-1" style={{ background: "#E8DDD0" }}>
                    <img src={col.covers[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex flex-col" style={{ width: "33.33%" }}>
                    <div className="flex-1" style={{ background: "#E8DDD0" }}>
                      <img src={col.covers[1]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="h-px" style={{ background: "#DDD0C0" }} />
                    <div className="flex-1" style={{ background: "#E8DDD0" }}>
                      <img src={col.covers[2]} alt="" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-xs"
                        style={{ background: col.bg }}
                      >
                        {col.emoji}
                      </span>
                      <p className="font-semibold text-sm" style={{ color: "#2C1810" }}>{col.name}</p>
                    </div>
                    <p className="text-xs" style={{ color: "#8B6E5A" }}>
                      {col.count} spots · {col.followers} followers
                    </p>
                  </div>
                  <button
                    className="text-xs font-bold px-3 py-2 rounded-xl"
                    style={{ background: col.bg, color: col.color }}
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="h-6" />
      </div>
    </div>
  );
}
