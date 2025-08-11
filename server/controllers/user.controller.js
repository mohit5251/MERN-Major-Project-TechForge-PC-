import { users } from "../models/user.model.js"
import argon2 from "argon2";
import { clearSession, clearSessionUserId, createAccessToken, createRefreshToken, createSession } from "../services/auth.service.js";

//--------------------------------
//Registeration Logic
//--------------------------------
export const registerUser = async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;

        const userExist = await users.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "Email already Exists" });
        }
        const noExist = await users.findOne({ phone });
        if(noExist){
            return res.status(400).json({ message: "Phone number is already in use" })
        }
        const response = await users.create({ name, email, phone, password });

        //1 . create session & store it in DB
        const sessionData = await createSession({userId: response._id});
            
        //2.create access and refresh token
        const accessToken = createAccessToken({userId: response._id, email: response.email, sessionId: sessionData.sessionId, isEmailValid: response.isEmailValid});
        console.log("AccessToken : ",accessToken);

        const refreshToken = createRefreshToken({sessionId: sessionData.sessionId});
        console.log("Refresh Token : ",refreshToken);
            
        //3. storing tokens in cookie
        res.cookie("AccessToken",accessToken,{
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 900000  //15 min
        })
        res.cookie("RefreshToken",refreshToken,{
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 604800000   //7 days
        })

        return res.status(200).json({ message: "Registration Successful"});

    } catch (error) {
        console.log("Error in registerUser:", error);

        return res.status(500).json({ message: "Internal Server Error" });
    }
};


//--------------------------------
//Login Logic
//--------------------------------
export const loginUser = async(req,res) => {
    try {
        const {email, password} = req.body;

        //check user by email
        const userData = await users.findOne({email});
        if(!userData){
            return res.status(400).json({message: "Email doesn't Exists, Please Register"});
        }

        //verify hash pass
        const user = await argon2.verify(userData.password, password);

        if(user){
            //1 . create session & store it in DB
            const sessionData = await createSession({userId: userData._id});
            

            //2.create access and refresh token
            const accessToken = createAccessToken({userId: userData._id, email: userData.email, sessionId: sessionData.sessionId, isEmailValid: userData.isEmailValid});
            console.log("AccessToken : ",accessToken);

            const refreshToken = createRefreshToken({sessionId: sessionData.sessionId});
            console.log("Refresh Token : ",refreshToken);
            
            //3. storing tokens in cookie
            res.cookie("AccessToken",accessToken,{
                httpOnly: true,
                secure: true,
                sameSite: "None",
                maxAge: 900000  //15 min
            })
            res.cookie("RefreshToken",refreshToken,{
                httpOnly: true,
                secure: true,
                sameSite: "None",
                maxAge: 604800000   //7 days
            })

            return res.status(200).json({message: "Login Successful"});

        }else{
            return res.status(400).json({message: "Incorrect email or password"})
        }
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
        console.log(error);   
    }
}       


//--------------------------------
//Logout User Logic
//--------------------------------
export const logoutUser = async(req, res) => {
    try {
        if(!req.user.sessionId){
            return res.status(400).json({message : "Invalid Session Id for logout"});
        }
        const response = await clearSession(req.user.sessionId);

        if(!req.user.userId){
            return res.status(400).json({message: "Invalid User Id for logout"})
        }
        const response1 = await clearSessionUserId(req.user.userId);

        if(response || response1){
            res.clearCookie("AccessToken")
            res.clearCookie("RefreshToken");
            return res.status(200).json({message: "loggedout sucessfully"});
        }

    } catch (error) {
        console.log(error);
    }
}


//--------------------------------
//Update userName Logic
//--------------------------------
export const updateUserName = async(req, res) => {
    try {
        const {userId} = req.params;

        const {name} = req.body;
        console.log(name);
        console.log(userId);
        

        const user = await users.findOne({ _id: userId })

        if(!user){
            return res.status(400).json({message: "User not found"})
        }

        const response = await users.updateOne({ _id: userId}, { $set: {name} } );

        if(response){
            return res.status(200).json({message: "Name Changed successfully"});
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({message: "Error occurs while updating name"})
    }
    
}




//Display All user Data
export const displayUser = async(req, res) => {
    try {

        const userData = await users.find();

        if(!userData || userData.length == 0){
            return res.status(400).json({message: "User data not exists"});
        }

        return res.status(200).json({ userData });
    } catch (error) {
        console.log("Error on Displaying User :", error);
        return res.status(500).json({message: "Error occurs while displaying User Data"});
    }
}


//Delete User DATA Admin
export const deleteUser = async(req, res) => {
    try {
        const {id} = req.params;

        const userData = await users.findOne({ _id: id});

        if(!userData || userData.length == 0){
            return res.status(400).json({message : "User doesn't exists"});
        }

        const response = await users.deleteOne({ _id : userData._id});

        if(!response) return res.status(400).json({message: "Error occurs While Deleting Data"});

        return res.status(200).json({message: "User deleted successfully"});

    } catch (error) {
        console.log("Error deleting User data : ", error);
        return res.status(500).json({message: "Internal Server Error While Deleting Data"});
    }
}

//get single user fro update
export const getSingleUser = async(req, res) => {
    try {

        const {id} = req.params;

        const userData = await users.findOne({ _id: id });

        if(!userData) return res.status(400).json({message: "User doesn't exists"});

        return res.status(200).json({ userData });
    } catch (error) {
        console.log(error);
    }
}



//Update user data logic
export const updateUser = async(req, res) => {
    try {
        const {id} = req.params;

        const {name, email, phone, isEmailValid, isAdmin} = req.body;

        const userData = await users.findOne({ _id : id });

        if(!userData) return res.status(400).json({message: "User doesn't exists"});

        const response = await users.updateOne({ _id : userData.id }, 
            {$set: {name, email, phone, isEmailValid, isAdmin}}
        );

        if(!response) return res.status(400).json({message: "Error occurs while updating user data"});

        return res.status(200).json({message: "User data Updated successfully"});

    } catch (error) {
        console.log("Error updating user data : ",error);
        return res.status(500).json({message: "Internal Server Error While Updating Data"});
    }
}