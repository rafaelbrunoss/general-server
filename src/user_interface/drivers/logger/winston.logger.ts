import DailyRotateFile from 'winston-daily-rotate-file';
import { inject, injectable } from 'inversify';
import { Format } from 'logform';
import { format as winstonFormat, Logger, transports } from 'winston';

import { BaseLogger } from '@user_interface/drivers/logger/baseLogger';
import { ILogger } from '@user_interface/drivers/logger/logger.interface';
import { NODE_ENV } from '@user_interface/drivers/common/constants/variables';
import { UI_APPLICATION_IDENTIFIERS } from '@user_interface/user_interface.symbols';

@injectable()
export class WinstonLogger extends BaseLogger<Logger> implements ILogger {
  private readonly format: Format;

  constructor(
    @inject(UI_APPLICATION_IDENTIFIERS.LOGGER_FORMAT) format: Format,
    @inject(UI_APPLICATION_IDENTIFIERS.LOGGER) logger: Logger,
  ) {
    super(logger);
    this.format = format;
  }

  public initialize(): void {
    const loggerConfig = {
      datePattern: 'YYYY-MM-DD',
      dirname: '/app/logs',
      format: this.format,
      maxFiles: '14d',
      maxSize: '20m',
      zippedArchive: true,
    };

    this.logger.add(
      new DailyRotateFile({
        filename: 'server-%DATE%.info.log',
        level: 'info',
        ...loggerConfig,
      }),
    );

    this.logger.add(
      new DailyRotateFile({
        filename: 'server-%DATE%.warn.log',
        level: 'warn',
        ...loggerConfig,
      }),
    );

    this.logger.add(
      new DailyRotateFile({
        filename: 'server-%DATE%.error.log',
        level: 'error',
        ...loggerConfig,
      }),
    );

    if (NODE_ENV === 'development') {
      this.logger.add(
        new transports.Console({
          format: winstonFormat.combine(
            winstonFormat.colorize({ all: true }),
            winstonFormat.label({ label: '[LOGGER]' }),
            winstonFormat.timestamp(),
            winstonFormat.printf(
              (info) =>
                `${info.label} ${info.timestamp} [${info.level}] : ${info.message} `,
            ),
          ),
          handleExceptions: true,
          level: 'debug',
        }),
      );
    }
  }

  public info(message: string): void {
    this.logger.info(message);
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public error(message: string): void {
    this.logger.error(message);
  }
}
