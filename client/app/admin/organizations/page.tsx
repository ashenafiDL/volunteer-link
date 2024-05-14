"use client";

import axiosInstance from "@/app/axiosInstance";
import { useAlertsContext } from "@/app/lib/contexts/AlertContext";
import { useIsClient } from "@/app/lib/contexts/useIsClient";
import { formatDate } from "date-fns";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrganizationsPage() {
  const [orgs, setOrgs] = useState<Array<any>>();
  const isClient = useIsClient();
  const { addAlert, dismissAlert } = useAlertsContext();

  async function getPermit(id: string) {
    try {
      const response = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_URL}/files/getPermit/${id}`,
        {
          responseType: "blob",
        },
      );

      if (response.status === 200) {
        const url = URL.createObjectURL(response.data);
        if (isClient) {
          const link = document.createElement("a");
          link.href = url;
          link.target = "_blank";
          link.click();
        }
      }
    } catch (error: any) {
      const id = addAlert({
        message: error?.response?.data?.message || "Failed to get permit",
        severity: "error",
      });
      setTimeout(() => {
        dismissAlert(id);
      }, 3000);
    }
  }

  const handleUpdate = async (values: any, id: string) => {
    try {
      const res = await axiosInstance.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/organizations/${id}`,
        values,
      );

      if (res.status === 200) {
        const id = addAlert({
          message: "Organization updated successfully",
          severity: "success",
        });
        setTimeout(() => {
          dismissAlert(id);
        }, 3000);
        fetchOrgs();
      }
    } catch (error: any) {
      const id = addAlert({
        message:
          error?.response?.data?.message || "Failed to update organization",
        severity: "error",
      });
      setTimeout(() => {
        dismissAlert(id);
      }, 3000);
    }
  };

  const fetchOrgs = async () => {
    const res = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_URL}/organizations`,
    );

    if (res.status === 200) {
      setOrgs(res.data);
    }
  };

  useEffect(() => {
    fetchOrgs();
  }, []);

  return (
    <>
      <div className="space-y-3 overflow-x-auto">
        <div className="card-title">Organizations</div>

        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Mission</th>
              <th>About Us</th>
              <th>Website URL</th>
              <th>Location</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Founding Date</th>
              <th>Permit</th>
              <th>Verified</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orgs && orgs.length > 0 ? (
              <>
                {orgs.map((org, index) => {
                  return (
                    <tr key={index}>
                      <th>{index + 1}</th>
                      <td>{org.name}</td>
                      <td>{org.mission || "-"}</td>
                      <td>{org.aboutUs || "-"}</td>
                      <td>
                        {org.websiteUrl && (
                          <Link href={org.websiteUrl} target="_blank">
                            {org.websiteUrl}
                          </Link>
                        )}
                      </td>
                      <td>{org.location.name}</td>
                      <td>{org.contactEmail}</td>
                      <td>{org.contactPhone}</td>
                      <td>
                        {org.foundingDate
                          ? formatDate(org.foundingDate, "dd MMM yyyy")
                          : "-"}
                      </td>
                      <td>
                        {org.permitId ? (
                          <button
                            className="btn btn-xs"
                            onClick={() => getPermit(org.id)}
                          >
                            Show permit
                          </button>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td>
                        {org.verified ? (
                          <div className="badge badge-success">Verified</div>
                        ) : (
                          <button
                            className="btn btn-primary btn-xs"
                            onClick={() =>
                              handleUpdate({ verified: true }, org.id)
                            }
                          >
                            Approve
                          </button>
                        )}
                      </td>
                      <td>
                        {org.isActive ? (
                          <button
                            className="btn btn-error btn-xs"
                            onClick={() =>
                              handleUpdate({ isActive: false }, org.id)
                            }
                          >
                            Deactivate
                          </button>
                        ) : (
                          <button
                            className="btn btn-success btn-xs"
                            onClick={() =>
                              handleUpdate({ isActive: true }, org.id)
                            }
                          >
                            Activate
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </>
            ) : (
              <tr className="text-center italic">
                <td colSpan={11}>There are no organization data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
