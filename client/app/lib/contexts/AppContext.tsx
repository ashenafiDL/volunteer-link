"use client";

import axiosInstance from "@/app/axiosInstance";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { deleteCookie, getCookie } from "../cookies";

interface AuthContextType {
  token: string;
  setToken: (token: string) => void;
  user: any; // Use the any type for user
  setUser: (user: any) => void;
  logout: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: "",
  setToken: (token: string) => {},
  user: {},
  setUser: (user: any) => {},
  logout: () => {},
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => {},
});

export default function AppContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>({});
  const [token, setToken] = useState<string>(() => {
    const newToken = getCookie("token");
    return newToken ? newToken : "";
  });

  const logout = () => {
    router.replace("/sign-in");
    setIsLoggedIn(false);
    setToken("");
    deleteCookie("token");
    setUser({});
  };

  useEffect(() => {
    const token = getCookie("token");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    if (token) {
      getUserData();
    }
  }, []);

  const getUserData = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
      );

      if (response.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        logout,
        user,
        setUser,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
