import {GraphQLObjectType, GraphQLSchema} from "graphql";
import TasksQueries from "./queries/TasksQueries.js";

const rootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        ...TasksQueries
    }
})

const schema = new GraphQLSchema({
    query: rootQuery
})

export default schema;