import {GraphQLObjectType, GraphQLString} from "graphql";
import {UserType} from "./User.js";

export const SignOutResponseType = new GraphQLObjectType({
    name: 'SignOutResponse',
    fields: () => ({
        error: {type: GraphQLString},
        refreshToken: {type: GraphQLString}
    })
})