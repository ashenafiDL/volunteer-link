"use client";

import axiosInstance from "@/app/axiosInstance";
import { AuthContext } from "@/app/lib/contexts/AppContext";
import Card from "@/components/global/Card";
import Snackbar from "@/components/global/Snackbar";
import Toggle from "@/components/global/Toggle";
import { useContext, useState } from "react";
import SettingItemText from "../../components/SettingItemText";

export default function ProjectSetting() {
  const { user } = useContext(AuthContext);
  const [snackbar, setSnackBar] = useState<{
    message: string;
    type: "error" | "warning" | "success" | "info";
    duration: number;
  } | null>(null);

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
        setSnackBar({
          message: "Successfully update your time preference.",
          type: "success",
          duration: 3000,
        });
      }
    } catch (error) {
      setSnackBar({
        message:
          "Failed to update your time preference. Please try again later.",
        type: "error",
        duration: 3000,
      });
    }
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
        setSnackBar({
          message: "Successfully update your location preference.",
          type: "success",
          duration: 3000,
        });
      }
    } catch (error) {
      setSnackBar({
        message:
          "Failed to update your location preference. Please try again later.",
        type: "error",
        duration: 3000,
      });
    }
  };

  return (
    <>
      {snackbar && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          duration={snackbar.duration}
          setSnackbar={setSnackBar}
        />
      )}

      <div className="space-y-1">
        <p>Project</p>
        <Card classes="space-y-5">
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
        </Card>
      </div>
    </>
  );
}
