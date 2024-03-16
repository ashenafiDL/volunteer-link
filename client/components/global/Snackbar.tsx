"use client";

import clsx from "clsx";
import { useEffect, useState } from "react";
import { BiInfoCircle, BiX } from "react-icons/bi";

const Snackbar = ({
  message,
  type,
  duration,
  setSnackbar,
}: {
  message: string;
  type: "info" | "warning" | "success" | "error";
  duration?: number;
  setSnackbar: React.Dispatch<
    React.SetStateAction<{
      message: string;
      type: "info" | "warning" | "success" | "error";
      duration: number;
    } | null>
  >;
}) => {
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    setShowSnackbar(true);
    const timer = setTimeout(() => {
      setSnackbar(null);
      setShowSnackbar(false);
    }, duration || 3000);
    return () => clearTimeout(timer);
  }, [duration, setSnackbar]);

  const types = {
    success: "bg-success",
    info: "bg-info",
    warning: "bg-warning",
    error: "bg-error",
  };

  return (
    <div
      className={clsx(
        showSnackbar ? "-translate-y-0" : "-translate-y-56",
        "fixed right-5 top-5 z-50 flex max-w-lg transform flex-row items-start rounded px-4 py-4 text-lg leading-tight text-bg-100 shadow-xl transition-all duration-500",
        types[type],
      )}
    >
      <div className="flex w-full flex-grow flex-row items-start gap-2">
        <div>
          <BiInfoCircle size={24} />
        </div>
        <p>{message}</p>
      </div>

      <div
        role="button"
        className="mx-2"
        onClick={() => {
          setShowSnackbar(false);
        }}
      >
        <BiX size={28} />
      </div>
    </div>
  );
};

export default Snackbar;
