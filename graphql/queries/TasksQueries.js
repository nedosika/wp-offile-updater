import {GraphQLID, GraphQLList} from "graphql";

import {TaskType} from "../types/Tasks/Taks.js";
import TasksService from "../../services/TasksService.js";
import validateToken from "../../helpers/validateToken.js";
import CONFIG from "../../config.js";

const task = {
    type: TaskType,
    args: {id: {type: GraphQLID}},
    async resolve(parent, {id}, {accessToken}){
        if(validateToken({token: accessToken, key: CONFIG.JWT.ACCESS.SECRET_KEY}))
            return await TasksService.getTaskById(id);
        return {error: 'Unauthorized error'}

    }
}

const tasks = {
    type: new GraphQLList(TaskType),
    async resolve(parent, args, {accessToken, refreshToken}){
        if(validateToken({token: accessToken, key: CONFIG.JWT.ACCESS.SECRET_KEY}))
            return await TasksService.getAllTasks();
        return {error: 'Unauthorized error'}
    }
}

const TasksQueries = {
    task,
    tasks
}

export default TasksQueries;