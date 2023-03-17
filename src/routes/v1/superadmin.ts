import { Router } from "express";

import SuperadminController from "../../controllers/superadmin.controller";
import FormDataMiddleware from "../../middlewares/form-data.middleware";
import superadminValidator from "../../validators/superadmin.validator";

const route = Router();

export default function superadminRouter() {
  route.get("/", SuperadminController.all);

  route.get("/:id", SuperadminController.detail);

  route.post(
    "/",
    FormDataMiddleware([
      {
        file: "single",
        name: "avatar",
        optional: true,
        typefile: "image",
        maxFileSize: {
          value: 2,
          unit: "MB",
        },
      },
    ]),
    superadminValidator.create,
    SuperadminController.create
  );

  return route;
}
