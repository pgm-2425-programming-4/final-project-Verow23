import { Link } from "@tanstack/react-router"

export function DynamicRoutes({ projects }) {
    console.log(projects)
    return (
        <>
            <h2>Projects</h2>

            {projects.map(project => {
                return <Link to={`/projects/${project.slug}`} className="[&.active]:font-bold" key={project.id}>
                    {project.Title}
                </Link>
            })}

        </>
    )
}