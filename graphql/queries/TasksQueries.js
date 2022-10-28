import {GraphQLID, GraphQLList} from "graphql";
import {TaskType} from "../types/Taks.js";
import {getAllTasks, getTaskById} from "../../helpers/apiUtils.js";

const task = {
    type: TaskType,
    args: {id: {type: GraphQLID}},
    async resolve(parent, {id}){
        return await getTaskById(id);
    }
}

const tasks = {
    type: new GraphQLList(TaskType),
    async resolve(){
        return await getAllTasks();
    }
}

const TasksQueries = {
    task,
    tasks
}

export default TasksQueries;