"use client";

import clsx from "clsx";
import { Form, Formik } from "formik";
import {
  FaBehance,
  FaDribbble,
  FaGithub,
  FaGlobe,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

export default function SocialLinksInput({
  platform,
  url,
}: {
  platform: string;
  url: string;
}) {
  const pickIcon = (platform: string) => {
    switch (platform) {
      case "Dribbble":
        return <FaDribbble size={18} />;
      case "LinkedIn":
        return <FaLinkedin size={18} />;
      case "GitHub":
        return <FaGithub size={18} />;
      case "Behance":
        return <FaBehance size={18} />;
      case "Instagram":
        return <FaInstagram size={18} />;
      case "Website":
        return <FaGlobe size={18} />;
      default:
        return;
    }
  };

  //   const [field, meta] = useField(platform);

  return (
    <div className="flex flex-grow flex-row">
      <div className="flex min-w-[20%] flex-row items-center gap-4 border border-r-0 border-neutral bg-base-200/60 px-5 py-2 text-lg">
        <div>{pickIcon(platform)}</div>
        <span>{platform}</span>
      </div>

      <div className="flex-grow">
        <Formik
          initialValues={{
            url: url,
          }}
          onSubmit={() => {}}
        >
          {({ isSubmitting }) => (
            <Form>
              <input
                // {...field}
                name={platform}
                id={platform}
                type="text"
                // {...props}
                className={clsx(
                  //   meta.error && meta.touched
                  //     ? "border-error focus:border-error focus:ring-error"
                  //     : "focus:border-accent-200 focus:ring-accent-200",
                  "bg-bg-100 w-full py-3",
                )}
              />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
