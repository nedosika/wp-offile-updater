import {GraphQLID, GraphQLList, GraphQLObjectType, GraphQLSchema} from "graphql";
import {TaskType} from "./types.js";

const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        task: {
            type: TaskType,
            args: {id: {type: GraphQLID}},
            async resolve(parent, args){
                return {
                    id: 0,
                    name: 'dfdf',
                    timeout: 0
                }
            }
        },
        tasks: {
            type: new GraphQLList(TaskType),
            async resolve(parent, args){
                return [{
                    id: 0,
                    name: 'dfdf',
                    timeout: 0
                }]
            }
        }
    }

})

const schema = new GraphQLSchema({
    query: rootQuery
})

export default schema;