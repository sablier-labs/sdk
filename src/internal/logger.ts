/**
 * @file Winston logger instance with console and optional file transport
 *
 * @example
 * Basic usage of different log levels:
 *
 * logger.error("This is an error message");
 * logger.warn("This is a warning message");
 * logger.info("This is an info message");
 * logger.verbose("This is a verbose message");
 * logger.debug("This is a debug message");
 * logger.silly("This is a silly message");
 *
 * @example
 * Run with file output by setting the LOG_FILE_PATH environment variable:
 *
 * LOG_FILE_PATH=./logs/example.log bun run cli/your-script.ts
 *
 * logger.info("Check your logs directory if LOG_FILE_PATH was set");
 *
 * @example
 * Note that log levels are hierarchical, setting LOG_LEVEL=silly will
 * include all levels: error, warn, info, verbose, debug, silly
 *
 * LOG_LEVEL=silly bun run cli/your-script.ts
 */
import * as path from "node:path";
import type { Sablier } from "@src/types";
import * as fs from "fs-extra";
import winston, { format } from "winston";

const LOG_FILE_PATH: string = process.env.LOG_FILE_PATH || "logs/debug.log";
const LOG_LEVEL: string = process.env.LOG_LEVEL || "info";

// Create transports array starting with console
const transports: winston.transport[] = [
  new winston.transports.Console({
    format: format.combine(
      format.colorize(),
      format.printf(({ level, message }) => {
        if (!message) {
          return "";
        }
        return `${level}: ${message}`;
      }),
    ),
  }),
];

if (LOG_FILE_PATH) {
  const logDir = path.dirname(LOG_FILE_PATH);
  fs.ensureDirSync(logDir);

  const fileTransport = new winston.transports.File({
    filename: LOG_FILE_PATH,
    format: format.combine(
      format.timestamp(),
      format.printf(({ timestamp, level, message }) => {
        return `${timestamp} ${level}: ${message}`;
      }),
    ),
  });
  transports.push(fileTransport);
}

export const logger = winston.createLogger({
  format: format.combine(format.timestamp(), format.errors({ stack: true })),
  level: LOG_LEVEL,
  transports,
});

export function log(level: "info" | "verbose", params: { msg: string; release?: Sablier.Release }): void {
  const { msg, release } = params;
  if (release) {
    logger[level](`${formatRelease(release)}\t${msg}`);
  } else {
    logger[level](msg);
  }
}

function formatRelease(release: Sablier.Release): string {
  return `${release.protocol}:${release.version}`;
}
