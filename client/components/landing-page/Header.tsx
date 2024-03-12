"use client";

import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { BiDonateBlood, BiMenu, BiX } from "react-icons/bi";
import Button from "../global/Button";

export default function Header() {
  const [navHidden, setNavHidden] = useState(true);

  return (
    <div className="bg-primary-100">
      <nav className="container relative flex items-center justify-between py-2">
        {/* Logo icon */}
        <Link href="/">
          <BiDonateBlood size={40} />
        </Link>

        {/* Nav links */}
        <div
          className={clsx(
            { "hidden lg:flex": navHidden },
            "absolute right-0 top-full flex min-h-fit w-full items-center rounded-md bg-bg-100 px-5 py-4 shadow-lg duration-500 md:py-0 lg:static lg:w-auto lg:bg-primary-100 lg:shadow-none",
          )}
        >
          <ul className="flex w-full flex-col text-lg md:p-4 lg:flex-row lg:items-center lg:gap-8 lg:p-0 hover:[&>li>a]:text-accent-200 [&>li]:py-4">
            <li>
              <Link href="/organizations">Organizations</Link>
            </li>
            <li>
              <Link href="/about-us">About Us</Link>
            </li>
            <li>
              <Link href="/contact-us">Contact Us</Link>
            </li>
            <li>
              <Link href="/sign-in">
                <Button
                  variant="filled"
                  size={"sm"}
                  text="Sign in"
                  classes="w-fill lg:w-fit"
                />
              </Link>
            </li>
          </ul>
        </div>

        {/* Hamburger menu on small screens */}
        <div className="flex items-center gap-6 lg:hidden">
          {navHidden ? (
            <BiMenu size={40} onClick={() => setNavHidden(!navHidden)} />
          ) : (
            <BiX size={40} onClick={() => setNavHidden(!navHidden)} />
          )}
        </div>
      </nav>
    </div>
  );
}
