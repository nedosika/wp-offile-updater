import CONFIG from "../config.js";

const getUserById = async (id) => {
    const response = await fetch(`${CONFIG.DATABASE_URL}/${CONFIG.COLLECTIONS.users}/${id}.json`);
    return await response.json();
}

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

const updateUser = async (id, user) => {
    const response = await fetch(`${CONFIG.DATABASE_URL}/${CONFIG.COLLECTIONS.users}/${id}.json`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    return await response.json();
}

const UsersService = {
    getAllUsers,
    createUser,
    updateUser,
    getUserById
}

export default UsersService;