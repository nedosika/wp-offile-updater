import {GraphQLInputObjectType, GraphQLInt, GraphQLString} from "graphql";

export const ParserInputType = new GraphQLInputObjectType({
    name: 'ParserInput',
    fields: () => ({
        index: {type: GraphQLInt},
        regExp: {type: GraphQLString}
    })
})