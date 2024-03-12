"use client";

import { AuthContext } from "@/app/lib/contexts/AppContext";
import Card from "@/components/global/Card";
import { useContext } from "react";
import DetailsHeader from "../../components/DetailsHeader";
import UserEducationInfoCard from "../../components/UserEducationInfoCard";

export default function UserSkills() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <DetailsHeader href="/v/me" text="Education" />

      <Card>
        {user.education && user.education.length > 0 && (
          <UserEducationInfoCard educationInfo={user.education} />
        )}
      </Card>
    </div>
  );
}
