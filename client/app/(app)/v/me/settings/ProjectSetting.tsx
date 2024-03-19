"use client";

import axiosInstance from "@/app/axiosInstance";
import { AuthContext } from "@/app/lib/contexts/AppContext";
import Toggle from "@/components/global/Toggle";
import { useContext } from "react";
import SettingItemText from "../../components/SettingItemText";

export default function ProjectSetting() {
  const { user } = useContext(AuthContext);

  const handleTimePreferenceChange = async (value: string) => {
    try {
      const res = await axiosInstance.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/me/update`,
        {
          timePreference: value.split(" ").join("_").toUpperCase(),
        },
      );

      if (res.status === 200) {
        user.timePreference = value;
      }
    } catch (error) {}
  };

  const handleLocationPreferenceChange = async (value: string) => {
    try {
      const res = await axiosInstance.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/me/update`,
        {
          locationPreference: value.split(" ").join("_").toUpperCase(),
        },
      );

      if (res.status === 200) {
        user.timePreference = value;
      }
    } catch (error) {}
  };

  return (
    <div className="space-y-1">
      <p>Project</p>
      <div className="card space-y-5">
        <div className="setting-item">
          <SettingItemText
            title="Time Preference"
            subtitle="Customize your preferred time availability settings"
          />

          {user && user.timePreference && (
            <Toggle
              options={["Short Term", "Long Term", "Both"]}
              selected={
                user.timePreference === "SHORT_TERM"
                  ? 0
                  : user.timePreference === "LONG_TERM"
                    ? 1
                    : 2
              }
              onChange={handleTimePreferenceChange}
            />
          )}
        </div>

        <div className="setting-item">
          <SettingItemText
            title="Locations Preference"
            subtitle="Customize your preferred location settings"
          />

          {user && user.locationPreference && (
            <Toggle
              options={["In Person", "Remote", "Both"]}
              selected={
                user.locationPreference === "IN_PERSON"
                  ? 0
                  : user.locationPreference === "REMOTE"
                    ? 1
                    : 2
              }
              onChange={handleLocationPreferenceChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}
