"use client";

import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import ChartCard from "../components/ChartCard";

const data01 = [
  { name: "Male", value: 400 },
  { name: "Female", value: 300 },
];

const data02 = [
  { name: "18-34", value: 300 },
  { name: "35-54", value: 6 },
  { name: "55-74", value: 45 },
  { name: "75-100", value: 400 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function AgeAndGenderPieChart() {
  return (
    <ChartCard title="Age and Gender">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart width={400} height={400}>
          <Pie
            data={data01}
            dataKey="value"
            paddingAngle={5}
            innerRadius={"50%"}
            outerRadius={"80%"}
            cx="75%"
            cy="50%"
            fill="#8884d8"
            legendType="circle"
            label
          >
            {data01.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Pie
            data={data02}
            dataKey="value"
            innerRadius={"50%"}
            outerRadius={"80%"}
            cx="25%"
            cy="50%"
            fill="#82ca9d"
            paddingAngle={5}
            label
          >
            {data02.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend layout="vertical" align="right" verticalAlign="middle" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#3b3c3f",
              borderRadius: 5,
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
