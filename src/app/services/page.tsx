import SectionLabel from "@/components/ui/SectionLabel";
import ServicesGrid from "@/components/home/ServicesGrid";
import FinalCTASection from "@/components/home/FinalCTASection";

export default function ServicesPage() {
  return (
    <>
      <section className="bg-cliq-navy-900 pb-16 pt-0 text-center">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <SectionLabel className="bg-cliq-navy-700 text-cliq-teal">Services</SectionLabel>
          <h1 className="mt-6 text-5xl font-black text-white lg:text-6xl">Five pillars. Full-stack delivery.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/70">
            Pick a pillar. See exactly what you get, who it&apos;s for, and how to start. Then create your account or book a call. No vague promises.
          </p>
        </div>
      </section>
      <ServicesGrid />
      <FinalCTASection />
    </>
  );
}
