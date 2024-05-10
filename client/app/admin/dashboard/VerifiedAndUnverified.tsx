"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import ChartCard from "../components/ChartCard";

export default function VerifiedAndUnverified() {
  const data = [
    {
      name: "Users",
      verified: 4000,
      unverified: 2400,
    },
    {
      name: "Org",
      verified: 3000,
      unverified: 1398,
    },
  ];
  return (
    <ChartCard title="Verified and Unverified">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart width={500} height={300} layout="vertical" data={data}>
          <Tooltip
            cursor={{ fill: "#4E4E55" }}
            contentStyle={{ backgroundColor: "#3b3c3f", borderRadius: 5 }}
          />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" stroke="#4E4E55" />
          <Bar dataKey="verified" fill="#8884d8" label={{ fill: "white" }} />
          <Bar dataKey="unverified" fill="#82ca9d" label={{ fill: "white" }} />
          <XAxis type="number" hide />
          <YAxis dataKey={"name"} type="category" />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
