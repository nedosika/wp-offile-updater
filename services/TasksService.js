import CONFIG from "../config.js";

const getAllTasks = async () => {
    const response = await fetch(`${CONFIG.DATABASE_URL}/${CONFIG.COLLECTIONS.tasks}.json`);
    const tasks = await response.json();

    return Object.entries(tasks).map(([id, task]) => ({id, ...task}));
}

const getTaskById = async (id) => {
    const allTasks = await getAllTasks();
    return allTasks.find((task) => task.id == id);
}

const createTask = async (task) => {
    const response = await fetch(
        `${CONFIG.DATABASE_URL}/${CONFIG.COLLECTIONS.tasks}.json`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...task,
                status: {
                    start: new Date()
                }
            })
        }
    );

    return await response.json();
}

const deleteTask = async (id) => {
    const response = await fetch(
        `${CONFIG.DATABASE_URL}/${CONFIG.COLLECTIONS.tasks}/${id}.json`,
        {
            method: 'DELETE'
        }
    );

    return await response.json();
}

const update = async (task) => {
    const response = await fetch(
        `${CONFIG.DATABASE_URL}/${CONFIG.COLLECTIONS.tasks}/${task.id}.json`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        }
    );

    return await response.json();
}

const TasksService = {
    getAllTasks,
    getTaskById,
    createTask,
    deleteTask,
    update
}

export default TasksService;