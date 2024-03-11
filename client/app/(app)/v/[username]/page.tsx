"use client";

import axiosInstance from "@/app/axiosInstance";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import "../components/styles.css";

export default function Profile() {
  const pathname = usePathname();
  const username = pathname.split("/")[2];
  const [user, setUser] = useState<any>();

  async function getUserData() {
    const res = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/${username}`,
    );

    console.log("res", res);

    if (res.status === 200) {
      setUser(res.data);
      console.log(user);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
      {/* Sidebar */}
      <div className="space-y-3 self-start lg:sticky lg:top-20">
        <div></div>
      </div>

      {/* Profile + setting + edit */}
      <div className="lg:col-span-2"></div>
    </div>
  );
}
