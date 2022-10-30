import { GraphQLInt, GraphQLObjectType, GraphQLString} from "graphql";

export const StatusType = new GraphQLObjectType({
    name: 'Status',
    fields: () => ({
        error: {type: GraphQLString},
        finish: { type: GraphQLString},
        progress: {type: GraphQLInt},
        start: { type: GraphQLString},
    })
});