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

function Layout() {
  const location = useLocation();

  // Hide TopBar on specific pages
  const hideTopBar = ["/success", "/auth/callback"].includes(location.pathname);

  return (

    <div className="fixed inset-0 flex flex-col bg-[#0f0f0f] text-gray-100">
      {/* TopBar */}
      {!hideTopBar && (
        <div className="flex-shrink-0">
          <TopBar />
        </div>
      )}

      {/* Main content area (fills remaining space) */}
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/success" element={<Success />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/profile" element={<ProfileSettings />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </main>
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
