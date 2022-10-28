import {getAllTasks, getTaskById} from "../../helpers/apiUtils.js";

const tasks = () => getAllTasks;

const task = (parent, {id}) => getTaskById(id);

const TasksResolvers = {
    tasks,
    task
}

export default TasksResolvers;
