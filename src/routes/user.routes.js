import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.js";
//import { verifiedJwt } from "../middlewares/authent.middleware.js";
const router = Router();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },

    { name: "coverImage", maxCount: 1 },
  ]),

  registerUser
);

//router.route("/login").post(loginUser);
// secured routes

//router.route("/logout").post(verifiedJwt, loggedOutUser);
export default router;
