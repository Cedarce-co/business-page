import AdminSessionProvider from "@/components/admin/AdminSessionProvider";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <AdminSessionProvider>{children}</AdminSessionProvider>;
}
