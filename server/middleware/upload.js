import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary";


//cloudinary config (Connect API)
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


//Define Storage
const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder: "mern_uploads",
        allowed_formats: ["jpeg", "jpg", "png", "svg", "webp"],
    },
});


//setup multer upload with limit and filter
export const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 } ,  // 10MB
    fileFilter: (req, file, cb) => {
        const allowed = /jpeg|jpg|png|webp|svg/;
        const isValid = allowed.test(file.mimetype);  //returns boolean value

        if(isValid) cb(null, true);
        else cb(new Error("only Image files are allowed"));
    }
})
