import {TaskType} from "../types/Tasks/Taks.js";
import {GraphQLID, GraphQLList} from "graphql";

const user = {
    type: TaskType,
    args: {id: {type: GraphQLID}},
    async resolve(parent, {id}){
        //return await getTaskById(id);
    }
}

const users = {
    type: new GraphQLList(TaskType),
    async resolve(){
        //return await getAllTasks();
    }
}

const UsersQueries = {

}