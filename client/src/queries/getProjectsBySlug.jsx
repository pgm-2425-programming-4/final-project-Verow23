import { API_TOKEN, API_URL } from "../constants/constants";

export async function getProjectsBySlug(projectsSlug) {
  const result = await fetch(
    `${API_URL}/projects?populate=*&filters[slug]=${projectsSlug}`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    },
  );
  if (!result.ok) {
    throw new Error(
      `Failed to fetch project ${projectsSlug}: ${result.status} ${result.statusText}`,
    );
  }
  const data = await result.json();
  return data;
}
