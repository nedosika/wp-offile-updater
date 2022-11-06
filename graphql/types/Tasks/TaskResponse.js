import {GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString} from "graphql";

import {StatusType} from "./Status.js";
import {TitleType} from "./Title.js";
import {WordPressType} from "./WordPress.js";
import {SiteMapType} from "./SiteMap.js";
import {ReportType} from "./Report.js";

export const TaskResponseType = new GraphQLObjectType({
    name: 'TaskResponse',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        timeout: {type: GraphQLInt},
        status: {type: StatusType},
        title: {type: TitleType},
        wordpress: {type: WordPressType},
        sitemap: {type: SiteMapType},
        report: {type: ReportType}
    })
});
