import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Page reload দিলেও লগইন মনে রাখার জন্য localStorage থেকে পড়ি
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  function login(userData, token) {
    setUser(userData);
    try {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);
    } catch {
      // storage বন্ধ থাকলে চুপচাপ এড়িয়ে যাই
    }
  }

  function logout() {
    setUser(null);
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } catch {
      // ignore
    }
  }

  const isLoggedIn = user !== null;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}