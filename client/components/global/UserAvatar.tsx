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

    if (email !== undefined) {
      getAvatar();
    }
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
    <div className="avatar placeholder">
      <div
        className={clsx(
          "rounded-full bg-neutral text-neutral-content",
          size === "xs" && "w-6",
          size === "sm" && "w-8",
          size === "base" && "w-10",
          size === "lg" && "w-20",
          size === "xl" && "w-32",
        )}
      >
        <span className="text-xl">AI</span>
      </div>
    </div>
  );

  return (
    <>
      {avatar ? (
        <div className="avatar">
          <div
            className={clsx(
              "rounded-full",
              size === "xs" && "w-6",
              size === "sm" && "w-8",
              size === "base" && "w-10",
              size === "lg" && "w-20",
              size === "xl" && "w-32",
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
        </div>
      ) : (
        renderFallback()
      )}
    </>
  );
}
