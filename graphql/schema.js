import {GraphQLError, GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql";
import TasksQueries from "./queries/TasksQueries.js";
import {SignUpResponseType} from "./types/Users/SignUpResponse.js";
import {SignInResponseType} from "./types/Users/SignInResponse.js";
import AuthService from "../services/AuthService.js";
import {SignOutResponseType} from "./types/Users/SignOutResponse.js";
import {RefreshResponseType} from "./types/Users/RefreshResponse.js";

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        ...TasksQueries,
        refreshToken: {
            type: RefreshResponseType,
            async resolve(parent, props, {res, req}) {
                console.log('refresh')
                const refreshToken = req.cookies?.refreshToken;
                const {tokens, user, error} = await AuthService.refresh(refreshToken);

                if(tokens){
                    res.cookie(
                        'refreshToken',
                        tokens.refreshToken,
                        {
                            maxAge: 30 * 24 * 60 * 60 * 1000,
                            httpOnly: true
                        }
                    );

                    return {tokens, user}
                }
                throw new GraphQLError('UNAUTHENTICATED');
            }
        }
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
            async resolve(parent, {email, password}, {res}) {
                const {user, tokens, error} = await AuthService.signIn(email, password);

                if (user) {
                    res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
                    return {
                        user,
                        tokens
                    }
                }

                return {error} || {error: 'Unknown error!'}
            }
        },
        signUp: {
            type: SignUpResponseType,
            args: {
                username: {type: GraphQLString},
                email: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            async resolve(parent, {username, email, password}, {res}) {
                const {user, error, tokens} = await AuthService.signUp(email, password, username);

                if (user) {
                    res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

                    return {user, tokens}
                }

                return {error} || {error: 'Unknown error!'}
            }
        },
        signOut: {
            type: SignOutResponseType,
            async resolve(parent, props, {res, req}){
                const refreshToken = req.cookies?.refreshToken;
                const {error} = await AuthService.signOut(refreshToken);

                res.clearCookie('refreshToken');
                return {refreshToken, error}
            }
        },
    })
})

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

export default schema;