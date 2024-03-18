import clsx from "clsx";
import React from "react";

export default function Button({
  type,
  variant,
  color,
  size,
  disabled,
  icon,
  text,
  classes,
}: {
  type?: "submit" | "reset";
  variant: "filled" | "text" | "outlined";
  color?: "info" | "success" | "warning" | "error";
  size: "xs" | "sm" | "base" | "lg" | "xl";
  disabled?: boolean;
  icon?: React.ReactNode;
  text: string;
  classes?: string;
}) {
  const baseClasses = clsx(
    "flex flex-row items-center justify-center gap-4 rounded border-2 px-4 py-2 duration-200 focus:outline-none",
    disabled && "cursor-not-allowed opacity-50",
    classes,
  );

  const variantClasses = {
    filled: clsx(
      "border-accent-200 bg-accent-200 text-bg-100 hover:border-opacity-0 hover:bg-opacity-80",
      {
        "border-info bg-info": color === "info",
        "border-error bg-error": color === "error",
        "border-success bg-success": color === "success",
        "border-warning bg-warning": color === "warning",
      },
    ),
    text: clsx(
      "border-bg-100 text-accent-200 hover:border-2 hover:border-accent-100",
      {
        "text-info hover:border-info": color === "info",
        "text-error hover:border-error": color === "error",
        "text-success hover:border-success": color === "success",
        "text-warning hover:border-warning": color === "warning",
      },
    ),
    outlined: clsx(
      "border-accent-200 text-accent-200 hover:bg-accent-200 hover:text-bg-100",
      {
        "border-info hover:bg-info": color === "info",
        "border-error hover:bg-error": color === "error",
        "border-success hover:bg-success": color === "success",
        "border-warning hover:bg-warning": color === "warning",
      },
    ),
  };

  const sizeClasses = {
    xs: "text-xs py-2 px-4",
    sm: "text-sm py-2 px-3",
    base: "text-base py-3 px-4",
    lg: "text-lg py-4 px-5",
    xl: "text-xl py-5 px-6",
  };

  return (
    <button
      className={clsx(baseClasses, variantClasses[variant], sizeClasses[size], {
        classes,
      })}
      type={type || "button"}
    >
      {icon && <div>{icon}</div>}
      {text}
    </button>
  );
}
