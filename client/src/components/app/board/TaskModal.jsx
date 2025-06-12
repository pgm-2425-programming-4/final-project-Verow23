import { useState } from "react";
import { API_TOKEN, API_URL } from "../../../constants/constants";

export function TaskModal({ task, onUpdate, onDelete, states, onClose, labels, project }) {
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
        <div className="modal-container">
            <div>
                <p>{project.Title}</p>
                <h2>{task ? "Edit task" : "New task"}</h2>
                <input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description"></textarea>
                <select required name="state" value={form.state} onChange={handleChange}>
                    <option disabled value="">Select your status</option>
                    {states.map(state => (<option key={state.id} value={state.id}>{state.Title}</option>))}
                </select>
                <div>
                    <label>Labels</label>
                    <div>
                        {labels.data.map(label => (<label key={label.id}>
                            <input
                                type="checkbox"
                                checked={form.labels.includes(label.id)}
                                onChange={() => toggleLabel(label.id)}
                            />
                            {label.attributes?.name || label.Title}
                        </label>))}
                    </div>
                </div>
                <div>
                    {task?.id && <button onClick={handleDelete}>Delete</button>}
                    <div>
                        <button onClick={onClose} >Cancel</button>
                        <button onClick={handleSubmit} >Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
