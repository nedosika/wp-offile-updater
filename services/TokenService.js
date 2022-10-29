import CONFIG from "../config.js";
import jwt from "jsonwebtoken";

const generateTokens = (payload) => {
    const accessToken = jwt.sign(
        payload,
        CONFIG.JWT.ACCESS.SECRET_KEY,
        {expiresIn: CONFIG.JWT.ACCESS.EXPIRES_IN}
    );

    const refreshToken = jwt.sign(
        payload,
        CONFIG.JWT.REFRESH.SECRET_KEY,
        {expiresIn: CONFIG.JWT.REFRESH.EXPIRES_IN}
    );

    return {
        accessToken,
        refreshToken
    }
}

const validateToken = ({token, key}) => {
    try {
        return jwt.verify(token, key);
    } catch (error) {
        return null
    }
}

const TokenService = {
    generateTokens,
    validateToken
}

export default TokenService;