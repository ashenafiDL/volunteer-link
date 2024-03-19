import HeroImage from "@/public/img/hero-image.svg";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section>
      <div className="container flex h-[80vh] max-h-[700px] flex-row items-center justify-between pb-32">
        <div className="prose flex w-full flex-col lg:prose-lg xl:w-1/2">
          <h1>Join Our Community of Volunteers</h1>

          <p className="text-text-200 text-xl">
            Join us in making a difference in our communities. Find
            opportunities to volunteer with non-profit organizations that match
            your interests.
          </p>

          <div className="flex flex-row gap-6">
            <Link href="/projects">
              <button className="btn btn-outline">Browse Projects</button>
            </Link>
            <Link href="/sign-up">
              <button className="btn">Sign Up</button>
            </Link>
          </div>
        </div>

        <div className="hidden w-1/2 md:w-1/3 xl:block">
          <Image src={HeroImage} alt="Hero image" width={600} height={600} />
        </div>
      </div>
    </section>
  );
}
