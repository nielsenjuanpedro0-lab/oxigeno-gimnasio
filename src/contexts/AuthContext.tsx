import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("oxigeno_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("oxigeno_users") || "[]");
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (found) {
      const userData = { email: found.email, name: found.name };
      setUser(userData);
      localStorage.setItem("oxigeno_user", JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const register = (name: string, email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("oxigeno_users") || "[]");
    if (users.find((u: any) => u.email === email)) return false;
    users.push({ name, email, password });
    localStorage.setItem("oxigeno_users", JSON.stringify(users));
    const userData = { email, name };
    setUser(userData);
    localStorage.setItem("oxigeno_user", JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("oxigeno_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
