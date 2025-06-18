export function Backlog({ backlog, onTaskClick }) {
  return (
    <div className="table-container">
      <table className="table is-striped container">
        {backlog.length === 0 ? (
          <caption className="title">Backlog</caption>
        ) : (
          <caption className="title">
            Backlog for {backlog[0].project.Title}
          </caption>
        )}
        <thead>
          <tr className="is-light">
            <th align="center">Task</th>
            <th align="center">Labels</th>
            <th align="center">Created at</th>
          </tr>
        </thead>
        <tbody>
          {backlog.length === 0 ? (
            <tr>
              <td>No tasks in backlog.</td>
            </tr>
          ) : (
            backlog.map((task) => (
              <tr
                key={task.id}
                onClick={() => onTaskClick(task)}
                className="is-clickable"
              >
                <td>{task.Title}</td>
                <td className="has-text-centered">
                  {task.labels.map((label) => (
                    <p
                      key={label.id}
                      className={
                        label.Title === "Front-end"
                          ? "tag is-primary is-light mx-1"
                          : label.Title === "Back-end"
                            ? "tag is-link is-light mx-1"
                            : label.Title === "Urgent"
                              ? "tag is-danger is-light mx-1"
                              : "tag is-light mx-1"
                      }
                    >
                      <span className="icon">
                        <i className="fa-solid fa-tag"></i>
                      </span>
                      {label.Title}
                    </p>
                  ))}
                </td>
                <td>{new Date(task.createdAt).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
