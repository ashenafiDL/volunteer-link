import React from "react";

export default function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div className="m-2 inline w-fit rounded-full bg-primary-100 px-2 py-1 text-xs">
      {children}
    </div>
  );
}
