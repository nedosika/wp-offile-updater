import {GraphQLBoolean, GraphQLObjectType} from "graphql";

export const CategoriesType = new GraphQLObjectType({
    name: 'Categories',
    fields: {
        isAdd: {type: GraphQLBoolean}
    }
});