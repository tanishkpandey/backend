// user.controller.js

import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
    return res.status(200).json({
        message: "Hello ji"
    });
});

export { registerUser };
