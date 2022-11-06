import {GraphQLObjectType, GraphQLString} from "graphql";
import {TokenType} from "./Token.js";
import {UserType} from "./User.js";

export const SignInResponseType = new GraphQLObjectType({
    name: 'SignInResponse',
    fields: () => ({
        user: {type: UserType},
        tokens: {type: TokenType},
        error: {type: GraphQLString}
    })
})