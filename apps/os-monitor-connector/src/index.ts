import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cpuRoute, { cpuRouteBaseUrl } from "./routes/cpu.route.ts";
import infoRoute, { infoRouteBaseUrl } from "./routes/info.route.ts";
import networkRoute, { networkRouteBaseUrl } from "./routes/network.route.ts";
import memoryRoute, { memoryRouteBaseUrl } from "./routes/memory.route.ts";
import capabilityRoute, {
  capabilityRouteBaseUrl,
} from "./routes/capability.route.ts";

dotenv.config();

const app: Express = express();
const port = process.env.PORT ?? 3000;

app.on("mount", (parent: any) => {
  console.log(parent);
});

app.use(cors());

app.use(cpuRouteBaseUrl, cpuRoute);
app.use(infoRouteBaseUrl, infoRoute);
app.use(networkRouteBaseUrl, networkRoute);
app.use(memoryRouteBaseUrl, memoryRoute);
app.use(capabilityRouteBaseUrl, capabilityRoute);

app.get("/healthcheck", (req, res) => {
  res.send(true);
});

export const application = app.listen(port, () => {
  console.log(`⚡️[server]: os-monitor is running at http://localhost:${port}`);
});
