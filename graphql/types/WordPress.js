import {GraphQLObjectType, GraphQLString} from "graphql";

export const WordPressType = new GraphQLObjectType({
    name: 'WordPress',
    fields: () => ({
        login: {type: GraphQLString},
        password: { type: GraphQLString},
        url: {type: GraphQLString}
    })
});