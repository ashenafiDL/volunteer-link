import Link from "next/link";
import { BiDonateBlood } from "react-icons/bi";
import { quotes } from "./quotes";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const quote = quotes[Math.ceil((Math.random() * 100.0) % quotes.length)];

  return (
    <div className="flex min-h-screen w-full flex-col justify-start lg:flex-row">
      {/* Left side */}
      <div className="flex w-full flex-col items-center justify-center px-[clamp(36px,5vw,96px)] py-12 lg:w-1/3 lg:items-start lg:justify-between">
        {/* Logo icon */}
        <Link className="flex flex-row items-center gap-4" href="/">
          <BiDonateBlood size={40} />
          <span className="text-[clamp(20px,2vw,30px)] font-semibold">
            VolunteerLink
          </span>
        </Link>
        {/* Quote */}
        <div className="hidden flex-col gap-8 lg:flex">
          <p className="text-balance text-[clamp(24px,2vw,36px)] font-bold leading-snug">
            {quote
              ? `"${quote.quote}"`
              : "It’s nice to be important, but it’s more important to be nice."}
          </p>
          <span className="self-end text-xl italic">
            {quote ? `- ${quote.author}` : "- Unknown Author"}
          </span>
        </div>
        <div></div> {/* Placeholder */}
      </div>

      {/* Right side */}
      <div className="flex items-center justify-center py-12 lg:flex-grow">
        {/* Form container */}
        <div className="w-[clamp(400px,60%,600px)] flex-col items-center justify-center gap-8 rounded-lg border px-10 py-12 shadow">
          <div className="flex flex-col items-stretch justify-start gap-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
