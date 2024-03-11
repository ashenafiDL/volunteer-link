"use client";

import { redirect } from "next/navigation";
import { useContext } from "react";
import LandingPage from "./LandingPage";
import { AuthContext } from "./lib/contexts/AppContext";

export default function Home() {
  const { isLoggedIn } = useContext(AuthContext);

  return <>{isLoggedIn ? redirect("/home") : <LandingPage />}</>;
}
