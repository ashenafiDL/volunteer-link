"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

export default function ProjectBarChart() {
  const [selected, setSelected] = useState<"duration" | "location">("duration");

  const data = [
    {
      name: "Not Started",
      shortTerm: 4000,
      longTerm: 3456,
      inPerson: 9876,
      remote: 2400,
      amt: 2400,
    },
    {
      name: "Done",
      shortTerm: 3000,
      longTerm: 1398,
      inPerson: 9878,
      remote: 23,
      amt: 2210,
    },
    {
      name: "In Progress",
      shortTerm: 2000,
      longTerm: 9800,
      inPerson: 8778,
      remote: 557,
      amt: 2290,
    },
  ];

  return (
    <div className="card rounded-md">
      <div className="card-body">
        <div className="mb-2 flex flex-row items-center justify-between">
          <div className="card-title">Projects</div>

          <select
            className="select"
            onChange={(e) =>
              setSelected(e.target.value as "duration" | "location")
            }
          >
            <option value="duration">By project duration</option>
            <option value="location">By project location</option>
          </select>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart width={500} height={300} data={data}>
            <Tooltip
              cursor={{ fill: "#4E4E55" }}
              contentStyle={{ backgroundColor: "#3b3c3f", borderRadius: 5 }}
            />
            <CartesianGrid strokeDasharray="3 3" stroke="#4E4E55" />
            <XAxis dataKey="name" />
            <Legend />
            <Bar
              dataKey={selected === "duration" ? "longTerm" : "inPerson"}
              fill="#8884d8"
              label={{ fill: "white" }}
            />
            <Bar
              dataKey={selected === "duration" ? "shortTerm" : "remote"}
              fill="#82ca9d"
              label={{ fill: "white" }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
