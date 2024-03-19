"use client";

import { AuthContext } from "@/app/lib/contexts/AppContext";
import SocialLinksInput from "@/components/formElements/SocialLinksInput";
import { useContext } from "react";
import { BiPlus, BiX } from "react-icons/bi";

export default function EditSocialLinks() {
  const { user } = useContext(AuthContext);

  return (
    <div className="space-y-1">
      <p>Edit Social Links</p>

      <div className="card rounded-md">
        <div className="card-body">
          {user &&
            user?.socialLinks?.map(
              ({
                id,
                platform,
                url,
              }: {
                id: string;
                platform: string;
                url: string;
              }) => (
                <div
                  key={id}
                  className="flex items-center justify-between gap-4"
                >
                  <SocialLinksInput platform={platform} url={url} />

                  <div>
                    <BiX size={24} />
                  </div>
                </div>
              ),
            )}

          {user && user?.socialLinks?.length < 6 && (
            <button className="btn btn-primary mt-3">
              <BiPlus size={24} />
              Add social link
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
