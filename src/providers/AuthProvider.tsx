"use client";
import React, { createContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/types/userTypes";
import { AuthService } from "@/services/AuthService";

interface AuthContextType {
  user: User | null; // false indicates loading state
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged(async (userData) => {
      try {
        if (userData) {
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}
