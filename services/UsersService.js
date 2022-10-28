import CONFIG from "../config.js";

const getAllUsers = async () => {
    const response = await fetch(`${CONFIG.DATABASE_URL}/${CONFIG.COLLECTIONS.users}.json`);
    try {
        const users = await response.json();
        return Object.entries(users).map(([id, user]) => ({id, ...user}));
    } catch (error) {
        return []
    }
}

const createUser = async (user) => {
    const response = await fetch(`${CONFIG.DATABASE_URL}/${CONFIG.COLLECTIONS.users}.json`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    const {name: id} = await response.json();

    return id;
}

const updateUser = () => {

}

const UsersService = {
    getAllUsers,
    createUser,
    updateUser
}

export default UsersService;