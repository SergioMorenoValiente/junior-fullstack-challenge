import React, { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import { getTasks, completeTask, updateTask, setTaskPriority, deleteTask  } from "../services/TaskService";
import { TaskItem } from "../interfaces/TaskItem";
import "./TaskList.css";

const TaskList = () => {
    const [tasks, setTasks] = useState<TaskItem[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const loadTasks = async () => {
            const tasks = await getTasks();
            setTasks(tasks);
        };
        loadTasks();
    }, []);

    const handleComplete = async (taskId: number) => {
        try {
            await completeTask(taskId);
            setTasks(task => task.map(task => task.id === taskId ? { ...task, isCompleted: true } : task));
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = async (taskId: number, updatedTask: Partial<TaskItem>) => {
        try {
            if (updatedTask.priority !== undefined && Object.keys(updatedTask).length === 1) {
                await setTaskPriority(taskId, updatedTask.priority);
            } else {
                await updateTask(taskId, updatedTask);
            }
            setTasks(task =>task.map(task =>task.id === taskId ? { ...task, ...updatedTask } : task));
        } catch (error) {
            console.error(error);
        }
    };
    const handleDelete = async (taskId: number) => {
        try {
            await deleteTask(taskId);
            setTasks(tasks => tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error(error);
        }
    };
    

    const filteredTasks = tasks.filter(
        task =>task.name.toLowerCase().includes(search.toLowerCase()) ||task.description.toLowerCase().includes(search.toLowerCase())
    );

    const pendingTasks = filteredTasks.filter(task => !task.isCompleted);
    const completedTasks = filteredTasks.filter(task => task.isCompleted);

    return (
        <div className="container">
            <div className="sub-container">
                <div className="search-container">
                    <input required type="text" className="search-input" value={search} onChange={e => setSearch(e.target.value)}/>
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Buscar tareas...</label>
                </div>
            </div>

            <div className="lists-container">
                <div className="list-container">
                    <h2>Tareas Pendientes</h2>
                    {pendingTasks.length === 0 ? (
                        <p className="p-notask">No hay tareas pendientes</p>
                    ) : (
                        pendingTasks
                            .sort((a, b) => a.priority - b.priority)
                            .map(task => (<TaskCard key={task.id} task={task} onComplete={handleComplete} onEdit={handleEdit} onDelete={handleDelete}/>))
                    )}
                </div>

                <div className="list-container">
                    <h2>Tareas Completadas</h2>
                    {completedTasks.length === 0 ? (
                        <p className="p-notask">Aún no has completado ninguna tarea</p>
                    ) : (
                        completedTasks
                            .sort((a, b) => a.priority - b.priority)
                            .map(task => (<TaskCard key={task.id} task={task} onComplete={handleComplete} onEdit={handleEdit} onDelete={handleDelete}/>))
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskList;
