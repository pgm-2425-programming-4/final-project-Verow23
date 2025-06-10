import { API_TOKEN, API_URL } from "../constants/constants";

export async function getProjects() {
    const result = await fetch(
        `${API_URL}/projects`,
        {
            headers: {
                Authorization: `Bearer ${API_TOKEN}`,
            },
        }
    );
    if (!result.ok) {
        throw new Error(
            `Failed to fetch projects: ${result.status} ${result.statusText}`
        );
    }
    const data = await result.json();
    return data;
}