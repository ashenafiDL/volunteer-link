"use client";

import axiosInstance from "@/app/axiosInstance";
import { useAlertsContext } from "@/app/lib/contexts/AlertContext";
import { useIsClient } from "@/app/lib/contexts/useIsClient";
import formatDuration from "@/app/lib/formatDuration";
import "@/app/styles.css";
import TextAreaInput from "@/components/formElements/TextAreaInput";
import LogoAvatar from "@/components/global/LogoAvatar";
import axios from "axios";
import clsx from "clsx";
import { format } from "date-fns";
import { Form, Formik } from "formik";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiCalendar } from "react-icons/bi";
import { GoArrowLeft } from "react-icons/go";
import * as Yup from "yup";

export default function ProjectPage() {
  const [applied, setApplied] = useState(false);
  const [project, setProject] = useState<any>();
  const pathname = usePathname();
  const router = useRouter();
  const { addAlert, dismissAlert } = useAlertsContext();
  const isClient = useIsClient();

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
    <>
      <div>
        <div className="layout-container">
          <div className="layout-left-child card rounded-md">
            <div className="card-body space-y-3">
              <div className="flex flex-col gap-1">
                <div className="flex flex-row items-center gap-2">
                  <LogoAvatar
                    id={project?.organization?.id}
                    name={project?.organization?.name}
                    size="sm"
                  />
                  <p>{project?.organization?.name}</p>
                </div>
                <h1 className="text-2xl font-bold">{project?.title}</h1>
              </div>
              <button
                className={clsx("btn btn-primary", applied && "btn-disabled")}
                onClick={() => {
                  if (!applied) {
                    showModal("apply_to_projects_modal");
                  }
                }}
              >
                {applied ? "You have already applied." : "Apply"}
              </button>
            </div>
          </div>

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
                      <div className="badge badge-accent badge-lg">
                        In Person
                      </div>
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
                          {project?.endDate &&
                            format(project?.endDate, "MMM d, y")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Apply to project modal */}
      <dialog id="apply_to_projects_modal" className="modal">
        <div className="prose modal-box rounded-md lg:prose-lg">
          <h3>Cover Letter</h3>
          <p className="leading-tight">
            Write a short message to the organization. You can include things
            like: why are you qualified for this position, what skills you have,
            etc.
          </p>

          <Formik
            initialValues={{
              message: "",
            }}
            validationSchema={Yup.object({
              message: Yup.string().max(
                500,
                "Message must not exceed 500 characters",
              ),
            })}
            onSubmit={(values) => {
              handleApply(values);
            }}
          >
            <Form>
              <TextAreaInput
                label="Message (Optional)"
                props={{
                  name: "message",
                  rows: 5,
                  maxLength: 500,
                  placeholder: "Write a short message",
                }}
              />

              <div className="modal-action mt-5 flex flex-row justify-end gap-4">
                <div onClick={() => closeModal("apply_to_projects_modal")}>
                  <button type="reset" className="btn btn-outline">
                    Cancel
                  </button>
                </div>
                <div>
                  <button type="submit" className="btn btn-success">
                    Save
                  </button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </dialog>
    </>
  );
}
