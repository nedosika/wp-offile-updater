import {GraphQLBoolean, GraphQLInputObjectType, GraphQLObjectType, GraphQLString} from "graphql";

export const SearchInputType = new GraphQLInputObjectType({
    name: 'SearchInput',
    fields: () => ({
        isStrong: {type: GraphQLBoolean},
        order: {type: GraphQLString},
        sortBy: {type: GraphQLString}
    })
})