import HeroSection from "@/components/home/HeroSection";
import TickerSection from "@/components/home/TickerSection";
import ProblemSection from "@/components/home/ProblemSection";
import FoodStorySection from "@/components/home/FoodStorySection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import AIBuddySection from "@/components/home/AIBuddySection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import StatsBanner from "@/components/home/StatsBanner";
import FinalCTASection from "@/components/home/FinalCTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <TickerSection />
      <ProblemSection />
      <FoodStorySection />
      <HowItWorksSection />
      <AIBuddySection />
      <TestimonialsSection />
      <StatsBanner />
      <FinalCTASection />
    </>
  );
}
