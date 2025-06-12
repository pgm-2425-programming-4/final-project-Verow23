export function Card({ task, onClick }) {

    return (<>
        <div key={task.id} className='card is-clickable' onClick={onClick}>
            <p>{task.Title}</p>
            <div className='labels'>
                {task.labels?.map((label, i) => (<span key={i} className='tag'>{label.Title}</span>))}
            </div>
        </div>
    </>)
}


