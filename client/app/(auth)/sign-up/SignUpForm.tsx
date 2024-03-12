"use client";

import { AuthContext } from "@/app/lib/contexts/AppContext";
import { SelectInput, TextInput } from "@/components/formElements";
import Button from "@/components/global/Button";
import Snackbar from "@/components/global/Snackbar";
import axios from "axios";
import { Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import * as Yup from "yup";
import {
  emailValidation,
  firstNameValidation,
  lastNameValidation,
  locationValidation,
  passwordValidation,
  repeatPasswordValidation,
  usernameValidation,
} from "../../lib/forms/verificationSchemas";

export default function SignUpForm({ locations }: { locations: object[] }) {
  const router = useRouter();

  const { setUser, setToken, setIsLoggedIn } = useContext(AuthContext);
  const [snackbar, setSnackBar] = useState<{
    message: string;
    type: "error" | "warning" | "info" | "success";
    duration: number;
  } | null>(null);

  return (
    <>
      {snackbar && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          duration={snackbar.duration}
          setSnackbar={setSnackBar}
        />
      )}

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          username: "",
          locationId: "",
          password: "",
          repeatPassword: "",
        }}
        validationSchema={Yup.object({
          firstName: firstNameValidation,
          lastName: lastNameValidation,
          email: emailValidation,
          username: usernameValidation,
          locationId: locationValidation,
          password: passwordValidation,
          repeatPassword: repeatPasswordValidation,
        })}
        onSubmit={async (values) => {
          try {
            const res = await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
              values,
            );

            if (res.status !== 201) {
              console.log(res);
            }

            if (res.status === 201) {
              const expiresIn = new Date(Date.now() + 48 * 60 * 60 * 1000); // Expires in 2 day
              document.cookie = `token=${res.data.token}; expires=${expiresIn.toUTCString()}; Secure; path=/`;

              setToken(res.data.token);
              setUser(res.data);
              setIsLoggedIn(true);

              router.replace("/");
            }
          } catch (error: any) {
            setSnackBar({
              message: error.response.data.message,
              type: "error",
              duration: 5000,
            });
          }
        }}
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
                props={{ name: "lastName", type: "text", autoComplete: "off" }}
              />
            </div>

            <div className="flex flex-col gap-4 xl:flex-row">
              <TextInput
                label="Email"
                props={{
                  name: "email",
                  type: "email",
                  autoComplete: "off",
                }}
              />

              <TextInput
                label="Username"
                props={{
                  name: "username",
                  type: "text",
                  autoComplete: "off",
                }}
              />
            </div>

            <SelectInput
              label="Location"
              props={{
                name: "locationId",
                type: "select",
              }}
            >
              <option>--Select your location--</option>
              {locations.map((location: any) => {
                return (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                );
              })}
            </SelectInput>

            <div className="flex flex-col gap-4 xl:flex-row">
              <TextInput
                label="Password"
                props={{
                  name: "password",
                  type: "password",
                }}
              />

              <TextInput
                label="Repeat Password"
                props={{
                  name: "repeatPassword",
                  type: "password",
                }}
              />
            </div>

            <Button
              disabled={isSubmitting}
              variant="filled"
              size="base"
              text="Sign Up"
              type="submit"
            />
          </Form>
        )}
      </Formik>
    </>
  );
}
