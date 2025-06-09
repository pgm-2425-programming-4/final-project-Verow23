import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { getProjectsBySlug } from '../../queries/getProjectsBySlug'

export const Route = createFileRoute('/projects/$projectSlug')({
  loader: async ({ params }) => {
    const data = await getProjectsBySlug(params.projectSlug);
    if (!data) {
      throw notFound();
    }
    return data;
  },
  component: RouteComponent,
  notFoundComponent: () => <div>Project not found</div>,
})

function RouteComponent() {
  const data = Route.useLoaderData()
  console.log(data.data);

  return (
    <>
      <h1>Active project {data.data[0].Title}</h1>
      <ul>
        {data.data[0].tasks.map(task => <li key={task.id} > {task.Title} </li>)}
      </ul>
      <button><Link to="/projects/$projectSlug/backlog" params={{ projectSlug: data.data[0].slug }} >Backlog</Link></button>

    </>
  )
}
