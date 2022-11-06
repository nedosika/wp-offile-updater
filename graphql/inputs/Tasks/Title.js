import {GraphQLInputObjectType} from "graphql";
import {ParserInputType} from "./Parser.js";
import {SearchInputType} from "./Search.js";

export const TitleInputType = new GraphQLInputObjectType({
    name: 'TitleInput',
    fields: () => ({
        parser: { type: ParserInputType},
        search: { type: SearchInputType},
    })
});