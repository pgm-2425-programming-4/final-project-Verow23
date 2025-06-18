import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getProjects } from "../../queries/getProjects";
import { DynamicRoutes } from "./DynamicRoutes";
import { Link } from "@tanstack/react-router";

export function Sidebar() {
    const [projects, setProjects] = useState([])
    const [showNav, setShowNav] = useState(false)

    const { isPending, isError, error, data: responseData } = useQuery({
        queryKey: ["projects"]
        , queryFn: () => getProjects()
    })

    useEffect(() => {
        if (responseData?.data) {
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
        <nav className="menu" role="navigation" aria-label="main navigation">
            <a role="button" className="navbar-burger" data-target="navMenu" aria-label="menu" aria-expanded="false" onClick={() => setShowNav(prev => !prev)}>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
            <div className={showNav ? "navbar-menu is-active" : "navbar-menu"} id="navMenu">
                <ul className="menu-list">
                    <li>
                        <Link to="/" className="[&.is-active]:font-bold">
                            Home
                        </Link>{' '}
                    </li>
                </ul>
                < DynamicRoutes projects={projects} />
                <p className="menu-label">Info</p>
                <ul className="menu-list">
                    <li>
                        <Link to="/about" className="[&.is-active]:font-bold">
                            About
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    </aside>
    )
}