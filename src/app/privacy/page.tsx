import PrivacyPolicyDocument from "@/components/legal/PrivacyPolicyDocument";
import MarketingPageHeader from "@/components/navigation/MarketingPageHeader";

export default function PrivacyPage() {
  return (
    <section className="relative border-b border-line bg-white pb-24">
      <MarketingPageHeader tone="dark" className="pb-4" />
      <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
        <PrivacyPolicyDocument />
      </div>
    </section>
  );
}
