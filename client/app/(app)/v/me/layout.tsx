"use client";

import { useAuthContext } from "@/app/lib/contexts/AppContext";
import React from "react";
import SideNav from "../components/SideNav";
import SocialLinks from "../components/SocialLinks";
import UserProfile from "../components/UserProfile";
import "../components/styles.css";

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthContext();

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <div className="layout-left-child">
        <div>
          <UserProfile
            firstName={user.firstName}
            lastName={user.lastName}
            username={user.username}
            email={user.email}
            createdAt={user.createdAt}
            ownProfile={true}
          />

          {user?.socialLinks?.length > 0 && (
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
