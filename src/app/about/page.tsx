import SectionLabel from "@/components/ui/SectionLabel";
import FinalCTASection from "@/components/home/FinalCTASection";

export default function AboutPage() {
  return (
    <>
      <section className="bg-cliq-navy-900 pb-16 pt-36">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <SectionLabel className="bg-cliq-navy-700 text-cliq-teal">About Cedarce</SectionLabel>
          <h1 className="mt-6 text-5xl font-black text-white lg:text-6xl">
            We are your digital business buddy.
          </h1>
          <p className="mt-4 max-w-2xl text-white/70">
            Cedarce means Cedar + Commerce. We help your business move from manual operations to
            professional digital operations.
          </p>
        </div>
      </section>
      <section className="bg-cliq-white py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="rounded-2xl border border-cliq-gray-200 bg-white p-8 shadow-card">
              <h2 className="text-2xl font-black text-cliq-text-heading">The name story</h2>
              <p className="mt-3 text-cliq-text-body">
                Cedar stands for strength. Commerce stands for business. Together, Cedarce means
                strong business infrastructure for everyday Nigerian entrepreneurs.
              </p>
            </article>
            <article className="rounded-2xl border border-cliq-gray-200 bg-white p-8 shadow-card">
              <h2 className="text-2xl font-black text-cliq-text-heading">Founder story</h2>
              <p className="mt-3 text-cliq-text-body">
                I started Cedarce because I saw too many good businesses in Lagos losing sales
                because they looked informal online. Your hustle deserves professional systems.
              </p>
            </article>
          </div>
        </div>
      </section>
      <section className="bg-cliq-navy-800 py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-black text-white">
            Building the digital infrastructure for African business.
          </h3>
          <p className="mt-3 text-white/70">
            Mission: Every Nigerian SME deserves to operate professionally.
          </p>
        </div>
      </section>
      <FinalCTASection />
    </>
  );
}
