"use client";

import { useAuthContext } from "@/app/lib/contexts/AppContext";
import "@/app/styles.css";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import ProjectList from "./components/ProjectList";

export default function HomePage() {
  const { user } = useAuthContext();
  const [projects, setProjects] = useState<any>();
  const [range, setRange] = useState([0, 10]);
  const searchParams = useSearchParams();
  const router = useRouter();

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      router.replace(`/home?${params.toString()}`);
    },
    [router, searchParams],
  );

  const timePreferenceOptions = [
    {
      id: "time-preference-both",
      value: "BOTH",
      label: "Both",
    },
    {
      id: "time-preference-short",
      value: "SHORT_TERM",
      label: "Short Term",
    },
    {
      id: "time-preference-long",
      value: "LONG_TERM",
      label: "Long Term",
    },
  ];

  const projectStatusOptions = [
    {
      id: "project-status-all",
      value: "ALL",
      label: "All",
    },
    {
      id: "project-status-not-started",
      value: "NOT_STARTED",
      label: "Not Started",
    },
    {
      id: "project-status-in-progress",
      value: "IN_PROGRESS",
      label: "In Progress",
    },
    {
      id: "project-status-done",
      value: "DONE",
      label: "Done",
    },
  ];

  const locationOptions = [
    {
      id: "location-all",
      value: "ALL",
      label: "All",
    },
    {
      id: "location-my",
      value: "MY_LOCATION",
      label: "My Location",
    },
    {
      id: "location-remote",
      value: "REMOTE",
      label: "Remote",
    },
  ];

  const goBack = () => {
    if (range[0] > 0) {
      setRange([range[0] - 10, range[1] - 10]);
    }
  };

  const goForward = () => {
    if (range[1] - 10 < projects.length) {
      setRange([range[0] + 10, range[1] + 10]);
    }
  };

  const handleLocationFilterChange = (newValue: string) => {
    createQueryString("location", newValue);
  };

  const handleTimeFilterChange = (newValue: string) => {
    createQueryString("time", newValue);
  };

  const handleProjectStatusChange = (newValue: string) => {
    createQueryString("status", newValue);
  };

  const handleQueryChange = useDebouncedCallback((newValue: string) => {
    createQueryString("query", newValue);
  }, 300);

  useEffect(() => {
    const buildParams = () => {
      const params: any = {};

      // Status
      if (searchParams.has("status") && searchParams.get("status") !== "ALL") {
        params.status = searchParams.get("status");
      }

      // Location
      if (
        searchParams.has("location") &&
        searchParams.get("location") !== "ALL"
      ) {
        const location = searchParams.get("location");
        if (location === "MY_LOCATION") {
          params.location = user.locationId;
        }
        params.location = location;
      }

      // Time
      if (searchParams.has("time") && searchParams.get("time") !== "BOTH") {
        params.time = searchParams.get("time");
      }

      // Query
      if (searchParams.has("query")) {
        params.query = searchParams.get("query");
      }

      return params;
    };

    const fetchFilteredProjects = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/projects`,
          {
            params: buildParams(),
          },
        );

        if (res.status === 200) {
          setProjects(res.data);
        }
      } catch (error) {}
    };

    fetchFilteredProjects();
  }, [searchParams, user]);

  return (
    <div className="layout-container">
      {/* Filter options sidebar */}
      <div className="layout-left-child">
        <div className="card rounded-md">
          <div className="card-body space-y-3">
            <span className="text-lg">Filter Options</span>

            <div>
              <div>
                <span>Location</span>
                <div className="divider my-0"></div>
              </div>

              <div
                className="flex flex-col"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  handleLocationFilterChange(e.target.value);
                }}
              >
                {locationOptions.map((option, index) => (
                  <label
                    key={index}
                    className="label cursor-pointer items-center justify-start gap-2 px-3 py-0.5"
                  >
                    <input
                      type="radio"
                      name="location"
                      id={option.id}
                      value={option.value}
                      defaultChecked={
                        searchParams.get("location") === option.value
                      }
                    />
                    <span className="">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div>
                <span>Time Preference</span>
                <div className="divider my-0"></div>
              </div>

              <div
                className="flex flex-col"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  handleTimeFilterChange(e.target.value);
                }}
              >
                {timePreferenceOptions.map((option, index) => (
                  <label
                    key={index}
                    className="label cursor-pointer items-center justify-start gap-2 px-3 py-0.5"
                  >
                    <input
                      type="radio"
                      name="time-preference"
                      id={option.id}
                      value={option.value}
                      defaultChecked={searchParams.get("time") === option.value}
                    />
                    <span className="">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div>
                <span>Project Status</span>
                <div className="divider my-0"></div>
              </div>

              <div
                className="flex flex-col"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  handleProjectStatusChange(e.target.value);
                }}
              >
                {projectStatusOptions.map((option, index) => (
                  <label
                    key={index}
                    className="label cursor-pointer items-center justify-start gap-2 px-3 py-0.5"
                  >
                    <input
                      type="radio"
                      name="project-status"
                      id={option.id}
                      value={option.value}
                      defaultChecked={
                        searchParams.get("status") === option.value
                      }
                    />
                    <span className="">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main page - projects list */}
      <div className="layout-right-child text-center">
        <input
          type="text"
          placeholder="Search by project title, description or organization name"
          className="input input-bordered w-full"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            handleQueryChange(e.target.value);
          }}
        />

        <div className="divider"></div>

        <>
          {projects && projects.length > 0 ? (
            <>
              <div className="text-left">
                <ProjectList projects={projects.slice(range[0], range[1])} />
              </div>

              <div className="divider"></div>

              <div className="join flex items-center justify-between">
                <button
                  className="btn btn-outline btn-primary join-item"
                  onClick={goBack}
                >
                  Previous
                </button>

                <button
                  className="btn btn-outline btn-primary join-item"
                  onClick={goForward}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div className="my-10 italic">
              <span>
                No projects matching your criteria. Try changing your filters or
                search using different keyword.
              </span>
            </div>
          )}
        </>
      </div>
    </div>
  );
}
