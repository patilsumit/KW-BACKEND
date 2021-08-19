import * as winston from 'winston';
import 'winston-daily-rotate-file';
import * as path from 'path';
import * as fs from 'fs';
import { createLogger, format, transports } from 'winston';

import { environment } from './../environments/environment';
const env = environment.production ? 'production' : 'development';

const filename = path.join('log', `${environment.name}-%DATE%.log`);
const transport = new winston.transports.DailyRotateFile({
  filename,
  datePattern: 'YYYY-MM-DD-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

// Create the log directory if it does not exist
if (!fs.existsSync('log')) {
  fs.mkdirSync('log');
}

const logger = createLogger({
  // change level if in dev environment versus production
  level: env === 'development' ? 'debug' : 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
    }),
    transport,
  ],
});
const options: any = {
  write: function (message, encoding) {
    logger.info(message.trim());
    if (encoding) logger.info(encoding);
  },
};
logger['stream'] = options;

export default logger
