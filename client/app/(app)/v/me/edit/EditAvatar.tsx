"use client";

import axiosInstance from "@/app/axiosInstance";
import { useAuthContext } from "@/app/lib/contexts/AppContext";
import UserAvatar from "@/components/global/UserAvatar";
import "../../components/styles.css";

export default function EditAvatar() {
  const { user, getUser, setUser } = useAuthContext();

  const handleChange = async (e: any) => {
    try {
      const formData = new FormData();
      formData.append("file", e.target.files[0]);

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
      // TODO: show snackbar here
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
      // TODO: show snackbar here
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
              onClick={() => document.getElementById("fileInput")?.click()}
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
