import bcrypt from "bcrypt";

import UsersService from "./UsersService.js";
import CONFIG from "../config.js";
import generateTokens from "../helpers/generateTokens.js";
import validateToken from "../helpers/validateToken.js";

const signIn = async (email, password) => {
    const users = await UsersService.getAllUsers();

    const user = users.find((user) => user.email === email);

    if (!user)
        return {error: "User not found."};

    const valid = await bcrypt.compare(password, user.password);

    if (!valid)
        return {error: "Password does not match."};

    const tokens = generateTokens({id: user.id});

    await UsersService.updateUser(user.id, {refreshToken: tokens.refreshToken});

    return {user, tokens}
}

const signUp = async (email, password, username) => {
    const users = await UsersService.getAllUsers();

    const user = users.find((user) => user.email === email);

    if (user) {
        return {error: "User is already exist!"};
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const id = await UsersService.createUser({
        username,
        email: email.toLowerCase(),
        password: encryptedPassword,
    });

    const tokens = generateTokens({id});

    await UsersService.updateUser(id, {refreshToken: tokens.refreshToken});

    return {
        user: {
            id,
            username,
            email
        },
        tokens
    }
}

const signOut = async (refreshToken) => {
    if(!refreshToken)
        return {error: "Token not found"}

    const {id} = validateToken({
        token: refreshToken,
        key: CONFIG.JWT.REFRESH.SECRET_KEY
    });
    if(!id)
        return {error: "Token invalid"}

    const user = await UsersService.updateUser(id, {refreshToken: null});

    return {refreshToken}
}

const refresh = async (refreshToken) => {
    if(!refreshToken)
        return {error: 'Unauthorized'}

    const {id} = validateToken({
        token: refreshToken,
        key: CONFIG.JWT.REFRESH.SECRET_KEY
    });
    if(!id)
        return {error: 'Unauthorized'}

    const user = await UsersService.getUserById(id);
    if(user?.refreshToken !== refreshToken)
        return {error: 'Unauthorized'}

    const tokens = generateTokens({id});

    await UsersService.updateUser(id, {refreshToken: tokens.refreshToken});

    return {tokens, user}
}

const AuthService = {
    signIn,
    signUp,
    signOut,
    refresh
}

export default AuthService;