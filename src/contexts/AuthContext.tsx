"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { IUser } from "@/types/IUser";
import axiosInstance from "@/api/axios";

interface AuthContextType {
  user: IUser | null;
  loading: boolean;
  login: (user: IUser) => void;
  logout: () => void;
  updateUser: (user: IUser) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axiosInstance.get("/auth/info");
        if (response.status === 200) {
          console.log(response.data);
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = (user: IUser) => {
    setUser(user);
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const updateUser = (user: IUser) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
