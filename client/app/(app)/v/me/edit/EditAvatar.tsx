"use client";

import { AuthContext } from "@/app/lib/contexts/AppContext";
import UserAvatar from "@/components/global/UserAvatar";
import { useContext } from "react";
import "../../components/styles.css";

export default function EditAvatar() {
  const { user } = useContext(AuthContext);

  return (
    <div className="space-y-1">
      <p>Profile Picture</p>
      <div className="card space-y-6">
        <UserAvatar
          email={user && user.email}
          name={user && user.firstName}
          size="xl"
        />

        <div className="flex gap-6">
          <button className="btn">Update profile picture</button>

          <div>
            <button className="btn btn-error">Remove profile picture</button>
          </div>
        </div>
      </div>
    </div>
  );
}
