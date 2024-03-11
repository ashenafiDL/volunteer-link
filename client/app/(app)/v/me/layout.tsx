"use client";

import { AuthContext } from "@/app/lib/contexts/AppContext";
import React, { useContext, useEffect, useState } from "react";
import SideNav from "./components/SideNav";
import SocialLinks from "./components/SocialLinks";
import UserProfile from "./components/UserProfile";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useContext(AuthContext);
  const [isUserLoaded, setIsUserLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setIsUserLoaded(true);
    }
  }, [user]);

  return (
    <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
      {/* Sidebar */}
      <div className="space-y-3 self-start lg:sticky lg:top-20">
        <div>
          {isUserLoaded && (
            <UserProfile
              firstName={user.firstName}
              lastName={user.lastName}
              username={user.username}
              email={user.email}
              createdAt={user.createdAt}
            />
          )}

          {isUserLoaded && user.socialLinks.length > 0 && (
            <SocialLinks socialLinks={user.socialLinks} />
          )}
        </div>

        <SideNav username={user.username} />
      </div>

      {/* Profile + setting + edit */}
      <div className="lg:col-span-2">{children}</div>
    </div>
  );
}
