import { useState } from "react";
import AuthScreen from "./screens/AuthScreen";
import FeedScreen from "./screens/FeedScreen";
import ExploreScreen from "./screens/ExploreScreen";
import ProfileScreen from "./screens/ProfileScreen";
import CreatePostScreen from "./screens/CreatePostScreen";
import CityMapScreen from "./screens/CityMapScreen";

type Tab = "feed" | "explore" | "map" | "profile";

// ── Icon primitives ─────────────────────────────────────────────────────────

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill={active ? "#C8614A" : "none"} stroke={active ? "#C8614A" : "#8B6E5A"} strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  );
}
function CompassIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke={active ? "#C8614A" : "#8B6E5A"} strokeWidth={1.8}>
      <circle cx="12" cy="12" r="9" strokeLinecap="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
    </svg>
  );
}
function MapPinIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill={active ? "#C8614A" : "none"} stroke={active ? "#C8614A" : "#8B6E5A"} strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}
function UserIcon({ active }: { active: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill={active ? "#C8614A" : "none"} stroke={active ? "#C8614A" : "#8B6E5A"} strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  );
}
function PlusIcon({ small = false }: { small?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className={small ? "w-5 h-5" : "w-6 h-6"} fill="none" stroke="white" strokeWidth={2.2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}

// ── NAV ITEMS config ─────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: "feed" as Tab, label: "Home", Icon: HomeIcon },
  { id: "explore" as Tab, label: "Explore", Icon: CompassIcon },
  { id: "map" as Tab, label: "Map", Icon: MapPinIcon },
  { id: "profile" as Tab, label: "Profile", Icon: UserIcon },
];

// ── DESKTOP SIDEBAR ──────────────────────────────────────────────────────────

function DesktopSidebar({
  activeTab,
  onTabChange,
  onCreate,
}: {
  activeTab: Tab;
  onTabChange: (t: Tab) => void;
  onCreate: () => void;
}) {
  return (
    <aside
      className="hidden md:flex flex-col h-full w-56 shrink-0 border-r pt-8 pb-6"
      style={{ background: "#FFFCF8", borderColor: "#DDD0C0" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 mb-8">
        <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm" style={{ background: "#C8614A" }}>
          🍽
        </div>
        <span className="font-display text-xl font-semibold" style={{ color: "#2C1810", letterSpacing: "-0.03em" }}>
          plateful
        </span>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1 px-3 flex-1">
        {NAV_ITEMS.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => onTabChange(id)}
            className="flex items-center gap-3 px-3 py-3 rounded-2xl text-sm font-semibold transition-all text-left"
            style={{
              background: activeTab === id ? "#F2DDD8" : "transparent",
              color: activeTab === id ? "#C8614A" : "#5C3D2E",
            }}
          >
            <Icon active={activeTab === id} />
            {label}
          </button>
        ))}

        {/* Create post button */}
        <button
          onClick={onCreate}
          className="flex items-center gap-3 px-3 py-3 mt-2 rounded-2xl text-sm font-bold transition-all active:scale-95"
          style={{ background: "#C8614A", color: "#FFFCF8" }}
        >
          <PlusIcon small />
          New Post
        </button>
      </nav>

      {/* Profile mini at bottom */}
      <div className="px-4 pt-4 border-t" style={{ borderColor: "#DDD0C0" }}>
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format"
            alt="Maya"
            className="w-9 h-9 rounded-full object-cover"
            style={{ border: "2px solid #F2DDD8" }}
          />
          <div>
            <p className="text-sm font-semibold leading-tight" style={{ color: "#2C1810" }}>Maya Chen</p>
            <p className="text-xs" style={{ color: "#8B6E5A" }}>@mayachen</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

// ── DESKTOP RIGHT PANEL ──────────────────────────────────────────────────────

const SUGGESTED = [
  { name: "Yuki Tanaka", handle: "yukitan", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop&auto=format", tag: "Ramen master" },
  { name: "Carlos Gómez", handle: "carlosg", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format", tag: "SF restaurant guide" },
  { name: "Priya Kapoor", handle: "priyak", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format", tag: "Brunch specialist" },
  { name: "Tom Baker", handle: "tombakes", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format", tag: "Sourdough + bakeries" },
];

const TRENDING_DISHES = [
  { rank: 1, name: "Birria Tacos", posts: "3.2k" },
  { rank: 2, name: "Brown Butter Pasta", posts: "1.8k" },
  { rank: 3, name: "Crispy Rice Bowl", posts: "5.1k" },
  { rank: 4, name: "Butter Chicken", posts: "2.4k" },
];

function RightPanel() {
  const [followed, setFollowed] = useState<Record<string, boolean>>({});

  return (
    <div className="p-5 space-y-6">
      {/* Suggested accounts */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: "#8B6E5A" }}>Suggested for you</p>
          <button className="text-xs font-semibold" style={{ color: "#C8614A" }}>See all</button>
        </div>
        <div className="space-y-3">
          {SUGGESTED.map((user) => (
            <div key={user.handle} className="flex items-center gap-3">
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover shrink-0" style={{ border: "2px solid #F2DDD8" }} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold leading-tight truncate" style={{ color: "#2C1810" }}>{user.name}</p>
                <p className="text-xs truncate" style={{ color: "#8B6E5A" }}>{user.tag}</p>
              </div>
              <button
                onClick={() => setFollowed(f => ({ ...f, [user.handle]: !f[user.handle] }))}
                className="text-xs font-bold px-3 py-1.5 rounded-xl transition-all active:scale-95 shrink-0"
                style={{
                  background: followed[user.handle] ? "#F0E8DC" : "#C8614A",
                  color: followed[user.handle] ? "#5C3D2E" : "#FFFCF8",
                }}
              >
                {followed[user.handle] ? "Following" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px" style={{ background: "#DDD0C0" }} />

      {/* Trending */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: "#8B6E5A" }}>Trending This Week</p>
        <div className="space-y-2.5">
          {TRENDING_DISHES.map((dish) => (
            <div key={dish.rank} className="flex items-center gap-3 cursor-pointer group">
              <span className="text-sm font-display font-semibold w-5 shrink-0" style={{ color: "#DDD0C0" }}>
                {dish.rank}
              </span>
              <div className="flex-1">
                <p className="text-sm font-semibold transition-colors group-hover:text-terracotta" style={{ color: "#2C1810" }}>
                  {dish.name}
                </p>
                <p className="text-xs" style={{ color: "#8B6E5A" }}>{dish.posts} posts</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="h-px" style={{ background: "#DDD0C0" }} />

      {/* App tagline */}
      <p className="text-[11px] leading-relaxed" style={{ color: "#8B6E5A" }}>
        plateful is exclusively for food — home cooking, recipes, and restaurant discovery. No lifestyle, fashion, or unrelated content.
      </p>
    </div>
  );
}

// ── MOBILE BOTTOM NAV ────────────────────────────────────────────────────────

function MobileBottomNav({
  activeTab,
  onTabChange,
  onCreate,
}: {
  activeTab: Tab;
  onTabChange: (t: Tab) => void;
  onCreate: () => void;
}) {
  return (
    <nav
      className="md:hidden flex items-center justify-around px-4 border-t"
      style={{
        background: "#FFFCF8",
        borderColor: "#DDD0C0",
        paddingTop: "10px",
        paddingBottom: "calc(env(safe-area-inset-bottom) + 10px)",
      }}
    >
      {NAV_ITEMS.slice(0, 2).map(({ id, label, Icon }) => (
        <button key={id} onClick={() => onTabChange(id)} className="flex flex-col items-center gap-0.5 py-1">
          <Icon active={activeTab === id} />
          <span className="text-[10px] font-medium" style={{ color: activeTab === id ? "#C8614A" : "#8B6E5A" }}>{label}</span>
        </button>
      ))}

      {/* Center + button */}
      <button
        onClick={onCreate}
        className="rounded-2xl flex items-center justify-center shadow-md -mt-3"
        style={{ background: "#C8614A", width: "52px", height: "52px" }}
      >
        <PlusIcon />
      </button>

      {NAV_ITEMS.slice(2).map(({ id, label, Icon }) => (
        <button key={id} onClick={() => onTabChange(id)} className="flex flex-col items-center gap-0.5 py-1">
          <Icon active={activeTab === id} />
          <span className="text-[10px] font-medium" style={{ color: activeTab === id ? "#C8614A" : "#8B6E5A" }}>{label}</span>
        </button>
      ))}
    </nav>
  );
}

// ── ROOT ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("feed");
  const [showCreate, setShowCreate] = useState(false);

  if (!isAuthed) {
    return (
      <div className="min-h-dvh flex items-center justify-center" style={{ background: "#E8DDD0" }}>
        <AuthScreen onAuth={() => setIsAuthed(true)} />
      </div>
    );
  }

  const currentScreen = (
    <>
      {activeTab === "feed" && <FeedScreen />}
      {activeTab === "explore" && <ExploreScreen />}
      {activeTab === "map" && <CityMapScreen />}
      {activeTab === "profile" && <ProfileScreen initialTab="posts" />}
    </>
  );

  return (
    <div className="h-dvh flex overflow-hidden" style={{ background: "#E8DDD0" }}>
      {/* ── Desktop sidebar ── */}
      <DesktopSidebar activeTab={activeTab} onTabChange={setActiveTab} onCreate={() => setShowCreate(true)} />

      {/* ── Content column ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 flex min-h-0 overflow-hidden">

          {/* Main screen — narrow on mobile, centered card on desktop */}
          <div
            className="flex-1 flex flex-col min-w-0 overflow-hidden md:max-w-xl md:border-r"
            style={{
              background: "#FAF6F0",
              // On desktop add a subtle shadow to separate from sandy bg
              borderColor: "#DDD0C0",
            }}
          >
            {/* On desktop, center the screen within its column */}
            <div className="flex-1 overflow-hidden">
              {currentScreen}
            </div>
          </div>

          {/* Right panel — lg+ only */}
          <aside
            className="hidden lg:block w-72 shrink-0 overflow-y-auto scrollbar-hide"
            style={{ background: "#FAF6F0" }}
          >
            <RightPanel />
          </aside>
        </div>

        {/* Mobile bottom nav */}
        <MobileBottomNav activeTab={activeTab} onTabChange={setActiveTab} onCreate={() => setShowCreate(true)} />
      </div>

      {/* Create post modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-start justify-center" style={{ background: "rgba(44,24,16,0.5)", backdropFilter: "blur(4px)" }}>
          {/* Modal card */}
          <div
            className="w-full max-w-sm mx-auto mt-4 mb-4 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
            style={{ background: "#FAF6F0", maxHeight: "calc(100dvh - 32px)" }}
          >
            <CreatePostScreen onClose={() => setShowCreate(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
