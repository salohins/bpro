import BreakoutFramework from "../components/landing/BreakoutFramework";
import CorePillars from "../components/landing/CorePillars";
import CTABreakoutPro from "../components/landing/CTABreakoutPRO";
import FilterEngine from "../components/landing/FilterEngine";
import HeroSection from "../components/landing/HeroSection";
import ScoringSystem from "../components/landing/ScoringSystem";
import TradeModes from "../components/landing/TradeModes";
import FAQSection from "../components/landing/FAQSection";
import Footer from "../components/Footer";
import AdaptiveTrendCloud from "../components/landing/AdaptiveTrendCloutd";
import FutureTargets from "../components/landing/FutureTargets";
import WhatIsBProSection from "../components/landing/WhatIsBProSection";

export default function Landing() {
    return (
        <div className="w-full min-h-screen bg-[#0b0b0b] text-white overflow-x-hidden">
            <HeroSection />
            <WhatIsBProSection />
            <AdaptiveTrendCloud />
            <BreakoutFramework />
            <FutureTargets />
            <FilterEngine />
            <ScoringSystem />
            <TradeModes />
            <CTABreakoutPro />
            <FAQSection />
            <Footer />
            {/* Other sections coming next */}
        </div>
    );
}
