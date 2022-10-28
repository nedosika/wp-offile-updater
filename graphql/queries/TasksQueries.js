import {GraphQLID, GraphQLList} from "graphql";

import {TaskType} from "../types/Tasks/Taks.js";
import TasksService from "../../services/TasksService.js";

const task = {
    type: TaskType,
    args: {id: {type: GraphQLID}},
    async resolve(parent, {id}){
        return await TasksService.getTaskById(id);
    }
}

const tasks = {
    type: new GraphQLList(TaskType),
    async resolve(){
        return await TasksService.getAllTasks();
    }
}

const TasksQueries = {
    task,
    tasks
}

export default TasksQueries;