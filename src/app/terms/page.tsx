import TermsOfServiceDocument from "@/components/legal/TermsOfServiceDocument";
import MarketingPageHeader from "@/components/navigation/MarketingPageHeader";

export default function TermsPage() {
  return (
    <section className="relative border-b border-cliq-gray-200 bg-mesh-light pb-24">
      <MarketingPageHeader tone="light" className="pb-4" />
      <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
        <TermsOfServiceDocument />
      </div>
    </section>
  );
}
