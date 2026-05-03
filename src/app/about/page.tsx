import SectionLabel from "@/components/ui/SectionLabel";
import FinalCTASection from "@/components/home/FinalCTASection";

export default function AboutPage() {
  return (
    <>
      <section className="bg-cliq-navy-900 pb-16 pt-0">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <SectionLabel className="bg-cliq-navy-700 text-cliq-teal">About us</SectionLabel>
          <h1 className="mt-6 text-5xl font-black text-white lg:text-6xl">
            You built the business. We build the system it runs on.
          </h1>
          <p className="mt-4 max-w-2xl text-white/70">
            We provide digital infrastructure for businesses that are tired of looking informal online. We move you from manual operations to professional, automated systems that win trust and get you paid.
          </p>
        </div>
      </section>
      <section className="bg-cliq-white py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-cliq-gray-200 bg-white p-8 shadow-card">
              <h2 className="text-2xl font-black text-cliq-text-heading">How we think</h2>
              <p className="mt-3 text-cliq-text-body">
                Strength and commerce belong together: infrastructure that holds up under real business
                stress, for everyday operators and founders.
              </p>
            </article>
            <article className="rounded-2xl border border-cliq-gray-200 bg-white p-8 shadow-card">
              <h2 className="text-2xl font-black text-cliq-text-heading">Founder story</h2>
              <p className="mt-3 text-cliq-text-body">
                We started this because strong businesses were losing sales they never knew about, simply because they didn&apos;t look verifiable online. Your product is good; your digital presence should prove it.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="bg-cliq-navy-800 py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-black text-white">
            When your digital presence is solid, customers stop negotiating and start buying.
          </h3>
          <p className="mt-3 text-white/70">
            Mission: Every serious SME deserves to look and run like the big players, without needing an in-house tech team.
          </p>
        </div>
      </section>
      <FinalCTASection />
    </>
  );
}
