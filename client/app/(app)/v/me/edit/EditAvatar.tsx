"use client";

import { AuthContext } from "@/app/lib/contexts/AppContext";
import Button from "@/components/global/Button";
import Card from "@/components/global/Card";
import UserAvatar from "@/components/global/UserAvatar";
import { useContext } from "react";
import "../../components/styles.css";

export default function EditAvatar() {
  const { user } = useContext(AuthContext);

  return (
    <div className="space-y-1">
      <p>Profile Picture</p>
      <Card classes="space-y-6">
        <UserAvatar
          email={user && user.email}
          name={user && user.firstName}
          size="xl"
        />

        <div className="flex gap-6">
          <Button variant="filled" size="base" text="Update profile picture" />

          <div>
            <Button
              variant="text"
              size="base"
              text="Remove profile picture"
              color="error"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
