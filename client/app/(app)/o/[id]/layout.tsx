"use client";

import "@/app/styles.css";
import LogoAvatar from "@/components/global/LogoAvatar";
import axios from "axios";
import clsx from "clsx";
import { format } from "date-fns";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GoProject } from "react-icons/go";

export default function OrgProfileSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [org, setOrg] = useState<any>();
  const [active, setActive] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const gerOrg = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/organizations/${pathname.split("/")[2]}`,
        );

        if (res.status === 200) {
          setOrg(res.data);
        }
      } catch (error) {
        setOrg(null);
      }
    };

    gerOrg();
  }, [pathname]);

  useEffect(() => {
    if (pathname.split("/")[3] === "projects") {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [pathname]);

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <div className="space-y-3">
        <div className="layout-left-child">
          <div className="card rounded-md">
            <div className="card-body">
              <div
                className={clsx(
                  "badge",
                  org?.verified ? "badge-success" : "badge-error",
                )}
              >
                {org?.verified ? "Verified" : "Not Verified"}
              </div>
              <LogoAvatar id={org?.id} name={org?.name} size="xl" />
              <Link href={`/o/${org?.id}`}>
                <h2 className="text-3xl font-medium">{org?.name}</h2>
              </Link>
              <div className="flex flex-row">
                <span>{org?.location?.name}</span>
                {org?.foundingDate && (
                  <>
                    <div className="divider divider-horizontal"></div>
                    <span>{`Since ${format(org?.foundingDate, "MMMM, yyyy")}`}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-row lg:flex-col">
            <Link href={`/o/${org?.id}/projects`}>
              <div
                className={clsx(
                  active
                    ? "bg-primary text-primary-content"
                    : "bg-base-100 text-base-content",
                  "flex cursor-pointer flex-row items-center gap-4 rounded-md border border-neutral/10 p-4 font-medium hover:bg-opacity-50 lg:gap-7 lg:p-6",
                )}
              >
                <div>
                  <GoProject size={28} />
                </div>

                <div className="flex flex-col">
                  <span className="lg:text-2xl">Projects</span>
                  <span className="line-clamp-1 font-light">
                    {org?._count &&
                      `${org?._count.projects} Finished, ${org?.projects.length - org?._count.projects} In Progress`}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="layout-right-child">{children}</div>
    </div>
  );
}
