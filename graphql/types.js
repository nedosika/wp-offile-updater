import {GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString} from "graphql/index.js";

export const TaskType = new GraphQLObjectType({
    name: 'Task',
    fields: () => ({
        id: {type: GraphQLID},
        name: { type: GraphQLString},
        timeout: {type: GraphQLInt}
    })
});

export const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
    }),
});