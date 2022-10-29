import bcrypt from "bcrypt";

import UsersService from "./UsersService.js";
import TokenService from "./TokenService.js";

export const signIn = async (email, password) => {
    const users = await UsersService.getAllUsers();

    const user = users.find((user) => user.email === email);

    if (!user)
        return {error: "User not found."};

    const valid = await bcrypt.compare(password, user.password);

    if (!valid)
        return {error: "Password does not match."};

    return {user}
}

export const signUp = async (email, password, username) => {
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

    return {
        user: {
            id,
            username,
            email
        }
    }
}

const AuthService = {
    signIn,
    signUp
}

export default AuthService;