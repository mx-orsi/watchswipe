"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const tabs = [
  { href: "/discover", label: "Discover", icon: "◎" },
  { href: "/collection", label: "Collection", icon: "✦" },
  { href: "/profile", label: "Profile", icon: "☾" }
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <motion.nav
      className="z-30 flex w-full justify-center"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
    >
      <div className="glass flex w-full items-center justify-between rounded-full border border-white/5 bg-black/80 px-2 py-2 shadow-soft-card backdrop-blur-2xl">
        {tabs.map((tab) => {
          const active =
            pathname === tab.href ||
            (tab.href === "/discover" && pathname === "/");
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="relative flex flex-1 items-center justify-center rounded-full px-2 py-2 text-xs font-medium"
            >
              {active && (
                <motion.div
                  layoutId="bottom-nav-pill"
                  className="absolute inset-x-1 inset-y-0 rounded-full bg-accent/15 ring-1 ring-accent/20"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative flex items-center gap-1.5">
                <span className={active ? "text-accent" : "text-muted"}>
                  {tab.icon}
                </span>
                <span
                  className={
                    active
                      ? "text-xs font-medium text-white"
                      : "text-[0.7rem] text-muted"
                  }
                >
                  {tab.label}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
