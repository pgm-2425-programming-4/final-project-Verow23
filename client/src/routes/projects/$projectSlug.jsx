import { createFileRoute, notFound } from '@tanstack/react-router'
import { getTasksByProject } from '../../queries/getTasksByProject';
import { Board } from '../../components/app/board/Board';

export const Route = createFileRoute('/projects/$projectSlug')({
  loader: async ({ params }) => {
    const slug = params.projectSlug
    const data = await getTasksByProject(slug);
    if (!data) {
      throw notFound();
    }
    return [data, slug];
  },
  component: RouteComponent,
  notFoundComponent: () => <div>Project not found</div>,
})

function RouteComponent() {
  const [data, slug] = Route.useLoaderData()
  console.log(data);
  // const [tasks, setTasks] = useState([]);
  // setTasks(data.data);                          --->> vragen of ik dit moet gebruiken

  return (
    <>
      <Board tasks={data.data} projectSlug={slug} />
    </>
  )
}
