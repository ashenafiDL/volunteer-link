"use client";

import axiosInstance from "@/app/axiosInstance";
import { useAuthContext } from "@/app/lib/contexts/AppContext";
import Toggle from "@/components/global/Toggle";
import SettingItemText from "../../components/SettingItemText";

// Define a type for the texts object
type Texts = {
  [key: string]: { title: string; subtitle: string };
};

export default function NotificationSetting() {
  const { user } = useAuthContext();

  const texts: Texts = {
    task_assigned: {
      title: "Tasks",
      subtitle: "Get notified when a new task is assigned to you",
    },
    new_project_recommendation: {
      title: "Projects",
      subtitle:
        "Get notified when there is a new project recommendation for you",
    },
    project_status_update: {
      title: "Projects",
      subtitle: "Get notified when a project status is updated",
    },
    deadlines: {
      title: "Projects",
      subtitle: "Get notified when a project deadline is approaching",
    },
    application_status_update: {
      title: "Applications",
      subtitle: "Get notified when your application status is updated",
    },
    badge_and_certificate: {
      title: "Profile",
      subtitle:
        "Get notified when a new badge or certificate is awarded to you",
    },
  };

  const handleNotificationChange = async (key: string, value: boolean) => {
    // Update the user's notification preference
    user.notificationPreference[key] = value;

    try {
      const res = await axiosInstance.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/me/update`,
        {
          notificationPreference: user.notificationPreference,
        },
      );

      if (res.status === 200) {
      }
    } catch (error) {
      // TODO: handle error
    }
  };

  return (
    <div className="space-y-1">
      <p>Notification</p>
      <div className="card rounded-md">
        <div className="card-body space-y-3">
          {user?.notificationPreference &&
            Object.entries(user.notificationPreference).map(([key, value]) => (
              <div key={key} className="setting-item">
                <SettingItemText
                  title={texts[key].title}
                  subtitle={texts[key].subtitle}
                />

                <Toggle
                  options={["OFF", "ON"]}
                  selected={value ? 1 : 0}
                  onChange={(newValue: string) =>
                    handleNotificationChange(key, newValue === "ON")
                  }
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
