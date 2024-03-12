import Button from "@/components/global/Button";
import Footer from "@/components/global/Footer";
import Header from "@/components/landing-page/Header";
import Hero from "@/components/landing-page/Hero";
import LatestProjects from "@/components/landing-page/LatestProjects";
import Mission from "@/components/landing-page/Mission";
import Stats from "@/components/landing-page/Stats";
import WhyVolunteer from "@/components/landing-page/WhyVolunteer";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="max-w-screen overflow-hidden bg-bg-100">
      <Header />

      <Hero />

      <div className="space-y-32 md:space-y-40 xl:space-y-48">
        <Stats />

        <Mission />

        <LatestProjects />

        <WhyVolunteer />

        {/* Join us section */}
        <div className="container flex flex-col items-center justify-center gap-2 text-center">
          <h1 className="text-2xl font-semibold md:text-3xl lg:text-5xl">
            Ready to make a difference?
          </h1>
          <p className="mb-8 text-sm text-text-200 md:text-base lg:text-2xl">
            Get involved today and help us build a better community.
          </p>
          <Link href="/sign-up">
            <Button variant={"filled"} size={"base"} text={"Join Us"} />
          </Link>
        </div>

        <Footer />
      </div>
    </div>
  );
}
