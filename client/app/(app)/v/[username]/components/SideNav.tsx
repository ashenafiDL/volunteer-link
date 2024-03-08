"use client";

import Card from "@/components/global/Card";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { BiUser } from "react-icons/bi";

export default function SideNav({ username }: { username: string }) {
  const [activeNavItem, setActiveNavItem] = useState<number | null>(null);
  const pathName = usePathname();

  const navItems = [
    {
      icon: <BiUser size={28} />,
      title: "Profile",
      subtitle: "Email, location, skills, contributions, badges, applications",
      href: `/v/${username}`,
    },
    {
      icon: <AiOutlineSetting size={28} />,
      title: "Settings",
      subtitle: "Location preference, time preference, theme",
      href: `/v/${username}/settings`,
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
            <Card
              classes={clsx(
                index === 0 && "rounded-l lg:rounded-t",
                index === navItems.length - 1 && "rounded-r lg:rounded-b",
                index === activeNavItem
                  ? "bg-primary-100 font-medium"
                  : "bg-opacity-50 hover:bg-bg-200",
                "flex cursor-pointer flex-row items-center gap-4 rounded-none p-4 lg:gap-7 lg:p-6",
              )}
            >
              <div>{item.icon}</div>

              <div className="flex flex-col">
                <span className="lg:text-2xl">{item.title}</span>
                <span className="line-clamp-1 font-light text-text-200">
                  {item.subtitle}
                </span>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
