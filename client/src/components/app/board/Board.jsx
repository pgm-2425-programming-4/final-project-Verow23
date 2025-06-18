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
    const [search, setSearch] = useState("")
    const [filterLabel, setFilterLabel] = useState("")

    useEffect(() => {
        getLabels().then(setLabels)
        setTaskList(tasks)
    }, [tasks, projectSlug])


    async function refreshTasks() {
        const updated = await getTasksByProject(projectSlug);
        setTaskList(updated.data)
        setShowModal(false)
        setSelectedTask(null)
    }

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

    const filteredTasks = taskList.filter(task => {
        const matchesSearch = task.Title.toLowerCase().includes(search.toLowerCase());
        const matchesLabel = filterLabel ? task.labels.some(label => label.id === parseInt(filterLabel)) : true;
        return matchesLabel && matchesSearch
    })

    try {
        return (

            <main className='board'>
                <header className="navbar-end">
                    <div className="is-flex mx-1">
                        <input className="input" type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search tasks" />
                        <div className="select mx-1">
                            <select value={filterLabel} onChange={e => setFilterLabel(e.target.value)}>
                                <option value="">All Labels</option>
                                {labels.data.map(label => (
                                    <option key={label.id} value={label.id}>{label.Title}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button onClick={() => { setSelectedTask(null); setShowModal(true); }} className="button is-primary mx-1">Add new task</button>
                    <button className="button is-link mx-1"><Link to="/projects/$projectSlug/backlog" params={{ projectSlug: taskList[0].project.slug }} className="link">Backlog</Link></button>
                </header>
                {taskList?.length > 0 ? (
                    <h1 className="title has-text-left">Active project {taskList[0].project.Title}</h1>
                ) : (
                    <h1 className="title has-text-left">Loading project...</h1>
                )}

                <div className='columns message' >
                    {statuses.map(status => {
                        if (status.Title !== "Backlog") {
                            return (
                                <Column key={status.id} status={status} tasks={filteredTasks.filter(task => task.state?.id === status.id)} onTaskClick={(task) => { setSelectedTask(task); setShowModal(true) }} />)
                        }
                    })}
                </div>
                {
                    showModal && <TaskModal className={(showModal) ? "is-active" : ""} project={taskList[0].project} task={selectedTask} states={statuses} labels={labels} onClose={() => setShowModal(false)} onUpdate={refreshTasks} onDelete={refreshTasks} />
                }
            </main>

        )
    } catch (e) {
        console.log("Rendering error in Board:", e);
        return <div>Board failed to render</div>
    }
}