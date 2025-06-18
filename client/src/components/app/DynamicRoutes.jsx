import { Link } from "@tanstack/react-router";

export function DynamicRoutes({ projects }) {
  return (
    <>
      <p className="menu-label">Projects</p>
      <ul className="menu-list">
        {projects.map((project) => {
          return (
            <Link
              to={`/projects/${project.slug}`}
              className="[&.is-active]:font-bold"
              key={project.id}
            >
              {project.Title}
            </Link>
          );
        })}
      </ul>
    </>
  );
}
