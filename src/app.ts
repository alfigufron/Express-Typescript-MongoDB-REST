import * as express from "express";

import { Express, Request, Response } from "express";

import env from "./config/env";
import logger from "./config/logger";
import dbConnection from "./config/database";
import apiRouter from "./routes/api";
import ErrorHandlerMiddlerware from "./middlewares/error-handler.middleware";
import RequestHandlerMiddleware from "./middlewares/request-handler.middleware";
import bodyParser = require("body-parser");
import helmet from "helmet";

const app: Express = express();
const port = env.APP.PORT || 5000;

const startService = () => {
  app.use(bodyParser.json({ limit: "10mb" }));
  app.use(
    bodyParser.urlencoded({
      limit: "50mb",
      extended: false,
    })
  );

  app.use(helmet());

  app.use(RequestHandlerMiddleware);
  app.use("/api", apiRouter());
  app.use(ErrorHandlerMiddlerware);
  app.use((req: Request, res: Response) => {
    res.status(404).send({ message: "Not Found" });
  });

  app.listen(port, () => {
    console.clear();

    dbConnection();

    logger.info(
      `Server Running at http://localhost:${port}/ or http://127.0.0.1:${port}/`
    );
  });
};

startService();

export default app;
