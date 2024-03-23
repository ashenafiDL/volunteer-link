"use client";

import axiosInstance from "@/app/axiosInstance";
import { useAlertsContext } from "@/app/lib/contexts/AlertContext";
import { useAuthContext } from "@/app/lib/contexts/AppContext";
import SettingItemText from "../../components/SettingItemText";

export default function DangerZone() {
  const { logout, setIsLoggedIn, setToken, setUser } = useAuthContext();
  const { addAlert, dismissAlert } = useAlertsContext();

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
      const id = addAlert({
        severity: "error",
        message: "Failed to delete account. Please try again.",
      });
      setTimeout(() => {
        dismissAlert(id);
      }, 3000);
    }
  };

  return (
    <div className="space-y-1">
      <p className="text-error">Danger Zone</p>
      <div className="setting-item card rounded-md border border-error">
        <div className="card-body flex w-full flex-row items-center justify-between">
          <SettingItemText
            title="Delete Account"
            subtitle="Deletes your account and all data connected to it"
          />

          <div
            onClick={() =>
              (
                document.getElementById(
                  "delete_account_modal",
                ) as HTMLDialogElement
              ).showModal()
            }
          >
            <button className="btn btn-error">Delete Account</button>
          </div>
        </div>
      </div>

      {/* Delete account modal */}
      <dialog id="delete_account_modal" className="modal">
        <div className="prose modal-box rounded-md lg:prose-lg">
          <h3>Delete Account</h3>
          <p className="text-text-200">
            Are you sure you want to delete your account. This action is not
            reversible
          </p>

          <div className="modal-action">
            <form method="dialog">
              <div className="mt-5 flex flex-row justify-end gap-4">
                <div>
                  <button className="btn btn-outline">Cancel</button>
                </div>
                <div onClick={handleDelete}>
                  <button className="btn btn-error">Delete</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
