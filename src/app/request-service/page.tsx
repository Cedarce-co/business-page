import Link from "next/link";
import { redirect } from "next/navigation";
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
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.22),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(16,185,129,0.14),transparent_40%),linear-gradient(180deg,rgba(2,6,23,0.86)_0%,rgba(2,6,23,0.86)_100%)]" />
      <div className="absolute inset-0 backdrop-blur-[10px]" />

      <div className="relative mx-auto flex min-h-full w-full max-w-6xl items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-2xl rounded-3xl border border-white/15 bg-white/10 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.40)] backdrop-blur-xl md:p-10">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.28em] text-cyan-200">
            Service request
          </p>
          <h1 className="mt-4 text-center text-3xl font-black leading-tight text-white md:text-5xl">
            Request the {pkg} package
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-relaxed text-slate-200 md:text-base">
            {userId
              ? "Your account needs verification before you can submit a service request."
              : "To submit a request and save progress, please create an account or sign in."}
          </p>

          <div className="mx-auto mt-8 max-w-3xl">
            <div className="grid gap-3 sm:grid-cols-2">
              {SERVICES.slice(0, 6).map((s) => (
                <div key={s.id} className="rounded-2xl border border-white/15 bg-white/10 p-4 text-left">
                  <p className="text-sm font-bold text-white">{s.name}</p>
                  <p className="mt-1 text-sm text-slate-200">{s.desc}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-sm font-semibold text-amber-200">
              Verification is required before requesting any service.
            </p>
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {userId ? (
              <>
                <Link
                  href="/dashboard/kyc"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-white px-5 py-3 text-base font-semibold text-slate-900 hover:bg-slate-100 sm:w-1/2"
                >
                  Start verification
                </Link>
                <button
                  type="button"
                  disabled
                  className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-base font-semibold text-white/70 opacity-70 sm:w-1/2"
                >
                  Request service (locked)
                </button>
              </>
            ) : (
              <>
                <Link
                  href={`/signin?callbackUrl=${encodeURIComponent(callbackUrl)}`}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-white px-5 py-3 text-base font-semibold text-slate-900 hover:bg-slate-100 sm:w-1/2"
                >
                  Sign in
                </Link>
                <Link
                  href={`/signup?callbackUrl=${encodeURIComponent(callbackUrl)}`}
                  className="inline-flex w-full items-center justify-center rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-base font-semibold text-white hover:bg-white/15 sm:w-1/2"
                >
                  Create account
                </Link>
              </>
            )}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/pricing"
              className="text-sm font-semibold text-cyan-200/90 underline-offset-4 hover:underline hover:text-white"
            >
              Back to pricing
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

