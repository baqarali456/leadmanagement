import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";



const verifyJWT = asyncHandler(async (req, res, next) => {

    try {
        const accessToken = req.body?.accessToken || req.header('Authorization').slice(7);

        if (!accessToken) {
            return res.status(401).json({ message: "Access Token Required" });
        }


        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id)

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        if (user._id.toString() !== decodedToken._id) {
            return res.status(401).json({ message: "Unauthorized request" });
        }

        req.user = user;
        next()


    } catch (error) {
        return res.status(500).json({ message: error?.message || "something went wrong while getting user by decoded token" });
    }
})


export {
    verifyJWT
}