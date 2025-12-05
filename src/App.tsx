import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Success from "./pages/Success";
import Dashboard from "./pages/Dashboard";
import AuthCallback from "./pages/AuthCallback";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/success" element={<Success />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </BrowserRouter>
  );
}
