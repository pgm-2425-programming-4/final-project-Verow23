import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { getProjects } from "../../data/getProjects"

export function HomePage() {
    const { projects, setProjects } = useState([])
    const { isPending, isError, error, data } = useQuery({
        queryKey: ["projects"]
        , queryFn: () => getProjects()
    })

    useEffect(() => {
        if (data) {
            setProjects(data)
        }
    })

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