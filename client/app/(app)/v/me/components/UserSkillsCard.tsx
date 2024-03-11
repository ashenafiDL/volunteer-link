import Chip from "@/components/global/Chip";
import clsx from "clsx";

export default function UserSkillsCard({ skills }: { skills: any }) {
  return (
    <div className="divide-y divide-bg-300/50">
      {skills.map(
        (
          skill: { name: string; description: string; category: any },
          index: number,
        ) => (
          <div
            className={clsx(
              "space-y-1 py-4",
              index == 0 && "pt-0",
              index == skills.length - 1 && "pb-0",
            )}
            key={skill.name}
          >
            <div>
              <span className="personal_info_value">{skill.name}</span>
              <Chip>{skill.category.name}</Chip>
            </div>
            <p className="font-light text-text-200">{skill.description}</p>
          </div>
        ),
      )}
    </div>
  );
}
