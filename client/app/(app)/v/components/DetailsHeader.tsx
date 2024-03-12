import Link from "next/link";
import { GoArrowLeft } from "react-icons/go";

export default function DetailsHeader({
  href,
  text,
}: {
  href: string;
  text: string;
}) {
  return (
    <div className="mb-3 flex items-center gap-4">
      <Link href={href}>
        <GoArrowLeft size={28} />
      </Link>
      <span className="text-xl">{text}</span>
    </div>
  );
}
