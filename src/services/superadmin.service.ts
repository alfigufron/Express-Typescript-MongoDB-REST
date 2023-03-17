import { isValidObjectId } from "mongoose";
import { ErrorHandler } from "../config/http";
import { HTTPCode } from "../constant/http.constant";
import ISuperAdminModel from "../interfaces/models/superadmin.interface";
import superadmin from "../models/superadmin";
import PaginationUtils from "../utils/pagination";

const SuperadminService = {
  findAllWithPagination: async (limit: number, page: number) => {
    return await superadmin
      .find()
      .skip(PaginationUtils.skip(limit, page))
      .limit(Number(limit))
      .exec();
  },

  findOneById: async (id: string) => {
    try {
      if (!isValidObjectId(id))
        throw new ErrorHandler("Object ID Invalid", null, HTTPCode.ClientError);

      const data = await superadmin.findById(id);

      if (!data)
        throw new ErrorHandler("Data Not Found", null, HTTPCode.NotFound);

      return data;
    } catch (err) {
      throw new ErrorHandler(err.message, err.data, err.status);
    }
  },

  save: async (payload: ISuperAdminModel) => {
    try {
      const data = new superadmin(payload);

      data.validateSync();
      data.save();
    } catch (err) {
      throw new ErrorHandler(err.message, err.data, err.status);
    }
  },
};

export default SuperadminService;
