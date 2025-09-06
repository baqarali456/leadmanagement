import {Router} from "express";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(registerUser)
userRouter.route("/login").post(loginUser)
userRouter.route('/logout').post(verifyJWT,logoutUser)
userRouter.route('/getcurrentUser').post(verifyJWT,getCurrentUser)

export {
    userRouter,
}
