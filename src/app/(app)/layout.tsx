import { DesktopSidebar } from "@/components/layout/DesktopSidebar";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { UtnHeader } from "@/components/layout/UtnHeader";
import { Footer } from "@/components/layout/Footer";
import { AuthGuard } from "@/components/layout/AuthGuard";

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-slate-950">
        <DesktopSidebar />
        <MobileDrawer />
        <main className="flex min-h-screen flex-col pb-20 md:pb-0 md:pl-64">
          <UtnHeader />
          <div className="flex-1">{children}</div>
          <Footer />
        </main>
        <MobileBottomNav />
      </div>
    </AuthGuard>
  );
}
