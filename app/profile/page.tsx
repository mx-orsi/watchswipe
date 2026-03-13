 "use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/lib/auth/DemoAuthContext";
import { AuthModal } from "@/components/AuthModal";
import { useWatchStore } from "@/lib/store/watchStore";
import { FeedbackModal } from "@/components/FeedbackModal";

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const { saved } = useWatchStore();
  const [authOpen, setAuthOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out");
  };

  return (
    <>
      <div className="flex h-full flex-col gap-5 pb-4">
        <header className="space-y-1">
          <p className="text-[0.7rem] uppercase tracking-[0.2em] text-muted">
            Profile
          </p>
          <h1 className="text-lg font-medium">Your watch persona</h1>
        </header>

        <section className="glass space-y-3 rounded-3xl p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs text-muted">Account</p>
              <p className="text-sm font-medium">
                {user ? user.email : "Guest"}
              </p>
            </div>
            {user ? (
              <button
                type="button"
                onClick={handleLogout}
                className="touch-target rounded-full border border-borderSoft bg-surface px-3 py-1 text-[0.7rem] text-muted"
              >
                Log out
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setAuthOpen(true)}
                className="touch-target rounded-full bg-accent px-3 py-1 text-[0.7rem] font-medium text-black"
              >
                Sign in
              </button>
            )}
          </div>
          <p className="text-[0.75rem] text-muted">
            Sign in to keep your collection synced and ready wherever you browse
            from.
          </p>
        </section>

        <section className="glass space-y-3 rounded-3xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted">My Collection</p>
              <p className="text-sm font-medium">{saved.length} saved</p>
            </div>
          </div>
          <p className="text-[0.75rem] text-muted">
            A quick snapshot of how many pieces you have in rotation. Detailed
            stats coming soon.
          </p>
        </section>

        <section className="glass space-y-3 rounded-3xl p-4">
          <button
            type="button"
            onClick={() => setFeedbackOpen(true)}
            className="touch-target inline-flex items-center justify-center rounded-full border border-borderSoft bg-surface px-4 py-2 text-[0.7rem] text-muted hover:border-accent/40 hover:text-white"
          >
            Send feedback
          </button>
        </section>

        <section className="glass space-y-2 rounded-3xl p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            Watch personality (coming soon)
          </p>
          <p className="text-[0.8rem] text-muted">
            We&apos;re working on a way to map your saved pieces to a crisp,
            visual watch personality profile.
          </p>
        </section>
      </div>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
      <FeedbackModal open={feedbackOpen} onOpenChange={setFeedbackOpen} />
    </>
  );
}

