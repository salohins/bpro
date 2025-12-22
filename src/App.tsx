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
import BackgroundFX from "./components/BackgroundFX";
import Footer from "./components/Footer";
import AdminOnboarding from "./pages/AdminOnBoarding";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ImprintPage from "./pages/ImprintPage";
import TermsPage from "./pages/TermsPage";
import FaqPage from "./pages/FAQPage";

function Layout() {
  const location = useLocation();
  const hideTopBar = ["/success", "/auth/callback"].includes(location.pathname);

  return (
    <div className=" flex flex-col bg-[#0f0f0f] text-gray-100">
      {/* TopBar */}
      {!hideTopBar && (
        <div className="flex-shrink-0">
          <TopBar />
        </div>
      )}

      {/* Main grows, footer stays after it */}
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
