import { Server as HttpServer } from 'http';
import { ILogger } from '@user_interface/drivers/logger/logger.interface';

export const normalizePort = (val: number | string): number => {
  return typeof val === 'string' ? parseInt(val) : val;
};

export const onError = (server: HttpServer, logger: ILogger) => {
  return (error: NodeJS.ErrnoException): void => {
    const addr: any = server.address();
    if (error.syscall !== 'listen') {
      throw error;
    }
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    switch (error.code) {
      case 'EACCES':
        logger.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        logger.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
};

export const onListening = (server: HttpServer, logger: ILogger) => {
  return (): void => {
    const addr: any = server.address();
    const bind =
      typeof addr === 'string'
        ? `pipe ${addr}`
        : `http://${addr.address}:${addr.port}`;
    logger.info(`[Listening at ${bind}]`);
  };
};

export const deleteObjectFromArray = (object: any, array: any[]): any[] => {
  let count: number;
  let index: number;
  array.forEach((item) => {
    count = 0;
    Object.keys(object).forEach((key) => {
      if (object[key] === item[key]) {
        count++;
      }

      if (count === Object.keys(object).length) {
        index = array.indexOf(item);
        if (index !== -1) {
          array.splice(index, 1);
        }
      }
    });
  });
  return array;
};

export const chunk = (array: any[], size: number) => {
  const chunkedArray = [];
  let index = 0;
  while (index < array.length) {
    chunkedArray.push(array.slice(index, size + index));
    index += size;
  }
  return chunkedArray;
};
