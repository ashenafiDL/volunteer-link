import Link from "next/link";
import { GoArrowRight } from "react-icons/go";

export default function ShowMoreCard({ href }: { href: string }) {
  return (
    <div className="card rounded-t-none border-t px-4 py-2 text-sm font-light">
      <Link href={href} className="flex flex-row items-center justify-between">
        <span>Show more</span>
        <GoArrowRight size={20} />
      </Link>
    </div>
  );
}
