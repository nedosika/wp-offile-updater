import {GraphQLObjectType, GraphQLString} from "graphql";
import {TokenType} from "./Token.js";

export const SignUpResponseType = new GraphQLObjectType({
    name: 'SignUpResponse',
    fields: () => ({
        id:{type: GraphQLString},
        tokens: {type: TokenType},
        error: {type: GraphQLString}
    })
})