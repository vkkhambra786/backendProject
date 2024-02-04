import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiErros.js";
import { User } from "../model/user.model.js";

import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findOne(userId);
    const accessToken = user.generateAccessToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh  Token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //   res.status(200).json({
  //     message: "OK message jay ga",
  //   });
  // check user details from frontend
  // validation not empty
  // check if username, email already exist
  // check images , check avatar
  // upload to cloudaniary
  // create user object - crate entry in db
  // remove password , refresh token field from response
  // check for user creation
  // return res

  const { fullName, email, username, password } = req.body;

  console.log("email:", email);

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All field is Required");
  }

  //const existedUser = await User.findOne({ email }); // check email is exist
  //User.findOne({username})  check email is exist
  // check both 2 exist or not
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email and username exist");
  }

  //console.log("files", req.files);
  const avatarLocalPath = req.files?.avatar[0]?.path;
  //const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;

  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files?.coverImage[0]?.path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(408, "Avatar is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar Files is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, " Something went wrong while creating the user");
  }

  console.log("res--", createdUser);

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User Registered Successfully"));
});

// const loginUser = asyncHandler(async (req, res) => {
//   // req body se data le aao
//   // username email
//   // find the user
//   // password check
//   // access and refresh token
//   // send cookies
//   // send response

//   const { username, email, password } = req.body;

//   if (!username && !email) {
//     throw new ApiError(400, "Username or Password is Required");
//   }

//   const user = await User.findOne({
//     $or: [{ username }, { email }],
//   });

//   if (!user) {
//     throw new ApiError(404, "User does not exist");
//   }

//   const isPasswordValid = await user.isPasswordCorrect(password);

//   if (!isPasswordValid) {
//     throw new ApiError(401, "Invalid user Credentials");
//   }

//   const { accessToken, refreshToken } =
//     await generateAccessTokenAndRefreshToken(user._id);

//   const loggedInUser = User.findById(user._id).select(
//     "-password -refreshToken"
//   );

//   const options = {
//     httpOnly: true,
//     secure: true,
//   };
//   return res
//     .status(200)
//     .cookie("accessToken", accessToken, options)
//     .cookie("refreshToken", refreshToken, options)
//     .json(
//       new ApiResponse(
//         200,
//         {
//           user: loggedInUser,
//           accessToken,
//           refreshToken,
//         },
//         "User Login Successfully"
//       )
//     );
// });

// const loggedOutUser = asyncHandler(async (req, res) => {
//   await User.findByIdAndUpdate(
//     req.user._id,
//     {
//       $set: { refreshToken: undefined },
//     },
//     {
//       new: true,
//     }
//   );

//   const options = {
//     httpOnly: true,
//     secure: true,
//   };

//   return res
//     .status(200)
//     .clearCookie("accessToken", options)
//     .clearCookie("refreshToken", options)
//     .json(new ApiResponse(200, {}, "User Logged Out"));
// });
export { registerUser };
