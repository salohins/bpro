import { ReactNode, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "./lib/supabase";

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
import PricingPage from "./pages/PricingPage";
import SupportPage from "./pages/SupportPage";

import CookieBanner from "./components/CookieBanner";

// ✅ NEW: GA SPA pageviews (adjust path if needed)
import GAPageViews from "./components/GAPageViews";
import ResetPassword from "./pages/ResetPassword";

function RequireAdmin({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        // 1) must be logged in
        const { data: userData } = await supabase.auth.getUser();
        const user = userData?.user;

        if (!user) {
          navigate("/login", { replace: true });
          return;
        }

        // 2) must be admin
        const { data, error } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", user.id)
          .maybeSingle();

        if (error) {
          console.warn("RequireAdmin: failed to read is_admin:", error.message);
          navigate("/", { replace: true });
          return;
        }

        const isAdmin = Boolean((data as any)?.is_admin);
        if (!isAdmin) {
          navigate("/", { replace: true });
          return;
        }
      } finally {
        if (alive) setChecking(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [navigate]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Checking access…
      </div>
    );
  }

  return <>{children}</>;
}

function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // If you use hash links for landing sections (/#core-engines), let the hash handle scrolling
    if (hash) return;

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname, search, hash]);

  return null;
}

function GlobalBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden transform-gpu will-change-transform"
    >
      {/* base + blooms */}
      <div className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(16,185,129,0.18),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_58%,rgba(255,255,255,0.08),transparent_62%)]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/55 via-black/20 to-transparent" />

      {/* Swiss grid (lighter on mobile to avoid scroll jank / flashing) */}
      <div className="absolute inset-0 opacity-[0.14]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.18)_1px,transparent_1px)] bg-[size:80px_80px]" />

        {/* hide the dense 20px grid on mobile */}
        <div className="absolute inset-0 hidden md:block bg-[linear-gradient(to_right,rgba(255,255,255,.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.10)_1px,transparent_1px)] bg-[size:20px_20px]" />

        {/* mask only on md+ (mask-image can cause mobile compositing glitches) */}
        <div className="absolute inset-0 bg-black md:[mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      </div>


      {/* film grain (disable blend mode on mobile; blend modes often flash during scroll) */}
      <div
        className="
          absolute inset-0 opacity-[0.05]
          mix-blend-normal md:mix-blend-overlay
          [background-image:url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22120%22 height=%22120%22 filter=%22url(%23n)%22 opacity=%220.35%22/%3E%3C/svg%3E')]
        "
      />
    </div>
  );
}

function Layout() {
  const location = useLocation();
  const hideTopBar = ["/success", "/auth/callback"].includes(location.pathname);

  return (
    <div className="relative flex min-h-[100dvh] flex-col bg-black text-gray-100">
      <GlobalBackground />

      {/* ✅ GA pageviews for SPA routes */}
      <GAPageViews />

      {/* ✅ scroll to top on route changes */}
      <ScrollToTop />

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

          {/* ✅ PROTECTED ADMIN ROUTE */}
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminOnboarding />
              </RequireAdmin>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/imprint" element={<ImprintPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </main>

      <div className="flex-shrink-0">
        <Footer />
      </div>

      {/* ✅ Cookie banner (global) */}
      <CookieBanner />
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
