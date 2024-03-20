"use client";

import { useAuthContext } from "@/app/lib/contexts/AppContext";
import {
  emailValidation,
  firstNameValidation,
  lastNameValidation,
  locationValidation,
  usernameValidation,
} from "@/app/lib/forms/verificationSchemas";
import { TextInput } from "@/components/formElements";
import { Form, Formik } from "formik";
import * as Yup from "yup";

export default function EditPersonalInfo() {
  const { user } = useAuthContext();

  return (
    <div className="space-y-1">
      <p>Personal Info</p>

      <div className="card rounded-md">
        <div className="card-body">
          <Formik
            initialValues={{
              firstName: user.firstName,
              lastName: user.lastName,
              bio: user.bio,
              username: user.username,
              gender: user.gender,
              age: user.age,
              email: user.email,
              location: user?.location?.name,
            }}
            validationSchema={Yup.object({
              firstName: firstNameValidation,
              lastName: lastNameValidation,
              bio: Yup.string().max(160),
              username: usernameValidation,
              // TODO: Add gender, age and bio Yup validation schemas
              gender: Yup.string(),
              age: Yup.number(),
              email: emailValidation,
              location: locationValidation,
            })}
            onSubmit={async (values) => {}}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-2">
                <div className="flex flex-grow gap-4 xl:flex-row">
                  <TextInput
                    label="First Name"
                    props={{
                      name: "firstName",
                      type: "text",
                      autoComplete: "off",
                    }}
                  />

                  <TextInput
                    label="Last Name"
                    props={{
                      name: "lastName",
                      type: "text",
                      autoComplete: "off",
                    }}
                  />
                </div>

                <TextInput
                  label="Bio"
                  props={{
                    name: "bio",
                    id: "bio",
                    type: "text",
                    maxLength: 160,
                  }}
                />

                <div className="flex flex-row gap-3">
                  <div className="w-1/2">
                    <TextInput
                      label="Username"
                      props={{
                        name: "username",
                        id: "username",
                        type: "text",
                      }}
                    />
                  </div>

                  <div className="flex w-1/2 flex-row gap-4">
                    <TextInput
                      label="Gender"
                      props={{
                        name: "gender",
                        id: "gender",
                        type: "text",
                      }}
                    />

                    <TextInput
                      label="Age"
                      props={{
                        name: "age",
                        id: "age",
                        type: "number",
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-grow gap-4 xl:flex-row">
                  <TextInput
                    label="Email"
                    props={{
                      name: "email",
                      type: "email",
                      autoComplete: "off",
                    }}
                  />

                  {/* TODO: use select input */}
                  <TextInput
                    label="Location"
                    props={{
                      name: "location",
                      type: "text",
                      autoComplete: "off",
                    }}
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}
