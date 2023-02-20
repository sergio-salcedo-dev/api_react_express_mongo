import mongoose from "mongoose";
import app from "../server.mjs";
import Logger from "./logger.js";

const onDatabaseConnect = (error) => {
  if (error) {
    Logger.backendError(
      error,
      "onDatabaseConnect - FAILED TO CONNECT TO MONGODB"
    );
  } else {
    Logger.log("onDatabaseConnect - CONNECTED TO MONGODB!!");
    startServer();
  }
};

const startServer = () => {
  const PORT = process.env.APP_PORT;
  app.listen(PORT, () => Logger.log(`Server started on port ${PORT}`));
};

/** @param {boolean} connectToMongoBD */
export const connectToDatabase = (connectToMongoBD = true) => {
  if (connectToMongoBD) {
    const URI = `${process.env.MONGODB_URI_CONNECTION}/${process.env.APP_NAME}?authSource=admin`;
    mongoose.connect(
      URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      onDatabaseConnect
    );
  } else {
    Logger.log("connectToDatabase - NOT CONNECTED TO MONGODB!!");
    startServer();
  }
};
