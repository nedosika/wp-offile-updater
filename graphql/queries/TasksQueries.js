import {GraphQLError, GraphQLID, GraphQLList} from "graphql";

import {TaskType} from "../types/Tasks/Taks.js";
import TasksService from "../../services/TasksService.js";
import validateToken from "../../helpers/validateToken.js";
import CONFIG from "../../config.js";

const task = {
    type: TaskType,
    args: {id: {type: GraphQLID}},
    async resolve(parent, {id}, {accessToken}){
        if(validateToken({token: accessToken, key: CONFIG.JWT.ACCESS.SECRET_KEY})){
            console.log('auth',accessToken)
            const task = await TasksService.getTaskById(id);
            return task
        }

        console.log('unauth')

        throw new GraphQLError(
            'UNAUTHENTICATED'
        );
    }
}

const tasks = {
    type: new GraphQLList(TaskType),
    async resolve(parent, args, {accessToken, refreshToken}){
        if(validateToken({token: accessToken, key: CONFIG.JWT.ACCESS.SECRET_KEY}))
            return await TasksService.getAllTasks();
        throw new GraphQLError('User is not authenticated', {
            extensions: {
                code: 'UNAUTHENTICATED',
                http: { status: 401 },
            },
        });
    }
}

const TasksQueries = {
    task,
    tasks
}

export default TasksQueries;