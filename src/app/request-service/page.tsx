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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
      <div aria-hidden className="pointer-events-none fixed inset-0 bg-mesh-light" />

      <div className="relative mx-auto flex min-h-full w-full max-w-6xl items-start justify-center px-4 py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:items-center sm:px-8">
        <div className="w-full max-w-2xl rounded-[2rem] border border-line bg-white p-6 shadow-lift md:p-10">
          <p className="mx-auto flex w-fit items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden />
            Service request
          </p>
          <h1 className="mt-5 text-center font-display text-3xl font-semibold leading-tight tracking-[-0.04em] text-brand-950 md:text-5xl">
            Request the {pkg} package
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-slate-500 md:text-base">
            {userId
              ? "Please verify your business first. Then you can request a service."
              : "Create an account or sign in to request this package and save your progress."}
          </p>

          <div className="mx-auto mt-8 max-w-3xl">
            {/* Mobile: horizontal snap; desktop: grid */}
            <div className="snap-x-mandatory flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible sm:pb-0">
              {SERVICES.slice(0, 6).map((s) => (
                <div
                  key={s.id}
                  className="snap-start-center w-[85%] shrink-0 rounded-2xl border border-line bg-brand-50/50 p-4 text-left sm:w-auto"
                >
                  <p className="text-sm font-semibold text-brand-950">{s.name}</p>
                  <p className="mt-1 text-sm text-slate-500">{s.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-sm font-semibold text-brand-600">
              You need to verify your business before you can request a service.
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
                  className="inline-flex min-h-12 flex-1 cursor-not-allowed items-center justify-center rounded-full border border-line px-5 py-3 text-base font-semibold text-slate-400"
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
              className="text-sm font-semibold text-slate-500 underline-offset-4 hover:text-brand-600 hover:underline"
            >
              Back to pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
