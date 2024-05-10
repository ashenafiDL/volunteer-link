"use client";

import { formatDate } from "date-fns";
import {
  Brush,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import ChartCard from "../components/ChartCard";

const tempData = [
  {
    totalUsers: 2,
    totalProjects: 1,
    totalOrg: 4,
    date: "2022-01-01",
  },
  {
    totalUsers: 35,
    totalProjects: 10,
    totalOrg: 7,
    date: "2022-03-15",
  },
  {
    totalUsers: 12,
    totalProjects: 5,
    totalOrg: 3,
    date: "2022-04-22",
  },
  {
    totalUsers: 45,
    totalProjects: 8,
    totalOrg: 6,
    date: "2022-06-05",
  },
  {
    totalUsers: 18,
    totalProjects: 3,
    totalOrg: 2,
    date: "2022-07-11",
  },
  {
    totalUsers: 70,
    totalProjects: 20,
    totalOrg: 9,
    date: "2022-09-28",
  },
  {
    totalUsers: 6,
    totalProjects: 2,
    totalOrg: 1,
    date: "2022-11-19",
  },
  {
    totalUsers: 28,
    totalProjects: 4,
    totalOrg: 5,
    date: "2022-12-30",
  },
  {
    totalUsers: 50,
    totalProjects: 12,
    totalOrg: 8,
    date: "2022-02-08",
  },
  {
    totalUsers: 16,
    totalProjects: 7,
    totalOrg: 3,
    date: "2022-03-25",
  },
  {
    totalUsers: 33,
    totalProjects: 6,
    totalOrg: 5,
    date: "2022-05-14",
  },
  {
    totalUsers: 25,
    totalProjects: 9,
    totalOrg: 4,
    date: "2022-07-02",
  },
  {
    totalUsers: 8,
    totalProjects: 2,
    totalOrg: 1,
    date: "2022-08-20",
  },
  {
    totalUsers: 40,
    totalProjects: 11,
    totalOrg: 7,
    date: "2022-10-09",
  },
  {
    totalUsers: 22,
    totalProjects: 5,
    totalOrg: 2,
    date: "2022-12-05",
  },
  {
    totalUsers: 55,
    totalProjects: 15,
    totalOrg: 6,
    date: "2022-01-16",
  },
  {
    totalUsers: 30,
    totalProjects: 8,
    totalOrg: 4,
    date: "2022-03-02",
  },
  {
    totalUsers: 14,
    totalProjects: 3,
    totalOrg: 2,
    date: "2022-04-10",
  },
  {
    totalUsers: 65,
    totalProjects: 18,
    totalOrg: 9,
    date: "2022-06-23",
  },
  {
    totalUsers: 5,
    totalProjects: 1,
    totalOrg: 1,
    date: "2022-08-04",
  },
  {
    totalUsers: 38,
    totalProjects: 10,
    totalOrg: 6,
    date: "2022-09-12",
  },
  {
    totalUsers: 20,
    totalProjects: 6,
    totalOrg: 3,
    date: "2022-11-01",
  },
  {
    totalUsers: 42,
    totalProjects: 13,
    totalOrg: 8,
    date: "2022-12-20",
  },
  {
    totalUsers: 10,
    totalProjects: 4,
    totalOrg: 2,
    date: "2022-01-25",
  },
  {
    totalUsers: 48,
    totalProjects: 14,
    totalOrg: 7,
    date: "2022-03-13",
  },
  {
    totalUsers: 24,
    totalProjects: 9,
    totalOrg: 5,
    date: "2022-04-30",
  },
  {
    totalUsers: 60,
    totalProjects: 16,
    totalOrg: 8,
    date: "2022-06-17",
  },
  {
    totalUsers: 4,
    totalProjects: 1,
    totalOrg: 1,
    date: "2022-08-06",
  },
  {
    totalUsers: 36,
    totalProjects: 11,
    totalOrg: 6,
    date: "2022-09-24",
  },
  {
    totalUsers: 15,
    totalProjects: 5,
    totalOrg: 3,
    date: "2022-11-11",
  },
  {
    totalUsers: 58,
    totalProjects: 17,
    totalOrg: 9,
    date: "2022-12-28",
  },
  {
    totalUsers: 3,
    totalProjects: 2,
    totalOrg: 1,
    date: "2022-01-05",
  },
  {
    totalUsers: 45,
    totalProjects: 13,
    totalOrg: 7,
    date: "2022-03-23",
  },
  {
    totalUsers: 26,
    totalProjects: 8,
    totalOrg: 4,
    date: "2022-05-11",
  },
  {
    totalUsers: 55,
    totalProjects: 19,
    totalOrg: 10,
    date: "2022-06-29",
  },
  {
    totalUsers: 7,
    totalProjects: 3,
    totalOrg: 1,
    date: "2022-08-17",
  },
  {
    totalUsers: 39,
    totalProjects: 12,
    totalOrg: 6,
    date: "2022-10-05",
  },
  {
    totalUsers: 19,
    totalProjects: 7,
    totalOrg: 4,
    date: "2022-11-23",
  },
  {
    totalUsers: 50,
    totalProjects: 16,
    totalOrg: 8,
    date: "2022-01-14",
  },
  {
    totalUsers: 9,
    totalProjects: 4,
    totalOrg: 2,
    date: "2022-03-04",
  },
  {
    totalUsers: 32,
    totalProjects: 10,
    totalOrg: 5,
    date: "2022-04-22",
  },
  {
    totalUsers: 62,
    totalProjects: 20,
    totalOrg: 9,
    date: "2022-06-09",
  },
  {
    totalUsers: 2,
    totalProjects: 1,
    totalOrg: 1,
    date: "2022-08-01",
  },
  {
    totalUsers: 44,
    totalProjects: 14,
    totalOrg: 7,
    date: "2022-09-19",
  },
  {
    totalUsers: 21,
    totalProjects: 6,
    totalOrg: 3,
    date: "2022-11-07",
  },
  {
    totalUsers: 53,
    totalProjects: 18,
    totalOrg: 10,
    date: "2022-12-26",
  },
  {
    totalUsers: 11,
    totalProjects: 5,
    totalOrg: 2,
    date: "2022-01-30",
  },
  {
    totalUsers: 47,
    totalProjects: 15,
    totalOrg: 8,
    date: "2022-03-18",
  },
];

export default function NewByDateChart() {
  return (
    <ChartCard title="New by date">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={tempData}>
          <Legend verticalAlign="top" height={36} />
          <CartesianGrid stroke="#4E4E55" strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => formatDate(value, "dd MMM")}
          />
          {/* <YAxis /> */}
          <Tooltip
            contentStyle={{ backgroundColor: "#3b3c3f", borderRadius: 5 }}
          />
          <Line
            dataKey="totalOrg"
            type="monotone"
            dot={false}
            stroke="#4caf50"
          />
          <Line
            dataKey="totalUsers"
            type="monotone"
            dot={false}
            stroke="#ffc107"
          />
          <Line
            dataKey="totalProjects"
            type="monotone"
            dot={false}
            stroke="#3498db"
          />
          <Brush fill="#3b3c3f" />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
