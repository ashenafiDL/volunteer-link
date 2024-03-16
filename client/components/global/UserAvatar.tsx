"use client";

import axiosInstance from "@/app/axiosInstance";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function UserAvatar({
  email,
  name,
  size,
}: {
  email: string;
  name: string;
  size: "xs" | "sm" | "base" | "lg" | "xl";
}) {
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    async function getAvatar() {
      try {
        const response = await axiosInstance.get(
          `${process.env.NEXT_PUBLIC_API_URL}/files/getProfilePicture/${email}`,
          {
            responseType: "blob",
          },
        );

        if (response.status === 200) {
          const url = URL.createObjectURL(response.data);
          setAvatar(url);
        }
      } catch (e) {
        setAvatar(null);
      }
    }

    getAvatar();
  }, [email]);

  const sizeMap = {
    xs: 6,
    sm: 8,
    base: 10,
    lg: 20,
    xl: 32,
  };

  const getSize = () => sizeMap[size];

  const renderFallback = () => (
    <div
      className={clsx(
        "flex items-center justify-center rounded-full bg-bg-300",
        size === "xs" && "size-6",
        size === "sm" && "size-8",
        size === "base" && "size-10",
        size === "lg" && "size-20",
        size === "xl" && "size-32",
      )}
    >
      <span className="text-xl font-medium text-primary-300">
        {name?.charAt(0)?.toUpperCase()}
      </span>
    </div>
  );

  return (
    <>
      {avatar ? (
        <div
          className={clsx(
            "flex items-center justify-center rounded-full bg-bg-300",
            size === "xs" && "size-6",
            size === "sm" && "size-8",
            size === "base" && "size-10",
            size === "lg" && "size-20",
            size === "xl" && "size-32",
          )}
        >
          <Image
            src={avatar}
            width={getSize()}
            height={getSize()}
            alt={name}
            className="h-full w-full rounded-full"
          />
        </div>
      ) : (
        renderFallback()
      )}
    </>
  );
}
