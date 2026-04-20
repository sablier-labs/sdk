/**
 * @file Effect-based logger with console and optional file transport
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
 * LOG_FILE_PATH=./.logs/example.log bunx tsx cli/your-script.ts
 *
 * logger.info("Check your .logs directory if LOG_FILE_PATH was set");
 *
 * @example
 * Note that log levels are hierarchical, setting LOG_LEVEL=silly will
 * include all levels: error, warn, info, verbose, debug, silly
 */
import * as fs from "node:fs";
import { dirname } from "node:path";
import { Effect, Layer, Logger, LogLevel } from "effect";
import type { Sablier } from "@/src/types.js";

const LOG_FILE_PATH: string | undefined = process.env.LOG_FILE_PATH;
const LOG_LEVEL: string = process.env.LOG_LEVEL ?? "info";

type WinstonLevel = "error" | "warn" | "info" | "verbose" | "debug" | "silly";

const ANSI_RESET = "\x1b[0m";
const LEVEL_COLORS: Record<WinstonLevel, string> = {
  debug: "\x1b[34m", // blue
  error: "\x1b[31m", // red
  info: "\x1b[32m", // green
  silly: "\x1b[35m", // magenta
  verbose: "\x1b[36m", // cyan
  warn: "\x1b[33m", // yellow
};

function toWinstonLevel(logLevel: LogLevel.LogLevel): WinstonLevel {
  switch (logLevel._tag) {
    case "Fatal":
    case "Error":
      return "error";
    case "Warning":
      return "warn";
    case "Debug":
      return "debug";
    case "Trace":
      return "silly";
    default:
      return "info";
  }
}

function formatMessage(message: unknown): string {
  if (Array.isArray(message)) {
    return message.map((m) => (typeof m === "string" ? m : String(m))).join(" ");
  }
  return typeof message === "string" ? message : String(message);
}

function resolveMinimumLevel(raw: string): LogLevel.LogLevel {
  switch (raw) {
    case "error":
      return LogLevel.Error;
    case "warn":
      return LogLevel.Warning;
    case "verbose":
    case "debug":
      return LogLevel.Debug;
    case "silly":
      return LogLevel.Trace;
    case "none":
      return LogLevel.None;
    case "all":
      return LogLevel.All;
    default:
      return LogLevel.Info;
  }
}

if (LOG_FILE_PATH) {
  fs.mkdirSync(dirname(LOG_FILE_PATH), { recursive: true });
}

const customLogger = Logger.make(({ date, logLevel, message }) => {
  const msg = formatMessage(message);
  if (!msg) {
    return;
  }
  const level = toWinstonLevel(logLevel);
  console.log(`${LEVEL_COLORS[level]}${level}${ANSI_RESET}: ${msg}`);
  if (LOG_FILE_PATH) {
    fs.appendFileSync(LOG_FILE_PATH, `${date.toISOString()} ${level}: ${msg}\n`);
  }
});

const loggerLayer = Layer.merge(
  Logger.replace(Logger.defaultLogger, customLogger),
  Logger.minimumLogLevel(resolveMinimumLevel(LOG_LEVEL))
);

function run(effect: Effect.Effect<void>): void {
  Effect.runSync(Effect.provide(effect, loggerLayer));
}

export const logger = {
  debug: (msg: string) => run(Effect.logDebug(msg)),
  error: (msg: string) => run(Effect.logError(msg)),
  info: (msg: string) => run(Effect.logInfo(msg)),
  silly: (msg: string) => run(Effect.logTrace(msg)),
  verbose: (msg: string) => run(Effect.logDebug(msg)),
  warn: (msg: string) => run(Effect.logWarning(msg)),
};

export function log(
  level: "info" | "verbose",
  params: { msg: string; release?: Sablier.EVM.Release }
): void {
  const { msg, release } = params;
  if (release) {
    logger[level](`${formatRelease(release)}\t${msg}`);
  } else {
    logger[level](msg);
  }
}

function formatRelease(release: Sablier.EVM.Release): string {
  return `${release.protocol}:${release.version}`;
}
