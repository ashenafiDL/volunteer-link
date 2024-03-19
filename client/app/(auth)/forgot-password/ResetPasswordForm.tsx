import axiosInstance from "@/app/axiosInstance";
import { AuthContext } from "@/app/lib/contexts/AppContext";
import {
  passwordValidation,
  repeatPasswordValidation,
} from "@/app/lib/forms/verificationSchemas";
import { TextInput } from "@/components/formElements";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import * as Yup from "yup";

export default function ResetPasswordForm({
  email,
  setEmailSent,
  setEmail,
}: {
  email: string | null;
  setEmailSent: (success: boolean) => void;
  setEmail: (email: string) => void;
}) {
  const router = useRouter();
  const { setIsLoggedIn, setToken, setUser } = useContext(AuthContext);

  return (
    <>
      <div className="space-y-2">
        <h3 className="text-3xl font-medium leading-9">
          Enter your new password
        </h3>
        <p className="font-normal leading-tight">
          And try not to forget it. :-)
        </p>
      </div>

      <Formik
        initialValues={{ password: "", repeatPassword: "" }}
        validationSchema={Yup.object({
          password: passwordValidation,
          repeatPassword: repeatPasswordValidation,
        })}
        onSubmit={async (values) => {
          try {
            const res = await axiosInstance.post(
              `${process.env.NEXT_PUBLIC_API_URL}/auth/resetPassword`,
              {
                email: email,
                newPassword: values.password,
              },
            );

            setIsLoggedIn(true);
            setToken(res.data.token);
            setUser(res.data);

            setEmailSent(false);
            setEmail("");

            router.replace("/");
          } catch (error: any) {}
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4">
            <TextInput
              label="Password"
              props={{
                name: "password",
                type: "password",
                autoComplete: "off",
              }}
            />

            <TextInput
              label="Repeat Password"
              props={{
                name: "repeatPassword",
                type: "password",
                autoComplete: "off",
              }}
            />

            <button className="btn">Update</button>
          </Form>
        )}
      </Formik>

      <Link className="self-center" href="/sign-in">
        <span>Did you remember you password? </span>
        <span className="underline">Sign in.</span>
      </Link>
    </>
  );
}
