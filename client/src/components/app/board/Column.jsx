import { Card } from "./Card";

export function Column({ status, tasks, onTaskClick }) {

    return (
        <div key={status.id} className='column is-on-quarter'>
            <div className={status.Title === "To do" ? "message is-info" : status.Title === "In progress" ? "message is-danger" : status.Title === "Ready for Review" ? "message is-warning" : status.Title === "Done" ? "message is-success" : "message"}>
                <div className="message-header">
                    <p>{status.Title}</p>
                </div>
                <div className="message-body">
                    {tasks.map(task => (<Card key={task.id} task={task} onClick={() => onTaskClick(task)} />))}
                </div>
            </div>
        </div>
    )
}