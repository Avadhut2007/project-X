import { useState } from "react";

const CUISINES = [
  { id: "all", label: "All", emoji: "🌍" },
  { id: "italian", label: "Italian", emoji: "🍝" },
  { id: "japanese", label: "Japanese", emoji: "🍜" },
  { id: "mexican", label: "Mexican", emoji: "🌮" },
  { id: "indian", label: "Indian", emoji: "🍛" },
  { id: "french", label: "French", emoji: "🥐" },
  { id: "korean", label: "Korean", emoji: "🥩" },
  { id: "thai", label: "Thai", emoji: "🍲" },
  { id: "mediterranean", label: "Med", emoji: "🫒" },
];

const TRENDING = [
  {
    id: 1,
    title: "Birria Tacos",
    tag: "Trending this week",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=400&fit=crop&auto=format",
    posts: "3.2k posts",
    cuisine: "Mexican",
  },
  {
    id: 2,
    title: "Brown Butter Pasta",
    tag: "Rising fast",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=400&fit=crop&auto=format",
    posts: "1.8k posts",
    cuisine: "Italian",
  },
  {
    id: 3,
    title: "Crispy Rice Bowl",
    tag: "Most saved",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=400&fit=crop&auto=format",
    posts: "5.1k posts",
    cuisine: "Japanese",
  },
  {
    id: 4,
    title: "Butter Chicken",
    tag: "Comfort season",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=400&fit=crop&auto=format",
    posts: "2.4k posts",
    cuisine: "Indian",
  },
  {
    id: 5,
    title: "Korean BBQ",
    tag: "Weekend fave",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=400&fit=crop&auto=format",
    posts: "4.3k posts",
    cuisine: "Korean",
  },
  {
    id: 6,
    title: "Sourdough Pizza",
    tag: "Home cook hit",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop&auto=format",
    posts: "6.7k posts",
    cuisine: "Italian",
  },
];

const NEARBY = [
  {
    id: 1,
    name: "Flour + Water",
    cuisine: "Italian · Pasta",
    distance: "0.4 mi",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=200&h=200&fit=crop&auto=format",
    rating: "★★★★★",
    price: "$$$",
    friendsVisited: 3,
    friendAvatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&auto=format",
    ],
  },
  {
    id: 2,
    name: "Hog Island Oysters",
    cuisine: "Seafood · Oyster Bar",
    distance: "0.7 mi",
    image: "https://images.unsplash.com/photo-1534790566855-4cb788d389ec?w=200&h=200&fit=crop&auto=format",
    rating: "★★★★½",
    price: "$$$",
    friendsVisited: 1,
    friendAvatars: [
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&auto=format",
    ],
  },
  {
    id: 3,
    name: "Smokestack",
    cuisine: "BBQ · American",
    distance: "1.2 mi",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=200&h=200&fit=crop&auto=format",
    rating: "★★★★",
    price: "$$",
    friendsVisited: 2,
    friendAvatars: [
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=40&h=40&fit=crop&auto=format",
    ],
  },
  {
    id: 4,
    name: "Rintaro",
    cuisine: "Japanese · Izakaya",
    distance: "1.5 mi",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=200&h=200&fit=crop&auto=format",
    rating: "★★★★★",
    price: "$$$",
    friendsVisited: 4,
    friendAvatars: [
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&auto=format",
    ],
  },
];

const CITY_COLLECTIONS = [
  {
    id: 1,
    user: "priyak",
    title: "Best Brunch SF",
    spots: 12,
    followers: 847,
    coverImages: [
      "https://images.unsplash.com/photo-1567620905733-c4deb55e4f94?w=200&h=200&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=200&h=200&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=200&h=200&fit=crop&auto=format",
    ],
  },
  {
    id: 2,
    user: "carlosg",
    title: "Late Night Eats",
    spots: 8,
    followers: 412,
    coverImages: [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop&auto=format",
    ],
  },
];

