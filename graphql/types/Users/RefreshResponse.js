import {GraphQLObjectType, GraphQLString} from "graphql";

export const RefreshResponseType = new GraphQLObjectType({
    name: 'RefreshResponse',
    fields: () => ({
        accessToken:{type: GraphQLString},
        error: {type: GraphQLString},
    })
})