import {GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql";
import TasksQueries from "./queries/TasksQueries.js";
import {SignUpResponseType} from "./types/Users/SignUpResponse.js";
import {SignInResponseType} from "./types/Users/SignInResponse.js";
import AuthService from "../services/AuthService.js";

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        ...TasksQueries
    }
})

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        signIn: {
            type: SignInResponseType,
            args: {
                email: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            resolve(parent, {email, password}){
                return AuthService.signIn(email, password);
            }
        },
        signUp: {
            type: SignUpResponseType,
            args: {
                username: {type: GraphQLString},
                email: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            resolve(parent, {username, email, password}){
                return AuthService.signUp(email, password, username)
            }
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

export default schema;