import { useState } from "react";
import { API_TOKEN, API_URL } from "../../../constants/constants";

export function TaskModal({ task, onUpdate, onDelete, states, onClose, labels, project, className }) {
    const [form, setForm] = useState({
        title: task?.Title || "",
        description: task?.Description || "",
        state: task?.state?.id || "",
        labels: task?.labels?.map(label => label.id) || [],
        project
    })

    function handleChange(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value })
    };

    function toggleLabel(labelId) {
        setForm(prev => ({
            ...prev,
            labels: prev.labels.includes(labelId) ? prev.labels.filter(id => id !== labelId) : [...prev.labels, labelId]
        }))
    }

    async function handleSubmit() {
        const data = {
            data: {
                Title: form.title,
                Description: form.description,
                state: form.state,
                labels: form.labels,
                project: project.id,
            }
        };
        if (task?.id) {
            await fetch(
                `${API_URL}/tasks/${task.documentId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${API_TOKEN}`,
                    },
                    method: 'PUT',
                    body: JSON.stringify(data),
                },
            );
            onUpdate();
            console.log(data);

        } else {
            await fetch(
                `${API_URL}/tasks`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${API_TOKEN}`,
                    },
                    method: 'POST',
                    body: JSON.stringify(data),
                },
            );
            onUpdate();
        }
    }

    async function handleDelete() {
        if (task?.id) {
            await fetch(
                `${API_URL}/tasks/${task.documentId}`,
                {
                    headers: {
                        Authorization: `Bearer ${API_TOKEN}`,
                    },
                    method: 'DELETE'
                },
            );
            onDelete();
        }
    }

    return (
        <div className={`modal ${className}`} >
            <div className="modal-background">
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">{project.Title}</p>
                    </header>
                    <section className="modal-card-body">
                        <h2 className="subtitle">{task ? "Edit task" : "New task"}</h2>
                        <div className="form">
                            <label className="label">Title</label>
                            <input className="input" name="title" value={form.title} onChange={handleChange} placeholder="Title" />
                            <label className="label">Description</label>
                            <textarea className="textarea" name="description" value={form.description} onChange={handleChange} placeholder="Description"></textarea>
                            <label className="label">Status</label>
                            <div className="control">
                                <div className="select">
                                    <select required name="state" value={form.state} onChange={handleChange}>
                                        <option disabled value="">Select your status</option>
                                        {states.map(state => (<option key={state.id} value={state.id}>{state.Title}</option>))}
                                    </select></div></div>
                            <div>
                                <label className="label">Labels</label>
                                <div >
                                    {labels.data.map(label => (<label className="checkbox" key={label.id}>
                                        <input className="mx-1"
                                            type="checkbox"
                                            checked={form.labels.includes(label.id)}
                                            onChange={() => toggleLabel(label.id)}
                                        />
                                        {label.attributes?.name || label.Title}
                                    </label>))}
                                </div>
                            </div>
                        </div>
                    </section>
                    <footer className="modal-card-foot">
                        <div className="buttons">

                            <button onClick={handleSubmit} className="button is-success" >Save</button>
                            <button onClick={onClose} className="button" >Cancel</button>
                            {task?.id && <button onClick={handleDelete} className="button is-danger">Delete</button>}

                        </div>
                    </footer>
                </div>
            </div>
        </div>
    )
}
