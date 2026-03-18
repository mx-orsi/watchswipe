"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "@/lib/auth";
import toast from "react-hot-toast";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const { signInWithPassword, signUpWithPassword } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onOpenChange(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    const action =
      mode === "login" ? signInWithPassword : signUpWithPassword;
    const { error } = await action({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success(mode === "login" ? "Welcome back" : "Check your inbox");
    onOpenChange(false);
  };

  const content = (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 px-4">
      <div className="glass w-full max-w-sm rounded-3xl p-5 shadow-soft-card">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted">
              {mode === "login" ? "Log in" : "Create account"}
            </p>
            <h2 className="text-lg font-semibold">Save your collection</h2>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="touch-target rounded-full border border-borderSoft bg-surface px-2 py-1 text-xs text-muted"
          >
            Esc
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <div className="space-y-1.5">
            <label className="text-[0.7rem] text-muted">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-borderSoft bg-black/20 px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[0.7rem] text-muted">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-borderSoft bg-black/20 px-3 py-2 text-sm outline-none focus:border-accent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="touch-target mt-2 flex w-full items-center justify-center rounded-full bg-accent px-4 py-2.5 text-sm font-medium text-black disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Continue"
              : "Create account"}
          </button>
        </form>

        <div className="mt-4 text-center text-[0.7rem] text-muted">
          {mode === "login" ? (
            <button
              type="button"
              onClick={() => setMode("signup")}
              className="text-accent underline-offset-2 hover:underline"
            >
              New here? Create an account
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setMode("login")}
              className="text-accent underline-offset-2 hover:underline"
            >
              Already have an account? Log in
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if (typeof document === "undefined" || !open) return null;

  return createPortal(content, document.body);
}

