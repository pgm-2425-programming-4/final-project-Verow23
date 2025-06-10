import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { getStatuses } from "../../../queries/getStatuses";
import { Columns } from "./Columns";
import { Link } from "@tanstack/react-router";

export function Board({ tasks }) {
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
            <button className="backlog-button"><Link to="/projects/$projectSlug/backlog" params={{ projectSlug: tasks[0].project.slug }} >Backlog</Link></button>
            <div className='columns' >
                <Columns statuses={statuses} tasks={tasks} />
            </div>
        </main>

    )
}