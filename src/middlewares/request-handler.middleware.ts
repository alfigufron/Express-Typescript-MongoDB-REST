import * as url from "url";

import { NextFunction, Request, Response } from "express";

import logger from "../config/logger";

function urlFormatter(request) {
  return url.format({
    protocol: request.protocol,
    host: request.get("host"),
    pathname: request.originalUrl,
  });
}

export default function RequestHandlerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const url = urlFormatter(req);
  const ip =
    req.headers?.forwarded?.split(",").shift() || req.socket?.remoteAddress;

  logger.info({ message: req.method, meta: { url, ip } });

  next();
}
