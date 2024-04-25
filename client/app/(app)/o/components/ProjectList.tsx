import UserAvatar from "@/components/global/UserAvatar";
import clsx from "clsx";
import Link from "next/link";
import { BiSolidPencil } from "react-icons/bi";

export default function ProjectList({
  projects,
  isDone,
  own,
}: {
  projects: any[];
  isDone: boolean;
  own: boolean;
}) {
  const sample_users = [
    {
      name: "user1",
      email: "user1",
    },
    {
      name: "user2",
      email: "user2",
    },
    {
      name: "user3",
      email: "user3",
    },
    {
      name: "user4",
      email: "user4",
    },
    {
      name: "user5",
      email: "user5",
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-4">
      {projects.map((project, index) => (
        <Link
          key={index}
          href={`/projects/${project.id}`}
          className="flex hover:bg-opacity-50"
        >
          <div
            className={clsx(
              "card flex-grow rounded-md hover:bg-opacity-50",
              isDone && "card-compact rounded",
            )}
          >
            <div className="card-body space-y-6">
              <div className="space-y-2">
                <div className="flex flex-row items-center justify-between">
                  <span className="line-clamp-1 text-2xl font-bold">
                    {project.title}
                  </span>

                  <Link href={`/projects/${project.id}/edit`}>
                    <span>
                      <BiSolidPencil size={20} />
                    </span>
                  </Link>
                </div>
                <div className="flex flex-row items-center">
                  <div className="-space-x-1">
                    {sample_users.slice(0, 3).map((user, index) => (
                      <UserAvatar
                        key={index}
                        email={user.email}
                        name={user.name}
                        size="xxs"
                        classes="rounded-full ring ring-primary ring-offset-1 ring-offset-base-100"
                      />
                    ))}
                  </div>
                  {sample_users.length > 3 && (
                    <span className="ml-3">{`+${sample_users.length - 3} volunteers`}</span>
                  )}
                </div>
              </div>
              <p className="line-clamp-2 text-pretty leading-tight">
                {project.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
