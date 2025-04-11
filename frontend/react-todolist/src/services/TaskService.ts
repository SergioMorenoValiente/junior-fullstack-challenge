import { TaskItem } from "../interfaces/TaskItem";

const API_URL = "http://localhost:5262/api/TaskItem";

export const getTasks = async (): Promise<TaskItem[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error getting tasks");
    return await response.json();
};

export const completeTask = async (taskId: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${taskId}/complete`, {
        method: "PUT",
    });

    if (!response.ok) throw new Error("Error completing task");
};

export const updateTask = async (taskId: number, updatedTask: Partial<TaskItem>): Promise<void> => {
    const response = await fetch(`${API_URL}/${taskId}`, {
        method: "PUT",
        body: JSON.stringify(updatedTask),
        headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Error updating task");
};

export const setTaskPriority = async (taskId: number, priority: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${taskId}/priority`, {
        method: "PUT",
        body: JSON.stringify({ priority }),
        headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error("Error setting task priority");
};

export const deleteTask = async (taskId: number): Promise<void> => {
    const response = await fetch(`${API_URL}/${taskId}`, {
        method: "DELETE",
    });

    if (!response.ok) throw new Error("Error deleting task");
};

