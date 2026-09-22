import { useState } from "react";

interface Post {
  id: number;
  type: "meal" | "restaurant";
  user: { name: string; handle: string; avatar: string };
  image: string;
  caption: string;
  likes: number;
  comments: number;
  timeAgo: string;
  liked: boolean;
  saved: boolean;
  // meal-specific
  dishName?: string;
  cuisine?: string;
  hasRecipe?: boolean;
  // restaurant-specific
  restaurantName?: string;
  restaurantLocation?: string;
  priceRange?: string;
  mustOrder?: string;
}

const STORIES = [
  { name: "maya", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format", hasStory: true },
  { name: "carlos", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format", hasStory: true },
  { name: "priya", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format", hasStory: true },
  { name: "yuki", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&auto=format", hasStory: true },
  { name: "tom", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format", hasStory: false },
  { name: "jess", avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=80&h=80&fit=crop&auto=format", hasStory: true },
];

const INITIAL_POSTS: Post[] = [
  {
    id: 1,
    type: "meal",
    user: { name: "Maya Chen", handle: "mayachen", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format" },
    image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=700&h=700&fit=crop&auto=format",
    caption: "Three hours of slow-rolling pasta dough and it was absolutely worth every second. Carbonara the real way — no cream, just eggs, pecorino, and a lot of patience.",
    dishName: "Pasta Carbonara",
    cuisine: "Italian",
    hasRecipe: true,
    likes: 247,
    comments: 31,
    timeAgo: "2h",
    liked: false,
    saved: false,
  },
  {
    id: 2,
    type: "restaurant",
    user: { name: "Carlos Gómez", handle: "carlosg", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format" },
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&h=700&fit=crop&auto=format",
    caption: "Zuni Café is a SF institution for a reason. The whole roast chicken (for two!) takes 45 min but you'll talk about it for years. Book ahead — always worth it.",
    restaurantName: "Zuni Café",
    restaurantLocation: "1658 Market St, San Francisco",
    priceRange: "$$$",
    mustOrder: "Whole Roast Chicken",
    likes: 189,
    comments: 22,
    timeAgo: "4h",
    liked: false,
    saved: false,
  },
  {
    id: 3,
    type: "meal",
    user: { name: "Priya Kapoor", handle: "priyak", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format" },
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=700&h=700&fit=crop&auto=format",
    caption: "Sunday reset. Smashed avocado with tajín, pickled red onion, poached egg, and everything bagel seasoning on sourdough. Sometimes simple is everything.",
    dishName: "Smashed Avo Toast",
    cuisine: "Brunch",
    hasRecipe: false,
    likes: 412,
    comments: 47,
    timeAgo: "6h",
    liked: true,
    saved: true,
  },
  {
    id: 4,
    type: "restaurant",
    user: { name: "Jess Williams", handle: "jessw", avatar: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=80&h=80&fit=crop&auto=format" },
    image: "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=700&h=700&fit=crop&auto=format",
    caption: "State Bird Provisions is unlike anything else in SF. Dim sum style — carts roll by and you just say yes to everything. The fried quail (state bird!) is a must.",
    restaurantName: "State Bird Provisions",
    restaurantLocation: "1529 Fillmore St, San Francisco",
    priceRange: "$$$$",
    mustOrder: "Fried Quail + Pancakes",
    likes: 334,
    comments: 41,
    timeAgo: "8h",
    liked: false,
    saved: false,
  },
  {
    id: 5,
    type: "meal",
    user: { name: "Yuki Tanaka", handle: "yukitan", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&auto=format" },
    image: "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=700&h=700&fit=crop&auto=format",
    caption: "48-hour tonkotsu broth. That's the secret. Chashu pork, seasoned egg, nori, bamboo shoots. My grandmother taught me the broth; the rest I figured out over a decade of trying.",
    dishName: "Tonkotsu Ramen",
    cuisine: "Japanese",
    hasRecipe: true,
    likes: 891,
    comments: 103,
    timeAgo: "12h",
    liked: false,
    saved: true,
  },
  {
    id: 6,
    type: "restaurant",
    user: { name: "Tom Baker", handle: "tombakes", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format" },
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=700&h=700&fit=crop&auto=format",
    caption: "Tartine at 5pm when the country loaves come out of the oven. I queued 40 minutes and I'd do it again in a heartbeat. Get the morning bun while you wait.",
    restaurantName: "Tartine Bakery",
    restaurantLocation: "600 Guerrero St, San Francisco",
    priceRange: "$$",
    mustOrder: "Country Loaf + Morning Bun",
    likes: 521,
    comments: 58,
    timeAgo: "1d",
    liked: false,
    saved: false,
  },
];

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill={filled ? "#C8614A" : "none"} stroke={filled ? "#C8614A" : "#2C1810"} strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#2C1810" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
    </svg>
  );
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill={filled ? "#2C1810" : "none"} stroke="#2C1810" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

function PostCard({ post, onToggleLike, onToggleSave }: { post: Post; onToggleLike: (id: number) => void; onToggleSave: (id: number) => void }) {
  const [showFullCaption, setShowFullCaption] = useState(false);
  const [mapSuggested, setMapSuggested] = useState(false);

  const captionShort = post.caption.length > 110 && !showFullCaption;

  return (
    <article className="mb-1" style={{ background: "#FFFCF8" }}>
      {/* Post header */}
      <div className="flex items-center gap-3 px-4 py-3">
        <div className="relative">
          <img
            src={post.user.avatar}
            alt={post.user.name}
            className="w-9 h-9 rounded-full object-cover"
            style={{ border: "2px solid #F2DDD8" }}
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold" style={{ color: "#2C1810" }}>{post.user.name}</span>
            {post.type === "meal" ? (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "#F2DDD8", color: "#C8614A" }}>
                🍳 Home Cook
              </span>
            ) : (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{ background: "#E8F0DC", color: "#5A6B3A" }}>
                📍 Restaurant
              </span>
            )}
          </div>
          <span className="text-xs" style={{ color: "#8B6E5A" }}>{post.timeAgo} ago</span>
        </div>
        <button className="p-1">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#8B6E5A" strokeWidth={2}>
            <circle cx="12" cy="5" r="1" fill="#8B6E5A"/>
            <circle cx="12" cy="12" r="1" fill="#8B6E5A"/>
            <circle cx="12" cy="19" r="1" fill="#8B6E5A"/>
          </svg>
        </button>
      </div>

      {/* Image */}
      <div className="relative" style={{ aspectRatio: "1/1", background: "#E8DDD0" }}>
        <img
          src={post.image}
          alt={post.dishName || post.restaurantName}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Dish/restaurant label overlay */}
        {(post.dishName || post.restaurantName) && (
          <div className="absolute bottom-3 left-3 right-3">
            <div
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold backdrop-blur-sm"
              style={{ background: "rgba(44,24,16,0.75)", color: "#FAF6F0" }}
            >
              {post.type === "restaurant" && <MapPinIcon />}
              <span>{post.dishName || post.restaurantName}</span>
              {post.priceRange && <span style={{ color: "#DDD0C0" }}>{post.priceRange}</span>}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 px-4 py-3">
        <button
          onClick={() => onToggleLike(post.id)}
          className="flex items-center gap-1.5 transition-transform active:scale-90"
        >
          <HeartIcon filled={post.liked} />
          <span className="text-sm font-medium" style={{ color: post.liked ? "#C8614A" : "#2C1810" }}>
            {post.liked ? post.likes + 1 : post.likes}
          </span>
        </button>
        <button className="flex items-center gap-1.5">
          <ChatIcon />
          <span className="text-sm font-medium" style={{ color: "#2C1810" }}>{post.comments}</span>
        </button>
        <div className="flex-1" />
        <button onClick={() => onToggleSave(post.id)} className="transition-transform active:scale-90">
          <BookmarkIcon filled={post.saved} />
        </button>
      </div>

      {/* Caption */}
      <div className="px-4 pb-1">
        <p className="text-sm leading-relaxed" style={{ color: "#2C1810" }}>
          <span className="font-semibold mr-1">{post.user.handle}</span>
          {captionShort ? post.caption.slice(0, 110) : post.caption}
          {captionShort && (
            <button
              onClick={() => setShowFullCaption(true)}
              className="ml-1 font-medium"
              style={{ color: "#8B6E5A" }}
            >
              ...more
            </button>
          )}
        </p>

        {post.type === "meal" && post.hasRecipe && (
          <button
            className="mt-2 flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl"
            style={{ background: "#F2DDD8", color: "#C8614A" }}
          >
            <span>📋</span> View Recipe
          </button>
        )}

        {post.type === "restaurant" && post.mustOrder && (
          <div className="mt-2 flex items-start gap-2 p-3 rounded-2xl" style={{ background: "#FAF6F0", border: "1px solid #DDD0C0" }}>
            <span className="text-base">⭐</span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: "#8B6E5A" }}>Must Order</p>
              <p className="text-xs font-semibold" style={{ color: "#2C1810" }}>{post.mustOrder}</p>
            </div>
            {!mapSuggested ? (
              <button
                onClick={() => setMapSuggested(true)}
                className="ml-auto text-[10px] font-bold px-2.5 py-1.5 rounded-xl whitespace-nowrap transition-all active:scale-95"
                style={{ background: "#C8614A", color: "#FFFCF8" }}
              >
                + Add to Map
              </button>
            ) : (
              <span className="ml-auto text-[10px] font-bold px-2.5 py-1.5 rounded-xl" style={{ background: "#E8F0DC", color: "#5A6B3A" }}>
                ✓ Saved
              </span>
            )}
          </div>
        )}

        <p className="text-xs mt-2 mb-3" style={{ color: "#8B6E5A" }}>
          View all {post.comments} comments
        </p>
      </div>
    </article>
  );
}

export default function FeedScreen() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);

  const toggleLike = (id: number) => {
    setPosts(ps => ps.map(p => p.id === id ? { ...p, liked: !p.liked } : p));
  };

  const toggleSave = (id: number) => {
    setPosts(ps => ps.map(p => p.id === id ? { ...p, saved: !p.saved } : p));
  };

  return (
    <div className="h-full flex flex-col overflow-hidden" style={{ background: "#FAF6F0" }}>
      {/* Header */}
      <header className="flex items-center justify-between px-5 pt-12 pb-3 shrink-0" style={{ background: "#FAF6F0" }}>
        <span className="font-display text-2xl font-semibold" style={{ color: "#2C1810", letterSpacing: "-0.03em" }}>
          plateful
        </span>
        <div className="flex items-center gap-4">
          <button className="relative">
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#2C1810" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full" style={{ background: "#C8614A" }} />
          </button>
          <button>
            <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#2C1810" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.255-3.382a1.176 1.176 0 01.865-.501c1.153-.086 2.294-.213 3.423-.379 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Stories */}
      <div className="px-4 pb-3 shrink-0">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {STORIES.map((story) => (
            <div key={story.name} className="flex flex-col items-center gap-1.5 shrink-0">
              <div
                className="w-15 h-15 rounded-full p-0.5"
                style={{
                  background: story.hasStory
                    ? "linear-gradient(135deg, #C8614A 0%, #E8934A 50%, #6B7C52 100%)"
                    : "#DDD0C0",
                  width: "60px",
                  height: "60px",
                }}
              >
                <img
                  src={story.avatar}
                  alt={story.name}
                  className="w-full h-full rounded-full object-cover"
                  style={{ border: "2.5px solid #FAF6F0" }}
                />
              </div>
              <span className="text-[10px] font-medium capitalize" style={{ color: "#5C3D2E" }}>{story.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px mx-4 shrink-0" style={{ background: "#DDD0C0" }} />

      {/* Feed */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="divide-y" style={{ "--tw-divide-color": "#F0E8DC" } as React.CSSProperties}>
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onToggleLike={toggleLike}
              onToggleSave={toggleSave}
            />
          ))}
        </div>
        <div className="h-8" />
      </div>
    </div>
  );
}
