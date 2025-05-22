import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { getProjects } from "../../data/getProjects"
import { Sidebar } from "./Sidebar"
import { PaginatedBacklog } from "./paginated-backlog/paginated-backlog"

export function HomePage() {
    const [projects, setProjects] = useState([])
    const { isPending, isError, error, data: responseData } = useQuery({
        queryKey: ["projects"]
        , queryFn: () => getProjects()
    })

    useEffect(() => {
        if (responseData) {
            setProjects(responseData.data);
            console.log(projects);
        }
    }, [responseData, projects])

    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }


    return (<>
        <Sidebar projects={projects} />
        <PaginatedBacklog />
    </>
    );
}