export default function ExploreScreen() {
  const [activeCuisine, setActiveCuisine] = useState("all");
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [tripMode, setTripMode] = useState(false);

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: "#FAF6F0" }}>
      {/* Header */}
      <header className="px-5 pt-12 pb-3 shrink-0" style={{ background: "#FAF6F0" }}>
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-display text-2xl font-semibold" style={{ color: "#2C1810", letterSpacing: "-0.03em" }}>
            Explore
          </h1>
          {/* Trip mode toggle */}
          <button
            onClick={() => setTripMode(!tripMode)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
            style={{
              background: tripMode ? "#C8614A" : "#F0E8DC",
              color: tripMode ? "#FFFCF8" : "#5C3D2E",
            }}
          >
            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
            {tripMode ? "Trip Mode On" : "Trip Mode"}
          </button>
        </div>

        {/* Search */}
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all"
          style={{
            background: "#FFFCF8",
            border: `2px solid ${focused ? "#C8614A" : "#DDD0C0"}`,
          }}
        >
          <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" fill="none" stroke="#8B6E5A" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search dishes, restaurants, people..."
            className="flex-1 bg-transparent text-sm outline-none"
            style={{ color: "#2C1810" }}
          />
          {query && (
            <button onClick={() => setQuery("")} style={{ color: "#8B6E5A" }}>
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                <path d="M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z"/>
              </svg>
            </button>
          )}
        </div>
      </header>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Trip mode banner */}
        {tripMode && (
          <div className="mx-4 mb-4 p-4 rounded-2xl" style={{ background: "linear-gradient(135deg, #C8614A 0%, #E8934A 100%)" }}>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-white font-semibold text-sm">✈️ Trip Mode Active</span>
            </div>
            <p className="text-white/80 text-xs leading-relaxed">
              Showing your friends' favorites maps for cities you might be visiting. Set your destination to surface local recommendations.
            </p>
            <button className="mt-2 text-xs font-bold bg-white/20 text-white px-3 py-1.5 rounded-lg">
              Set Destination
            </button>
          </div>
        )}

        {/* Cuisine filters */}
        <div className="px-4 mb-5">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
            {CUISINES.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCuisine(c.id)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0"
                style={{
                  background: activeCuisine === c.id ? "#2C1810" : "#F0E8DC",
                  color: activeCuisine === c.id ? "#FFFCF8" : "#5C3D2E",
                }}
              >
                <span>{c.emoji}</span>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Trending Dishes */}
        <section className="mb-6">
          <div className="flex items-center justify-between px-4 mb-3">
            <h2 className="font-display text-lg font-semibold" style={{ color: "#2C1810", letterSpacing: "-0.02em" }}>
              Trending Dishes
            </h2>
            <button className="text-xs font-semibold" style={{ color: "#C8614A" }}>See all</button>
          </div>
          <div className="grid grid-cols-2 gap-3 px-4">
            {TRENDING.map((item) => (
              <div
                key={item.id}
                className="relative rounded-2xl overflow-hidden cursor-pointer transition-transform active:scale-95"
                style={{ background: "#E8DDD0", aspectRatio: "1/1" }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(44,24,16,0.85) 0%, rgba(44,24,16,0.1) 60%)" }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-[10px] font-semibold mb-0.5" style={{ color: "rgba(250,246,240,0.7)" }}>{item.tag}</p>
                  <p className="text-sm font-bold leading-tight" style={{ color: "#FAF6F0" }}>{item.title}</p>
                  <p className="text-[10px] mt-0.5" style={{ color: "rgba(250,246,240,0.65)" }}>{item.posts}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Friends' Collections */}
        <section className="mb-6">
          <div className="flex items-center justify-between px-4 mb-3">
            <h2 className="font-display text-lg font-semibold" style={{ color: "#2C1810", letterSpacing: "-0.02em" }}>
              Collections to Follow
            </h2>
            <button className="text-xs font-semibold" style={{ color: "#C8614A" }}>Browse</button>
          </div>
          <div className="px-4 space-y-3">
            {CITY_COLLECTIONS.map((col) => (
              <div
                key={col.id}
                className="flex items-center gap-3 p-3 rounded-2xl transition-all active:scale-95"
                style={{ background: "#FFFCF8", border: "1.5px solid #DDD0C0" }}
              >
                {/* Mini image grid */}
                <div className="flex gap-1 shrink-0">
                  {col.coverImages.slice(0, 3).map((img, i) => (
                    <div
                      key={i}
                      className="rounded-xl overflow-hidden"
                      style={{ width: i === 0 ? "52px" : "26px", height: "52px" }}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate" style={{ color: "#2C1810" }}>{col.title}</p>
                  <p className="text-xs" style={{ color: "#8B6E5A" }}>
                    by @{col.user} · {col.spots} spots
                  </p>
                  <p className="text-[10px] mt-0.5 font-medium" style={{ color: "#6B7C52" }}>
                    {col.followers.toLocaleString()} followers
                  </p>
                </div>
                <button
                  className="shrink-0 text-xs font-bold px-3 py-2 rounded-xl transition-all active:scale-95"
                  style={{ background: "#F2DDD8", color: "#C8614A" }}
                >
                  Follow
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Near You */}
        <section className="mb-6">
          <div className="flex items-center justify-between px-4 mb-3">
            <h2 className="font-display text-lg font-semibold" style={{ color: "#2C1810", letterSpacing: "-0.02em" }}>
              Near You
            </h2>
            <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: "#6B7C52" }}>
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
              San Francisco
            </div>
          </div>
          <div className="px-4 space-y-3">
            {NEARBY.map((spot) => (
              <div
                key={spot.id}
                className="flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition-all active:scale-95"
                style={{ background: "#FFFCF8", border: "1.5px solid #DDD0C0" }}
              >
                <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0" style={{ background: "#E8DDD0" }}>
                  <img src={spot.image} alt={spot.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm" style={{ color: "#2C1810" }}>{spot.name}</p>
                  <p className="text-xs" style={{ color: "#8B6E5A" }}>{spot.cuisine}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-medium" style={{ color: "#C8614A" }}>{spot.rating}</span>
                    <span className="text-xs" style={{ color: "#8B6E5A" }}>{spot.price}</span>
                    <span className="text-xs" style={{ color: "#8B6E5A" }}>· {spot.distance}</span>
                  </div>
                  {spot.friendsVisited > 0 && (
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <div className="flex">
                        {spot.friendAvatars.map((av, i) => (
                          <img
                            key={i}
                            src={av}
                            alt=""
                            className="w-4 h-4 rounded-full object-cover"
                            style={{ border: "1.5px solid #FFFCF8", marginLeft: i > 0 ? "-4px" : "0" }}
                          />
                        ))}
                      </div>
                      <span className="text-[10px]" style={{ color: "#8B6E5A" }}>
                        {spot.friendsVisited} friends visited
                      </span>
                    </div>
                  )}
                </div>
                <button className="shrink-0 p-2 rounded-xl" style={{ background: "#F0E8DC" }}>
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#C8614A" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="h-6" />
      </div>
    </div>
  );
}
