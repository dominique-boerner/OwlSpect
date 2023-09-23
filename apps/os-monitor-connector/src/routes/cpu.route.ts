import express from "express";
import cpuController from "../controllers/cpu.controller.ts";
import { registerRoute } from "../util/route.util.ts";

const router = express();

export const cpuRouteBaseUrl = "/cpu";

registerRoute(
  {
    basePath: cpuRouteBaseUrl,
    path: "",
    name: "GET_CPU_CORES",
    caption: "Get CPU information",
    description: "Get CPU information about the host system.",
  },
  router,
  cpuController.getCpuCores,
);

export default router;
