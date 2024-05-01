"use client";

import axiosInstance from "@/app/axiosInstance";
import { useAlertsContext } from "@/app/lib/contexts/AlertContext";
import { useAuthContext } from "@/app/lib/contexts/AppContext";
import { useIsClient } from "@/app/lib/contexts/useIsClient";
import formatDuration from "@/app/lib/formatDuration";
import "@/app/styles.css";
import axios from "axios";
import { format } from "date-fns";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiCalendar } from "react-icons/bi";
import { GoArrowLeft } from "react-icons/go";

export default function ProjectPage() {
  const [applied, setApplied] = useState(false);
  const [project, setProject] = useState<any>();
  const [isOwner, setIsOwner] = useState(false);
  const router = useRouter();
  const { addAlert, dismissAlert } = useAlertsContext();
  const isClient = useIsClient();
  const [active, setActive] = useState(false);
  const { org } = useAuthContext();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/o/my-org/projects") {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [pathname]);

  const showModal = (id: string) => {
    isClient && (document.getElementById(id) as HTMLDialogElement).showModal();
  };

  const closeModal = (id: string) => {
    isClient && (document.getElementById(id) as HTMLDialogElement).close();
  };

  const handleApply = async (values: any) => {
    try {
      const res = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/${project?.id}/apply`,
        values,
      );

      if (res.status === 201) {
        setApplied(true);
        const id = addAlert({
          severity: "success",
          message: "Applied to project successfully",
        });
        setTimeout(() => {
          dismissAlert(id);
        }, 3000);
      }
    } catch (error: any) {
      const id = addAlert({
        severity: "error",
        message:
          error?.response?.data?.message ||
          "Failed to apply to project. Please try again.",
      });
      setTimeout(() => {
        dismissAlert(id);
      }, 3000);
    } finally {
      closeModal("apply_to_projects_modal");
    }
  };

  useEffect(() => {
    const checkApplied = async () => {
      try {
        const res = await axiosInstance.get(
          `${process.env.NEXT_PUBLIC_API_URL}/applications/check/${project?.id}`,
        );

        if (res.status === 200 && res.data.applied) {
          setApplied(res.data.applied);
        }
      } catch (error) {
        setApplied(false);
      }
    };

    if (project?.id) {
      checkApplied();
    }
  }, [pathname, project]);

  useEffect(() => {
    const checkOwner = () => {
      const res = org.projects.some((item: any) => {
        return item.id === project.id;
      });

      setIsOwner(res);
    };

    if (org?.projects && project) {
      checkOwner();
    }
  }, [org, project]);

  useEffect(() => {
    const fetchProject = async (id: string) => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`,
        );

        if (res.status === 200) {
          setProject(res.data);
        }
      } catch (error) {
        const id = addAlert({
          severity: "error",
          message: "Failed to retrieve project. Please try again.",
        });
        setTimeout(() => {
          dismissAlert(id);
        }, 3000);
      }
    };

    fetchProject(pathname.split("/")[2]);
  }, [addAlert, dismissAlert, pathname]);

  return (
    <div className="layout-right-child">
      <div
        className="mb-3 flex cursor-pointer items-center gap-4"
        onClick={() => router.back()}
      >
        <GoArrowLeft size={28} />
        <span className="text-xl">Project Details</span>
      </div>

      <div className="card rounded-md">
        <div className="card-body space-y-6">
          <div className="section-container">
            <p className="section-title">Project Title</p>
            <h1 className="text-2xl font-bold">{project?.title}</h1>
          </div>

          <div className="section-container">
            <p className="section-title">Organized By</p>
            <div className="text-2xl font-bold">
              {project?.organization?.name}
            </div>
          </div>

          <div className="section-container">
            <p className="section-title">Status</p>
            <div className="badge badge-primary badge-lg">
              {project?.status.split("_").join(" ")}
            </div>
          </div>

          <div className="section-container">
            <p className="section-title">Description</p>
            <p>{project?.description}</p>
          </div>

          <div className="section-container">
            <p className="section-title">Location</p>
            {project?.locationId ? (
              <div className="badge badge-primary badge-lg flex flex-row gap-2 py-2 pl-0">
                <div className="badge badge-accent badge-lg">In Person</div>
                <div className="py-2">{project?.location?.name}</div>
              </div>
            ) : (
              <div className="badge badge-accent">Remote</div>
            )}
          </div>

          <div className="section-container">
            <div className="flex flex-row items-center gap-2">
              <p className="section-title flex-grow-0">Time Commitment</p>
              <div className="badge badge-primary flex flex-row gap-2 py-2 pl-0">
                <div className="badge badge-accent">
                  {project?.timeCommitment.split("_").join(" ")}
                </div>
                <div className="py-2">
                  {formatDuration(project?.startDate, project?.endDate)}
                </div>
              </div>
            </div>

            <div className="flex w-1/2 flex-row justify-between">
              <div className="space-y-2">
                <span>Start Date</span>
                <div className="flex flex-row items-center gap-2">
                  <BiCalendar size={24} />
                  <span>
                    {project?.startDate &&
                      format(project?.startDate, "MMM d, y")}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <span>End Date</span>
                <div className="flex flex-row items-center gap-2">
                  <BiCalendar size={24} />
                  <span>
                    {project?.endDate && format(project?.endDate, "MMM d, y")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="section-container">
            <div className="flex flex-col gap-4">
              <p className="section-title">Required Skills</p>

              {project && project.skillsRequired?.length > 0 && (
                <>
                  {project.skillsRequired?.map((skill: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-row items-start gap-2"
                      >
                        <div className="flex flex-col">
                          <div className="flex flex-row items-center gap-2">
                            <p className="line-clamp-1 flex-grow-0 text-lg font-medium">
                              {skill.skill.name}
                            </p>
                            <p className="badge badge-primary flex-grow-0">
                              {`${skill.vacancies} open positions`}
                            </p>
                          </div>
                          <p className="line-clamp-2 text-sm">
                            {skill.skill.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
