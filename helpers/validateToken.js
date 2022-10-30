import jwt from "jsonwebtoken";

const validateToken = ({token, key}) => {
    try {
        return jwt.verify(token, key);
    } catch (error) {
        return null
    }
}

export default validateToken;