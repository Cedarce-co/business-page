import { SERVICES } from "@/lib/constants";

export type WayfindingIconKey =
  | "home"
  | "building"
  | "tag"
  | "layers"
  | "globe"
  | "book"
  | "mail"
  | "file"
  | "shield"
  | "layout"
  | "users"
  | "clipboard"
  | "credit"
  | "smartphone"
  | "server"
  | "message"
  | "trending"
  | "log-in"
  | "user-plus"
  | "key";

export type WayfindingCrumb = {
  label: string;
  href: string | null;
  icon: WayfindingIconKey;
};

const SITE_SEGMENTS: Record<string, { label: string; icon: WayfindingIconKey }> = {
  about: { label: "About", icon: "building" },
  pricing: { label: "Pricing", icon: "tag" },
  services: { label: "Services", icon: "layers" },
  blog: { label: "Blog", icon: "book" },
  contact: { label: "Contact", icon: "mail" },
  privacy: { label: "Privacy", icon: "file" },
  terms: { label: "Terms", icon: "file" },
  "forgot-password": { label: "Forgot password", icon: "key" },
  "reset-password": { label: "Reset password", icon: "key" },
};

function serviceIconKey(id: string): WayfindingIconKey {
  const s = SERVICES.find((x) => x.id === id);
  const map: Record<string, WayfindingIconKey> = {
    Globe: "globe",
    Smartphone: "smartphone",
    Server: "server",
    Mail: "mail",
    CreditCard: "credit",
    FileText: "file",
    MessageSquare: "message",
    TrendingUp: "trending",
    Users: "users",
    Megaphone: "message",
  };
  if (s?.icon && map[s.icon]) return map[s.icon];
  return "layers";
}

function titleCase(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function buildSiteCrumbs(pathname: string): WayfindingCrumb[] {
  const clean = pathname.split("?")[0] ?? "/";
  const parts = clean.split("/").filter(Boolean);
  const crumbs: WayfindingCrumb[] = [{ label: "Home", href: "/", icon: "home" }];

  if (parts.length === 0) return crumbs;

  if (parts[0] === "services" && parts[1]) {
    crumbs.push({ label: "Services", href: "/services", icon: "layers" });
    const svc = SERVICES.find((x) => x.id === parts[1]);
    crumbs.push({
      label: svc?.name ?? titleCase(parts[1]),
      href: null,
      icon: serviceIconKey(parts[1]),
    });
    return crumbs;
  }

  let acc = "";
  parts.forEach((part, i) => {
    acc += `/${part}`;
    const isLast = i === parts.length - 1;
    const meta = SITE_SEGMENTS[part] ?? { label: titleCase(part), icon: "layers" as WayfindingIconKey };
    crumbs.push({
      label: meta.label,
      href: isLast ? null : acc,
      icon: isLast ? meta.icon : meta.icon,
    });
  });

  return crumbs;
}

const DASH_SEGMENTS: Record<string, { label: string; icon: WayfindingIconKey }> = {
  dashboard: { label: "Dashboard", icon: "layout" },
  profile: { label: "Profile", icon: "users" },
  kyc: { label: "Verification", icon: "shield" },
  "request-service": { label: "Request service", icon: "clipboard" },
  "service-requests": { label: "My requests", icon: "clipboard" },
};

export function buildDashboardCrumbs(pathname: string): WayfindingCrumb[] {
  const clean = pathname.split("?")[0] ?? "/";
  const parts = clean.split("/").filter(Boolean);
  const crumbs: WayfindingCrumb[] = [{ label: "Home", href: "/", icon: "home" }];

  if (parts[0] !== "dashboard") return crumbs;

  let acc = "";
  parts.forEach((part, i) => {
    acc += `/${part}`;
    const isLast = i === parts.length - 1;
    const meta = DASH_SEGMENTS[part] ?? { label: titleCase(part), icon: "layout" as WayfindingIconKey };
    crumbs.push({
      label: meta.label,
      href: isLast ? null : acc,
      icon: meta.icon,
    });
  });

  return crumbs;
}

export function buildAdminCrumbs(pathname: string): WayfindingCrumb[] {
  const clean = pathname.split("?")[0] ?? "/";
  const parts = clean.split("/").filter(Boolean);
  const crumbs: WayfindingCrumb[] = [{ label: "Home", href: "/", icon: "home" }];

  if (parts[0] !== "admin") return crumbs;

  if (parts[1] === "dashboard" && parts.length === 2) {
    crumbs.push({ label: "Dashboard", href: null, icon: "layout" });
    return crumbs;
  }

  crumbs.push({ label: "Admin", href: "/admin/dashboard", icon: "shield" });

  if (parts[1] === "users") {
    crumbs.push({ label: "Users", href: parts.length > 2 ? "/admin/users" : null, icon: "users" });
    if (parts[2]) {
      crumbs.push({ label: "User", href: null, icon: "users" });
    }
    return crumbs;
  }

  if (parts[1] === "requests" && parts[2]) {
    crumbs.push({ label: "Service request", href: null, icon: "clipboard" });
    return crumbs;
  }

  return crumbs;
}

export function buildAuthCrumbs(pathname: string): WayfindingCrumb[] {
  const base = pathname.split("?")[0] ?? "/";
  const crumbs: WayfindingCrumb[] = [{ label: "Home", href: "/", icon: "home" }];

  if (base === "/signin") {
    crumbs.push({ label: "Sign in", href: null, icon: "log-in" });
  } else if (base === "/signup") {
    crumbs.push({ label: "Create account", href: null, icon: "user-plus" });
  } else if (base === "/admin") {
    crumbs.push({ label: "Admin sign-in", href: null, icon: "shield" });
  } else {
    crumbs.push({ label: "Portal", href: null, icon: "layout" });
  }

  return crumbs;
}
