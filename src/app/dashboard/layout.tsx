import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

/**
 * Protected Dashboard Layout
 *
 * Server-side auth check — redirects to signin if not authenticated.
 * Only ADMIN and ARTISAN roles can access.
 */
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  if (session.user.role !== "ADMIN" && session.user.role !== "ARTISAN") {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-[#f8f5f3]">
      {/* Dashboard Header */}
      <header className="bg-white border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-black text-[#4a3a35]">
            dip<span className="text-primary">.</span>crochet{" "}
            <span className="text-muted-foreground font-medium text-sm">Dashboard</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-muted-foreground">
            {session.user.name}
          </span>
          <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-md">
            {session.user.role}
          </span>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="p-6 max-w-7xl mx-auto">{children}</main>
    </div>
  );
}
