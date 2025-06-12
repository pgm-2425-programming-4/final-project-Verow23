import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getProjects } from "../../queries/getProjects";
import { DynamicRoutes } from "./DynamicRoutes";
import { Link } from "@tanstack/react-router";

export function Sidebar() {
    const [projects, setProjects] = useState([])
    const { isPending, isError, error, data: responseData } = useQuery({
        queryKey: ["projects"]
        , queryFn: () => getProjects()
    })

    useEffect(() => {
        if (responseData) {
            setProjects(responseData.data);
        }
    }, [responseData])

    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (<aside className="p-2 flex gap-2">
        <nav>
            <Link to="/" className="[&.active]:font-bold">
                Home
            </Link>{' '}
            < DynamicRoutes projects={projects} />
            <h2>Info</h2>
            <Link to="/about" className="[&.active]:font-bold">
                About
            </Link>
        </nav>
    </aside>
    )
}