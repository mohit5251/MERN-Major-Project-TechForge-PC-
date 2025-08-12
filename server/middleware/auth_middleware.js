import { refreshTokens, verifyJWTToken } from "../services/auth.service.js";

export const authUser = async(req, res ,next) => {
    const AccessTokenCookie = req.cookies.AccessToken;
    const RefreshTokenCookie = req.cookies.RefreshToken;

    req.user = null;

    if(!AccessTokenCookie && !RefreshTokenCookie){
        return next();
    }

    if(AccessTokenCookie){
        try {
            const decodedToken = await verifyJWTToken(AccessTokenCookie);
            req.user = decodedToken;
            return next();
        } catch (error) {
            console.log("Access token invalid:", error.message);
        }   
    }

    if(RefreshTokenCookie){
        try {
            const {newAccessToken, newRefreshToken, user, userInfoToSend} = await refreshTokens(RefreshTokenCookie, req, res);

            req.user = userInfoToSend;

            res.cookie("AccessToken", newAccessToken,{httpOnly : true, secure : true, sameSite: "None", maxAge: 900000});  //15 min
            res.cookie("RefreshToken",newRefreshToken,{
                    httpOnly: true,
                    secure: true,
                    sameSite: "None",
                    maxAge: 604800000   //7 days
                })

            return next();
        } catch (error) {
            console.log(error);
            return res.status(400).json({message : error.message});
        }
    }
    return next();
}