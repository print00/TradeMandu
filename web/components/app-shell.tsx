import { Navbar } from "@/components/navbar";
import { MobileNav } from "@/components/mobile-nav";
import { Sidebar } from "@/components/sidebar";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-transparent">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <Navbar />
        <main className="flex-1 px-4 py-5 md:px-6 lg:px-8">{children}</main>
        <MobileNav />
      </div>
    </div>
  );
}
