import { emailValidation } from "@/app/lib/forms/validationSchemas";
import { TextInput } from "@/components/formElements";
import axios from "axios";
import { Form, Formik } from "formik";
import Link from "next/link";
import * as Yup from "yup";

export default function RequestPasswordResetForm({
  setEmailSent,
  setEmail,
}: {
  setEmailSent: (success: boolean) => void;
  setEmail: (email: string) => void;
}) {
  return (
    <>
      <div className="space-y-2">
        <h3 className="text-3xl font-medium leading-9">
          Forgot your password?
        </h3>
        <p className="font-normal leading-tight">
          Don’t worry. We will send you a password rest instruction. Just type
          in your email.
        </p>
      </div>

      <Formik
        initialValues={{ email: "" }}
        validationSchema={Yup.object({
          email: emailValidation,
        })}
        onSubmit={async (values) => {
          setEmail(values.email);

          try {
            await axios.post(
              `${process.env.NEXT_PUBLIC_API_URL}/auth/forgotPassword`,
              values,
            );

            setEmailSent(true);
          } catch (error: any) {
            // TODO: show error
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

            <button className="btn btn-primary">Send</button>
          </Form>
        )}
      </Formik>

      <Link className="self-center" href="/sign-in">
        <span>Did you remember you password? </span>
        <span className="text-primary underline">Sign in.</span>
      </Link>
    </>
  );
}
