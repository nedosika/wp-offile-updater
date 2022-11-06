import {GraphQLBoolean, GraphQLInputObjectType} from "graphql";

export const CategoriesInputType = new GraphQLInputObjectType({
    name: 'CategoriesInput',
    fields: {
        isAdd: {type: GraphQLBoolean}
    }
});