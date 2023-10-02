import express from "express";
import memoryController from "../controllers/memory.controller";
import { registerRoute } from "../util/route.util";

const router = express();

export const memoryRouteBaseUrl = "/memory";

registerRoute(
  {
    basePath: memoryRouteBaseUrl,
    path: "",
    name: "GET_MEMORY",
    caption: "Get memory information",
    description: "Get information about the memory of the host system.",
  },
  router,
  memoryController.getMemory,
);

registerRoute(
  {
    basePath: memoryRouteBaseUrl,
    path: "/free",
    name: "GET_MEMORY_FREE",
    caption: "Get free memory information",
    description: "Get information about the free memory of the host system.",
  },
  router,
  memoryController.getFreeMemory,
);

export default router;
