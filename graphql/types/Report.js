import {GraphQLList, GraphQLObjectType} from "graphql";
import {ErrorType} from "./Error.js";
import {PostType} from "./Post.js";

export const ReportType = new GraphQLObjectType({
    name: 'report',
    fields: () => ({
        errors: { type: GraphQLList(ErrorType)},
        posts: { type: GraphQLList(PostType)}
    })
});