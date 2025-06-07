import { Link } from "@tanstack/react-router"

export function Sidebar({ projects }) {
    console.log(projects)
    return (
        <>
            <h2>Projects</h2>

            {projects.map(project => {
                return <Link to={`/projects/${project.id}`} className="[&.active]:font-bold" key={project.id}>
                    {project.Title}
                </Link>
            })}

        </>
    )
}