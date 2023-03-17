import { v2 } from "cloudinary";

import env from "../config/env";
import { ErrorHandler } from "../config/http";
import { HTTPCode } from "../constant/http.constant";

v2.config({
  cloud_name: env.CLOUDINARY.NAME,
  api_key: env.CLOUDINARY.API_KEY,
  api_secret: env.CLOUDINARY.API_SECRET,
  secure: true,
});

function urlToPublicId(path: string) {
  const arrPath = path.split("/");
  let publicIdStatus = false;
  let publicId = "";

  arrPath.forEach((item, index) => {
    if (item === "kedai-kopi-app" || publicIdStatus) {
      const text = index !== arrPath.length - 1 ? `${item}/` : item;

      if (index === arrPath.length - 1) {
        const arrText = text.split(".");
        arrText.pop();

        arrText.forEach(textItem => {
          publicId += textItem;
        });
      } else {
        publicId += text;
      }

      publicIdStatus = true;
    }
  });

  return publicId;
}

const CloudinaryUtils = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  upload: async (file: any, path: string) => {
    try {
      const uploaded = await v2.uploader.upload(
        file.filepath,
        {
          folder: `kedai-kopi-app/${path}`,
        },
        error => {
          if (error)
            throw new ErrorHandler(
              "Upload File Failed!",
              error,
              HTTPCode.ServerError
            );
        }
      );

      return uploaded;
    } catch (err) {
      return err;
    }
  },

  destroy: async (path: string) => {
    try {
      const publicId = urlToPublicId(path);

      console.log(publicId);
    } catch (error) {
      if (error)
        throw new ErrorHandler(
          "Delete File Failed",
          error,
          HTTPCode.ServerError
        );
    }
  },
};

export default CloudinaryUtils;
