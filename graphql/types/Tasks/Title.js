import {GraphQLBoolean, GraphQLInt, GraphQLObjectType, GraphQLString} from "graphql";

export const TitleType = new GraphQLObjectType({
    name: 'Title',
    fields: () => ({
        parser: { type: new GraphQLObjectType({
                name: 'Parser',
                fields: () => ({
                    index: {type: GraphQLInt},
                    regExp: {type: GraphQLString}
                })
            })},
        search: { type: new GraphQLObjectType({
                name: 'Search',
                fields: () => ({
                    isStrong: {type: GraphQLBoolean},
                    order: { type: GraphQLString},
                    sortBy: {type: GraphQLString}
                })
            })},
    })
});