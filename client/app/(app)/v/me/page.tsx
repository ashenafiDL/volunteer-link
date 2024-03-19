"use client";

import { AuthContext } from "@/app/lib/contexts/AppContext";
import { useContext, useEffect, useState } from "react";
import PersonalInfoCard from "../components/PersonalInfoCard";
import ShowMoreCard from "../components/ShowMoreCard";
import UserBioCard from "../components/UserBioCard";
import UserEducationInfoCard from "../components/UserEducationInfoCard";
import UserSkillsCard from "../components/UserSkillsCard";
import "../components/styles.css";

export default function Profile() {
  const { user } = useContext(AuthContext);
  const [isUserLoaded, setIsUserLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setIsUserLoaded(true);
    }
  }, [user]);

  return (
    <div className="space-y-3">
      {isUserLoaded && (
        <>
          <PersonalInfoCard
            firstName={user.firstName}
            lastName={user.lastName}
            gender={user.gender}
            locationName={user.location != undefined && user.location.name}
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
                  <ShowMoreCard href={"/v/me/skills"} />
                )}
              </>
            )}
          </div>

          {/* Education information card */}
          <div>
            {user.education && user.education.length > 0 && (
              <>
                <div className="space-y-3 rounded-b-none">
                  <h5 className="card-title">Education</h5>

                  {/* Only show three education info */}
                  <UserEducationInfoCard
                    educationInfo={user.education.slice(0, 3)}
                  />
                </div>
                {user.education.length > 3 && (
                  <ShowMoreCard href={"/v/me/education"} />
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
