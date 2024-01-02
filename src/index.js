// import mongoose from "mongoose";
// import { DB_NAME } from "./constant";

// import express from "express";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
import { app } from "./app.js";

dotenv.config({ path: "./env" });

connectDB()
  .then(() =>
    app.listen(process.env.PORT || 3456, () => {
      console.log(`Server is Running at port ${process.env.PORT}`);
    })
  )
  .catch((e) => console.log("Mongo DB connection failed !!!"));

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
