"use client";
import React, { useState, createContext, useContext, useEffect } from "react";

interface User {
  name: string;
}

interface AuthState {
  accessToken: string|undefined;
  user: User | null;
}

interface AuthContextType {
  auth: AuthState | null | undefined;
  setAuth: React.Dispatch<React.SetStateAction<AuthState | null | undefined>>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<AuthState | null | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem("auth");
      if (savedAuth) {
        setAuth(JSON.parse(savedAuth));
      } else {
        setAuth(null);
      }
    } catch (error) {
      console.error("Failed to parse auth from localStorage", error);
      setAuth(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (auth) {
        localStorage.setItem("auth", JSON.stringify(auth));
      } else {
        localStorage.removeItem("auth");
      }
    }
  }, [auth, isLoading]);

  const value = { auth, setAuth, isLoading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
