import Card from "@/components/global/Card";
import UserAvatar from "@/components/global/UserAvatar";
import { format } from "date-fns";
import Link from "next/link";
import { BiSolidPencil } from "react-icons/bi";

export default function UserProfile({
  firstName,
  lastName,
  username,
  email,
  createdAt,
  ownProfile,
}: {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  createdAt: string;
  ownProfile: boolean;
}) {
  return (
    <Card classes="flex items-center gap-6 rounded-b-none bg-primary-100">
      <UserAvatar email={email} name={firstName} size="lg" />

      <div className="flex flex-grow flex-col">
        <div className="flex flex-row items-center gap-2 capitalize">
          <span className="text-2xl">{`${firstName} ${lastName}`}</span>
          {/* If there is a badge badge goes here */}
          {/* <BiBadge size={24} /> */}
        </div>
        <span className="text-lg">{`@${username}`}</span>
        <span className="font-light text-text-200">{`Joined on ${format(createdAt, "MMMM yyyy")}`}</span>
      </div>

      {/* Show the edit icon if the user is viewing his/her own profile */}
      {ownProfile && (
        <Link href="/v/me/edit">
          <BiSolidPencil size={28} />
        </Link>
      )}
    </Card>
  );
}
