import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getStatuses } from "../../../queries/getStatuses";
import { Column } from "./Column";
import { Link } from "@tanstack/react-router";
import { getLabels } from "../../../queries/getLabels";
import { TaskModal } from "./TaskModal";
import { getTasksByProject } from "../../../queries/getTasksByProject";

export function Board({ tasks, projectSlug }) {
    const [selectedTask, setSelectedTask] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [taskList, setTaskList] = useState(tasks)
    const [statuses, setStatuses] = useState([])
    const [labels, setLabels] = useState()

    async function refreshTasks() {
        const updated = await getTasksByProject(projectSlug);
        setTaskList(updated.data)
        setShowModal(false)
        setSelectedTask(null)
    }

    useEffect(() => {
        getLabels().then(setLabels)
    }, [])

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
            <h1>Active project {taskList[0].project.Title}</h1>
            <button onClick={() => { setSelectedTask(null); setShowModal(true); }} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Add new task</button>
            <button className="backlog-button"><Link to="/projects/$projectSlug/backlog" params={{ projectSlug: taskList[0].project.slug }} >Backlog</Link></button>
            <div className='columns' >
                {statuses.map(status => {
                    if (status.Title !== "Backlog") {
                        return (
                            <Column key={status.id} status={status} tasks={taskList.filter(task => task.state?.id === status.id)} onTaskClick={(task) => { setSelectedTask(task); setShowModal(true) }} />)
                    }
                })}
            </div>
            {
                showModal && <TaskModal project={taskList[0].project} task={selectedTask} states={statuses} labels={labels} onClose={() => setShowModal(false)} onUpdate={refreshTasks} onDelete={refreshTasks} />
            }
        </main>

    )
}