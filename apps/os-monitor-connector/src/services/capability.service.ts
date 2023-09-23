import { getRegisteredRoutes } from "../util/route.util.ts";

async function getCapabilities(): Promise<any> {
  try {
    return getRegisteredRoutes();
  } catch (e) {
    throw e;
  }
}

export default {
  getCapabilities,
};
