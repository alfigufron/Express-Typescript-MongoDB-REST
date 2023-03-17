import { NextFunction, Request, Response } from "express";

import logger from "../config/logger";

import { ErrorHandler, HttpResponse } from "../config/http";
import { HTTPCode, HTTPMessage } from "../constant/http.constant";

export default function ErrorHandlerMiddlerware(
  err: ErrorHandler,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  const httpCode = err.status || HTTPCode.ServerError;
  const messageError = err.message || HTTPMessage.ServerError;
  let data = null;

  if (["3", "4"].includes(String(httpCode).charAt(0)))
    logger.warn(messageError);
  else logger.error(messageError);

  if (httpCode === 422) {
    const errors = err.data;

    if (Array.isArray(errors)) {
      data = [];

      const params = [];
      errors.forEach(val => {
        const { param, msg } = val;

        if (!params.includes(param)) {
          params.push(param);

          data.push({
            key: param,
            message: msg,
          });
        }
      });
    } else {
      data = [errors];
    }
  }

  return HttpResponse.error(res, messageError, data, httpCode);
}
