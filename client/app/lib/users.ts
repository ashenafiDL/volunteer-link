import axiosInstance from "../axiosInstance";

export async function fetchUser(username: string) {
  const res = await axiosInstance.get(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${username}`,
  );

  if (res.status !== 200) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.data;

  return data;
}
