"use client";

import axiosInstance from "@/app/axiosInstance";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function LogoAvatar({
  id,
  name,
  size,
}: {
  id: string;
  name: string;
  size: "xs" | "sm" | "base" | "lg" | "xl";
}) {
  const [logo, setLogo] = useState<string | null>(null);

  useEffect(() => {
    async function getAvatar() {
      try {
        const response = await axiosInstance.get(
          `${process.env.NEXT_PUBLIC_API_URL}/files/getLogo/${id}`,
          {
            responseType: "blob",
          },
        );

        if (response.status === 200) {
          const url = URL.createObjectURL(response.data);
          setLogo(url);
        }
      } catch (e) {
        setLogo(null);
      }
    }

    if (id !== undefined) {
      getAvatar();
    }
  }, [id]);

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
          "rounded-md bg-neutral text-neutral-content",
          size === "xs" && "w-6",
          size === "sm" && "w-8",
          size === "base" && "w-10",
          size === "lg" && "w-20",
          size === "xl" && "w-32",
        )}
      >
        <span className="text-xl">{name && name.charAt(0).toUpperCase()}</span>
      </div>
    </div>
  );

  return (
    <>
      {logo ? (
        <div className="avatar">
          <div
            className={clsx(
              "rounded-md",
              size === "xs" && "w-6",
              size === "sm" && "w-8",
              size === "base" && "w-10",
              size === "lg" && "w-20",
              size === "xl" && "w-32",
            )}
          >
            <Image
              src={logo}
              width={getSize()}
              height={getSize()}
              alt={name}
              className="h-full w-full rounded-md"
            />
          </div>
        </div>
      ) : (
        renderFallback()
      )}
    </>
  );
}