import {GraphQLBoolean, GraphQLInputObjectType, GraphQLList, GraphQLString} from "graphql";

export const SiteMapInputType = new GraphQLInputObjectType({
    name: 'SiteMapInput',
    fields: {
        filter: { type: new GraphQLInputObjectType({
                name: 'FilterInput',
                fields: {
                    onlyHtml: {type: GraphQLBoolean}
                }
            })},
        urls: { type: GraphQLList(GraphQLString)}
    }
});