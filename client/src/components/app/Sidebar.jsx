export function Sidebar({ projects }) {
    console.log(projects)
    return (
        <>
            <h2>Projects</h2>
            <ul>
                {projects.map(project => { return <li key={project.id} >{project.Title}</li> })}
            </ul>
        </>
    )
}


