import { Navbar } from "@/components/navbar";
import { MobileNav } from "@/components/mobile-nav";
import { Sidebar } from "@/components/sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Navbar />
        <main className="flex-1 px-4 py-6 md:px-6">{children}</main>
        <MobileNav />
      </div>
    </div>
  );
}
