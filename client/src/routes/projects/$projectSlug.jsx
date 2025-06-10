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
      <Board tasks={data.data} />
    </>
  )
}
