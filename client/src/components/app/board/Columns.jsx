import { Cards } from "./Cards";

export function Columns({ statuses, tasks }) {
    console.log(statuses);

    return (<>
        {statuses.map(status => {
            if (status.Title !== "Backlog") {
                return (
                    <div key={status.id} className='column'>
                        <h3>{status.Title}</h3>
                        <Cards status={status} tasks={tasks} />
                    </div>
                )
            }
        })}
    </>
    )
}