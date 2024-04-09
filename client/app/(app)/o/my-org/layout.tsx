"use client";

import { useAuthContext } from "@/app/lib/contexts/AppContext";
import LogoAvatar from "@/components/global/LogoAvatar";
import clsx from "clsx";
import { format } from "date-fns";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GoProject } from "react-icons/go";
import "../../v/components/styles.css";

export default function OrgProfileSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const [active, setActive] = useState(false);
  const { org } = useAuthContext();
  const pathname = usePathname();

  console.log("path", pathname);

  useEffect(() => {
    if (pathname === "/o/my-org/projects") {
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
          <Link href="/o/my-org">
            <div className="card rounded-md">
              <div className="card-body">
                <LogoAvatar id={org.id} name={org.name} size="xl" />
                <h2 className="text-3xl font-medium">{org.name}</h2>
                <div className="flex flex-row">
                  <span>{org?.location?.name}</span>
                  {org.foundingDate && (
                    <>
                      <div className="divider divider-horizontal"></div>
                      <span>{`Since ${format(org.foundingDate, "MMMM yyyy")}`}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Link>

          <div className="flex flex-row lg:flex-col">
            <Link href="/o/my-org/projects">
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
