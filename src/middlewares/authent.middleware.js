// import { ApiError } from "../utils/ApiErros.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// //import jwt from "jsonwebtoken";
// import pkg from "jsonwebtoken";

// const { jwt } = pkg;
// import { User } from "../model/user.model.js";
// export const verifiedJwt = asyncHandler(async (req, res, next) => {
//   try {
//     const token =
//       req.cookies?.accessToken ||
//       req.header("Authorization")?.replace("Bearer ", "");

//     if (!token) {
//       throw new ApiError(401, "UnAuthorized request");
//     }

//     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

//     const user = await User.findById(decodedToken?._id).select(
//       "-password -refreshToken"
//     );

//     if (!user) {
//       //Next video - todo about front end
//       throw new ApiError(401, "Invalid Access Token");
//     }

//     req.user = user;
//     next();
//   } catch (error) {
//     throw new ApiError(401, error?.message || "Invalid Access Token");
//   }
// });
