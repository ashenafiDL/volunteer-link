import axios from "axios";
import Link from "next/link";
import { ChangeEvent, KeyboardEvent, useEffect, useRef } from "react";

export default function VerifyResetCodeForm({
  email,
  setIsValidCode,
}: {
  email: string | null;
  setIsValidCode: (isValidCode: boolean) => void;
}) {
  const inputs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    inputs.current[0].focus(); // Focus on the first input initially
  }, []);

  const handleInputChange = (
    index: number,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const input = e.target;
    const value = input.value;

    // If the input is filled and not the last one
    if (value.length === input.maxLength && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus(); // Move focus to the next input
    }
  };

  const handleBackspace = (index: number, e: KeyboardEvent) => {
    const input = e.target as HTMLInputElement;
    const value = input.value;

    // If the input is empty and not the first one
    if (value.length === 0 && index > 0) {
      inputs.current[index - 1].focus(); // Move focus to the previous input
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let code = "";
    inputs.current.forEach((input) => {
      code += input.value;
    });

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/verifyResetCode`,
        {
          resetCode: code,
          email: "ashenafi.debella101@gmail.com",
        },
      );

      if (res.status === 201) {
        setIsValidCode(true);
        const expiresIn = new Date(Date.now() + 48 * 60 * 60 * 1000); // Expires in 2 day
        document.cookie = `token=${res.data.token}; expires=${expiresIn.toUTCString()}; Secure; path=/`;
      }
    } catch (error: any) {}
  };

  return (
    <>
      <div className="space-y-2">
        <h3 className="text-3xl font-medium leading-9">Check your inbox.</h3>
        <p className="font-normal leading-tight">
          Enter the six digit password reset code sent to {email}.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-4 [&>input]:w-[calc(100%/6)] [&>input]:text-center [&>input]:text-xl">
          {Array.from({ length: 6 }, (_, index) => (
            <input
              key={index}
              ref={(ref) => (inputs.current[index] = ref as HTMLInputElement)}
              type="text"
              maxLength={1}
              onChange={(e) => handleInputChange(index, e)}
              onKeyDown={(e) => {
                if (e.key === "Backspace") {
                  handleBackspace(
                    index,
                    e as React.KeyboardEvent<HTMLInputElement>,
                  );
                }
              }}
            />
          ))}
        </div>

        <button className="btn">Verify</button>
      </form>

      <Link className="self-center" href="/sign-in">
        <span>Did you remember you password? </span>
        <span className="underline">Sign in.</span>
      </Link>
    </>
  );
}
