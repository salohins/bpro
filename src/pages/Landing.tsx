
import CTABreakoutPro from "../components/landing/CTABreakoutPRO";
import FilterEngine from "../components/landing/FilterEngine";
import HeroSection from "../components/landing/HeroSection";
import ScoringSystem from "../components/landing/ScoringSystem";
import TradeModes from "../components/landing/TradeModes";
import FAQSection from "../components/landing/FAQSection";
import Footer from "../components/Footer";
import AdaptiveTrendCloud from "../components/landing/AdaptiveTrendCloutd";
import FutureTargets from "../components/landing/FutureTargets";
import ProfitCases from "../components/landing/profitCases";
import CoreEngines from "../components/landing/CoreEngines";
import WorkflowBPro from "../components/landing/WorkflowBPro";
import PrecisionEntryDetection from "../components/landing/PercisionEntryDetection";
import SignalLanguageSection from "../components/landing/SignalLanguageSection";

export default function Landing() {
    return (
        <div className="w-full min-h-screen bg-[#0b0b0b] text-white overflow-x-hidden">
            <HeroSection />
            <CoreEngines />
            <TradeModes />
            <AdaptiveTrendCloud />
            <FutureTargets />
            <FilterEngine />
            <PrecisionEntryDetection />
            <SignalLanguageSection />
            <ScoringSystem />
            <ProfitCases />
            <WorkflowBPro />
            <CTABreakoutPro />
            {/* Other sections coming next */}
        </div>
    );
}
