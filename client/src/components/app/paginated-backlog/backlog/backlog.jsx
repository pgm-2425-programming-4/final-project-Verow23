export function Backlog({ backlog }) {
    return (
        <table>
            <caption>Backlog</caption>
            <thead>
                <tr>
                    <th scope="col">Task</th>
                </tr>
            </thead>
            <tbody>
                {backlog.length === 0 ? (
                    <tr>
                        <td colSpan="1">No tasks in backlog.</td>
                    </tr>
                ) : (
                    backlog.map(task => (
                        <tr key={task.id}>
                            <td>{task.Title}</td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
}