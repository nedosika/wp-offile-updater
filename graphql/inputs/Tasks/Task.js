import {GraphQLInt, GraphQLInputObjectType, GraphQLString, GraphQLFloat} from "graphql";
import {SiteMapInputType} from "./SiteMap.js";
import {TitleInputType} from "./Title.js";
import {WordPressInputType} from "./Wordpress.js";
import {CategoriesInputType} from "./Categories.js";

export const TaskInput = new GraphQLInputObjectType({
    name: 'TaskInput',
    fields: {
        name: {type: GraphQLString},
        siteMap: {type: SiteMapInputType},
        title: {type: TitleInputType},
        categories: {type: CategoriesInputType},
        wordpress: {type: WordPressInputType},
        timeout: {type: GraphQLFloat}
    }
});