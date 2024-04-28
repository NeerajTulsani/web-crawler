import winston from 'winston';
import NodeUtil from 'util';
import config from '../config/config.js';

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}] ${message}`),
);

const logger = winston.createLogger({
  format: logFormat,
  transports: [
    // Console transport for all levels
    new winston.transports.Console({ level: 'debug' }),
  ],
});

function L(level, msg, ...args) {
  logger.log(level, NodeUtil.format(msg, ...args));
}

function QL(level, msg, ...args) {
  if (config.IS_DEV) {
    logger.log(level, NodeUtil.format(msg, ...args));
  }
}

const D = 'debug';
const V = 'verbose';
const I = 'info';
const W = 'warn';
const E = 'error';

export default { L, QL, D, V, I, W, E };
