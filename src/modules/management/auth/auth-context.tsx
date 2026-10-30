import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import * as usersApi from "../../../apis/users-api";
import type { SafeUser } from "../../../apis/users-api";
import { clearStoredToken, getStoredToken, setStoredToken } from "../../../apis/api-client";

type AuthContextValue = {
  user: SafeUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SafeUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getStoredToken();
    if (!token) {
      setIsLoading(false);
      return;
    }
    usersApi
      .fetchMe()
      .then(setUser)
      .catch(() => clearStoredToken())
      .finally(() => setIsLoading(false));
  }, []);

  async function login(email: string, password: string) {
    const result = await usersApi.login(email, password);
    setStoredToken(result.token);
    setUser(result.user);
  }

  function logout() {
    clearStoredToken();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
