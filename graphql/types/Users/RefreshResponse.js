import {GraphQLObjectType, GraphQLString} from "graphql";
import {UserType} from "./User.js";

export const RefreshResponseType = new GraphQLObjectType({
    name: 'RefreshResponse',
    fields: () => ({
        user: {type: UserType},
        accessToken:{type: GraphQLString},
        error: {type: GraphQLString},
    })
})