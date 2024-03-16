"use client";

import axiosInstance from "@/app/axiosInstance";
import { AuthContext } from "@/app/lib/contexts/AppContext";
import Button from "@/components/global/Button";
import Card from "@/components/global/Card";
import Modal from "@/components/global/Modal";
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
      <Card classes="setting-item border border-error">
        <SettingItemText
          title="Delete Account"
          subtitle="Deletes your account and all data connected to it"
        />

        <div onClick={() => setShowModal(true)}>
          <Button
            variant="filled"
            color="error"
            size="base"
            text="Delete Account"
            classes="bg-error"
          />
        </div>
      </Card>

      {/* Delete account modal */}
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <h1 className="text-2xl font-bold">Delete Account</h1>
        <p className="text-text-200">
          Are you sure you want to delete your account. This action is not
          reversible
        </p>

        <div className="mt-5 flex flex-row justify-end gap-4">
          <div onClick={() => setShowModal(false)}>
            <Button variant="text" size="base" text="Cancel" />
          </div>
          <div onClick={handleDelete}>
            <Button variant="filled" color="error" size="base" text="Delete" />
          </div>
        </div>
      </Modal>
    </div>
  );
}
