import {GraphQLObjectType, GraphQLString} from "graphql";
import {PostType} from "./Post.js";

export const ErrorType = new GraphQLObjectType({
    name: 'Error',
    fields: () => ({
        url: {type: PostType},
        message: {type: GraphQLString}
    })
});