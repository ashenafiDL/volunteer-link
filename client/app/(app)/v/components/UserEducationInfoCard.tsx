import clsx from "clsx";
import { format } from "date-fns";
import "../components/styles.css";

export default function UserEducationInfoCard({
  educationInfo,
}: {
  educationInfo: any;
}) {
  return (
    <div className="divide-y divide-bg-300/50">
      {educationInfo.map(
        (
          item: {
            id: string;
            field: string;
            institute: string;
            startDate: string;
            endDate: string;
            description: string;
          },
          index: number,
        ) => (
          <div
            className={clsx(
              "space-y-1 py-4",
              index == 0 && "pt-0",
              index == educationInfo.length - 1 && "pb-0",
            )}
            key={item.id}
          >
            <div>
              <span className="block text-xl">{item.field}</span>
              <div>
                <span className="text-lg">{item.institute}</span>
                <span className="px-3 text-text-200">
                  {`${format(item.startDate, "MMMM yyyy")}`}
                  {" - "}
                  {item.endDate
                    ? `${format(item.endDate, "MMMM yyyy")}`
                    : "present"}
                </span>
              </div>
            </div>
            <p className="font-light text-text-200">{item.description}</p>
          </div>
        ),
      )}
    </div>
  );
}
