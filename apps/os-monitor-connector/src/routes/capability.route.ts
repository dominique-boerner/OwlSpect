import express from "express";
import capabilityController from "../controllers/capability.controller";

const router = express();

export const capabilityRouteBaseUrl = "/capability";
export const CapabilityRoute = {
  GET_CAPABILITY: "/",
};

router.get(
  CapabilityRoute.GET_CAPABILITY,
  capabilityController.getCapabilities,
);

export default router;
