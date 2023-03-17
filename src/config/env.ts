import * as dotenv from "dotenv";

dotenv.config();

const env = {
  APP: {
    PORT: Number(process.env.APP_PORT),
  },
  DB: {
    HOST: process.env.DB_HOST,
    PORT: Number(process.env.DB_PORT),
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    NAME: process.env.DB_NAME,
  },
  CLOUDINARY: {
    NAME: process.env.CLOUDINARY_NAME,
    API_KEY: process.env.CLOUDINARY_API_KEY,
    API_SECRET: process.env.CLOUDINARY_API_SECRET,
  },
};

export default env;
