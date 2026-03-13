"use client";

import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { BottomNav } from "@/components/BottomNav";

interface MobileAppShellProps {
  children: ReactNode;
}

export function MobileAppShell({ children }: MobileAppShellProps) {
  return (
    <div className="app-shell">
      <div className="app-shell-inner">
        <main className="app-scroll px-5 pt-6 pb-4">{children}</main>

        <div
          className="app-bottom-nav-wrapper pointer-events-none px-4 pt-1"
          style={{
            paddingBottom: "max(0.9rem, env(safe-area-inset-bottom, 0.9rem))"
          }}
        >
          <div className="pointer-events-auto">
            <BottomNav />
          </div>
        </div>

        <Toaster
          position="top-center"
          toastOptions={{
            className:
              "bg-surfaceElevated text-white border border-borderSoft/70 rounded-2xl shadow-soft-card",
            duration: 2500
          }}
        />
      </div>
    </div>
  );
}
