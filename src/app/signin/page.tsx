import Button from "@/components/ui/Button";

export default function SignInPage() {
  return (
    <section className="bg-cliq-white pb-20 pt-36">
      <div className="mx-auto max-w-[520px] px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-cliq-text-heading">Sign In</h1>
        <p className="mt-3 text-cliq-text-body">Portal access is coming soon. You can contact Cedarce directly for now.</p>
        <div className="mt-6">
          <Button href="/contact">Go to Contact</Button>
        </div>
      </div>
    </section>
  );
}
