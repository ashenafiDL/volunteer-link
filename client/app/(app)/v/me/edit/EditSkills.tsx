"use client";

import { AuthContext } from "@/app/lib/contexts/AppContext";
import { TextInput } from "@/components/formElements";
import clsx from "clsx";
import { Form, Formik } from "formik";
import { useContext } from "react";
import { BiX } from "react-icons/bi";
import "../../components/styles.css";

export default function EditSkills() {
  const { user } = useContext(AuthContext);

  return (
    <div className="space-y-1">
      <p>Skills</p>

      <div className="card space-y-3">
        {user &&
          user.skills &&
          user.skills.length > 0 &&
          user.skills.map(
            (
              skill: {
                id: string;
                name: string;
                description: string;
                category: any;
              },
              index: number,
            ) => (
              <div
                key={skill.id}
                className="flex flex-row items-center gap-8 space-y-1"
              >
                <div
                  className={clsx(
                    "space-y-1 py-2",
                    index === 0 && "pt-0",
                    index === user.skills.length - 1 && "pb-0",
                  )}
                  key={skill.name}
                >
                  <div>
                    <span className="personal-info-value">{skill.name}</span>
                    <div className="badge">{skill.category.name}</div>
                  </div>
                  <p className="text-text-200 line-clamp-1 font-light">
                    {skill.description}
                  </p>
                </div>

                <div>
                  <BiX size={24} />
                </div>
              </div>
            ),
          )}

        <div className="pt-10">
          <Formik
            initialValues={{
              skills: "",
            }}
            onSubmit={() => {}}
          >
            {({ isSubmitting }) => (
              <Form>
                <TextInput
                  label="Add more skills"
                  props={{
                    name: "skills",
                    id: "skills",
                    type: "text",
                    autoComplete: "enabled",
                    placeholder: "Search for new skills",
                  }}
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
