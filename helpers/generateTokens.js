import jwt from "jsonwebtoken";
import CONFIG from "../config.js";

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

export default generateTokens;