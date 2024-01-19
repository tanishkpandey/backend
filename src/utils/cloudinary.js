import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
import { resolve } from "path";

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null

        // To upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        // File has beeen uploaded successfully
        console.log('File has been uplaoded successfully.', response.url);
        return response;

    } catch {
        fs.unlinkSync(localFilePath)  // remove the locally saved temp file as the upload operation got failed.
    }
}

export {uploadOnCloudinary}