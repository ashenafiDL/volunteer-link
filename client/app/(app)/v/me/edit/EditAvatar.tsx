"use client";

import axiosInstance from "@/app/axiosInstance";
import { useAlertsContext } from "@/app/lib/contexts/AlertContext";
import { useAuthContext } from "@/app/lib/contexts/AppContext";
import { useIsClient } from "@/app/lib/contexts/useIsClient";
import "@/app/styles.css";
import UserAvatar from "@/components/global/UserAvatar";

export default function EditAvatar() {
  const { user, getUser, setUser } = useAuthContext();
  const { addAlert, dismissAlert } = useAlertsContext();
  const isClient = useIsClient();

  const handleChange = async (e: any) => {
    try {
      const res = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/files/profilePic/update`,
        { file: e.target.files[0], email: user?.email },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (res.status === 201) {
        const updatedUser = getUser();
        setUser(updatedUser);
      }
    } catch (e) {
      const id = addAlert({
        severity: "error",
        message: "Failed to update profile picture. Please try again.",
      });
      setTimeout(() => {
        dismissAlert(id);
      }, 3000);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axiosInstance.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/files/deleteProfilePicture`,
      );

      if (res.status === 200) {
        const updatedUser = getUser();
        setUser(updatedUser);
      }
    } catch (e) {
      const id = addAlert({
        severity: "error",
        message: "Failed to remove profile picture. Please try again.",
      });
      setTimeout(() => {
        dismissAlert(id);
      }, 3000);
    }
  };

  return (
    <div className="space-y-1">
      <p>Profile Picture</p>
      <div className="card rounded-md">
        <div className="card-body">
          <div>
            <UserAvatar
              email={user && user.email}
              name={user && user.firstName}
              size="xl"
            />
          </div>

          <div className="mt-4 flex gap-6">
            <input
              id="fileInput"
              accept="image/*"
              type="file"
              hidden
              onChange={handleChange}
            ></input>
            <button
              className="btn btn-primary"
              onClick={() =>
                isClient && document.getElementById("fileInput")?.click()
              }
            >
              Update profile picture
            </button>

            <div>
              <button className="btn btn-error" onClick={handleDelete}>
                Remove profile picture
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
