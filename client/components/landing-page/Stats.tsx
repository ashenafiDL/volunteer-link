import { fetchStats } from "@/app/lib/stats";

export default async function Stats() {
  const res = await fetchStats();

  if (!res) {
    return null;
  }

  const stats = [
    {
      key: "Users",
      value: res.users.total,
      description: "The total number of registered users on the platform.",
    },
    {
      key: "Organizations",
      value: res.organizations.total,
      description:
        "The total number of organizations that have registered and created profiles.",
    },
    {
      key: "Projects",
      value: res.projects.total,
      description:
        "The total number of active projects currently listed on the platform.",
    },
  ];

  return (
    <div className="container -mt-16 flex flex-col justify-center gap-16 md:flex-row">
      {stats.map((item) => (
        <div
          key={item.key}
          className="flex flex-shrink flex-col items-center gap-8 rounded-lg bg-bg-100 px-8 py-8 shadow-md duration-200 hover:scale-105 hover:shadow-2xl xl:max-w-[280px]"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-5xl font-semibold">{item.value}</span>
            <span className="text-text-200">{item.key}</span>
          </div>
          <p className="text-center text-sm font-light text-text-200">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}
