"use client";

import { AuthContext } from "@/app/lib/contexts/AppContext";
import SocialLinksInput from "@/components/formElements/SocialLinksInput";
import Button from "@/components/global/Button";
import Card from "@/components/global/Card";
import { useContext } from "react";
import { BiX } from "react-icons/bi";

export default function EditSocialLinks() {
  const { user } = useContext(AuthContext);

  return (
    <div className="space-y-1">
      <p>Edit Social Links</p>

      <Card classes="space-y-6">
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
              <div key={id} className="flex items-center justify-between gap-4">
                <SocialLinksInput platform={platform} url={url} />

                <div>
                  <BiX size={24} />
                </div>
              </div>
            ),
          )}

        {user && user?.socialLinks?.length < 6 && (
          <Button variant="text" size="base" text="Add social link" />
        )}
      </Card>
    </div>
  );
}
