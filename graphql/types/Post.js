import {GraphQLID, GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString} from "graphql";

export const PostType = new GraphQLObjectType({
    name: 'Post',
    fields: () => ({
        id: {type: GraphQLID},
        slug: {type: GraphQLString},
        title: {type: GraphQLString},
        categories: {type: GraphQLList(GraphQLInt)},
        url: {type: GraphQLString}
    })
});