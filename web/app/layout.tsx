import "./globals.css";
import type { Metadata } from "next";
import { Providers } from "@/components/providers";
import { AuthGuard } from "@/components/auth-guard";

export const metadata: Metadata = {
  title: "TradeMandu Web",
  description: "Nepal-first investing dashboard built on the existing TradeMandu backend."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AuthGuard>{children}</AuthGuard>
        </Providers>
      </body>
    </html>
  );
}

