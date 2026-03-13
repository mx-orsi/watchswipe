import type { Metadata } from "next";
import "./globals.css";
import { ReactNode } from "react";
import { SupabaseProvider } from "@/lib/supabase/SupabaseProvider";
import { AuthProvider } from "@/lib/auth/DemoAuthContext";
import { MobileAppShell } from "@/components/MobileAppShell";

export const metadata: Metadata = {
  title: "WatchSwipe",
  description: "Discover microbrand watches with a premium swipe experience."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <SupabaseProvider>
          <AuthProvider>
            <MobileAppShell>{children}</MobileAppShell>
          </AuthProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}

