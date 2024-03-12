"use client";

import { fetchUser } from "@/app/lib/users";
import Card from "@/components/global/Card";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DetailsHeader from "../../components/DetailsHeader";
import UserSkillsCard from "../../components/UserSkillsCard";

export default function UserSkills() {
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
    <div>
      <DetailsHeader href={`/v/${user && user.username}`} text="Skills" />

      <Card>
        {user && user.skills && user.skills.length > 0 && (
          <UserSkillsCard skills={user.skills} />
        )}
      </Card>
    </div>
  );
}
