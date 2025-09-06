import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const registerUser = asyncHandler(async (req, res) => {
    try {
        const { username, email, password,role="User" } = req.body;

        if ([username, email, password].some(field => field?.trim() === "")) {
            return res.status(404).json({
                message: "All fields are required"
            })
        }

        const existingUser = await User.findOne({$or: [{email},{username}]});

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            })
        }

        const user = await User.create({ username, email, password,role })

        return res.status(200).json({
            message: "User registered successfully",
            user,
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error?.message || "something went wrong while registering user",
        })
    }
});


const loginUser = asyncHandler(async (req, res) => {
    try {
        
        const { username, email, password } = req.body;

        if([username,email,password].some(field=>field?.trim()==="")){
            return res.status(404).json({
                message:"All fields are required"
            })
        }

        const user = await User.findOne({$or:[{email},{username}]});

        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }

        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            return res.status(401).json({
                message:"Password is incorrect"
            })
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        return res
        .status(200)
        .cookie("refreshToken",refreshToken,{httpOnly:true,secure:true})
        .cookie("accessToken",accessToken,{httpOnly:true,secure:true})
        .json({
            message:"User logged in successfully",
            accessToken,
            refreshToken,
            user,
            
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error?.message || "something went wrong while logging in user",
        })
    }
});

const logoutUser = asyncHandler(async (req, res) => {
try {
    
        await User.findByIdAndUpdate(
            req.user?._id,
            {
                $unset: { refreshToken: 1}
            }, { new: true }
        );
    
        return res
        .status(200)
        .clearCookie("refreshToken")
        .clearCookie("accessToken")
        .json({
            message: "User logged out successfully"
        })
} catch (error) {
    
    return res.status(500).json({
        message: "Internal server error",
        error: error?.message || "something went wrong while logging out user",
    })
}

});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
    .status(200)
    .json({
        message: "Current user fetched successfully",
        currentuser: req.user
    })
});



export {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser,

}