import jwt from "jsonwebtoken";
import config from "../../config/config.js";

const generateUserTokens = (res, payload) => {
    const accessToken = jwt.sign(
        { userId: payload.userId },
        config.JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );

    const refreshToken = jwt.sign(
        { userId: payload.userId },
        config.JWT_SECRET,
        {
            expiresIn: "30d",
        }
    );

    const cookieName = "userrefreshToken";

    res.cookie(cookieName, refreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    return { accessToken, refreshToken };
};

export { generateUserTokens };
