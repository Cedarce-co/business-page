import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import ProblemSection from "@/components/home/ProblemSection";
import MarqueeSection from "@/components/home/MarqueeSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import OurWorkSection from "@/components/home/OurWorkSection";
import FinalCTASection from "@/components/home/FinalCTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <MarqueeSection />
      <ProblemSection />
      <HowItWorksSection />
      <OurWorkSection />
      <FinalCTASection />
    </>
  );
}
