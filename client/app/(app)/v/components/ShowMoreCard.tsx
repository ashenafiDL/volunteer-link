import Card from "@/components/global/Card";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";

export default function ShowMoreCard({ href }: { href: string }) {
  return (
    <Card classes="rounded-t-none border-t border-bg-300/80 px-4 py-2 text-sm font-light text-text-200 hover:bg-bg-200">
      <Link href={href} className="flex flex-row items-center justify-between">
        <span>Show more</span>
        <GoArrowRight size={20} />
      </Link>
    </Card>
  );
}
