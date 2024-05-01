"use client";

import axiosInstance from "@/app/axiosInstance";
import { useAlertsContext } from "@/app/lib/contexts/AlertContext";
import { useAuthContext } from "@/app/lib/contexts/AppContext";
import { useIsClient } from "@/app/lib/contexts/useIsClient";
import "@/app/styles.css";
import TextAreaInput from "@/components/formElements/TextAreaInput";
import LogoAvatar from "@/components/global/LogoAvatar";
import axios from "axios";
import clsx from "clsx";
import { Form, Formik } from "formik";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiFile } from "react-icons/bi";
import * as Yup from "yup";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
    if (pathname.includes("applications")) {
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

  // Check if already applied
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

  // Check if project owner
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

  //   Fetch project
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
      <div className="layout-container">
        <div className="layout-left-child">
          <div className="card rounded-md">
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
                <Link href={`/projects/${project?.id}`}>
                  <h1 className="text-2xl font-bold">{project?.title}</h1>
                </Link>
              </div>
              {isOwner ? (
                <Link href={`/projects/${project.id}/edit`} className="w-fit">
                  <button className="btn btn-primary">Edit Project</button>
                </Link>
              ) : (
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
              )}
            </div>
          </div>

          <div className="flex flex-row lg:flex-col">
            {isOwner && (
              <Link href={`/projects/${project?.id}/applications`}>
                <div
                  className={clsx(
                    active
                      ? "bg-primary text-primary-content"
                      : "bg-base-100 text-base-content",
                    "flex cursor-pointer flex-row items-center gap-4 rounded-md border border-neutral/10 p-4 font-medium hover:bg-opacity-50 lg:gap-7 lg:p-6",
                  )}
                >
                  <div>
                    <BiFile size={28} />
                  </div>

                  <div className="flex flex-col">
                    <span className="lg:text-2xl">Applications</span>
                    <span className="line-clamp-1 font-light">
                      {`${project?.applications?.length} applications`}
                    </span>
                  </div>
                </div>
              </Link>
            )}
          </div>
        </div>

        <div className="layout-right-child">
          <div>{children}</div>
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
