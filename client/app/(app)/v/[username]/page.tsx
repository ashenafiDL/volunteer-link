"use client";

import { fetchUser } from "@/app/lib/users";
import "@/app/styles.css";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import PersonalInfoCard from "../components/PersonalInfoCard";
import ShowMoreCard from "../components/ShowMoreCard";
import UserBioCard from "../components/UserBioCard";
import UserEducationInfoCard from "../components/UserEducationInfoCard";
import UserSkillsCard from "../components/UserSkillsCard";

export default function Profile() {
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
    <>
      {user && (
        <>
          <PersonalInfoCard
            firstName={user.firstName}
            lastName={user.lastName}
            gender={user.gender}
            locationName={user.location !== undefined && user.location.name}
            age={user.age}
            email={user.email}
          />

          {/* Bio card */}
          {user.bio && <UserBioCard bio={user.bio} />}

          {/* Skills card */}
          <div>
            {user.skills && user.skills.length > 0 && (
              <>
                <div className="card space-y-3 rounded-b-none">
                  <h5 className="card-title">Skills</h5>

                  {/* Only show three skills */}
                  <UserSkillsCard skills={user.skills.slice(0, 3)} />
                </div>
                {user.skills.length > 3 && (
                  <ShowMoreCard href={`/v/${user.username}/skills`} />
                )}
              </>
            )}
          </div>

          {/* Education information card */}
          <div>
            {user.education && user.education.length > 0 && (
              <>
                <div className="card space-y-3 rounded-b-none">
                  <h5 className="card-title">Education</h5>

                  {/* Only show three education info */}
                  <UserEducationInfoCard
                    educationInfo={user.education.slice(0, 3)}
                  />
                </div>
                {user.education.length > 3 && (
                  <ShowMoreCard href={`/v/${user.username}/education`} />
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
}
