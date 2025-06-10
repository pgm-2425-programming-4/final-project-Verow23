import { Cards } from "./Cards";

export function Columns({ statuses, tasks }) {
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