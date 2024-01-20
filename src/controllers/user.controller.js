// user.controller.js

import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from '../utils/ApiError.js'
import {User} from '../modles/user.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from "../utils/ApiResponse.js";

    const registerUser = asyncHandler(async (req, res) => {

        // --------------------------
        // get user detail from user.
        // --------------------------

        const {fullName, email, username, password} = req.body
        console.log("email", email)

        // --------------------------
        // validation
        // --------------------------

        if(fullName === ""){
            throw new ApiError(400, "Fullname is required")
        }
        if(email === ""){
            throw new ApiError(400, "email is required")
        }
        if(username === ""){
            throw new ApiError(400, "username is required")
        }
        if(password === ""){
            throw new ApiError(400, "password is required")
        }

        // --------------------------
        // Check if the user already exists
        // --------------------------

        const existedUser = User.findOne({
            $or: [{username}, {email}]
        })

        if(existedUser){
            throw new ApiError(409, "User with email or username already exists")
        }

        // --------------------------
        // Check for images, check for avatar uploded or not.
        // --------------------------

        const avatarLocalPath = req.files?.avatar[0]?.path;
        const coverImageLocalPath = req.files?.coverImage[0]?.path;

        if(!avatarLocalPath){
            throw new ApiError(400, "Avatar file is required")
        }

        // --------------------------
        // Upload them to cloudinary.
        // --------------------------
        
        const avatar = await uploadOnCloudinary(avatarLocalPath)
        const coverImage = await uploadOnCloudinary(coverImageLocalPath)

        if(!avatar){
            throw new ApiError(400, "Avatar file is required.")
        }

        // --------------------------
        // Create userObject
        // --------------------------

        const user = await User.create({
            fullName,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            email,
            password,
            username:username.toLowerCaser()
        })

        // --------------------------
        // Remove password and RefreshToken
        // --------------------------

        const createdUser = User.findById(user._id).select(
            "-password -refreshToken"
        )

        // --------------------------
        // Check for user creation
        // --------------------------

        if(createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user")
        }

        // --------------------------
        // Return Response
        // --------------------------

        return res.status(201).json(
            new ApiResponse(200, createdUser, "User registered Successfully.")
        )

    });




export { registerUser };
