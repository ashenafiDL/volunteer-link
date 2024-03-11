import axios from "axios";

export async function fetchStats() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/stats/summary`,
  );

  if (res.status !== 200) {
    throw new Error("Failed to fetch data");
  }

  const data = res.data;

  return data;
}
