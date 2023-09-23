import express from "express";
import infoController from "../controllers/info.controller.ts";
import { registerRoute } from "../util/route.util.ts";

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
