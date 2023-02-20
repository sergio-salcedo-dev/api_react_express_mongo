import mongoose from "mongoose";
import app from "../server.mjs";
import Logger from "./logger.js";

/** @param {boolean} connectToMongoBD */
export const connectToDatabase = (connectToMongoBD = true) => {
  const PORT = process.env.PORT;

  if (connectToMongoBD) {
    const URI = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_DOCKER_SERVICE_NAME}:${process.env.MONGODB_PORT}/${process.env.APP_NAME}?authSource=admin`;

    mongoose.connect(
      // `mongodb://user:secret@mongodb:27017/app-goals?authSource=admin`,
      URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      (error) => {
        if (error) {
          console.error("FAILED TO CONNECT TO MONGODB");
          console.error(error);
        } else {
          console.log("CONNECTED TO MONGODB!!");
          app.listen(PORT, () => Logger.log(`Server started on port ${PORT}`));
        }
      }
    );
  } else {
    console.log("NOT CONNECTED TO MONGODB!!");
    app.listen(PORT, () => Logger.log(`Server started on port ${PORT}`));
  }
};
