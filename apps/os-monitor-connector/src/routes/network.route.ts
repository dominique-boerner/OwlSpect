import express from "express";
import networkController from "../controllers/network.controller";
import { registerRoute } from "../util/route.util";

const router = express();

export const networkRouteBaseUrl = "/network";

registerRoute(
  {
    basePath: networkRouteBaseUrl,
    path: "",
    name: "GET_NETWORK",
    caption: "Get network information",
    description: "Get network information about the host system.",
  },
  router,
  networkController.getNetwork,
);

registerRoute(
  {
    basePath: networkRouteBaseUrl,
    path: ":network",
    name: "GET_SPECIFIC_NETWORK",
    caption: "Get specific network information",
    description: "Get specific network information about the host system.",
  },
  router,
  networkController.getSpecificNetwork,
);

export default router;
