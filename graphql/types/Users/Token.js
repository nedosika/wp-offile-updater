import {GraphQLObjectType, GraphQLString} from "graphql";

export const TokenType = new GraphQLObjectType({
    name: 'Tokens',
    fields: () => ({
        refreshToken: {type: GraphQLString},
        accessToken: {type: GraphQLString}
    })
});