import { useState } from "react";

interface Props {
  onClose: () => void;
}

type PostType = "meal" | "restaurant";

const CUISINES = ["Italian", "Japanese", "Mexican", "Indian", "French", "Korean", "Thai", "Mediterranean", "American", "Chinese", "Vietnamese", "Greek", "Spanish"];
const PRICE_RANGES = ["$", "$$", "$$$", "$$$$"];

export default function CreatePostScreen({ onClose }: Props) {
  const [postType, setPostType] = useState<PostType>("meal");
  const [step, setStep] = useState<"type" | "photo" | "details" | "confirm">("type");

  // Meal fields
  const [dishName, setDishName] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [caption, setCaption] = useState("");
  const [showRecipe, setShowRecipe] = useState(false);
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");

  // Restaurant fields
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [mustOrder, setMustOrder] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [addToMap, setAddToMap] = useState(true);
  const [collection, setCollection] = useState("");

  const selectedPhoto = postType === "meal"
    ? "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=600&h=600&fit=crop&auto=format"
    : "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=600&fit=crop&auto=format";

  return (
    <div className="h-full flex flex-col" style={{ background: "#FAF6F0" }}>
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 pt-12 pb-4 shrink-0"
        style={{ background: "#FAF6F0", borderBottom: "1px solid #DDD0C0" }}
      >
        <button onClick={onClose} className="p-2 -ml-2 rounded-xl" style={{ color: "#8B6E5A" }}>
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h1 className="font-display text-lg font-semibold" style={{ color: "#2C1810", letterSpacing: "-0.02em" }}>
          {step === "type" ? "New Post" : step === "photo" ? "Add Photos" : step === "details" ? "Add Details" : "Preview"}
        </h1>
        {step === "confirm" ? (
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-bold transition-all active:scale-95"
            style={{ background: "#C8614A", color: "#FFFCF8" }}
          >
            Share
          </button>
        ) : (
          <div className="w-12" />
        )}
      </div>

      {/* Step indicator */}
      {step !== "type" && (
        <div className="flex gap-1.5 px-5 py-3 shrink-0">
          {(["photo", "details", "confirm"] as const).map((s, i) => (
            <div
              key={s}
              className="h-1 flex-1 rounded-full transition-all"
              style={{
                background: ["photo", "details", "confirm"].indexOf(step) >= i ? "#C8614A" : "#E8DDD0",
              }}
            />
          ))}
        </div>
      )}

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Step 1: Post type */}
        {step === "type" && (
          <div className="px-5 pt-6">
            <p className="text-sm mb-6" style={{ color: "#8B6E5A" }}>
              What are you sharing today?
            </p>
            <div className="space-y-4">
              <button
                onClick={() => { setPostType("meal"); setStep("photo"); }}
                className="w-full p-5 rounded-3xl text-left transition-all active:scale-95 relative overflow-hidden"
                style={{ background: "#FFFCF8", border: "2px solid #DDD0C0" }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                    style={{ background: "#F2DDD8" }}
                  >
                    🍳
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold mb-1" style={{ color: "#2C1810", letterSpacing: "-0.02em" }}>
                      Home Cooked Meal
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#8B6E5A" }}>
                      Share a dish you've made — with or without the recipe.
                    </p>
                    <div className="flex gap-2 mt-3">
                      {["Photos/video", "Recipe mode", "Cuisine tag"].map(tag => (
                        <span key={tag} className="text-[10px] font-semibold px-2 py-1 rounded-full" style={{ background: "#F2DDD8", color: "#C8614A" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>

              <button
                onClick={() => { setPostType("restaurant"); setStep("photo"); }}
                className="w-full p-5 rounded-3xl text-left transition-all active:scale-95"
                style={{ background: "#FFFCF8", border: "2px solid #DDD0C0" }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0"
                    style={{ background: "#E8F0DC" }}
                  >
                    📍
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold mb-1" style={{ color: "#2C1810", letterSpacing: "-0.02em" }}>
                      Restaurant Post
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: "#8B6E5A" }}>
                      Share a restaurant you've visited and what to order.
                    </p>
                    <div className="flex gap-2 mt-3">
                      {["Location pin", "Favorites Map", "Collections"].map(tag => (
                        <span key={tag} className="text-[10px] font-semibold px-2 py-1 rounded-full" style={{ background: "#E8F0DC", color: "#5A6B3A" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            </div>

            <p className="text-center text-xs mt-8 mb-4" style={{ color: "#8B6E5A" }}>
              Only food content is allowed on plateful. No lifestyle, fashion, or travel posts.
            </p>
          </div>
        )}

        {/* Step 2: Photo */}
        {step === "photo" && (
          <div>
            {/* Photo preview area */}
            <div className="relative" style={{ aspectRatio: "1/1", background: "#E8DDD0" }}>
              <img src={selectedPhoto} alt="" className="w-full h-full object-cover" />
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                style={{ background: "rgba(44,24,16,0.3)" }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,252,248,0.9)" }}
                >
                  <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="#C8614A" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
                <p className="text-white font-semibold text-sm">Tap to add photos</p>
                <p className="text-white/70 text-xs">or shoot a video</p>
              </div>
            </div>

            {/* Photo grid strip */}
            <div className="flex gap-2 px-4 py-4 overflow-x-auto scrollbar-hide">
              {[selectedPhoto,
                "https://images.unsplash.com/photo-1567620905733-c4deb55e4f94?w=200&h=200&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=200&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1569050467447-ce54b3bbc37d?w=200&h=200&fit=crop&auto=format",
                "https://images.unsplash.com/photo-1541519227354-08fa5d50c820?w=200&h=200&fit=crop&auto=format",
              ].map((img, i) => (
                <div
                  key={i}
                  className="w-16 h-16 rounded-xl overflow-hidden shrink-0 cursor-pointer transition-all"
                  style={{
                    border: i === 0 ? "2.5px solid #C8614A" : "2px solid transparent",
                    background: "#E8DDD0",
                  }}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
              {/* Add more */}
              <div
                className="w-16 h-16 rounded-xl shrink-0 flex items-center justify-center cursor-pointer"
                style={{ background: "#F0E8DC", border: "2px dashed #DDD0C0" }}
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#8B6E5A" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
            </div>

            <div className="px-5 pb-4">
              <button
                onClick={() => setStep("details")}
                className="w-full py-4 rounded-2xl font-semibold text-base transition-all active:scale-95"
                style={{ background: "#C8614A", color: "#FFFCF8" }}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Details */}
        {step === "details" && (
          <div className="px-5 py-4 space-y-4">
            {/* Mini photo preview */}
            <div className="flex gap-3 items-start mb-2">
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0" style={{ background: "#E8DDD0" }}>
                <img src={selectedPhoto} alt="" className="w-full h-full object-cover" />
              </div>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder={postType === "meal"
                  ? "What's the story behind this dish?"
                  : "What makes this place special? What should people order?"}
                className="flex-1 bg-transparent text-sm outline-none resize-none leading-relaxed"
                style={{ color: "#2C1810", minHeight: "80px" }}
                rows={4}
              />
            </div>

            <div className="h-px" style={{ background: "#DDD0C0" }} />

            {postType === "meal" ? (
              <>
                <Field label="Dish Name" placeholder="e.g. Pasta Carbonara" value={dishName} onChange={setDishName} />

                {/* Cuisine selector */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider block mb-2" style={{ color: "#8B6E5A" }}>Cuisine</label>
                  <div className="flex flex-wrap gap-2">
                    {CUISINES.map(c => (
                      <button
                        key={c}
                        onClick={() => setCuisine(c)}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                        style={{
                          background: cuisine === c ? "#2C1810" : "#F0E8DC",
                          color: cuisine === c ? "#FFFCF8" : "#5C3D2E",
                        }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recipe toggle */}
                <div
                  className="flex items-center justify-between p-4 rounded-2xl cursor-pointer"
                  style={{ background: "#FFFCF8", border: "1.5px solid #DDD0C0" }}
                  onClick={() => setShowRecipe(!showRecipe)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📋</span>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "#2C1810" }}>Add Recipe</p>
                      <p className="text-xs" style={{ color: "#8B6E5A" }}>Share ingredients & steps</p>
                    </div>
                  </div>
                  <div
                    className="w-11 h-6 rounded-full transition-all relative"
                    style={{ background: showRecipe ? "#C8614A" : "#DDD0C0" }}
                  >
                    <div
                      className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all"
                      style={{ left: showRecipe ? "22px" : "2px" }}
                    />
                  </div>
                </div>

                {showRecipe && (
                  <div className="space-y-3 pl-2">
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider block mb-2" style={{ color: "#8B6E5A" }}>Ingredients</label>
                      <textarea
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        placeholder={"200g pasta\n2 egg yolks\n100g pecorino romano\n..."}
                        rows={4}
                        className="w-full px-4 py-3 rounded-2xl text-sm outline-none resize-none"
                        style={{ background: "#FFFCF8", border: "1.5px solid #DDD0C0", color: "#2C1810" }}
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider block mb-2" style={{ color: "#8B6E5A" }}>Steps</label>
                      <textarea
                        value={steps}
                        onChange={(e) => setSteps(e.target.value)}
                        placeholder={"1. Boil pasta until al dente...\n2. Whisk eggs and cheese...\n3. Combine off heat..."}
                        rows={5}
                        className="w-full px-4 py-3 rounded-2xl text-sm outline-none resize-none"
                        style={{ background: "#FFFCF8", border: "1.5px solid #DDD0C0", color: "#2C1810" }}
                      />
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <Field label="Restaurant Name" placeholder="e.g. Zuni Café" value={restaurantName} onChange={setRestaurantName} />
                <Field label="Address" placeholder="Start typing to search..." value={restaurantAddress} onChange={setRestaurantAddress} />
                <Field label="Must-Order Dish" placeholder="e.g. Whole Roast Chicken" value={mustOrder} onChange={setMustOrder} />

                {/* Price range */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider block mb-2" style={{ color: "#8B6E5A" }}>Price Range</label>
                  <div className="flex gap-2">
                    {PRICE_RANGES.map(p => (
                      <button
                        key={p}
                        onClick={() => setPriceRange(p)}
                        className="flex-1 py-3 rounded-2xl text-sm font-bold transition-all"
                        style={{
                          background: priceRange === p ? "#2C1810" : "#F0E8DC",
                          color: priceRange === p ? "#FFFCF8" : "#5C3D2E",
                        }}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add to Favorites Map */}
                <div
                  className="flex items-center justify-between p-4 rounded-2xl cursor-pointer"
                  style={{ background: "#FFFCF8", border: `2px solid ${addToMap ? "#C8614A" : "#DDD0C0"}` }}
                  onClick={() => setAddToMap(!addToMap)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🗺</span>
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "#2C1810" }}>Add to Favorites Map</p>
                      <p className="text-xs" style={{ color: "#8B6E5A" }}>Pin this to your profile map</p>
                    </div>
                  </div>
                  <div
                    className="w-11 h-6 rounded-full transition-all relative"
                    style={{ background: addToMap ? "#C8614A" : "#DDD0C0" }}
                  >
                    <div
                      className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all"
                      style={{ left: addToMap ? "22px" : "2px" }}
                    />
                  </div>
                </div>

                {addToMap && (
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider block mb-2" style={{ color: "#8B6E5A" }}>Add to Collection</label>
                    <div className="flex flex-wrap gap-2">
                      {["Date Night Spots", "Best Brunch", "Late Night Eats", "Special Occasion"].map(c => (
                        <button
                          key={c}
                          onClick={() => setCollection(c)}
                          className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all"
                          style={{
                            background: collection === c ? "#C8614A" : "#F2DDD8",
                            color: collection === c ? "#FFFCF8" : "#C8614A",
                          }}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            <button
              onClick={() => setStep("confirm")}
              className="w-full py-4 rounded-2xl font-semibold text-base transition-all active:scale-95 mt-4"
              style={{ background: "#C8614A", color: "#FFFCF8" }}
            >
              Preview Post →
            </button>
            <div className="h-4" />
          </div>
        )}

        {/* Step 4: Preview/Confirm */}
        {step === "confirm" && (
          <div>
            {/* Post preview */}
            <div style={{ background: "#FFFCF8" }}>
              {/* Header */}
              <div className="flex items-center gap-3 px-4 py-3">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&auto=format"
                  alt=""
                  className="w-9 h-9 rounded-full object-cover"
                  style={{ border: "2px solid #F2DDD8" }}
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold" style={{ color: "#2C1810" }}>Maya Chen</span>
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={postType === "meal"
                        ? { background: "#F2DDD8", color: "#C8614A" }
                        : { background: "#E8F0DC", color: "#5A6B3A" }}
                    >
                      {postType === "meal" ? "🍳 Home Cook" : "📍 Restaurant"}
                    </span>
                  </div>
                  <span className="text-xs" style={{ color: "#8B6E5A" }}>Just now</span>
                </div>
              </div>

              {/* Image */}
              <div style={{ aspectRatio: "1/1", background: "#E8DDD0" }}>
                <img src={selectedPhoto} alt="" className="w-full h-full object-cover" />
              </div>

              {/* Actions */}
              <div className="flex items-center gap-4 px-4 py-3">
                <div className="flex items-center gap-1.5">
                  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#2C1810" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                  <span className="text-sm font-medium" style={{ color: "#2C1810" }}>0</span>
                </div>
                <div className="flex-1" />
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="#2C1810" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>
              </div>

              <div className="px-4 pb-6">
                <p className="text-sm" style={{ color: "#2C1810" }}>
                  <span className="font-semibold mr-1">mayachen</span>
                  {caption || (postType === "meal" ? `A beautiful ${dishName || "dish"} I made today.` : `Just visited ${restaurantName || "this amazing spot"} — highly recommend!`)}
                </p>
                {postType === "restaurant" && restaurantName && (
                  <div className="mt-3 flex items-start gap-2 p-3 rounded-2xl" style={{ background: "#FAF6F0", border: "1px solid #DDD0C0" }}>
                    <span className="text-base">⭐</span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: "#8B6E5A" }}>Must Order</p>
                      <p className="text-xs font-semibold" style={{ color: "#2C1810" }}>{mustOrder || "Ask the server!"}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {addToMap && postType === "restaurant" && (
              <div className="mx-4 mt-3 p-4 rounded-2xl" style={{ background: "#E8F0DC", border: "1.5px solid #C8D4A4" }}>
                <div className="flex items-center gap-2">
                  <span>🗺</span>
                  <p className="text-sm font-semibold" style={{ color: "#3A5024" }}>
                    This will be pinned to your Favorites Map
                  </p>
                </div>
                {collection && (
                  <p className="text-xs mt-1 ml-6" style={{ color: "#5A7030" }}>
                    Added to "{collection}" collection
                  </p>
                )}
              </div>
            )}

            <div className="px-4 mt-4 mb-4">
              <button
                onClick={onClose}
                className="w-full py-4 rounded-2xl font-semibold text-base transition-all active:scale-95"
                style={{ background: "#C8614A", color: "#FFFCF8" }}
              >
                Share to plateful 🍽
              </button>
              <button
                onClick={() => setStep("details")}
                className="w-full py-3 text-sm font-medium mt-2"
                style={{ color: "#8B6E5A" }}
              >
                ← Edit Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, placeholder, value, onChange }: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div
      className="px-4 py-3.5 rounded-2xl border-2 transition-all"
      style={{ borderColor: value ? "#C8614A" : "#DDD0C0", background: "#FFFCF8" }}
    >
      <label className="text-[10px] font-bold uppercase tracking-wider block mb-1" style={{ color: "#8B6E5A" }}>
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="block w-full bg-transparent text-sm outline-none font-medium"
        style={{ color: "#2C1810" }}
      />
    </div>
  );
}
