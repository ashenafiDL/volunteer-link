"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { BiUser } from "react-icons/bi";

export default function SideNav() {
  const [activeNavItem, setActiveNavItem] = useState<number | null>(null);
  const pathName = usePathname();

  const navItems = [
    {
      icon: <BiUser size={28} />,
      title: "Profile",
      subtitle: "Email, location, skills, contributions, badges, applications",
      href: "/v/me",
    },
    {
      icon: <AiOutlineSetting size={28} />,
      title: "Settings",
      subtitle: "Location preference, time preference, theme",
      href: "/v/me/settings",
    },
  ];

  const handleRouteChange = () => {
    const index = navItems.findIndex((item) => item.href === pathName);
    setActiveNavItem(index);
  };

  useLayoutEffect(() => {
    handleRouteChange();
  });

  return (
    <div className="flex flex-row lg:flex-col">
      {navItems.map((item, index) => {
        return (
          <Link key={item.title} href={item.href}>
            <div
              className={clsx(
                index === 0 && "rounded-l lg:rounded-l-none lg:rounded-t",
                index === navItems.length - 1 &&
                  "rounded-r lg:rounded-b lg:rounded-r-none",
                index === activeNavItem ? "font-medium" : "hover:bg-opacity-50",
                "card flex cursor-pointer flex-row items-center gap-4 rounded-none p-4 lg:gap-7 lg:p-6",
              )}
            >
              <div>{item.icon}</div>

              <div className="flex flex-col">
                <span className="lg:text-2xl">{item.title}</span>
                <span className="line-clamp-1 font-light">{item.subtitle}</span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
