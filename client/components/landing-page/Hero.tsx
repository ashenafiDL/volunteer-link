import HeroImage from "@/public/img/hero-image.svg";
import Image from "next/image";
import Link from "next/link";
import Button from "../global/Button";

export default function Hero() {
  return (
    <section className=" bg-primary-100">
      <div className="container flex h-[80vh] max-h-[700px] flex-row items-center justify-between  pb-32">
        <div className="flex w-full flex-col gap-8 xl:w-1/2">
          <h1 className="text-3xl font-bold text-text-100 md:text-6xl">
            Join Our Community of Volunteers
          </h1>

          <p className="text-xl text-text-200">
            Join us in making a difference in our communities. Find
            opportunities to volunteer with non-profit organizations that match
            your interests.
          </p>

          <div className="flex flex-row gap-6">
            <Link href="/projects">
              <Button
                variant={"outlined"}
                size={"base"}
                text={"Browse Projects"}
              />
            </Link>
            <Link href="/sign-up">
              <Button variant={"filled"} size={"base"} text={"Sign Up"} />
            </Link>
          </div>
        </div>

        <div className="hidden w-1/2 md:w-1/3 xl:block">
          <Image
            className=""
            src={HeroImage}
            alt={""}
            width={600}
            height={600}
          />
        </div>
      </div>
    </section>
  );
}
