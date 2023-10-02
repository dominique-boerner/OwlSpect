import express from "express";
import infoController from "../controllers/info.controller";
import { registerRoute } from "../util/route.util";

const router = express();

export const infoRouteBaseUrl = "/info";

registerRoute(
  {
    basePath: infoRouteBaseUrl,
    path: "",
    name: "GET_INFORMATION",
    caption: "Get general information",
    description: "Get general information about the host system.",
  },
  router,
  infoController.getInformation,
);

export default router;
