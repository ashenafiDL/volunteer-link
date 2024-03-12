"use client";

import { AuthContext } from "@/app/lib/contexts/AppContext";
import Card from "@/components/global/Card";
import { useContext } from "react";
import DetailsHeader from "../../components/DetailsHeader";
import UserSkillsCard from "../../components/UserSkillsCard";

export default function UserSkills() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <DetailsHeader href="/v/me" text="Skills" />

      <Card>
        {user.skills && user.skills.length > 0 && (
          <UserSkillsCard skills={user.skills} />
        )}
      </Card>
    </div>
  );
}
