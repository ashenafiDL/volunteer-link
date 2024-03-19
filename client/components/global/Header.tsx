"use client";

import { AuthContext } from "@/app/lib/contexts/AppContext";
import UserAvatar from "@/components/global/UserAvatar";
import clsx from "clsx";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
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
  const { user, logout } = useContext(AuthContext);
  const [dropdownHidden, setDropdownHidden] = useState<boolean>(true);
  const [isUserLoaded, setIsUserLoaded] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement>(null);

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
    setIsUserLoaded(false);
    logout();
  };

  const handleMenuItemClick = () => {
    setDropdownHidden(true);
  };

  // Wait for the user object to load at initial load time
  useEffect(() => {
    if (user && Object.keys(user).length > 0) {
      setIsUserLoaded(true);
    }
  }, [user]);

  // Close the dropdown if the user clicks outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setDropdownHidden(true);
      }
    }

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-primary-100 text-text-100 sticky top-0 z-10 py-2">
      <div className="container flex w-full items-center justify-between">
        {/* Logo section of the header */}
        <Link href="/home" className="flex items-center gap-2">
          <BiDonateBlood size={28} />
          <span className="text-xl font-medium">VolunteerLink</span>
        </Link>

        {/* Notification + search + user avatar */}
        <div className="flex items-center gap-4">
          <SlBell size={24} />

          {/* User avatar */}
          <div className="relative">
            {isUserLoaded && (
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
            )}

            {/* Dropdown menu items */}
            <div
              ref={popupRef}
              className={clsx(
                dropdownHidden ? "hidden" : "block",
                "bg-bg-100 absolute right-0 mt-3 w-52 overflow-clip rounded-md shadow-md lg:left-1/2 lg:-translate-x-1/2",
              )}
            >
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  onClick={handleMenuItemClick}
                  className="hover:bg-bg-200 flex items-center gap-4 px-4 py-2 text-lg transition-colors duration-300"
                  href={item.href}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}

              <hr className="border-bg-300" />

              <div
                onClick={handleLogout}
                className="hover:bg-bg-200 flex cursor-pointer items-center gap-4 px-4 py-2 text-lg transition-colors duration-300"
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
