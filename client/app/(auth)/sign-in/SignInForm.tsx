"use client";

import { useAuthContext } from "@/app/lib/contexts/AppContext";
import {
  emailValidation,
  passwordValidation,
} from "@/app/lib/forms/verificationSchemas";
import { TextInput } from "@/components/formElements";
import axios from "axios";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

export default function SignInForm() {
  const router = useRouter();

  const { setUser, setToken, setIsLoggedIn } = useAuthContext();

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={Yup.object({
        email: emailValidation,
        password: passwordValidation,
      })}
      onSubmit={async (values) => {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/signIn`,
            values,
          );

          const expiresIn = new Date(Date.now() + 48 * 60 * 60 * 1000); // Expires in 2 day
          document.cookie = `token=${res.data.token}; expires=${expiresIn.toUTCString()}; Secure; path=/`;

          setToken(res.data.token);
          setUser(res.data);
          setIsLoggedIn(true);

          router.replace("/");
        } catch (error: any) {
          // TODO: - return the snackbar here
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-4">
          <TextInput
            label="Email"
            props={{
              name: "email",
              type: "email",
              autoComplete: "off",
            }}
          />

          <TextInput
            label="Password"
            props={{
              name: "password",
              type: "password",
            }}
          />
          <Link
            className="text-accent-200 self-end text-sm leading-tight underline"
            href="/forgot-password"
          >
            Forgot password?
          </Link>

          <button
            disabled={isSubmitting}
            type="submit"
            className="btn btn-primary"
          >
            Sign In
          </button>
        </Form>
      )}
    </Formik>
  );
}
