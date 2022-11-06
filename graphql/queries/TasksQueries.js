import {GraphQLError, GraphQLID, GraphQLList} from "graphql";

import {TaskType} from "../types/Tasks/Task.js";
import TasksService from "../../services/TasksService.js";
import validateToken from "../../helpers/validateToken.js";
import CONFIG from "../../config.js";

const task = {
    type: TaskType,
    args: {id: {type: GraphQLID}},
    async resolve(parent, {id}, {req}){
        const {authorization} = req.headers;
        const accessToken  = authorization?.split(' ')[1];
        if(validateToken({token: accessToken, key: CONFIG.JWT.ACCESS.SECRET_KEY})){
            return await TasksService.getTaskById(id);
        }
        throw new GraphQLError('UNAUTHENTICATED');
    }
}

const tasks = {
    type: new GraphQLList(TaskType),
    async resolve(parent, args, {req}){
        const {authorization} = req.headers;
        const accessToken  = authorization?.split(' ')[1];
        if(validateToken({token: accessToken, key: CONFIG.JWT.ACCESS.SECRET_KEY}))
            return await TasksService.getAllTasks();
        throw new GraphQLError('UNAUTHENTICATED');
    }
}

const TasksQueries = {
    task,
    tasks
}

export default TasksQueries;