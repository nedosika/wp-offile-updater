import {GraphQLInputObjectType, GraphQLString} from "graphql";

export const WordPressInputType = new GraphQLInputObjectType({
    name: 'WordPressInput',
    fields: () => ({
        auth: {type: GraphQLString},
        url: {type: GraphQLString}
    })
});