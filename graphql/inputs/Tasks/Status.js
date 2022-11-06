import { GraphQLInt, GraphQLInputObjectType, GraphQLString} from "graphql";

export const StatusInputType = new GraphQLInputObjectType({
    name: 'StatusInput',
    fields: {
        error: { type: GraphQLString},
        finish: { type: GraphQLString},
        progress: {type: GraphQLInt},
        start: { type: GraphQLString},
    }
});