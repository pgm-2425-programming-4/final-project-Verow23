export function Card({ task, onClick }) {

    return (<>
        <div key={task.id} className='card' onClick={onClick}>
            <p>{task.Title}</p>
            <div className='labels'>
                {task.labels?.map((label, i) => (<span key={i} className='tag'>{label.Title}</span>))}
            </div>
        </div>
    </>)
}


