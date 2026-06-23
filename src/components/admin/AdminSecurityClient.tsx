"use client";

import MfaSecuritySettings from "@/components/security/MfaSecuritySettings";

function AdminPageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
        <p className="mt-1 max-w-2xl text-sm text-slate-600">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

function AdminCard({ children, className = "" }: { className?: string; children: React.ReactNode }) {
  return <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>;
}

export default function AdminSecurityClient({ email }: { email: string }) {
  return (
    <MfaSecuritySettings
      apiPath="/api/admin/mfa"
      email={email}
      portal="admin"
      PageShell={AdminPageShell}
      Card={AdminCard}
    />
  );
}
