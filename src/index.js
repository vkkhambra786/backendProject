// import mongoose from "mongoose";
// import { DB_NAME } from "./constant";

// import express from "express";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({ path: "./env" });
connectDB();
// const app = express()(async () => {
//   try {
//     await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
//     app.on("error", (error) => {
//       console.log("ERROR:", error);
//       throw error;
//     });

//     app.listen(process.env.PORT, () => {
//       console.log(`App is running on the PORT ${process.env.PORT}`);
//     });
//   } catch (e) {
//     console.log("e", e);
//     throw e;
//   }
// })();
