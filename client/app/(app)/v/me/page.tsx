"use client";

import { useAuthContext } from "@/app/lib/contexts/AppContext";
import PersonalInfoCard from "../components/PersonalInfoCard";
import ShowMoreCard from "../components/ShowMoreCard";
import UserBioCard from "../components/UserBioCard";
import UserEducationInfoCard from "../components/UserEducationInfoCard";
import UserSkillsCard from "../components/UserSkillsCard";
import "../components/styles.css";

export default function Profile() {
  const { user } = useAuthContext();

  return (
    <div className="space-y-3">
      <PersonalInfoCard
        firstName={user.firstName}
        lastName={user.lastName}
        gender={user.gender}
        locationName={user?.location?.name || "N/A"}
        age={user.age}
        email={user.email}
      />

      {/* Bio card */}
      {user.bio && <UserBioCard bio={user.bio} />}

      {/* Skills card */}
      <div>
        {user.skills && user.skills.length > 0 && (
          <>
            <div className="card rounded-md rounded-b-none">
              <div className="card-body">
                <h5 className="card-title">Skills</h5>

                {/* Only show three skills */}
                <UserSkillsCard skills={user.skills.slice(0, 3)} />
              </div>
            </div>
            {user.skills.length > 3 && <ShowMoreCard href={"/v/me/skills"} />}
          </>
        )}
      </div>

      {/* Education information card */}
      <div>
        {user.education && user.education.length > 0 && (
          <>
            <div className="card space-y-3 rounded-md rounded-b-none">
              <div className="card-body">
                <h5 className="card-title">Education</h5>

                {/* Only show three education info */}
                <UserEducationInfoCard
                  educationInfo={user.education.slice(0, 3)}
                />
              </div>
            </div>
            {user.education.length > 3 && (
              <ShowMoreCard href={"/v/me/education"} />
            )}
          </>
        )}
      </div>
    </div>
  );
}
