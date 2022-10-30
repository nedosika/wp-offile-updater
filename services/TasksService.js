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

const TasksService = {
    getAllTasks,
    getTaskById
}

export default TasksService;