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
    <div className="max-w-screen overflow-hidden">
      <Header />

      <Hero />

      <div className="space-y-32 md:space-y-40 xl:space-y-48">
        <Stats />

        <Mission />

        <LatestProjects />

        <WhyVolunteer />

        {/* Join us section */}
        <div className="container prose min-w-full text-center lg:prose-lg">
          <h1>Ready to make a difference?</h1>
          <p className="mb-8">
            Get involved today and help us build a better community.
          </p>
          <Link href="/sign-up">
            <button className="btn btn-primary">Join Us</button>
          </Link>
        </div>

        <Footer />
      </div>
    </div>
  );
}
