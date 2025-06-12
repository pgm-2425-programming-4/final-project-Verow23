export function Card({ task, onClick }) {

    return (<>
        <div key={task.id} className='card is-clickable' onClick={onClick}>
            <p>{task.Title}</p>
            <div className='labels'>
                {task.labels?.map((label, i) => (<span key={i} className={label.Title === "Front-end" ? "tag is-primary is-light mx-1" : label.Title === "Back-end" ? "tag is-link is-light mx-1" : label.Title === "Urgent" ? "tag is-danger is-light mx-1" : "tag is-light mx-1"}>{label.Title}</span>))}
            </div>
        </div>
    </>)
}


