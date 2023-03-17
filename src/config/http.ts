import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { HTTPCode } from "../constant/http.constant";
import { TJSONResponseType } from "../types/http.type";
import logger from "./logger";

class HttpResponse {
  private static getStatus(code: string) {
    code = code.charAt(0);

    let message;

    switch (code) {
      case "1":
        message = "Informational";
        break;
      case "2":
        message = "Success";
        break;
      case "3":
        message = "Redirection";
        break;
      case "4":
        message = "Client Error";
        break;
      default:
        message = "Server Error";
        break;
    }

    return message;
  }

  private static JSONResponse(
    code: HTTPCode,
    message?: string,
    data: object = null
  ) {
    const payload: TJSONResponseType = {
      meta: {
        success: String(code).charAt(0) !== "2" ? false : true,
        code,
        status: this.getStatus(String(code)),
        message: message,
      },
      data: data,
    };

    return payload;
  }

  public static success(
    res: Response,
    message: string,
    data?: object,
    code: HTTPCode = HTTPCode.Success
  ) {
    logger.info(message);

    return res.status(code).json(this.JSONResponse(code, message, data));
  }

  public static error(
    res: Response,
    message: string,
    data?: object,
    code: HTTPCode = HTTPCode.ClientError
  ) {
    return res.status(code).json(this.JSONResponse(code, message, data));
  }
}

class ErrorHandler extends Error {
  public message: string;
  public data: object;
  public status: number;

  constructor(
    message: string,
    data: object = {},
    status = HTTPCode.ClientError
  ) {
    super();
    this.message = message;
    this.status = status;
    this.data = data;
  }
}

const validationHandler = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    next(
      new ErrorHandler(
        "Validation Error",
        errors.array(),
        HTTPCode.ValidationError
      )
    );

  next();
};

export { ErrorHandler, HttpResponse, validationHandler };
