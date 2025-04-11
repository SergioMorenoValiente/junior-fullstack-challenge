import React, { useState } from "react";
import { TaskItem } from "../interfaces/TaskItem";
import "./TaskCard.css";

interface TaskCardProps {
    task: TaskItem;
    onComplete: (id: number) => void;
    onEdit: (id: number, updatedTask: Partial<TaskItem>) => void;
    onDelete: (id: number) => void;
}

const TaskCard = ({ task, onComplete, onEdit, onDelete }: TaskCardProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState(task);

    const formatDate = (date: string) => {
        const parsedDate = new Date(date);
        const day = String(parsedDate.getDate()).padStart(2, "0");
        const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
        const year = parsedDate.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedTask({ ...editedTask, [name]: name === "priority" ? parseInt(value) : value });
    };

    const handleSave = async () => {
        const hasPriorityChanged = task.priority !== editedTask.priority;

        try {
            await onEdit(task.id, { name: editedTask.name, description: editedTask.description, dueDate: editedTask.dueDate });

            if (hasPriorityChanged) {
                await onEdit(task.id, { priority: editedTask.priority });
            }
            setIsEditing(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        setEditedTask(task);
        setIsEditing(false);
    };

    const getPriorityClass = (priority: number) => {
        switch (priority) {
            case 1: return "priority-1";
            case 2: return "priority-2";
            case 3: return "priority-3";
            case 4: return "priority-4";
            case 5: return "priority-5";
        }
    };

    return (
        <div className={`card ${task.isCompleted ? "completed" : "no-completed"}}`}>
            <p>
                {isEditing ? (
                    <div>
                        <label>Nombre de la tarea</label>
                        <input name="name" value={editedTask.name} onChange={handleChange} className="input" />
                    </div>
                ) : (
                    <div className="name">
                        <h3>{task.name}</h3>
                        <label className={`priority ${getPriorityClass(task.priority)}`}>
                            {task.priority === 1 ? "Muy urgente" :task.priority === 2 ? "Urgente" :task.priority === 3 ? "Medio urgente" :task.priority === 4 ? "Poco urgente" :"Nada urgente"}
                        </label>
                    </div>
                )}
            </p>
            <p>
                {isEditing ? (
                    <div>
                        <label>Descripción de la tarea</label>
                        <textarea name="description" value={editedTask.description} onChange={handleChange} className="textarea" />
                    </div>
                ) : (
                    task.description
                )}
            </p>
            <p>
                {isEditing ? (
                    <div>
                        <label>Fecha límite</label>
                        <input type="date" name="dueDate" value={editedTask.dueDate} onChange={handleChange} className="input" />
                    </div>
                ) : (
                    `Fecha límite: ${formatDate(task.dueDate)}`
                )}
            </p>
            <p>
                {isEditing ? (
                    <div>
                        <label>Prioridad</label>
                        <select name="priority" value={editedTask.priority} onChange={handleChange} className="select">
                            <option value={1}>Muy urgente</option>
                            <option value={2}>Urgente</option>
                            <option value={3}>Medio urgente</option>
                            <option value={4}>Poco urgente</option>
                            <option value={5}>Nada urgente</option>
                        </select>
                    </div>
                ) : null}
            </p>

            <div className="buttons">
                {!task.isCompleted && !isEditing && (
                    <>
                        <button onClick={() => onComplete(task.id)} className="btn complete">Completar</button>
                        <button onClick={() => setIsEditing(true)} className="btn edit">Editar</button>
                        <button onClick={() => onDelete(task.id)} className="btn delete">Eliminar</button>
                    </>
                )}
                {task.isCompleted && !isEditing && (
                    <>
                        <button onClick={() => onDelete(task.id)} className="btn delete">Eliminar</button>
                    </>
                )}
                {isEditing && (
                    <>
                        <button onClick={handleSave} className="btn save">Guardar</button>
                        <button onClick={handleCancel} className="btn cancel">Cancelar</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default TaskCard;
