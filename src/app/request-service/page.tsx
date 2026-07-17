import Link from "next/link";
import { redirect } from "next/navigation";
import Button from "@/components/ui/Button";
import { getServerAuthSession } from "@/server/auth/session";
import { prisma } from "@/lib/prisma";
import { SERVICES } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function PublicRequestServiceEntry({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const session = await getServerAuthSession();
  const params = await searchParams;
  const pkgRaw = params.package;
  const pkg = (Array.isArray(pkgRaw) ? pkgRaw[0] : pkgRaw) ?? "Business";

  const userId = session?.user?.id;
  if (userId) {
    const kyc = await prisma.kyc.findUnique({ where: { userId }, select: { status: true } });
    const approved = kyc?.status === "APPROVED";
    if (approved) redirect(`/dashboard/request-service?package=${encodeURIComponent(pkg)}&fresh=1`);
  }

  const callbackUrl = `/request-service?package=${encodeURIComponent(pkg)}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black">
      <div aria-hidden className="pointer-events-none fixed inset-0 bg-mesh-dark opacity-80" />

      <div className="relative mx-auto flex min-h-full w-full max-w-6xl items-start justify-center px-4 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:items-center sm:px-8">
        <div className="w-full max-w-2xl border border-white/15 bg-zinc-950 p-6 md:p-10">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-cedar-accent">
            Service request
          </p>
          <h1 className="mt-4 text-center font-display text-3xl leading-tight text-cedar-ivory md:text-5xl">
            Request the {pkg} package
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-cedar-mist md:text-base">
            {userId
              ? "Your account needs verification before you can submit a service request."
              : "To submit a request and save progress, please create an account or sign in."}
          </p>

          <div className="mx-auto mt-8 max-w-3xl">
            {/* Mobile: horizontal snap; desktop: grid */}
            <div className="snap-x-mandatory flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0">
              {SERVICES.slice(0, 6).map((s) => (
                <div
                  key={s.id}
                  className="snap-start-center w-[85%] shrink-0 border border-white/10 bg-black p-4 text-left sm:w-auto"
                >
                  <p className="text-sm font-semibold text-cedar-ivory">{s.name}</p>
                  <p className="mt-1 text-sm text-cedar-mist">{s.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-sm font-semibold text-cedar-accent">
              Verification is required before requesting any service.
            </p>
          </div>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row">
            {userId ? (
              <>
                <Button href="/dashboard/kyc" variant="accent" className="min-h-12 sm:flex-1">
                  Start verification
                </Button>
                <button
                  type="button"
                  disabled
                  className="inline-flex min-h-12 flex-1 cursor-not-allowed items-center justify-center rounded-lg border border-white/20 px-5 py-3 text-base font-semibold text-white/50"
                >
                  Request service (locked)
                </button>
              </>
            ) : (
              <>
                <Button
                  href={`/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`}
                  variant="accent"
                  className="min-h-12 sm:flex-1"
                >
                  Sign in
                </Button>
                <Button
                  href={`/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`}
                  variant="outlineLight"
                  className="min-h-12 sm:flex-1"
                >
                  Create account
                </Button>
              </>
            )}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/pricing"
              className="text-sm font-semibold text-cedar-mist underline-offset-4 hover:text-cedar-accent hover:underline"
            >
              Back to pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
