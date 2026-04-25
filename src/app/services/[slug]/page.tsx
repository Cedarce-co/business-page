import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import { Globe } from "lucide-react";
import FinalCTASection from "@/components/home/FinalCTASection";

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.id }));
}

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((item) => item.id === slug);
  if (!service) notFound();

  return (
    <>
      <section className="bg-cliq-navy-900 pb-16 pt-36">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-cliq-teal">Service Details</p>
          <div className="mt-4 flex items-center gap-3">
            <Globe className="h-8 w-8 text-cliq-teal" />
            <h1 className="text-4xl font-black text-white lg:text-5xl">{service.name}</h1>
          </div>
          <p className="mt-4 max-w-3xl text-white/70">{service.desc}</p>
          <p className="mt-3 text-cliq-teal">{service.price}</p>
        </div>
      </section>

      <section className="bg-cliq-white py-20">
        <div className="mx-auto grid max-w-[1200px] gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {["What is included", "Who it is for", "How we deliver"].map((title) => (
            <article key={title} className="rounded-2xl border border-cliq-gray-200 bg-white p-6 shadow-card">
              <h2 className="text-xl font-bold text-cliq-text-heading">{title}</h2>
              <ul className="mt-4 space-y-2 text-sm text-cliq-text-body">
                <li>✓ Tailored setup for your business stage</li>
                <li>✓ Hands-on support from planning to launch</li>
                <li>✓ Professional handover and team onboarding</li>
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-cliq-gray-100 py-20">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-black text-cliq-text-heading">Related services</h3>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {SERVICES.filter((s) => s.id !== service.id)
              .slice(0, 3)
              .map((item) => (
                <Link
                  key={item.id}
                  href={`/services/${item.id}`}
                  className="rounded-2xl border border-cliq-gray-200 bg-white p-5 text-cliq-text-heading shadow-card"
                >
                  {item.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
      <FinalCTASection />
    </>
  );
}
