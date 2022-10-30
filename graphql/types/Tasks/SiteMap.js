import {GraphQLBoolean, GraphQLList, GraphQLObjectType, GraphQLString} from "graphql";

export const SiteMapType = new GraphQLObjectType({
    name: 'SiteMap',
    fields: () => ({
        filter: { type: new GraphQLObjectType({
                name: 'Filter',
                fields: () => ({
                    onlyHtml: {type: GraphQLBoolean}
                })
            })},
        urls: { type: GraphQLList(GraphQLString)}
    })
});