import axios from "axios";

export async function fetchLocations() {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/locations`);

    if (res.status === 200) {
      const data = res.data;

      const sortedLocations = data.sort(
        (a: { name: string }, b: { name: string }) => {
          return a.name.localeCompare(b.name);
        },
      );

      return sortedLocations;
    }
  } catch (error) {
    return null;
  }
}
