"use client";

import { AuthContext } from "@/app/lib/contexts/AppContext";
import { useContext } from "react";
import DetailsHeader from "../../components/DetailsHeader";
import UserEducationInfoCard from "../../components/UserEducationInfoCard";

export default function UserSkills() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <DetailsHeader href="/v/me" text="Education" />

      <div className="card rounded-md">
        <div className="card-body">
          {user.education && user.education.length > 0 && (
            <UserEducationInfoCard educationInfo={user.education} />
          )}
        </div>
      </div>
    </div>
  );
}
