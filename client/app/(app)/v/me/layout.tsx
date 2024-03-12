"use client";

import { AuthContext } from "@/app/lib/contexts/AppContext";
import React, { useContext, useEffect, useState } from "react";
import SideNav from "../components/SideNav";
import SocialLinks from "../components/SocialLinks";
import UserProfile from "../components/UserProfile";
import "../components/styles.css";

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
    <div className="layout-container">
      {/* Sidebar */}
      <div className="layout-left-child">
        <div>
          {isUserLoaded && (
            <UserProfile
              firstName={user.firstName}
              lastName={user.lastName}
              username={user.username}
              email={user.email}
              createdAt={user.createdAt}
              ownProfile={true}
            />
          )}

          {isUserLoaded && user.socialLinks && user.socialLinks.length > 0 && (
            <SocialLinks socialLinks={user.socialLinks} />
          )}
        </div>

        <SideNav />
      </div>

      {/* Profile + setting + edit */}
      <div className="layout-right-child">{children}</div>
    </div>
  );
}
