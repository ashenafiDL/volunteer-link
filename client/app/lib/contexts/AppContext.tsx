"use client";

import axiosInstance from "@/app/axiosInstance";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { deleteCookie, getCookie } from "../cookies";

interface AuthContextType {
  token: string;
  setToken: (token: string) => void;
  user: any;
  setUser: (user: any) => void;
  org: any;
  setOrg: (user: any) => void;
  getUser: () => void;
  getOrg: (identifier: string) => any;
  logout: () => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  viewingOrg: boolean;
  setViewingOrg: (viewingOrg: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: "",
  setToken: (token: string) => {},
  user: {},
  setUser: (user: any) => {},
  org: {},
  setOrg: (org: any) => {},
  getUser: () => {},
  getOrg: (identifier: string) => {
    return {};
  },
  logout: () => {},
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => {},
  viewingOrg: false,
  setViewingOrg: (isLoggedIn: boolean) => {},
});

export default function AppContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [viewingOrg, setViewingOrg] = useState(false);
  const [user, setUser] = useState<any>({});
  const [org, setOrg] = useState<any>({});
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
    setOrg({});
  };

  useEffect(() => {
    const token = getCookie("token");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    if (token) {
      getUser();
    }
  }, []);

  const getUser = async () => {
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
      );

      if (response.status === 200) {
        setUser(response.data);
        getOrg(response.data.organization.id);
        return response.data;
      }
    } catch (error) {
      logout();
    }
  };

  const getOrg = async (identifier: string) => {
    try {
      const res = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_URL}/organizations/${identifier}`,
      );

      if (res.status === 200) {
        setOrg(res.data);
        return res.data;
      }
    } catch (error) {
      console.log(error);
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
        org,
        setOrg,
        getUser,
        getOrg,
        isLoggedIn,
        setIsLoggedIn,
        viewingOrg,
        setViewingOrg,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }

  return context;
};
