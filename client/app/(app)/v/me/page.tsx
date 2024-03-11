"use client";

import { AuthContext } from "@/app/lib/contexts/AppContext";
import Card from "@/components/global/Card";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { GoArrowRight } from "react-icons/go";
import PersonalInfoCard from "../components/PersonalInfoCard";
import UserBioCard from "../components/UserBioCard";
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
            locationName={user.location && user.location.name}
            age={user.age}
            email={user.email}
          />

          {/* Bio card */}
          {user.bio && <UserBioCard bio={user.bio} />}

          {/* Skills card */}
          <div>
            {user.skills.length > 0 && (
              <>
                <Card classes="space-y-3 rounded-b-none">
                  <h5 className="card_title">Skills</h5>

                  {/* Only show three skills */}
                  <UserSkillsCard skills={user.skills.slice(0, 3)} />
                </Card>
                <Card classes="rounded-t-none border-t border-bg-300/80 px-4 py-2 text-sm font-light text-text-200 hover:bg-bg-200">
                  <Link
                    href={"/v/me/skills"}
                    className="flex flex-row items-center justify-between"
                  >
                    <span>Show more</span>
                    <GoArrowRight size={20} />
                  </Link>
                </Card>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
