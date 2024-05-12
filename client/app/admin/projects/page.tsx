"use client";

import axiosInstance from "@/app/axiosInstance";
import { useAlertsContext } from "@/app/lib/contexts/AlertContext";
import { formatDate } from "date-fns";
import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Array<any>>();
  const { addAlert, dismissAlert } = useAlertsContext();

  const handleUpdate = async (id: string, values: any) => {
    try {
      const res = await axiosInstance.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/${id}/edit`,
        values,
      );

      if (res.status === 200) {
        const id = addAlert({
          message: "Deactivate successful updated successfully",
          severity: "success",
        });
        setTimeout(() => {
          dismissAlert(id);
        }, 3000);
        fetchProjects();
      }
    } catch (error: any) {
      const id = addAlert({
        message:
          error?.response?.data?.message || "Failed to deactivate project",
        severity: "error",
      });
      setTimeout(() => {
        dismissAlert(id);
      }, 3000);
    }
  };

  const fetchProjects = async () => {
    const res = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_URL}/projects`,
    );

    if (res.status === 200) {
      setProjects(res.data);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="space-y-3 overflow-x-auto">
      <div className="card-title">Projects</div>

      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Title</th>
            <th>Organization</th>
            <th>Description</th>
            <th>Location</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Applications</th>
            <th>Skills</th>
            <th>Status</th>
            <th>Is Active?</th>
          </tr>
        </thead>
        <tbody>
          {projects && projects.length >= 0 && (
            <>
              {projects.map((project, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td>{project.title}</td>
                    <td>{project.organization.name}</td>
                    <td>{project.description}</td>
                    <td>{project?.location?.name || "-"}</td>
                    <td>{formatDate(project.startDate, "MMM dd, yyyy")}</td>
                    <td>{formatDate(project.endDate, "MMM dd, yyyy")}</td>
                    <td>{project?.applications?.length || 0}</td>
                    <td>{project?.skills?.length || 0}</td>
                    <td>{project.status}</td>
                    <td>
                      {project.isActive ? (
                        <button
                          className="btn btn-error btn-xs"
                          onClick={() =>
                            handleUpdate(project.id, { isActive: false })
                          }
                        >
                          Deactivate
                        </button>
                      ) : (
                        <button
                          className="btn btn-success btn-xs"
                          onClick={() =>
                            handleUpdate(project.id, { isActive: true })
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
          )}
        </tbody>
      </table>
    </div>
  );
}
