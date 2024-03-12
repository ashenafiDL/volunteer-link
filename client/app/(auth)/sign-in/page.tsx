import LoadingSkeleton from "@/Skeleton/LoadingSkeleton";
import Link from "next/link";
import { Suspense } from "react";
import SignInForm from "./SignInForm";

export default function SignIn() {
  return (
    <>
      <div className="space-y-2">
        <h3 className="text-3xl font-medium leading-9">Welcome Back</h3>
        <p className="font-normal leading-tight">
          Enter your credentials to login.
        </p>
      </div>
      <Suspense fallback={<LoadingSkeleton />}>
        <SignInForm />
      </Suspense>

      <Link className="self-center" href="/sign-up">
        <span>Don’t have an account? </span>
        <span className="underline">Create one.</span>
      </Link>
    </>
  );
}
