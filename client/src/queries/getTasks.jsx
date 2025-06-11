import { API_TOKEN, API_URL } from "../constants/constants";

export async function getTasks() {
  const result = await fetch(
    `${API_URL}/tasks?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    },
  );
  if (!result.ok) {
    throw new Error(
      `Failed to fetch tasks: ${result.status} ${result.statusText}`
    );
  }
  const data = await result.json();
  return data;
}
