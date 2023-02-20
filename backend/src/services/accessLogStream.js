import fs from "fs";
import path from "path";
import fileNameHelper from "../helpers/fileNameHelper.js";
import Logger from "./logger.js";

const { __dirname } = fileNameHelper(import.meta);

const createLogsDirectory = async () => {
  const directoryPath = path.join(__dirname, "logs");
  await fs.mkdir(directoryPath, (error) => {
    if (error && error.code !== "EEXIST") {
      console.error("Error creating logs directory: ", error);
    }
  });
};

export const getAccessLogStream = async () => {
  try {
    await createLogsDirectory();

    return fs.createWriteStream(path.join(__dirname, "logs", "access.log"), {
      flags: "a",
    });
  } catch (error) {
    Logger.error("Some went wrong when creating write stream: ", error);
  }
};
