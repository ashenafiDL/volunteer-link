import Link from "next/link";
import {
  BiDonateBlood,
  BiLogoInstagramAlt,
  BiLogoLinkedinSquare,
  BiLogoTelegram,
  BiLogoYoutube,
  BiMailSend,
  BiMap,
  BiSolidPhoneCall,
} from "react-icons/bi";

export default function Footer() {
  return (
    <div>
      <div className="container flex flex-row items-start justify-between py-16">
        <div className="w-full space-y-20 lg:w-1/3">
          <div className="space-y-8">
            <div className="flex flex-row items-center gap-4">
              <BiDonateBlood size={32} />
              <span className="text-3xl font-semibold">VolunteerLink</span>
            </div>

            <p>
              Ut est velit velit. Magnam quisquam dolor labore. Ipsum eius
              aliquam dolor quiquia quaerat. Eius aliquam modi est. Etincidunt
              tempora numquam quiquia. Magnam sed quiquia modi ut dolor.
            </p>
          </div>

          <div className="flex flex-row gap-16">
            <BiLogoYoutube size={32} />

            <BiLogoLinkedinSquare size={32} />

            <BiLogoInstagramAlt size={32} />

            <BiLogoTelegram size={32} />
          </div>
        </div>

        <div className="hidden space-y-16 lg:block">
          <h5 className="text-2xl">Useful Links</h5>

          <div className="grid grid-cols-2 gap-x-16 gap-y-8">
            <Link href="/about-us">About Us</Link>
            <Link href="/organization">Organizations</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/volunteers">Volunteers</Link>
            <Link href="/support">Support</Link>
          </div>
        </div>

        <div className="hidden space-y-16 lg:block">
          <h5 className="text-2xl">Contact Us</h5>

          <div className="grid grid-cols-1 gap-y-8">
            <div className="flex flex-row items-start gap-4">
              <BiMap size={24} />
              <span>Addis Ababa, Ethiopia</span>
            </div>
            <Link
              href="mailto:support@colunteerlink.com"
              className="flex flex-row items-start gap-4"
            >
              <BiMailSend size={24} />
              <span>support@volunteerlink.com</span>
            </Link>

            <div className="flex flex-row items-start gap-4">
              <BiSolidPhoneCall size={24} />
              <div className="flex flex-col gap-2">
                <span>+25196-016-1107</span>
                <span>+25196-016-1107</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t py-1">
        <div className="container flex flex-col justify-between md:flex-row">
          <span>@VolunteerLink. All rights reserved.</span>
          <div className="space-x-8">
            <Link href="/tos">Terms of Service</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
