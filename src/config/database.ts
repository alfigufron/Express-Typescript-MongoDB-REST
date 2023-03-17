import * as mongoose from "mongoose";
import env from "./env";

import logger, { errorLogger } from "./logger";

const dbConnection = async () => {
  try {
    const host = env.DB.HOST;
    const port = env.DB.PORT;
    const user = env.DB.USERNAME;
    const pwd = env.DB.PASSWORD;
    const dbName = env.DB.NAME;

    const uri = `mongodb://${user}:${pwd}@${host}:${port}/${dbName}?authSource=admin`;

    mongoose.set("strictQuery", true);

    await mongoose.connect(uri);

    logger.info("Database Connection Successfully!");

    return mongoose.connection;
  } catch (err) {
    errorLogger.error("Database Connection Error!");
    errorLogger.error(err);
  }
};

const typesFindQueryMiddleware = [
  "count",
  "find",
  "findOne",
  "findOneAndDelete",
  "findOneAndRemove",
  "findOneAndUpdate",
  "update",
  "updateOne",
  "updateMany",
];

export default dbConnection;

export { typesFindQueryMiddleware };
