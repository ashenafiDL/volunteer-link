"use client";

import { fetchUser } from "@/app/lib/users";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import SocialLinks from "../components/SocialLinks";
import UserProfile from "../components/UserProfile";
import "../components/styles.css";

export default function OtherUserProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const username = pathname.split("/")[2];
  const [user, setUser] = useState<any>();

  useEffect(() => {
    async function getUserData() {
      const res = await fetchUser(username);

      if (res) {
        setUser(res);
      }
    }

    getUserData();
  }, [username]);

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <div className="layout-left-child">
        <div>
          {user && (
            <UserProfile
              firstName={user.firstName}
              lastName={user.lastName}
              username={user.username}
              email={user.email}
              createdAt={user.createdAt}
              ownProfile={false}
            />
          )}

          {user && user.socialLinks.length > 0 && (
            <SocialLinks socialLinks={user.socialLinks} />
          )}
        </div>
      </div>

      {/* Profile + setting + edit */}
      <div className="layout-right-child">{children}</div>
    </div>
  );
}
