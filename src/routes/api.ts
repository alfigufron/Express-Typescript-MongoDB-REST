import { Request, Response, Router } from "express";
import superadminRouter from "./v1/superadmin";

const route = Router();

export default function apiRouter() {
  route.get("/ping", (req: Request, res: Response) =>
    res.send("API Service OK!")
  );

  const v1Router = () => {
    route.use("/superadmin", superadminRouter());

    return route;
  };

  route.use("/v1", v1Router());

  return route;
}
