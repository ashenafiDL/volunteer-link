"use client";

import { AuthContext } from "@/app/lib/contexts/AppContext";
import Card from "@/components/global/Card";
import Link from "next/link";
import { useContext } from "react";
import { GoArrowLeft } from "react-icons/go";
import UserSkillsCard from "../../components/UserSkillsCard";

export default function UserSkills() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div className="mb-3 flex items-center gap-4">
        <Link href={"/v/me"}>
          <GoArrowLeft size={28} />
        </Link>
        <span className="text-xl">Skills</span>
      </div>

      <Card>
        {user.skills && user.skills.length > 0 && (
          <UserSkillsCard skills={user.skills} />
        )}
      </Card>
    </div>
  );
}
