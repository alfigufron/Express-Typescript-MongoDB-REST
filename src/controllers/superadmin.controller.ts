import { UploadApiResponse } from "cloudinary";
import { NextFunction, Request, Response } from "express";

import { ErrorHandler, HttpResponse } from "../config/http";
import { HTTPCode } from "../constant/http.constant";
import { IRequestWithFiles } from "../interfaces/request.interface";

import SuperadminService from "../services/superadmin.service";
import CloudinaryUtils from "../utils/cloudinary";
import PaginationUtils from "../utils/pagination";

const SuperadminController = {
  all: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { limit, page } = PaginationUtils.paginationQueryValidator(
        req.query
      );

      const superadmin = await SuperadminService.findAllWithPagination(
        limit,
        page
      );

      return HttpResponse.success(res, "List Super Admin", superadmin);
    } catch (err) {
      next(new ErrorHandler(err.message, err.data, err.status));
    }
  },

  detail: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      const superadmin = await SuperadminService.findOneById(id);

      return HttpResponse.success(res, "Detail Super Admin", superadmin);
    } catch (err) {
      next(new ErrorHandler(err.message, err.data, err.status));
    }
  },

  create: async (req: IRequestWithFiles, res: Response, next: NextFunction) => {
    try {
      const { email, password, name } = req.body;

      const avatar = req.files.avatar;

      const avatarUploaded: UploadApiResponse = await CloudinaryUtils.upload(
        avatar,
        "user/avatar"
      );

      await SuperadminService.save({
        email,
        name,
        password,
        avatar: avatarUploaded.secure_url || null,
      });

      return HttpResponse.success(
        res,
        "Create Super Admin Successfully",
        null,
        HTTPCode.Created
      );
    } catch (err) {
      next(new ErrorHandler(err.message, err.data, err.status));
    }
  },
};

export default SuperadminController;
