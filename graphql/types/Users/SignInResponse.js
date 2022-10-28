import {GraphQLObjectType, GraphQLString} from "graphql";
import {TokenType} from "./Token.js";

export const SignInResponseType = new GraphQLObjectType({
    name: 'SignInResponse',
    fields: () => ({
        id:{type: GraphQLString},
        tokens: {type: TokenType},
        error: {type: GraphQLString}
    })
})