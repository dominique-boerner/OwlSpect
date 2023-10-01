import winston, { format } from "winston";
import path from "path";
import dotenv from "dotenv";

const { combine } = format;

dotenv.config();
const mode = process.env.MODE ?? "prod";

export enum LogLevels {
  ERROR = "error",
  WARN = "warn",
  INFO = "info",
  DEBUG = "debug",
}

const currentDate = new Date();
const filename =
  "os-monitor-connector_" +
  currentDate.getFullYear() +
  "-" +
  currentDate.getMonth() +
  "-" +
  currentDate.getDate() +
  ".log";
const options = {
  level: mode === "dev" ? LogLevels.DEBUG : LogLevels.ERROR,
  transports: [new winston.transports.Console()],
  format: combine(
    format.label({ label: path.basename(process.mainModule!.filename) }),
    format.colorize(),
    format.splat(),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(
      ({ level, message, label, timestamp }) =>
        `${timestamp} ${level} [${label}]: ${message}`,
    ),
  ),
};

const writeLogsToFile = process.env.WRITE_LOGS_TO_FILE ?? true;
if (!writeLogsToFile) {
  const fileTransport = new winston.transports.File({
    filename,
    format: winston.format.combine(winston.format.uncolorize()),
  });
  // we need to use as any here, because winston doesn't support TypeScript at default
  options.transports.push(fileTransport as any);
}

export const logger = winston.createLogger(options);
