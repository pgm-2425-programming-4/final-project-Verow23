export function Card({ task, onClick }) {

    return (<>
        <div key={task.id} className='card is-clickable' onClick={onClick}>
            <p>{task.Title}</p>
            <div className='labels'>
                {task.labels?.map((label, i) => (<>

                    <span key={i} className={label.Title === "Front-end" ? "tag is-primary is-light m-1" : label.Title === "Back-end" ? "tag is-link is-light m-1" : label.Title === "Urgent" ? "tag is-danger is-light m-1" : "tag is-light m-1"}><span className="icon">
                        <i class="fa-solid fa-tag"></i>
                    </span>{label.Title}</span></>))}
            </div>
        </div>
    </>)
}


