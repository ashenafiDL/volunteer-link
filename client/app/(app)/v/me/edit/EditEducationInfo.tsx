"use client";

import { AuthContext } from "@/app/lib/contexts/AppContext";
import { format } from "date-fns";
import { useContext } from "react";
import { BiPlus, BiSolidPencil, BiSolidTrashAlt } from "react-icons/bi";

export default function EditEducationInfo() {
  const { user } = useContext(AuthContext);

  return (
    <div className="space-y-1">
      <p>Education Information</p>

      <div className="card rounded-md">
        <div className="card-body">
          {user &&
            user?.education?.map((item: any) => (
              <div key={item.id} className="flex flex-row items-center gap-8">
                <div className="space-y-1 py-2">
                  <div>
                    <span className="block text-xl">{item.field}</span>
                    <div>
                      <span className="text-lg">{item.institute}</span>
                      <span className="px-3">
                        {`${format(item.startDate, "MMMM yyyy")}`}
                        {" - "}
                        {item.endDate
                          ? `${format(item.endDate, "MMMM yyyy")}`
                          : "present"}
                      </span>
                    </div>
                  </div>
                  <p className="line-clamp-1 font-light">{item.description}</p>
                </div>

                <div className="flex flex-row gap-2">
                  <BiSolidPencil size={20} />
                  <BiSolidTrashAlt size={20} />
                </div>
              </div>
            ))}

          <button className="btn btn-primary mt-4">
            <BiPlus size={24} />
            Add Education Info
          </button>
        </div>
      </div>
    </div>
  );
}
