export function Backlog({ backlog }) {
    return (
        <ul>
            {backlog.map(task => {
                return <li key={task.id}>{task.Title} </li>
            })}
        </ul>
    )
}