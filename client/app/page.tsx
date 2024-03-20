"use client";

import { redirect } from "next/navigation";
import LandingPage from "./LandingPage";
import { useAuthContext } from "./lib/contexts/AppContext";

export default function Home() {
  const { isLoggedIn } = useAuthContext();

  return <>{isLoggedIn ? redirect("/home") : <LandingPage />}</>;
}
