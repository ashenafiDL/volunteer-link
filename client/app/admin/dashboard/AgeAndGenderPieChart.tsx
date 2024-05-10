"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import ChartCard from "../components/ChartCard";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function AgeAndGenderPieChart() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/stats/age-and-gender`,
      );

      if (res.status === 200) {
        setData(res.data);
      }
    };

    fetchData();
  }, []);

  return (
    <ChartCard title="Age and Gender">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart width={400} height={400}>
          <Pie
            data={data && data.gender}
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
            {data &&
              data.gender.map((entry: any, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
          </Pie>
          <Pie
            data={data && data.age}
            dataKey="value"
            innerRadius={"50%"}
            outerRadius={"80%"}
            cx="25%"
            cy="50%"
            fill="#82ca9d"
            paddingAngle={5}
            label
          >
            {data &&
              data.age.map((entry: any, index: number) => (
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
