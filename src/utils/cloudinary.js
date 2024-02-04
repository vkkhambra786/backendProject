//import { v2 as cloudinary } from "cloudinary";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localPath) => {
  try {
    if (!localPath) return null;

    const response = cloudinary.uploader.upload(localPath, {
      resource_type: "auto",
    });

    //console.log("File is uploaded on cloudainary", response.url);
    fs.unlinkSync(localPath);
    return response;
  } catch (error) {
    console.log("error", error);
    fs.unlinkSync(localPath);

    return null;
  }
};

// cloudinary.v2.uploader.upload(
//   "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" },
//   function (error, result) {
//     console.log(result);
//   }
// );

export { uploadOnCloudinary };
