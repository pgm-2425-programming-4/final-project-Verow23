export function Cards({ status, tasks }) {

    return (<>
        {tasks.filter(task => task.state.Title === status.Title).map(task => (
            <div key={task.id} className='card'>
                <p>{task.Title}</p>
                <div className='tags'>
                    {task.labels.map((tag, i) => (<span key={i} className='tag'>{tag.Title}</span>))}
                </div>
            </div>))}
    </>)
}
