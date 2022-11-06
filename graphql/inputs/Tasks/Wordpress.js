import {GraphQLInputObjectType, GraphQLString} from "graphql";

export const WordPressInputType = new GraphQLInputObjectType({
    name: 'WordPressInput',
    fields: () => ({
        login: {type: GraphQLString},
        password: { type: GraphQLString},
        url: {type: GraphQLString}
    })
});