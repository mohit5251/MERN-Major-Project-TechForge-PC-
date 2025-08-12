import { sessions } from "../models/session.model.js";
import jwt from "jsonwebtoken";
import { users } from "../models/user.model.js";

export const createSession = async({userId}) => {
    try {
        const sessionId = Math.floor(Math.random()*99999999);
        return await sessions.create({userId, sessionId})
    } catch (error) {
        console.log(error);
    }
}

export const createAccessToken = ({userId, email, sessionId, isEmailValid}) => {
    try {
        return jwt.sign({userId, email, sessionId, isEmailValid},process.env.JWT_SECRET_KEY,{expiresIn:"15d"});
    } catch (error) {
        console.log(error);
    }
}

export const createRefreshToken = ({sessionId}) => {
    try {
        return jwt.sign({sessionId},process.env.JWT_SECRET_KEY,{expiresIn:"20d"})
    } catch (error) {
        console.log(error);
    }
}




//Auth Middleware 
export const verifyJWTToken = async(token) => {
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decodedToken || !decodedToken.userId) {
            throw new Error("Invalid token: userId not found");
        }

        const user = await findUserById(decodedToken.userId);

        if (!user) {
            throw new Error("User not found for provided token");
        }

        return {
            userId: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            sessionId: decodedToken.sessionId,
            isAdmin: user.isAdmin,
            isEmailValid: user.isEmailValid
        };
    } catch (error) {
        console.log("verifyJWTToken error:", error.message || error);
    }
}

const findSessionById = async(sessionId) => {
    return await sessions.findOne({ sessionId });
}
export const findUserById = async(userId) => {
    return await users.findOne({ _id: userId })
}



//Auth Middleware ( Refresh Token Logic )
export const refreshTokens = async(token) => {

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!decodedToken.sessionId) {
            throw new Error("Invalid token: sessionId not found in refresh token");
        }
        

        const currentSession = await findSessionById(decodedToken.sessionId);
        

        if (!currentSession) {
            res.clearCookie("AccessToken", {
                httpOnly: true,
                secure: true,
                sameSite: "None"
            });
            res.clearCookie("RefreshToken", {
                httpOnly: true,
                secure: true,
                sameSite: "None"
            });
            throw new Error("Session expired, please login again.");
        }

        const user = await findUserById(currentSession.userId);

        if(!user){
            throw new Error("User Doesn't exist, Please Login Again");
        }

        const userInfoToSend = {
            userId : user._id,
            name : user.name,
            email : user.email,
            phone : user.phone,
            sessionId : currentSession.sessionId,
            isAdmin: user.isAdmin,
            isEmailValid: user.isEmailValid,
        }
        const userInfo = {
            userId : user._id,
            email : user.email,
            sessionId : currentSession.sessionId,
            isEmailValid : user.isEmailValid,
        }

        const newAccessToken = createAccessToken(userInfo);
        const newRefreshToken = createRefreshToken({sessionId: currentSession.sessionId});

        return {
            newAccessToken,
            newRefreshToken,
            user: userInfo,
            userInfoToSend,
        }
    } catch (error) {
        console.error("Refresh token error:", error.message || error);
        throw error; // rethrow so the middleware can handle it
    }
}



//Logout user ClearData
export const clearSession = async(sessionId) => {
    return await sessions.deleteOne({ sessionId });
}
export const clearSessionUserId = async(userId) => {
    return await sessions.deleteMany({ userId });
}