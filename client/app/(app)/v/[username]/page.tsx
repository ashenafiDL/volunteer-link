"use client";

import axiosInstance from "@/app/axiosInstance";
import { fetchUser } from "@/app/lib/users";
import "@/app/styles.css";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ContributionsCard from "../components/ContributionsCard";
import PersonalInfoCard from "../components/PersonalInfoCard";
import ShowMoreCard from "../components/ShowMoreCard";
import UserBioCard from "../components/UserBioCard";
import UserEducationInfoCard from "../components/UserEducationInfoCard";
import UserSkillsCard from "../components/UserSkillsCard";

export default function Profile() {
  const pathname = usePathname();
  const username = pathname.split("/")[2];
  const [user, setUser] = useState<any>();
  const [contributions, setContributions] = useState<Array<any> | null>();

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const res = await axiosInstance.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}/contributions`,
        );

        if (res.status === 200) {
          setContributions(res.data);
        }
      } catch (error) {
        setContributions(null);
      }
    };

    if (user?.id) {
      fetchContributions();
    }
  }, [user]);

  useEffect(() => {
    const getUserData = async () => {
      const res = await fetchUser(username);

      if (res) {
        setUser(res);
      }
    };

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
                <div className="card space-y-3 rounded-md rounded-b-none">
                  <div className="card-body">
                    <h5 className="card-title">Skills</h5>

                    {/* Only show three skills */}
                    <UserSkillsCard skills={user.skills.slice(0, 3)} />
                  </div>
                </div>
                {user.skills.length > 3 && (
                  <ShowMoreCard href={`/v/${user.username}/skills`} />
                )}
              </>
            )}
          </div>

          {/* Contributions card */}
          {contributions && (
            <div className="card rounded-md">
              <div className="card-body">
                <div className="card-title">Contribution History</div>
                <ContributionsCard contributions={contributions} />
              </div>
            </div>
          )}

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
