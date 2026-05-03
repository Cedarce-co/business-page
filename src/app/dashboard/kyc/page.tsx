import KycFlow from "@/components/dashboard/KycFlow";
import { Page } from "@/components/dashboard/ui";

export default function KycPage() {
  return (
    <Page
      title="Account verification"
      subtitle="Complete this quick verification to unlock service requests. Profile settings and verification are intentionally separate."
    >
      <KycFlow />
    </Page>
  );
}
