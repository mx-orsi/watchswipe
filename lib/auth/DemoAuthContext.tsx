"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState
} from "react";

interface DemoUser {
  id: string;
  email: string;
}

interface AuthContextValue {
  user: DemoUser | null;
  loading: boolean;
  signInWithPassword: (params: {
    email: string;
    password: string;
  }) => Promise<{ error: string | null }>;
  signUpWithPassword: (params: {
    email: string;
    password: string;
  }) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const DEMO_USER: DemoUser = {
  id: "demo-user-id",
  email: "demo@watchswipe.app"
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(DEMO_USER);
  const [loading] = useState<boolean>(false);

  const signInWithPassword = useCallback(
    async ({
      email
    }: {
      email: string;
      password: string;
    }): Promise<{ error: string | null }> => {
      setUser({ ...DEMO_USER, email });
      return { error: null };
    },
    []
  );

  const signUpWithPassword = useCallback(
    async ({
      email
    }: {
      email: string;
      password: string;
    }): Promise<{ error: string | null }> => {
      setUser({ ...DEMO_USER, email });
      return { error: null };
    },
    []
  );

  const signOut = useCallback(async () => {
    setUser(null);
  }, []);

  const value: AuthContextValue = {
    user,
    loading,
    signInWithPassword,
    signUpWithPassword,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}

