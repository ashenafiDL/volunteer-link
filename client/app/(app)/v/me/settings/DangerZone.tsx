"use client";

import axiosInstance from "@/app/axiosInstance";
import { AuthContext } from "@/app/lib/contexts/AppContext";
import { useContext, useState } from "react";
import SettingItemText from "../../components/SettingItemText";

export default function DangerZone() {
  const { logout, setIsLoggedIn, setToken, setUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await axiosInstance.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/users/me/delete`,
      );

      if (res.status === 200) {
        setToken("");
        setUser(null);
        logout();
        setIsLoggedIn(false);
      }
    } catch (error) {
      // TODO - return the snackbar here
      setShowModal(false);
    }
  };

  return (
    <div className="space-y-1">
      <p className="text-error">Danger Zone</p>
      <div className="setting-item border border-error">
        <SettingItemText
          title="Delete Account"
          subtitle="Deletes your account and all data connected to it"
        />

        <div onClick={() => setShowModal(true)}>
          <button className="btn btn-error">Delete Account</button>
        </div>
      </div>

      {/* Delete account modal */}
      {/* <div showModal={showModal} setShowModal={setShowModal}>
        <h1 className="text-2xl font-bold">Delete Account</h1>
        <p className="text-text-200">
          Are you sure you want to delete your account. This action is not
          reversible
        </p>

        <div className="mt-5 flex flex-row justify-end gap-4">
          <div onClick={() => setShowModal(false)}>
            <button className="btn btn-outline">Cancel</button>
          </div>
          <div onClick={handleDelete}>
            <button className="btn btn-error">Delete</button>
          </div>
        </div>
      </div> */}
    </div>
  );
}
