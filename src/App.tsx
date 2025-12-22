import { useMemo } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Success from "./pages/Success";
import Dashboard from "./pages/Dashboard";
import AuthCallback from "./pages/AuthCallback";
import TopBar from "./components/TopBar";
import Subscribe from "./pages/Subscribe";
import Subscription from "./pages/Subscription";
import ProfileSettings from "./pages/ProfileSettings";
import Login from "./pages/Login";

import Footer from "./components/Footer";
import AdminOnboarding from "./pages/AdminOnBoarding";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ImprintPage from "./pages/ImprintPage";
import TermsPage from "./pages/TermsPage";
import FaqPage from "./pages/FAQPage";

function GlobalBackground() {
  // ✅ fewer particles + more subtle
  const particles = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => {
        const r1 = ((i * 73) % 101) / 100;
        const r2 = ((i * 41 + 17) % 97) / 96;
        const r3 = ((i * 29 + 7) % 89) / 88;

        const size = 10 + Math.round(r1 * 22); // 10..32
        const dur = 10 + r2 * 12; // 10..22s
        const delay = -r3 * 16;
        const blur = 3 + r2 * 7; // a bit less glow
        const opacity = 0.06 + r1 * 0.10; // ✅ (0.06..0.16) cap opacity

        return {
          id: i,
          left: `${Math.round(r2 * 100)}%`,
          top: `${Math.round(r1 * 100)}%`,
          size,
          dur,
          delay,
          blur,
          opacity,
          drift: 10 + Math.round(r2 * 20), // 10..30px
          rise: 130 + Math.round(r1 * 210), // 130..340px
        };
      }),
    []
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {/* base + blooms */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(16,185,129,0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_58%,rgba(255,255,255,0.08),transparent_62%)]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />

      {/* Swiss grid */}
      <div className="absolute inset-0 opacity-[0.14]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.18)_1px,transparent_1px)] bg-[size:80px_80px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.10)_1px,transparent_1px)] bg-[size:20px_20px]" />
        <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] bg-black" />
      </div>

      {/* particles (flying dollars) */}
      <style>{`
        @keyframes floatParticle {
          0%   { transform: translate3d(0, 0, 0) scale(0.98); opacity: 0; }
          12%  { opacity: var(--op); }
          55%  { transform: translate3d(var(--drift), calc(var(--rise) * -0.55), 0) scale(1.06); opacity: var(--op); }
          88%  { opacity: var(--op); }
          100% { transform: translate3d(calc(var(--drift) * 0.3), calc(var(--rise) * -1), 0) scale(1.02); opacity: 0; }
        }
      `}</style>

      <div className="absolute inset-0">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute select-none"
            style={{
              left: p.left,
              top: p.top,
              fontSize: p.size,
              lineHeight: 1,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              // ✅ keyframes control fade; --op caps max opacity
              ["--drift" as any]: `${p.drift}px`,
              ["--rise" as any]: `${p.rise}px`,
              ["--op" as any]: p.opacity,
              // ✅ more subtle color + much softer glow
              color: "rgba(110,231,183,0.55)",
              textShadow: `0 0 ${Math.max(4, p.blur)}px rgba(16,185,129,0.12)`,
              willChange: "transform, opacity",
              animation: `floatParticle ${p.dur}s linear ${p.delay}s infinite`,
            }}
          >
            $
          </span>
        ))}
      </div>

      {/* film grain */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')]" />
    </div>
  );
}

function Layout() {
  const location = useLocation();
  const hideTopBar = ["/success", "/auth/callback"].includes(location.pathname);

  return (
    <div className="relative flex min-h-screen flex-col text-gray-100">
      <GlobalBackground />

      {!hideTopBar && (
        <div className="flex-shrink-0">
          <TopBar />
        </div>
      )}

      <main className="flex-1 pt-10 md:pt-15">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/success" element={<Success />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/profile" element={<ProfileSettings />} />
          <Route path="/admin" element={<AdminOnboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/imprint" element={<ImprintPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>

      <div className="flex-shrink-0">
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
