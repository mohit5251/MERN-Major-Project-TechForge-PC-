import express from "express";
import { deleteUser, displayUser, getSingleUser, loginUser, logoutUser, registerUser, updateUser, updateUserName } from "../controllers/user.controller.js";
import { emailSchema, nameSchema, passwordSchema, registerSchema, UpdateUserSchema } from "../validator/register.validator.js";
import { registerValidation } from "../middleware/register_Validation.js";
import { loginSchema } from "../validator/login.validator.js";
import { authUser } from "../middleware/auth_middleware.js";
import { forgotpassword, forgotPasswordTokenVerify } from "../services/forgotPassword.service.js";
import { createEmailVerificationURL, verifyEmailURL } from "../services/emailVerification.js";
const router = express.Router();

//here passing registerSchema(zod) to middleware validator
router.route("/register").post(registerValidation(registerSchema), registerUser);

router.route("/login").post(registerValidation(loginSchema), loginUser);

//Authentication
router.route("/authUser").get(authUser, (req, res) => {
    if(!req.user){
        return res.status(200).json({message : "Please Login To access this feature", user: null})
    }

    res.status(200).json({message: "user is authenticated ", user: req.user});
});


router.route("/forgot-password").post(registerValidation(emailSchema), forgotpassword);

router.route("/forgot-password/:token").post(registerValidation(passwordSchema), forgotPasswordTokenVerify);

router.route("/change-name/:userId").post(registerValidation(nameSchema), updateUserName);

router.route("/verify-email").get(createEmailVerificationURL);

router.route("/verify-email-token").get(verifyEmailURL);


//  Admin Panel Code
router.route("/displayUser").get(displayUser);

router.route("/deleteUser/:id").delete(deleteUser);

router.route("/getSingleUser/:id").get(getSingleUser);

router.route("/updateUser/:id").put( registerValidation(UpdateUserSchema) ,updateUser);

//Logout 
router.route("/logout").get(logoutUser);

export const userRouter = router;