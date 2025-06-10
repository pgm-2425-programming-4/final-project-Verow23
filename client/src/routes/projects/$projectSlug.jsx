import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { getTasksByProject } from '../../queries/getTasksByProject';
import { Board } from '../../components/app/board/Board';

export const Route = createFileRoute('/projects/$projectSlug')({
  loader: async ({ params }) => {
    const data = await getTasksByProject(params.projectSlug);
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
  console.log(data);
  // const [tasks, setTasks] = useState([]);
  // setTasks(data.data);                          --->> vragen of ik dit moet gebruiken

  return (
    <>
      {/* <h1>Active project {data.data[0].project.Title}</h1>
      <ul>
        {data.data.map(task => <li key={task.id} > {task.Title} </li>)}
      </ul>
      <button><Link to="/projects/$projectSlug/backlog" params={{ projectSlug: data.data[0].project.slug }} >Backlog</Link></button> */}
      <Board tasks={data.data} />
    </>
  )
}
