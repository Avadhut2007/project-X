import { useState } from "react";

interface Props {
  onAuth: () => void;
}

export default function AuthScreen({ onAuth }: Props) {
  const [mode, setMode] = useState<"landing" | "phone">("landing");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [step, setStep] = useState<"phone" | "otp" | "profile">("phone");
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");

  if (mode === "landing") {
    return (
      <div className="h-dvh md:h-auto md:min-h-0 flex flex-col w-full max-w-sm relative overflow-hidden rounded-none md:rounded-3xl md:shadow-2xl" style={{ background: "#2C1810" }}>
        {/* Hero image */}
        <div className="relative flex-1 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=750&h=900&fit=crop&auto=format"
            alt="Colorful food spread"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom, rgba(44,24,16,0.1) 0%, rgba(44,24,16,0.0) 40%, rgba(44,24,16,0.85) 100%)",
            }}
          />
          {/* Logo overlay on image */}
          <div className="absolute top-14 left-6 right-6">
            <div className="flex items-center gap-2">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
                style={{ background: "#C8614A" }}
              >
                🍽
              </div>
              <span className="font-display text-2xl font-semibold text-white" style={{ letterSpacing: "-0.02em" }}>
                plateful
              </span>
            </div>
          </div>

          {/* Bottom copy */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-6">
            <h1 className="font-display text-4xl font-semibold text-white leading-tight mb-2" style={{ letterSpacing: "-0.03em" }}>
              Your food, your city, your story.
            </h1>
            <p className="text-sm text-white/75 leading-relaxed">
              Cook, explore, and share the places that feed you.
            </p>
          </div>
        </div>

        {/* Auth panel */}
        <div className="rounded-t-3xl px-6 pt-7 pb-10 flex flex-col gap-3" style={{ background: "#FFFCF8" }}>
          <button
            onClick={onAuth}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl border font-medium text-sm transition-all active:scale-95"
            style={{ borderColor: "#DDD0C0", background: "#FFFFFF", color: "#2C1810" }}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>

          <button
            onClick={onAuth}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl font-medium text-sm transition-all active:scale-95"
            style={{ background: "#1C1C1E", color: "#FFFFFF" }}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="white">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            Continue with Apple
          </button>

          <button
            onClick={() => setMode("phone")}
            className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl border font-medium text-sm transition-all active:scale-95"
            style={{ borderColor: "#DDD0C0", background: "#FAF6F0", color: "#5C3D2E" }}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            Continue with Phone
          </button>

          <p className="text-center text-xs mt-1" style={{ color: "#8B6E5A" }}>
            By continuing, you agree to our{" "}
            <span className="underline cursor-pointer">Terms</span> &amp;{" "}
            <span className="underline cursor-pointer">Privacy Policy</span>
          </p>
        </div>
      </div>
    );
  }

  // Phone auth flow
  return (
    <div className="h-dvh md:h-auto md:min-h-[600px] flex flex-col w-full max-w-sm md:rounded-3xl md:shadow-2xl overflow-hidden" style={{ background: "#FAF6F0" }}>
      <div className="flex items-center gap-3 px-6 pt-14 pb-6">
        <button onClick={() => setMode("landing")} className="p-2 -ml-2 rounded-xl" style={{ color: "#8B6E5A" }}>
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
          style={{ background: "#C8614A" }}
        >
          🍽
        </div>
        <span className="font-display text-xl font-semibold" style={{ color: "#2C1810", letterSpacing: "-0.02em" }}>
          plateful
        </span>
      </div>

      <div className="flex-1 px-6 pt-4">
        {step === "phone" && (
          <>
            <h2 className="font-display text-3xl font-semibold mb-2" style={{ color: "#2C1810", letterSpacing: "-0.02em" }}>
              What's your number?
            </h2>
            <p className="text-sm mb-8" style={{ color: "#8B6E5A" }}>
              We'll send you a one-time code to verify.
            </p>
            <div
              className="flex items-center gap-3 px-4 py-4 rounded-2xl border-2 mb-4 transition-all"
              style={{ borderColor: "#C8614A", background: "#FFFCF8" }}
            >
              <span className="text-base font-medium" style={{ color: "#2C1810" }}>🇺🇸 +1</span>
              <div className="w-px h-5" style={{ background: "#DDD0C0" }} />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 000-0000"
                className="flex-1 bg-transparent text-base outline-none font-medium"
                style={{ color: "#2C1810" }}
              />
            </div>
            <button
              onClick={() => setStep("otp")}
              className="w-full py-4 rounded-2xl font-semibold text-base transition-all active:scale-95"
              style={{ background: "#C8614A", color: "#FFFCF8" }}
            >
              Send Code
            </button>
          </>
        )}

        {step === "otp" && (
          <>
            <h2 className="font-display text-3xl font-semibold mb-2" style={{ color: "#2C1810", letterSpacing: "-0.02em" }}>
              Enter the code
            </h2>
            <p className="text-sm mb-8" style={{ color: "#8B6E5A" }}>
              Sent to {phone || "+1 (555) 000-0000"}
            </p>
            <div className="flex gap-2.5 mb-8">
              {otp.map((digit, i) => (
                <div
                  key={i}
                  className="flex-1 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold border-2 transition-all"
                  style={{
                    borderColor: digit ? "#C8614A" : "#DDD0C0",
                    background: "#FFFCF8",
                    color: "#2C1810",
                  }}
                >
                  {digit || "·"}
                </div>
              ))}
            </div>
            {/* Simulated numpad */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {["1","2","3","4","5","6","7","8","9","","0","⌫"].map((key, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (key === "") return;
                    if (key === "⌫") {
                      const newOtp = [...otp];
                      const lastFilled = newOtp.map((d,i) => d ? i : -1).filter(i => i >= 0).pop() ?? -1;
                      if (lastFilled >= 0) { newOtp[lastFilled] = ""; setOtp(newOtp); }
                    } else {
                      const newOtp = [...otp];
                      const firstEmpty = newOtp.findIndex(d => !d);
                      if (firstEmpty >= 0) {
                        newOtp[firstEmpty] = key;
                        setOtp(newOtp);
                        if (firstEmpty === 5) setTimeout(() => setStep("profile"), 300);
                      }
                    }
                  }}
                  className="h-14 rounded-2xl text-xl font-semibold transition-all active:scale-95"
                  style={{
                    background: key ? "#FFFCF8" : "transparent",
                    color: "#2C1810",
                    border: key ? "1.5px solid #DDD0C0" : "none",
                  }}
                >
                  {key}
                </button>
              ))}
            </div>
          </>
        )}

        {step === "profile" && (
          <>
            <h2 className="font-display text-3xl font-semibold mb-1" style={{ color: "#2C1810", letterSpacing: "-0.02em" }}>
              Almost there!
            </h2>
            <p className="text-sm mb-8" style={{ color: "#8B6E5A" }}>
              Tell us a little about yourself.
            </p>
            {/* Avatar picker */}
            <div className="flex justify-center mb-6">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center text-4xl border-4 cursor-pointer"
                style={{ borderColor: "#C8614A", background: "#F2DDD8" }}
              >
                👤
              </div>
            </div>
            <div className="space-y-3 mb-8">
              <div className="px-4 py-3.5 rounded-2xl border-2 transition-all" style={{ borderColor: "#DDD0C0", background: "#FFFCF8" }}>
                <label className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#8B6E5A" }}>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="@yourhandle"
                  className="block w-full bg-transparent text-base outline-none font-medium mt-0.5"
                  style={{ color: "#2C1810" }}
                />
              </div>
              <div className="px-4 py-3.5 rounded-2xl border-2 transition-all" style={{ borderColor: "#DDD0C0", background: "#FFFCF8" }}>
                <label className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: "#8B6E5A" }}>Home City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="San Francisco, CA"
                  className="block w-full bg-transparent text-base outline-none font-medium mt-0.5"
                  style={{ color: "#2C1810" }}
                />
              </div>
            </div>
            <button
              onClick={onAuth}
              className="w-full py-4 rounded-2xl font-semibold text-base transition-all active:scale-95"
              style={{ background: "#C8614A", color: "#FFFCF8" }}
            >
              Start Eating 🍴
            </button>
          </>
        )}
      </div>
    </div>
  );
}
