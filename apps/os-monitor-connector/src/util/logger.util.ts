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
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename,
      format: winston.format.combine(winston.format.uncolorize()),
    }),
  ],
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

export const logger = winston.createLogger(options);
