"use client";

import { useAuthContext } from "@/app/lib/contexts/AppContext";
import { useIsClient } from "@/app/lib/contexts/useIsClient";
import UserAvatar from "@/components/global/UserAvatar";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import {
  BiDonateBlood,
  BiFile,
  BiListCheck,
  BiLogOut,
  BiUserCircle,
} from "react-icons/bi";
import { SlBell } from "react-icons/sl";

export default function Header() {
  const { user, logout } = useAuthContext();
  const [dropdownHidden, setDropdownHidden] = useState<boolean>(true);
  const popupRef = useRef<HTMLDivElement>(null);
  const isClient = useIsClient();

  // Menu items of the dropdown
  const menuItems = [
    {
      label: "Profile",
      icon: <BiUserCircle size={24} />,
      href: "/v/me",
    },
    { label: "Tasks", icon: <BiListCheck size={24} />, href: "#" },
    { label: "Applications", icon: <BiFile size={24} />, href: "#" },
    {
      label: "Settings",
      icon: <AiOutlineSetting size={24} />,
      href: "/v/me/settings",
    },
  ];

  const handleLogout = () => {
    logout();
  };

  const handleMenuItemClick = () => {
    setDropdownHidden(true);
  };

  // Close the dropdown if the user clicks outside the dropdown area
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setDropdownHidden(true);
      }
    }

    if (!isClient) {
      document.body.addEventListener("click", handleClickOutside);
    }

    return () => {
      if (!isClient) {
        document.body.removeEventListener("click", handleClickOutside);
      }
    };
  }, [isClient]);

  return (
    <div className="sticky top-0 z-10 bg-primary py-2">
      <div className="container flex w-full items-center justify-between bg-primary">
        {/* Logo section of the header */}
        <Link
          href="/home"
          className="flex items-center gap-2 text-primary-content"
        >
          <BiDonateBlood size={28} />
          <span className="text-xl font-medium">VolunteerLink</span>
        </Link>

        {/* Notification + search + user avatar */}
        <div className="flex items-center gap-4">
          <SlBell className="text-primary-content" size={24} />

          {/* User avatar */}
          <div className="relative">
            <div
              onClick={() => {
                setDropdownHidden(!dropdownHidden);
              }}
              className="cursor-pointer"
            >
              <UserAvatar
                email={user.email}
                name={user.firstName}
                size="base"
              />
            </div>

            {/* Dropdown menu items */}
            <div
              ref={popupRef}
              className={clsx(
                dropdownHidden ? "hidden" : "block",
                "absolute right-0 mt-3 w-52 overflow-clip rounded-md bg-base-100 shadow-md lg:left-1/2 lg:-translate-x-1/2",
              )}
            >
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  onClick={handleMenuItemClick}
                  className="flex items-center gap-4 px-4 py-2 text-lg transition-colors duration-300 hover:bg-base-200"
                  href={item.href}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}

              <hr className="border-neutral-content" />

              <div
                onClick={handleLogout}
                className="flex cursor-pointer items-center gap-4 px-4 py-2 text-lg transition-colors duration-300 hover:bg-base-200"
              >
                <BiLogOut size={24} />
                <span>Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
