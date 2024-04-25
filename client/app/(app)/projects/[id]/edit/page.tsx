"use client";

import { useAlertsContext } from "@/app/lib/contexts/AlertContext";
import { useIsClient } from "@/app/lib/contexts/useIsClient";
import LogoAvatar from "@/components/global/LogoAvatar";
import axios from "axios";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProjects() {
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
          <div>d</div>
        </div>
      </div>
    </div>
  );
}
