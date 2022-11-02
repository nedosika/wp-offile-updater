import {GraphQLObjectType, GraphQLString} from "graphql";
import {UserType} from "./User.js";
import {TokenType} from "./Token.js";

export const RefreshResponseType = new GraphQLObjectType({
    name: 'RefreshResponse',
    fields: () => ({
        user: {type: UserType},
        tokens:{type: TokenType},
        error: {type: GraphQLString},
    })
})