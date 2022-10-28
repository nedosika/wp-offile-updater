export const getAllTasks = async () => {
    const response = await fetch('https://wp-updater-93c15-default-rtdb.firebaseio.com/tasks.json');

    return response.json();
}

export const getTaskById = async (id) => {
    const allTasks = await getAllTasks();

    return allTasks.find((task) => task.id === +id);
}


