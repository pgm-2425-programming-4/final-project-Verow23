import { Card } from "./Card";

export function Column({ status, tasks, onTaskClick }) {

    return (
        <div key={status.id} className='column'>
            <h3>{status.Title}</h3>
            {tasks.map(task => (<Card key={task.id} task={task} onClick={() => onTaskClick(task)} />))}
        </div>
    )
}