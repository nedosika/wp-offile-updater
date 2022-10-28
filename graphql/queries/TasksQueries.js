import {GraphQLID, GraphQLList} from "graphql";
import TasksResolvers from "../resolvers/TasksResolvers.js";
import {TaskType} from "../types/Taks.js";

const task = {
    type: TaskType,
    args: {id: {type: GraphQLID}},
    resolve: TasksResolvers.task
}

const tasks = {
    type: new GraphQLList(TaskType),
    resolve: TasksResolvers.tasks
}

const TasksQueries = {
    task,
    tasks
}

export default TasksQueries;