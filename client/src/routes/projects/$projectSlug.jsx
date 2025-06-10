import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { getTasksByProject } from '../../queries/getTasksByProject';
import { useEffect, useState } from "react";
import { getStatuses } from '../../queries/getStatuses';
import { useQuery } from '@tanstack/react-query';

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

function Board({ tasks }) {
  const [statuses, setStatuses] = useState([])

  const { isPending, isError, error, data } = useQuery({
    queryKey: ["statuses"],
    queryFn: () => getStatuses(),
  });

  useEffect(() => {
    if (data) {

      setStatuses(data.data);
    }
  }, [data, setStatuses]);

  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }



  return (

    <main className='board'>
      <h1>Active project {tasks[0].project.Title}</h1>
      <Columns className='columns' statuses={statuses} tasks={tasks} />
    </main>

  )
}

function Columns({ statuses, tasks }) {
  return (<>
    {statuses.map(status => (
      <div key={status.id} className='column'>
        <h3>{status.Title}</h3>
        <Cards status={status} tasks={tasks} />
      </div>
    ))}
  </>
  )
}

function Cards({ status, tasks }) {
  console.log(status);
  console.log(tasks);



  return (<>
    {tasks.filter(task => task.state.Title === status.Title).map(task => (
      <div key={task.id} className='card'>
        <p>{task.Title}</p>
        <div className='tags'>
          {task.labels.map((tag, i) => (<span key={i} className='tag'>{tag.Title}</span>))}
        </div>
      </div>))}
  </>)
}



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
