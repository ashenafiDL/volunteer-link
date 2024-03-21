"use client";

import axiosInstance from "@/app/axiosInstance";
import { useAuthContext } from "@/app/lib/contexts/AppContext";
import { urlValidation } from "@/app/lib/forms/verificationSchemas";
import SocialLinksInput from "@/components/formElements/SocialLinksInput";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

export default function EditSocialLinks() {
  const { user, getUser, setUser } = useAuthContext();
  const [initialValues, setInitialValues] = useState<any>({});
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  const handleSubmit = async (updates: any) => {
    const links = Object.entries(updates).map(([platform, url]) => {
      if (url === "") url = null;

      return {
        url,
        platform,
      };
    });

    console.log("links", links);

    try {
      const res = await axiosInstance.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/me/update`,
        {
          socialLinks: links,
        },
      );

      if (res.status === 200) {
        const updatedUser = getUser();
        setUser(updatedUser);
      }
    } catch (error) {
      // TODO: handle error
    }
  };

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      setIsUserLoaded(true);

      const reduced = user?.socialLinks?.reduce((acc: any, link: any) => {
        acc[link.platform] = link.url;
        return acc;
      }, {});

      setInitialValues(reduced);
    }
  }, [user]);

  return (
    <div className="space-y-1">
      <p>Edit Social Links</p>

      <div className="card rounded-md">
        <div className="card-body">
          {isUserLoaded && (
            <Formik
              initialValues={initialValues}
              validationSchema={Yup.object({
                Dribbble: urlValidation,
                LinkedIn: urlValidation,
                GitHub: urlValidation,
                Behance: urlValidation,
                Instagram: urlValidation,
                Website: urlValidation,
              })}
              onSubmit={async (values) => {
                handleSubmit(values);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-2">
                  {user?.socialLinks?.map(
                    (
                      link: { platform: string; url: string },
                      index: number,
                    ) => (
                      <div key={index} className="gap-4">
                        <SocialLinksInput label={link.platform} />
                      </div>
                    ),
                  )}

                  {user?.socialLinks && (
                    <div className="mt-6 flex flex-row gap-2">
                      <button type="reset" className="btn btn-outline">
                        Cancel
                      </button>
                      <button
                        disabled={isSubmitting}
                        type="submit"
                        className="btn btn-success"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
}
