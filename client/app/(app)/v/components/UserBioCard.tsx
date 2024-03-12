"use client";

import Card from "@/components/global/Card";
import clsx from "clsx";
import { useState } from "react";

export default function UserBioCard({ bio }: { bio: string }) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <Card classes="card">
      <h5 className="card-title">Bio</h5>

      <div>
        <p
          className={clsx(
            isExpanded ? "" : "line-clamp-3",
            "mb-2 text-pretty text-text-200",
          )}
        >
          {bio}
        </p>

        <span
          className="cursor-pointer text-sm text-text-200"
          onClick={() => {
            setIsExpanded(!isExpanded);
          }}
        >
          {isExpanded ? "Show less" : "Show more"}
        </span>
      </div>
    </Card>
  );
}
