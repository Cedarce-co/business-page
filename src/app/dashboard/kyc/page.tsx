import KycFlow from "@/components/dashboard/KycFlow";
import { Page } from "@/components/dashboard/ui";

export default function KycPage() {
  return (
    <Page
      title="Verify your business"
      subtitle="We need to confirm who you are before we start work. It only takes a few minutes."
    >
      <KycFlow />
    </Page>
  );
}
