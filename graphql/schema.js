import {
    GraphQLError,
    GraphQLID,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from "graphql";

import {SignOutResponseType} from "./types/Users/SignOutResponse.js";
import {RefreshResponseType} from "./types/Users/RefreshResponse.js";
import {SignUpResponseType} from "./types/Users/SignUpResponse.js";
import {SignInResponseType} from "./types/Users/SignInResponse.js";
import {TaskResponseType} from "./types/Tasks/TaskResponse.js";

import {TaskType} from "./types/Tasks/Task.js";
import {TaskInput} from "./inputs/Tasks/Task.js";
import validateToken from "../helpers/validateToken.js";

import WordpressService from "../services/WordpressService.js";
import TasksService from "../services/TasksService.js";
import AuthService from "../services/AuthService.js";

import CONFIG from "../config.js";

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        task: {
            type: TaskType,
            args: {id: {type: GraphQLID}},
            async resolve(parent, {id}, {req}) {
                const {authorization} = req.headers;
                const accessToken = authorization?.split(' ')[1];
                if (validateToken({token: accessToken, key: CONFIG.JWT.ACCESS.SECRET_KEY})) {
                    return await TasksService.getTaskById(id);
                }
                throw new GraphQLError('UNAUTHENTICATED');
            }
        },
        tasks: {
            type: new GraphQLList(TaskType),
            async resolve(parent, args, {req}){
                const {authorization} = req.headers;
                const accessToken  = authorization?.split(' ')[1];
                if(validateToken({token: accessToken, key: CONFIG.JWT.ACCESS.SECRET_KEY}))
                    return await TasksService.getAllTasks();
                throw new GraphQLError('UNAUTHENTICATED');
            }
        },
        refreshToken: {
            type: RefreshResponseType,
            async resolve(parent, props, {res, req}) {
                const refreshToken = req.cookies?.refreshToken;
                const {tokens, user, error} = await AuthService.refresh(refreshToken);

                if (tokens) {
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
});

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
            async resolve(parent, props, {res, req}) {
                const refreshToken = req.cookies?.refreshToken;
                const {error} = await AuthService.signOut(refreshToken);

                res.clearCookie('refreshToken');
                return {refreshToken, error}
            }
        },
        createTask: {
            type: TaskResponseType,
            args: {
                task: {type: TaskInput}
            },
            async resolve(parent, {task}, {req, res}) {
                const {name: id} = await TasksService.createTask(task);
                return new WordpressService({id, ...task});
            }
        },
        deleteTask: {
            type: TaskResponseType,
            args: {id: {type: GraphQLID}},
            async resolve(parent, {id}, {res, req}) {
                const response = await TasksService.deleteTask(id)
                return id
            }
        }
    })
});

const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})

export default schema;