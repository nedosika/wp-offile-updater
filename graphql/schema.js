import {GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql";
import TasksQueries from "./queries/TasksQueries.js";
import {SignUpResponseType} from "./types/Users/SignUpResponse.js";
import {SignInResponseType} from "./types/Users/SignInResponse.js";
import AuthService from "../services/AuthService.js";
import TokenService from "../services/TokenService.js";
import UsersService from "../services/UsersService.js";

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
            async resolve(parent, {email, password}, {res}) {
                const {user, error} = await AuthService.signIn(email, password);

                if (user) {
                    const tokens = TokenService.generateTokens({id: user.id});
                    res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
                    return {
                        user,
                        tokens
                    }
                }

                return error || {error: 'Unknown error!'}
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
                const {user, error} = await AuthService.signUp(email, password, username);
                if (user) {
                    const tokens = TokenService.generateTokens({id: user.id});
                    res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
                    await UsersService.updateUser(user.id, {tokens});

                    return {
                        user,
                        tokens
                    }
                }

                return {error} || {error: 'Unknown error!'}
            }
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

export default schema;